// Un lector de Markdown pequeño para las guías de la Biblioteca. Solo entiende lo que usan los
// profesores: títulos, párrafos, listas, tablas, citas, separadores, bloques de código y desplegables
// (<details> con su <summary>, para esconder la respuesta de «Búscalo tú»).
// Devuelve bloques (datos), no HTML: la página los pinta con React, sin innerHTML.

export type Bloque =
  | { tipo: 'titulo'; nivel: 1 | 2 | 3; texto: string }
  | { tipo: 'parrafo'; texto: string }
  | { tipo: 'lista'; ordenada: boolean; items: string[] }
  | { tipo: 'tabla'; cabecera: string[]; filas: string[][] }
  | { tipo: 'cita'; texto: string; aviso: boolean }
  | { tipo: 'codigo'; lenguaje: string; codigo: string }
  | { tipo: 'separador' }
  | { tipo: 'desplegable'; resumen: string; bloques: Bloque[] }

export interface Guia {
  id: string
  titulo: string
  descripcion: string
  orden: number
  /** Semana del reto a partir de la cual se puede abrir (cabecera `semana`); 0 si siempre. */
  semana: number
  bloques: Bloque[]
}

const celdas = (linea: string) =>
  linea
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim())

export function leerMarkdown(md: string): Bloque[] {
  const lineas = md.replace(/\r\n/g, '\n').split('\n')
  const bloques: Bloque[] = []
  let i = 0
  while (i < lineas.length) {
    const l = lineas[i]
    if (!l.trim()) {
      i++
      continue
    }
    const valla = l.match(/^\s*(```|~~~)\s*([\w-]*)/)
    if (valla) {
      const codigo: string[] = []
      i++
      while (i < lineas.length && !lineas[i].trim().startsWith(valla[1])) codigo.push(lineas[i++])
      i++ // la valla de cierre
      bloques.push({ tipo: 'codigo', lenguaje: valla[2].toLowerCase(), codigo: codigo.join('\n') })
      continue
    }
    if (/^\s*<details>/i.test(l)) {
      // Lo de dentro es Markdown normal; puede haber desplegables dentro de otros.
      const dentro = [l.replace(/^\s*<details>/i, '')]
      let nivel = 1
      i++
      while (i < lineas.length) {
        const linea = lineas[i++]
        nivel += (linea.match(/<details>/gi) ?? []).length
        if (/<\/details>/i.test(linea) && --nivel === 0) {
          dentro.push(linea.replace(/<\/details>.*$/i, ''))
          break
        }
        dentro.push(linea)
      }
      let cuerpo = dentro.join('\n')
      const sum = cuerpo.match(/^\s*<summary>([\s\S]*?)<\/summary>/i)
      if (sum) cuerpo = cuerpo.slice(sum[0].length)
      bloques.push({ tipo: 'desplegable', resumen: sum?.[1].trim() || 'Ver la respuesta', bloques: leerMarkdown(cuerpo) })
      continue
    }
    const titulo = l.match(/^(#{1,6})\s+(.*)$/)
    if (titulo) {
      bloques.push({ tipo: 'titulo', nivel: Math.min(titulo[1].length, 3) as 1 | 2 | 3, texto: titulo[2].trim() })
      i++
      continue
    }
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(l)) {
      bloques.push({ tipo: 'separador' })
      i++
      continue
    }
    if (l.trim().startsWith('|') && i + 1 < lineas.length && /^\s*\|?[\s:|-]+\|?\s*$/.test(lineas[i + 1]) && lineas[i + 1].includes('-')) {
      const cabecera = celdas(l)
      const filas: string[][] = []
      i += 2
      while (i < lineas.length && lineas[i].trim().startsWith('|')) filas.push(celdas(lineas[i++]))
      bloques.push({ tipo: 'tabla', cabecera, filas })
      continue
    }
    if (/^\s*>/.test(l)) {
      const texto: string[] = []
      while (i < lineas.length && /^\s*>/.test(lineas[i])) texto.push(lineas[i++].replace(/^\s*>\s?/, ''))
      // Una cita que empieza por ⚠️ o por «Cuidado:», «Atención:» o «Peligro:» es un aviso. La marca se
      // quita porque la página ya pone el icono y la palabra «Cuidado».
      const junto = texto.join(' ').trim()
      const marca = junto.match(/^(?:⚠️?\s*)?(?:\*\*(?:cuidado|atención|peligro)[:.]?\*\*[:.]?|(?:cuidado|atención|peligro)[:.])?\s*/i)![0]
      const aviso = marca.trim() !== ''
      bloques.push({ tipo: 'cita', texto: junto.slice(aviso ? marca.length : 0), aviso })
      continue
    }
    const item = /^\s*(?:[-*+]|(\d+)[.)])\s+/
    const primero = l.match(item)
    if (primero) {
      const ordenada = Boolean(primero[1])
      const items: string[] = []
      while (i < lineas.length && lineas[i].trim()) {
        const m = lineas[i].match(item)
        if (m && Boolean(m[1]) === ordenada) items.push(lineas[i].replace(item, ''))
        else if (m || !items.length) break
        else items[items.length - 1] += ' ' + lineas[i].trim() // continuación del punto anterior
        i++
      }
      bloques.push({ tipo: 'lista', ordenada, items })
      continue
    }
    const texto: string[] = []
    while (i < lineas.length && lineas[i].trim() && !/^(#{1,6}\s|\s*(```|~~~)|\s*>|\s*\||\s*(?:[-*+]|\d+[.)])\s|\s*<details>)/i.test(lineas[i])) texto.push(lineas[i++].trim())
    if (texto.length) bloques.push({ tipo: 'parrafo', texto: texto.join(' ') })
    else i++
  }
  return bloques
}

/** Una guía: frontmatter opcional (titulo, descripcion, orden, semana) y el cuerpo en Markdown. */
export function leerGuia(id: string, md: string): Guia {
  const fm = md.match(/^---\n([\s\S]*?)\n---\n?/)
  const datos: Record<string, string> = {}
  for (const l of (fm?.[1] ?? '').split('\n')) {
    const [k, ...v] = l.split(':')
    if (k && v.length) datos[k.trim()] = v.join(':').trim().replace(/^["']|["']$/g, '')
  }
  let bloques = leerMarkdown(fm ? md.slice(fm[0].length) : md)
  let titulo = datos.titulo ?? ''
  if (bloques[0]?.tipo === 'titulo' && bloques[0].nivel === 1) {
    titulo ||= bloques[0].texto
    bloques = bloques.slice(1) // el título ya va en la cabecera de la página
  }
  const descripcion = datos.descripcion ?? (bloques.find((b) => b.tipo === 'parrafo') as { texto: string } | undefined)?.texto ?? ''
  return { id, titulo: titulo || id, descripcion, orden: Number(datos.orden ?? 100), semana: Number(datos.semana ?? 0) || 0, bloques }
}

export type Trozo = { tipo: 'texto' | 'negrita' | 'cursiva' | 'codigo'; texto: string } | { tipo: 'enlace'; texto: string; destino: string }

/** Formato dentro de una línea: `código`, **negrita**, *cursiva* y [enlaces](destino). */
export function leerLinea(texto: string): Trozo[] {
  const trozos: Trozo[] = []
  const patron = /(`[^`]+`)|\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|(?<![\w*])[*_]([^*_\s][^*_]*?)[*_](?![\w*])|(https?:\/\/[^\s)]*[^\s).,;:!?»])/g
  let desde = 0
  for (const m of texto.matchAll(patron)) {
    if (m.index > desde) trozos.push({ tipo: 'texto', texto: texto.slice(desde, m.index) })
    if (m[1]) trozos.push({ tipo: 'codigo', texto: m[1].slice(1, -1) })
    else if (m[2]) trozos.push({ tipo: 'negrita', texto: m[2] })
    else if (m[3]) trozos.push({ tipo: 'enlace', texto: m[3], destino: m[4] })
    else if (m[5]) trozos.push({ tipo: 'cursiva', texto: m[5] })
    else if (m[6]) trozos.push({ tipo: 'enlace', texto: m[6], destino: m[6] })
    desde = m.index + m[0].length
  }
  if (desde < texto.length) trozos.push({ tipo: 'texto', texto: texto.slice(desde) })
  return trozos
}

/** En un tema, lo que va tras el `---` de «Búscalo tú» es la respuesta: se esconde en un desplegable. */
export function plegarRespuesta(bloques: Bloque[]): Bloque[] {
  const busca = bloques.findIndex((b) => b.tipo === 'titulo' && /^búscalo tú$/i.test(b.texto.trim()))
  if (busca < 0) return bloques
  const corte = bloques.findIndex((b, i) => i > busca && b.tipo === 'separador')
  if (corte < 0 || corte === bloques.length - 1) return bloques
  return [...bloques.slice(0, corte), { tipo: 'desplegable', resumen: 'Ver la respuesta', bloques: bloques.slice(corte + 1) }]
}
