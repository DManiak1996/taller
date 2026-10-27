// El "núcleo" es lo que corre DENTRO del sandbox, junto al código de Daniel.
// Se envía al sandbox como texto (con .toString()), así que esta función no puede
// usar nada de fuera: ni imports ni variables del módulo. Todo lo que necesita está dentro.

import type { PasoTraza, Resultado } from './tipos'

export function crearEntorno(maxPasos: number, maxVueltas: number) {
  const salida: string[] = []
  const lineasSalida: number[] = []
  const pasos: PasoTraza[] = []
  let lineaActual = 0
  let vueltas = 0
  let pasosCortados = false

  // ---- Cómo se escribe un valor ----

  // Como lo imprime console.log en Node (lo que Daniel verá en su terminal).
  function inspeccionar(v: unknown, profundidad: number, vistos: unknown[]): string {
    if (typeof v === 'string') {
      return v.includes("'") && !v.includes('"') ? '"' + v + '"' : "'" + v.replace(/'/g, "\\'") + "'"
    }
    if (typeof v === 'number') return Object.is(v, -0) ? '-0' : String(v)
    if (typeof v === 'bigint') return v + 'n'
    if (typeof v === 'function') return v.name ? '[Function: ' + v.name + ']' : '[Function (anonymous)]'
    if (typeof v === 'symbol') return v.toString()
    if (v === null || typeof v !== 'object') return String(v)
    if (vistos.includes(v)) return '[Circular *1]'
    if (v instanceof Error) return v.name + ': ' + v.message
    if (v instanceof Date) return v.toISOString()
    const dentro = vistos.concat([v])
    if (Array.isArray(v)) {
      if (v.length === 0) return '[]'
      if (profundidad > 2) return '[Array]'
      return '[ ' + v.map((x) => inspeccionar(x, profundidad + 1, dentro)).join(', ') + ' ]'
    }
    if (v instanceof Map) {
      const items = [...v].map(([k, x]) => inspeccionar(k, profundidad + 1, dentro) + ' => ' + inspeccionar(x, profundidad + 1, dentro))
      return 'Map(' + v.size + ') ' + (items.length ? '{ ' + items.join(', ') + ' }' : '{}')
    }
    if (v instanceof Set) {
      const items = [...v].map((x) => inspeccionar(x, profundidad + 1, dentro))
      return 'Set(' + v.size + ') ' + (items.length ? '{ ' + items.join(', ') + ' }' : '{}')
    }
    const claves = Object.keys(v)
    if (claves.length === 0) return '{}'
    if (profundidad > 2) return '[Object]'
    const partes = claves.map((k) => {
      const nombre = /^[A-Za-z_$][\w$]*$/.test(k) ? k : "'" + k + "'"
      return nombre + ': ' + inspeccionar((v as Record<string, unknown>)[k], profundidad + 1, dentro)
    })
    return '{ ' + partes.join(', ') + ' }'
  }

  function comoConsola(args: unknown[]): string {
    return args.map((a) => (typeof a === 'string' ? a : inspeccionar(a, 0, []))).join(' ')
  }

  // Como se escribiría en el código (para el visualizador): "texto", [1, 2], { a: 1 }.
  function comoCodigo(v: unknown, profundidad: number): string {
    if (typeof v === 'string') return JSON.stringify(v)
    if (typeof v === 'function') return 'función'
    if (v === null || typeof v !== 'object') return typeof v === 'number' && Object.is(v, -0) ? '-0' : String(v)
    if (profundidad > 3) return '…'
    if (Array.isArray(v)) return '[' + v.map((x) => comoCodigo(x, profundidad + 1)).join(', ') + ']'
    const claves = Object.keys(v)
    if (claves.length === 0) return '{}'
    return '{ ' + claves.map((k) => k + ': ' + comoCodigo((v as Record<string, unknown>)[k], profundidad + 1)).join(', ') + ' }'
  }

  // ---- Errores en lenguaje llano ----

  function explicarError(e: unknown): { nombre: string; mensaje: string; explicacion: string } {
    const nombre = e instanceof Error ? e.name : 'Error'
    const mensaje = e instanceof Error ? e.message : String(e)
    let explicacion = mensaje
    let m: RegExpMatchArray | null
    if ((m = mensaje.match(/^(?:Can't find variable: (\S+)|(\S+) is not defined)$/))) {
      explicacion = 'No existe ninguna variable llamada ' + (m[1] || m[2]) + '. ¿Está bien escrita? ¿Se ha creado antes de usarla?'
    } else if ((m = mensaje.match(/^Cannot access '(\S+)' before initialization$/))) {
      explicacion = 'Usas ' + m[1] + ' antes de la línea que la crea.'
    } else if (/Assignment to constant variable|Attempted to assign to readonly property/.test(mensaje)) {
      explicacion = 'Intentas cambiar una const. Una const no se puede volver a asignar; si va a cambiar, usa let.'
    } else if (/Maximum call stack size exceeded/.test(mensaje)) {
      explicacion = 'Una función se llama a sí misma sin parar.'
    } else if ((m = mensaje.match(/^(\S+) is not a function/))) {
      explicacion = m[1] + ' no es una función, así que no se puede llamar con ().'
    } else if (/Cannot read propert(y|ies) of (undefined|null)/.test(mensaje)) {
      explicacion = 'Intentas leer algo dentro de un valor vacío (undefined o null).'
    } else if (/Cannot set propert(y|ies) of (undefined|null)/.test(mensaje)) {
      explicacion = 'Intentas guardar algo dentro de un valor vacío (undefined o null).'
    } else if ((m = mensaje.match(/^(\S+) is not iterable/))) {
      explicacion = m[1] + ' no es una lista, así que no se puede recorrer con for...of.'
    } else if ((m = mensaje.match(/^(\S+) is not a constructor/))) {
      explicacion = m[1] + ' no se puede usar con new.'
    } else if (/Invalid array length/.test(mensaje)) {
      explicacion = 'Has pedido una lista con un tamaño imposible (negativo o enorme).'
    } else if (nombre === 'Error' && e instanceof Error) {
      explicacion = 'El programa ha lanzado un error a propósito con este mensaje: «' + mensaje + '».'
    } else if (nombre === 'TypeError') {
      explicacion = 'Usas un valor de una forma que no admite (por ejemplo, llamar a algo que no es una función).'
    } else if (nombre === 'RangeError') {
      explicacion = 'Un número está fuera de lo que se permite.'
    } else if (nombre === 'SyntaxError') {
      explicacion = 'El código está mal escrito: falta o sobra algo.'
    } else {
      explicacion = 'El programa ha fallado con un error que el taller aún no sabe explicar.'
    }
    return { nombre, mensaje, explicacion }
  }

  // ---- Lo que el código instrumentado llama ----

  function imprimir(n: number, args: unknown[]) {
    if (salida.length >= 1000) return
    salida.push(comoConsola(args))
    lineasSalida.push(n)
  }

  const consola = {
    log: (...args: unknown[]) => imprimir(lineaActual, args),
    // console.log(...) del código de Daniel llega aquí con su línea (ver transformar.ts): lineaActual
    // no vale si un argumento llama a una función, porque entonces apunta a la última línea de esa función.
    __log: (n: number, ...args: unknown[]) => imprimir(n, args),
  }

  function linea(n: number) {
    lineaActual = n
  }

  function paso(n: number, lectores: Record<string, () => unknown>, parte?: PasoTraza['parte']): PasoTraza | undefined {
    if (pasos.length >= maxPasos) {
      pasosCortados = maxPasos > 0
      return
    }
    const variables: Record<string, string> = {}
    for (const nombre of Object.keys(lectores)) {
      try {
        variables[nombre] = comoCodigo(lectores[nombre](), 0)
      } catch {
        // la variable todavía no existe en este punto (zona muerta de let/const)
      }
    }
    const p: PasoTraza = { linea: n, variables, salida: salida.slice() }
    if (parte) p.parte = parte
    pasos.push(p)
    return p
  }

  // "i <= 3" se muestra como "1 <= 3": cambia cada variable sencilla por su valor
  function sustituir(fuente: string, variables: Record<string, string>): string {
    return fuente.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`)|\b([A-Za-z_$][\w$]*)\b(?!\s*[.[(])/g, (todo, cadena, nombre) => {
      if (cadena || !(nombre in variables)) return todo
      const v = variables[nombre]
      return /^[[{]/.test(v) ? todo : v
    })
  }

  function condicion<T>(n: number, lectores: Record<string, () => unknown>, fuente: string, valor: () => T): T {
    lineaActual = n
    const v = valor()
    const p = paso(n, lectores, 'condicion')
    if (p) p.condicion = { texto: sustituir(fuente, p.variables), cumple: Boolean(v) }
    return v
  }

  function vuelta() {
    vueltas++
    if (vueltas > maxVueltas) {
      const e = new Error('BUCLE_INFINITO')
      e.name = 'BucleInfinito'
      throw e
    }
  }

  // ---- test y expect, como en Vitest pero en pequeño (semana 8) ----
  // Un test que falla no para el programa: se imprime y se sigue con el siguiente.
  // scripts/pruebas-en-node.js hace lo mismo en Node para las pruebas del contenido.

  const FALLO = 'FalloExpect'

  function igual(a: unknown, b: unknown): boolean {
    if (Object.is(a, b)) return true
    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false
    if (Array.isArray(a) !== Array.isArray(b)) return false
    const ka = Object.keys(a)
    const kb = Object.keys(b)
    return ka.length === kb.length && ka.every((k) => k in b && igual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]))
  }

  function expect(recibido: unknown) {
    const comprobar = (ok: boolean, esperado: unknown) => {
      if (ok) return
      const e = new Error('expect') as Error & { esperado: unknown; recibido: unknown }
      e.name = FALLO
      e.esperado = esperado
      e.recibido = recibido
      throw e
    }
    return {
      toBe: (esperado: unknown) => comprobar(Object.is(recibido, esperado), esperado),
      toEqual: (esperado: unknown) => comprobar(igual(recibido, esperado), esperado),
    }
  }

  function test(nombre: string, fn: () => void) {
    try {
      fn()
      consola.log('✓ ' + nombre)
    } catch (e) {
      if (e instanceof Error && e.name === 'BucleInfinito') throw e
      consola.log('× ' + nombre)
      if (e instanceof Error && e.name === FALLO) {
        const f = e as Error & { esperado: unknown; recibido: unknown }
        consola.log('  Expected: ' + inspeccionar(f.esperado, 0, []))
        consola.log('  Received: ' + inspeccionar(f.recibido, 0, []))
      } else consola.log('  ' + (e instanceof Error ? e.name + ': ' + e.message : String(e)))
    }
  }

  function terminar(e?: unknown): Resultado {
    const r: Resultado = { salida, lineasSalida, pasos, pasosCortados }
    if (e !== undefined) {
      if (e instanceof Error && e.name === 'BucleInfinito') {
        r.error = {
          nombre: 'BucleInfinito',
          mensaje: 'Demasiadas vueltas',
          explicacion: 'El bucle no termina nunca: la condición nunca llega a ser falsa.',
          linea: lineaActual,
        }
      } else {
        r.error = { ...explicarError(e), linea: lineaActual }
      }
    }
    return r
  }

  return { consola, linea, paso, condicion, vuelta, terminar, test, expect }
}
