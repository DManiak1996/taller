// Biblioteca: el temario y las guías para consultar cuando quieras, también sin conexión (van dentro
// de la app). Cada tema o guía es un .md de contenido/biblioteca/ que preparan los profesores; los
// temas, en contenido/biblioteca/temario/tema-NN-nombre.md.

import { Fragment, useEffect, useState } from 'react'
import { Icono } from '../ui/basicos'
import { leerGuia, leerLinea, type Bloque, type Guia } from '../ui/markdown'

const ficheros = import.meta.glob<string>('../../contenido/biblioteca/**/*.md', { eager: true, query: '?raw', import: 'default' })

interface Entrada extends Guia {
  /** Número del tema (tema-03-… es el 3), o null si no es del temario. */
  tema: number | null
  enTemario: boolean
}

export const guias: Entrada[] = Object.entries(ficheros).map(([ruta, md]) => {
  const id = ruta.split('/').pop()!.replace(/\.md$/, '')
  const num = id.match(/^tema-(\d+)/)?.[1]
  return { ...leerGuia(id, md), tema: num ? Number(num) : null, enTemario: ruta.includes('/temario/') }
})

// El temario va por número de tema (un tema sin número, como «Tema T», se coloca con `orden`). Las
// chuletas, por semana. Todo se abre al llegar a su semana (cabecera `semana`).
const semanaDe = (g: Entrada) => g.semana || Number(g.id.match(/^chuleta-semana-(\d+)$/)?.[1] ?? 0)
const clave = (g: Entrada) => g.tema ?? g.orden
const porOrden = (a: Entrada, b: Entrada) => clave(a) - clave(b) || a.titulo.localeCompare(b.titulo, 'es', { numeric: true })
const esChuleta = (g: Entrada) => /^chuleta-semana-\d+$/.test(g.id)

function secciones(semana: number) {
  const abierta = (g: Entrada) => semanaDe(g) <= semana
  const temario = guias.filter((g) => g.enTemario).sort(porOrden)
  return {
    temario: temario.filter(abierta),
    // El siguiente tema cerrado se enseña con candado, para que se vea lo que viene.
    proximo: temario.find((g) => !abierta(g)),
    chuletas: guias.filter((g) => esChuleta(g) && abierta(g)).sort((a, b) => semanaDe(a) - semanaDe(b)),
    otras: guias.filter((g) => !g.enTemario && !esChuleta(g) && abierta(g)).sort(porOrden),
  }
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
              <code key={i} className="ic">
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
              <a key={i} href={t.destino} target="_blank" rel="noreferrer" className="enlace-fuera">
                {t.texto}
                <Icono nombre="externo" tam={14} />
                <span className="oculto"> (se abre fuera de la app)</span>
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

function Tarjeta({ g, abrir }: { g: Entrada; abrir: (id: string) => void }) {
  return (
    <button type="button" className="tarjeta guia" onClick={() => abrir(g.id)}>
      <span className="guia-tit">{g.titulo}</span>
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
  const { temario, proximo, chuletas, otras } = secciones(semana)
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
            <p className="kicker">{guia.enTemario ? (guia.tema !== null ? `Temario · tema ${guia.tema}` : 'Temario') : 'Biblioteca'}</p>
            <h1 className="h1">{guia.titulo}</h1>
            {guia.bloques.map((b, i) => (
              <Pintar key={i} b={b} abrir={setAbierta} />
            ))}
          </>
        ) : (
          <>
            <h1 className="h1">Biblioteca</h1>
            <p className="peq">El temario y las guías, para consultar cuando quieras. Se leen también sin conexión.</p>
            {guias.length === 0 && <p className="txt">Todavía no hay temas. Los primeros llegan pronto.</p>}
            {(temario.length > 0 || proximo) && (
              <section className="seccion-guias">
                <h2 className="md-h3">Temario</h2>
                {temario.map((g) => (
                  <Tarjeta key={g.id} g={g} abrir={setAbierta} />
                ))}
                {proximo && (
                  <div className="tarjeta guia cerrada" aria-disabled="true">
                    <span className="guia-tit">
                      <Icono nombre="candado" tam={18} /> {proximo.titulo}
                    </span>
                    <span className="peq">Se abre en la semana {semanaDe(proximo)}.</span>
                  </div>
                )}
              </section>
            )}
            {chuletas.length > 0 && (
              <section className="seccion-guias">
                <h2 className="md-h3">Chuletas de cada semana</h2>
                {chuletas.map((g) => (
                  <Tarjeta key={g.id} g={g} abrir={setAbierta} />
                ))}
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
