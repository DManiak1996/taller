---
semana: 3
orden: 5
---

# Tema 5. Comparaciones y operadores lógicos

Una comparación pregunta algo sobre dos valores y responde con un booleano: `true` o `false`. Los operadores lógicos combinan varias de esas respuestas.

## Sintaxis

| Operador | Significado | `5 ? 3` |
| --- | --- | --- |
| `===` | Igualdad estricta (mismo valor y mismo tipo) | `false` |
| `!==` | Desigualdad estricta | `true` |
| `>` / `<` | Mayor que / menor que | `true` / `false` |
| `>=` / `<=` | Mayor o igual / menor o igual | `true` / `false` |

Operadores lógicos:

- `a && b` se lee «a **y** b». Da `true` si las dos son `true`.
- `a || b` se lee «a **o** b». Da `true` si al menos una es `true`.
- `!a` se lee «**no** a». Da `true` si a es `false`.

**Precedencia:** `!` se calcula primero, después `&&` y por último `||`. Los paréntesis cambian el orden.

## Tablas de verdad

| a | b | a y b | a o b |
| --- | --- | --- | --- |
| true | true | true | true |
| true | false | false | true |
| false | true | false | true |
| false | false | false | false |

«a y b» es `a && b`; «a o b» es `a || b`.

**Leyes de De Morgan:** `!(a && b)` equivale a `!a || !b`, y `!(a || b)` equivale a `!a && !b`. Al negar, el «y» se convierte en «o», y al revés.

## Ejemplos

```ts
const edad = 15;
const ok = true;
console.log(edad >= 14 && ok); // true
console.log(edad > 18 || ok); // true
console.log(!ok); // false
console.log("5" === 5); // false
```

## Errores típicos

- Usar `=` (asignar) en vez de `===` (comparar).
- Usar `==` en lugar de `===`: `==` convierte los tipos antes de comparar, y `"5" == 5` da `true`.
- Confundir `>` con `>=` en un límite: ¿el valor exacto del límite debe cumplir la condición?
- Usar `&&` cuando los supuestos son alternativos, o `||` cuando los requisitos son acumulativos. El programa funciona, pero deja pasar casos que no debería.
- Mezclar `&&` y `||` sin paréntesis y suponer un orden distinto del real.

## Revisar código de una IA

- Leer la condición en voz alta: «si la edad es mayor o igual que 14 y está marcada…». Si suena distinto de la regla, está mal.
- Probar un valor a cada lado del límite **y el propio límite**.
- Comprobar que la condición exige todos los requisitos de la regla (`&&`) o acepta cualquiera de los supuestos (`||`), según corresponda.
- Una negación de una condición compuesta (`!(a && b)`) se revisa aplicando De Morgan.

## Documentación oficial

- [Igualdad estricta (===)](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Strict_equality) (MDN).
- [Operador lógico AND (&&)](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Logical_AND) y [OR (||)](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Logical_OR) (MDN).
- [Logical NOT (!)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT) (MDN, en inglés).
- [Precedencia de operadores](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Operator_precedence) (MDN).

## Búscalo tú

Según la página «Igualdad estricta (===)» de MDN, ¿qué hace `==` que no hace `===` cuando los dos valores son de tipos distintos?

---

**Respuesta:** `==` intenta convertir los dos valores a un mismo tipo antes de compararlos; `===` considera distintos dos valores de tipos diferentes, sin convertir nada. Por eso `"1" == 1` da `true` y `"1" === 1` da `false`.
