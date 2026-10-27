---
semana: 7
orden: 11
---

# Tema 11. Objetos y métodos de listas

Un objeto (object) agrupa varios datos de una misma cosa, cada uno con su nombre. Una lista de objetos es una tabla, y `find`, `filter` y `map` son las tres formas habituales de buscar, elegir y transformar sus filas.

## Sintaxis

```ts
const exp = {
  numero: 145,
  estado: "abierto",
};
exp.estado;         // leer
exp.estado = "x";   // cambiar
exp.dias = 12;      // añadir
exp[campo];         // clave en variable

lista.find((x) => condición);
lista.filter((x) => condición);
lista.map((x) => resultado);

const copia = { ...exp };
const copia2 = [...lista];
```

- Cada **campo** (propiedad) tiene una **clave** y un **valor**: `clave: valor`, separados por comas.
- Se lee con un **punto**: `exp.estado`. Si la clave no existe, da `undefined`, sin error.
- Con **corchetes**, la clave puede venir de una variable: `exp[campo]` busca la clave que guarda `campo`; `exp.campo` busca una clave llamada «campo».
- Un objeto guardado en `const` se puede cambiar por dentro (sus campos). Lo que no se puede es guardar otro objeto en esa variable.
- `find` da el primero que cumple (o `undefined`); `filter`, una lista nueva con todos los que cumplen; `map`, una lista nueva con cada elemento transformado.
- `{ ...exp }` y `[...lista]` hacen una copia (ver «Copias y referencias»).
- `find`, `filter` y `map` reciben una **función flecha** que se ejecuta con cada elemento, en orden. Ninguno de los tres cambia la lista original.
- En TypeScript, la forma de un objeto se describe con un tipo: `{ numero: number; estado: string }`. Así el editor avisa de una clave mal escrita.

## Ejemplos

Recorrer una lista de objetos y sumar un campo:

```ts
const brechas = [
  { sitio: "Web", horas: 5 },
  { sitio: "App", horas: 3 },
];
let total = 0;
for (const b of brechas) {
  total = total + b.horas;
}
console.log(total); // 8
```

Los tres métodos con la misma lista:

```ts
const ps = [
  { nombre: "Ana", baja: false },
  { nombre: "Leo", baja: true },
  { nombre: "Eva", baja: true },
];
ps.find((p) => p.baja);
// la fila de Leo
ps.filter((p) => p.baja);
// las filas de Leo y Eva
ps.map((p) => p.nombre);
// [ 'Ana', 'Leo', 'Eva' ]
```

| Método | Devuelve | Si ninguno cumple |
| --- | --- | --- |
| `find` | El primer elemento que cumple | `undefined` |
| `filter` | Una lista nueva con todos los que cumplen | `[]` |
| `map` | Una lista nueva del mismo tamaño, con cada elemento transformado | (no elige: transforma todos) |

Encadenar: primero se eligen las filas y después se transforma cada una.

```ts
const nombres = ps
  .filter((p) => p.baja)
  .map((p) => p.nombre);
console.log(nombres); // [ 'Leo', 'Eva' ]
```

## Copias y referencias

Una variable con un objeto o una lista no guarda los datos, sino **dónde están** (una referencia). Por eso:

- `const b = a` **no copia**: `a` y `b` son dos nombres del mismo objeto. Cambiar `b.dias` cambia también `a.dias`.
- Lo mismo al pasar un objeto a una función: si la función le cambia un campo, el cambio se ve fuera, aunque no haya `return`.
- Para una copia de verdad se usan los tres puntos: `{ ...a }` o `[...lista]`. Es una copia de un solo nivel: si un campo es a su vez un objeto, ese se sigue compartiendo.
- Con números, textos y booleanos no pasa: `const b = a` sí copia el valor.

```ts
const a = { dias: 10 };
const b = a;
b.dias = 99;
console.log(a.dias); // 99

const c = { ...a };
c.dias = 1;
console.log(a.dias); // 99: c es otra ficha
```

## Errores típicos

- **Clave mal escrita:** `exp.estdo` o `exp.Estado` dan `undefined` sin ningún error.
- **Añadir un campo que no estaba al crear el objeto:** `exp.dias = 12` se ejecuta, pero TypeScript lo subraya («Property 'dias' does not exist on type…»): espera que el objeto tenga desde el principio todos sus campos. Se ve en la semana de tipos.
- **Punto con una clave en variable:** `exp.campo` en vez de `exp[campo]`.
- **Usar la fila entera en vez de un campo:** `total + b` en vez de `total + b.horas`; sale un texto raro con `[object Object]`.
- **Usar lo que da `find` sin comprobarlo:** si no encuentra nada, `e.estado` rompe el programa (`TypeError: Cannot read properties of undefined`).
- **`find` en vez de `filter`** (o al revés): uno da un elemento suelto; el otro, siempre una lista.
- **Condición al revés en `filter`:** `<` en vez de `>` se queda justo con los que había que descartar.
- **Flecha con llaves sin `return`** en `map`: sale `[ undefined, undefined, … ]`.
- **`map` con una condición:** `map((d) => d > 30)` da una lista de `true` y `false`; para elegir, `filter`.
- **Creer que `const b = a` es una copia.**

## Revisar código de una IA

- Comprobar cada clave letra a letra con la definición del objeto, mayúsculas incluidas.
- Si la clave está en una variable, buscar los corchetes.
- Dentro de un bucle o de una flecha, comprobar que se usa la variable de la fila (`b.horas`), no la lista entera (`brechas.horas`).
- Después de un `find`: ¿qué pasa si no encuentra nada? Debe haber un `if` que lo compruebe antes de leer sus campos.
- Leer cada `filter` en voz alta como «quédate con los que…» y compararlo con lo que se pidió.
- En una cadena `filter` → `map`, anotar qué lista sale de cada paso.
- Probar con la lista vacía y con un caso en el límite (30 días justos, 72 horas justas).
- Si se pretende guardar una copia, comprobar que lleva `...`. Desconfiar de las funciones que cambian el objeto que reciben sin decirlo en su nombre.

## Documentación oficial

- [Trabajando con objetos](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_objects) (guía de MDN), apartados «Objetos y propiedades» y «Creación de nuevos objetos».
- [Array.prototype.find()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find) (MDN), apartados «Sintaxis» y «Ejemplos».
- [Array.prototype.filter()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) (MDN), apartado «Descripción».
- [Array.prototype.map()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map) (MDN), apartados «Descripción» y «Usando map para dar un nuevo formato a los objetos de un array».
- [Sintaxis Spread](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax) (MDN), apartado «Spread en literales tipo Objeto»: los tres puntos.
- [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html): cómo se ponen tipos a los objetos (TypeScript Handbook, en inglés).

## Búscalo tú

En la página de `map` en MDN, busca el apartado «Caso de uso engañoso». ¿Qué esperaría uno que diera `["1", "2", "3"].map(parseInt)`, qué da de verdad y qué alternativa propone la página?

---

**Respuesta:** uno esperaría `[1, 2, 3]`, pero da `[1, NaN, NaN]`. `map` le pasa a la función más datos que el elemento (también su posición), y `parseInt` usa ese segundo dato para otra cosa. La página propone `.map(Number)`, con la función `Number()` de la semana 2, que da `[1, 2, 3]`. Es la lección de siempre: un código que «parece obvio» se prueba antes de fiarse de él.
