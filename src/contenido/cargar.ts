// Carga todo el contenido de la carpeta contenido/ (los JSON que escriben los profesores)
// y resuelve las referencias { ref: "id" } a los retos de revisión.

import catalogo from '../../contenido/conceptos.json'
import type { Dia, Reto, RetoEscribir, RetoODeRef } from '../../contenido/formato'

export type { Dia, Reto, Pantalla, Paso, Opcion, ParaNota, RetoEscribir } from '../../contenido/formato'

export interface DiaListo extends Omit<Dia, 'retos' | 'repaso'> {
  retos: Reto[]
  repaso: Reto[]
}

const ficherosDias = import.meta.glob<Dia>('../../contenido/semana-*/dia-*.json', { eager: true, import: 'default' })
const ficherosRevision = import.meta.glob<Reto[]>('../../contenido/revision/semana-*.json', { eager: true, import: 'default' })

export const retosRevision: Map<string, Reto> = new Map()
for (const lista of Object.values(ficherosRevision)) for (const r of lista) retosRevision.set(r.id, r)

function resolver(r: RetoODeRef, dia: string): Reto {
  if ('ref' in r) {
    const encontrado = retosRevision.get(r.ref)
    if (!encontrado) throw new Error(`${dia}: no existe el reto de revisión ${r.ref}`)
    return encontrado
  }
  return r
}

export const dias: DiaListo[] = Object.values(ficherosDias)
  .map((d) => ({ ...d, retos: d.retos.map((r) => resolver(r, d.id)), repaso: d.repaso.map((r) => resolver(r, d.id)) }))
  .sort((a, b) => a.semana - b.semana || a.dia - b.dia)

/** Todos los retos, con el día en que aparecen por primera vez. */
export const retos: Map<string, { reto: Reto; dia: string; deReserva: boolean }> = new Map()
for (const d of dias) {
  for (const r of d.retos) if (!retos.has(r.id)) retos.set(r.id, { reto: r, dia: d.id, deReserva: false })
  for (const r of d.repaso) if (!retos.has(r.id)) retos.set(r.id, { reto: r, dia: d.id, deReserva: true })
  // El reto «para nota» es más difícil: puede salir en un repaso como uno de reserva.
  if (d.paraNota && !retos.has(d.paraNota.reto.id)) retos.set(d.paraNota.reto.id, { reto: d.paraNota.reto, dia: d.id, deReserva: true })
}

/** Los retos «escribir» del bloque «Para nota», con su día. */
export const retosEscribir: Map<string, { reto: RetoEscribir; dia: string }> = new Map()
for (const d of dias) if (d.paraNota) retosEscribir.set(d.paraNota.escribir.id, { reto: d.paraNota.escribir, dia: d.id })

/** Catálogo de conceptos de las 16 semanas (lo mantiene Dirección pedagógica). */
export const conceptos: { id: string; nombre: string; semana: number }[] = catalogo
export const nombreConcepto = (id: string) => conceptos.find((c) => c.id === id)?.nombre ?? id
