import { describe, expect, it } from 'vitest'
import { explicarErrorNube } from '../src/progreso/nube'

describe('errores de Supabase en castellano', () => {
  it('reconoce los fallos de configuración y dice qué hacer', () => {
    expect(explicarErrorNube({ code: 'PGRST205', message: "Could not find the table 'public.sesiones' in the schema cache" })).toMatch(/esquema\.sql/)
    expect(explicarErrorNube({ code: '42501', message: 'permission denied for table sesiones' })).toMatch(/permiso.*esquema\.sql/)
    expect(explicarErrorNube({ code: 'PGRST202', message: 'Could not find the function public.vapid_publica without parameters in the schema cache' })).toMatch(/avisos\.sql/)
    expect(explicarErrorNube({ code: 'PGRST301', message: 'JWT expired' })).toMatch(/caducado/)
    expect(explicarErrorNube(new TypeError('Load failed'))).toMatch(/conectar/)
  })

  it('nunca enseña el mensaje original en inglés', () => {
    const texto = explicarErrorNube({ code: 'XX000', message: 'Something unexpected happened' })
    expect(texto).not.toMatch(/Something/)
    expect(texto).toMatch(/XX000/)
  })
})
