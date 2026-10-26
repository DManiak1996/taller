// Se carga dentro del service worker de la web: muestra los avisos push y abre el taller al tocarlos.
self.addEventListener('push', (evento) => {
  let datos = { titulo: 'Taller', texto: 'Tu reto de hoy te espera.' }
  try {
    datos = { ...datos, ...evento.data.json() }
  } catch {
    // aviso sin datos: se usa el texto por defecto
  }
  evento.waitUntil(
    self.registration.showNotification(datos.titulo, {
      body: datos.texto,
      icon: 'icono-192.png',
      badge: 'icono-192.png',
      tag: 'taller-aviso',
      data: { url: self.registration.scope },
    }),
  )
})

self.addEventListener('notificationclick', (evento) => {
  evento.notification.close()
  evento.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((ventanas) => {
      for (const v of ventanas) if ('focus' in v) return v.focus()
      return self.clients.openWindow(evento.notification.data.url)
    }),
  )
})
