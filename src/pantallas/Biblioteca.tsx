// Biblioteca: el temario y las guías para consultar cuando quieras, también sin conexión (van dentro
// de la app). Cada tema o guía es un .md de contenido/biblioteca/ que preparan los profesores; los
// temas, en contenido/biblioteca/temario/tema-NN-nombre.md.

import { Fragment, useEffect, useState } from 'react'
import { Icono } from '../ui/basicos'
import { leerGuia, leerLinea, plegarRespuesta, type Bloque, type Guia } from '../ui/markdown'

const ficheros = import.meta.glob<string>('../../contenido/biblioteca/**/*.md', { eager: true, query: '?raw', import: 'default' })

interface Entrada extends Guia {
  /** Lo que va en la insignia: «3» para tema-03-…, «T» para tema-T-…; null si no es un tema. */
  tema: string | null
}

export const guias: Entrada[] = Object.entries(ficheros).map(([ruta, md]) => {
  const id = ruta.split('/').pop()!.replace(/\.md$/, '')
  const tema = ruta.includes('/temario/') ? (id.match(/^tema-([^-]+)/)?.[1].replace(/^0+(?=\d)/, '') ?? '') : null
  const g = leerGuia(id, md)
  // La insignia ya dice el número: «Tema 3. Decisiones» se queda en «Decisiones».
  if (tema === null) return { ...g, tema }
  return {
    ...g,
    titulo: g.titulo.replace(/^tema\s+\w+\s*[.:·-]\s*/i, ''),
    bloques: plegarRespuesta(g.bloques),
    tema,
  }
})

// El temario va por número de tema; un tema sin número (como «Tema T») se coloca con su `orden`. Cada
// tema se abre al llegar a su semana (cabecera `semana`).
const clave = (g: Entrada) => (g.tema && /^\d+$/.test(g.tema) ? Number(g.tema) : g.orden)
const porOrden = (a: Entrada, b: Entrada) => clave(a) - clave(b) || a.titulo.localeCompare(b.titulo, 'es', { numeric: true })
const temario = guias.filter((g) => g.tema !== null).sort(porOrden)

// «Documentación oficial»: el nombre del sitio sale de la dirección.
const SITIOS: [RegExp, string][] = [
  [/developer\.mozilla\.org/, 'MDN'],
  [/typescriptlang\.org/, 'TypeScript'],
  [/nodejs\.org/, 'Node.js'],
  [/git-scm\.com/, 'Git'],
  [/github\.com|docs\.github\.com/, 'GitHub'],
]
const sitio = (url: string) => SITIOS.find(([r]) => r.test(url))?.[1] ?? url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]

/** Un recurso de la lista «Documentación oficial»: `[Título](url)` y, si se quiere, «en español» o «en inglés». */
function recurso(item: string) {
  const m = item.match(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/)
  if (!m) return null
  const resto = item.replace(m[0], '').toLowerCase()
  const espanol = /en español/.test(resto) || (!/en inglés/.test(resto) && /\/es(-[A-Z]{2})?\//.test(m[2]))
  return {
    titulo: m[1],
    url: m[2],
    sitio: sitio(m[2]),
    idioma: espanol ? 'en español' : 'en inglés',
  }
}

function Documentacion({ items }: { items: string[] }) {
  return (
    <div className="docs">
      {items.map((it, i) => {
        const r = recurso(it)
        if (!r) return null
        return (
          <a key={i} className="tarjeta doc" href={r.url} target="_blank" rel="noopener noreferrer" aria-label={`${r.sitio}: ${r.titulo}, ${r.idioma} (se abre en otra pestaña)`}>
            <span className="doc-texto">
              <span className="kicker">{r.sitio}</span>
              <span className="doc-tit">{r.titulo}</span>
              <span className="pastilla suave">{r.idioma}</span>
            </span>
            <Icono nombre="externo" tam={20} />
          </a>
        )
      })}
    </div>
  )
}

/** Los bloques de un tema, con la lista que sigue a «Documentación oficial» en tarjetas-enlace. */
function Contenido({ bloques, abrir }: { bloques: Bloque[]; abrir: (id: string) => void }) {
  return (
    <>
      {bloques.map((b, i) => {
        const anterior = bloques[i - 1]
        if (b.tipo === 'lista' && anterior?.tipo === 'titulo' && /^documentación oficial$/i.test(anterior.texto.trim())) return <Documentacion key={i} items={b.items} />
        return <Pintar key={i} b={b} abrir={abrir} />
      })}
    </>
  )
}

function Insignia({ g, cerrado = false }: { g: Entrada; cerrado?: boolean }) {
  return <span className={`insignia${cerrado ? ' cerrada' : ''}`}>{g.tema}</span>
}

const TERMINAL = new Set(['bash', 'sh', 'shell', 'zsh', 'terminal', 'console'])

function Linea({ texto, abrir, enlaces = true }: { texto: string; abrir: (id: string) => void; enlaces?: boolean }) {
  return (
    <>
      {leerLinea(texto).map((t, i) => {
        switch (t.tipo) {
          case 'negrita':
            return <strong key={i}>{t.texto}</strong>
          case 'cursiva':
            return <em key={i}>{t.texto}</em>
          case 'codigo':
            return (
              <code key={i} className={t.texto.length <= 16 ? 'ic corto' : 'ic'}>
                {t.texto}
              </code>
            )
          case 'enlace': {
            if (!enlaces) return <Fragment key={i}>{t.texto}</Fragment>
            // Un enlace a otra guía (otra.md) se abre aquí mismo; el resto, fuera.
            const otra = t.destino.match(/^(?:\.{0,2}\/)*(?:[\w-]+\/)*([\w-]+)\.md(?:#.*)?$/)
            if (otra && guias.some((g) => g.id === otra[1]))
              return (
                <button key={i} type="button" className="enlace-guia" onClick={() => abrir(otra[1])}>
                  {t.texto}
                </button>
              )
            if (!/^https?:\/\//.test(t.destino)) return <Fragment key={i}>{t.texto}</Fragment>
            return (
              <a key={i} href={t.destino} target="_blank" rel="noopener noreferrer" className="enlace-fuera">
                {t.texto}
                <Icono nombre="externo" tam={14} />
                <span className="oculto"> (se abre en otra pestaña)</span>
              </a>
            )
          }
          default:
            return <Fragment key={i}>{t.texto}</Fragment>
        }
      })}
    </>
  )
}

function Pintar({ b, abrir }: { b: Bloque; abrir: (id: string) => void }) {
  switch (b.tipo) {
    case 'titulo':
      return b.nivel <= 2 ? (
        <h2 className="md-h2">
          <Linea texto={b.texto} abrir={abrir} />
        </h2>
      ) : (
        <h3 className="md-h3">
          <Linea texto={b.texto} abrir={abrir} />
        </h3>
      )
    case 'parrafo':
      return (
        <p className="txt">
          <Linea texto={b.texto} abrir={abrir} />
        </p>
      )
    case 'lista': {
      const Etiqueta = b.ordenada ? 'ol' : 'ul'
      return (
        <Etiqueta className="md-lista">
          {b.items.map((it, i) => (
            <li key={i}>
              <Linea texto={it} abrir={abrir} />
            </li>
          ))}
        </Etiqueta>
      )
    }
    case 'tabla':
      return (
        <div className="md-tabla">
          <table>
            <thead>
              <tr>
                {b.cabecera.map((c, i) => (
                  <th key={i}>
                    <Linea texto={c} abrir={abrir} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.filas.map((f, i) => (
                <tr key={i}>
                  {f.map((c, j) => (
                    <td key={j}>
                      <Linea texto={c} abrir={abrir} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'cita':
      return b.aviso ? (
        <aside className="md-aviso">
          <Icono nombre="cuidado" tam={22} />
          <p>
            <strong>Cuidado.</strong> <Linea texto={b.texto} abrir={abrir} />
          </p>
        </aside>
      ) : (
        <p className="md-cita">
          <Linea texto={b.texto} abrir={abrir} />
        </p>
      )
    case 'codigo':
      return TERMINAL.has(b.lenguaje) ? (
        <div className="consola">
          <p className="consola-tit">Terminal</p>
          {b.codigo}
        </div>
      ) : (
        <pre className="md-codigo">
          <code>{b.codigo}</code>
        </pre>
      )
    case 'separador':
      return <hr className="md-hr" />
    case 'desplegable':
      return (
        <details className="md-desplegable">
          <summary>
            <Icono nombre="abajo" tam={18} />
            <Linea texto={b.resumen} abrir={abrir} />
          </summary>
          <div className="md-desplegable-dentro">
            {b.bloques.map((x, i) => (
              <Pintar key={i} b={x} abrir={abrir} />
            ))}
          </div>
        </details>
      )
  }
}

function Tarjeta({ g, abrir, semana }: { g: Entrada; abrir: (id: string) => void; semana?: number }) {
  return (
    <button type="button" className="tarjeta guia" onClick={() => abrir(g.id)}>
      <span className="guia-cab">
        {g.tema !== null && <Insignia g={g} />}
        <span className="guia-tit">{g.titulo}</span>
        {semana !== undefined && g.semana === semana && <span className="pastilla pri">Esta semana</span>}
      </span>
      {g.descripcion && (
        <span className="peq">
          <Linea texto={g.descripcion} abrir={abrir} enlaces={false} />
        </span>
      )}
    </button>
  )
}

/** semana: la del próximo día que le toca (Infinity si ya lo ha hecho todo). */
export function Biblioteca({ volver, semana }: { volver: () => void; semana: number }) {
  const [abierta, setAbierta] = useState<string | null>(null)
  const guia = guias.find((g) => g.id === abierta)
  const abiertoYa = (g: Entrada) => g.semana <= semana
  const otras = guias.filter((g) => g.tema === null && abiertoYa(g)).sort(porOrden)
  const hayTemario = temario.length > 0
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [abierta])

  // Navegación al pie de un tema: el anterior siempre; el siguiente, solo si ya se ha abierto.
  const pos = guia?.tema != null ? temario.indexOf(guia) : -1
  const anterior = pos > 0 ? temario[pos - 1] : undefined
  const siguiente = pos >= 0 && temario[pos + 1] && abiertoYa(temario[pos + 1]) ? temario[pos + 1] : undefined

  return (
    <div className="app ancha">
      <header className="top">
        <button type="button" className="icono" aria-label={guia ? (hayTemario ? 'Volver al temario' : 'Volver a la biblioteca') : 'Volver'} onClick={() => (guia ? setAbierta(null) : volver())}>
          <Icono nombre="atras" tam={24} />
        </button>
      </header>
      <main className="cuerpo md-guia">
        {guia ? (
          <>
            <p className="kicker">{guia.tema !== null ? `Tema ${guia.tema}` : 'Biblioteca'}</p>
            <h1 className="h1">{guia.titulo}</h1>
            <Contenido bloques={guia.bloques} abrir={setAbierta} />
            {(anterior || siguiente) && (
              <nav className="entre-temas" aria-label="Otros temas">
                {anterior && (
                  <button type="button" className="btn btn-sec" onClick={() => setAbierta(anterior.id)}>
                    <Icono nombre="atras" tam={20} /> Tema {anterior.tema}
                  </button>
                )}
                {siguiente && (
                  <button type="button" className="btn btn-sec siguiente" onClick={() => setAbierta(siguiente.id)}>
                    Tema {siguiente.tema} <Icono nombre="atras" tam={20} />
                  </button>
                )}
              </nav>
            )}
          </>
        ) : (
          <>
            <h1 className="h1">{hayTemario ? 'Temario' : 'Biblioteca'}</h1>
            <p className="peq">Para consultar cuando quieras. Se lee también sin conexión; solo los enlaces de fuera necesitan internet.</p>
            {guias.length === 0 && <p className="txt">Todavía no hay temas. Los primeros llegan pronto.</p>}
            {hayTemario && (
              <section className="seccion-guias" aria-label="Temas">
                {temario.map((g) =>
                  abiertoYa(g) ? (
                    <Tarjeta key={g.id} g={g} abrir={setAbierta} semana={semana} />
                  ) : (
                    <div key={g.id} className="tarjeta guia cerrada" aria-disabled="true" aria-label={`Tema ${g.tema}, se abre la semana ${g.semana}`}>
                      <span className="guia-cab" aria-hidden="true">
                        <Insignia g={g} cerrado />
                        <span className="guia-tit">{g.titulo}</span>
                      </span>
                      <span className="cerrada-pie" aria-hidden="true">
                        <Icono nombre="candado" tam={16} />
                        <span className="pastilla suave">Llega la semana {g.semana}</span>
                      </span>
                    </div>
                  ),
                )}
              </section>
            )}
            {otras.length > 0 && (
              <section className="seccion-guias">
                <h2 className="md-h3">Guías</h2>
                {otras.map((g) => (
                  <Tarjeta key={g.id} g={g} abrir={setAbierta} />
                ))}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  )
}
