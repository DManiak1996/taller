import { describe, expect, it } from 'vitest'
import type { RetoEscribir } from '../contenido/formato'
import { comprobar, diferencias } from '../src/sandbox/comprobar'
import { ejecutarEnNode } from './ejecutarNode'

const reto: RetoEscribir = {
  id: 'prueba-e1',
  tipo: 'escribir',
  semana: 1,
  concepto: 'const',
  tema: 'rgpd',
  enunciado: 'Imprime el plazo.',
  pistas: ['a', 'b', 'c'],
  explicacion: 'x',
  datos: 'const plazo = 72;',
  salidaEsperada: ['Plazo: 72 h'],
  variantes: [{ datos: 'const plazo = 48;', salidaEsperada: ['Plazo: 48 h'] }],
  solucion: 'console.log("Plazo: " + plazo + " h");',
}
const correr = (p: string) => ejecutarEnNode(p)

describe('comprobar un reto «escribir»', () => {
  it('acierta si pasa con los datos y con todas las variantes', async () => {
    expect(await comprobar(reto, reto.solucion, correr)).toEqual({ ok: true })
  })

  it('no ignora los espacios del medio, pero sí los del final', async () => {
    expect((await comprobar(reto, 'console.log("Plazo: " + plazo + " h   ");', correr)).ok).toBe(true)
    expect((await comprobar(reto, 'console.log("Plazo:  " + plazo + " h");', correr)).ok).toBe(false)
  })

  it('escribir el resultado a mano falla en la variante', async () => {
    const r = await comprobar(reto, 'console.log("Plazo: 72 h");', correr)
    expect(r.ok).toBe(false)
    if (r.ok) return
    expect(r.fallo.caso).toMatchObject({ variante: true, datos: 'const plazo = 48;' })
    expect(r.fallo.obtenido).toEqual(['Plazo: 72 h'])
  })

  it('la línea de un error se cuenta desde su código, sin los datos', async () => {
    const r = await comprobar(reto, 'console.log("hola");\nconsole.log(plazos);', correr)
    expect(r.ok).toBe(false)
    if (r.ok) return
    expect(r.fallo.error).toMatchObject({ nombre: 'ReferenceError', linea: 2 })
    expect(r.fallo.obtenido).toEqual(['hola'])
  })
})

describe('diferencias línea a línea', () => {
  it('deja las iguales y pone lo esperado encima de lo obtenido', () => {
    expect(diferencias(['a', 'b', 'c'], ['a', 'x'])).toEqual([
      { tipo: 'igual', texto: 'a' },
      { tipo: 'esperado', texto: 'b' },
      { tipo: 'obtenido', texto: 'x' },
      { tipo: 'esperado', texto: 'c' },
    ])
  })
})

describe('qué línea imprime la primera diferencia', () => {
  it('es la del console.log, contada desde su código', async () => {
    const r = await comprobar(reto, 'const nada = 0;\nconsole.log("Plazo: " + plazo + "h");', correr)
    expect(r.ok).toBe(false)
    if (r.ok) return
    expect(r.fallo.lineaDiferencia).toBe(2)
  })

  it('no se confunde cuando el argumento llama a una función de otras líneas', async () => {
    const codigo = 'function texto() {\n  const h = " h";\n  return "Plazo " + plazo + h;\n}\nconsole.log(texto());'
    const r = await comprobar(reto, codigo, correr)
    expect(r.ok).toBe(false)
    if (r.ok) return
    expect(r.fallo.lineaDiferencia).toBe(5)
  })

  it('no hay línea si solo falta algo al final', async () => {
    const r = await comprobar({ ...reto, salidaEsperada: ['Plazo: 72 h', 'fin'], variantes: [] }, reto.solucion, correr)
    expect(r.ok).toBe(false)
    if (r.ok) return
    expect(r.fallo.lineaDiferencia).toBeUndefined()
  })
})
