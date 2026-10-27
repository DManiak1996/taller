---
semana: 1
orden: 1
---

# Tema 1. Programas y salida por consola

Un programa es una lista de instrucciones que el ordenador ejecuta **en orden, de arriba abajo, una línea tras otra**.

## Sintaxis

```ts
console.log(valor);
console.log(valor1, valor2);
```

- `console.log` escribe en la consola (la terminal o el panel de salida) y añade un salto de línea al final.
- Admite uno o varios valores separados por comas. Los escribe en el orden indicado, separados por un espacio.
- Cada instrucción termina en `;`.
- Un texto (en inglés, *string*) va entre comillas dobles `"…"` o simples `'…'`. Los números no llevan comillas.

## Ejemplos

```ts
console.log("Solicitud recibida");
console.log("Plazo:", 72);
console.log(10);
```

Salida:

```
Solicitud recibida
Plazo: 72
10
```

Cada `console.log` produce una línea. El orden de la salida es el orden de las instrucciones.

## Errores típicos

| Error | Causa |
| --- | --- |
| `ReferenceError: Hola is not defined` | Faltan las comillas: sin ellas, `Hola` se interpreta como el nombre de una variable que no existe |
| `SyntaxError: Invalid or unexpected token` | Falta la comilla de cierre de un texto |
| `SyntaxError: missing ) after argument list` | Falta el paréntesis de cierre |
| `TypeError: console is not a function` | Se ha escrito `console("…")`: la instrucción completa es `console.log` |

Un error de ejecución (`ReferenceError`, `TypeError`) detiene el programa en esa línea: las anteriores ya se han ejecutado y las posteriores no. Un error de sintaxis (`SyntaxError`) impide ejecutar el programa entero, porque el código no se puede leer.

Los mensajes de esta tabla son los de JavaScript en Node y en Chrome. Al ejecutar un fichero `.ts` con Node, los errores de sintaxis pueden aparecer con otro texto, marcados como `ERR_INVALID_TYPESCRIPT_SYNTAX`.

## Revisar código de una IA

- Leer el programa de arriba abajo y anotar qué escribirá cada línea **antes** de ejecutarlo. Si la predicción no coincide con la salida real, hay algo que no se ha entendido.
- Comprobar que los textos llevan comillas y los números no.
- Ante un error, leer el mensaje completo: indica el tipo de error y la línea.

## Cómo leer una página de MDN

La documentación oficial no se lee entera: se consulta. En una página de referencia de MDN, este orden basta casi siempre:

1. **El primer párrafo:** qué es y para qué sirve, en una o dos frases.
2. **Sintaxis:** la forma general de escribirlo. Lo que va entre corchetes `[ ]` es opcional.
3. **Ejemplos:** código real con su resultado. Suele ser la parte más útil.

El resto (Descripción detallada, Especificaciones, Compatibilidad con navegadores, Ver también) se consulta solo cuando se busca algo concreto. No todas las páginas tienen todas las secciones, y algunas traducciones al castellano son más breves que la versión en inglés.

## Documentación oficial

- [console.log()](https://developer.mozilla.org/es/docs/Web/API/console/log_static) (MDN).
- [ReferenceError: «x» no está definida](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Errors/Not_defined) (MDN).

## Búscalo tú

Según la sección «Sintaxis» de la página de `console.log()` en MDN, ¿cuántos valores puede recibir `console.log` en una sola llamada?

Pista: está en la sección «Sintaxis», en la primera línea de código.

---

**Respuesta:** uno o más, sin límite fijo. La sintaxis los numera `obj1, obj2, ..., objN`, y se muestran en el orden en que se escriben.
