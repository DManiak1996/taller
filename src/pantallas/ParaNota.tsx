// «Para nota»: el bloque opcional de cada día, con un reto más difícil y un ejercicio de escribir código.
// No cuenta para la racha ni para cerrar el día. Se ofrece al terminar el día y se puede hacer más tarde,
// sobre todo en el Mac, porque escribir en el iPhone es incómodo.

import { useEffect, useRef, useState } from 'react'
import type { DiaListo, RetoEscribir } from '../contenido/cargar'
import { tienda, useProgreso } from '../progreso/almacen'
import { comprobar, diferencias, type Comprobacion } from '../sandbox/comprobar'
import { ejecutar } from '../sandbox/ejecutar'
import { Codigo, Icono, Texto } from '../ui/basicos'
import { Editor, esMac } from '../ui/Editor'
import { diasConNota } from './notaPendiente'
import { RetoPantalla, TITULOS_PISTA } from './Retos'

const CLAVE = (id: string) => `taller.escribir.${id}`
const leer = (r: RetoEscribir) => {
  try {
    return localStorage.getItem(CLAVE(r.id)) ?? r.inicial ?? ''
  } catch {
    return r.inicial ?? ''
  }
}
const guardar = (id: string, codigo: string) => {
  try {
    localStorage.setItem(CLAVE(id), codigo)
  } catch {
    // Sin almacenamiento: el código vive mientras la pantalla esté abierta.
  }
}

const esTactil = typeof matchMedia !== 'undefined' && matchMedia('(pointer: coarse)').matches

function Resultado({ r, c }: { r: RetoEscribir; c: Comprobacion }) {
  if (c.ok) return null
  const { caso, obtenido, error } = c.fallo
  const lineas = diferencias(caso.salidaEsperada, obtenido)
  return (
    <section className="tarjeta" aria-live="polite">
      {caso.variante ? (
        <p className="txt">
          Con tus datos sale bien, pero con otros, <code className="ic">{caso.datos}</code>, no sale lo esperado. ¿Has escrito algún resultado a mano en vez de usar la variable?
        </p>
      ) : error ? (
        <p className="txt">Tu programa se ha parado por un error.</p>
      ) : (
        <p className="txt">Tu programa no imprime exactamente lo esperado. Mira la primera línea marcada.</p>
      )}
      <div className="consola diff">
        <p className="consola-tit">
          <span className="esperado">- Esperado</span> <span className="obtenido">+ Obtenido</span>
        </p>
        {lineas.map((l, i) => (
          <div key={i} className={l.tipo}>
            {l.tipo === 'igual' ? '  ' : l.tipo === 'esperado' ? '- ' : '+ '}
            {l.texto}
          </div>
        ))}
        {error && (
          <div className="err">
            <Icono nombre="cerrar" tam={14} grosor={3} /> {error.linea ? `Línea ${error.linea}: ` : ''}
            {error.explicacion}
          </div>
        )}
      </div>
      {r.datos && !caso.variante && <p className="peq">Las líneas de error se cuentan desde tu código, sin los datos de arriba.</p>}
    </section>
  )
}

function Escribir({ r, dia, volver }: { r: RetoEscribir; dia: string; volver: () => void }) {
  const codigo = useRef(leer(r))
  const [res, setRes] = useState<Comprobacion | null>(null)
  const [corriendo, setCorriendo] = useState(false)
  const [pistas, setPistas] = useState(0)
  const [fallos, setFallos] = useState(0)
  const [solucion, setSolucion] = useState(false)
  const guardado = useRef(false)
  const acertado = res?.ok === true
  const terminado = acertado || solucion
  // Tras comprobar, el resultado queda debajo del editor: se lleva a la vista.
  const resultado = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (res || solucion) resultado.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [res, solucion])

  const anotar = (vista: boolean) => {
    if (guardado.current) return
    guardado.current = true
    // Comprobar varias veces es lo normal al escribir: no cuenta como fallo; ver la solución, sí.
    tienda.guardarIntento({ reto: r.id, concepto: r.concepto, dia, modo: 'reto', fallos: 0, pistas, solucion: vista })
  }

  const probar = async () => {
    if (corriendo || terminado) return
    setCorriendo(true)
    guardar(r.id, codigo.current)
    const c = await comprobar(r, codigo.current, (p) => ejecutar(p, { maxPasos: 0 }))
    setRes(c)
    if (c.ok) anotar(false)
    else setFallos(fallos + 1)
    setCorriendo(false)
  }

  const verSolucion = () => {
    setSolucion(true)
    anotar(true)
  }

  return (
    <div className="app ancha">
      <header className="top">
        <button type="button" className="icono" aria-label="Volver a Para nota" onClick={volver}>
          <Icono nombre="atras" tam={24} />
        </button>
      </header>
      <main className="cuerpo">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p className="kicker">Para nota · Escribe el programa</p>
          <p className="txt">
            <Texto>{r.enunciado}</Texto>
          </p>
        </div>
        {esTactil && (
          <p className="sin-conexion">
            <Icono nombre="llaves" tam={20} />
            <span>
              <strong>Mejor en el Mac.</strong> Con teclado se escribe mucho más cómodo, pero puedes probar aquí.
            </span>
          </p>
        )}
        {r.datos && <Codigo codigo={r.datos} etiqueta="Datos (no se tocan)" />}
        <Editor
          inicial={codigo.current}
          alCambiar={(c) => {
            codigo.current = c
            guardar(r.id, c)
          }}
          alEjecutar={probar}
        />
        {!terminado && (
          <p className="peq" style={{ marginTop: -8 }}>
            {esMac ? '⌘ + Enter' : 'Ctrl + Enter'} también comprueba.{r.variantes?.length ? ' Lo pruebo con tus datos y con otros que no ves.' : ''}
          </p>
        )}
        <div ref={resultado} style={{ scrollMarginTop: 12 }} />
        {res && <Resultado r={r} c={res} />}
        {r.pistas.slice(0, pistas).map((p, i) => (
          <section key={i} className="pista">
            <p className="kicker" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icono nombre="pista" tam={16} grosor={2.25} />
              {TITULOS_PISTA[i]}
            </p>
            <p className="txt" style={{ fontSize: 17 }}>
              <Texto>{p}</Texto>
            </p>
          </section>
        ))}
        {terminado && (
          <section className={`tarjeta ${acertado ? 'acierto' : ''}`} aria-live="polite">
            <p className="txt" style={{ fontWeight: 800 }}>
              {acertado ? (r.variantes?.length ? `¡Correcto! Funciona con tus datos y con ${r.variantes.length === 1 ? 'otro juego' : `otros ${r.variantes.length}`} más.` : '¡Correcto!') : 'Una solución posible'}
            </p>
            <p className="txt">
              <Texto>{r.explicacion}</Texto>
            </p>
            {acertado && <p className="kicker">Una solución posible (la tuya puede ser distinta y estar bien)</p>}
            <Codigo codigo={r.solucion} etiqueta="Solución" />
          </section>
        )}
      </main>
      <footer className="pie">
        {terminado ? (
          <button type="button" className="btn btn-pri" onClick={volver}>
            Terminar
          </button>
        ) : (
          <>
            <div className="fila">
              <button type="button" className="btn btn-sec btn-auto" onClick={() => setPistas(Math.min(3, pistas + 1))} disabled={pistas >= 3}>
                <Icono nombre="pista" tam={20} grosor={2.25} />
                Pista
              </button>
              <button type="button" className="btn btn-pri" onClick={probar} disabled={corriendo}>
                {corriendo ? 'Comprobando…' : 'Comprobar'}
              </button>
            </div>
            {(pistas >= 3 || fallos >= 3) && (
              <button type="button" className="btn-texto" onClick={verSolucion}>
                Ver una solución
              </button>
            )}
          </>
        )}
      </footer>
    </div>
  )
}

type Abierto = { tipo: 'reto' | 'escribir'; dia: DiaListo } | null

export function ParaNota({ volver }: { volver: () => void }) {
  const p = useProgreso()
  const [abierto, setAbierto] = useState<Abierto>(null)
  const lista = diasConNota(p)

  if (abierto?.tipo === 'escribir') return <Escribir key={abierto.dia.id} r={abierto.dia.paraNota!.escribir} dia={abierto.dia.id} volver={() => setAbierto(null)} />
  if (abierto?.tipo === 'reto') {
    const reto = abierto.dia.paraNota!.reto
    return (
      <div className="app">
        <header className="top">
          <button type="button" className="icono" aria-label="Volver a Para nota" onClick={() => setAbierto(null)}>
            <Icono nombre="atras" tam={24} />
          </button>
        </header>
        <RetoPantalla
          key={reto.id}
          reto={reto}
          kicker="Para nota"
          textoTerminar="Terminar"
          alTerminar={(r) => {
            tienda.guardarIntento({ reto: reto.id, concepto: reto.concepto, dia: abierto.dia.id, modo: 'reto', ...r })
            setAbierto(null)
          }}
        />
      </div>
    )
  }

  const estado = (id: string) => {
    const i = p.intentos.filter((x) => x.reto === id)
    if (i.some((x) => !x.solucion && x.fallos === 0)) return 'Hecho'
    if (i.length) return 'Hecho con ayuda'
    return null
  }

  return (
    <div className="app">
      <header className="top">
        <button type="button" className="icono" aria-label="Volver" onClick={volver}>
          <Icono nombre="atras" tam={24} />
        </button>
      </header>
      <main className="cuerpo">
        <h1 className="h1">Para nota</h1>
        <p className="peq">Opcional. Un reto más difícil y un programa para escribir tú, de cada día que terminas. No cuenta para la racha. Escribir es más cómodo en el Mac.</p>
        {lista.length === 0 && <p className="txt">Cuando termines un día, aquí aparece su «Para nota».</p>}
        {lista.map((d) => (
          <section key={d.id} className="tarjeta nota">
            <p className="kicker">
              Semana {d.semana}, día {d.dia}
            </p>
            <p className="guia-tit">{d.titulo}</p>
            {(
              [
                ['reto', d.paraNota!.reto.id, 'Reto difícil', 'pista'],
                ['escribir', d.paraNota!.escribir.id, 'Escribe el programa', 'llaves'],
              ] as const
            ).map(([tipo, id, nombre, icono]) => {
              const e = estado(id)
              return (
                <button key={tipo} type="button" className="fila-nota" onClick={() => setAbierto({ tipo, dia: d })}>
                  <Icono nombre={icono} tam={20} />
                  <span className="fila-nota-txt">{nombre}</span>
                  {e ? (
                    <span className="pastilla ok">
                      <Icono nombre="bien" tam={12} grosor={3.5} /> {e}
                    </span>
                  ) : (
                    <Icono nombre="flecha" tam={20} />
                  )}
                </button>
              )
            })}
          </section>
        ))}
      </main>
    </div>
  )
}
