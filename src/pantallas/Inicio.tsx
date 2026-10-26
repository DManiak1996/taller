import { useEffect, useState } from 'react'
import type { DiaListo } from '../contenido/cargar'
import { useProgreso } from '../progreso/almacen'
import { hechoHoy, hoy, racha, repasoDeHoy } from '../progreso/modelo'
import { Codigo, Icono, Texto } from '../ui/basicos'
import { SemanaRacha } from './Cierre'

const NOMBRE_DIA = new Intl.DateTimeFormat('es-ES', { weekday: 'long', timeZone: 'Europe/Madrid' })

function useConexion() {
  const [enLinea, setEnLinea] = useState(() => typeof navigator === 'undefined' || navigator.onLine)
  useEffect(() => {
    const cambiar = () => setEnLinea(navigator.onLine)
    window.addEventListener('online', cambiar)
    window.addEventListener('offline', cambiar)
    return () => {
      window.removeEventListener('online', cambiar)
      window.removeEventListener('offline', cambiar)
    }
  }, [])
  return enLinea
}

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
  const rota = dias === 0 && p.sesiones.length > 0 // racha rota, sin culpa: no se enseñan los días perdidos
  const hayRepaso = Boolean(repasoDeHoy(p, fechaHoy)) || p.intentos.length > 0
  const repasoPendiente = Boolean(repasoDeHoy(p, fechaHoy)) // con el reto hecho, solo se ofrece repasar si toca
  const enLinea = useConexion()
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

      {!enLinea && (
        <p className="sin-conexion" role="status">
          <Icono nombre="sinred" tam={20} />
          <span>
            <strong>Sin conexión.</strong> Puedes hacer el reto igual: lo guardo cuando vuelva internet.
          </span>
        </p>
      )}

      <main className="cuerpo" style={{ justifyContent: 'center', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {hecho ? (
            <>
              <span style={{ width: 64, height: 64, borderRadius: 32, background: 'var(--ok)', color: 'var(--fondo)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icono nombre="bien" tam={34} grosor={3} />
              </span>
              <h1 className="h1 grande">Reto de hoy, hecho</h1>
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

        {rota ? (
          <section aria-label="Tu racha" className="tarjeta" style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <span className="punto hoy" style={{ width: 40, height: 40, borderRadius: 20, flex: 'none' }} />
            <div>
              <p style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>Retomas hoy</p>
              <p className="peq">Un reto y la racha vuelve a empezar.</p>
            </div>
          </section>
        ) : (
          <section aria-label="Tu racha" className="tarjeta">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <p style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>{dias === 0 ? 'Empieza tu racha' : dias === 1 ? '1 día seguido' : `${dias} días seguidos`}</p>
              <p className="peq">{hecho ? 'Hoy, hecho' : 'Hoy te toca'}</p>
            </div>
            <SemanaRacha fechaHoy={fechaHoy} />
          </section>
        )}
      </main>

      <footer className="pie">
        {!hecho && (dia || hayRepaso) && (
          <button type="button" className="btn btn-pri" onClick={empezar}>
            {dia ? 'Empezar el reto de hoy' : 'Hacer un repaso'}
            <Icono nombre="flecha" />
          </button>
        )}
        {hecho && repasoPendiente && (
          <button type="button" className="btn btn-sec" onClick={empezar}>
            Repasar un poco más
          </button>
        )}
      </footer>
    </div>
  )
}
