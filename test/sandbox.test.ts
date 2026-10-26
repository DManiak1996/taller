import { describe, expect, it } from 'vitest'
import { ejecutarEnNode as ejecutar } from './ejecutarNode'

describe('sandbox', () => {
  it('imprime como Node', () => {
    const r = ejecutar(`const plazo: number = 72;\nconsole.log("Plazo:", plazo, [1, 'a'], { a: 1, b: "x" });`)
    expect(r.error).toBeUndefined()
    expect(r.salida).toEqual(["Plazo: 72 [ 1, 'a' ] { a: 1, b: 'x' }"])
  })

  it('traza un bucle for paso a paso', () => {
    const r = ejecutar(`let total = 0;\nfor (let i = 1; i <= 2; i++) {\n  total = total + i;\n}\nconsole.log(total);`)
    expect(r.salida).toEqual(['3'])
    expect(r.pasos.map((p) => p.linea)).toEqual([1, 2, 2, 3, 2, 2, 3, 2, 2, 5])
    expect(r.pasos.map((p) => p.parte ?? '')).toEqual(['', 'inicio', 'condicion', '', 'paso', 'condicion', '', 'paso', 'condicion', ''])
    expect(r.pasos[2].condicion).toEqual({ texto: '1 <= 2', cumple: true })
    expect(r.pasos[3].variables).toEqual({ total: '1', i: '1' })
    expect(r.pasos[8]).toMatchObject({ variables: { total: '3', i: '3' }, condicion: { texto: '3 <= 2', cumple: false } })
  })

  it('no muestra una variable antes de crearla', () => {
    const r = ejecutar(`let a = 1;\nlet b = a + 1;`)
    expect(r.pasos[0].variables).toEqual({ a: '1' })
    expect(r.pasos[1].variables).toEqual({ a: '1', b: '2' })
  })

  it('explica los errores en lenguaje llano con su línea', () => {
    const r = ejecutar(`const estado = "abierta";\nconsole.log(estado);\nestado = "cerrada";`)
    expect(r.salida).toEqual(['abierta'])
    expect(r.error?.nombre).toBe('TypeError')
    expect(r.error?.linea).toBe(3)
    expect(r.error?.explicacion).toMatch(/const/)
  })

  it('corta los bucles infinitos', () => {
    const r = ejecutar(`let i = 0;\nwhile (i < 10) {\n  console.log(i);\n}`)
    expect(r.error?.nombre).toBe('BucleInfinito')
  })

  it('corta lo que tarda demasiado aunque no sea un bucle', () => {
    const r = ejecutar(`function f(n: number): number { return n < 2 ? n : f(n - 1) + f(n - 2) }\nconsole.log(f(40));`, { tiempoMax: 300 })
    expect(r.error?.nombre).toBe('TiempoAgotado')
  })

  it('avisa de los errores de escritura', () => {
    const r = ejecutar(`console.log("hola";`)
    expect(r.error?.nombre).toBe('SyntaxError')
    expect(r.error?.linea).toBe(1)
  })

  it('no tiene acceso a la red ni al exterior', () => {
    const r = ejecutar(`console.log(typeof fetch, typeof require, typeof process);`)
    expect(r.salida).toEqual(['undefined undefined undefined'])
  })

  it('muestra la condición de un if con los valores y respeta los textos', () => {
    const r = ejecutar(`const estado = "abierta";\nconst lista = [1, 2];\nif (estado === "abierta" && lista.length > 1) {\n  console.log("sí");\n}`)
    expect(r.pasos[2].condicion).toEqual({ texto: '"abierta" === "abierta" && lista.length > 1', cumple: true })
  })

  it('traza dentro de funciones y callbacks', () => {
    const r = ejecutar(`function doble(n: number) {\n  const d = n * 2;\n  return d;\n}\n[1].forEach((x) => {\n  console.log(doble(x));\n});`)
    expect(r.salida).toEqual(['2'])
    expect(r.pasos.find((p) => p.linea === 2)?.variables).toMatchObject({ n: '1', d: '2' })
  })
})
