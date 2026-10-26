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

export function Misiones({ volver }: { volver: () => void }) {
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
        {misiones.map((m) => (
          <section key={m.id} className="tarjeta md">
            <p className="kicker">
              Semana {m.semana} · {m.id}
            </p>
            <p className="txt" style={{ fontWeight: 800, fontSize: 20 }}>
              {m.titulo}
            </p>
            {m.cuerpo.split(/\n\s*\n/).map((p, i) => (
              <Parrafo key={i} texto={p.replace(/\n/g, ' ')} />
            ))}
            {m.comando && (
              <div className="consola">
                <p className="consola-tit">Para empezar</p>
                <div className="terminal-orden">{m.comando}</div>
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  )
}
