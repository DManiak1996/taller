import { useEffect, useState } from 'react'
import { sincronizarAhora, useEstadoNube, useProgreso } from '../progreso/almacen'
import { activarAvisos, avisosActivados, avisosPosibles, cerrarSesion, comprobarCodigo, desactivarAvisos, nube, pedirCodigo } from '../progreso/nube'
import { Icono } from '../ui/basicos'

const TEXTO_ESTADO = {
  'sin-configurar': 'Tu progreso se guarda solo en este dispositivo.',
  'sin-sesion': 'Tu progreso se guarda solo en este dispositivo. Entra con tu email para tenerlo también en el Mac y en la torre.',
  sincronizando: 'Sincronizando…',
  'al-dia': 'Tu progreso está guardado en la nube y al día en todos tus dispositivos.',
  error: 'No se ha podido sincronizar. Se reintentará solo cuando haya conexión.',
}

export function Cuenta({ volver }: { volver: () => void }) {
  const p = useProgreso()
  const estado = useEstadoNube()
  const [email, setEmail] = useState('')
  const [codigo, setCodigo] = useState('')
  const [fase, setFase] = useState<'email' | 'codigo'>('email')
  const [aviso, setAviso] = useState('')
  const [usuario, setUsuario] = useState<string | null>(null)
  const [avisos, setAvisos] = useState(false)

  useEffect(() => {
    void avisosActivados().then(setAvisos)
  }, [])

  useEffect(() => {
    nube?.auth.getUser().then(({ data }) => setUsuario(data.user?.email ?? null))
  }, [estado])

  const descargar = () => {
    const blob = new Blob([JSON.stringify(p, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `taller-progreso-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div className="app">
      <header className="top">
        <button type="button" className="icono" aria-label="Volver" onClick={volver}>
          <Icono nombre="atras" tam={24} />
        </button>
      </header>
      <main className="cuerpo">
        <h1 className="h1">Tus datos</h1>
        <p className="txt">{TEXTO_ESTADO[estado]}</p>

        {nube && usuario && (
          <section className="tarjeta">
            <p className="kicker">Has entrado como</p>
            <p className="txt">{usuario}</p>
            <div className="fila">
              <button type="button" className="btn btn-sec" onClick={() => void sincronizarAhora()}>
                Sincronizar ahora
              </button>
              <button type="button" className="btn btn-sec" onClick={() => void cerrarSesion()}>
                Salir
              </button>
            </div>
          </section>
        )}

        {nube && usuario && (
          <section className="tarjeta">
            <p className="kicker">Aviso de las 20:00</p>
            <p className="txt" style={{ fontSize: 16 }}>
              {avisos
                ? 'Activado en este dispositivo. Solo llega si ese día aún no has hecho el reto.'
                : avisosPosibles()
                  ? 'Un aviso a las 20:00, solo los días en que aún no has hecho el reto.'
                  : 'Para recibir avisos en el iPhone, abre el taller desde su icono en la pantalla de inicio (Safari › Compartir › Añadir a pantalla de inicio).'}
            </p>
            {avisosPosibles() && (
              <button
                type="button"
                className="btn btn-sec"
                onClick={async () => {
                  setAviso('')
                  try {
                    if (avisos) await desactivarAvisos()
                    else await activarAvisos()
                    setAvisos(await avisosActivados())
                  } catch (err) {
                    setAviso((err as Error).message)
                  }
                }}
              >
                {avisos ? 'Quitar el aviso de este dispositivo' : 'Activar el aviso en este dispositivo'}
              </button>
            )}
          </section>
        )}

        {nube && !usuario && fase === 'email' && (
          <form
            className="tarjeta"
            onSubmit={async (e) => {
              e.preventDefault()
              setAviso('')
              try {
                await pedirCodigo(email.trim())
                setFase('codigo')
              } catch (err) {
                setAviso('No se ha podido enviar el email: ' + (err as Error).message)
              }
            }}
          >
            <label className="campo">
              <span className="kicker">Tu email</span>
              <input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <button type="submit" className="btn btn-pri">
              Enviarme un código
            </button>
          </form>
        )}

        {nube && !usuario && fase === 'codigo' && (
          <form
            className="tarjeta"
            onSubmit={async (e) => {
              e.preventDefault()
              setAviso('')
              try {
                await comprobarCodigo(email.trim(), codigo)
              } catch (err) {
                setAviso('El código no vale: ' + (err as Error).message)
              }
            }}
          >
            <p className="txt">Te hemos enviado un código de 6 cifras a {email}. Escríbelo aquí.</p>
            <label className="campo">
              <span className="kicker">Código</span>
              <input inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6,8}" required value={codigo} onChange={(e) => setCodigo(e.target.value)} />
            </label>
            <button type="submit" className="btn btn-pri">
              Entrar
            </button>
            <button type="button" className="enlace" onClick={() => setFase('email')}>
              Cambiar el email
            </button>
          </form>
        )}
        {aviso && <p className="txt" style={{ color: 'var(--mal)' }}>{aviso}</p>}

        <section className="tarjeta">
          <p className="kicker">Lo que se guarda</p>
          <p className="txt" style={{ fontSize: 16 }}>
            Solo tu email (si entras) y, por cada reto, cuántas veces fallaste, cuántas pistas pediste y si viste la solución. Nada más. Llevas {p.sesiones.length}{' '}
            {p.sesiones.length === 1 ? 'sesión' : 'sesiones'} y {p.intentos.length} retos.
          </p>
          <button type="button" className="btn btn-sec" onClick={descargar}>
            Descargar mis datos (JSON)
          </button>
        </section>
      </main>
    </div>
  )
}
