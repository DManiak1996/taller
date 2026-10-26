import { describe, expect, it } from 'vitest'
import { hoy, racha, repasoDeHoy, repasos, siguienteDia, sumarDias, unir, type Intento, type Progreso } from '../src/progreso/modelo'

const sesion = (fecha: string, dia: string | null = null) => ({ id: fecha + dia, dia, fecha, momento: fecha + 'T19:00:00Z' })
let n = 0
const intento = (fecha: string, concepto: string, fallos: number, modo: Intento['modo'] = 'reto'): Intento => ({
  id: String(n++), reto: 'r', concepto, dia: null, modo, fallos, pistas: 0, solucion: false, fecha, momento: fecha + 'T19:00:0' + (n % 10) + 'Z',
})

describe('progreso', () => {
  it('usa la fecha de Madrid', () => {
    expect(hoy(new Date('2026-10-26T23:30:00Z'))).toBe('2026-10-27')
    expect(sumarDias('2026-10-31', 1)).toBe('2026-11-01')
  })

  it('cuenta la racha hasta hoy o hasta ayer', () => {
    const p: Progreso = { sesiones: [sesion('2026-10-24'), sesion('2026-10-25'), sesion('2026-10-26')], intentos: [] }
    expect(racha(p, '2026-10-26')).toBe(3)
    expect(racha(p, '2026-10-27')).toBe(3) // hoy aún no ha hecho el reto: la racha no se rompe hasta mañana
    expect(racha(p, '2026-10-28')).toBe(0)
  })

  it('los días van en orden y el de hoy es el primero sin hacer', () => {
    const dias = [{ id: 'a' }, { id: 'b' }]
    expect(siguienteDia({ sesiones: [sesion('2026-10-26', 'a')], intentos: [] }, dias)?.id).toBe('b')
  })

  it('lo que falla vuelve a los 1, 3 y 7 días y luego sale', () => {
    const p: Progreso = { sesiones: [], intentos: [intento('2026-10-26', 'let', 1)] }
    expect(repasoDeHoy(p, '2026-10-26')).toBeUndefined()
    expect(repasoDeHoy(p, '2026-10-27')?.concepto).toBe('let')
    p.intentos.push(intento('2026-10-27', 'let', 0, 'repaso'))
    expect(repasos(p).get('let')?.toca).toBe('2026-10-30')
    p.intentos.push(intento('2026-10-30', 'let', 0, 'repaso'))
    expect(repasos(p).get('let')?.toca).toBe('2026-11-06')
    p.intentos.push(intento('2026-11-06', 'let', 0, 'repaso'))
    expect(repasos(p).has('let')).toBe(false)
  })

  it('fallar en el repaso lo devuelve a mañana', () => {
    const p: Progreso = { sesiones: [], intentos: [intento('2026-10-26', 'let', 1), intento('2026-10-27', 'let', 2, 'repaso')] }
    expect(repasos(p).get('let')).toMatchObject({ nivel: 0, toca: '2026-10-28' })
  })

  it('une el progreso de dos dispositivos sin duplicar', () => {
    const a: Progreso = { sesiones: [sesion('2026-10-25')], intentos: [] }
    const b: Progreso = { sesiones: [sesion('2026-10-25'), sesion('2026-10-26')], intentos: [] }
    expect(unir(a, b).sesiones).toHaveLength(2)
  })
})

describe('dos días de contenido al día', () => {
  const s = (dia: string | null, fecha: string) => ({ id: `${dia}-${fecha}`, dia, fecha, momento: fecha + 'T10:00:00Z' })
  it('deja seguir tras el primero, no tras el segundo, y la racha cuenta días de calendario', async () => {
    const { puedeSeguir, diasDeContenido } = await import('../src/progreso/modelo')
    const f = '2026-10-26'
    const uno: Progreso = { sesiones: [s('s01-d01', f)], intentos: [] }
    const dos: Progreso = { sesiones: [s('s01-d01', f), s('s01-d02', f)], intentos: [] }
    expect(puedeSeguir({ sesiones: [], intentos: [] }, f)).toBe(false)
    expect(puedeSeguir(uno, f)).toBe(true)
    expect(puedeSeguir(dos, f)).toBe(false)
    expect(diasDeContenido({ sesiones: [s(null, f)], intentos: [] }, f)).toBe(0) // solo repaso no cuenta
    expect(racha(dos, f)).toBe(1)
  })
})
