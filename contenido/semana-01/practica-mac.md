# Tu primer programa en el Mac

**Lo que sabrás hacer al terminar:** ejecutar un fichero de TypeScript en tu Mac y leer lo que sale en la terminal.

**Cuándo:** después del día 7 del reto diario. **Cuánto:** unos 15 minutos.

Si algo no sale como aquí, no pasa nada: anota qué ves y lo miramos.

---

## 1. Comprueba tu Node

En la terminal:

```
node --version
```

- Si el primer número es **24 o mayor** (por ejemplo `v24.11.0`), sigue al paso 2.
- Si es más bajo (`v20.…`, `v22.…`) o sale `command not found: node`, ve a [nodejs.org](https://nodejs.org), descarga la versión **LTS**, instala el `.pkg`, **cierra y vuelve a abrir la terminal** y repite `node --version`.

## 2. Crea la carpeta y ábrela en VS Code

```
mkdir ~/practica
```

En VS Code (o Cursor): **File → Open Folder…** y elige `practica`. Después, en el menú de arriba, **Terminal → New Terminal**: se abre una terminal abajo, ya dentro de la carpeta. Así tienes en una sola ventana los ficheros (a la izquierda), el código (en el centro) y la terminal (abajo). A partir de aquí, todo se hace en esa terminal.

## 3. Escribe tu programa

Crea un fichero nuevo llamado `hola.ts` y escribe esto **a mano**, sin copiar y pegar:

```ts
const nombre = "Daniel";
console.log("Hola,", nombre);
```

Guarda con `Cmd + S`.

## 4. Ejecútalo

En la terminal de VS Code:

```
node hola.ts
```

Debería salir:

```
Hola, Daniel
```

Si además ves un aviso amarillo que menciona *ExperimentalWarning*, ignóralo: es Node avisando de que leer TypeScript directamente es una función reciente.

Si sale `Unknown file extension ".ts"`, tu Node es antiguo: instala la versión LTS como en el paso 1.

## 5. Rómpelo a propósito

Aprender a leer errores es la mitad del oficio. Haz cada cambio, guarda, ejecuta `node hola.ts` y lee el mensaje:

1. Quita las comillas de `"Daniel"`. ¿Qué error sale? (Pista: el día 2.)
2. Vuelve a ponerlas. Añade al final una línea `nombre = "Laura";`. ¿Qué pasa y por qué? (Pista: el día 5.)
3. Arréglalo cambiando **una sola palabra** en la línea 1 para que el cambio funcione, y añade otro `console.log` que escriba el nombre nuevo.

Cuando el paso 3 escriba `Hola, Daniel` y después `Laura`, has terminado la semana 1.
