---
semana: 5
orden: 8
---

# Tema 8. Arrays (listas)

Un array (lista) guarda varios valores en orden dentro de una sola variable.

## Sintaxis

```ts
const lista = [v0, v1, v2];
lista[posición]
lista.length
lista.push(valor)
for (const elemento of lista) { }
```

- Los valores (elementos) van entre corchetes, separados por comas.
- Cada elemento ocupa una **posición** (índice), que empieza en **0**. El último está en `lista.length - 1`.
- `length` es el número de elementos.
- Pedir una posición que no existe no da error: devuelve `undefined`.
- `lista[i] = valor` cambia un elemento; `push(valor)` añade uno al final.
- Una lista declarada con `const` se puede modificar por dentro (`push`, `lista[0] = …`), pero no se le puede asignar otra lista.
- En TypeScript, el tipo de una lista de números se escribe `number[]`; de textos, `string[]`.

## Ejemplos

```ts
const plazos = [72, 30, 15];
console.log(plazos[0]); // 72
console.log(plazos.length); // 3
console.log(plazos[3]); // undefined
plazos.push(10);
console.log(plazos.length); // 4
```

Recorrer con el `for` clásico (da la posición) y con `for…of` (da cada elemento):

```ts
const t = ["Ana", "Luis"];
for (let i = 0; i < t.length; i++) {
  console.log(i, t[i]);
}
// 0 Ana
// 1 Luis
for (const nombre of t) {
  console.log(nombre);
}
// Ana
// Luis
```

## Patrones de recorrido

| Patrón | Variable antes del bucle | Dentro del bucle |
| --- | --- | --- |
| Sumar | `let total = 0;` | `total = total + n;` |
| Contar | `let n = 0;` | `if (…) { n = n + 1; }` |
| Buscar | `let esta = false;` | `if (…) { esta = true; }` |
| El mayor | `let max = 0;` | `if (x > max) { max = x; }` |

## Listas y diccionarios

Una lista es una **estructura de datos** ordenada: se accede por posición, y para encontrar un valor sin conocer su posición hay que recorrerla (con 1000 elementos, hasta 1000 pasos). Un diccionario guarda cada valor asociado a un nombre (clave) y accede directamente por él, en un paso. En TypeScript, los diccionarios se escriben como objetos: `{ nombre: "Ana" }` (tema posterior).

## Errores típicos

- **Error de uno con `length`:** `i <= lista.length` da una vuelta de más y lee `undefined` al final.
- **Último elemento:** `lista[lista.length]` no existe; el último es `lista[lista.length - 1]`.
- **`for…in` en lugar de `for…of`:** `for…in` recorre las posiciones (como texto: `"0"`, `"1"`), no los elementos.
- **Nombres de otros lenguajes:** `.size`, `.count`, `.append` o `.add` no existen en un array de TypeScript.
- **Pisar en vez de acumular:** `total = n` en lugar de `total = total + n`.

## Revisar código de una IA

- En un `for` clásico sobre una lista, comprobar que la condición es `i < lista.length`.
- Si solo se usan los elementos, `for…of` es más simple y elimina el riesgo del error de uno.
- Comprobar que los acumuladores y banderas se crean fuera del bucle.
- Si se busca repetidamente en una lista grande, valorar si un diccionario sería más adecuado.

## Documentación oficial

- [Array](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array) (MDN).
- [Array.prototype.push()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/push) y [Array.prototype.length](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/length) (MDN).
- [for...of](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for...of) (MDN), con el apartado «Diferencia entre for...of y for...in».
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html), apartado «Arrays» (TypeScript Handbook, en inglés).

## Búscalo tú

En la página de `push()` en MDN, apartado «Valor devuelto»: además de añadir el elemento, ¿qué devuelve `push`?

---

**Respuesta:** la nueva longitud de la lista (su nuevo `length`). Por ejemplo, si `animales` tiene 3 elementos, `animales.push("vacas")` devuelve `4`.
