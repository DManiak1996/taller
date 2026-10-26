# Chuleta de la semana 1: tus primeras líneas

## Escribir en pantalla

```ts
console.log("Hola");
console.log("Plazo:", 72);
```

- `console.log(...)` escribe una línea. Con comas, junta varias cosas separadas por un espacio: `Plazo: 72`.
- El programa se ejecuta **de arriba abajo, línea a línea**.

## Texto entre comillas

- Un texto va entre comillas: `"Hola"` o `'Hola'`. Sin comillas, el ordenador busca una caja con ese nombre y da error.
- Si un mensaje de error dice *is not defined*, casi siempre falta una comilla o la caja no existe.

## Cajas: const y let

```ts
const plazo = 72;
let estado = "abierta";
estado = "cerrada";
```

| | `const` | `let` |
| --- | --- | --- |
| ¿Se puede cambiar el valor? | No | Sí |
| Cuándo usarla | Por defecto | Solo si el valor va a cambiar |

- Una caja hay que crearla **antes** de usarla.
- Cambiar una `const` da error: *Assignment to constant variable*.

## Para revisar código de una IA

- ¿Cada caja se crea antes de usarse?
- ¿Usa `let` solo donde el valor cambia?
- ¿Los textos llevan comillas?

## En tu Mac

```
node hola.ts
```

`node fichero.ts` ejecuta un fichero. Lo que sale en la terminal es lo que escribe `console.log`, no tu código.
