// Los tres niveles de cada concepto del mapa: leerlo, completarlo y escribirlo.
import { retos, retosEscribir } from '../contenido/cargar'
import { fallado, type Progreso } from '../progreso/modelo'

const LEER = new Set(['predecir', 'fallo', 'razon'])
const COMPLETAR = new Set(['hueco', 'ordenar'])

export interface Niveles {
  leer: boolean
  completar: boolean
  escribir: boolean // con el «escribir» del bloque «Para nota»
}

/** Un nivel se consigue al acertar a la primera, sin ver la solución, un reto de ese tipo. En «escribir»
 * se puede comprobar las veces que haga falta: basta con acertar sin ver la solución. */
export function niveles(p: Progreso, concepto: string): Niveles {
  const n: Niveles = { leer: false, completar: false, escribir: false }
  for (const i of p.intentos) {
    if (i.concepto !== concepto || fallado(i)) continue
    const tipo = retos.get(i.reto)?.reto.tipo
    if (tipo && LEER.has(tipo)) n.leer = true
    if (tipo && COMPLETAR.has(tipo)) n.completar = true
    if (retosEscribir.has(i.reto)) n.escribir = true
  }
  return n
}
