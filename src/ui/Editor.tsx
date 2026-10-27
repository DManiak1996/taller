// El editor de código del taller (CodeMirror 6): números de línea y colores, sin autocompletar, para
// que el código lo escriba él. Lo usan la Zona libre y los retos «escribir». Solo se descarga al abrirlos.

import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import { bracketMatching, HighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language'
import { EditorState, StateEffect, StateField } from '@codemirror/state'
import { Decoration, EditorView, WidgetType, drawSelection, highlightActiveLine, keymap, lineNumbers } from '@codemirror/view'
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
  // Mientras se ve el informe de un fallo, la línea del cursor no se resalta: se leía como «el error está aquí».
  '&.cm-con-informe .cm-activeLine': { backgroundColor: 'transparent' },
  '&.cm-con-informe .cm-matchingBracket': { backgroundColor: 'transparent', outline: 'none' },
  '.cm-linea-fallo, &.cm-con-informe .cm-linea-fallo': { backgroundColor: 'var(--mal-t)', boxShadow: 'inset 3px 0 0 var(--mal)' },
  '.cm-aviso-fallo': { color: 'var(--mal)', fontFamily: 'var(--f-texto)', fontSize: '13px', fontWeight: '800', marginLeft: '10px', whiteSpace: 'nowrap' },
  '.cm-aviso-fallo svg': { display: 'inline', verticalAlign: '-2px', marginRight: '4px' },
})

/** El informe de «Comprobar»: si hay uno a la vista y qué línea imprimió la primera diferencia. */
export interface Informe {
  linea?: number
}

const fijarInforme = StateEffect.define<Informe | null>()

class Aviso extends WidgetType {
  toDOM() {
    const s = document.createElement('span')
    s.className = 'cm-aviso-fallo'
    s.innerHTML =
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3L2 20h20L12 3zM12 10v4M12 17h.01"/></svg>primera diferencia'
    return s
  }
  eq() {
    return true
  }
}

// Al escribir, la marca desaparece: ya no corresponde al código que hay.
const informe = StateField.define<Informe | null>({
  create: () => null,
  update: (v, tr) => {
    for (const e of tr.effects) if (e.is(fijarInforme)) return e.value
    return tr.docChanged ? null : v
  },
  provide: (f) => [
    EditorView.editorAttributes.from(f, (v): Record<string, string> => (v ? { class: 'cm-con-informe' } : {})),
    EditorView.decorations.compute([f], (s) => {
      const n = s.field(f)?.linea
      if (!n || n > s.doc.lines) return Decoration.none
      const l = s.doc.line(n)
      return Decoration.set([Decoration.line({ class: 'cm-linea-fallo' }).range(l.from), Decoration.widget({ widget: new Aviso(), side: 1 }).range(l.to)])
    }),
  ],
})

export const esMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform)

/** inicial solo se lee al montar; para empezar con otro código, cambia la `key` del componente.
 *  Cada `informe` nuevo (otro objeto) vuelve a marcar el código, aunque sea la misma línea. */
export function Editor({
  inicial,
  alCambiar,
  alEjecutar,
  etiqueta = 'Tu código',
  informe: inf = null,
}: {
  inicial: string
  alCambiar: (codigo: string) => void
  alEjecutar: () => void
  etiqueta?: string
  informe?: Informe | null
}) {
  const caja = useRef<HTMLDivElement>(null)
  const vista = useRef<EditorView | null>(null)
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
          informe,
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
    vista.current = v
    return () => v.destroy()
  }, [])

  useEffect(() => {
    vista.current?.dispatch({ effects: fijarInforme.of(inf) })
  }, [inf])

  return <div ref={caja} />
}
