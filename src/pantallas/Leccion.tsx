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
    case 'deiure':
      return (
        <>
          <p className="kicker">Esto está en DeIure</p>
          <p className="grande">
            <Texto>{p.texto}</Texto>
          </p>
          {p.codigo && <Codigo codigo={p.codigo} etiqueta="Código de DeIure" />}
          {p.fichero && <p className="peq mono">{p.fichero}</p>}
        </>
      )
    case 'terminal':
      return (
        <>
          {p.fichero && (
            <>
              <p className="kicker">{p.fichero.nombre}</p>
              <Codigo codigo={p.fichero.codigo} etiqueta={`Fichero ${p.fichero.nombre}`} />
            </>
          )}
          <div className="consola" aria-label="Terminal">
            <p className="consola-tit">Terminal</p>
            <div className="terminal-orden">{p.orden}</div>
            {p.salida.map((s, i) => (
              <div key={i}>{s}</div>
            ))}
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
          {p.titulo && <p className="kicker">{p.titulo}</p>}
          <div className="esquema">
            {p.pasos.map((caja, i) => (
              <div key={i}>
                {i > 0 && (
                  <div className="flecha">
                    <Icono nombre="abajo" />
                  </div>
                )}
                <div className="caja">
                  <p className="txt" style={{ fontWeight: 800 }}>
                    {caja.titulo}
                  </p>
                  <p className="txt" style={{ fontSize: 16 }}>
                    <Texto>{caja.texto}</Texto>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )
    case 'pasoapaso':
      return null // se pinta aparte, con sus propios botones
  }
}

export function Leccion({ titulo, pantallas, alTerminar }: { titulo: string; pantallas: Pantalla[]; alTerminar: () => void }) {
  const [n, setN] = useState(0)
  const p = pantallas[n]
  const ultima = n === pantallas.length - 1
  const siguiente = () => (ultima ? alTerminar() : setN(n + 1))

  return (
    <>
      <main className="cuerpo" key={n}>
        <p className="kicker">
          Lección · {n + 1} de {pantallas.length}
        </p>
        {n === 0 && <h1 className="h1">{titulo}</h1>}
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
