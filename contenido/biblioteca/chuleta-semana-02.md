# Chuleta de la semana 2: datos y cálculos

## Tipos de datos

| Tipo | Ejemplo | Para qué |
| --- | --- | --- |
| `string` | `"Ana"` | Texto |
| `number` | `72`, `4.5` | Números |
| `boolean` | `true`, `false` | Sí o no |

`typeof x` te dice de qué tipo es una caja. En TypeScript puedes anotarlo: `let afectados: number = 150;`

## Operaciones

```ts
console.log(10 + 5);  // 15
console.log(10 - 5);  // 5
console.log(10 * 5);  // 50
console.log(10 / 5);  // 2
```

`*` y `/` van antes que `+` y `-`, como en matemáticas. Si dudas, paréntesis.

## Cuidado con el +

```ts
console.log("5" + 3);  // "53"
console.log(5 + 3);    // 8
```

Si uno de los dos es texto, `+` **pega** en vez de sumar. Es un fallo silencioso: no da error.

## Plantillas de texto

```ts
const n = 3;
console.log(`Hay ${n} brechas`);
```

Con comillas invertidas (`` ` ``), lo que va dentro de `${ }` se calcula y se mete en el texto. En el Mac, la tecla de la comilla invertida es muerta: púlsala y después espacio.

## Convertir texto en número

```ts
console.log(Number("72"));   // 72
console.log(Number("hola")); // NaN
```

`NaN` significa «no es un número»: la conversión ha fallado.

## Para revisar código de una IA

- ¿Algún `+` mezcla texto y número?
- ¿Los datos que llegan como texto se convierten con `Number()` antes de calcular?
