// El mapa: las 16 semanas como una línea vertical, con sus conceptos dentro.
// Cada concepto tiene tres niveles (Leer · Completar · Escribir). Dominado = llegó a Escribir
// y aguantó el repaso de los 7 días.

import { conceptos, type DiaListo } from '../contenido/cargar'
import { useProgreso } from '../progreso/almacen'
import { repasosSuperados } from '../progreso/modelo'
import { Icono } from '../ui/basicos'
import { niveles } from './niveles'

export function Mapa({ volver, dia }: { volver: () => void; dia: DiaListo | null }) {
  const p = useProgreso()
  const superados = repasosSuperados(p)
  const semanaActual = dia?.semana ?? Math.max(...p.intentos.map((i) => conceptos.find((c) => c.id === i.concepto)?.semana ?? 1), 1)
  const deHoy = new Set(dia ? [...dia.conceptos, ...dia.retos.map((r) => r.concepto)] : [])
  const semanas = [...new Set(conceptos.map((c) => c.semana))].sort((a, b) => a - b)

  return (
    <div className="app">
      <header className="top">
        <button type="button" className="icono" aria-label="Volver" onClick={volver}>
          <Icono nombre="atras" tam={24} />
        </button>
      </header>
      <main className="cuerpo">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 className="h1">Tu mapa</h1>
          <p className="peq">Cada concepto tiene tres niveles: leerlo, completarlo y escribirlo tú. Está dominado cuando lo escribes y aguanta el repaso de una semana.</p>
        </div>
        <ol className="via">
          {semanas.map((s, k) => {
            const lista = conceptos.filter((c) => c.semana === s)
            const dominado = (id: string) => niveles(p, id).escribir && superados.has(id)
            const completa = lista.every((c) => dominado(c.id))
            const futura = s > semanaActual
            return (
              <li key={s} className="nodo">
                <div className="eje">
                  <span className={`circ ${completa ? 'completa' : futura ? 'futura' : 'actual'}`}>{completa && <Icono nombre="bien" tam={16} grosor={3} />}</span>
                  {k < semanas.length - 1 && <span className="raya" />}
                </div>
                <div className="info">
                  <p className="kicker" style={{ color: futura ? 'var(--suave)' : s === semanaActual ? 'var(--pri)' : 'var(--tinta)', paddingTop: 6 }}>
                    Semana {s}
                    {s === semanaActual ? ' · ahora' : ''}
                  </p>
                  {completa ? (
                    <p className="peq">Todo dominado: {lista.map((c) => c.nombre).join(', ')}</p>
                  ) : futura ? (
                    <p className="peq">{lista.map((c) => c.nombre).join(' · ')}</p>
                  ) : (
                    lista.map((c) => {
                      const n = niveles(p, c.id)
                      return (
                        <div key={c.id} className={`fila-concepto${deHoy.has(c.id) ? ' hoy' : ''}`}>
                          <span style={{ fontSize: 16, fontWeight: 700 }}>{c.nombre}</span>
                          {dominado(c.id) ? (
                            <span style={{ color: 'var(--ok)' }} aria-label="Dominado">
                              <Icono nombre="bien" tam={20} grosor={3} />
                            </span>
                          ) : (
                            <span className="puntos" aria-label={`Leer ${n.leer ? 'sí' : 'no'}, completar ${n.completar ? 'sí' : 'no'}, escribir ${n.escribir ? 'sí' : 'no'}`}>
                              <span className={`pto${n.leer ? ' si' : ''}`} />
                              <span className={`pto${n.completar ? ' si' : ''}`} />
                              <span className={`pto${n.escribir ? ' si' : ''}`} />
                            </span>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </main>
    </div>
  )
}
