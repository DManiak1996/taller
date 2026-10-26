-- Tablas del progreso del taller. Pega este fichero entero en Supabase:
-- SQL Editor > New query > pegar > Run. Se puede ejecutar más de una vez sin romper nada.
--
-- Solo se guardan dos cosas: las sesiones terminadas y cada intento de reto.
-- Con RLS (Row Level Security) activado, cada usuario solo puede ver y escribir sus propias filas,
-- aunque la clave publicable esté en la web a la vista de todos.

create table if not exists public.sesiones (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  dia text,                       -- "s01-d01", o null si fue solo repaso
  fecha date not null,            -- el día, en hora de Madrid
  momento timestamptz not null    -- fecha y hora exactas
);

create table if not exists public.intentos (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  reto text not null,             -- "s01-d01-r1"
  concepto text not null,         -- "orden-ejecucion"
  dia text,
  modo text not null check (modo in ('reto', 'repaso')),
  fallos int not null check (fallos >= 0),
  pistas int not null check (pistas between 0 and 3),
  solucion boolean not null,
  fecha date not null,
  momento timestamptz not null
);

create index if not exists sesiones_usuario on public.sesiones (user_id, fecha);
create index if not exists intentos_usuario on public.intentos (user_id, momento);

alter table public.sesiones enable row level security;
alter table public.intentos enable row level security;

drop policy if exists "ver mis sesiones" on public.sesiones;
drop policy if exists "guardar mis sesiones" on public.sesiones;
drop policy if exists "ver mis intentos" on public.intentos;
drop policy if exists "guardar mis intentos" on public.intentos;

create policy "ver mis sesiones" on public.sesiones for select to authenticated using (user_id = (select auth.uid()));
create policy "guardar mis sesiones" on public.sesiones for insert to authenticated with check (user_id = (select auth.uid()));
create policy "ver mis intentos" on public.intentos for select to authenticated using (user_id = (select auth.uid()));
create policy "guardar mis intentos" on public.intentos for insert to authenticated with check (user_id = (select auth.uid()));

-- Nadie (ni anónimo ni con sesión) puede modificar ni borrar filas desde la web: el progreso solo crece.
revoke update, delete on public.sesiones, public.intentos from anon, authenticated;
revoke all on public.sesiones, public.intentos from anon;
