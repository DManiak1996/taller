import { useState } from 'react'
import type { Pantalla } from '../contenido/cargar'
import { Codigo, Consola, Icono, Texto } from '../ui/basicos'
import { Visualizador } from '../ui/Visualizador'

function Contenido({ p }: { p: Pantalla }) {
  switch (p.tipo) {
    case 'texto':
      return (
        <p className="grande">
          <Texto>{p.texto}</Texto>
        </p>
      )
    case 'codigo':
      return (
        <>
          <Codigo codigo={p.codigo} />
          {p.salida && <Consola salida={p.lanzaError ? p.salida : p.salida} error={p.lanzaError ? 'Este código falla a propósito' : undefined} />}
          {p.nota && (
            <p className="txt">
              <Texto>{p.nota}</Texto>
            </p>
          )}
        </>
      )
    case 'deiure': {
      // linea y simplificado son opcionales y pueden no estar en el formato todavía
      const extra = p as typeof p & { linea?: number; simplificado?: true }
      return (
        <>
          <p className="kicker">Esto está en DeIure</p>
          <p className="grande">
            <Texto>{p.texto}</Texto>
          </p>
          {(p.fichero || extra.simplificado) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {p.fichero && (
                <span className="pestana">
                  {p.fichero}
                  {extra.linea ? `, línea ${extra.linea}` : ''}
                </span>
              )}
              {extra.simplificado && <span className="pastilla">simplificado</span>}
            </div>
          )}
          {p.codigo && <Codigo codigo={p.codigo} etiqueta="Código de DeIure" />}
        </>
      )
    }
    case 'terminal':
      return (
        <>
          {p.fichero && (
            <>
              <span className="pestana">{p.fichero.nombre}</span>
              <Codigo codigo={p.fichero.codigo} etiqueta={`Fichero ${p.fichero.nombre}`} />
            </>
          )}
          <div className="consola" aria-label="Terminal">
            <p className="consola-tit">Terminal</p>
            <div className="terminal-orden">{p.orden}</div>
            {p.salida.map((s, i) => (
              <div key={i}>{s}</div>
            ))}
            <span className="cursor" aria-hidden="true" />
          </div>
          {p.nota && (
            <p className="txt">
              <Texto>{p.nota}</Texto>
            </p>
          )}
        </>
      )
    case 'esquema':
      return (
        <>
          {p.titulo && <h1 className="h1">{p.titulo}</h1>}
          <ol className="esquema">
            {p.pasos.map((caja, i) => (
              <li key={i}>
                <div className="caja">
                  <span className="n">{i + 1}</span>
                  <div>
                    <p className="txt" style={{ fontWeight: 800, fontSize: 17 }}>
                      {caja.titulo}
                    </p>
                    <p className="peq">
                      <Texto>{caja.texto}</Texto>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </>
      )
    case 'pasoapaso':
      return null // se pinta aparte, con sus propios botones
  }
}

export function Leccion({ titulo, pildora, pantallas, alTerminar }: { titulo: string; pildora?: boolean; pantallas: Pantalla[]; alTerminar: () => void }) {
  const [n, setN] = useState(0)
  const p = pantallas[n]
  const ultima = n === pantallas.length - 1
  const siguiente = () => (ultima ? alTerminar() : setN(n + 1))

  return (
    <>
      <main className="cuerpo" key={n}>
        <p className="kicker">
          {pildora ? 'Píldora de informática' : 'Lección'} · {n + 1} de {pantallas.length}
        </p>
        {n === 0 && p.tipo !== 'esquema' && <h1 className="h1">{titulo.replace(/^Píldora:\s*/, '')}</h1>}
        {p.tipo === 'pasoapaso' ? (
          <Visualizador codigo={p.codigo} pasos={p.pasos} alTerminar={siguiente} textoFin={ultima ? 'Empezar los retos' : 'Entendido, sigo'} />
        ) : (
          <Contenido p={p} />
        )}
      </main>
      {p.tipo !== 'pasoapaso' && (
        <footer className="pie">
          <div className="fila">
            {n > 0 && (
              <button type="button" className="btn btn-sec btn-cuadrado" onClick={() => setN(n - 1)} aria-label="Pantalla anterior">
                <Icono nombre="atras" />
              </button>
            )}
            <button type="button" className="btn btn-pri" onClick={siguiente}>
              {ultima ? 'Empezar los retos' : 'Siguiente'}
            </button>
          </div>
        </footer>
      )}
    </>
  )
}
