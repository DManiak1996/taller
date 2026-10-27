// test y expect para ejecutar en Node los retos de la semana 8 (Git y tests), igual que en la web.
// Se antepone al código de un reto que use test( o expect(. No importa nada, así que vale tanto para
// un script como para un módulo. Debe imprimir exactamente lo mismo que el sandbox de la web
// (src/sandbox/nucleo.ts); test/pruebas.test.ts lo comprueba.

function __inspeccionar(v, profundidad, vistos) {
  if (typeof v === 'string') return v.includes("'") && !v.includes('"') ? '"' + v + '"' : "'" + v.replace(/'/g, "\\'") + "'"
  if (typeof v === 'number') return Object.is(v, -0) ? '-0' : String(v)
  if (typeof v === 'bigint') return v + 'n'
  if (typeof v === 'function') return v.name ? '[Function: ' + v.name + ']' : '[Function (anonymous)]'
  if (typeof v === 'symbol') return v.toString()
  if (v === null || typeof v !== 'object') return String(v)
  if (vistos.includes(v)) return '[Circular *1]'
  if (v instanceof Error) return v.name + ': ' + v.message
  if (v instanceof Date) return v.toISOString()
  const dentro = vistos.concat([v])
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]'
    if (profundidad > 2) return '[Array]'
    return '[ ' + v.map((x) => __inspeccionar(x, profundidad + 1, dentro)).join(', ') + ' ]'
  }
  if (v instanceof Map) {
    const items = [...v].map(([k, x]) => __inspeccionar(k, profundidad + 1, dentro) + ' => ' + __inspeccionar(x, profundidad + 1, dentro))
    return 'Map(' + v.size + ') ' + (items.length ? '{ ' + items.join(', ') + ' }' : '{}')
  }
  if (v instanceof Set) {
    const items = [...v].map((x) => __inspeccionar(x, profundidad + 1, dentro))
    return 'Set(' + v.size + ') ' + (items.length ? '{ ' + items.join(', ') + ' }' : '{}')
  }
  const claves = Object.keys(v)
  if (claves.length === 0) return '{}'
  if (profundidad > 2) return '[Object]'
  const partes = claves.map((k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : "'" + k + "'") + ': ' + __inspeccionar(v[k], profundidad + 1, dentro))
  return '{ ' + partes.join(', ') + ' }'
}

function __igual(a, b) {
  if (Object.is(a, b)) return true
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false
  if (Array.isArray(a) !== Array.isArray(b)) return false
  const ka = Object.keys(a)
  const kb = Object.keys(b)
  return ka.length === kb.length && ka.every((k) => k in b && __igual(a[k], b[k]))
}

function expect(recibido) {
  const comprobar = (ok, esperado) => {
    if (ok) return
    const e = new Error('expect')
    e.name = 'FalloExpect'
    e.esperado = esperado
    e.recibido = recibido
    throw e
  }
  return {
    toBe: (esperado) => comprobar(Object.is(recibido, esperado), esperado),
    toEqual: (esperado) => comprobar(__igual(recibido, esperado), esperado),
  }
}

function test(nombre, fn) {
  try {
    fn()
    console.log('✓ ' + nombre)
  } catch (e) {
    console.log('× ' + nombre)
    if (e instanceof Error && e.name === 'FalloExpect') {
      console.log('  Expected: ' + __inspeccionar(e.esperado, 0, []))
      console.log('  Received: ' + __inspeccionar(e.recibido, 0, []))
    } else console.log('  ' + (e instanceof Error ? e.name + ': ' + e.message : String(e)))
  }
}
