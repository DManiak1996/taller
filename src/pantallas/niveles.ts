// Los tres niveles de cada concepto del mapa: leerlo, completarlo y escribirlo.
import { retos } from '../contenido/cargar'
import { fallado, type Progreso } from '../progreso/modelo'

const LEER = new Set(['predecir', 'fallo', 'razon'])
const COMPLETAR = new Set(['hueco', 'ordenar'])

export interface Niveles {
  leer: boolean
  completar: boolean
  escribir: boolean // llega con las misiones
}

/** Un nivel se consigue al acertar a la primera, sin ver la solución, un reto de ese tipo. */
export function niveles(p: Progreso, concepto: string): Niveles {
  const n: Niveles = { leer: false, completar: false, escribir: false }
  for (const i of p.intentos) {
    if (i.concepto !== concepto || fallado(i)) continue
    const tipo = retos.get(i.reto)?.reto.tipo
    if (tipo && LEER.has(tipo)) n.leer = true
    if (tipo && COMPLETAR.has(tipo)) n.completar = true
  }
  return n
}
