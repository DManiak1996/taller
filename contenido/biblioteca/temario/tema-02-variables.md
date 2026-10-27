---
semana: 1
orden: 2
---

# Tema 2. Variables: const y let

Una variable es un nombre que guarda un valor para usarlo después.

## Sintaxis

```ts
const nombre = valor;
let nombre = valor;
nombre = nuevoValor;
```

| | `const` (constante) | `let` |
| --- | --- | --- |
| Reasignar (cambiar el valor) | No: da error | Sí |
| Valor inicial | Obligatorio | Opcional |
| Uso recomendado | Por defecto | Solo si el valor va a cambiar |

En TypeScript se puede anotar el tipo después del nombre: `let afectados: number = 150;`.

## Nombres

- Pueden contener letras, números, `_` y `$`, pero no empezar por un número ni llevar espacios.
- Se distinguen mayúsculas y minúsculas: `plazo` y `Plazo` son variables distintas.
- Convención: *camelCase* (cada palabra nueva empieza en mayúscula), como `fechaLimite`.
- El nombre debe decir qué guarda: `diasRestantes` mejor que `x`.

## Ejemplos

```ts
const plazo = 72;
let estado = "abierta";
estado = "cerrada";
console.log("Plazo:", plazo);
console.log(estado);
```

Salida:

```
Plazo: 72
cerrada
```

## Errores típicos

| Error | Causa |
| --- | --- |
| `TypeError: Assignment to constant variable.` | Se intenta cambiar el valor de una `const` |
| `ReferenceError: Cannot access 'x' before initialization` | Se usa la variable en una línea anterior a la que la crea |
| `SyntaxError: Missing initializer in const declaration` | `const` sin valor inicial |
| `SyntaxError: Identifier 'x' has already been declared` | Se crea dos veces la misma variable |

## Revisar código de una IA

- ¿Cada variable se crea antes de usarse?
- ¿Se usa `let` solo donde el valor cambia? Un `let` que nunca cambia debería ser `const`.
- ¿Los nombres explican qué guardan?

## Documentación oficial

- [const](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/const) (MDN).
- [let](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/let) (MDN).
- [TypeError: invalid assignment to const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Invalid_const_assignment) (MDN, en inglés).

## Búscalo tú

Según la página de `const` en MDN, ¿qué ocurre si se escribe `const FOO;` sin valor?

Pista: está en la sección «Ejemplos», en un comentario junto a `const FOO;`. La sección «Descripción» lo explica con palabras.

---

**Respuesta:** da error. La constante debe inicializarse en la misma sentencia en la que se declara.
