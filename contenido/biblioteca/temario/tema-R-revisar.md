---
semana: 1
orden: 90
---

# Tema R. Cómo revisar código

Revisar código es comprobar, con pruebas, que hace lo que se pidió. El método sirve igual para el código de una IA, el de un compañero o el propio de hace una semana. Este tema crece cada semana: al final hay una lista de comprobación por cada cosa nueva que se aprende.

## El método

1. **Predecir y ejecutar antes de opinar.** Anotar qué debería salir, ejecutarlo y comparar. Sin ejecutar, una opinión es una suposición, aunque venga de una IA muy segura de sí misma.
2. **Probar los extremos.** El propio límite (72 horas exactas, el día 30), el cero, la lista vacía, un dato que no llega. Ahí se esconden casi todos los fallos; los valores «normales» suelen salir bien.
3. **Seguir la pista hasta el origen.** Un `undefined`, un `NaN` o un error no son el fallo, sino la pista. Se va hacia atrás, línea a línea, hasta encontrar dónde nació.
4. **Leer el informe de los tests.** `Expected` es lo que el test pide; `Received`, lo que dio el código. La diferencia entre los dos es el fallo.
5. **Comparar cada llamada con su definición.** Mismo número de argumentos y en el mismo orden. Si se cambian, no hay error: hay un resultado equivocado.
6. **No «arreglar» lo que está bien.** Cada cambio debe responder a un fallo comprobado. Cambiar lo que funciona puede romperlo.
7. **Preguntar a la IA en vez de creerla.** «¿Qué sale con 0? ¿Y con la lista vacía? ¿Por qué `<` y no `<=`?». Y después comprobar su respuesta ejecutando.

## Ejemplo: probar el límite

La IA entrega esta función y dice que funciona:

```ts
function enPlazo(horas) {
  return horas < 72;
}
console.log(enPlazo(50)); // true
console.log(enPlazo(72)); // false
```

Con 50 horas acierta. Con el propio límite, falla: el art. 33 RGPD dice «sin dilación indebida y, de ser posible, a más tardar 72 horas», así que a las 72 horas exactas todavía se está a tiempo. Tenía que ser `horas <= 72`. Solo se ve probando el 72.

## Pistas y dónde mirar

| Si sale… | Suele ser… | Mirar… |
| --- | --- | --- |
| `undefined` | Falta un `return`, la posición no existe o no llegó un argumento | La función o la lista de donde viene |
| `NaN` | Una cuenta con un texto o con `undefined` | Los datos que entran en la cuenta |
| `"53"` en vez de `8` | Un `+` con un texto | Si algún dato lleva comillas |
| `ReferenceError: x is not defined` | La variable no existe ahí: mal escrita o creada dentro de una función o un bloque | Dónde se creó |
| «Demasiadas vueltas» | Un bucle que no termina | La línea que hace avanzar la condición |
| Nada | Una función que no se llama, o un `if` que nunca se cumple | Los `()` de la llamada y la condición |

## Leer el informe de los tests

```
 × informe.test.ts > línea 1 8ms

Expected: "Brecha en Clínica Ribera"
Received: "Brecha en: Clínica Ribera"

 ❯ informe.test.ts:15:23
```

| Trozo | Qué significa |
| --- | --- |
| `×` | Este test falla. Su nombre dice qué comprobaba. |
| `Expected` | Lo que el test esperaba. |
| `Received` | Lo que salió de verdad. Compararlos letra a letra. |
| `informe.test.ts:15:23` | Fichero, línea y columna del test que falló. |
| `Tests 5 passed (5)` | El resumen final: la única prueba de que todo pasa. |

Si la IA «arregla» un test cambiando lo que espera en vez de cambiar el código, hay que desconfiar: el test es el contrato.

## Lista de comprobación por semana

<details>
<summary>Semana 1: programas y variables</summary>

- ¿El orden de las líneas es el de la tarea? El programa va de arriba abajo, sin saltos.
- ¿Los textos llevan comillas y los números no?
- ¿Cada variable se crea antes de usarse?
- ¿Algún `const` se cambia después? Da error: tenía que ser `let`.
- ¿Los nombres dicen lo que guardan? `x` o `dato2` no ayudan a revisar.

Más en el [Tema 2](tema-02-variables.md).
</details>

<details>
<summary>Semana 2: tipos y operaciones</summary>

- En cada `+`: ¿los dos lados son números? Si uno es texto, pega en vez de sumar.
- ¿Los datos de un formulario se convierten con `Number()` antes de calcular? ¿Y si llega un texto que no es un número (`NaN`)?
- En una fórmula: ¿la multiplicación y la división se hacen antes que la suma? ¿Hacen falta paréntesis?
- En una plantilla de texto: ¿lleva comillas invertidas y `${...}`? ¿Cada hueco tiene la variable correcta?
- Hacer la cuenta a mano con un dato conocido y compararla.

Más en el [Tema 3](tema-03-tipos.md) y el [Tema 4](tema-04-operadores.md).
</details>

<details>
<summary>Semana 3: comparaciones y decisiones</summary>

- Probar un valor a cada lado del límite y el propio límite. ¿`<` o `<=`?
- ¿Compara con `===`? Un solo `=` no compara: guarda.
- ¿La condición pide todos los requisitos (`&&`) o le basta con uno (`||`)? Leerla en voz alta y compararla con la regla.
- En una cadena de `if`, `else if`: ¿el orden deja algún camino al que no se llega nunca?

Más en el [Tema 5](tema-05-comparaciones-logica.md) y el [Tema 6](tema-06-condicionales.md).
</details>

<details>
<summary>Semana 4: bucles</summary>

- Tres preguntas para cada `for`: ¿dónde empieza?, ¿dónde termina (y el último entra)?, ¿cuánto avanza en cada vuelta?
- Contar las vueltas con un ejemplo pequeño. ¿Sale una de más o de menos?
- En un `while`: ¿qué línea acerca la condición al final? Si ninguna, no termina nunca.
- ¿El acumulador se crea fuera del bucle? Dentro se reinicia en cada vuelta.
- ¿El `console.log` va dentro (una vez por vuelta) o fuera (una vez al final)?

Más en el [Tema 7](tema-07-bucles.md).
</details>

<details>
<summary>Semana 5: listas</summary>

- ¿Las posiciones empiezan en 0? El primero es `lista[0]` y el último, `lista[lista.length - 1]`.
- En un `for` clásico: ¿la condición es `i < lista.length`? Con `<=` da una vuelta de más y sale `undefined`.
- Si solo hacen falta los datos, ¿no sería más claro `for...of`?
- Al buscar algo: ¿la bandera (`hay`, `encontrado`) se crea fuera del bucle y solo se pone en `true` al encontrarlo? Si se le da un valor en cada vuelta, la última vuelta borra lo encontrado.
- Probar con la lista vacía.

Más en el [Tema 8](tema-08-arrays.md).
</details>

<details>
<summary>Semana 6: funciones</summary>

- ¿Cada función se llama de verdad, con `()`? Nombrarla sin paréntesis no la ejecuta.
- Si sale `undefined`: ¿la función tiene `return`? Imprimir dentro no es devolver.
- Si la flecha lleva llaves `=> {`: ¿tiene `return`? Sin llaves no le hace falta.
- ¿El `return` está fuera del bucle? Dentro, la función termina en la primera vuelta.
- Poner cada llamada al lado de la definición: ¿los argumentos van en el mismo orden que los parámetros? ¿Falta alguno?
- ¿Usa fuera de la función una variable creada dentro? No existe ahí: tiene que devolverla.
- Si una función hace demasiadas cosas: ¿en qué piezas pequeñas se podría partir para revisarlas por separado?
</details>

## Documentación oficial

- [¿Qué ha salido mal? Corrigiendo JavaScript](https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting/What_went_wrong) (guía de MDN sobre errores de sintaxis y de lógica), en español.
- [Referencia de errores de JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Errors) (MDN): qué significa cada mensaje de error.
- [expect](https://vitest.dev/api/expect) (Vitest): las comprobaciones que usan los tests, como `toBe` y `toEqual`, en inglés.

## Búscalo tú

En la «Referencia de errores de JavaScript» de MDN, busca el error `"x" is not a function`. ¿Cuál es una causa típica que da la página?

---

**Respuesta:** La primera que da es un nombre mal escrito: `getElementByID` en vez de `getElementById`. Una sola mayúscula cambia el nombre, y esa función no existe. Otra es usar algo que ese dato no tiene, como `map` sobre algo que no es una lista. Es «seguir la pista»: el mensaje dice qué nombre falló, y desde ahí se busca dónde se creó.
