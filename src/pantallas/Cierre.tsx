import { nombreConcepto, type DiaListo } from '../contenido/cargar'
import { useProgreso } from '../progreso/almacen'
import { hoy, racha, semanaActual, vacio } from '../progreso/modelo'
import { Icono } from '../ui/basicos'
import { niveles } from './niveles'

export function SemanaRacha({ fechaHoy }: { fechaHoy: string }) {
  const p = useProgreso()
  return (
    <div className="semana">
      {semanaActual(p, fechaHoy).map((d) => (
        <div key={d.fecha} className="dia" style={d.esHoy ? { color: 'var(--pri)' } : undefined}>
          <span className={`punto ${d.hecho ? 'hecho' : d.esHoy ? 'hoy' : d.futuro ? 'futuro' : 'no'}`}>{d.hecho && <Icono nombre="bien" tam={16} grosor={3} />}</span>
          {d.letra}
        </div>
      ))}
    </div>
  )
}

export function Cierre({ dia, conceptos, alSalir, alVerMapa }: { dia: DiaListo | null; conceptos: string[]; alSalir: () => void; alVerMapa: () => void }) {
  const p = useProgreso()
  const fechaHoy = hoy()
  const dias = racha(p, fechaHoy)
  // Lo que ha conseguido HOY: niveles ahora frente a niveles sin los intentos de hoy
  const antes = { ...vacio(), intentos: p.intentos.filter((i) => i.fecha !== fechaHoy) }
  return (
    <>
      <header className="top">
        <button type="button" className="icono" aria-label="Cerrar" onClick={alSalir}>
          <Icono nombre="cerrar" tam={24} grosor={2.25} />
        </button>
      </header>
      <main className="cuerpo">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 8 }}>
          <span style={{ width: 56, height: 56, flex: 'none', borderRadius: 28, background: 'var(--ok)', color: 'var(--fondo)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icono nombre="bien" tam={30} grosor={3} />
          </span>
          <h1 className="h1">{dia ? 'Reto de hoy, hecho' : 'Repaso hecho'}</h1>
        </div>

        {dia && (
          <section className="tarjeta" aria-label="Lo que has aprendido">
            <p className="kicker">Ahora sabes</p>
            <p className="txt">{dia.objetivo.replace(/^Hoy aprendes a /, '').replace(/^./, (c) => c.toUpperCase())}</p>
          </section>
        )}

        <section className="tarjeta" aria-label="Tu racha">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <p style={{ margin: 0, fontSize: 40, lineHeight: 1, fontWeight: 800, color: 'var(--pri)' }}>{dias}</p>
            <p className="txt" style={{ fontWeight: 700 }}>
              {dias === 1 ? 'día seguido' : 'días seguidos'}
            </p>
          </div>
          <SemanaRacha fechaHoy={fechaHoy} />
        </section>

        <section className="tarjeta" aria-label="Avance en el mapa">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p className="kicker">Avance en el mapa</p>
            <button type="button" className="enlace" onClick={alVerMapa}>
              Ver mapa
            </button>
          </div>
          {conceptos.map((c) => {
            const ahora = niveles(p, c)
            const previo = niveles(antes, c)
            const nivel = (clave: 'leer' | 'completar' | 'escribir', nombre: string) => (
              <div
                className="tarjeta"
                style={{ padding: '8px 10px', gap: 2, fontSize: 15, fontWeight: 800, background: ahora[clave] ? 'var(--pri-t)' : 'transparent', color: ahora[clave] ? 'var(--tinta)' : 'var(--suave)' }}
              >
                {nombre}
                {ahora[clave] && !previo[clave] && <span style={{ fontSize: 12, color: 'var(--pri)' }}>NUEVO HOY</span>}
              </div>
            )
            return (
              <div key={c} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p className="txt" style={{ fontWeight: 800 }}>
                  {nombreConcepto(c)}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
                  {nivel('leer', 'Leer')}
                  {nivel('completar', 'Completar')}
                  {nivel('escribir', 'Escribir')}
                </div>
              </div>
            )
          })}
        </section>
      </main>
      <footer className="pie">
        <button type="button" className="btn btn-pri" onClick={alSalir}>
          Hasta mañana
        </button>
      </footer>
    </>
  )
}
