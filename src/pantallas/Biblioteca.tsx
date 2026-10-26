// Biblioteca: guías para consultar cuando quieras, también sin conexión (van dentro de la app).
// Cada guía es un .md de contenido/biblioteca/ que preparan los profesores.

import { Fragment, useEffect, useState } from 'react'
import { Icono } from '../ui/basicos'
import { leerGuia, leerLinea, type Bloque, type Guia } from '../ui/markdown'

const ficheros = import.meta.glob<string>('../../contenido/biblioteca/*.md', { eager: true, query: '?raw', import: 'default' })

export const guias: Guia[] = Object.entries(ficheros)
  .map(([ruta, md]) => leerGuia(ruta.split('/').pop()!.replace(/\.md$/, ''), md))
  .sort((a, b) => a.orden - b.orden || a.titulo.localeCompare(b.titulo, 'es'))

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
              <code key={i} className="ic">
                {t.texto}
              </code>
            )
          case 'enlace': {
            if (!enlaces) return <Fragment key={i}>{t.texto}</Fragment>
            // Un enlace a otra guía (otra.md) se abre aquí mismo; el resto, fuera.
            const otra = t.destino.match(/^(?:\.\/)?([\w-]+)\.md$/)
            if (otra && guias.some((g) => g.id === otra[1]))
              return (
                <button key={i} type="button" className="enlace-guia" onClick={() => abrir(otra[1])}>
                  {t.texto}
                </button>
              )
            if (!/^https?:\/\//.test(t.destino)) return <Fragment key={i}>{t.texto}</Fragment>
            return (
              <a key={i} href={t.destino} target="_blank" rel="noreferrer">
                {t.texto}
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
      return (
        <aside className="md-cita">
          <Linea texto={b.texto} abrir={abrir} />
        </aside>
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
  }
}

export function Biblioteca({ volver }: { volver: () => void }) {
  const [abierta, setAbierta] = useState<string | null>(null)
  const guia = guias.find((g) => g.id === abierta)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [abierta])

  return (
    <div className="app ancha">
      <header className="top">
        <button type="button" className="icono" aria-label={guia ? 'Volver a la biblioteca' : 'Volver'} onClick={() => (guia ? setAbierta(null) : volver())}>
          <Icono nombre="atras" tam={24} />
        </button>
      </header>
      <main className="cuerpo md-guia">
        {guia ? (
          <>
            <p className="kicker">Biblioteca</p>
            <h1 className="h1">{guia.titulo}</h1>
            {guia.bloques.map((b, i) => (
              <Pintar key={i} b={b} abrir={setAbierta} />
            ))}
          </>
        ) : (
          <>
            <h1 className="h1">Biblioteca</h1>
            <p className="peq">Guías para consultar cuando quieras. Funcionan también sin conexión.</p>
            {guias.length === 0 && <p className="txt">Todavía no hay guías. Las primeras llegan pronto.</p>}
            {guias.map((g) => (
              <button key={g.id} type="button" className="tarjeta guia" onClick={() => setAbierta(g.id)}>
                <span className="guia-tit">{g.titulo}</span>
                {g.descripcion && (
                  <span className="peq">
                    <Linea texto={g.descripcion} abrir={setAbierta} enlaces={false} />
                  </span>
                )}
              </button>
            ))}
          </>
        )}
      </main>
    </div>
  )
}
