// Avisos programados del taller. Lo ejecuta GitHub Actions (.github/workflows/avisos.yml).
//   node scripts/avisos.mjs recordatorio   → a las 20:00, push al iPhone si hoy no hay reto hecho
//   node scripts/avisos.mjs resumen        → el domingo a las 19:00, sube el resumen de la semana a `misiones`
//
// Este repositorio es público y sus registros de Actions también: por eso el script NUNCA imprime
// datos (ni si hiciste el reto, ni tu racha). Solo «ok» o en qué paso ha fallado.

import webpush from 'web-push'

const URL_SUPABASE = process.env.SUPABASE_URL ?? 'https://lproxjosykyenztwdarz.supabase.co' // otra URL solo para probar
const CLAVE_PUBLICA = 'sb_publishable_to70VgEby5HhpGEFveSFrw_KEL4OJ4l'
const { TALLER_CLAVE, MISIONES_TOKEN } = process.env
const modo = process.argv[2]

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
function madrid(ahora = new Date()) {
  const partes = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23', weekday: 'short' })
      .formatToParts(ahora)
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

async function recordatorio() {
  const { fecha, hora } = madrid()
  if (hora < 20 || hora >= 22) return ok('ok (fuera de hora)')
  paso = 'resumen'
  const resumen = await rpc('resumen_taller', { clave: TALLER_CLAVE })
  if (resumen.hecho_hoy) return ok()
  paso = 'una vez'
  if (!(await rpc('avisar_una_vez', { clave: TALLER_CLAVE, tipo: 'recordatorio', fecha }))) return ok()

  paso = 'claves push'
  let push = await rpc('datos_push', { clave: TALLER_CLAVE })
  if (!push.publica) {
    const nuevas = webpush.generateVAPIDKeys()
    await rpc('guardar_vapid', { clave: TALLER_CLAVE, publica: nuevas.publicKey, privada: nuevas.privateKey })
    push = await rpc('datos_push', { clave: TALLER_CLAVE })
  }
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
  if (hora < 19) return ok('ok (aún no es la hora)')
  paso = 'una vez'
  if (!(await rpc('avisar_una_vez', { clave: TALLER_CLAVE, tipo: 'resumen', fecha }))) return ok()
  paso = 'resumen'
  const resumen = await rpc('resumen_taller', { clave: TALLER_CLAVE })
  const semana = semanaIso(fecha)
  const contenido = JSON.stringify({ semana, generado: new Date().toISOString(), ...resumen }, null, 2) + '\n'

  paso = 'subir a misiones'
  const ruta = `progreso/${semana}.json`
  const api = `https://api.github.com/repos/DManiak1996/misiones/contents/${ruta}`
  const cabeceras = { Authorization: `Bearer ${MISIONES_TOKEN}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }
  const previo = await fetch(api, { headers: cabeceras })
  const sha = previo.ok ? (await previo.json()).sha : undefined
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
