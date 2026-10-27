// El editor de código del taller (CodeMirror 6): números de línea y colores, sin autocompletar, para
// que el código lo escriba él. Lo usan la Zona libre y los retos «escribir». Solo se descarga al abrirlos.

import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import { bracketMatching, HighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language'
import { EditorState } from '@codemirror/state'
import { EditorView, drawSelection, highlightActiveLine, keymap, lineNumbers } from '@codemirror/view'
import { tags as t } from '@lezer/highlight'
import { useEffect, useRef } from 'react'

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

export const esMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform)

/** inicial solo se lee al montar; para empezar con otro código, cambia la `key` del componente. */
export function Editor({ inicial, alCambiar, alEjecutar, etiqueta = 'Tu código' }: { inicial: string; alCambiar: (codigo: string) => void; alEjecutar: () => void; etiqueta?: string }) {
  const caja = useRef<HTMLDivElement>(null)
  // Las funciones cambian en cada render; el editor siempre llama a las últimas.
  const llamar = useRef({ alCambiar, alEjecutar })
  llamar.current = { alCambiar, alEjecutar }

  useEffect(() => {
    if (!caja.current) return
    const v = new EditorView({
      parent: caja.current,
      state: EditorState.create({
        doc: inicial,
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
          EditorView.contentAttributes.of({ 'aria-label': etiqueta, autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false' }),
          keymap.of([{ key: 'Mod-Enter', run: () => (llamar.current.alEjecutar(), true) }, indentWithTab, ...defaultKeymap, ...historyKeymap]),
          EditorView.updateListener.of((u) => u.docChanged && llamar.current.alCambiar(u.state.doc.toString())),
        ],
      }),
    })
    return () => v.destroy()
  }, [])

  return <div ref={caja} />
}
