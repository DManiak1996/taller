// Zona libre: escribir código y ejecutarlo, sin ejercicios ni pruebas. Pensada para el Mac.
// Usa el mismo sandbox que los retos (aislado, sin red y con límite de tiempo) y guarda el último
// código en este dispositivo. El editor es CodeMirror 6: números de línea y colores, sin autocompletar,
// para que el código lo escriba él.

import { useRef, useState } from 'react'
import { ejecutar } from '../sandbox/ejecutar'
import type { Resultado } from '../sandbox/tipos'
import { Icono } from '../ui/basicos'
import { Editor, esMac } from '../ui/Editor'

const CLAVE = 'taller.zona-libre.v1'
const INICIAL = `// Escribe aquí y pulsa Ejecutar.
const nombre = "Daniel"
console.log("Hola, " + nombre)
`

const leer = () => {
  try {
    return localStorage.getItem(CLAVE) ?? INICIAL
  } catch {
    return INICIAL
  }
}
const guardar = (codigo: string) => {
  try {
    localStorage.setItem(CLAVE, codigo)
  } catch {
    // Sin almacenamiento (modo privado): el código vive mientras la página esté abierta.
  }
}

// Colores de los tokens del taller, así el editor se ve igual en modo claro y oscuro.
export function ZonaLibre({ volver }: { volver: () => void }) {
  const codigo = useRef(leer())
  const [resultado, setResultado] = useState<Resultado | null>(null)
  const [corriendo, setCorriendo] = useState(false)

  const correr = async () => {
    if (corriendo) return
    setCorriendo(true)
    guardar(codigo.current)
    setResultado(await ejecutar(codigo.current, { maxPasos: 0 }))
    setCorriendo(false)
  }

  const error = resultado?.error
  return (
    <div className="app ancha">
      <header className="top">
        <button type="button" className="icono" aria-label="Volver" onClick={volver}>
          <Icono nombre="atras" tam={24} />
        </button>
        <h1 className="h1" style={{ fontSize: 22 }}>
          Zona libre
        </h1>
      </header>
      <main className="cuerpo">
        <p className="peq">Escribe lo que quieras y pruébalo. Se guarda solo en este dispositivo. Aquí no hay respuestas correctas.</p>
        <Editor
          inicial={codigo.current}
          alCambiar={(c) => {
            codigo.current = c
            guardar(c)
          }}
          alEjecutar={correr}
        />
        <div className="fila">
          <button type="button" className="btn btn-pri" onClick={correr} disabled={corriendo}>
            {corriendo ? 'Ejecutando…' : 'Ejecutar'}
          </button>
        </div>
        <p className="peq" style={{ marginTop: -8 }}>
          {esMac ? '⌘ + Enter' : 'Ctrl + Enter'} también ejecuta. Tab mete sangría.
        </p>
        {resultado && (
          <div className="consola" aria-live="polite">
            <p className="consola-tit">Consola</p>
            {resultado.salida.map((s, i) => (
              <div key={i}>{s}</div>
            ))}
            {resultado.salida.length === 0 && !error && <div className="vacia">(no imprime nada)</div>}
            {error && (
              <>
                <div className="err">
                  <Icono nombre="cerrar" tam={14} grosor={3} /> {error.linea ? `Línea ${error.linea}: ` : ''}
                  {error.explicacion}
                </div>
                {/Error$/.test(error.nombre) && error.mensaje !== error.nombre && (
                  <div className="original">
                    En inglés: {error.nombre}: {error.mensaje}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
