// Prepara el código de un reto para ejecutarlo en el sandbox:
// 1. quita los tipos de TypeScript (sucrase; respeta los números de línea),
// 2. lo instrumenta: marca en qué línea va, guarda cada paso para el visualizador
//    y cuenta las vueltas de los bucles para cortar los infinitos,
// 3. lo envuelve junto al núcleo en un programa completo.
// Los errores de TIPO no se detectan: solo se quitan los tipos.

import { parse } from 'acorn'
import { generate } from 'astring'
import { transform } from 'sucrase'
import { crearEntorno } from './nucleo'
import type { ErrorEjecucion } from './tipos'

// Los nodos de acorn y astring son objetos planos; aquí basta con tratarlos así.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Nodo = any

export interface Opciones {
  maxPasos?: number // 0 = sin visualizador
  maxVueltas?: number
}

export type Preparado = { ok: true; programa: string } | { ok: false; error: ErrorEjecucion }

const id = (name: string): Nodo => ({ type: 'Identifier', name })
const num = (value: number): Nodo => ({ type: 'Literal', value, raw: String(value) })
const llamada = (nombre: string, args: Nodo[]): Nodo => ({
  type: 'CallExpression',
  callee: id(nombre),
  arguments: args,
  optional: false,
})
const sentencia = (expression: Nodo): Nodo => ({ type: 'ExpressionStatement', expression })
const flecha = (body: Nodo): Nodo => ({
  type: 'ArrowFunctionExpression',
  params: [],
  body,
  expression: true,
  async: false,
  generator: false,
})

type Ambitos = string[][]

function nombresDe(patron: Nodo, salida: string[] = []): string[] {
  if (!patron) return salida
  switch (patron.type) {
    case 'Identifier':
      salida.push(patron.name)
      break
    case 'ObjectPattern':
      for (const p of patron.properties) nombresDe(p.type === 'RestElement' ? p.argument : p.value, salida)
      break
    case 'ArrayPattern':
      for (const e of patron.elements) nombresDe(e, salida)
      break
    case 'RestElement':
      nombresDe(patron.argument, salida)
      break
    case 'AssignmentPattern':
      nombresDe(patron.left, salida)
      break
  }
  return salida
}

// { i: () => i, total: () => total } con todas las variables visibles
function lectores(ambitos: Ambitos): Nodo {
  const vistos = new Set<string>()
  const nombres: string[] = []
  for (const ambito of ambitos) for (const n of ambito) if (!vistos.has(n)) vistos.add(n) && nombres.push(n)
  return {
    type: 'ObjectExpression',
    properties: nombres.map((n) => ({
      type: 'Property',
      key: id(n),
      value: flecha(id(n)),
      kind: 'init',
      method: false,
      shorthand: false,
      computed: false,
    })),
  }
}

const texto = (value: string): Nodo => ({ type: 'Literal', value, raw: JSON.stringify(value) })
const llamadaPaso = (linea: number, ambitos: Ambitos, parte?: string) =>
  llamada('__paso', [num(linea), lectores(ambitos), ...(parte ? [texto(parte)] : [])])
const paso = (linea: number, ambitos: Ambitos, parte?: string) => sentencia(llamadaPaso(linea, ambitos, parte))
const condicion = (linea: number, ambitos: Ambitos, test: Nodo) =>
  llamada('__cond', [num(linea), lectores(ambitos), texto(generate(test)), flecha(instrumentarExpresion(test, ambitos))])
const secuencia = (...expressions: Nodo[]): Nodo => ({ type: 'SequenceExpression', expressions })

function comoBloque(s: Nodo, ambitos: Ambitos, alPrincipio: Nodo[] = []): Nodo {
  const cuerpo = s.type === 'BlockStatement' ? s.body : [s]
  const dentro: Ambitos = [...ambitos, []]
  return { type: 'BlockStatement', body: [...alPrincipio, ...instrumentarLista(cuerpo, dentro)] }
}

function instrumentarFuncion(f: Nodo, ambitos: Ambitos): Nodo {
  const dentro: Ambitos = [...ambitos, f.params.flatMap((p: Nodo) => nombresDe(p))]
  if (f.body.type === 'BlockStatement') {
    f.body = { type: 'BlockStatement', body: instrumentarLista(f.body.body, dentro) }
  } else {
    f.body = instrumentarExpresion(f.body, dentro)
  }
  return f
}

// Busca funciones dentro de una expresión (por ejemplo, lista.forEach(x => { ... }))
function instrumentarExpresion(n: Nodo, ambitos: Ambitos): Nodo {
  if (!n || typeof n !== 'object') return n
  if (n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression') return instrumentarFuncion(n, ambitos)
  for (const clave of Object.keys(n)) {
    if (clave === 'loc') continue
    const v = n[clave]
    if (Array.isArray(v)) n[clave] = v.map((x) => instrumentarExpresion(x, ambitos))
    else if (v && typeof v === 'object' && typeof v.type === 'string') n[clave] = instrumentarExpresion(v, ambitos)
  }
  return n
}

const SALTOS = new Set(['ReturnStatement', 'ThrowStatement', 'BreakStatement', 'ContinueStatement'])
const CON_PASO_DESPUES = new Set(['ExpressionStatement', 'VariableDeclaration'])

function instrumentarLista(sentencias: Nodo[], ambitos: Ambitos): Nodo[] {
  const actual = ambitos[ambitos.length - 1]
  const salida: Nodo[] = []
  for (const s of sentencias) {
    const linea: number = s.loc.start.line
    if (s.type === 'FunctionDeclaration') {
      actual.push(s.id.name)
      salida.push(instrumentarFuncion(s, ambitos))
      continue
    }
    salida.push(sentencia(llamada('__linea', [num(linea)])))
    if (SALTOS.has(s.type)) salida.push(paso(linea, ambitos))
    salida.push(instrumentarSentencia(s, ambitos))
    if (s.type === 'VariableDeclaration') for (const d of s.declarations) nombresDe(d.id, actual)
    if (s.type === 'ClassDeclaration') actual.push(s.id.name)
    if (CON_PASO_DESPUES.has(s.type)) salida.push(paso(linea, ambitos))
  }
  return salida
}

function instrumentarSentencia(s: Nodo, ambitos: Ambitos): Nodo {
  const linea: number = s.loc.start.line
  const vuelta = sentencia(llamada('__vuelta', []))
  switch (s.type) {
    case 'BlockStatement':
      return comoBloque(s, ambitos)
    case 'IfStatement':
      s.test = condicion(linea, ambitos, s.test)
      s.consequent = comoBloque(s.consequent, ambitos)
      if (s.alternate) s.alternate = comoBloque(s.alternate, ambitos)
      return s
    case 'ForStatement': {
      const delFor: Ambitos = [...ambitos, []]
      if (s.init?.type === 'VariableDeclaration') {
        s.init = instrumentarExpresion(s.init, ambitos)
        for (const d of s.init.declarations) nombresDe(d.id, delFor[delFor.length - 1])
        // let i = 0, __inicio = __paso(...): un declarador extra para apuntar el paso "inicio"
        s.init.declarations.push({ type: 'VariableDeclarator', id: id('__inicio'), init: llamadaPaso(linea, delFor, 'inicio') })
      } else if (s.init) {
        s.init = secuencia(instrumentarExpresion(s.init, ambitos), llamadaPaso(linea, delFor, 'inicio'))
      }
      if (s.test) s.test = condicion(linea, delFor, s.test)
      if (s.update) s.update = secuencia(instrumentarExpresion(s.update, delFor), llamadaPaso(linea, delFor, 'paso'))
      s.body = comoBloque(s.body, delFor, [vuelta])
      return s
    }
    case 'WhileStatement':
    case 'DoWhileStatement':
      s.test = condicion(linea, ambitos, s.test)
      s.body = comoBloque(s.body, ambitos, [vuelta])
      return s
    case 'ForOfStatement':
    case 'ForInStatement': {
      const delFor: Ambitos = [...ambitos, s.left.type === 'VariableDeclaration' ? s.left.declarations.flatMap((d: Nodo) => nombresDe(d.id)) : []]
      s.right = instrumentarExpresion(s.right, ambitos)
      s.body = comoBloque(s.body, delFor, [vuelta, paso(linea, delFor)])
      return s
    }
    case 'TryStatement':
      s.block = comoBloque(s.block, ambitos)
      if (s.handler) {
        const delCatch: Ambitos = [...ambitos, nombresDe(s.handler.param)]
        s.handler.body = comoBloque(s.handler.body, delCatch)
      }
      if (s.finalizer) s.finalizer = comoBloque(s.finalizer, ambitos)
      return s
    case 'SwitchStatement': {
      s.discriminant = instrumentarExpresion(s.discriminant, ambitos)
      const delSwitch: Ambitos = [...ambitos, []]
      for (const c of s.cases) c.consequent = instrumentarLista(c.consequent, delSwitch)
      return s
    }
    case 'LabeledStatement':
      s.body = instrumentarSentencia(s.body, ambitos)
      return s
    default:
      return instrumentarExpresion(s, ambitos)
  }
}

function errorDeSintaxis(e: unknown): ErrorEjecucion {
  const mensaje = e instanceof Error ? e.message : String(e)
  const m = mensaje.match(/\((\d+):(\d+)\)/)
  const linea = m ? Number(m[1]) : undefined
  return {
    nombre: 'SyntaxError',
    mensaje,
    explicacion: 'El código está mal escrito' + (linea ? ' en la línea ' + linea : '') + ': falta o sobra algo (un paréntesis, una llave, unas comillas...).',
    linea,
  }
}

/** Devuelve el programa completo listo para ejecutar. Al terminar llama a `__enviar(resultado)`. */
export function preparar(codigoTs: string, opciones: Opciones = {}): Preparado {
  const maxPasos = opciones.maxPasos ?? 500
  const maxVueltas = opciones.maxVueltas ?? 100_000
  let js: string
  try {
    js = transform(codigoTs, { transforms: ['typescript'], disableESTransforms: true }).code
    const ast = parse(js, { ecmaVersion: 'latest', sourceType: 'script', locations: true })
    ast.body = instrumentarLista(ast.body, [[]])
    js = generate(ast)
  } catch (e) {
    return { ok: false, error: errorDeSintaxis(e) }
  }
  // test y expect solo se pasan si el código los usa y no tiene variables propias con ese nombre.
  const conTests = /\b(?:test|expect)\s*\(/.test(js) && !/\b(?:const|let|var|function|class)\s+(?:test|expect)\b/.test(js)
  const programa = `(function () {
  const crearEntorno = ${crearEntorno.toString()};
  const __E = crearEntorno(${maxPasos}, ${maxVueltas});
  let __r;
  try {
    (function (console, __linea, __paso, __cond, __vuelta${conTests ? ', test, expect' : ''}) {
      "use strict";
${js}
    })(__E.consola, __E.linea, __E.paso, __E.condicion, __E.vuelta${conTests ? ', __E.test, __E.expect' : ''});
    __r = __E.terminar();
  } catch (e) {
    __r = __E.terminar(e);
  }
  __enviar(__r);
})();`
  return { ok: true, programa }
}
