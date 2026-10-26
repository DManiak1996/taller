import { Suspense, lazy, useEffect, useState } from 'react'
import { pantallaActual } from './actualizar'
import { Cuenta } from './pantallas/Cuenta'
import { Inicio } from './pantallas/Inicio'
import { Mapa } from './pantallas/Mapa'
import { Misiones } from './pantallas/Misiones'
import { Sesion, diaDeHoy } from './pantallas/Sesion'
import { tienda } from './progreso/almacen'
import { hechoHoy, hoy, puedeSeguir } from './progreso/modelo'

// El editor (CodeMirror) solo se descarga al entrar en la zona libre.
const ZonaLibre = lazy(() => import('./pantallas/ZonaLibre').then((m) => ({ default: m.ZonaLibre })))

const Biblioteca = lazy(() => import('./pantallas/Biblioteca').then((m) => ({ default: m.Biblioteca })))

type Vista = 'inicio' | 'sesion' | 'mapa' | 'cuenta' | 'misiones' | 'libre' | 'biblioteca'

export default function App() {
  const [vista, setVista] = useState<Vista>('inicio')
  const [sesion, setSesion] = useState(0) // cambia en cada sesión para empezarla de cero
  const [seguir, setSeguir] = useState(false) // true: el segundo día de contenido de hoy
  const inicio = () => setVista('inicio')
  useEffect(() => {
    pantallaActual(vista === 'inicio')
  }, [vista])

  switch (vista) {
    case 'sesion': {
      const p = tienda.obtener()
      const fecha = hoy()
      const conDia = !hechoHoy(p, fecha) || (seguir && puedeSeguir(p, fecha))
      return <Sesion key={sesion} dia={conDia ? diaDeHoy(p) : null} alSalir={inicio} alVerMapa={() => setVista('mapa')} />
    }
    case 'mapa':
      return <Mapa volver={inicio} dia={diaDeHoy(tienda.obtener())} />
    case 'cuenta':
      return <Cuenta volver={inicio} />
    case 'misiones':
      return <Misiones volver={inicio} />
    case 'biblioteca':
      return (
        <Suspense fallback={<p className="peq" style={{ padding: 20 }}>Abriendo el temario…</p>}>
          <Biblioteca volver={inicio} semana={diaDeHoy(tienda.obtener())?.semana ?? Infinity} />
        </Suspense>
      )
    case 'libre':
      return (
        <Suspense fallback={<p className="peq" style={{ padding: 20 }}>Abriendo el editor…</p>}>
          <ZonaLibre volver={inicio} />
        </Suspense>
      )
    default:
      return (
        <Inicio
          dia={diaDeHoy(tienda.obtener())}
          empezar={(siguienteDia = false) => {
            setSeguir(siguienteDia)
            setSesion(sesion + 1)
            setVista('sesion')
          }}
          irA={setVista}
        />
      )
  }
}
