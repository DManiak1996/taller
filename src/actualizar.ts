// Actualizaciones de la app instalada. En el iPhone la app no se recarga al volver a ella (solo
// se reanuda), así que sin esto podía quedarse con una versión vieja guardada en caché.
// - Cada vez que la app vuelve a primer plano, se pregunta si hay versión nueva.
// - La versión nueva se instala sola y toma el control; la pantalla se recarga para usarla
//   solo cuando estás en Inicio, para no sacarte de un reto a medias.

let pendiente = false
let enInicio = true

function recargarSiToca() {
  if (pendiente && enInicio) location.reload()
}

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  const habiaVersion = Boolean(navigator.serviceWorker.controller) // la primera instalación no recarga
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!habiaVersion) return
    pendiente = true
    recargarSiToca()
  })
  navigator.serviceWorker
    .register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL })
    .then((registro) => {
      const comprobar = () => void registro.update().catch(() => undefined)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') comprobar()
      })
      setInterval(comprobar, 60 * 60 * 1000)
    })
    .catch((e) => console.warn('No se pudo registrar el service worker', e))
}

/** La app avisa de en qué pantalla está; si hay una versión nueva esperando y es Inicio, se recarga. */
export function pantallaActual(esInicio: boolean) {
  enInicio = esInicio
  recargarSiToca()
}
