// test y expect dentro del sandbox, y que la versión para Node (scripts/pruebas-en-node.js) imprime lo mismo.

import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { describe, expect as esperar, it } from 'vitest'
import { ejecutarEnNode } from './ejecutarNode'

const enNode = readFileSync(new URL('../scripts/pruebas-en-node.js', import.meta.url), 'utf8')
const conNodeDeVerdad = (codigo: string) => execFileSync(process.execPath, ['-e', enNode + '\n' + codigo], { encoding: 'utf8' }).trimEnd().split('\n')

const PROGRAMAS = {
  'pasa y falla': `
function sumar(a: number, b: number) { return a + b }
test("suma dos números", () => { expect(sumar(2, 3)).toBe(5) })
test("falla a propósito", () => { expect(sumar(2, 2)).toBe(5) })
console.log("fin")`,
  'toEqual con listas y objetos': `
test("listas iguales", () => { expect([1, 2]).toEqual([1, 2]) })
test("toBe con listas falla", () => { expect([1, 2]).toBe([1, 2]) })
test("objetos", () => { expect({ plazo: 72, dias: [1] }).toEqual({ plazo: 48, dias: [1] }) })`,
  'texto frente a número': `test("tipos", () => { expect("5").toBe(5) })`,
  'sin expect pasa': `test("no comprueba nada", () => { const x = 1 + 1 })`,
  'error dentro del test': `test("rompe", () => { const a: any = undefined; a.b })\ntest("sigue", () => { expect(1).toBe(1) })`,
}

describe('test y expect', () => {
  it('imprimen como Vitest y siguen tras un fallo', () => {
    const r = ejecutarEnNode(PROGRAMAS['pasa y falla'])
    esperar(r.error).toBeUndefined()
    esperar(r.salida).toEqual(['✓ suma dos números', '× falla a propósito', '  Expected: 5', '  Received: 4', 'fin'])
  })

  it('un texto y un número no se confunden', () => {
    esperar(ejecutarEnNode(PROGRAMAS['texto frente a número']).salida).toEqual(['× tipos', "  Expected: 5", "  Received: '5'"])
  })

  it('un test sin expect pasa', () => {
    esperar(ejecutarEnNode(PROGRAMAS['sin expect pasa']).salida).toEqual(['✓ no comprueba nada'])
  })

  it('una variable propia llamada test no choca', () => {
    esperar(ejecutarEnNode('const test = 3\nconsole.log(test)').salida).toEqual(['3'])
  })

  for (const [nombre, codigo] of Object.entries(PROGRAMAS)) {
    it(`en Node imprime lo mismo: ${nombre}`, () => {
      const js = codigo.replace(/: (number|any)/g, '')
      esperar(conNodeDeVerdad(js)).toEqual(ejecutarEnNode(codigo).salida)
    })
  }
})
