---
semana: 2
orden: 4
---

# Tema 4. Operadores aritméticos y de texto

Un operador es un símbolo que combina valores y produce un resultado nuevo, como `+` o `*`.

## Sintaxis

| Operador | Operación | Ejemplo | Resultado |
| --- | --- | --- | --- |
| `+` | Suma | `10 + 5` | `15` |
| `-` | Resta | `10 - 5` | `5` |
| `*` | Multiplicación | `10 * 5` | `50` |
| `/` | División | `10 / 4` | `2.5` |
| `+` con texto | Concatenación (unir textos) | `"a" + "b"` | `"ab"` |
| `++` / `--` | Suma o resta 1 a una variable | `n++` | `n` pasa a valer `n + 1` |
| `+=` | Suma sobre el valor actual | `n += 5` | igual que `n = n + 5` |

**Precedencia** (orden de cálculo): `*` y `/` se calculan antes que `+` y `-`, como en matemáticas. Los paréntesis cambian el orden.

## Ejemplos

```ts
console.log(2 + 3 * 4);   // 14
console.log((2 + 3) * 4); // 20
console.log("5" + 3);     // 53
console.log(5 + 3);       // 8
console.log("Pla" + "zo"); // Plazo
```

## La doble función de +

Si al menos uno de los dos valores es un texto, `+` **concatena** en lugar de sumar: convierte el otro en texto y los une. No da error. Los demás operadores aritméticos convierten el texto en número: `"10" - 2` da `8`.

## Errores típicos

- Sumar un número que llega como texto: `"150" + 50` da `"15050"`. Solución: `Number("150") + 50`.
- Olvidar la precedencia: `total + iva * 2` no es `(total + iva) * 2`.
- Concatenar sin espacios: `"Plazo:" + 72` da `"Plazo:72"`. Una plantilla (`` `Plazo: ${72}` ``) o `console.log` con comas lo evitan.

## Revisar código de una IA

- En cada `+`, comprobar si los dos valores son números. Si uno puede ser texto, el resultado será una concatenación silenciosa.
- En una fórmula larga, comprobar que la precedencia da el cálculo pretendido. Si hay duda, los paréntesis la eliminan.
- En una plantilla, comprobar que va entre comillas invertidas (con comillas normales, `${…}` sale escrito tal cual) y que cada `${…}` lleva la variable correcta.
- Probar el cálculo con un valor conocido y comparar con el resultado a mano.

## Documentación oficial

- [Expresiones y operadores](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Expressions_and_operators), apartados «Operadores aritméticos» y «Operadores de cadena» (MDN).
- [Precedencia de operadores](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Operator_precedence) (MDN).

## Búscalo tú

En la tabla de operadores aritméticos de la guía «Expresiones y operadores» de MDN, ¿qué operador devuelve el **resto** de una división, y cuánto da `12 % 5`?

Pista: está en la sección «Operadores aritméticos», en la tabla, columna «Ejemplo».

---

**Respuesta:** el operador `%` (residuo o resto). `12 % 5` da `2`, porque 12 entre 5 cabe 2 veces y sobran 2.
