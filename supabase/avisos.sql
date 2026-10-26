-- Lo que necesitan los avisos programados (20:00 si no has hecho el reto, y el resumen del domingo).
-- Pega este fichero en Supabase (SQL Editor > New query > Run) DESPUÉS de esquema.sql.
--
-- Los avisos no usan tu sesión ni la clave secreta de Supabase. Usan una "clave de avisos" que solo
-- sirve para una cosa: preguntar por el resumen de tu progreso (si hiciste el reto hoy, tu racha
-- y cómo fue la semana). No puede leer tu email ni escribir nada.

create table if not exists public.ajustes (
  nombre text primary key,
  valor text not null
);
alter table public.ajustes enable row level security; -- sin reglas: nadie la lee desde la web
revoke all on public.ajustes from anon, authenticated;

-- Genera una clave nueva (y anula la anterior). Ejecútala con:  select public.taller_nueva_clave();
-- Copia el resultado y guárdalo donde se te indique. Aquí solo queda su huella (sha256), no la clave.
create or replace function public.taller_nueva_clave()
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  clave text := replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', '');
begin
  insert into public.ajustes (nombre, valor)
  values ('clave_avisos', encode(sha256(convert_to(clave, 'UTF8')), 'hex'))
  on conflict (nombre) do update set valor = excluded.valor;
  return clave;
end;
$$;
revoke all on function public.taller_nueva_clave() from public, anon, authenticated;

-- El resumen que leen los avisos. Fechas en hora de Madrid.
create or replace function public.resumen_taller(clave text)
returns json
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  hoy date := (now() at time zone 'Europe/Madrid')::date;
  esperada text;
  racha int := 0;
  d date;
begin
  select valor into esperada from public.ajustes where nombre = 'clave_avisos';
  if esperada is null or esperada <> encode(sha256(convert_to(clave, 'UTF8')), 'hex') then
    raise exception 'clave no válida' using errcode = '28000';
  end if;

  d := case when exists (select 1 from public.sesiones where fecha = hoy) then hoy else hoy - 1 end;
  while exists (select 1 from public.sesiones where fecha = d) loop
    racha := racha + 1;
    d := d - 1;
  end loop;

  return json_build_object(
    'hoy', hoy,
    'hecho_hoy', exists (select 1 from public.sesiones where fecha = hoy),
    'racha', racha,
    'ultimo_dia', (select dia from public.sesiones where dia is not null order by momento desc limit 1),
    'ultima_sesion', (select max(fecha) from public.sesiones),
    'semana', json_build_object(
      'dias_con_sesion', (select count(distinct fecha) from public.sesiones where fecha > hoy - 7),
      'dias_hechos', (select coalesce(json_agg(distinct dia), '[]'::json) from public.sesiones where fecha > hoy - 7 and dia is not null),
      'retos', (select count(*) from public.intentos where fecha > hoy - 7),
      'a_la_primera', (select count(*) from public.intentos where fecha > hoy - 7 and fallos = 0 and not solucion),
      'con_solucion', (select count(*) from public.intentos where fecha > hoy - 7 and solucion),
      'pistas', (select coalesce(sum(pistas), 0) from public.intentos where fecha > hoy - 7),
      'conceptos_fallados', (
        select coalesce(json_agg(c order by c), '[]'::json)
        from (select distinct concepto as c from public.intentos where fecha > hoy - 7 and (fallos > 0 or solucion)) x
      )
    )
  );
end;
$$;
revoke all on function public.resumen_taller(text) from public;
grant execute on function public.resumen_taller(text) to anon;

-- ---------- Notificaciones push en el iPhone ----------

-- Cada dispositivo donde activas los avisos guarda aquí su "dirección" de push.
create table if not exists public.suscripciones (
  endpoint text primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  datos jsonb not null,           -- lo que da el navegador: endpoint y claves de cifrado
  creada timestamptz not null default now()
);
alter table public.suscripciones enable row level security;
drop policy if exists "ver mis suscripciones" on public.suscripciones;
drop policy if exists "guardar mis suscripciones" on public.suscripciones;
drop policy if exists "borrar mis suscripciones" on public.suscripciones;
create policy "ver mis suscripciones" on public.suscripciones for select to authenticated using (user_id = (select auth.uid()));
create policy "guardar mis suscripciones" on public.suscripciones for insert to authenticated with check (user_id = (select auth.uid()));
create policy "borrar mis suscripciones" on public.suscripciones for delete to authenticated using (user_id = (select auth.uid()));
revoke all on public.suscripciones from anon;

-- La clave pública de push la necesita la web para suscribirse: es pública por diseño.
create or replace function public.vapid_publica()
returns text language sql stable security definer set search_path = ''
as $$ select valor from public.ajustes where nombre = 'vapid_publica' $$;
revoke all on function public.vapid_publica() from public;
grant execute on function public.vapid_publica() to anon, authenticated;

create or replace function public.comprobar_clave(clave text)
returns void language plpgsql stable security definer set search_path = ''
as $$
begin
  if not exists (select 1 from public.ajustes where nombre = 'clave_avisos' and valor = encode(sha256(convert_to(clave, 'UTF8')), 'hex')) then
    raise exception 'clave no válida' using errcode = '28000';
  end if;
end;
$$;
revoke all on function public.comprobar_clave(text) from public, anon, authenticated;

-- Lo que necesita el aviso: claves de push y las suscripciones. Solo con la clave de avisos.
create or replace function public.datos_push(clave text)
returns json language plpgsql stable security definer set search_path = ''
as $$
begin
  perform public.comprobar_clave(clave);
  return json_build_object(
    'publica', (select valor from public.ajustes where nombre = 'vapid_publica'),
    'privada', (select valor from public.ajustes where nombre = 'vapid_privada'),
    'suscripciones', (select coalesce(json_agg(datos), '[]'::json) from public.suscripciones)
  );
end;
$$;
revoke all on function public.datos_push(text) from public;
grant execute on function public.datos_push(text) to anon;

-- La primera vez, el aviso genera las claves de push y las guarda aquí. No se sobrescriben.
create or replace function public.guardar_vapid(clave text, publica text, privada text)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  perform public.comprobar_clave(clave);
  insert into public.ajustes (nombre, valor) values ('vapid_publica', publica), ('vapid_privada', privada)
  on conflict (nombre) do nothing;
end;
$$;
revoke all on function public.guardar_vapid(text, text, text) from public;
grant execute on function public.guardar_vapid(text, text, text) to anon;

-- Un dispositivo que ya no existe (el navegador responde 404/410) se borra.
create or replace function public.borrar_suscripcion(clave text, endpoint text)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  perform public.comprobar_clave(clave);
  delete from public.suscripciones s where s.endpoint = borrar_suscripcion.endpoint;
end;
$$;
revoke all on function public.borrar_suscripcion(text, text) from public;
grant execute on function public.borrar_suscripcion(text, text) to anon;

-- Evita avisar dos veces el mismo día si GitHub lanza el aviso con retraso. Devuelve true la primera vez.
create or replace function public.avisar_una_vez(clave text, tipo text, fecha date)
returns boolean language plpgsql security definer set search_path = ''
as $$
declare
  ajuste text := 'ultimo_' || tipo;
begin
  perform public.comprobar_clave(clave);
  if exists (select 1 from public.ajustes a where a.nombre = ajuste and a.valor = fecha::text) then
    return false;
  end if;
  insert into public.ajustes (nombre, valor) values (ajuste, fecha::text)
  on conflict (nombre) do update set valor = excluded.valor;
  return true;
end;
$$;
revoke all on function public.avisar_una_vez(text, text, date) from public;
grant execute on function public.avisar_una_vez(text, text, date) to anon;
