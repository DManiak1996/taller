import { Icono, Texto } from '../ui/basicos'

const ficheros = import.meta.glob<string>('../../misiones/*.md', { eager: true, query: '?raw', import: 'default' })

interface Mision {
  id: string
  titulo: string
  semana: number
  comando: string
  cuerpo: string
}

function leer(texto: string): Mision {
  const m = texto.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  const datos: Record<string, string> = {}
  for (const l of (m?.[1] ?? '').split('\n')) {
    const [k, ...v] = l.split(':')
    if (k && v.length) datos[k.trim()] = v.join(':').trim()
  }
  return { id: datos.id ?? '', titulo: datos.titulo ?? '', semana: Number(datos.semana ?? 0), comando: datos.comando ?? '', cuerpo: (m?.[2] ?? texto).trim() }
}

export const misiones = Object.values(ficheros)
  .map(leer)
  .sort((a, b) => a.id.localeCompare(b.id))

/** Párrafos con **negrita**, `código` y enlaces sueltos. */
function Parrafo({ texto }: { texto: string }) {
  const partes = texto.split(/(https?:\/\/\S+)/g)
  return (
    <p>
      {partes.map((p, i) =>
        /^https?:\/\//.test(p) ? (
          <a key={i} href={p} target="_blank" rel="noreferrer">
            {p.replace(/^https:\/\/github\.com\/DManiak1996\//, '')}
          </a>
        ) : (
          <Texto key={i}>{p}</Texto>
        ),
      )}
    </p>
  )
}

/** semana: la del próximo día que le toca (Infinity si ya lo ha hecho todo). Una misión de la semana N
 * se abre al terminar esa semana del reto, es decir, cuando el próximo día ya es de una semana posterior. */
export function Misiones({ volver, semana }: { volver: () => void; semana: number }) {
  return (
    <div className="app">
      <header className="top">
        <button type="button" className="icono" aria-label="Volver" onClick={volver}>
          <Icono nombre="atras" tam={24} />
        </button>
      </header>
      <main className="cuerpo">
        <h1 className="h1">Misiones</h1>
        <p className="peq">Se hacen en el Mac o en la torre, con VS Code y la terminal, en tu repositorio privado «misiones».</p>
        {misiones.map((m) => {
          const parrafos = m.cuerpo.split(/\n\s*\n/)
          if (semana <= m.semana)
            return (
              <section key={m.id} className="tarjeta md cerrada" aria-label={`${m.titulo}. Se abre al terminar la semana ${m.semana}.`}>
                <p className="kicker" aria-hidden="true">
                  {m.id}
                </p>
                <p className="txt" style={{ fontWeight: 800, fontSize: 20 }} aria-hidden="true">
                  {m.titulo}
                </p>
                <div aria-hidden="true">
                  <Parrafo texto={parrafos[0].replace(/\n/g, ' ')} />
                </div>
                <span className="cerrada-pie" aria-hidden="true">
                  <Icono nombre="candado" tam={16} />
                  <span className="pastilla suave">Se abre al terminar la semana {m.semana}</span>
                </span>
              </section>
            )
          return (
            <section key={m.id} className="tarjeta md">
              <p className="kicker">
                {m.id} · <span className="pastilla pri">Ya puedes hacerla</span>
              </p>
              <p className="txt" style={{ fontWeight: 800, fontSize: 20 }}>
                {m.titulo}
              </p>
              {parrafos.map((p, i) => (
                <Parrafo key={i} texto={p.replace(/\n/g, ' ')} />
              ))}
              {m.comando && (
                <div className="consola">
                  <p className="consola-tit">Para empezar</p>
                  <div className="terminal-orden">{m.comando}</div>
                </div>
              )}
            </section>
          )
        })}
      </main>
    </div>
  )
}
