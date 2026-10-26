import { describe, expect, it } from 'vitest'
import { leerGuia, leerLinea, leerMarkdown } from '../src/ui/markdown'

const ejemplo = `# La terminal, bien explicada

Una **orden** es lo que escribes después del \`$\`.

## Rutas

| Orden | Qué hace |
|---|---|
| \`pwd\` | Dice dónde estás |
| \`ls -la\` | Lista **todo** |

- Primera idea
  que sigue aquí
- Segunda idea

1. Abre la terminal
2. Escribe \`ls\`

> ⚠️ \`rm -rf\` borra sin preguntar.

\`\`\`bash
$ cd misiones
$ ls
\`\`\`

---

Mira también [la otra guía](otra.md) o https://developer.mozilla.org.
`

describe('Markdown de la biblioteca', () => {
  it('reconoce cada tipo de bloque', () => {
    const b = leerMarkdown(ejemplo)
    expect(b.map((x) => x.tipo)).toEqual(['titulo', 'parrafo', 'titulo', 'tabla', 'lista', 'lista', 'cita', 'codigo', 'separador', 'parrafo'])
    expect(b[3]).toMatchObject({ tipo: 'tabla', cabecera: ['Orden', 'Qué hace'], filas: [['`pwd`', 'Dice dónde estás'], ['`ls -la`', 'Lista **todo**']] })
    expect(b[4]).toMatchObject({ ordenada: false, items: ['Primera idea que sigue aquí', 'Segunda idea'] })
    expect(b[5]).toMatchObject({ ordenada: true, items: ['Abre la terminal', 'Escribe `ls`'] })
    expect(b[7]).toMatchObject({ lenguaje: 'bash', codigo: '$ cd misiones\n$ ls' })
  })

  it('saca el título y la descripción de la guía', () => {
    const g = leerGuia('terminal', ejemplo)
    expect(g.titulo).toBe('La terminal, bien explicada')
    expect(g.bloques[0].tipo).toBe('parrafo')
    expect(g.descripcion).toMatch(/^Una \*\*orden\*\*/)
    const conFm = leerGuia('x', '---\ntitulo: Chuleta semana 1\norden: 1\n---\nTexto')
    expect(conFm).toMatchObject({ titulo: 'Chuleta semana 1', orden: 1 })
  })

  it('entiende el formato dentro de la línea', () => {
    expect(leerLinea('Usa `ls` y **mira** el [manual](otra.md), *despacio*.').map((t) => t.tipo)).toEqual([
      'texto', 'codigo', 'texto', 'negrita', 'texto', 'enlace', 'texto', 'cursiva', 'texto',
    ])
    expect(leerLinea('una_variable_con_guiones y 2 * 3 * 4').map((t) => t.tipo)).toEqual(['texto'])
  })
})

describe('enlaces sueltos', () => {
  it('no se comen el punto final', () => {
    expect(leerLinea('Más en https://developer.mozilla.org.')).toEqual([
      { tipo: 'texto', texto: 'Más en ' },
      { tipo: 'enlace', texto: 'https://developer.mozilla.org', destino: 'https://developer.mozilla.org' },
      { tipo: 'texto', texto: '.' },
    ])
  })
})

describe('citas y avisos', () => {
  it('distingue un aviso de una cita normal y quita la marca', () => {
    expect(leerMarkdown('> ⚠️ `rm -rf` borra sin preguntar.')[0]).toEqual({ tipo: 'cita', texto: '`rm -rf` borra sin preguntar.', aviso: true })
    expect(leerMarkdown('> **Cuidado:** no lo pegues en el chat.')[0]).toEqual({ tipo: 'cita', texto: 'no lo pegues en el chat.', aviso: true })
    expect(leerMarkdown('> Programar es explicar algo con mucha precisión.')[0]).toMatchObject({ aviso: false })
  })
})

describe('avisos sin emoji', () => {
  it('«Cuidado:» marca aviso, pero «Cuidado con…» sin dos puntos es una cita normal', () => {
    expect(leerMarkdown('> Cuidado: borra para siempre.')[0]).toEqual({ tipo: 'cita', texto: 'borra para siempre.', aviso: true })
    expect(leerMarkdown('> Cuidado con los espacios.')[0]).toMatchObject({ aviso: false, texto: 'Cuidado con los espacios.' })
  })
})

describe('desplegables y temario', () => {
  it('lee <details> con su <summary> y el Markdown de dentro', () => {
    const md = 'Busca qué hace `slice`.\n\n<details>\n<summary>Ver la **respuesta**</summary>\n\nDevuelve un trozo.\n\n```ts\n"hola".slice(1)\n```\n</details>\n\nFin.'
    const b = leerMarkdown(md)
    expect(b.map((x) => x.tipo)).toEqual(['parrafo', 'desplegable', 'parrafo'])
    expect(b[1]).toMatchObject({ resumen: 'Ver la **respuesta**', bloques: [{ tipo: 'parrafo', texto: 'Devuelve un trozo.' }, { tipo: 'codigo', lenguaje: 'ts' }] })
  })
  it('sin <summary> pone un texto por defecto y admite desplegables dentro de otros', () => {
    const b = leerMarkdown('<details>\nA\n<details>\n<summary>Más</summary>\nB\n</details>\n</details>\nC')
    expect(b).toHaveLength(2)
    expect(b[0]).toMatchObject({ tipo: 'desplegable', resumen: 'Ver la respuesta' })
    expect((b[0] as { bloques: unknown[] }).bloques).toHaveLength(2)
    expect(b[1]).toEqual({ tipo: 'parrafo', texto: 'C' })
  })
  it('un párrafo se corta antes de un <details>', () => {
    expect(leerMarkdown('Texto\n<details>\nR\n</details>').map((x) => x.tipo)).toEqual(['parrafo', 'desplegable'])
  })
  it('la cabecera semana dice desde cuándo se abre', () => {
    expect(leerGuia('tema-03-if', '---\nsemana: 3\n---\n# Tema 3. Decisiones\n\nTexto').semana).toBe(3)
    expect(leerGuia('otra', '# Otra').semana).toBe(0)
  })
})
