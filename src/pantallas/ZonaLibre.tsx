// Zona libre: escribir código y ejecutarlo, sin ejercicios ni pruebas. Pensada para el Mac.
// Usa el mismo sandbox que los retos (aislado, sin red y con límite de tiempo) y guarda el último
// código en este dispositivo. El editor es CodeMirror 6: números de línea y colores, sin autocompletar,
// para que el código lo escriba él.

import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import { bracketMatching, HighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language'
import { EditorState } from '@codemirror/state'
import { EditorView, drawSelection, highlightActiveLine, keymap, lineNumbers } from '@codemirror/view'
import { tags as t } from '@lezer/highlight'
import { useEffect, useRef, useState } from 'react'
import { ejecutar } from '../sandbox/ejecutar'
import type { Resultado } from '../sandbox/tipos'
import { Icono } from '../ui/basicos'

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
// Colores de Diseño: los de significado (partes del for, acierto y fallo) no se usan para la sintaxis.
const colores = HighlightStyle.define([
  { tag: [t.keyword, t.controlKeyword, t.definitionKeyword, t.moduleKeyword, t.operatorKeyword], color: 'var(--tinta)', fontWeight: '700' },
  { tag: [t.string, t.special(t.string)], color: 'var(--sx-cadena)' },
  { tag: [t.lineComment, t.blockComment], color: 'var(--sx-comentario)', fontStyle: 'italic' },
])

const tema = EditorView.theme({
  '&': { backgroundColor: 'var(--code)', color: 'var(--tinta)', fontSize: '16px', border: '1px solid var(--borde)', borderRadius: 'var(--r-tarjeta)' },
  '&.cm-focused': { outline: '2px solid var(--pri)', outlineOffset: '-1px' },
  '.cm-scroller': { fontFamily: 'var(--f-codigo)', lineHeight: '1.75', minHeight: '240px' },
  '.cm-content': { padding: '12px 0', caretColor: 'var(--tinta)' },
  '.cm-gutters': { backgroundColor: 'transparent', color: 'var(--suave)', border: 'none', paddingLeft: '4px' },
  '.cm-activeLine': { backgroundColor: 'var(--pri-t)' },
  '.cm-activeLineGutter': { backgroundColor: 'transparent', color: 'var(--tinta)' },
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': { backgroundColor: 'var(--pri-t) !important' },
  '.cm-cursor': { borderLeftColor: 'var(--tinta)', borderLeftWidth: '2px' },
  '.cm-matchingBracket': { backgroundColor: 'var(--pri-t)', outline: '1px solid var(--pri)' },
})

const esMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform)

export function ZonaLibre({ volver }: { volver: () => void }) {
  const caja = useRef<HTMLDivElement>(null)
  const vista = useRef<EditorView | null>(null)
  const [resultado, setResultado] = useState<Resultado | null>(null)
  const [corriendo, setCorriendo] = useState(false)
  const correr = useRef<() => void>(() => undefined)

  correr.current = async () => {
    if (!vista.current || corriendo) return
    setCorriendo(true)
    const codigo = vista.current.state.doc.toString()
    guardar(codigo)
    setResultado(await ejecutar(codigo, { maxPasos: 0 }))
    setCorriendo(false)
  }

  useEffect(() => {
    if (!caja.current) return
    const v = new EditorView({
      parent: caja.current,
      state: EditorState.create({
        doc: leer(),
        extensions: [
          lineNumbers(),
          history(),
          drawSelection(),
          indentOnInput(),
          bracketMatching(),
          highlightActiveLine(),
          javascript({ typescript: true }),
          syntaxHighlighting(colores),
          tema,
          EditorState.tabSize.of(2),
          EditorView.lineWrapping,
          EditorView.contentAttributes.of({ 'aria-label': 'Tu código', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false' }),
          keymap.of([{ key: 'Mod-Enter', run: () => (correr.current(), true) }, indentWithTab, ...defaultKeymap, ...historyKeymap]),
          EditorView.updateListener.of((u) => u.docChanged && guardar(u.state.doc.toString())),
        ],
      }),
    })
    vista.current = v
    return () => v.destroy()
  }, [])

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
        <div ref={caja} />
        <div className="fila">
          <button type="button" className="btn btn-pri" onClick={() => correr.current()} disabled={corriendo}>
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
