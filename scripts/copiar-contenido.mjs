// Copia el contenido que preparan los profesores (carpeta compartida del proyecto) al repositorio.
// Uso: npm run contenido  (después, la prueba de contenidos comprueba que todo es correcto)
import { cpSync, existsSync } from 'node:fs'

const origen = process.env.CONTENIDO_ORIGEN ?? '/mnt/project-files'
if (!existsSync(origen)) {
  console.log(`No existe ${origen}: no hay nada que copiar.`)
  process.exit(0)
}
cpSync(`${origen}/contenido`, 'contenido', { recursive: true, filter: (f) => !f.includes('/fuente') })
cpSync(`${origen}/misiones`, 'misiones', { recursive: true })
console.log('Contenido copiado.')
