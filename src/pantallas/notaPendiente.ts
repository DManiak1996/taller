// Lo que queda de «Para nota». Va aparte de ParaNota.tsx para que Inicio no cargue el editor.

import { dias, type DiaListo } from '../contenido/cargar'
import type { Progreso } from '../progreso/modelo'

/** Los días terminados que traen «Para nota», del más reciente al más antiguo. */
export function diasConNota(p: Progreso): DiaListo[] {
  const hechos = new Set(p.sesiones.map((s) => s.dia))
  return dias.filter((d) => d.paraNota && hechos.has(d.id)).reverse()
}

const intentado = (p: Progreso, reto: string) => p.intentos.some((i) => i.reto === reto)

/** Cuántas piezas de «Para nota» le quedan por hacer en los días que ya ha terminado. */
export const notaPendiente = (p: Progreso) =>
  diasConNota(p).reduce((n, d) => n + Number(!intentado(p, d.paraNota!.reto.id)) + Number(!intentado(p, d.paraNota!.escribir.id)), 0)
