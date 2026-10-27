// Comprueba un reto «escribir»: ejecuta los datos fijos + lo que ha escrito Daniel y compara la consola
// con la salida esperada, primero con los datos que ve y después con cada variante (otros datos que no
// ve), para que no valga escribir el resultado a mano.

import type { RetoEscribir } from '../../contenido/formato'
import type { ErrorEjecucion, Resultado } from './tipos'

export interface Caso {
  datos: string
  salidaEsperada: string[]
  variante: boolean // false: los datos que ve en pantalla
}

export interface Fallo {
  caso: Caso
  obtenido: string[]
  error?: ErrorEjecucion // con la línea ya contada desde su código, no desde los datos
  lineaDiferencia?: number // la línea de su código que imprimió la primera salida que no coincide
}

export type Comprobacion = { ok: true } | { ok: false; fallo: Fallo }

export const casos = (r: RetoEscribir): Caso[] => [
  { datos: r.datos ?? '', salidaEsperada: r.salidaEsperada, variante: false },
  ...(r.variantes ?? []).map((v) => ({ ...v, variante: true })),
]

/** El programa que se ejecuta: los datos fijos encima de lo que escribe él. */
export const programa = (datos: string, codigo: string) => (datos ? datos + '\n' + codigo : codigo)

const lineasDe = (texto: string) => (texto ? texto.split('\n').length : 0)
const limpiar = (lineas: string[]) => lineas.map((l) => l.replace(/\s+$/, ''))

export const mismaSalida = (a: string[], b: string[]) => JSON.stringify(limpiar(a)) === JSON.stringify(limpiar(b))

/** La posición en lo obtenido de la primera línea que no coincide; -1 si solo faltan líneas al final. */
export function primeraDiferencia(esperado: string[], obtenido: string[]): number {
  const a = limpiar(esperado)
  const b = limpiar(obtenido)
  return b.findIndex((l, i) => l !== a[i])
}

export async function comprobar(r: RetoEscribir, codigo: string, correr: (programa: string) => Promise<Resultado> | Resultado): Promise<Comprobacion> {
  for (const caso of casos(r)) {
    const res = await correr(programa(caso.datos, codigo))
    if (!res.error && mismaSalida(res.salida, caso.salidaEsperada)) continue
    const n = lineasDe(caso.datos)
    const desdeSuCodigo = (l?: number) => (l && l > n ? l - n : undefined)
    const error = res.error && { ...res.error, linea: desdeSuCodigo(res.error.linea) }
    const i = primeraDiferencia(caso.salidaEsperada, res.salida)
    const lineaDiferencia = i < 0 ? undefined : desdeSuCodigo(res.lineasSalida?.[i])
    return { ok: false, fallo: { caso, obtenido: res.salida, error, ...(lineaDiferencia && { lineaDiferencia }) } }
  }
  return { ok: true }
}

export interface LineaDiff {
  tipo: 'igual' | 'esperado' | 'obtenido'
  texto: string
}

/** Diferencia línea a línea, como la enseña vitest: las iguales una vez; donde no coinciden, lo esperado y debajo lo obtenido. */
export function diferencias(esperado: string[], obtenido: string[]): LineaDiff[] {
  const a = limpiar(esperado)
  const b = limpiar(obtenido)
  const out: LineaDiff[] = []
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] === b[i]) out.push({ tipo: 'igual', texto: a[i] })
    else {
      if (i < a.length) out.push({ tipo: 'esperado', texto: a[i] })
      if (i < b.length) out.push({ tipo: 'obtenido', texto: b[i] })
    }
  }
  return out
}
