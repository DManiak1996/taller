// El visualizador paso a paso: qué línea se ejecuta, cómo cambian las variables y qué se imprime.
// Usa la traza REAL del sandbox. Si el profesor escribió los pasos con notas, se usan sus notas;
// si no (por ejemplo, desde un reto), las notas se escriben solas.

import { useEffect, useState } from 'react'
import type { Paso } from '../contenido/cargar'
import { ejecutar } from '../sandbox/ejecutar'
import type { PasoTraza, Resultado } from '../sandbox/tipos'
import { Codigo, Consola, Icono, Texto } from './basicos'

interface PasoVisto extends PasoTraza {
  nota: string
  error?: string
}

function notaAutomatica(p: PasoTraza, anterior: PasoTraza | undefined, codigo: string): string {
  const texto = codigo.split('\n')[p.linea - 1]?.trim() ?? ''
  if (p.parte === 'inicio') return 'Empieza el bucle: se prepara el contador.'
  if (p.condicion) return `¿${p.condicion.texto}? ${p.condicion.cumple ? 'Sí.' : 'No.'}`
  if (p.parte === 'paso') return 'Fin de la vuelta: el contador avanza.'
  const impreso = p.salida.slice(anterior?.salida.length ?? 0)
  if (impreso.length) return `Imprime «${impreso.join(' / ')}».`
  for (const [k, v] of Object.entries(p.variables)) {
    if (anterior?.variables[k] === undefined) return `Se crea ${k} y vale ${v}.`
    if (anterior.variables[k] !== v) return `Ahora ${k} vale ${v}.`
  }
  return `Se ejecuta la línea ${p.linea}: ${texto}`
}

function combinar(real: Resultado, codigo: string, delProfesor?: Paso[]): PasoVisto[] {
  const coinciden = delProfesor && delProfesor.length === real.pasos.length && delProfesor.every((p, i) => p.linea === real.pasos[i].linea)
  if (delProfesor && !coinciden) {
    // No debería pasar: la prueba de contenidos lo impide. Se muestran los pasos del profesor tal cual.
    return delProfesor.map((p) => ({ ...p }))
  }
  const pasos: PasoVisto[] = real.pasos.map((p, i) => ({
    ...p,
    nota: delProfesor ? delProfesor[i].nota : notaAutomatica(p, real.pasos[i - 1], codigo),
    error: delProfesor?.[i].error,
  }))
  if (real.error && !delProfesor) {
    const ultimo = pasos[pasos.length - 1]
    pasos.push({ linea: real.error.linea ?? ultimo?.linea ?? 1, variables: ultimo?.variables ?? {}, salida: real.salida, nota: real.error.explicacion, error: real.error.explicacion })
  }
  return pasos
}

export function Visualizador({ codigo, pasos: delProfesor, alTerminar, textoFin = 'Entendido, sigo' }: { codigo: string; pasos?: Paso[]; alTerminar: () => void; textoFin?: string }) {
  const [pasos, setPasos] = useState<PasoVisto[] | null>(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    let vivo = true
    ejecutar(codigo, { maxPasos: 200 }).then((r) => vivo && setPasos(combinar(r, codigo, delProfesor)))
    return () => {
      vivo = false
    }
  }, [codigo, delProfesor])

  if (!pasos) return <p className="peq">Preparando el paso a paso…</p>
  if (pasos.length === 0) return null

  const p = pasos[Math.min(n, pasos.length - 1)]
  const lineasBucle = new Set(codigo.split('\n').flatMap((l, i) => (/^\s*(for|while)\b/.test(l) ? [i + 1] : [])))
  const condiciones = pasos.slice(0, n + 1).filter((x) => x.condicion)
  const ultimaCond = condiciones[condiciones.length - 1]
  const primerBucle = pasos.find((x) => lineasBucle.has(x.linea))?.linea
  const vueltas = pasos.slice(0, n + 1).filter((x) => x.linea === primerBucle && x.condicion?.cumple).length
  const terminado = pasos.slice(0, n + 1).some((x) => x.linea === primerBucle && x.condicion && !x.condicion.cumple)
  const rotulo = primerBucle === undefined ? '' : terminado ? 'Fin del bucle' : vueltas === 0 ? 'Antes de empezar' : `Vuelta ${vueltas}`

  const historial = (nombre: string) => {
    const valores: string[] = []
    for (const x of pasos.slice(0, n + 1)) {
      const v = x.variables[nombre]
      if (v !== undefined && valores[valores.length - 1] !== v) valores.push(v)
    }
    return valores
  }
  const variables = Object.entries(p.variables)
  const alFinal = n >= pasos.length - 1

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <p className="kicker">Paso a paso</p>
        {rotulo && <p className="kicker" style={{ color: 'var(--tinta)' }}>{rotulo}</p>}
      </div>
      <Codigo codigo={codigo} marcas={{ [p.linea]: p.error ? 'mal' : 'activa' }} parte={p.parte} />
      <div className="tarjeta nota" aria-live="polite">
        <p className="txt">
          <Texto>{p.nota}</Texto>
        </p>
      </div>
      {(variables.length > 0 || ultimaCond) && (
        <div className="paneles">
          {variables.map(([nombre, valor]) => {
            const h = historial(nombre)
            return (
              <section key={nombre} className="panel" aria-label={`Variable ${nombre}`}>
                <p className="kicker">Variable</p>
                <p className="valor">
                  {nombre} = {valor}
                </p>
                {h.length > 1 && (
                  <div className="chips">
                    {h.map((v, i) => (
                      <span key={i} className={`chip${i === h.length - 1 ? ' actual' : ''}`}>
                        {v}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            )
          })}
          {ultimaCond?.condicion && (
            <section className={`panel${p.condicion ? ' foco' : ''}`} aria-label="Condición">
              <p className="kicker">{lineasBucle.has(ultimaCond.linea) ? '¿Sigo?' : '¿Se cumple?'}</p>
              <p className="valor" style={{ fontSize: 20 }}>{ultimaCond.condicion.texto}</p>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>
                {lineasBucle.has(ultimaCond.linea) ? (ultimaCond.condicion.cumple ? 'sí, entra' : 'no, sale') : ultimaCond.condicion.cumple ? 'sí' : 'no'}
              </p>
            </section>
          )}
        </div>
      )}
      <Consola salida={p.salida} error={p.error} titulo="Consola" vacia="(todavía vacía)" />
      <div className="fila">
        <button type="button" className="btn btn-sec btn-cuadrado" onClick={() => setN(n - 1)} disabled={n === 0} aria-label="Paso anterior">
          <Icono nombre="atras" />
        </button>
        {alFinal ? (
          <button type="button" className="btn btn-pri" onClick={alTerminar}>
            {textoFin}
          </button>
        ) : (
          <button type="button" className="btn btn-pri" onClick={() => setN(n + 1)}>
            Siguiente paso <span style={{ fontWeight: 600, opacity: 0.8, fontSize: 15 }}>{n + 1}/{pasos.length}</span>
          </button>
        )}
      </div>
    </>
  )
}
