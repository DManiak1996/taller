// Una sesión del reto diario: lección → 3 retos → repaso (si toca) → cierre.

import { useMemo, useState } from 'react'
import { dias, retos, type DiaListo, type Reto } from '../contenido/cargar'
import { tienda, useProgreso } from '../progreso/almacen'
import { diasEntre, hoy, repasoDeHoy, repasos, type Progreso } from '../progreso/modelo'
import { Cabecera } from '../ui/basicos'
import { Cierre } from './Cierre'
import { Leccion } from './Leccion'
import { RetoPantalla } from './Retos'

const DIAS_SEMANA = ['el lunes', 'el martes', 'el miércoles', 'el jueves', 'el viernes', 'el sábado', 'el domingo']

function cuandoFue(fecha: string, fechaHoy: string) {
  const n = diasEntre(fecha, fechaHoy)
  if (n <= 0) return 'hoy'
  if (n === 1) return 'ayer'
  if (n < 7) return DIAS_SEMANA[(new Date(fecha + 'T12:00:00Z').getUTCDay() + 6) % 7]
  return `hace ${n} días`
}

/** El reto para repasar un concepto: uno de reserva que no haya visto, o el que menos veces ha hecho. */
export function elegirRetoDeRepaso(p: Progreso, concepto: string, excluir: Set<string>): Reto | undefined {
  const candidatos = [...retos.values()].filter((x) => x.reto.concepto === concepto && !excluir.has(x.reto.id))
  const veces = (id: string) => p.intentos.filter((i) => i.reto === id).length
  candidatos.sort((a, b) => veces(a.reto.id) - veces(b.reto.id) || Number(b.deReserva) - Number(a.deReserva))
  return candidatos[0]?.reto
}

type Paso = { tipo: 'leccion' } | { tipo: 'reto'; reto: Reto; n: number } | { tipo: 'repaso'; reto: Reto; chip: string } | { tipo: 'cierre' }

export function Sesion({ dia, alSalir, alVerMapa, alParaNota }: { dia: DiaListo | null; alSalir: () => void; alVerMapa: () => void; alParaNota: () => void }) {
  const progreso = useProgreso()
  const fechaHoy = hoy()

  // Los pasos se calculan una sola vez al empezar, para que no cambien a mitad de sesión.
  const [pasos] = useState<Paso[]>(() => {
    const lista: Paso[] = []
    if (dia) {
      lista.push({ tipo: 'leccion' })
      dia.retos.forEach((reto, i) => lista.push({ tipo: 'reto', reto, n: i + 1 }))
    }
    const r = repasoDeHoy(progreso, fechaHoy) ?? (dia ? undefined : [...repasos(progreso).values()][0])
    const usados = new Set(dia?.retos.map((x) => x.id) ?? [])
    if (r) {
      const reto = elegirRetoDeRepaso(progreso, r.concepto, usados)
      if (reto) lista.push({ tipo: 'repaso', reto, chip: `Repaso · lo fallaste ${cuandoFue(r.desde, fechaHoy)}` })
    } else if (!dia) {
      // Sin nada pendiente: repasa un reto ya hecho al azar, para no quedarse sin práctica
      const hechos = [...new Set(progreso.intentos.map((i) => i.reto))].map((id) => retos.get(id)?.reto).filter((x): x is Reto => !!x)
      const reto = hechos[Math.floor(Math.random() * hechos.length)]
      if (reto) lista.push({ tipo: 'repaso', reto, chip: 'Repaso · para no oxidarte' })
    }
    lista.push({ tipo: 'cierre' })
    return lista
  })
  const [n, setN] = useState(0)
  const paso = pasos[n]
  const avanzar = () => setN(n + 1)
  const conceptosDeHoy = useMemo(() => [...new Set([...(dia?.conceptos ?? []), ...pasos.flatMap((p) => ('reto' in p ? [p.reto.concepto] : []))])], [dia, pasos])

  const guardar = (reto: Reto, modo: 'reto' | 'repaso') => (r: { fallos: number; pistas: number; solucion: boolean }) => {
    tienda.guardarIntento({ reto: reto.id, concepto: reto.concepto, dia: dia?.id ?? null, modo, ...r })
    if (pasos[n + 1]?.tipo === 'cierre') tienda.terminarSesion(dia?.id ?? null)
    avanzar()
  }

  const cabecera = paso.tipo !== 'cierre' && (
    <Cabecera total={pasos.length} actual={n} alSalir={alSalir} etiqueta={paso.tipo === 'leccion' ? 'Lección' : paso.tipo === 'repaso' ? 'Repaso' : 'Reto'} />
  )

  return (
    <div className="app">
      {cabecera}
      {paso.tipo === 'leccion' && dia && <Leccion titulo={dia.titulo} pildora={dia.pildora} pantallas={dia.leccion} alTerminar={avanzar} />}
      {paso.tipo === 'reto' && (
        <RetoPantalla key={paso.reto.id} reto={paso.reto} kicker={`Reto ${paso.n} de ${dia?.retos.length ?? 3}`} alTerminar={guardar(paso.reto, 'reto')} />
      )}
      {paso.tipo === 'repaso' && <RetoPantalla key={'r' + paso.reto.id} reto={paso.reto} chip={paso.chip} alTerminar={guardar(paso.reto, 'repaso')} textoTerminar="Terminar" />}
      {paso.tipo === 'cierre' && <Cierre dia={dia} conceptos={conceptosDeHoy} alSalir={alSalir} alVerMapa={alVerMapa} alParaNota={alParaNota} />}
    </div>
  )
}

export const diaDeHoy = (p: Progreso) => {
  const hechos = new Set(p.sesiones.map((s) => s.dia))
  return dias.find((d) => !hechos.has(d.id)) ?? null
}
