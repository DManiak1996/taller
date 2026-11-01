// Avisos programados del taller. Lo ejecuta GitHub Actions (.github/workflows/avisos.yml), que lanza a su
// hora Supabase (pg_cron, ver supabase/avisos.sql), porque los horarios de GitHub llegan con horas de retraso.
//   node scripts/avisos.mjs recordatorio        → a las 20:00, push al iPhone si hoy no hay reto hecho
//   node scripts/avisos.mjs resumen             → el domingo a las 19:00, sube el resumen de la semana a `misiones`
//   node scripts/avisos.mjs resumen 2026-S44    → el resumen de una semana ya pasada (se puede repetir)
//
// Este repositorio es público y sus registros de Actions también: por eso el script NUNCA imprime
// datos (ni si hiciste el reto, ni tu racha). Solo «ok» o en qué paso ha fallado.

// Las tres variables de debajo solo se cambian en las pruebas (test/avisos.test.ts).
const URL_SUPABASE = process.env.SUPABASE_URL ?? 'https://lproxjosykyenztwdarz.supabase.co'
const API_GITHUB = process.env.GITHUB_API ?? 'https://api.github.com'
const ahora = () => (process.env.AVISOS_AHORA ? new Date(process.env.AVISOS_AHORA) : new Date())
const CLAVE_PUBLICA = 'sb_publishable_to70VgEby5HhpGEFveSFrw_KEL4OJ4l'
const { TALLER_CLAVE, MISIONES_TOKEN } = process.env
const [modo, semanaPedida] = process.argv.slice(2)

let paso = 'inicio'
const ok = (mensaje = 'ok') => {
  console.log(mensaje)
  process.exit(0)
}

async function rpc(funcion, args) {
  const r = await fetch(`${URL_SUPABASE}/rest/v1/rpc/${funcion}`, {
    method: 'POST',
    headers: { apikey: CLAVE_PUBLICA, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  })
  if (!r.ok) throw new Error(`Supabase respondió ${r.status} en ${funcion}`)
  const texto = await r.text()
  return texto ? JSON.parse(texto) : null
}

/** Hora y fecha de Madrid, sea verano o invierno. */
function madrid(momento = ahora()) {
  const partes = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23', weekday: 'short' })
      .formatToParts(momento)
      .map((p) => [p.type, p.value]),
  )
  return { fecha: `${partes.year}-${partes.month}-${partes.day}`, hora: Number(partes.hour), diaSemana: partes.weekday }
}

/** Semana ISO: "2026-S44". */
function semanaIso(fecha) {
  const d = new Date(fecha + 'T12:00:00Z')
  const jueves = new Date(d)
  jueves.setUTCDate(d.getUTCDate() + 3 - ((d.getUTCDay() + 6) % 7))
  const enero4 = new Date(Date.UTC(jueves.getUTCFullYear(), 0, 4))
  const n = 1 + Math.round(((jueves - enero4) / 86_400_000 - 3 + ((enero4.getUTCDay() + 6) % 7)) / 7)
  return `${jueves.getUTCFullYear()}-S${String(n).padStart(2, '0')}`
}

const masDias = (fecha, n) => new Date(Date.parse(fecha + 'T12:00:00Z') + n * 86_400_000).toISOString().slice(0, 10)

/** El domingo de una semana ISO ("2026-S44" → "2026-11-01"). */
function domingoDe(semana) {
  const m = /^(\d{4})-S(\d{2})$/.exec(semana)
  if (!m) throw new Error('la semana se escribe así: 2026-S44')
  const enero4 = new Date(Date.UTC(Number(m[1]), 0, 4))
  const lunes1 = masDias(enero4.toISOString().slice(0, 10), -((enero4.getUTCDay() + 6) % 7))
  const domingo = masDias(lunes1, (Number(m[2]) - 1) * 7 + 6)
  if (semanaIso(domingo) !== semana) throw new Error(`no existe la semana ${semana}`)
  return domingo
}

/** El último domingo cuyo resumen ya toca: hoy si es domingo y son las 19:00, si no el anterior. */
function ultimoDomingo(fecha, hora) {
  const dia = new Date(fecha + 'T12:00:00Z').getUTCDay() // 0 = domingo
  if (dia === 0) return hora >= 19 ? fecha : masDias(fecha, -7)
  return masDias(fecha, -dia)
}

// El reto empezó el lunes 26 de octubre de 2026: esa semana es la 1 (coincide con la ISO 2026-S44).
const PRIMER_DIA = '2026-10-26'
const semanaDelReto = (fecha) => Math.floor((Date.parse(fecha) - Date.parse(PRIMER_DIA)) / (7 * 86_400_000)) + 1

/** Las claves de push se crean la primera vez que corre el aviso y ya no cambian. */
async function clavesPush() {
  paso = 'claves push'
  let push = await rpc('datos_push', { clave: TALLER_CLAVE })
  if (!push.publica) {
    const { default: webpush } = await import('web-push')
    const nuevas = webpush.generateVAPIDKeys()
    await rpc('guardar_vapid', { clave: TALLER_CLAVE, publica: nuevas.publicKey, privada: nuevas.privateKey })
    push = await rpc('datos_push', { clave: TALLER_CLAVE })
  }
  return push
}

async function recordatorio() {
  const { fecha, hora } = madrid()
  await clavesPush() // también fuera de hora, para que la web pueda activar los avisos cuanto antes
  // Pasadas las 23:00 ya no: un aviso tan tarde molesta más que ayuda.
  if (hora < 20 || hora >= 23) return ok('ok (fuera de hora)')
  paso = 'resumen'
  const resumen = await rpc('resumen_taller', { clave: TALLER_CLAVE })
  if (resumen.hecho_hoy) return ok()
  paso = 'una vez'
  if (!(await rpc('avisar_una_vez', { clave: TALLER_CLAVE, tipo: 'recordatorio', fecha }))) return ok()

  const push = await clavesPush()
  const { default: webpush } = await import('web-push')
  webpush.setVapidDetails('https://dmaniak1996.github.io/taller/', push.publica, push.privada)

  paso = 'enviar'
  const texto =
    resumen.racha > 0
      ? `Llevas ${resumen.racha} ${resumen.racha === 1 ? 'día' : 'días'} seguidos. Diez minutos y sigue.`
      : 'Tu reto de hoy te espera: unos diez minutos.'
  for (const s of push.suscripciones) {
    try {
      await webpush.sendNotification(s, JSON.stringify({ titulo: 'Taller', texto }), { TTL: 3 * 3600 })
    } catch (e) {
      if (e.statusCode === 404 || e.statusCode === 410) await rpc('borrar_suscripcion', { clave: TALLER_CLAVE, endpoint: s.endpoint })
      else throw new Error(`el servicio de push respondió ${e.statusCode ?? 'sin código'}`)
    }
  }
  ok()
}

async function resumenSemanal() {
  const { fecha, hora } = madrid()
  // Sin semana pedida, la última que ha terminado: si GitHub o Supabase fallan un domingo, el siguiente
  // intento (aunque sea el lunes) aún sube la semana que toca, y no la siguiente.
  const domingo = semanaPedida ? domingoDe(semanaPedida) : ultimoDomingo(fecha, hora)
  if (domingo > fecha) throw new Error(`la semana ${semanaPedida} aún no ha terminado`)
  const semana = semanaIso(domingo)

  paso = 'mirar misiones'
  const ruta = `progreso/${semana}.json`
  const api = `${API_GITHUB}/repos/DManiak1996/misiones/contents/${ruta}`
  const cabeceras = { Authorization: `Bearer ${MISIONES_TOKEN}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }
  const previo = await fetch(api, { headers: cabeceras })
  if (!previo.ok && previo.status !== 404) throw new Error(`GitHub respondió ${previo.status}`)
  // El fichero es la prueba de que ya está hecho; pedida a mano, se rehace.
  if (previo.ok && !semanaPedida) return ok()
  const sha = previo.ok ? (await previo.json()).sha : undefined

  paso = 'resumen'
  const resumen = await rpc('resumen_taller', { clave: TALLER_CLAVE, hasta: domingo })
  const contenido = JSON.stringify({ semana, semana_del_reto: semanaDelReto(domingo), hasta: domingo, generado: ahora().toISOString(), ...resumen }, null, 2) + '\n'

  paso = 'subir a misiones'
  const r = await fetch(api, {
    method: 'PUT',
    headers: cabeceras,
    body: JSON.stringify({ message: `Resumen de la semana ${semana}`, content: Buffer.from(contenido).toString('base64'), sha }),
  })
  if (!r.ok) throw new Error(`GitHub respondió ${r.status}`)
  ok()
}

try {
  if (!TALLER_CLAVE) throw new Error('falta el secreto TALLER_CLAVE')
  if (modo === 'recordatorio') await recordatorio()
  else if (modo === 'resumen') {
    if (!MISIONES_TOKEN) throw new Error('falta el secreto MISIONES_TOKEN')
    await resumenSemanal()
  } else throw new Error('modo desconocido: usa «recordatorio» o «resumen»')
} catch (e) {
  // Solo el paso y un mensaje técnico, nunca datos de progreso
  console.error(`Fallo en el paso «${paso}»: ${e.message}`)
  process.exit(1)
}
