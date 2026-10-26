// Ejecuta un programa del sandbox en Node (para las pruebas automáticas del contenido).
// Usa exactamente la misma preparación que el navegador.
import vm from 'node:vm'
import { preparar, type Opciones } from '../src/sandbox/transformar'
import type { Resultado } from '../src/sandbox/tipos'

export function ejecutarEnNode(codigo: string, opciones: Opciones & { tiempoMax?: number } = {}): Resultado {
  const p = preparar(codigo, opciones)
  if (!p.ok) return { salida: [], pasos: [], pasosCortados: false, error: p.error }
  let resultado: Resultado | undefined
  try {
    vm.runInNewContext(p.programa, { __enviar: (r: Resultado) => (resultado = r) }, { timeout: opciones.tiempoMax ?? 2000 })
  } catch (e) {
    return {
      salida: [],
      pasos: [],
      pasosCortados: false,
      error: { nombre: 'TiempoAgotado', mensaje: String(e), explicacion: 'El programa tarda demasiado y se ha parado.' },
    }
  }
  return resultado!
}
