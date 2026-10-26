---
semana: 2
orden: 3
---

# Tema 3. Tipos de datos

El tipo de un valor indica qué clase de dato es (texto, número, sí o no) y, por tanto, qué operaciones admite.

## Sintaxis

| Tipo | Valores | Ejemplos |
| --- | --- | --- |
| `string` (texto) | Cualquier texto entre comillas | `"Ana"`, `'72'`, `` `Hola` `` |
| `number` (número) | Enteros y decimales, con punto | `72`, `4.5`, `-3` |
| `boolean` (booleano) | Solo dos: `true` (verdadero) y `false` (falso) | `true` |
| `undefined` | «Sin valor» | lo que vale algo que no existe |

```ts
typeof valor
Number(texto)
let nombre: tipo = valor;
```

- `typeof` devuelve, como texto, el tipo de un valor.
- `Number(texto)` convierte un texto en número. Si no puede, devuelve `NaN` (*Not a Number*, «no es un número»), que también es de tipo `number`.
- En TypeScript, la anotación `: tipo` declara el tipo esperado.

## Ejemplos

```ts
console.log(typeof "72"); // string
console.log(typeof 72); // number
console.log(typeof true); // boolean
console.log(Number("72") + 1); // 73
console.log(Number("hola")); // NaN
```

`"72"` y `72` no son lo mismo: el primero es un texto que contiene dos caracteres; el segundo, un número con el que se puede calcular.

## Plantillas de texto

Un texto entre comillas invertidas (`` ` ``), llamado *template literal* (plantilla de texto), calcula lo que va dentro de `${ }` y lo inserta:

```ts
const n = 3;
console.log(`Hay ${n} brechas`);
// Hay 3 brechas
```

En el teclado español del Mac, la comilla invertida es una tecla muerta: se pulsa y después la barra espaciadora.

## Cómo se guarda un texto

Todo dato se guarda como **bits** (ceros y unos), agrupados en **bytes** (8 bits). Un texto se guarda como una secuencia de números, uno o varios bytes por carácter, según la codificación **UTF-8**: la «A» es el 65; la «ñ» ocupa 2 bytes.

## Errores típicos

- Tratar como número un dato que llega como texto (por ejemplo, de un formulario): `"5" + 3` da `"53"`, no `8`. Ver el tema 4.
- No comprobar `NaN` después de `Number()`: el programa sigue calculando con un valor inválido y no da error.
- Abrir un texto con un tipo de comilla y cerrarlo con otro: `"Ana'`.
- Esperar que TypeScript avise de un tipo erróneo al ejecutar con `node`: Node no comprueba tipos.

## Revisar código de una IA

- ¿Cada dato tiene el tipo que se espera? Un número entre comillas es un texto.
- Si un dato llega como texto y se va a calcular con él, ¿se convierte con `Number()`? ¿Se comprueba si el resultado es `NaN`?
- ¿Las anotaciones de tipo coinciden con los valores?

## Documentación oficial

- [Tipos de datos y estructuras en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Data_structures) (MDN).
- [typeof](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/typeof) (MDN).
- [Number](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number) y [NaN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/NaN) (MDN).
- [Plantillas literales](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals) (MDN).
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html), apartado «The primitives» (TypeScript Handbook, en inglés).

## Búscalo tú

Según la página de `typeof` en MDN, ¿qué devuelve `typeof null`?

---

**Respuesta:** `"object"`. Es una peculiaridad histórica de JavaScript: `null` no es un objeto, pero `typeof` lo clasifica así.
