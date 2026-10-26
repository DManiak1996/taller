---
semana: 4
orden: 7
---

# Tema 7. Bucles: for y while

Un loop (bucle) repite un bloque de código mientras se cumpla una condición.

## Sintaxis

```ts
for (inicio; condición; paso) {
  // se repite
}

while (condición) {
  // se repite
}
```

| Parte del `for` | Ejemplo | Cuándo se ejecuta |
| --- | --- | --- |
| Inicio | `let i = 1` | Una vez, antes de la primera vuelta |
| Condición | `i <= 3` | Antes de cada vuelta. Si da `false`, el bucle termina |
| Paso | `i++` | Al final de cada vuelta |

- `for` se usa cuando se conoce el número de vueltas; `while`, cuando depende de algo que cambia durante el bucle.
- `while` no tiene inicio ni paso: la variable de la condición se crea antes, y algo **dentro** del bloque debe cambiarla.
- El paso admite cualquier cambio: `i--`, `i = i + 2`, `i = i * 2`.

## Ejemplos

```ts
for (let i = 1; i <= 3; i++) {
  console.log("Aviso", i);
}
// Aviso 1
// Aviso 2
// Aviso 3
```

```ts
let total = 0;
for (let i = 1; i <= 4; i++) {
  total = total + i;
}
console.log(total); // 10
```

Una variable que suma algo en cada vuelta se llama **acumulador**. Se crea antes del bucle, con valor inicial 0 para sumar o 1 para multiplicar.

```ts
let dias = 3;
while (dias > 0) {
  dias = dias - 1;
}
console.log(dias); // 0
```

## Errores típicos

- **Error de uno** (*off-by-one*): una vuelta de más o de menos. `i < 5` no incluye el 5; `i <= 5`, sí. Empezar en 0 en vez de en 1 añade una vuelta.
- **Bucle infinito:** la condición nunca llega a ser `false`. Causas habituales: nada dentro del bucle cambia la variable de la condición; la cambia en la dirección equivocada (suma en vez de restar); o la condición usa `!==` y el contador se salta el valor. En la terminal se detiene con `Ctrl + C`; en el taller aparece el aviso «Demasiadas vueltas».
- **Acumulador dentro del bucle:** se reinicia en cada vuelta y pierde lo acumulado.
- **`console.log` dentro o fuera:** dentro escribe en cada vuelta; fuera, una sola vez al terminar.

## Algoritmos

Un algoritmo es una secuencia finita de pasos precisos que resuelve un problema. Se suele escribir primero en lenguaje natural (**pseudocódigo**) y después en código. Dos algoritmos con el mismo resultado pueden tener costes muy distintos: buscar un expediente entre 1000 mirándolos uno a uno puede requerir 1000 pasos; partiendo el archivador ordenado por la mitad cada vez, unos 10.

## Revisar código de una IA

- Responder tres preguntas sobre cada `for`: ¿dónde empieza?, ¿dónde termina (y el último valor entra o no)?, ¿cuánto cambia en cada vuelta?
- En un `while`, localizar la línea que hace avanzar la condición y comprobar que va hacia el final.
- Con `!==` en la condición, comprobar que el contador pasa exactamente por ese valor. `<` o `>` son más seguros.
- Comprobar que el acumulador se crea fuera del bucle y con el valor inicial correcto.

## Documentación oficial

- [Bucles e iteración](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Loops_and_iteration) (guía de MDN).
- [for](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for) y [while](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/while) (MDN).

## Búscalo tú

En la guía «Bucles e iteración» de MDN, ¿qué sentencia termina un bucle antes de tiempo, por ejemplo en cuanto se encuentra lo que se buscaba?

---

**Respuesta:** `break`. Termina el bucle más interno en el que está y el programa continúa con la instrucción siguiente al bucle. (`continue`, en cambio, salta solo al principio de la siguiente vuelta.)
