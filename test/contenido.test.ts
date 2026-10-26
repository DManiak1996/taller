// Comprueba TODO el contenido ejecutándolo de verdad en el mismo sandbox que usa la web.
// Si un profesor escribe una salida, una opción o un orden que no es cierto, esta prueba falla
// y dice qué reto es y por qué.

import { describe, expect, it } from 'vitest'
import { conceptos, dias, retos, retosRevision, type Reto } from '../src/contenido/cargar'
import { ejecutarEnNode } from './ejecutarNode'
import type { Resultado } from '../src/sandbox/tipos'

const correr = (codigo: string) => ejecutarEnNode(codigo, { tiempoMax: 2000 })
const igual = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b)
const describir = (r: Resultado) => JSON.stringify(r.salida) + (r.error ? ` y luego el error ${r.error.nombre}: ${r.error.mensaje}` : '')

function* permutaciones<T>(lista: T[]): Generator<T[]> {
  if (lista.length <= 1) return yield lista
  for (let i = 0; i < lista.length; i++)
    for (const resto of permutaciones([...lista.slice(0, i), ...lista.slice(i + 1)])) yield [lista[i], ...resto]
}

function comprobarReto(r: Reto) {
  expect(r.pistas, 'tiene 3 pistas').toHaveLength(3)
  switch (r.tipo) {
    case 'predecir': {
      const real = correr(r.codigo)
      const correctas = r.opciones.filter((o) => o.correcta)
      expect(correctas, 'una sola opción correcta').toHaveLength(1)
      if (r.lanzaError) expect(real.error, 'debía lanzar un error').toBeDefined()
      else expect(real.error, `no debía fallar: ${describir(real)}`).toBeUndefined()
      const comoOpcion = (texto: string) => texto.split('\n').filter((l) => !l.startsWith('❌'))
      expect(comoOpcion(correctas[0].texto), `la opción correcta no es lo que imprime: ${describir(real)}`).toEqual(real.salida)
      if (r.lanzaError) expect(correctas[0].texto, 'la opción correcta debe describir el error con ❌').toMatch(/❌/)
      for (const o of r.opciones.filter((o) => !o.correcta)) {
        const misma = igual(comoOpcion(o.texto), real.salida) && o.texto.includes('❌') === Boolean(real.error)
        expect(misma, `la opción incorrecta «${o.texto}» también es lo que imprime`).toBe(false)
      }
      break
    }
    case 'hueco': {
      expect(r.codigo.split('___').length - 1, 'una sola marca ___').toBe(1)
      expect(r.opciones.filter((o) => o.correcta), 'una sola ficha correcta').toHaveLength(1)
      for (const o of r.opciones) {
        const real = correr(r.codigo.replace('___', o.texto))
        const funciona = !real.error && igual(real.salida, r.salidaEsperada)
        if (o.correcta) expect(funciona, `con la ficha correcta «${o.texto}» imprime ${describir(real)}`).toBe(true)
        else expect(funciona, `la ficha incorrecta «${o.texto}» también da la salida esperada`).toBe(false)
      }
      break
    }
    case 'ordenar': {
      const real = correr(r.lineas.join('\n'))
      expect(real.error, `en el orden correcto falla: ${describir(real)}`).toBeUndefined()
      expect(real.salida, 'en el orden correcto no imprime salidaEsperada').toEqual(r.salidaEsperada)
      const correcto = JSON.stringify(r.lineas)
      for (const orden of permutaciones(r.lineas)) {
        if (JSON.stringify(orden) === correcto) continue
        const otro = correr(orden.join('\n'))
        const valeTambien = !otro.error && igual(otro.salida, r.salidaEsperada)
        expect(valeTambien, `otro orden también vale:\n${orden.join('\n')}`).toBe(false)
      }
      for (const trampa of r.sobran ?? []) {
        for (let i = 0; i <= r.lineas.length; i++) {
          const con = [...r.lineas.slice(0, i), trampa, ...r.lineas.slice(i)]
          const otro = correr(con.join('\n'))
          const valeTambien = !otro.error && igual(otro.salida, r.salidaEsperada)
          expect(valeTambien, `metiendo la línea trampa «${trampa}» también vale:\n${con.join('\n')}`).toBe(false)
        }
      }
      break
    }
    case 'fallo': {
      const nLineas = r.codigo.split('\n').length
      for (const l of r.lineasFallo) expect(l >= 1 && l <= nLineas, `lineasFallo ${l} fuera del código`).toBe(true)
      expect(r.opciones.filter((o) => o.correcta), 'un solo porqué correcto').toHaveLength(1)
      const conFallo = correr(r.codigo)
      const arreglado = correr(r.arreglo)
      expect(arreglado.error, `el arreglo falla: ${describir(arreglado)}`).toBeUndefined()
      if (r.lanzaError) expect(conFallo.error, 'el código con fallo debía lanzar un error').toBeDefined()
      expect(igual(conFallo.salida, arreglado.salida) && !conFallo.error, 'el código con fallo y el arreglado hacen lo mismo').toBe(false)
      break
    }
    case 'razon': {
      const quienes = r.opiniones.map((o) => o.quien)
      expect([...quienes, 'ninguno'], 'correcta es un quien o "ninguno"').toContain(r.correcta)
      for (const q of [...quienes, 'ninguno']) expect(r.siEliges[q], `falta siEliges["${q}"]`).toBeTruthy()
      if (r.comprobar) expect(correr(r.codigo).error?.nombre).not.toBe('TiempoAgotado')
      break
    }
    default:
      throw new Error(`tipo de reto desconocido: ${(r as { tipo: string }).tipo}`)
  }
}

describe('el contenido', () => {
  it('existe y los ids no se repiten', () => {
    expect(dias.length).toBeGreaterThan(0)
    const ids = [...dias.flatMap((d) => [...d.retos, ...d.repaso]).map((r) => r.id)]
    const propios = dias.flatMap((d) => [...d.retos, ...d.repaso]).filter((r) => !retosRevision.has(r.id))
    expect(new Set(propios.map((r) => r.id)).size, 'ids de reto repetidos').toBe(propios.length)
    expect(ids.length).toBeGreaterThan(0)
  })

  it('cada concepto usado está en el catálogo de conceptos', () => {
    const catalogo = new Set(conceptos.map((c) => c.id))
    for (const d of dias) {
      for (const c of d.conceptos) expect(catalogo.has(c), `${d.id} usa el concepto «${c}», que no está en conceptos.json`).toBe(true)
      for (const r of [...d.retos, ...d.repaso]) expect(catalogo.has(r.concepto), `${r.id} usa el concepto «${r.concepto}», que no está en conceptos.json`).toBe(true)
    }
    for (const r of retosRevision.values()) expect(catalogo.has(r.concepto), `${r.id} usa «${r.concepto}»`).toBe(true)
  })

  for (const d of dias) {
    describe(d.id, () => {
      it('tiene 3 retos de tipos distintos', () => {
        expect(d.retos).toHaveLength(3)
        expect(new Set(d.retos.map((r) => r.tipo)).size).toBe(3)
      })

      d.leccion.forEach((p, i) => {
        if (p.tipo === 'codigo') {
          it(`pantalla ${i + 1} (código) imprime lo que dice`, () => {
            const real = correr(p.codigo)
            if (p.lanzaError) expect(real.error, 'debía lanzar un error').toBeDefined()
            else expect(real.error, describir(real)).toBeUndefined()
            if (p.salida) expect(real.salida).toEqual(p.salida)
          })
        }
        if (p.tipo === 'terminal' && p.fichero) {
          it(`pantalla ${i + 1} (terminal) imprime lo que dice`, () => {
            expect(correr(p.fichero!.codigo).salida).toEqual(p.salida)
          })
        }
        if (p.tipo === 'pasoapaso') {
          it(`pantalla ${i + 1} (paso a paso) coincide con la ejecución real`, () => {
            const real = correr(p.codigo)
            const lineasReales = real.pasos.map((x) => x.linea)
            expect(p.pasos.map((x) => x.linea), 'las líneas de los pasos no son las de la ejecución real').toEqual(lineasReales)
            p.pasos.forEach((paso, n) => {
              expect(paso.variables, `paso ${n + 1}: variables`).toEqual(real.pasos[n].variables)
              expect(paso.salida, `paso ${n + 1}: salida`).toEqual(real.pasos[n].salida)
            })
          })
        }
      })

      for (const r of [...d.retos, ...d.repaso]) it(`reto ${r.id} (${r.tipo}) es correcto`, () => comprobarReto(r))
    })
  }

  it('los retos de revisión que no usa ningún día también son correctos', () => {
    for (const r of retosRevision.values()) if (!retos.has(r.id)) comprobarReto(r)
  })
})
