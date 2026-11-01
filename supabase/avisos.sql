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
-- La clave queda atada a UNA persona (la dueña del taller): los avisos solo leen sus filas, aunque
-- algún día hubiera más cuentas. Si hay una sola cuenta se elige sola; si hay varias, pasa su uuid:
--   select public.taller_nueva_clave('uuid-de-la-cuenta');
drop function if exists public.taller_nueva_clave();
create or replace function public.taller_nueva_clave(dueno uuid default null)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  clave text := replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', '');
begin
  if dueno is null then
    if (select count(*) from auth.users) <> 1 then
      raise exception 'Hay % cuentas: pasa el uuid de la tuya, select public.taller_nueva_clave(''uuid'');', (select count(*) from auth.users);
    end if;
    select id into dueno from auth.users;
  elsif not exists (select 1 from auth.users where id = dueno) then
    raise exception 'No hay ninguna cuenta con ese uuid';
  end if;
  insert into public.ajustes (nombre, valor)
  values ('clave_avisos', encode(sha256(convert_to(clave, 'UTF8')), 'hex')), ('usuario_avisos', dueno::text)
  on conflict (nombre) do update set valor = excluded.valor;
  return clave;
end;
$$;
revoke all on function public.taller_nueva_clave(uuid) from public, anon, authenticated;

-- El resumen que leen los avisos. Fechas en hora de Madrid. Con `hasta`, el de la semana que acaba ese día
-- (para rehacer el resumen de una semana pasada); sin él, el de hoy.
drop function if exists public.resumen_taller(text);
create or replace function public.resumen_taller(clave text, hasta date default null)
returns json
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  hoy date := coalesce(hasta, (now() at time zone 'Europe/Madrid')::date);
  esperada text;
  u uuid := (select valor::uuid from public.ajustes where nombre = 'usuario_avisos');
  racha int := 0;
  d date;
begin
  select valor into esperada from public.ajustes where nombre = 'clave_avisos';
  if esperada is null or esperada <> encode(sha256(convert_to(clave, 'UTF8')), 'hex') or u is null then
    raise exception 'clave no válida' using errcode = '28000';
  end if;

  d := case when exists (select 1 from public.sesiones where user_id = u and fecha = hoy) then hoy else hoy - 1 end;
  while exists (select 1 from public.sesiones where user_id = u and fecha = d) loop
    racha := racha + 1;
    d := d - 1;
  end loop;

  return json_build_object(
    'hoy', hoy,
    'hecho_hoy', exists (select 1 from public.sesiones where user_id = u and fecha = hoy),
    'racha', racha,
    'ultimo_dia', (select dia from public.sesiones where user_id = u and fecha <= hoy and dia is not null order by momento desc limit 1),
    'ultima_sesion', (select max(fecha) from public.sesiones where user_id = u and fecha <= hoy),
    'semana', json_build_object(
      'dias_con_sesion', (select count(distinct fecha) from public.sesiones where user_id = u and fecha between hoy - 6 and hoy),
      'dias_hechos', (select coalesce(json_agg(distinct dia), '[]'::json) from public.sesiones where user_id = u and fecha between hoy - 6 and hoy and dia is not null),
      'retos', (select count(*) from public.intentos where user_id = u and fecha between hoy - 6 and hoy),
      'a_la_primera', (select count(*) from public.intentos where user_id = u and fecha between hoy - 6 and hoy and fallos = 0 and not solucion),
      'con_solucion', (select count(*) from public.intentos where user_id = u and fecha between hoy - 6 and hoy and solucion),
      'pistas', (select coalesce(sum(pistas), 0) from public.intentos where user_id = u and fecha between hoy - 6 and hoy),
      'conceptos_fallados', (
        select coalesce(json_agg(c order by c), '[]'::json)
        from (select distinct concepto as c from public.intentos where user_id = u and fecha between hoy - 6 and hoy and (fallos > 0 or solucion)) x
      )
    )
  );
end;
$$;
revoke all on function public.resumen_taller(text, date) from public;
grant execute on function public.resumen_taller(text, date) to anon;

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
grant select, insert, delete on public.suscripciones to authenticated;

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
    'suscripciones', (
      select coalesce(json_agg(datos), '[]'::json) from public.suscripciones
      where user_id = (select valor::uuid from public.ajustes where nombre = 'usuario_avisos')
    )
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
  delete from public.suscripciones s
  where s.endpoint = borrar_suscripcion.endpoint
    and s.user_id = (select valor::uuid from public.ajustes where nombre = 'usuario_avisos');
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

-- ---------- El reloj: Supabase lanza los avisos a su hora ----------

-- Los horarios de GitHub llegan con horas de retraso (en octubre, a las 22:00-23:30 en vez de a las 20:00).
-- Así que el reloj es Supabase (pg_cron, puntual al minuto): a su hora pide a GitHub que ejecute el workflow
-- de avisos, y eso GitHub lo hace en segundos. Para pedirlo usa un token de GitHub que solo puede lanzar
-- workflows del repo `taller`, guardado en el Vault de Supabase con el nombre github_avisos.
-- Sin ese token no hace nada, y siguen los horarios de GitHub como respaldo.
create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

create or replace function public.lanzar_avisos(modo text)
returns void language plpgsql security definer set search_path = ''
as $$
declare
  token text := (select decrypted_secret from vault.decrypted_secrets where name = 'github_avisos');
begin
  if token is null then
    return;
  end if;
  perform net.http_post(
    url := 'https://api.github.com/repos/DManiak1996/taller/actions/workflows/avisos.yml/dispatches',
    body := jsonb_build_object('ref', 'main', 'inputs', jsonb_build_object('modo', modo)),
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || token,
      'Accept', 'application/vnd.github+json',
      'X-GitHub-Api-Version', '2022-11-28',
      'User-Agent', 'taller-avisos',
      'Content-Type', 'application/json'
    )
  );
end;
$$;
revoke all on function public.lanzar_avisos(text) from public, anon, authenticated;

-- pg_cron va en hora UTC. Madrid es UTC+1 en invierno y UTC+2 en verano: se lanza a las dos horas y el
-- script, que mira la hora de Madrid, solo avisa en la buena (y una sola vez al día).
select cron.schedule('taller-aviso-verano', '0 18 * * *', $c$ select public.lanzar_avisos('recordatorio') $c$);
select cron.schedule('taller-aviso-invierno', '0 19 * * *', $c$ select public.lanzar_avisos('recordatorio') $c$);
select cron.schedule('taller-resumen-verano', '0 17 * * 0', $c$ select public.lanzar_avisos('resumen') $c$);
select cron.schedule('taller-resumen-invierno', '0 18 * * 0', $c$ select public.lanzar_avisos('resumen') $c$);
