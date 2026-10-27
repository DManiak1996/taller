---
semana: 1
orden: 9
---

# Tema 9. Proyectos de Node: package.json y npm

Un proyecto de Node es una carpeta con un fichero `package.json`, que describe el proyecto, y que se gestiona con **npm** (*Node Package Manager*, el gestor de paquetes de Node).

## node frente a npm

- `node fichero.ts` ejecuta **un** programa. `node -e '…'` ejecuta un trozo de código escrito en la propia orden.
- `npm` no ejecuta código por sí mismo: lee `package.json`, instala las herramientas que el proyecto necesita y lanza las órdenes que el proyecto tiene guardadas con nombre (los *scripts*).

## Sintaxis

`package.json` es un fichero JSON (texto con pares `"clave": valor` entre llaves). Versión simplificada del de las misiones:

```json
{
  "name": "misiones",
  "type": "module",
  "engines": { "node": ">=24" },
  "scripts": {
    "test": "vitest run"
  },
  "devDependencies": {
    "vitest": "^5.0.5"
  }
}
```

| Campo | Función |
| --- | --- |
| `name` | Nombre del proyecto |
| `type` | `"module"`: los ficheros usan la sintaxis moderna de módulos (`import`) |
| `engines` | Versión de Node que necesita el proyecto. `">=24"`: la 24 o posterior |
| `scripts` | Órdenes guardadas con un nombre corto |
| `devDependencies` | Herramientas que solo se usan al desarrollar (aquí, Vitest, que ejecuta los tests). `^5.0.5` admite cualquier 5.x a partir de la 5.0.5 |

## Scripts

`npm test` busca el script llamado `test` y ejecuta la orden que tiene guardada. En las misiones, `npm test` equivale a escribir `vitest run --reporter=verbose`.

- Lo que se escribe después se añade al final de la orden: `npm test 00` ejecuta `vitest run --reporter=verbose 00`, y Vitest solo ejecuta los ficheros de test cuya ruta contiene `00`.
- Para pasar una opción que empieza por `-`, se separa con `--`: `npm test -- --watch`. Sin `--`, npm la interpretaría como una opción suya.
- `test` y `start` tienen atajo. Cualquier otro script se ejecuta con `npm run nombre`.

## Instalar: npm install y node_modules

- `npm install` lee `package.json`, descarga las dependencias y las guarda en la carpeta `node_modules`.
- `package-lock.json` anota la versión exacta instalada de cada dependencia, para que todo el que instale obtenga lo mismo. `npm ci` instala exactamente lo que dice ese fichero.
- `node_modules` puede ocupar cientos de megas y se regenera con `npm install`: no se sube a git (se excluye en `.gitignore`).
- Las herramientas instaladas se ejecutan desde los scripts sin indicar dónde están: npm busca en `node_modules/.bin`.

## Leer el informe de Vitest

Tras `npm test`, Vitest muestra una línea por test y un resumen final.

| Elemento | Significado |
| --- | --- |
| `✓` | Test superado |
| `×` | Test fallido |
| `00-hola/hola.test.ts > se presenta` | Fichero de test y nombre del test, separados por `>` |
| `→ expected … to deeply equal …` | Resumen del fallo: lo que salió y lo que se esperaba |
| `- Expected` y `+ Received` | Diferencia línea a línea: `-` es lo esperado; `+`, lo recibido |
| `❯ 00-hola/hola.test.ts:6:18` | Fichero, línea y columna de la comprobación que ha fallado |

El resumen final tiene dos líneas:

```
Test Files  1 failed (2)
      Tests  5 failed (6)
```

(Abreviado: entre lo fallido y el total aparecen también los que pasan.) `Test Files` cuenta **ficheros** de test; `Tests`, **tests individuales**, y un fichero puede contener varios. Un fichero cuenta como fallido si falla al menos uno de sus tests. El número entre paréntesis es el total.

## Errores típicos

| Mensaje o síntoma | Causa |
| --- | --- |
| `vitest: command not found` (o `vitest: not found`) | Falta `npm install` |
| `Missing script: "nombre"` | No existe ese script en `package.json`. Revisar el nombre |
| `ENOENT … package.json` | La terminal no está en la carpeta del proyecto. Comprobar con `pwd` |
| `No test files found` | El filtro no coincide con la ruta de ningún fichero de test (por ejemplo, `npm test 02` si aún no hay misión 02) |
| Aviso `EBADENGINE` al instalar | La versión de Node no cumple `engines` |

## Revisar código de una IA

- Si una IA añade una dependencia, comprobar en `package.json` que sea necesaria y su licencia. Cada dependencia es código ajeno que se ejecuta en el proyecto.
- Comprobar que va en `devDependencies` si solo se usa para desarrollar (tests, tipos).
- Desconfiar de una IA que «arregla» un test cambiando lo que el test espera en vez del código: el test es el contrato.
- Leer siempre el resumen: `Tests 6 passed (6)` es la única prueba de que todo pasa.

## Documentación oficial

- [package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json) (npm, en inglés).
- [npm run](https://docs.npmjs.com/cli/v11/commands/npm-run) y [npm test](https://docs.npmjs.com/cli/v11/commands/npm-test) (npm, en inglés).
- [Getting Started](https://vitest.dev/guide/) y [Test Filtering](https://vitest.dev/guide/filtering) (Vitest, en inglés).

## Búscalo tú

Según la documentación de npm, ¿con qué orden se ejecuta un script de `package.json` que no se llama `test` ni `start`? Por ejemplo, el script `test:ia` de las misiones.

---

**Respuesta:** `npm run nombre`. Por ejemplo, `npm run test:ia`. (`npm run-script` es la forma larga de la misma orden.)
