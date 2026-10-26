// El progreso de Daniel son solo dos listas de hechos que nunca se borran:
// las sesiones que terminó y cada intento de reto. Todo lo demás (racha, repasos,
// mapa de conceptos) se calcula a partir de ellas, así que no se puede desincronizar.

export interface Sesion {
  id: string
  dia: string | null // "s01-d01", o null si fue una sesión solo de repaso
  fecha: string // AAAA-MM-DD en hora de Madrid
  momento: string // fecha y hora ISO
}

export interface Intento {
  id: string
  reto: string
  concepto: string
  dia: string | null
  modo: 'reto' | 'repaso'
  fallos: number // respuestas equivocadas antes de acertar
  pistas: number // pistas que pidió
  solucion: boolean // si tuvo que ver la solución
  fecha: string
  momento: string
}

export interface Progreso {
  sesiones: Sesion[]
  intentos: Intento[]
}

export const vacio = (): Progreso => ({ sesiones: [], intentos: [] })

// ---- Fechas (siempre en hora de Madrid, que es donde vive Daniel) ----

const formato = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' })
export const hoy = (ahora = new Date()) => formato.format(ahora)

export function sumarDias(fecha: string, n: number): string {
  const d = new Date(fecha + 'T12:00:00Z')
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

export const diasEntre = (desde: string, hasta: string) =>
  Math.round((Date.parse(hasta + 'T12:00:00Z') - Date.parse(desde + 'T12:00:00Z')) / 86_400_000)

/** 0 = lunes ... 6 = domingo */
export const diaSemana = (fecha: string) => (new Date(fecha + 'T12:00:00Z').getUTCDay() + 6) % 7

// ---- Racha ----

/** Días seguidos con al menos una sesión, contando hasta hoy (o hasta ayer si hoy aún no ha hecho nada). */
export function racha(p: Progreso, fechaHoy: string): number {
  const fechas = new Set(p.sesiones.map((s) => s.fecha))
  let dia = fechas.has(fechaHoy) ? fechaHoy : sumarDias(fechaHoy, -1)
  let n = 0
  while (fechas.has(dia)) {
    n++
    dia = sumarDias(dia, -1)
  }
  return n
}

export const hechoHoy = (p: Progreso, fechaHoy: string) => p.sesiones.some((s) => s.fecha === fechaHoy)

/** Como mucho se hacen 2 días de contenido por día de calendario (la racha sigue contando días de calendario). */
export const MAX_DIAS_AL_DIA = 2

/** Cuántos días de contenido distintos terminó en esa fecha (las sesiones de solo repaso no cuentan). */
export const diasDeContenido = (p: Progreso, fecha: string) =>
  new Set(p.sesiones.filter((s) => s.fecha === fecha && s.dia).map((s) => s.dia)).size

/** Con el reto de hoy hecho, ¿puede seguir con el día siguiente? */
export const puedeSeguir = (p: Progreso, fechaHoy: string) => {
  const n = diasDeContenido(p, fechaHoy)
  return n >= 1 && n < MAX_DIAS_AL_DIA
}

/** Lunes a domingo de la semana de hoy, y si ese día hubo sesión. */
export function semanaActual(p: Progreso, fechaHoy: string) {
  const lunes = sumarDias(fechaHoy, -diaSemana(fechaHoy))
  const fechas = new Set(p.sesiones.map((s) => s.fecha))
  return ['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((letra, i) => {
    const fecha = sumarDias(lunes, i)
    return { letra, fecha, hecho: fechas.has(fecha), esHoy: fecha === fechaHoy, futuro: fecha > fechaHoy }
  })
}

// ---- Días ----

/** Los días son secuenciales: el de hoy es el primero que no ha terminado. */
export function siguienteDia<T extends { id: string }>(p: Progreso, dias: T[]): T | undefined {
  const hechos = new Set(p.sesiones.map((s) => s.dia))
  return dias.find((d) => !hechos.has(d.id))
}

// ---- Repaso espaciado: lo que falla vuelve a los 1, 3 y 7 días ----

const INTERVALOS = [1, 3, 7]

export const fallado = (i: Intento) => i.fallos > 0 || i.solucion

export interface Repaso {
  concepto: string
  nivel: number // 0, 1 o 2: cuántos repasos seguidos ha acertado
  toca: string // fecha en la que vuelve
  desde: string // fecha del fallo que lo metió en repaso
}

/** Conceptos en repaso. Un fallo lo mete (o lo devuelve al nivel 0); cada acierto en repaso lo sube; tras 3, sale. */
export function repasos(p: Progreso): Map<string, Repaso> {
  const estado = new Map<string, Repaso>()
  const ordenados = [...p.intentos].sort((a, b) => a.momento.localeCompare(b.momento))
  for (const i of ordenados) {
    const actual = estado.get(i.concepto)
    if (fallado(i)) {
      estado.set(i.concepto, { concepto: i.concepto, nivel: 0, toca: sumarDias(i.fecha, INTERVALOS[0]), desde: i.fecha })
    } else if (actual && i.modo === 'repaso') {
      const nivel = actual.nivel + 1
      if (nivel >= INTERVALOS.length) estado.delete(i.concepto)
      else estado.set(i.concepto, { ...actual, nivel, toca: sumarDias(i.fecha, INTERVALOS[nivel]) })
    }
  }
  return estado
}

/** Conceptos que entraron en repaso y aguantaron hasta el de los 7 días. */
export function repasosSuperados(p: Progreso): Set<string> {
  const nivel = new Map<string, number>()
  const superados = new Set<string>()
  for (const i of [...p.intentos].sort((a, b) => a.momento.localeCompare(b.momento))) {
    if (fallado(i)) {
      nivel.set(i.concepto, 0)
      superados.delete(i.concepto)
    } else if (nivel.has(i.concepto) && i.modo === 'repaso') {
      const n = nivel.get(i.concepto)! + 1
      if (n >= INTERVALOS.length) {
        nivel.delete(i.concepto)
        superados.add(i.concepto)
      } else nivel.set(i.concepto, n)
    }
  }
  return superados
}

/** El repaso que toca hoy (el más antiguo), si hay alguno. */
export function repasoDeHoy(p: Progreso, fechaHoy: string): Repaso | undefined {
  return [...repasos(p).values()].filter((r) => r.toca <= fechaHoy).sort((a, b) => a.toca.localeCompare(b.toca))[0]
}

// ---- Mapa de conceptos ----

export type EstadoConcepto = 'nuevo' | 'repasando' | 'dominado'

export function estadoConceptos(p: Progreso): Map<string, EstadoConcepto> {
  const enRepaso = repasos(p)
  const estado = new Map<string, EstadoConcepto>()
  for (const i of p.intentos) estado.set(i.concepto, enRepaso.has(i.concepto) ? 'repasando' : 'dominado')
  return estado
}

// ---- Unir el progreso de dos dispositivos ----

export function unir(a: Progreso, b: Progreso): Progreso {
  const porId = <T extends { id: string }>(x: T[], y: T[]) => {
    const m = new Map<string, T>()
    for (const e of [...x, ...y]) m.set(e.id, e)
    return [...m.values()].sort((p, q) => (p as unknown as { momento: string }).momento.localeCompare((q as unknown as { momento: string }).momento))
  }
  return { sesiones: porId(a.sesiones, b.sesiones), intentos: porId(a.intentos, b.intentos) }
}

export const nuevoId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
      })
