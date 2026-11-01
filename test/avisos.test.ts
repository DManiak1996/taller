// El script de los avisos (scripts/avisos.mjs) contra un Supabase y un GitHub de mentira.
import { spawn } from 'node:child_process'
import { createServer, type Server } from 'node:http'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

interface Llamada {
  metodo: string
  ruta: string
  cuerpo: any
}
let servidor: Server
let url = ''
let llamadas: Llamada[] = []
let ficheros: Record<string, string> = {}
let hechoHoy = false

beforeAll(async () => {
  servidor = createServer((req, res) => {
    let datos = ''
    req.on('data', (c) => (datos += c))
    req.on('end', () => {
      const cuerpo = datos ? JSON.parse(datos) : null
      const ruta = req.url!
      llamadas.push({ metodo: req.method!, ruta, cuerpo })
      const json = (codigo: number, v: unknown) => res.writeHead(codigo, { 'Content-Type': 'application/json' }).end(JSON.stringify(v))
      if (ruta.endsWith('/rpc/datos_push')) return json(200, { publica: 'p', privada: 'q', suscripciones: [] })
      if (ruta.endsWith('/rpc/resumen_taller')) return json(200, { hoy: cuerpo.hasta, hecho_hoy: hechoHoy, racha: 3 })
      if (ruta.endsWith('/rpc/avisar_una_vez')) return json(200, true)
      const fichero = ruta.match(/\/contents\/(.+)$/)?.[1]
      if (fichero && req.method === 'GET') return fichero in ficheros ? json(200, { sha: ficheros[fichero] }) : json(404, {})
      if (fichero && req.method === 'PUT') return (ficheros[fichero] = 'nuevo'), json(201, {})
      json(500, {})
    })
  })
  await new Promise<void>((r) => servidor.listen(0, '127.0.0.1', r))
  const dir = servidor.address()
  url = typeof dir === 'object' && dir ? `http://127.0.0.1:${dir.port}` : ''
})
afterAll(() => servidor.close())

function avisos(ahora: string, ...args: string[]): Promise<{ codigo: number; salida: string }> {
  llamadas = []
  return new Promise((resolve) => {
    const p = spawn(process.execPath, ['scripts/avisos.mjs', ...args], {
      env: { PATH: process.env.PATH, SUPABASE_URL: url, GITHUB_API: url, AVISOS_AHORA: ahora, TALLER_CLAVE: 'k', MISIONES_TOKEN: 't' },
    })
    let salida = ''
    p.stdout.on('data', (d) => (salida += d))
    p.stderr.on('data', (d) => (salida += d))
    p.on('close', (codigo) => resolve({ codigo: codigo ?? 1, salida: salida.trim() }))
  })
}

const subido = () => {
  const put = llamadas.find((l) => l.metodo === 'PUT')
  return put && { ruta: put.ruta, ...JSON.parse(Buffer.from(put.cuerpo.content, 'base64').toString()), sha: put.cuerpo.sha }
}

describe('resumen del domingo', () => {
  it('si llega el lunes, sube la semana que acabó el domingo', async () => {
    ficheros = {}
    const r = await avisos('2026-11-02T08:00:00Z', 'resumen')
    expect(r).toEqual({ codigo: 0, salida: 'ok' })
    expect(llamadas.find((l) => l.ruta.endsWith('resumen_taller'))?.cuerpo).toEqual({ clave: 'k', hasta: '2026-11-01' })
    expect(subido()).toMatchObject({ ruta: '/repos/DManiak1996/misiones/contents/progreso/2026-S44.json', semana: '2026-S44', semana_del_reto: 1, hasta: '2026-11-01' })
  })

  it('el domingo antes de las 19:00 aún toca la semana anterior, y si ya está no la repite', async () => {
    ficheros = { 'progreso/2026-S43.json': 'abc' }
    const r = await avisos('2026-11-01T17:00:00Z', 'resumen') // 18:00 en Madrid
    expect(r).toEqual({ codigo: 0, salida: 'ok' })
    expect(subido()).toBeUndefined()
  })

  it('el domingo a las 19:00 sube la semana de hoy', async () => {
    ficheros = {}
    await avisos('2026-11-01T18:05:00Z', 'resumen')
    expect(subido()).toMatchObject({ semana: '2026-S44', hasta: '2026-11-01' })
  })

  it('una semana pedida a mano se rehace aunque ya exista', async () => {
    ficheros = { 'progreso/2026-S44.json': 'abc' }
    const r = await avisos('2026-11-04T10:00:00Z', 'resumen', '2026-S44')
    expect(r.codigo).toBe(0)
    expect(subido()).toMatchObject({ semana: '2026-S44', hasta: '2026-11-01', sha: 'abc' })
  })

  it('rechaza una semana mal escrita, inexistente o sin terminar', async () => {
    expect(await avisos('2026-11-04T10:00:00Z', 'resumen', '44')).toMatchObject({ codigo: 1, salida: expect.stringContaining('2026-S44') })
    expect(await avisos('2026-11-04T10:00:00Z', 'resumen', '2026-S50')).toMatchObject({ codigo: 1, salida: expect.stringContaining('aún no ha terminado') })
    expect(await avisos('2026-11-04T10:00:00Z', 'resumen', '2025-S53')).toMatchObject({ codigo: 1, salida: expect.stringContaining('no existe') })
  })
})

describe('aviso de las 20:00', () => {
  it('avisa entre las 20:00 y las 23:00 de Madrid, y solo imprime «ok»', async () => {
    hechoHoy = true
    expect((await avisos('2026-11-02T21:30:00Z', 'recordatorio')).salida).toBe('ok') // 22:30 en Madrid
    expect(llamadas.some((l) => l.ruta.endsWith('resumen_taller'))).toBe(true)
    expect((await avisos('2026-11-02T22:10:00Z', 'recordatorio')).salida).toBe('ok (fuera de hora)') // 23:10
    expect((await avisos('2026-11-02T18:30:00Z', 'recordatorio')).salida).toBe('ok (fuera de hora)') // 19:30
  })
})
