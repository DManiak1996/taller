// Ejecuta código en el navegador, aislado de la web del taller:
// - un iframe con sandbox="allow-scripts" (origen opaco: no ve tus datos ni tu sesión),
// - con una política CSP que prohíbe cualquier conexión de red,
// - y dentro, un Worker para que un bucle infinito no congele la pantalla.
// Si el programa tarda más de `tiempoMax`, se quita el iframe y todo lo que corre dentro muere.

import { preparar, type Opciones } from './transformar'
import type { Resultado } from './tipos'

const CSP = "default-src 'none'; script-src 'unsafe-inline' blob:; worker-src blob:"

// Lo que corre dentro del iframe. Recibe el programa y lo ejecuta en un Worker;
// si el navegador no deja crear el Worker, lo ejecuta en el propio iframe.
const PUENTE = `
addEventListener('message', function (e) {
  var programa = e.data;
  var avisar = function (r) { parent.postMessage({ taller: 'resultado', resultado: r }, '*'); };
  try {
    var url = URL.createObjectURL(new Blob(['var __enviar = function (r) { postMessage(r); };\\n' + programa], { type: 'text/javascript' }));
    var w = new Worker(url);
    w.onmessage = function (m) { avisar(m.data); };
    w.onerror = function (err) { err.preventDefault(); avisar({ salida: [], pasos: [], pasosCortados: false, error: { nombre: 'Error', mensaje: String(err.message), explicacion: 'El programa ha fallado.' } }); };
  } catch (_) {
    window.__enviar = avisar;
    var s = document.createElement('script');
    s.textContent = programa;
    document.body.appendChild(s);
  }
});
parent.postMessage({ taller: 'listo' }, '*');
`

const SRCDOC = `<!doctype html><html><head><meta http-equiv="Content-Security-Policy" content="${CSP}"></head><body><script>${PUENTE}</script></body></html>`

function fallo(nombre: string, explicacion: string): Resultado {
  return { salida: [], pasos: [], pasosCortados: false, error: { nombre, mensaje: nombre, explicacion } }
}

export function ejecutar(codigo: string, opciones: Opciones & { tiempoMax?: number } = {}): Promise<Resultado> {
  const p = preparar(codigo, opciones)
  if (!p.ok) return Promise.resolve({ salida: [], pasos: [], pasosCortados: false, error: p.error })

  return new Promise((resolver) => {
    const iframe = document.createElement('iframe')
    iframe.setAttribute('sandbox', 'allow-scripts')
    iframe.setAttribute('aria-hidden', 'true')
    iframe.style.display = 'none'
    iframe.srcdoc = SRCDOC

    let reloj: number | undefined
    const acabar = (r: Resultado) => {
      window.clearTimeout(reloj)
      window.removeEventListener('message', alRecibir)
      iframe.remove()
      resolver(r)
    }
    const alRecibir = (e: MessageEvent) => {
      if (e.source !== iframe.contentWindow || !e.data || typeof e.data !== 'object') return
      if (e.data.taller === 'listo') {
        iframe.contentWindow?.postMessage(p.programa, '*')
        reloj = window.setTimeout(
          () => acabar(fallo('TiempoAgotado', 'El programa tarda demasiado y se ha parado.')),
          opciones.tiempoMax ?? 3000,
        )
      } else if (e.data.taller === 'resultado') {
        acabar(e.data.resultado as Resultado)
      }
    }
    window.addEventListener('message', alRecibir)
    document.body.appendChild(iframe)
  })
}
