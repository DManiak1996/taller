import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

/** Texto con **negrita** y `código`, lo único que usan los profesores. */
export function Texto({ children }: { children: string }) {
  const partes = children.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return (
    <>
      {partes.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? (
          <strong key={i}>{p.slice(2, -2)}</strong>
        ) : p.startsWith('`') && p.endsWith('`') ? (
          <code key={i} className="ic">
            {p.slice(1, -1)}
          </code>
        ) : (
          p
        ),
      )}
    </>
  )
}

const TRAZOS = {
  cerrar: <path d="M6 6l12 12M18 6L6 18" />,
  atras: <path d="M15 18l-6-6 6-6" />,
  flecha: <path d="M5 12h14M13 6l6 6-6 6" />,
  bien: <path d="M5 12l5 5L20 7" />,
  pista: <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.2 1 2.1h5c0-.9.4-1.7 1-2.1A6 6 0 0 0 12 3z" />,
  abajo: <path d="M12 4v16M6 14l6 6 6-6" />,
  mapa: <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14" />,
  usuario: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" />,
  mision: <path d="M4 17l6-6-6-6M12 19h8" />,
  ojo: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  sinred: <path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0M12 19h.01M3 3l18 18" />,
}

export function Icono({ nombre, tam = 22, grosor = 2.5 }: { nombre: keyof typeof TRAZOS; tam?: number; grosor?: number }) {
  return (
    <svg width={tam} height={tam} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {TRAZOS[nombre]}
    </svg>
  )
}

/** Colorea las tres partes de la cabecera de un for: inicio, condición y paso. */
function lineaConFor(texto: string, foco?: string): ReactNode {
  const m = texto.match(/^(\s*for\s*\()([^;]*)(;\s*)([^;]*)(;\s*)([^)]*)(\).*)$/)
  if (!m || /\b(of|in)\b/.test(m[2])) return texto
  const parte = (clase: string, t: string, clave: string) => (
    <span className={`${clase}${foco === clave ? ' foco' : ''}`}>{t}</span>
  )
  return (
    <>
      {m[1]}
      {parte('p-ini', m[2], 'inicio')}
      {m[3]}
      {parte('p-con', m[4], 'condicion')}
      {m[5]}
      {parte('p-pas', m[6], 'paso')}
      {m[7]}
    </>
  )
}

export type MarcaLinea = 'activa' | 'bien' | 'mal' | 'cambio' | 'elegida'

/** Cuántos caracteres de Mono caben en el bloque a 16 px y a 15 px. */
function useColumnas() {
  const ref = useRef<HTMLDivElement>(null)
  const [cols, setCols] = useState<{ c16: number; c15: number }>({ c16: 999, c15: 999 })
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const medir = () => {
      const lienzo = document.createElement('canvas').getContext('2d')
      if (!lienzo) return
      const familia = getComputedStyle(el).fontFamily
      // ancho útil: el bloque menos la columna de números (36 px) y el margen derecho (14 px)
      const util = el.clientWidth - 36 - 14
      lienzo.font = `16px ${familia}`
      const a16 = lienzo.measureText('0000000000').width / 10
      lienzo.font = `15px ${familia}`
      const a15 = lienzo.measureText('0000000000').width / 10
      setCols({ c16: Math.floor(util / a16), c15: Math.floor(util / a15) })
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    document.fonts?.ready.then(medir)
    return () => ro.disconnect()
  }, [])
  return { ref, cols }
}

/** Parte una línea larga en filas: la primera tal cual y las siguientes con sangría francesa. */
function partir(linea: string, cols: number): string[] {
  if (linea.length <= cols) return [linea]
  const sangria = linea.match(/^\s*/)![0].length + 2
  const filas: string[] = []
  let resto = linea
  let ancho = cols
  while (resto.length > ancho) {
    let corte = resto.lastIndexOf(' ', ancho)
    if (corte <= (filas.length ? 0 : sangria)) corte = ancho
    filas.push(resto.slice(0, corte))
    resto = resto.slice(corte).replace(/^ /, '')
    ancho = Math.max(8, cols - sangria - 2) // la marca ↪ y su espacio ocupan 2
  }
  filas.push(resto)
  return filas
}

export function Codigo({
  codigo,
  marcas = {},
  parte,
  alTocar,
  hueco,
  etiqueta = 'Código',
}: {
  codigo: string
  marcas?: Record<number, MarcaLinea>
  parte?: string // parte del for resaltada en la línea activa
  alTocar?: (linea: number) => void // si se da, cada línea es un botón
  hueco?: ReactNode // lo que va en la marca ___
  etiqueta?: string
}) {
  const { ref, cols } = useColumnas()
  const lineas = codigo.split('\n')
  const cabe16 = lineas.every((l) => l.length <= cols.c16)
  const ancho = cabe16 ? cols.c16 : cols.c15

  const conHueco = (texto: string): ReactNode => {
    if (hueco === undefined || !texto.includes('___')) return texto
    const [antes, despues] = texto.split('___')
    return (
      <>
        {antes}
        {hueco}
        {despues}
      </>
    )
  }

  return (
    <div ref={ref} className="codigo" style={cabe16 ? undefined : { fontSize: 15 }} role={alTocar ? 'group' : undefined} aria-label={etiqueta}>
      {lineas.map((l, i) => {
        const n = i + 1
        const marca = marcas[n]
        const clase = `linea${marca ? ' ' + marca : ''}`
        const filas = partir(l, ancho)
        const sangria = ' '.repeat(l.match(/^\s*/)![0].length)
        const contenido: ReactNode =
          filas.length === 1 ? (
            l.includes('___') ? conHueco(l) : lineaConFor(l, marca === 'activa' ? parte : undefined)
          ) : (
            <span style={{ display: 'flex', flexDirection: 'column' }}>
              {filas.map((f, k) => (
                <span key={k}>
                  {k > 0 && (
                    <>
                      {sangria}
                      <span style={{ color: 'var(--suave)' }} aria-hidden="true">
                        ↪{' '}
                      </span>
                    </>
                  )}
                  {conHueco(f)}
                </span>
              ))}
            </span>
          )
        const numero = (
          <span className="num" style={filas.length > 1 ? { alignSelf: 'flex-start' } : undefined}>
            {n}
          </span>
        )
        return alTocar ? (
          <button key={n} type="button" className={clase} onClick={() => alTocar(n)} aria-pressed={marca === 'elegida'} aria-label={`Línea ${n}: ${l.trim()}`}>
            {numero}
            {contenido}
          </button>
        ) : (
          <div key={n} className={clase}>
            {numero}
            {contenido}
          </div>
        )
      })}
    </div>
  )
}

export function Consola({ salida, error, titulo = 'Lo que imprime', vacia = '(no imprime nada)' }: { salida: string[]; error?: string; titulo?: string; vacia?: string }) {
  return (
    <div className="consola" aria-live="polite">
      <p className="consola-tit">{titulo}</p>
      {salida.map((s, i) => (
        <div key={i}>{s}</div>
      ))}
      {salida.length === 0 && !error && <div className="vacia">{vacia}</div>}
      {error && <div className="err">❌ {error}</div>}
    </div>
  )
}

export function Cabecera({ total, actual, alSalir, etiqueta }: { total: number; actual: number; alSalir: () => void; etiqueta: string }) {
  return (
    <header className="top">
      <button type="button" className="icono" aria-label="Salir del reto" onClick={alSalir}>
        <Icono nombre="cerrar" tam={24} grosor={2.25} />
      </button>
      <div className="segs" aria-label={`${etiqueta}: paso ${actual + 1} de ${total} de la sesión`}>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`seg${i < actual ? ' hecho' : i === actual ? ' ahora' : ''}`} />
        ))}
      </div>
    </header>
  )
}
