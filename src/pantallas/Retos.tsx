// Los cinco tipos de reto. Todos comparten el mismo marco (MarcoReto): enunciado, pistas,
// «Comprobar», la hoja de feedback y «Ver la solución» tras tres fallos.

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Opcion, Reto } from '../contenido/cargar'
import { ejecutar } from '../sandbox/ejecutar'
import type { Resultado } from '../sandbox/tipos'
import { Codigo, Consola, Icono, Texto, type MarcaLinea } from '../ui/basicos'
import { Visualizador } from '../ui/Visualizador'

export interface ResultadoReto {
  fallos: number
  pistas: number
  solucion: boolean
}

type Estado = 'eligiendo' | 'ok' | 'mal' | 'solucion'

const NOMBRE_TIPO: Record<Reto['tipo'], string> = {
  predecir: '¿Qué imprime esto?',
  hueco: 'Rellena el hueco',
  ordenar: 'Ordena las líneas',
  fallo: 'Caza el fallo de la IA',
  razon: '¿Quién tiene razón?',
}
const TITULOS_PISTA = ['Pista 1 · Dónde mirar', 'Pista 2 · La regla', 'Pista 3 · Casi la respuesta']
const LETRAS = 'ABCDEF'

/** Baraja siempre igual para el mismo reto, para que las letras no cambien entre visitas. */
function barajar<T>(lista: T[], semilla: string): T[] {
  let h = 2166136261
  for (const c of semilla) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  const r = [...lista]
  for (let i = r.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0
    const j = h % (i + 1)
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

function useEjecucion(codigo: string | null) {
  const [r, setR] = useState<Resultado | null>(null)
  useEffect(() => {
    setR(null)
    if (codigo === null) return
    let vivo = true
    ejecutar(codigo, { maxPasos: 0 }).then((x) => vivo && setR(x))
    return () => {
      vivo = false
    }
  }, [codigo])
  return r
}

const ConsolaDe = ({ r, titulo }: { r: Resultado | null; titulo: string }) =>
  r ? <Consola salida={r.salida} error={r.error?.explicacion} titulo={titulo} /> : null

interface MarcoProps {
  reto: Reto
  kicker?: string
  chip?: string
  listo: boolean // ya ha elegido algo y puede comprobar
  comprobar: () => { ok: boolean; mensaje: string } | 'sigue' // 'sigue': paso intermedio acertado, no cuenta
  reiniciar: () => void // borra la elección para volver a intentarlo
  solucion: string // «La respuesta es la B»
  cuerpo: (estado: Estado) => ReactNode
  verPasoAPaso?: string // código para el visualizador desde la hoja de «Todavía no»
  alTerminar: (r: ResultadoReto) => void
  textoTerminar?: string
  soloQuedaUna?: boolean // ya no hay nada que probar: solo se ofrece ver la solución
}

function MarcoReto({ reto, kicker, chip, listo, comprobar, reiniciar, solucion, cuerpo, verPasoAPaso, alTerminar, textoTerminar = 'Continuar', soloQuedaUna }: MarcoProps) {
  const [estado, setEstado] = useState<Estado>('eligiendo')
  const [fallos, setFallos] = useState(0)
  const [pistas, setPistas] = useState(0)
  const [mensaje, setMensaje] = useState('')
  const [pasoAPaso, setPasoAPaso] = useState(false)
  const terminar = () => alTerminar({ fallos, pistas, solucion: estado === 'solucion' })

  return (
    <>
      <main className="cuerpo">
        {chip && <span className="chip" style={{ alignSelf: 'flex-start', height: 'auto', padding: '4px 10px' }}>{chip}</span>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p className="kicker">
            {kicker ? kicker + ' · ' : ''}
            {NOMBRE_TIPO[reto.tipo]}
          </p>
          <p className="txt">
            <Texto>{reto.enunciado}</Texto>
          </p>
        </div>
        {cuerpo(estado)}
        {reto.pistas.slice(0, pistas).map((p, i) => (
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
      </main>

      {pasoAPaso && verPasoAPaso && (
        <div className="velo" onClick={(e) => e.target === e.currentTarget && setPasoAPaso(false)}>
          <div className="hoja" role="dialog" aria-modal="true" aria-label="Paso a paso">
            <span className="asa" aria-hidden="true" />
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '-8px -8px -16px 0' }}>
              <button type="button" className="icono" aria-label="Volver al reto" onClick={() => setPasoAPaso(false)}>
                <Icono nombre="cerrar" tam={24} grosor={2.25} />
              </button>
            </div>
            <Visualizador codigo={verPasoAPaso} alTerminar={() => setPasoAPaso(false)} textoFin="Volver al reto" />
          </div>
        </div>
      )}

      {estado === 'eligiendo' && (
        <footer className="pie">
          <div className="fila">
            <button type="button" className="btn btn-sec btn-auto" onClick={() => setPistas(Math.min(3, pistas + 1))} disabled={pistas >= 3}>
              <Icono nombre="pista" tam={20} grosor={2.25} />
              Pista
            </button>
            <button
              type="button"
              className="btn btn-pri"
              disabled={!listo}
              onClick={() => {
                const r = comprobar()
                if (r === 'sigue') return
                setMensaje(r.mensaje)
                if (r.ok) setEstado('ok')
                else {
                  setFallos(fallos + 1)
                  setEstado('mal')
                }
              }}
            >
              Comprobar
            </button>
          </div>
        </footer>
      )}

      {estado === 'ok' && (
        <footer className="pie ok" aria-live="polite">
          <div className="fb">
            <span className="fb-ico" style={{ background: 'var(--ok)' }}>
              <Icono nombre="bien" tam={20} grosor={3} />
            </span>
            <div>
              <p className="fb-tit" style={{ color: 'var(--ok)' }}>
                {fallos > 0 ? 'Ahora sí' : 'Correcto'}
              </p>
              <p className="fb-txt">
                <Texto>{mensaje}</Texto>
              </p>
              <p className="fb-txt" style={{ color: 'var(--suave)' }}>
                <Texto>{reto.explicacion}</Texto>
              </p>
            </div>
          </div>
          <button type="button" className="btn btn-ok" onClick={terminar}>
            {textoTerminar}
          </button>
        </footer>
      )}

      {estado === 'mal' && (
        <footer className="pie mal" aria-live="polite">
          <div className="fb">
            <span className="fb-ico" style={{ background: 'var(--mal)' }}>
              <Icono nombre="cerrar" tam={20} grosor={3} />
            </span>
            <div>
              <p className="fb-tit" style={{ color: 'var(--mal)' }}>Todavía no</p>
              <p className="fb-txt">
                <Texto>{mensaje}</Texto>
              </p>
              {fallos === 1 && (
                <p className="fb-txt" style={{ color: 'var(--suave)' }}>
                  Este concepto vuelve mañana en el repaso.
                </p>
              )}
            </div>
          </div>
          {!soloQuedaUna && (
            <button
              type="button"
              className="btn btn-pri"
              onClick={() => {
                reiniciar()
                setEstado('eligiendo')
              }}
            >
              Intentar otra vez
            </button>
          )}
          {fallos >= 3 || soloQuedaUna ? (
            <button type="button" className={`btn ${soloQuedaUna ? 'btn-pri' : 'btn-sec'}`} onClick={() => setEstado('solucion')}>
              Ver la solución
            </button>
          ) : (
            verPasoAPaso && (
              <button type="button" className="btn btn-sec" onClick={() => setPasoAPaso(true)}>
                Verlo paso a paso
              </button>
            )
          )}
        </footer>
      )}

      {estado === 'solucion' && (
        <footer className="pie sol" aria-live="polite">
          <div>
            <p className="fb-tit">{solucion}</p>
            <p className="fb-txt">
              <Texto>{reto.explicacion}</Texto>
            </p>
            <p className="fb-txt" style={{ color: 'var(--suave)' }}>
              Este concepto vuelve mañana en el repaso.
            </p>
          </div>
          <button type="button" className="btn btn-pri" onClick={terminar}>
            {textoTerminar}
          </button>
        </footer>
      )}
    </>
  )
}

// ---------- Opciones con letra (predecir, porqué del fallo) ----------

function Opciones({
  opciones,
  elegida,
  estado,
  elegir,
  comoSalida,
  dos,
}: {
  opciones: Opcion[]
  elegida: number | null
  estado: Estado
  elegir: (i: number) => void
  comoSalida?: boolean
  dos?: boolean
}) {
  const revelada = estado === 'ok' || estado === 'solucion'
  return (
    <div className={`opciones${dos ? ' dos' : ''}`} role="group" aria-label="Opciones">
      {opciones.map((o, i) => {
        const bien = revelada && o.correcta
        const mal = estado === 'mal' && elegida === i
        const clase = bien ? ' bien' : mal ? ' mal' : elegida === i ? ' elegida' : ''
        const ancha = dos && opciones.length % 2 === 1 && i === opciones.length - 1
        return (
          <button
            key={i}
            type="button"
            className={`opcion${clase}`}
            style={ancha ? { gridColumn: '1 / -1' } : undefined}
            aria-pressed={elegida === i}
            disabled={estado !== 'eligiendo'}
            onClick={() => elegir(i)}
          >
            <span className="letra">{LETRAS[i]}</span>
            {comoSalida ? (
              <span className="salida">
                {o.texto.split('\n').map((l, k) => (
                  <span key={k} className={l.startsWith('❌') ? 'err' : undefined}>
                    {l}
                    {'\n'}
                  </span>
                ))}
              </span>
            ) : (
              <span>
                <Texto>{o.texto}</Texto>
              </span>
            )}
            {bien && (
              <span className="marca" style={{ background: 'var(--ok)' }} aria-label="Correcta">
                <Icono nombre="bien" tam={14} grosor={3.5} />
              </span>
            )}
            {mal && (
              <span className="marca" style={{ background: 'var(--mal)' }} aria-label="Incorrecta">
                <Icono nombre="cerrar" tam={14} grosor={3.5} />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/** Diferencias línea a línea (subsecuencia común más larga), como un diff de Git. */
function diferencias(a: string[], b: string[]): { l: string; tipo: ' ' | '−' | '+' }[] {
  const t = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0))
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) t[i][j] = a[i] === b[j] ? t[i + 1][j + 1] + 1 : Math.max(t[i + 1][j], t[i][j + 1])
  const r: { l: string; tipo: ' ' | '−' | '+' }[] = []
  let i = 0
  let j = 0
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) r.push({ l: a[i++], tipo: ' ' }) && j++
    else if (j < b.length && (i >= a.length || t[i][j + 1] >= t[i + 1][j])) r.push({ l: b[j++], tipo: '+' })
    else r.push({ l: a[i++], tipo: '−' })
  }
  // Mejor leer primero lo que se quita y luego lo que se pone
  for (let k = 0; k < r.length - 1; k++) if (r[k].tipo === '+' && r[k + 1].tipo === '−') [r[k], r[k + 1]] = [r[k + 1], r[k]]
  return r
}

// ---------- Cada tipo ----------

type Comunes = { kicker?: string; chip?: string; alTerminar: (r: ResultadoReto) => void; textoTerminar?: string }

function Predecir({ reto, ...resto }: Comunes & { reto: Extract<Reto, { tipo: 'predecir' }> }) {
  const opciones = useMemo(() => barajar(reto.opciones, reto.id), [reto])
  const [elegida, setElegida] = useState<number | null>(null)
  const correcta = opciones.findIndex((o) => o.correcta)
  return (
    <MarcoReto
      {...resto}
      reto={reto}
      listo={elegida !== null}
      comprobar={() => ({ ok: opciones[elegida!].correcta === true, mensaje: opciones[elegida!].siEliges })}
      reiniciar={() => setElegida(null)}
      solucion={`La respuesta es la ${LETRAS[correcta]}`}
      verPasoAPaso={reto.codigo}
      cuerpo={(estado) => (
        <>
          <Codigo codigo={reto.codigo} />
          <Opciones opciones={opciones} elegida={elegida} estado={estado} elegir={setElegida} comoSalida dos />
        </>
      )}
    />
  )
}

function Hueco({ reto, ...resto }: Comunes & { reto: Extract<Reto, { tipo: 'hueco' }> }) {
  const fichas = useMemo(() => barajar(reto.opciones, reto.id), [reto])
  const [elegida, setElegida] = useState<number | null>(null)
  const [probada, setProbada] = useState<string | null>(null)
  const ejecucion = useEjecucion(probada)
  const correcta = fichas.find((o) => o.correcta)!
  return (
    <MarcoReto
      {...resto}
      reto={reto}
      listo={elegida !== null}
      comprobar={() => {
        setProbada(reto.codigo.replace('___', fichas[elegida!].texto))
        return { ok: fichas[elegida!].correcta === true, mensaje: fichas[elegida!].siEliges }
      }}
      reiniciar={() => {
        setElegida(null)
        setProbada(null)
      }}
      solucion={`En el hueco va: ${correcta.texto}`}
      cuerpo={(estado) => {
        const texto = estado === 'solucion' ? correcta.texto : elegida !== null ? fichas[elegida].texto : '    '
        return (
          <>
            <Codigo codigo={reto.codigo} hueco={<span className={`hueco${elegida === null && estado !== 'solucion' ? ' vacio' : ''}`}>{texto}</span>} />
            {estado === 'eligiendo' && (
              <div className="fichas" role="group" aria-label="Fichas">
                {fichas.map((f, i) => (
                  <button key={i} type="button" className={`ficha${elegida === i ? ' elegida' : ''}`} aria-pressed={elegida === i} onClick={() => setElegida(i)}>
                    {f.texto}
                  </button>
                ))}
              </div>
            )}
            {estado !== 'eligiendo' && <Consola salida={reto.salidaEsperada} titulo="Tiene que imprimir" />}
            {estado !== 'eligiendo' && <ConsolaDe r={ejecucion} titulo="Con tu ficha imprime" />}
          </>
        )
      }}
    />
  )
}

function Ordenar({ reto, ...resto }: Comunes & { reto: Extract<Reto, { tipo: 'ordenar' }> }) {
  // Cada línea suelta lleva un índice propio, porque puede haber dos líneas con el mismo texto.
  const sueltasIniciales = useMemo(() => barajar([...reto.lineas, ...(reto.sobran ?? [])].map((texto, i) => ({ i, texto })), reto.id), [reto])
  const [colocadas, setColocadas] = useState<{ i: number; texto: string }[]>([])
  const [probada, setProbada] = useState<string | null>(null)
  const [marcas, setMarcas] = useState<boolean[] | null>(null)
  const ejecucion = useEjecucion(probada)
  const sueltas = sueltasIniciales.filter((s) => !colocadas.some((c) => c.i === s.i))
  const esperadas = reto.lineas.length
  return (
    <MarcoReto
      {...resto}
      reto={reto}
      listo={colocadas.length === esperadas}
      comprobar={() => {
        const textos = colocadas.map((c) => c.texto)
        setProbada(textos.join('\n'))
        const bien = textos.map((t, k) => t === reto.lineas[k])
        setMarcas(bien)
        const ok = bien.every(Boolean)
        const primeraMal = bien.indexOf(false)
        return {
          ok,
          mensaje: ok
            ? 'Ese es el orden.'
            : `La línea ${primeraMal + 1} no va ahí. Al intentarlo otra vez se quedan las líneas que ya estaban bien colocadas desde arriba.`,
        }
      }}
      reiniciar={() => {
        // «Corregir» conserva el principio que ya estaba bien
        const prefijo = marcas ? marcas.indexOf(false) : 0
        setColocadas(colocadas.slice(0, prefijo === -1 ? colocadas.length : prefijo))
        setMarcas(null)
        setProbada(null)
      }}
      solucion="Este es el orden correcto"
      cuerpo={(estado) => {
        const mostradas = estado === 'solucion' ? reto.lineas.map((texto, i) => ({ i, texto })) : colocadas
        return (
          <>
            <Consola salida={reto.salidaEsperada} titulo="Tiene que imprimir esto" />
            <p className="kicker">Tu programa</p>
            <div className="bandeja" aria-label="Tu programa">
              {mostradas.map((c, k) => {
                const marca = estado === 'solucion' || estado === 'ok' ? ' bien' : estado === 'mal' && marcas ? (marcas[k] ? ' bien' : ' mal') : ''
                return (
                  <button
                    key={c.i}
                    type="button"
                    className={`ficha${marca === ' bien' ? ' elegida' : ''}`}
                    style={marca === ' mal' ? { borderColor: 'var(--mal)', background: 'var(--mal-t)' } : marca === ' bien' ? { borderColor: 'var(--ok)', background: 'var(--ok-t)' } : undefined}
                    disabled={estado !== 'eligiendo'}
                    onClick={() => setColocadas(colocadas.filter((x) => x.i !== c.i))}
                    aria-label={`Línea ${k + 1}: ${c.texto}. Tocar para quitarla`}
                  >
                    <span className="num">{k + 1}</span>
                    {c.texto}
                  </button>
                )
              })}
              {estado === 'eligiendo' && colocadas.length < esperadas && (
                <div className="ficha" style={{ borderStyle: 'dashed', color: 'var(--suave)', cursor: 'default' }}>
                  Toca la línea {colocadas.length + 1}
                </div>
              )}
            </div>
            {estado === 'eligiendo' && (
              <>
                <p className="kicker">Líneas sueltas{reto.sobran?.length ? ' (alguna sobra)' : ''}</p>
                <div className="fichas" style={{ flexDirection: 'column' }}>
                  {sueltas.map((s) => (
                    <button key={s.i} type="button" className="ficha" onClick={() => colocadas.length < esperadas && setColocadas([...colocadas, s])}>
                      {s.texto}
                    </button>
                  ))}
                </div>
              </>
            )}
            {estado === 'mal' && <ConsolaDe r={ejecucion} titulo="Tu orden imprime" />}
          </>
        )
      }}
    />
  )
}

function Fallo({ reto, ...resto }: Comunes & { reto: Extract<Reto, { tipo: 'fallo' }> }) {
  const porques = useMemo(() => barajar(reto.opciones, reto.id), [reto])
  const [linea, setLinea] = useState<number | null>(null)
  const [lineaOk, setLineaOk] = useState(false) // ya acertó el paso 1
  const [porque, setPorque] = useState<number | null>(null)
  const conFallo = useEjecucion(reto.codigo)
  const arreglado = useEjecucion(reto.arreglo)
  const correcto = porques.findIndex((o) => o.correcta)

  const diff = diferencias(reto.codigo.split('\n'), reto.arreglo.split('\n'))
  return (
    <MarcoReto
      {...resto}
      reto={reto}
      listo={lineaOk ? porque !== null : linea !== null}
      comprobar={() => {
        if (!lineaOk) {
          if (reto.lineasFallo.includes(linea!)) {
            setLineaOk(true)
            return 'sigue'
          }
          return { ok: false, mensaje: `La línea ${linea} hace lo que tiene que hacer. Busca la que no cumple lo que se pidió.` }
        }
        return { ok: porques[porque!].correcta === true, mensaje: porques[porque!].siEliges }
      }}
      reiniciar={() => {
        if (!lineaOk) setLinea(null)
        setPorque(null)
      }}
      solucion={`El fallo está en la línea ${reto.lineasFallo.join(' y ')}`}
      cuerpo={(estado) => {
        const resuelto = estado === 'ok' || estado === 'solucion'
        const marcas: Record<number, MarcaLinea> = {}
        if (resuelto || lineaOk) for (const l of reto.lineasFallo) marcas[l] = 'mal'
        else if (linea !== null) marcas[linea] = estado === 'mal' ? 'mal' : 'elegida'
        return (
          <>
            <p className="kicker">{lineaOk || resuelto ? 'Paso 2 de 2 · ¿Por qué falla?' : 'Paso 1 de 2 · ¿Dónde está el fallo?'}</p>
            <Codigo codigo={reto.codigo} marcas={marcas} alTocar={!lineaOk && estado === 'eligiendo' ? setLinea : undefined} etiqueta="Código de la IA" />
            {(lineaOk || resuelto) && <Opciones opciones={porques} elegida={estado === 'solucion' ? correcto : porque} estado={estado} elegir={setPorque} />}
            {resuelto && (
              <>
                <p className="kicker">Así queda arreglado</p>
                <div className="codigo" aria-label="Cambios">
                  {diff.map((d, i) => (
                    <div key={i} className={`linea${d.tipo === '−' ? ' mal' : d.tipo === '+' ? ' cambio' : ''}`}>
                      <span className="num">{d.tipo}</span>
                      {d.l}
                    </div>
                  ))}
                </div>
                <ConsolaDe r={conFallo} titulo="Con el fallo" />
                <ConsolaDe r={arreglado} titulo="Arreglado" />
              </>
            )}
          </>
        )
      }}
    />
  )
}

const inicial = (quien: string) => (/\bIA\b/.test(quien) ? 'IA' : quien.trim()[0]?.toUpperCase() ?? '?')

function Razon({ reto, ...resto }: Comunes & { reto: Extract<Reto, { tipo: 'razon' }> }) {
  const [elegida, setElegida] = useState<string | null>(null)
  const [descartadas, setDescartadas] = useState<string[]>([])
  const ejecucion = useEjecucion(reto.comprobar ? reto.codigo : null)
  const claves = [...reto.opiniones.map((o) => o.quien), 'ninguno']
  const nombre = (q: string) => (q === 'ninguno' ? 'Ninguna de las dos' : q)
  return (
    <MarcoReto
      {...resto}
      reto={reto}
      listo={elegida !== null}
      comprobar={() => {
        const ok = elegida === reto.correcta
        if (!ok) setDescartadas([...descartadas, elegida!])
        return { ok, mensaje: reto.siEliges[elegida!] ?? '' }
      }}
      reiniciar={() => setElegida(null)}
      soloQuedaUna={claves.length - descartadas.length <= 1}
      solucion={reto.correcta === 'ninguno' ? 'No tiene razón ninguna de las dos' : `Tiene razón ${reto.correcta}`}
      cuerpo={(estado) => {
        const resuelto = estado === 'ok' || estado === 'solucion'
        return (
          <>
            <Codigo codigo={reto.codigo} />
            <div className="opciones" role="group" aria-label="Opiniones">
              {claves.map((q) => {
                const o = reto.opiniones.find((x) => x.quien === q)
                const descartada = descartadas.includes(q)
                const clase = resuelto && q === reto.correcta ? ' bien' : estado === 'mal' && q === elegida ? ' mal' : descartada ? ' descartada' : elegida === q ? ' elegida' : ''
                return (
                  <button
                    key={q}
                    type="button"
                    className={`opcion${clase}`}
                    aria-pressed={elegida === q}
                    disabled={estado !== 'eligiendo' || descartada}
                    onClick={() => setElegida(q)}
                    style={o ? undefined : { minHeight: 56, justifyContent: 'center', fontWeight: 800 }}
                  >
                    {o ? (
                      <span style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <span className={`insignia${inicial(q) === 'IA' ? ' ia' : ''}`} aria-hidden="true">
                          {inicial(q)}
                        </span>
                        <span className="persona">
                          <span className="kicker">{q} dice</span>
                          <span style={{ fontSize: 18 }}>
                            <Texto>{o.dice}</Texto>
                          </span>
                          {resuelto && (
                            <span className="peq">
                              <Texto>{o.porque}</Texto>
                            </span>
                          )}
                        </span>
                      </span>
                    ) : (
                      nombre(q)
                    )}
                    {(descartada || (estado === 'mal' && q === elegida)) && (
                      <span className="marca" style={{ background: 'var(--mal)' }} aria-label="Descartada">
                        <Icono nombre="cerrar" tam={14} grosor={3.5} />
                      </span>
                    )}
                    {resuelto && q === reto.correcta && (
                      <span className="marca" style={{ background: 'var(--ok)' }} aria-label="Correcta">
                        <Icono nombre="bien" tam={14} grosor={3.5} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            {resuelto && reto.comprobar && <ConsolaDe r={ejecucion} titulo="Lo comprobamos: al ejecutarlo imprime" />}
          </>
        )
      }}
    />
  )
}

export function RetoPantalla(props: Comunes & { reto: Reto }) {
  const { reto } = props
  switch (reto.tipo) {
    case 'predecir':
      return <Predecir {...props} reto={reto} />
    case 'hueco':
      return <Hueco {...props} reto={reto} />
    case 'ordenar':
      return <Ordenar {...props} reto={reto} />
    case 'fallo':
      return <Fallo {...props} reto={reto} />
    case 'razon':
      return <Razon {...props} reto={reto} />
  }
}
