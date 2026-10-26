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

// ---- Avisos push (el de las 20:00 si no has hecho el reto) ----

function base64AUint8(b64: string): Uint8Array<ArrayBuffer> {
  const relleno = '='.repeat((4 - (b64.length % 4)) % 4)
  const binario = atob((b64 + relleno).replace(/-/g, '+').replace(/_/g, '/'))
  const bytes = new Uint8Array(new ArrayBuffer(binario.length))
  for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i)
  return bytes
}

export const avisosPosibles = () => typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window

/** ¿Este dispositivo ya tiene los avisos activados? */
export async function avisosActivados(): Promise<boolean> {
  if (!avisosPosibles()) return false
  const registro = await navigator.serviceWorker.getRegistration()
  return Boolean(await registro?.pushManager.getSubscription())
}

/** Pide permiso, suscribe este dispositivo y lo guarda en Supabase. Debe llamarse al tocar un botón. */
export async function activarAvisos(): Promise<void> {
  if (!nube) throw new Error('La nube no está configurada')
  if (!avisosPosibles()) throw new Error('Este navegador no admite avisos. En el iPhone, abre el taller desde el icono de la pantalla de inicio.')
  const permiso = await Notification.requestPermission()
  if (permiso !== 'granted') throw new Error('Sin permiso para avisar. Se puede cambiar en Ajustes › Notificaciones › Taller.')
  const { data: publica, error } = await nube.rpc('vapid_publica')
  if (error) throw error
  if (!publica) throw new Error('Los avisos aún no están preparados en el servidor. Prueba mañana.')
  const registro = await navigator.serviceWorker.ready
  const suscripcion =
    (await registro.pushManager.getSubscription()) ??
    (await registro.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: base64AUint8(publica as string) }))
  const datos = suscripcion.toJSON()
  const { error: e2 } = await nube.from('suscripciones').upsert({ endpoint: datos.endpoint, datos }, { onConflict: 'endpoint', ignoreDuplicates: true })
  if (e2) throw e2
}

export async function desactivarAvisos(): Promise<void> {
  const registro = await navigator.serviceWorker.getRegistration()
  const suscripcion = await registro?.pushManager.getSubscription()
  if (!suscripcion) return
  await nube?.from('suscripciones').delete().eq('endpoint', suscripcion.endpoint)
  await suscripcion.unsubscribe()
}
