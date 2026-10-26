// Guarda el progreso en este dispositivo (localStorage) y avisa a la interfaz cuando cambia.
// Si hay sesión iniciada en la nube, cada cambio se sube y se une con lo de otros dispositivos.

import { useSyncExternalStore } from 'react'
import { hoy, nuevoId, unir, vacio, type Intento, type Progreso } from './modelo'
import { nube, sincronizar } from './nube'

const CLAVE = 'taller.progreso.v1'

function leer(): Progreso {
  try {
    const texto = localStorage.getItem(CLAVE)
    if (texto) return { ...vacio(), ...JSON.parse(texto) }
  } catch {
    // modo privado o almacenamiento bloqueado: se empieza de cero en memoria
  }
  return vacio()
}

let actual = leer()
const oyentes = new Set<() => void>()

function cambiar(nuevo: Progreso) {
  actual = nuevo
  try {
    localStorage.setItem(CLAVE, JSON.stringify(actual))
  } catch {
    // sin almacenamiento: el progreso dura lo que la pestaña
  }
  oyentes.forEach((o) => o())
}

export type EstadoNube = 'sin-configurar' | 'sin-sesion' | 'sincronizando' | 'al-dia' | 'error'
let estadoNube: EstadoNube = nube ? 'sin-sesion' : 'sin-configurar'
const oyentesNube = new Set<() => void>()
const ponerEstadoNube = (e: EstadoNube) => {
  estadoNube = e
  oyentesNube.forEach((o) => o())
}

let enCurso: Promise<void> | null = null
export function sincronizarAhora(): Promise<void> {
  if (!nube) return Promise.resolve()
  if (enCurso) return enCurso
  enCurso = (async () => {
    const { data } = await nube!.auth.getSession()
    if (!data.session) return ponerEstadoNube('sin-sesion')
    ponerEstadoNube('sincronizando')
    try {
      cambiar(unir(actual, await sincronizar(actual)))
      ponerEstadoNube('al-dia')
    } catch (e) {
      console.warn('No se pudo sincronizar', e)
      ponerEstadoNube('error')
    }
  })().finally(() => (enCurso = null))
  return enCurso
}

nube?.auth.onAuthStateChange((evento) => {
  if (evento === 'SIGNED_IN' || evento === 'INITIAL_SESSION') void sincronizarAhora()
  if (evento === 'SIGNED_OUT') ponerEstadoNube('sin-sesion')
})
if (typeof window !== 'undefined') window.addEventListener('online', () => void sincronizarAhora())

export const tienda = {
  obtener: () => actual,
  suscribir(o: () => void) {
    oyentes.add(o)
    return () => oyentes.delete(o)
  },
  terminarSesion(dia: string | null) {
    cambiar({ ...actual, sesiones: [...actual.sesiones, { id: nuevoId(), dia, fecha: hoy(), momento: new Date().toISOString() }] })
    void sincronizarAhora()
  },
  guardarIntento(i: Omit<Intento, 'id' | 'fecha' | 'momento'>) {
    cambiar({ ...actual, intentos: [...actual.intentos, { ...i, id: nuevoId(), fecha: hoy(), momento: new Date().toISOString() }] })
    void sincronizarAhora()
  },
}

export const useProgreso = () => useSyncExternalStore(tienda.suscribir, tienda.obtener)
export const useEstadoNube = () =>
  useSyncExternalStore(
    (o) => {
      oyentesNube.add(o)
      return () => oyentesNube.delete(o)
    },
    () => estadoNube,
  )
