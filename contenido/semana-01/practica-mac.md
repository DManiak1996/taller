# Tu primer programa en el Mac

**Lo que sabrás hacer al terminar:** ejecutar un fichero de TypeScript en tu Mac y leer lo que sale en la terminal.

**Cuándo:** después del día 7 del reto diario. **Cuánto:** unos 15 minutos.

Si algo no sale como aquí, no pasa nada: anota qué ves y lo miramos.

---

## 1. Abre la terminal

Pulsa `Cmd + Espacio`, escribe **Terminal** y pulsa Enter. Se abre una ventana con texto y un cursor parpadeando. Ahí se dan las órdenes escribiendo.

## 2. Comprueba si tienes Node

Escribe esto y pulsa Enter:

```
node --version
```

- Si sale algo como `v24.11.0` y el primer número es **24 o mayor**, ya lo tienes: sigue al paso 3.
- Si el número es más bajo (por ejemplo `v20.…` o `v22.…`), instala la versión nueva como se explica justo debajo.
- Si sale `command not found: node`, no lo tienes. Ve a [nodejs.org](https://nodejs.org), descarga la versión **LTS** (la recomendada), abre el fichero `.pkg` y sigue el instalador. Después **cierra la terminal, ábrela otra vez** y repite `node --version`.

## 3. Crea una carpeta para practicar

En la terminal, una orden cada vez:

```
mkdir practica
cd practica
pwd
```

- `mkdir practica` crea una carpeta llamada *practica*.
- `cd practica` entra en ella.
- `pwd` te dice dónde estás. Debería acabar en `/practica`.

## 4. Escribe tu programa

Abre VS Code (o Cursor, si es el que usas). Menú **File → Open Folder…** y elige la carpeta `practica`, que está en tu carpeta de usuario.

Crea un fichero nuevo llamado `hola.ts` y escribe esto **a mano**, sin copiar y pegar:

```ts
const nombre = "Daniel";
console.log("Hola,", nombre);
```

Guarda con `Cmd + S`.

## 5. Ejecútalo

Vuelve a la terminal (sigues dentro de `practica`) y escribe:

```
node hola.ts
```

Debería salir:

```
Hola, Daniel
```

Si además ves un aviso amarillo que menciona *ExperimentalWarning*, ignóralo: es Node avisando de que leer TypeScript directamente es una función reciente.

Si sale `Unknown file extension ".ts"`, tu Node es antiguo: instala la versión LTS como en el paso 2.

## 6. Rómpelo a propósito

Aprender a leer errores es la mitad del oficio. Haz cada cambio, guarda, ejecuta `node hola.ts` y lee el mensaje:

1. Quita las comillas de `"Daniel"`. ¿Qué error sale? (Pista: el día 2.)
2. Vuelve a ponerlas. Añade al final una línea `nombre = "Laura";`. ¿Qué pasa y por qué? (Pista: el día 5.)
3. Arréglalo cambiando **una sola palabra** en la línea 1 para que el cambio funcione, y añade otro `console.log` que escriba el nombre nuevo.

Cuando el paso 3 escriba `Hola, Daniel` y después `Laura`, has terminado la semana 1.

---

**Tres órdenes de terminal que ya conoces:** `pwd` (dónde estoy), `cd carpeta` (entrar en una carpeta), `node fichero.ts` (ejecutar un fichero). Una cuarta para curiosear: `ls` lista lo que hay en la carpeta en la que estás.
