import { useEffect, useState } from 'react'
import { sincronizarAhora, useEstadoNube, useProgreso } from '../progreso/almacen'
import { activarAvisos, avisosActivados, avisosPosibles, cerrarSesion, crearCuenta, desactivarAvisos, entrar, nube } from '../progreso/nube'
import { Icono } from '../ui/basicos'

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const MINIMO = 12 // recomendación de Diseño; Supabase exige al menos 6

const TEXTO_ESTADO = {
  'sin-configurar': 'Tu progreso se guarda solo en este dispositivo.',
  'sin-sesion': 'Tu progreso se guarda solo en este dispositivo. Entra con tu email y tu contraseña para tenerlo también en el Mac y en la torre.',
  sincronizando: 'Sincronizando…',
  'al-dia': 'Tu progreso está guardado en la nube y al día en todos tus dispositivos.',
  error: 'No se ha podido sincronizar. Se reintentará solo cuando haya conexión.',
}

export function Cuenta({ volver }: { volver: () => void }) {
  const p = useProgreso()
  const estado = useEstadoNube()
  const [email, setEmail] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [alta, setAlta] = useState(false) // primera vez: crear la cuenta
  const [ver, setVer] = useState(false)
  const [enviando, setEnviando] = useState(false)
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

  if (nube && !usuario) {
    const listo = EMAIL.test(email.trim()) && contrasena.length >= (alta ? MINIMO : 1)
    return (
      <div className="app">
        <header className="top">
          <button type="button" className="icono" aria-label="Volver" onClick={volver}>
            <Icono nombre="atras" tam={24} />
          </button>
        </header>
        <main className="cuerpo" style={{ justifyContent: 'center', gap: 22 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h1 className="h1 grande">{alta ? 'Crea tu cuenta' : 'Entra en tu taller'}</h1>
            <p className="txt" style={{ color: 'var(--suave)' }}>
              {alta ? 'Una sola vez. Después el iPhone te la recuerda.' : 'El iPhone rellena la contraseña desde el llavero.'}
            </p>
          </div>
          <form
            id="entrar"
            style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
            onSubmit={async (e) => {
              e.preventDefault()
              if (!listo || enviando) return
              setAviso('')
              setEnviando(true)
              try {
                if (alta) await crearCuenta(email.trim(), contrasena)
                else await entrar(email.trim(), contrasena)
              } catch (err) {
                setAviso((err as Error).message)
              } finally {
                setEnviando(false)
              }
            }}
          >
            <div className="campo">
              <label htmlFor="email">Email</label>
              <input id="email" className="entrada" type="email" inputMode="email" autoComplete="username" autoCapitalize="none" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="campo">
              <label htmlFor="clave">Contraseña</label>
              <div className="con-ojo">
                <input
                  id="clave"
                  className="entrada"
                  type={ver ? 'text' : 'password'}
                  autoComplete={alta ? 'new-password' : 'current-password'}
                  minLength={alta ? MINIMO : undefined}
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
                <button type="button" className="icono ojo" aria-label={ver ? 'Ocultar la contraseña' : 'Mostrar la contraseña'} aria-pressed={ver} onClick={() => setVer(!ver)}>
                  <Icono nombre="ojo" />
                </button>
              </div>
              {alta && <p className="peq">Mínimo {MINIMO} caracteres. Deja que el iPhone te proponga una y la guarde en el llavero.</p>}
            </div>
          </form>
          {aviso && (
            <p className="txt" role="alert" style={{ color: 'var(--mal)', fontSize: 16 }}>
              {aviso}
            </p>
          )}
          <p className="peq">Solo guardamos tu email y tus respuestas, en un servidor de la Unión Europea.</p>
        </main>
        <footer className="pie">
          <button type="submit" form="entrar" className="btn btn-pri" disabled={!listo || enviando}>
            {enviando ? 'Un momento…' : alta ? 'Crear mi cuenta' : 'Entrar'}
          </button>
          <button
            type="button"
            className="btn btn-texto"
            onClick={() => {
              setAlta(!alta)
              setContrasena('')
              setAviso('')
            }}
          >
            {alta ? 'Ya tengo cuenta: entrar' : 'Es la primera vez: crear mi cuenta'}
          </button>
        </footer>
      </div>
    )
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
