// Conexión con Supabase (Postgres en la UE). La clave publicable es pública por diseño:
// lo que protege los datos son las reglas RLS de supabase/esquema.sql.

import { createClient } from '@supabase/supabase-js'
import type { Intento, Progreso, Sesion } from './modelo'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const clave = import.meta.env.VITE_SUPABASE_KEY as string | undefined

export const nube = url && clave ? createClient(url, clave, { auth: { persistSession: true, detectSessionInUrl: true, flowType: 'pkce' } }) : null

/** Sube todo lo local (lo repetido se ignora) y devuelve todo lo que hay en la nube. */
export async function sincronizar(local: Progreso): Promise<Progreso> {
  if (!nube) return local
  const sesiones = local.sesiones.map((s) => ({ id: s.id, dia: s.dia, fecha: s.fecha, momento: s.momento }))
  const intentos = local.intentos.map((i) => ({
    id: i.id, reto: i.reto, concepto: i.concepto, dia: i.dia, modo: i.modo,
    fallos: i.fallos, pistas: i.pistas, solucion: i.solucion, fecha: i.fecha, momento: i.momento,
  }))
  if (sesiones.length) {
    const { error } = await nube.from('sesiones').upsert(sesiones, { onConflict: 'id', ignoreDuplicates: true })
    if (error) throw error
  }
  if (intentos.length) {
    const { error } = await nube.from('intentos').upsert(intentos, { onConflict: 'id', ignoreDuplicates: true })
    if (error) throw error
  }
  const [s, i] = await Promise.all([
    nube.from('sesiones').select('id, dia, fecha, momento').order('momento'),
    nube.from('intentos').select('id, reto, concepto, dia, modo, fallos, pistas, solucion, fecha, momento').order('momento'),
  ])
  if (s.error) throw s.error
  if (i.error) throw i.error
  return { sesiones: s.data as Sesion[], intentos: i.data as Intento[] }
}

/** Paso 1 del acceso: envía un email con un código de 6 cifras (y un enlace, para el ordenador). */
export async function pedirCodigo(email: string) {
  if (!nube) throw new Error('La nube no está configurada')
  const { error } = await nube.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + import.meta.env.BASE_URL } })
  if (error) throw error
}

/** Paso 2: el código del email. Hace falta en el iPhone, porque la app instalada no comparte sesión con Safari. */
export async function comprobarCodigo(email: string, codigo: string) {
  if (!nube) throw new Error('La nube no está configurada')
  const { error } = await nube.auth.verifyOtp({ email, token: codigo.trim(), type: 'email' })
  if (error) throw error
}

export async function cerrarSesion() {
  await nube?.auth.signOut()
}
