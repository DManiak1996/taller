// Conexión con Supabase (Postgres en la UE). La clave publicable es pública por diseño:
// lo que protege los datos son las reglas RLS de supabase/esquema.sql.

import { createClient } from '@supabase/supabase-js'
import type { Intento, Progreso, Sesion } from './modelo'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const clave = import.meta.env.VITE_SUPABASE_KEY as string | undefined

export const nube = url && clave ? createClient(url, clave, { auth: { persistSession: true, detectSessionInUrl: true, flowType: 'pkce' } }) : null

/**
 * Explica en castellano un error de Supabase, con lo que hay que hacer para arreglarlo.
 * Nunca se enseña el mensaje original en inglés; el código sí, porque ayuda a diagnosticar.
 */
export function explicarErrorNube(e: unknown): string {
  const { code, message, status } = (e ?? {}) as { code?: string; message?: string; status?: number }
  const m = message ?? String(e)
  if (code === 'PGRST205' || code === '42P01' || /could not find the table|does not exist/i.test(m))
    return 'Faltan las tablas del progreso en Supabase. Hay que ejecutar supabase/esquema.sql en el SQL Editor.'
  if (code === 'PGRST202' || /could not find the function/i.test(m))
    return 'Falta una función en Supabase. Hay que ejecutar supabase/avisos.sql en el SQL Editor.'
  if (code === '42501' || /permission denied/i.test(m))
    return 'Supabase no da permiso para leer o guardar tu progreso. Hay que ejecutar otra vez supabase/esquema.sql (la versión nueva, que añade los permisos).'
  if (code === 'PGRST301' || code === 'PGRST303' || status === 401 || /jwt/i.test(m)) return 'Tu sesión ha caducado. Sal y vuelve a entrar.'
  if (code === '23503') return 'Tu cuenta ya no existe en Supabase. Sal y vuelve a entrar.'
  if (code === '23514' || code === '22P02') return 'Supabase ha rechazado un dato del progreso porque no cumple las reglas de la tabla.'
  if (e instanceof TypeError || /fetch|network|load failed/i.test(m)) return 'No se ha podido conectar con Supabase. Se reintentará cuando vuelva la conexión.'
  return `Supabase ha devuelto un error que no conocemos${code ? ` (código ${code})` : ''}.`
}

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

// Acceso con email y contraseña: no depende de que llegue ningún correo, y el iPhone la guarda
// en el llavero. Funciona igual en la app instalada (que no comparte sesión con Safari) y en el Mac.

const ERRORES_ACCESO: [RegExp, string][] = [
  [/invalid login credentials/i, 'El email o la contraseña no coinciden.'],
  [/already registered|already exists/i, 'Ya hay una cuenta con ese email. Entra con tu contraseña.'],
  [/signups? not allowed|signup.*disabled/i, 'Ya no se pueden crear cuentas nuevas. Entra con la tuya.'],
  [/password.*(at least|characters|weak)/i, 'La contraseña es demasiado corta o fácil de adivinar. Prueba con una más larga.'],
  [/email not confirmed/i, 'Falta confirmar el email. En Supabase hay que desactivar «Confirm email».'],
  [/rate limit|too many/i, 'Demasiados intentos seguidos. Espera un minuto y vuelve a probar.'],
  [/fetch|network|load failed/i, 'No hay conexión. Prueba otra vez cuando tengas internet.'],
]

function enCastellano(error: { message: string }): Error {
  const traduccion = ERRORES_ACCESO.find(([patron]) => patron.test(error.message))
  if (!traduccion) console.warn('Error al entrar', error)
  return new Error(traduccion ? traduccion[1] : 'No se ha podido entrar. Prueba otra vez dentro de un rato.')
}

export async function entrar(email: string, contrasena: string) {
  if (!nube) throw new Error('La nube no está configurada')
  const { error } = await nube.auth.signInWithPassword({ email, password: contrasena })
  if (error) throw enCastellano(error)
}

export async function crearCuenta(email: string, contrasena: string) {
  if (!nube) throw new Error('La nube no está configurada')
  const { data, error } = await nube.auth.signUp({ email, password: contrasena })
  if (error) throw enCastellano(error)
  // Con «Confirm email» activado, Supabase crea la cuenta pero no abre sesión hasta confirmar.
  if (!data.session) throw new Error('Cuenta creada, pero falta confirmar el email. En Supabase hay que desactivar «Confirm email».')
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

/**
 * ¿Están los avisos montados en Supabase? 'sin-configurar' si aún no se ejecutó avisos.sql,
 * 'pendiente' si falta la primera ejecución del aviso (que crea las claves de push), 'listo' si se puede activar.
 */
export async function estadoAvisos(): Promise<'sin-configurar' | 'pendiente' | 'listo'> {
  if (!nube) return 'sin-configurar'
  const { data, error } = await nube.rpc('vapid_publica')
  if (error) return 'sin-configurar'
  return data ? 'listo' : 'pendiente'
}

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
  if (error) throw new Error(explicarErrorNube(error))
  if (!publica) throw new Error('Los avisos aún no están preparados en el servidor. Prueba mañana.')
  const registro = await navigator.serviceWorker.ready
  let suscripcion: PushSubscription
  try {
    suscripcion =
      (await registro.pushManager.getSubscription()) ??
      (await registro.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: base64AUint8(publica as string) }))
  } catch (e) {
    console.warn('No se pudo suscribir a los avisos', e)
    throw new Error('El iPhone no ha dejado registrar este dispositivo para avisos. Prueba otra vez más tarde.')
  }
  const datos = suscripcion.toJSON()
  const { error: e2 } = await nube.from('suscripciones').upsert({ endpoint: datos.endpoint, datos }, { onConflict: 'endpoint', ignoreDuplicates: true })
  if (e2) throw new Error(explicarErrorNube(e2))
}

export async function desactivarAvisos(): Promise<void> {
  const registro = await navigator.serviceWorker.getRegistration()
  const suscripcion = await registro?.pushManager.getSubscription()
  if (!suscripcion) return
  await nube?.from('suscripciones').delete().eq('endpoint', suscripcion.endpoint)
  await suscripcion.unsubscribe()
}
