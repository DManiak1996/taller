import type { DiaListo } from '../contenido/cargar'
import { useProgreso } from '../progreso/almacen'
import { hechoHoy, hoy, racha, repasoDeHoy, repasos } from '../progreso/modelo'
import { Codigo, Icono, Texto } from '../ui/basicos'
import { SemanaRacha } from './Cierre'

const NOMBRE_DIA = new Intl.DateTimeFormat('es-ES', { weekday: 'long', timeZone: 'Europe/Madrid' })

function codigoDe(dia: DiaListo): string | undefined {
  const p = dia.leccion.find((x) => x.tipo === 'pasoapaso' || x.tipo === 'codigo')
  const codigo = p && 'codigo' in p ? p.codigo : undefined
  return codigo?.split('\n').slice(0, 3).join('\n')
}

export function Inicio({ dia, empezar, irA }: { dia: DiaListo | null; empezar: () => void; irA: (v: 'mapa' | 'cuenta' | 'misiones') => void }) {
  const p = useProgreso()
  const fechaHoy = hoy()
  const hecho = hechoHoy(p, fechaHoy)
  const dias = racha(p, fechaHoy)
  const hayRepaso = Boolean(repasoDeHoy(p, fechaHoy)) || repasos(p).size > 0 || p.intentos.length > 0
  const codigo = dia && codigoDe(dia)
  const dia1 = NOMBRE_DIA.format(new Date())

  return (
    <div className="app">
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px 0 20px' }}>
        <p style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>
          Taller <span className="peq" style={{ fontWeight: 700, marginLeft: 6 }}>{dia1[0].toUpperCase() + dia1.slice(1)}</span>
        </p>
        <nav style={{ display: 'flex' }} aria-label="Secciones">
          <button type="button" className="icono" aria-label="Misiones en el ordenador" onClick={() => irA('misiones')}>
            <Icono nombre="mision" />
          </button>
          <button type="button" className="icono" aria-label="Mapa de conceptos" onClick={() => irA('mapa')}>
            <Icono nombre="mapa" />
          </button>
          <button type="button" className="icono" aria-label="Tu cuenta y tus datos" onClick={() => irA('cuenta')}>
            <Icono nombre="usuario" />
          </button>
        </nav>
      </header>

      <main className="cuerpo" style={{ justifyContent: 'center', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {hecho ? (
            <>
              <p className="kicker">Hoy</p>
              <h1 className="h1 grande">Hecho por hoy</h1>
              <p className="txt" style={{ color: 'var(--suave)' }}>
                {dia ? (
                  <>
                    Mañana: <strong>{dia.titulo}</strong>
                  </>
                ) : (
                  'Has terminado todo lo que hay por ahora.'
                )}
              </p>
            </>
          ) : dia ? (
            <>
              <p className="kicker">
                Hoy · unos 10 minutos · semana {dia.semana}, día {dia.dia}
              </p>
              <h1 className="h1 grande">{dia.titulo}</h1>
              <p className="txt" style={{ color: 'var(--suave)' }}>
                <Texto>{dia.objetivo}</Texto>
              </p>
            </>
          ) : (
            <>
              <p className="kicker">Hoy</p>
              <h1 className="h1 grande">Todo al día</h1>
              <p className="txt" style={{ color: 'var(--suave)' }}>
                El contenido nuevo está en camino. Mientras, un repaso corto mantiene la racha.
              </p>
            </>
          )}
        </div>

        {!hecho && codigo && <Codigo codigo={codigo} etiqueta="El código de hoy" />}

        <section aria-label="Tu racha" className="tarjeta">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>{dias === 0 ? 'Empieza tu racha' : dias === 1 ? '1 día seguido' : `${dias} días seguidos`}</p>
            <p className="peq">{hecho ? 'Hoy, hecho' : 'Hoy te toca'}</p>
          </div>
          <SemanaRacha fechaHoy={fechaHoy} />
        </section>
      </main>

      <footer className="pie">
        {!hecho && (dia || hayRepaso) && (
          <button type="button" className="btn btn-pri" onClick={empezar}>
            {dia ? 'Empezar el reto de hoy' : 'Hacer un repaso'}
            <Icono nombre="flecha" />
          </button>
        )}
        {hecho && hayRepaso && (
          <button type="button" className="btn btn-sec" onClick={empezar}>
            Repasar algo
          </button>
        )}
      </footer>
    </div>
  )
}
