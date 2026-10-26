import { useState } from 'react'
import { Cuenta } from './pantallas/Cuenta'
import { Inicio } from './pantallas/Inicio'
import { Mapa } from './pantallas/Mapa'
import { Misiones } from './pantallas/Misiones'
import { Sesion, diaDeHoy } from './pantallas/Sesion'
import { tienda } from './progreso/almacen'
import { hechoHoy, hoy } from './progreso/modelo'

type Vista = 'inicio' | 'sesion' | 'mapa' | 'cuenta' | 'misiones'

export default function App() {
  const [vista, setVista] = useState<Vista>('inicio')
  const [sesion, setSesion] = useState(0) // cambia en cada sesión para empezarla de cero
  const inicio = () => setVista('inicio')

  switch (vista) {
    case 'sesion': {
      const p = tienda.obtener()
      const yaHecho = hechoHoy(p, hoy())
      return <Sesion key={sesion} dia={yaHecho ? null : diaDeHoy(p)} alSalir={inicio} alVerMapa={() => setVista('mapa')} />
    }
    case 'mapa':
      return <Mapa volver={inicio} />
    case 'cuenta':
      return <Cuenta volver={inicio} />
    case 'misiones':
      return <Misiones volver={inicio} />
    default:
      return (
        <Inicio
          dia={diaDeHoy(tienda.obtener())}
          empezar={() => {
            setSesion(sesion + 1)
            setVista('sesion')
          }}
          irA={setVista}
        />
      )
  }
}
