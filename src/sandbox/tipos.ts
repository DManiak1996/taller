export interface PasoTraza {
  linea: number // línea que se acaba de ejecutar (empieza en 1)
  variables: Record<string, string> // valores escritos como en el código
  salida: string[] // todo lo impreso hasta ese momento
  parte?: 'inicio' | 'condicion' | 'paso' // qué parte de un for, while o if se acaba de ejecutar
  condicion?: { texto: string; cumple: boolean } // "1 <= 3" y si se cumple
}

export interface ErrorEjecucion {
  nombre: string // ReferenceError, TypeError, SyntaxError, BucleInfinito, TiempoAgotado...
  mensaje: string // el mensaje original, en inglés
  explicacion: string // el mismo error en lenguaje llano
  linea?: number
}

export interface Resultado {
  salida: string[]
  lineasSalida?: number[] // la línea del código que imprimió cada línea de la salida
  pasos: PasoTraza[]
  pasosCortados: boolean
  error?: ErrorEjecucion
}
