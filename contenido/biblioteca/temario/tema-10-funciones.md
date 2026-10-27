---
semana: 6
orden: 10
---

# Tema 10. Funciones

Una función (function) es un bloque de código con nombre que se define una vez y se ejecuta cada vez que se llama, con los datos que reciba.

## Sintaxis

```ts
function nombre(param1, param2) {
  // cuerpo
  return resultado;
}
nombre(arg1, arg2);

const nombre2 = (param) => resultado;
```

- **Definir** una función no la ejecuta: solo la guarda. Se ejecuta al **llamarla** (invocarla), con su nombre seguido de paréntesis: `nombre()`.
- Los **parámetros** son variables propias de la función. Los **argumentos** son los valores que se pasan al llamarla; se asignan **por orden**, no por nombre.
- Un parámetro sin argumento vale `undefined`.
- `return` devuelve un valor a quien llamó y **termina** la función. Sin `return`, la llamada vale `undefined`.
- **Función flecha** (arrow function): `(param) => expresión`. Sin llaves, devuelve la expresión automáticamente. Con llaves, `(param) => { … }`, hace falta escribir `return`.
- Una función declarada con `function` se puede llamar antes de su línea; una flecha guardada en `const`, no.
- En TypeScript, los parámetros y el valor devuelto llevan tipo: `function doble(n: number): number`.

## Ejemplos

```ts
function doble(n) {
  return n * 2;
}
const a = doble(5);
console.log(a); // 10
```

Varios parámetros: el orden decide el reparto.

```ts
function quedan(plazo, pasadas) {
  return plazo - pasadas;
}
console.log(quedan(72, 20)); // 52
console.log(quedan(20, 72)); // -52
```

Una función que devuelve `true` o `false`, usada en un `if`:

```ts
const enPlazo = (d) => d <= 30;
if (enPlazo(12)) {
  console.log("Bien");
}
// Bien
```

## Ámbito

El **ámbito** (scope) de una variable es la parte del código donde existe.

- Lo que se crea dentro de una función (sus parámetros y sus `let` y `const`) solo existe dentro y desaparece al terminar. Usarlo fuera da `ReferenceError: … is not defined`.
- Desde dentro de una función se ven las variables de fuera. Desde fuera no se ven las de dentro.
- Un `let` o `const` dentro de una función con el mismo nombre que una variable de fuera crea **otra** variable; la de fuera no cambia.
- Lo único que sale de una función es lo que devuelve con `return`.

## Descomposición

Descomponer es dividir un problema en funciones pequeñas, cada una con una sola tarea, que se llaman entre sí. Una llamada dentro de otra se resuelve de dentro afuera: en `mitad(neto(100))`, primero `neto(100)` y luego `mitad` de su resultado.

## Errores típicos

- **Escribir en vez de devolver:** `console.log(resultado)` dentro de la función en lugar de `return resultado`. La función enseña el dato, pero la llamada vale `undefined`.
- **Flecha con llaves sin `return`:** `(n) => { n * 2; }` devuelve `undefined`.
- **Argumentos en otro orden:** no da error; da un resultado distinto.
- **Llamada sin paréntesis:** `guardar;` no ejecuta nada.
- **`return` dentro de un bucle** cuando se quería recorrer la lista entera: la función termina en la primera vuelta.
- **Usar fuera una variable de dentro:** `ReferenceError`.
- **`return` y el valor en líneas distintas:** `return` seguido de un salto de línea devuelve `undefined` (ver «Búscalo tú»).

## Revisar código de una IA

- En cada llamada, comparar el orden de los argumentos con el de los parámetros.
- Comprobar que cada función se llama de verdad, con `()`, y que ninguna llamada olvida un argumento.
- Comprobar que toda función que debe dar un resultado tiene `return`, también en todos los caminos de sus `if`.
- En las flechas con llaves, buscar el `return`.
- Comprobar que el `return` está fuera del bucle cuando hay que recorrer la lista entera.
- Si se usa fuera de una función una variable creada dentro, no existe: la función tiene que devolverla.
- Probar la función sola con un caso cuyo resultado se conozca, y con el valor límite.
- Desconfiar de funciones muy largas que hacen varias cosas y de las que modifican variables de fuera: es mejor que reciban datos y devuelvan un resultado.

## Documentación oficial

- [Funciones](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Functions) (guía de MDN), apartados «Definir funciones», «Llamar funciones» y «Ámbito de function».
- [return](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/return) (MDN).
- [Funciones flecha](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions) (MDN), apartados «Sintaxis básica» y «Cuerpo de función».
- [Scope](https://developer.mozilla.org/es/docs/Glossary/Scope) (glosario de MDN).
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html), apartado «Functions»: cómo se ponen tipos a parámetros y resultados (TypeScript Handbook, en inglés).

## Búscalo tú

En la página de `return` en MDN: si se escribe `return` y, en la línea siguiente, el cálculo que se quería devolver, ¿qué devuelve la función y por qué?

---

**Respuesta:** devuelve `undefined`. Por la inserción automática de punto y coma, JavaScript entiende `return;` y deja el cálculo de la línea siguiente como código inalcanzable, que no se ejecuta. El valor tiene que empezar en la misma línea que `return`.
