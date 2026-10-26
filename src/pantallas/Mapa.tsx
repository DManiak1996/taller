import { conceptos, dias } from '../contenido/cargar'
import { useProgreso } from '../progreso/almacen'
import { estadoConceptos } from '../progreso/modelo'
import { Icono } from '../ui/basicos'
import { niveles } from './niveles'

export function Mapa({ volver }: { volver: () => void }) {
  const p = useProgreso()
  const estados = estadoConceptos(p)
  const conContenido = new Set(dias.flatMap((d) => [...d.conceptos, ...d.retos.map((r) => r.concepto)]))
  const semanas = [...new Set(conceptos.map((c) => c.semana))]

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
          <p className="peq">Cada concepto tiene tres niveles: leerlo, completarlo y escribirlo tú.</p>
          <div className="fila peq" style={{ flexWrap: 'wrap', gap: 12 }}>
            <span>
              <span className="concepto dominado" style={{ display: 'inline-flex', padding: '0 8px' }}>✓</span> dominado
            </span>
            <span>
              <span className="concepto repasando" style={{ display: 'inline-flex', padding: '0 8px' }}>↻</span> en repaso
            </span>
            <span>
              <span className="concepto nuevo" style={{ display: 'inline-flex', padding: '0 8px' }}>·</span> por llegar
            </span>
          </div>
        </div>
        {semanas.map((s) => (
          <section key={s} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p className="kicker">Semana {s}</p>
            <div className="conceptos">
              {conceptos
                .filter((c) => c.semana === s)
                .map((c) => {
                  const e = estados.get(c.id) ?? 'nuevo'
                  const n = niveles(p, c.id)
                  const nNiveles = Number(n.leer) + Number(n.completar) + Number(n.escribir)
                  return (
                    <div key={c.id} className={`concepto ${e}`} style={{ flexDirection: 'column', alignItems: 'flex-start', opacity: e === 'nuevo' && !conContenido.has(c.id) ? 0.6 : 1 }}>
                      <span>{c.nombre}</span>
                      {e !== 'nuevo' && (
                        <span className="peq" style={{ fontSize: 13 }}>
                          {e === 'repasando' ? 'en repaso · ' : ''}
                          {nNiveles} de 3 niveles
                        </span>
                      )}
                    </div>
                  )
                })}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
