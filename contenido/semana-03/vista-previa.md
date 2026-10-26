# Semana 3: vista previa

Generado desde los JSON. Para revisar el contenido sin abrir el formato.

---

## Día 1: Preguntas de sí o no

**Objetivo:** Hoy aprendes a comparar dos datos con ===, >, < y compañía, y que la respuesta siempre es true o false.

### Microlección

**Pantalla 1 · texto**

Comparar es hacerle al programa una pregunta de sí o no: ¿es mayor?, ¿es igual? La respuesta siempre es un **boolean**: `true` o `false`. Es la base de toda decisión, que empieza mañana.

**Pantalla 2 · codigo**

```ts
const edad = 15;
console.log(edad > 14);
console.log(edad < 14);
console.log(edad >= 15);
```

Salida: `true` / `false` / `true`

`>` mayor que, `<` menor que, `>=` mayor o igual, `<=` menor o igual. Como en matemáticas, pero el igual va **detrás**.

**Pantalla 3 · codigo**

```ts
const estado = "abierta";
console.log(estado === "abierta");
console.log(estado !== "abierta");
```

Salida: `true` / `false`

`===` pregunta «¿es igual?» y `!==`, «¿es distinto?». Son **tres** signos. Uno solo (`=`) no compara: guarda.

**Pantalla 4 · codigo**

```ts
console.log(5 === 5);
console.log("5" === 5);
```

Salida: `true` / `false`

`===` también mira el tipo: el texto "5" no es el número 5. Existe un `==` de dos signos que mezcla tipos y da sorpresas; en este taller no se usa, y si lo ves en código de una IA, sospecha.

**Pantalla 5 · deiure**

En el apartado 4 de la EIPD, DeIure pregunta si una figura es un interesado. La comparación da true o false, y con eso decide qué hacer.

```ts
figura.tipo === 'interesado'
```

`DeIure/src/lib/apartado-input-schemas.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s03-d01-r1` · concepto comparaciones

Tu despacho se fija un plazo interno de 30 días para responder. ¿Qué escribe este programa?

```ts
const dias = 30;
console.log(dias > 30);
console.log(dias >= 30);
```

- ✅ `false ⏎ true`: Eso es: 30 no es mayor que 30, pero sí es mayor o igual.
- ▫️ `true ⏎ true`: 30 > 30 es false: un número no es mayor que sí mismo.
- ▫️ `false ⏎ false`: >= incluye el igual: 30 >= 30 es true.
- ▫️ `30 ⏎ 30`: Una comparación no escribe el número, sino true o false.

Pistas: 1) ¿Es 30 mayor que 30? 2) > no incluye el igual; >= sí. 3) La primera es false.

Explicación: La diferencia entre > y >= es justo el caso del límite. En plazos legales, ese día decide si llegas o no.

#### Reto 2 · Rellena el hueco · `s03-d01-r2` · concepto comparaciones

Completa para que el programa pregunte si el país es España y escriba true.

```ts
const pais = "España";
console.log(pais ___ "España");
```

Objetivo: `true`

- ✅ `===`: Correcto: tres signos, «¿es igual?».
- ▫️ `!==`: Eso pregunta «¿es distinto?»: daría false.
- ▫️ `=`: Un solo = intenta guardar, no comparar. Y como pais es const, falla.

Pistas: 1) Quieres preguntar si son iguales. 2) La pregunta «¿es igual?» lleva tres signos. 3) Es ===.

Explicación: = guarda, === compara. Confundirlos es uno de los fallos más típicos.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s03-rev-1` · concepto comparaciones

Han pasado justo 72 horas desde que conociste la brecha. La IA y Marta discuten qué imprime esta línea. ¿Quién tiene razón?

```ts
const horas = 72;
console.log(horas <= 72);
```

- La IA: Imprime `true`. (`<=` significa «menor o igual», y 72 es igual a 72.)
- Marta: Imprime `false`. (72 no es menor que 72.)

Correcta: La IA

Pistas: 1) Fíjate en el símbolo: no es `<` a secas. 2) `<` es «menor que». `<=` es «menor o igual que». 3) ¿Es 72 menor o igual que 72?

Explicación: Imprime `true`. La diferencia entre `<` y `<=` es justo el caso del límite, y es donde más se equivocan las personas y las IA. Cuando revises una comparación, prueba siempre el valor exacto del límite: aquí, 72.

### Repaso (reserva)

#### Repaso 1 · Ordena las líneas · `s03-d01-x1` · concepto comparaciones

Ordena las líneas para que escriba exactamente esto.

Líneas (orden correcto):

```ts
const edad = 16;
console.log(edad >= 14);
console.log(edad >= 18);
```

Objetivo: `true` / `false`

Pistas: 1) 16 es mayor o igual que 14, pero no que 18. 2) La comparación que da true va primero. 3) const, luego >= 14 y luego >= 18.

Explicación: Con 16 años se puede consentir el tratamiento de datos en España (desde los 14), pero aún no se es mayor de edad.

#### Repaso 2 · ¿Qué imprime? · `s03-d01-x2` · concepto comparaciones

¿Qué escribe este programa?

```ts
console.log("abc" === "ABC");
```

- ✅ `false`: Eso es: para el programa, mayúsculas y minúsculas son letras distintas.
- ▫️ `true`: Para una persona es la misma palabra; para el programa, no.
- ▫️ `abc`: Una comparación da true o false.

Pistas: 1) ¿Son exactamente las mismas letras? 2) Mayúsculas y minúsculas cuentan como distintas. 3) No son iguales.

Explicación: === compara exactamente. Por eso, al buscar un nombre en una lista, una mayúscula de más hace que no aparezca.

#### Repaso 3 · ¿Quién tiene razón? (Revisión) · `s03-rev-x4` · concepto comparaciones

La IA y Marta discuten qué imprime esta línea. ¿Quién tiene razón?

```ts
console.log("5" === 5);
```

- Marta: Imprime `true`. (Los dos son un 5.)
- La IA: Imprime `false`. (`===` compara también el tipo: uno es texto y el otro, número.)

Correcta: La IA

Pistas: 1) Fíjate en las comillas. 2) `===` compara el valor y también el tipo. 3) ¿Son del mismo tipo `"5"` y `5`?

Explicación: Imprime `false`. Por eso, lo que llega como texto (un formulario, por ejemplo) hay que convertirlo con `Number()` antes de compararlo con un número.

---

## Día 2: Decidir con if

**Objetivo:** Hoy aprendes a usar if para que el programa haga algo solo cuando se cumple una condición.

### Microlección

**Pantalla 1 · texto**

Hasta ahora el programa ejecutaba todas las líneas. Con `if` («si») decide: **si** la condición es `true`, ejecuta lo que hay entre llaves `{ }`; si es `false`, se lo salta. Es una cláusula condicional: si se da el supuesto, se aplica la consecuencia.

**Pantalla 2 · pasoapaso**

```ts
const edad = 15;
if (edad >= 14) {
  console.log("Puede consentir");
}
console.log("Fin");
```

- Línea 1: {"edad":"15"} · Guarda la edad: 15.
- Línea 2: {"edad":"15"} · Pregunta: ¿15 >= 14? Sí. Entra en las llaves.
- Línea 3: {"edad":"15"} · Ejecuta lo de dentro.
- Línea 5: {"edad":"15"} · Sale de las llaves y sigue con el resto.

**Pantalla 3 · pasoapaso**

```ts
const edad = 12;
if (edad >= 14) {
  console.log("Puede consentir");
}
console.log("Fin");
```

- Línea 1: {"edad":"12"} · Mismo programa, otra edad: 12.
- Línea 2: {"edad":"12"} · ¿12 >= 14? No. Se salta todo lo de dentro de las llaves.
- Línea 5: {"edad":"12"} · La línea 3 no se ha ejecutado nunca.

**Pantalla 4 · texto**

La forma: la condición va entre **paréntesis**, y lo que depende de ella, entre **llaves**, con dos espacios de sangría para que se vea qué está dentro. Lo que va después de la llave de cierre se ejecuta siempre.

**Pantalla 5 · deiure**

DeIure comprueba lo que le llega antes de guardarlo: si no es texto, lo rechaza. `throw` lanza un error y para; lo verás más adelante.

```ts
if (typeof content !== 'string') throw policyError('WORKSPACE_CONTENT_INVALID');
```

`DeIure/src/lib/workspace-file-policy.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s03-d02-r1` · concepto if-else

Una brecha sin personas afectadas. ¿Qué escribe este programa?

```ts
const afectados = 0;
if (afectados > 0) {
  console.log("Notificar");
}
console.log("Revisado");
```

- ✅ `Revisado`: Eso es: 0 > 0 es false, así que se salta «Notificar».
- ▫️ `Notificar ⏎ Revisado`: La condición es false (0 no es mayor que 0): lo de dentro no se ejecuta.
- ▫️ `Notificar`: «Revisado» está fuera de las llaves: se ejecuta siempre.

Pistas: 1) ¿Es 0 mayor que 0? 2) Si la condición es false, se salta lo que hay entre llaves. 3) Solo se ejecuta la última línea.

Explicación: Lo de dentro de las llaves depende de la condición; lo de fuera, no.

#### Reto 2 · Rellena el hueco · `s03-d02-r2` · concepto if-else

Por debajo de 14 años hace falta el consentimiento de los padres. Completa para que este programa lo avise.

```ts
const edad = 13;
if (edad ___ 14) {
  console.log("Avisar a los padres");
}
```

Objetivo: `Avisar a los padres`

- ✅ `<`: Correcto: 13 < 14 es true, así que avisa.
- ▫️ `>=`: Eso pregunta si ya tiene 14 o más: es la condición al revés.
- ▫️ `>`: 13 > 14 es false: no avisaría.
- ▫️ `===`: Solo avisaría si tuviera exactamente 14.

Pistas: 1) ¿Cuándo hay que avisar: por debajo o por encima de 14? 2) «Por debajo de» es «menor que». 3) Menor que es <.

Explicación: Elegir el signo es traducir la norma a código. La condición al revés no da error: simplemente hace lo contrario.

#### Reto 3 · Caza el fallo (Revisión) · `s03-rev-2` · concepto if-else

Le pediste a la IA: «Avisa si la brecha sigue abierta». La brecha está cerrada. Toca la línea que está mal.

```ts
let estado = "cerrada";
if (estado = "abierta") {
  console.log("Brecha abierta");
}
console.log(estado);
```

- ✅ `Usa `=` en vez de `===`. No compara: cambia el estado a «abierta».`: Exacto. Un solo `=` guarda un valor; tres `===` comparan. Y fíjate en la última línea: ¡ha cambiado el dato!
- ▫️ `Los textos no se pueden comparar en un `if`.`: Sí se pueden, con `===`. El problema es el símbolo que se ha usado.
- ▫️ `Falta un `else` para cuando la brecha está cerrada.`: El `else` es opcional: si no hay nada que hacer cuando está cerrada, no hace falta. Mira el símbolo dentro del paréntesis.

Pistas: 1) ¿Qué imprime la última línea? ¿No estaba cerrada? 2) `=` guarda un valor en una variable. `===` compara dos valores. 3) Cuenta los `=` de la línea 2.

Explicación: Imprime `Brecha abierta` y luego `abierta`: la línea 2 no compara, **cambia** el estado. Ni TypeScript ni Node dan error, así que solo lo cazas leyendo. Es el fallo de la semana: cada vez que veas un `if`, cuenta los `=`.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s03-d02-x1` · concepto if-else

¿Qué escribe este programa?

```ts
const n = 5;
if (n === 5) {
  console.log("Cinco");
}
if (n > 5) {
  console.log("Más");
}
```

- ✅ `Cinco`: Eso es: la primera condición es true y la segunda, false.
- ▫️ `Cinco ⏎ Más`: 5 > 5 es false: el segundo bloque no se ejecuta.
- ▫️ `Más`: 5 === 5 es true: el primer bloque sí se ejecuta.

Pistas: 1) Son dos if independientes. Evalúa cada condición por separado. 2) 5 === 5 es true; 5 > 5 es false. 3) Solo se ejecuta el primer bloque.

Explicación: Cada if hace su propia pregunta. Pueden cumplirse los dos, uno o ninguno.

#### Repaso 2 · Rellena el hueco · `s03-d02-x2` · concepto if-else

Completa para que solo escriba «Archivar» si el expediente está cerrado.

```ts
const estado = "cerrado";
if (___) {
  console.log("Archivar");
}
```

Objetivo: `Archivar`

- ✅ `estado === "cerrado"`: Correcto: compara el estado con «cerrado».
- ▫️ `estado = "cerrado"`: Un solo = intenta guardar, y estado es const: falla.
- ▫️ `estado !== "cerrado"`: Eso pregunta si NO está cerrado: no archivaría.

Pistas: 1) Dentro del paréntesis va una pregunta de sí o no. 2) Para preguntar «¿es igual?» se usan tres signos. 3) estado === "cerrado".

Explicación: Dentro del if va siempre una comparación. Un = solo es el fallo de la semana.

#### Repaso 3 · Caza el fallo (Revisión) · `s03-rev-x1` · concepto if-else

Le pediste a la IA: «Bloquea la cuenta cuando haya 3 intentos fallidos». Todavía no ha fallado ninguno. Toca la línea que está mal.

```ts
let intentos = 0;
if (intentos = 3) {
  console.log("Cuenta bloqueada");
}
```

- ✅ `Usa `=` en vez de `===`: pone los intentos a 3 en lugar de compararlos.`: Exacto. Con un solo `=`, la cuenta se bloquea siempre.
- ▫️ `Tenía que ser `intentos > 3`.`: La petición dice «cuando haya 3». Fíjate en cuántos `=` hay.
- ▫️ ``intentos` tendría que ser `const`.`: Los intentos van a cambiar, así que `let` está bien. El fallo está en el `if`.

Pistas: 1) Con 0 intentos, ¿debería bloquearse? 2) `=` guarda; `===` compara. 3) Cuenta los `=` de la línea 2.

Explicación: Imprime `Cuenta bloqueada` con 0 intentos: la línea 2 pone `intentos` a 3, y el `if` lo da por bueno. Ningún error te avisa. Cuenta siempre los `=`.

---

## Día 3: Dos caminos: if y else

**Objetivo:** Hoy aprendes a darle al programa dos caminos con if y else, y a comprobar que la condición no está al revés.

### Microlección

**Pantalla 1 · pasoapaso**

```ts
const horas = 80;
if (horas <= 72) {
  console.log("En plazo");
} else {
  console.log("Fuera de plazo");
}
```

- Línea 1: {"horas":"80"} · Han pasado 80 horas desde que se conoció la brecha.
- Línea 2: {"horas":"80"} · ¿80 <= 72? No. Salta al else.
- Línea 5: {"horas":"80"} · Ejecuta el camino del else.

**Pantalla 2 · texto**

`else` significa «si no». Con `if` y `else` siempre se ejecuta **uno y solo uno** de los dos caminos: nunca los dos, nunca ninguno.

**Pantalla 3 · codigo**

```ts
const horas = 48;
if (horas <= 72) {
  console.log("En plazo");
} else {
  console.log("Fuera de plazo");
}
```

Salida: `En plazo`

El mismo programa con 48 horas toma el otro camino.

**Pantalla 4 · texto**

Un fallo típico de la IA es poner la condición **al revés** (`>` donde iba `<=`). El programa no da error: funciona, pero decide lo contrario. Para pillarlo, prueba con un dato de cada lado del límite, por ejemplo 48 y 80. Y prueba el propio límite: ¿72 horas exactas están en plazo?

**Pantalla 5 · deiure**

Al revisar el apartado 4 de una EIPD, si una referencia es válida, DeIure la guarda; si no, apunta un problema para enseñárselo a quien la redacta. Simplificado:

```ts
if (figureRef.success) {
  figure.figure_ref = figureRef.data;
} else {
  issues.push({ code: 'invalid_figure_ref' });
}
```

`DeIure/src/lib/apartado-04-normalizer.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s03-d03-r1` · concepto if-else

¿Qué escribe este programa?

```ts
let horas = 60;
horas = horas + 20;
if (horas <= 72) {
  console.log("En plazo");
} else {
  console.log("Fuera de plazo");
}
```

- ✅ `Fuera de plazo`: Eso es: cuando llega al if, horas ya vale 80.
- ▫️ `En plazo`: La línea 2 suma 20 antes de la pregunta: 80 <= 72 es false.
- ▫️ `En plazo ⏎ Fuera de plazo`: Con if y else solo se ejecuta uno de los dos caminos.

Pistas: 1) ¿Cuánto vale horas cuando llega a la línea 3? 2) 60 + 20 = 80. ¿Es 80 <= 72? 3) La condición es false: va al else.

Explicación: La condición se evalúa con el valor que tiene la caja en ese momento, no con el inicial.

#### Reto 2 · Rellena el hueco · `s03-d03-r2` · concepto if-else

Completa la palabra que abre el segundo camino.

```ts
const nota = 4;
if (nota >= 5) {
  console.log("Aprobado");
} ___ {
  console.log("Suspenso");
}
```

Objetivo: `Suspenso`

- ✅ `else`: Correcto: else, «si no».
- ▫️ `if`: Un if necesita su condición entre paréntesis: así no se entiende.
- ▫️ `sino`: El lenguaje solo entiende palabras en inglés: else.

Pistas: 1) Es la palabra que significa «si no». 2) Está en inglés, como if. 3) Cuatro letras: e…

Explicación: if y else son la pareja básica de las decisiones.

#### Reto 3 · Caza el fallo (Revisión) · `s03-rev-3` · concepto if-else

Le pediste a la IA: «Di si estamos a tiempo de notificar la brecha (a más tardar 72 horas)». Han pasado 50 horas. Toca la línea que está mal.

```ts
const horas = 50;
if (horas > 72) {
  console.log("A tiempo");
} else {
  console.log("Fuera de plazo");
}
```

- ✅ `La condición está al revés: «A tiempo» tiene que salir cuando las horas son 72 o menos.`: Eso es. Se arregla con `horas <= 72`, o cambiando de sitio los dos mensajes.
- ▫️ `Falta otro `if` dentro del `else`.`: Con dos caminos, `if` y `else` bastan. El problema es qué camino se elige.
- ▫️ `Las horas tendrían que ir entre comillas.`: Para comparar con `>` tienen que ser números, sin comillas. Mira qué pasa con 50.

Pistas: 1) Con 50 horas, ¿qué tendría que salir? ¿Qué sale? 2) Si la condición del `if` se cumple, va por arriba; si no, por el `else`. 3) ¿Es 50 mayor que 72?

Explicación: Imprime `Fuera de plazo` cuando aún quedan 22 horas. La condición está al revés. El código funciona y parece razonable: solo lo cazas probando un caso que conoces. Prueba siempre uno de cada lado del límite (50 y 80) y el propio límite (72).

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s03-d03-x1` · concepto if-else

¿Qué escribe este programa?

```ts
const consiente = false;
if (consiente) {
  console.log("Tratar");
} else {
  console.log("No tratar");
}
console.log("Fin");
```

- ✅ `No tratar ⏎ Fin`: Eso es: la condición es false, va al else, y «Fin» va fuera.
- ▫️ `Tratar ⏎ Fin`: consiente vale false: no entra en el if.
- ▫️ `No tratar`: «Fin» está fuera de las llaves: se ejecuta siempre.

Pistas: 1) La condición puede ser directamente una caja con true o false. 2) consiente es false: va al else. 3) Y luego, la línea de fuera.

Explicación: if (consiente) es lo mismo que preguntar si consiente es true. Un boolean ya es una respuesta de sí o no.

#### Repaso 2 · Rellena el hueco · `s03-d03-x2` · concepto if-else

La IA ha puesto la condición al revés y dice «Fuera de plazo» con 10 días. Completa con el signo correcto (el plazo interno es de 30 días).

```ts
const dias = 10;
if (dias ___ 30) {
  console.log("En plazo");
} else {
  console.log("Fuera de plazo");
}
```

Objetivo: `En plazo`

- ✅ `<=`: Correcto: 10 días es menor o igual que 30.
- ▫️ `>`: Esa es la condición al revés: 10 > 30 es false y saldría «Fuera de plazo».
- ▫️ `>=`: También al revés: pregunta si se ha pasado del plazo.

Pistas: 1) ¿En plazo significa por debajo o por encima de 30? 2) Por debajo o igual: «menor o igual». 3) Es <=.

Explicación: Para revisar una condición, léela en voz alta: «si los días son menores o iguales que 30, en plazo». Si suena raro, está al revés.

#### Repaso 3 · ¿Quién tiene razón? (Revisión) · `s03-rev-x2` · concepto comparaciones

Han pasado justo 72 horas desde que conociste la brecha. La IA y Marta discuten qué imprime este código. ¿Quién tiene razón?

```ts
const horas = 72;
if (horas < 72) {
  console.log("A tiempo");
} else {
  console.log("Fuera de plazo");
}
```

- La IA: Imprime `A tiempo`. (El plazo es de 72 horas y han pasado 72.)
- Marta: Imprime `Fuera de plazo`. (72 no es menor que 72, así que va por el `else`.)

Correcta: Marta

Pistas: 1) No preguntes qué debería salir, sino qué sale. 2) `<` es «menor que», sin el igual. 3) ¿Es 72 menor que 72?

Explicación: Imprime `Fuera de plazo`. Marta acierta sobre lo que hace el código, y la IA sobre lo que debería hacer: el artículo 33 habla de notificar «a más tardar» a las 72 horas, así que con 72 aún estás a tiempo. El arreglo es `horas <= 72`. Revisar es comprobar las dos cosas: qué hace y qué debería hacer.

---

## Día 4: Varios caminos: else if

**Objetivo:** Hoy aprendes a clasificar un caso en varios niveles con else if, y por qué el orden de las preguntas cambia el resultado.

### Microlección

**Pantalla 1 · pasoapaso**

```ts
const afectados = 500;
if (afectados > 1000) {
  console.log("Riesgo alto");
} else if (afectados > 100) {
  console.log("Riesgo medio");
} else {
  console.log("Riesgo bajo");
}
```

- Línea 1: {"afectados":"500"} · Una brecha con 500 personas afectadas. (Regla inventada para practicar, no un criterio legal.)
- Línea 2: {"afectados":"500"} · Primera pregunta: ¿más de 1000? No. Pasa a la siguiente.
- Línea 4: {"afectados":"500"} · Segunda pregunta: ¿más de 100? Sí.
- Línea 5: {"afectados":"500"} · Ejecuta ese camino y ya no mira el resto.

**Pantalla 2 · texto**

Con `else if` («si no, si…») encadenas preguntas. El programa las hace **en orden, de arriba abajo**, y se queda con la **primera** que da true. El `else` final recoge todo lo demás.

**Pantalla 3 · codigo**

```ts
const afectados = 5000;
if (afectados > 100) {
  console.log("Riesgo medio");
} else if (afectados > 1000) {
  console.log("Riesgo alto");
}
```

Salida: `Riesgo medio`

Las mismas preguntas en mal orden: 5000 afectados salen como riesgo **medio**, porque «más de 100» se cumple primero y gana. «Riesgo alto» no saldría nunca. Regla: de la condición más exigente a la menos.

**Pantalla 4 · texto**

Para revisar una cadena de `else if`, pregúntate: ¿hay algún valor que caiga en el camino equivocado? ¿Algún camino al que no se pueda llegar nunca? Si lo hay, el orden está mal.

**Pantalla 5 · deiure**

DeIure decide qué escribir en la «miga de pan» (la ruta que ves arriba en la pantalla) con una cadena de else if, según la página en la que estés:

```ts
} else if (parts[4] === 'apartado-graph') {
  segments.push({ label: 'Grafo EIPD' });
} else if (parts[4] === 'exportar') {
  segments.push({ label: 'Exportación' });
}
```

`DeIure/src/lib/nav-breadcrumb.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s03-d04-r1` · concepto if-else

¿Qué escribe este programa con 50 afectados?

```ts
const afectados = 50;
if (afectados > 1000) {
  console.log("Alto");
} else if (afectados > 100) {
  console.log("Medio");
} else {
  console.log("Bajo");
}
```

- ✅ `Bajo`: Eso es: ninguna pregunta da true, así que va al else.
- ▫️ `Medio`: 50 no es mayor que 100.
- ▫️ `Medio ⏎ Bajo`: Solo se ejecuta un camino, el primero que se cumple o el else.

Pistas: 1) Haz las preguntas en orden con 50. 2) ¿50 > 1000? No. ¿50 > 100? No. 3) Si ninguna se cumple, va al else.

Explicación: El else final es el «en cualquier otro caso».

#### Reto 2 · Rellena el hueco · `s03-d04-r2` · concepto if-else

Completa para que 75 sea «Notable».

```ts
const nota = 75;
if (nota >= 90) {
  console.log("Sobresaliente");
} ___ (nota >= 70) {
  console.log("Notable");
} else {
  console.log("Otro");
}
```

Objetivo: `Notable`

- ✅ `else if`: Correcto: «si no, si».
- ▫️ `else`: else no lleva condición: así no se entiende.
- ▫️ `elif`: elif existe en Python, que verás más adelante, pero no en TypeScript: aquí da error.

Pistas: 1) Entre dos caminos con condición va otra pregunta. 2) Esa pregunta empieza por «si no, si». 3) Son dos palabras: else if.

Explicación: if abre la cadena, else if añade preguntas y else cierra con el resto.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s03-rev-4` · concepto if-else

La IA ha escrito esto para clasificar un riesgo por puntos (más de 6, alto; más de 3, medio). La IA y Marta discuten qué imprime con 8 puntos. ¿Quién tiene razón?

```ts
const puntos = 8;
if (puntos > 3) {
  console.log("Riesgo medio");
} else if (puntos > 6) {
  console.log("Riesgo alto");
} else {
  console.log("Riesgo bajo");
}
```

- La IA: Imprime `Riesgo alto`. (8 es mayor que 6.)
- Marta: Imprime `Riesgo medio`. (Se comprueban de arriba abajo, y gana la primera condición que se cumple. 8 ya es mayor que 3.)

Correcta: Marta

Pistas: 1) Empieza por arriba: ¿se cumple `puntos > 3`? 2) En una cadena `if` / `else if` / `else`, solo se ejecuta un camino. 3) Si la primera condición ya se cumple, ¿se mira la segunda?

Explicación: Imprime `Riesgo medio`, aunque con 8 puntos tendría que ser alto. El código no hace lo que la IA quería: con este orden, «alto» no saldrá nunca. Se arregla preguntando primero por lo más alto (`puntos > 6`) y luego por lo de en medio.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s03-d04-x1` · concepto if-else

¿Qué escribe este programa?

```ts
const dias = 45;
if (dias > 30) {
  console.log("Pedir prórroga");
} else if (dias > 60) {
  console.log("Fuera de plazo");
}
```

- ✅ `Pedir prórroga`: Eso es: 45 > 30 se cumple primero y ya no mira el resto.
- ▫️ `Fuera de plazo`: 45 no es mayor que 60.
- ▫️ `Pedir prórroga ⏎ Fuera de plazo`: Solo se ejecuta el primer camino que se cumple.

Pistas: 1) ¿Cuál es la primera pregunta que da true? 2) 45 > 30 es true. 3) Con eso basta: ya no mira el else if.

Explicación: Fíjate: con 90 días también diría «Pedir prórroga», porque > 30 va antes que > 60. El orden está mal y «Fuera de plazo» no saldría nunca.

#### Repaso 2 · ¿Qué imprime? · `s03-d04-x2` · concepto if-else

¿Qué escribe este programa?

```ts
const t = 20;
if (t >= 30) {
  console.log("Calor");
} else if (t >= 15) {
  console.log("Templado");
} else {
  console.log("Frío");
}
```

- ✅ `Templado`: Eso es: no llega a 30, pero sí a 15.
- ▫️ `Frío`: 20 >= 15 es true: no llega al else.
- ▫️ `Calor`: 20 >= 30 es false.

Pistas: 1) Pregunta por pregunta, con 20. 2) ¿20 >= 30? No. ¿20 >= 15? Sí. 3) El segundo camino.

Explicación: Aquí el orden es correcto: de la condición más exigente (30) a la menos (15).

---

## Día 5: Dos requisitos a la vez: &&

**Objetivo:** Hoy aprendes a exigir dos condiciones a la vez con && y a comprobar que no falta ninguna.

### Microlección

**Pantalla 1 · codigo**

```ts
const edad = 15;
const marcada = true;
console.log(edad >= 14 && marcada);
```

Salida: `true`

`&&` significa «y»: da true solo si **las dos** partes son true. Aquí, una app que pide tener al menos 14 años **y** marcar la casilla de aceptación.

**Pantalla 2 · pasoapaso**

```ts
const edad = 13;
const marcada = true;
if (edad >= 14 && marcada) {
  console.log("Alta completa");
} else {
  console.log("Faltan requisitos");
}
```

- Línea 1: {"edad":"13"} · Tiene 13 años.
- Línea 2: {"edad":"13","marcada":"true"} · Ha marcado la casilla.
- Línea 3: {"edad":"13","marcada":"true"} · ¿13 >= 14? No. Con una parte false, && ya es false, aunque la otra sea true.
- Línea 6: {"edad":"13","marcada":"true"} · Va al else.

**Pantalla 3 · texto**

Piensa en `&&` como **requisitos acumulativos**, igual que los del artículo 1261 del Código Civil para que haya contrato (consentimiento, objeto y causa): si falta uno, no hay contrato.

**Pantalla 4 · texto**

El `&` se escribe en el Mac con **Mayúsculas + 6**, y hay que ponerlo dos veces. Al revisar código de una IA, comprueba que la condición pide **todos** los requisitos de la regla, ni uno menos.

**Pantalla 5 · deiure**

Minimización de datos en DeIure: si una figura del apartado 4 es un interesado **y** además trae una referencia a su identidad, se rechaza, porque los interesados se describen como texto libre, sin identificarlos.

```ts
if (figura.tipo === 'interesado' && figura.identity_ref) {
```

`DeIure/src/lib/apartado-input-schemas.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s03-d05-r1` · concepto logicos

¿Qué escribe este programa?

```ts
const a = 5;
console.log(a > 3 && a < 10);
console.log(a > 3 && a > 10);
```

- ✅ `true ⏎ false`: Eso es: 5 está entre 3 y 10, pero no es mayor que 10.
- ▫️ `true ⏎ true`: En la segunda, a > 10 es false, y con una parte false, && da false.
- ▫️ `false ⏎ false`: En la primera se cumplen las dos partes: true.

Pistas: 1) Evalúa cada parte por separado. 2) && solo da true si las dos partes son true. 3) En la segunda, 5 > 10 es false.

Explicación: a > 3 && a < 10 es la forma de preguntar «¿está entre 3 y 10?».

#### Reto 2 · Rellena el hueco · `s03-d05-r2` · concepto logicos

Una transferencia solo sigue adelante si hay contrato firmado y garantías. Completa para que escriba «Bloquear».

```ts
const contrato = true;
const garantias = false;
if (contrato ___ garantias) {
  console.log("Seguir");
} else {
  console.log("Bloquear");
}
```

Objetivo: `Bloquear`

- ✅ `&&`: Correcto: hacen falta las dos, y falta una.
- ▫️ `||`: || («o») daría true con una sola, y dejaría seguir sin garantías.
- ▫️ `y`: En código, «y» no se escribe con letras: es &&.

Pistas: 1) ¿Hacen falta las dos cosas o basta con una? 2) Requisitos acumulativos: «y». 3) «y» se escribe con dos &.

Explicación: Con &&, si falta un requisito, no se sigue. Elegir mal entre && y || deja pasar casos que no deberían.

#### Reto 3 · Caza el fallo (Revisión) · `s03-rev-5` · concepto logicos

La regla de la app: puede registrarse quien tenga 14 años o más **y** marque la casilla de consentimiento. Este usuario tiene 15 años y no la ha marcado. Toca la línea que está mal.

```ts
const edad = 15;
const marcaCasilla = false;
if (edad >= 14) {
  console.log("Puede registrarse");
}
```

- ✅ `Solo comprueba la edad. Falta exigir también la casilla: `edad >= 14 && marcaCasilla`.`: Exacto. La regla tiene dos condiciones y el código solo mira una.
- ▫️ `Tenía que ser `edad > 14`.`: La regla dice «14 o más», y eso es `>=`. El fallo es otro: ¿qué pasa con la casilla?
- ▫️ ``false` tendría que ir entre comillas.`: `false` sin comillas es justo lo que queremos: verdadero o falso. Con comillas sería un texto.

Pistas: 1) ¿Se usa `marcaCasilla` en algún sitio? 2) `&&` exige que se cumplan las dos condiciones a la vez. 3) La regla tiene dos condiciones. ¿Cuántas hay en el `if`?

Explicación: Imprime `Puede registrarse` sin consentimiento. La IA ha olvidado una condición, y la pista estaba a la vista: `marcaCasilla` se crea y nunca se usa. Cuando revises, compara la regla con la condición pieza a pieza.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s03-d05-x1` · concepto logicos

¿Qué escribe este programa?

```ts
const x = true;
const y = true;
const z = false;
console.log(x && y);
console.log(x && z);
```

- ✅ `true ⏎ false`: Eso es: x e y son true; z es false.
- ▫️ `true ⏎ true`: z es false: x && z da false.
- ▫️ `false ⏎ false`: x && y: los dos son true, así que da true.

Pistas: 1) Mira qué vale cada caja. 2) && da true solo si las dos son true. 3) La segunda tiene un false.

Explicación: Basta con un false para que && sea false.

#### Repaso 2 · Ordena las líneas · `s03-d05-x2` · concepto logicos

Ordena las líneas para que escriba exactamente esto.

Líneas (orden correcto):

```ts
const n = 7;
const enRango = n > 0 && n < 10;
console.log(enRango);
```

Sobran: `const enRango = n > 0 && n > 10;`

Objetivo: `true`

Pistas: 1) enRango se calcula a partir de n. 2) Primero n, luego el cálculo, luego el mensaje. 3) La que sobra pide que n sea mayor que 10.

Explicación: El resultado de una comparación se puede guardar en una caja, como cualquier otro dato.

---

## Día 6: Basta con una: || y !

**Objetivo:** Hoy aprendes a usar || cuando basta con que se cumpla una condición, y ! para darle la vuelta a un true o un false.

### Microlección

**Pantalla 1 · pasoapaso**

```ts
const salud = true;
const menor = false;
if (salud || menor) {
  console.log("Más garantías");
}
```

- Línea 1: {"salud":"true"} · El tratamiento incluye datos de salud (una categoría especial del art. 9 RGPD).
- Línea 2: {"salud":"true","menor":"false"} · No afecta a menores.
- Línea 3: {"salud":"true","menor":"false"} · `||` significa «o»: basta con que una sea true. salud lo es.
- Línea 4: {"salud":"true","menor":"false"} · Entra en el if.

**Pantalla 2 · texto**

`||` («o») da true si **al menos una** parte es true, y solo da false si fallan todas. Es un requisito **alternativo**: cualquiera de los supuestos basta. La barra `|` se escribe en el Mac con **Alt + 1**, dos veces.

**Pantalla 3 · codigo**

```ts
const notificada = false;
console.log(!notificada);
console.log(!true);
```

Salida: `true` / `false`

`!` significa «no»: le da la vuelta al valor. `!notificada` se lee «no notificada», y es true cuando la brecha **aún no** se ha notificado.

**Pantalla 4 · texto**

Resumen para revisar condiciones: `&&` cuando hacen falta **todas**; `||` cuando basta **una**; `!` para preguntar lo contrario. Si una IA cambia `&&` por `||`, el programa deja pasar casos que no debería, y no da ningún error.

**Pantalla 5 · deiure**

DeIure solo acepta números de apartado de la EIPD del 1 al 14. La condición se lee: «si **no** es un número entero, **o** es menor que 1, **o** mayor que 14, no vale».

```ts
if (!Number.isInteger(num) || num < 1 || num > 14) return null;
```

`DeIure/src/lib/eipd-state.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s03-d06-r1` · concepto logicos

¿Qué escribe este programa?

```ts
const a = false;
const b = false;
console.log(a || b);
console.log(!a || b);
```

- ✅ `false ⏎ true`: Eso es: las dos son false; pero !a es true, y con una basta.
- ▫️ `false ⏎ false`: En la segunda, !a le da la vuelta a a: es true.
- ▫️ `true ⏎ true`: En la primera, las dos son false: || da false.

Pistas: 1) || da false solo si todas las partes son false. 2) !a es lo contrario de a. 3) a es false, así que !a es true.

Explicación: || necesita al menos un true. ! convierte un false en true.

#### Reto 2 · Rellena el hueco · `s03-d06-r2` · concepto logicos

Completa para que avise mientras la brecha NO esté notificada.

```ts
const notificada = false;
if (___) {
  console.log("Notificar ya");
}
```

Objetivo: `Notificar ya`

- ✅ `!notificada`: Correcto: «no notificada» es true.
- ▫️ `notificada`: notificada vale false: no entraría en el if.
- ▫️ `notificada === true`: Eso pregunta si ya está notificada: es la condición al revés.

Pistas: 1) Quieres entrar cuando notificada es false. 2) Para darle la vuelta a un valor se usa !. 3) Es !notificada.

Explicación: ! delante de un boolean pregunta lo contrario. Se lee «no».

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s03-rev-6` · concepto logicos

La IA y Marta discuten qué imprime este código. ¿Quién tiene razón?

```ts
const notificada = false;
if (!notificada) {
  console.log("Falta notificar");
}
```

- Marta: No imprime nada. (`notificada` es `false`, y con `false` no se entra en el `if`.)
- La IA: Imprime `Falta notificar`. (`!` le da la vuelta: `!false` es `true`, así que entra en el `if`.)

Correcta: La IA

Pistas: 1) Fíjate en el signo que hay delante de `notificada`. 2) `!` significa «no»: convierte `true` en `false` y `false` en `true`. 3) ¿Cuánto vale `!false`?

Explicación: Imprime `Falta notificar`. Léelo en voz alta: «si no notificada, avisa». El `!` es pequeño y fácil de pasar por alto al revisar; en una condición, búscalo siempre.

### Repaso (reserva)

#### Repaso 1 · Rellena el hueco · `s03-d06-x1` · concepto logicos

Entre otros casos, el art. 35.3 RGPD exige EIPD si se tratan a gran escala categorías especiales de datos o si se observa sistemáticamente a gran escala una zona de acceso público. Completa para que escriba «Hacer EIPD».

```ts
const especiales = false;
const zonaPublica = true;
if (especiales ___ zonaPublica) {
  console.log("Hacer EIPD");
}
```

Objetivo: `Hacer EIPD`

- ✅ `||`: Correcto: basta con uno de los dos supuestos.
- ▫️ `&&`: Con && harían falta los dos, y aquí solo se da uno.
- ▫️ `o`: En código, «o» no se escribe con letras: es ||.

Pistas: 1) ¿Hacen falta los dos supuestos o basta con uno? 2) Basta con uno: «o». 3) «o» se escribe con dos barras.

Explicación: Supuestos alternativos, ||; requisitos acumulativos, &&.

#### Repaso 2 · ¿Qué imprime? · `s03-d06-x2` · concepto logicos

¿Qué escribe este programa?

```ts
const cerrado = true;
console.log(!cerrado);
console.log(!!cerrado);
```

- ✅ `false ⏎ true`: Eso es: ! le da la vuelta, y !! se la da dos veces.
- ▫️ `false ⏎ false`: Dos ! se anulan: «no no cerrado» es «cerrado».
- ▫️ `true ⏎ true`: !cerrado es lo contrario de true: false.

Pistas: 1) ! le da la vuelta a true. 2) Dos ! le dan la vuelta dos veces. 3) Vuelve a quedar como estaba.

Explicación: Como una doble negación en un texto legal: «no es incierto» significa «es cierto». En código lo verás, pero mejor evitarlo.

#### Repaso 3 · Caza el fallo (Revisión) · `s03-rev-x3` · concepto logicos

Le pediste a la IA: «Marca la brecha como prioritaria solo si es grave **y** afecta a datos de salud». Esta no es grave. Toca la línea que está mal.

```ts
const grave = false;
const salud = true;
if (grave || salud) {
  console.log("Prioritaria");
}
```

- ✅ `Usa `||` (o) cuando la regla dice «y». Tenía que ser `grave && salud`.`: Exacto. Con `||` basta con una condición; la regla exige las dos.
- ▫️ `Hay que comparar: `grave === true || salud === true`.`: Eso hace lo mismo que el original y sigue estando mal. El problema es el `||`.
- ▫️ `Falta un `else` que diga «No avisar».`: Un `else` añadiría un mensaje, pero `Prioritaria` seguiría saliendo cuando no toca.

Pistas: 1) La brecha no es grave. ¿Debería salir como prioritaria? 2) `&&` es «y»: las dos. `||` es «o»: con una basta. 3) La regla dice «y». ¿Qué dice el código?

Explicación: Imprime `Prioritaria` aunque la brecha no es grave. Confundir «y» con «o» es de los fallos más frecuentes al pasar una regla a código. Traduce la regla palabra a palabra: «y» es `&&`, «o» es `||`.

---

## Día 7: Píldora: lógica de verdadero y falso (píldora de informática)

**Objetivo:** Hoy aprendes a calcular cualquier combinación de &&, || y ! con tablas de verdad, la herramienta con la que se revisan condiciones complicadas.

### Microlección

**Pantalla 1 · texto**

En 1854, George Boole demostró que se puede razonar con solo dos valores, verdadero y falso, y unas pocas operaciones. Por eso se llaman **booleanos**. Cada `if` de cada programa, y cada circuito del procesador, usa su lógica.

**Pantalla 2 · codigo**

```ts
console.log(true && true);
console.log(true && false);
console.log(false && true);
console.log(false && false);
```

Salida: `true` / `false` / `false` / `false`

Esto es la **tabla de verdad** de `&&`: todas las combinaciones posibles. Solo da true en la primera fila, cuando las dos son true.

**Pantalla 3 · codigo**

```ts
console.log(true || true);
console.log(true || false);
console.log(false || true);
console.log(false || false);
```

Salida: `true` / `true` / `true` / `false`

La de `||` es la imagen inversa: solo da false en la última fila, cuando las dos son false.

**Pantalla 4 · codigo**

```ts
const a = true;
const b = false;
console.log(!(a && b));
console.log(!a || !b);
```

Salida: `true` / `true`

Dos reglas para revisar código. 1) `&&` va antes que `||`, como `*` antes que `+`; si dudas, pon paréntesis. 2) **Ley de De Morgan**: «no (A y B)» es lo mismo que «(no A) o (no B)». Al negar, el «y» se convierte en «o». Es justo donde más se equivocan las IA.

**Pantalla 5 · deiure**

DeIure avisa si el campo del email del delegado de protección de datos existe pero está vacío: «el campo existe **y** **no** hay email».

```ts
if (root.dpo.email !== undefined && !email) {
```

`DeIure/src/lib/apartado-04-normalizer.ts`

**Pantalla 6 · terminal**

```
$ cat hola.ts
const nombre = "Daniel";
console.log("Hola,", nombre);
```

**Comando de la semana: cat, less y nano.** `cat` vuelca un fichero en la terminal; `less` lo enseña página a página (sales con `q`); `nano` lo abre para editarlo sin salir de la terminal. **Minirreto en tu Mac:** en `practica`, haz `nano hola.ts`, cambia `"Daniel"` por otro nombre, guarda con `Ctrl + O` y Enter, sal con `Ctrl + X` y comprueba con `cat hola.ts` que el cambio está. Después, `node hola.ts` debe saludar al nombre nuevo.

### Retos

#### Reto 1 · ¿Qué imprime? · `s03-d07-r1` · concepto logica-booleana

¿Qué escribe este programa?

```ts
console.log(true && !false);
console.log(!(true || false));
```

- ✅ `true ⏎ false`: Eso es: !false es true; y true || false es true, que negado da false.
- ▫️ `false ⏎ false`: !false es true, así que la primera es true && true.
- ▫️ `true ⏎ true`: En la segunda, el ! niega todo el paréntesis, que vale true.

Pistas: 1) Resuelve primero lo de dentro: !false y el paréntesis. 2) !false = true. (true || false) = true. 3) Luego: true && true, y !true.

Explicación: Con expresiones largas, resuelve de dentro hacia fuera, como en matemáticas.

#### Reto 2 · Rellena el hueco · `s03-d07-r2` · concepto logica-booleana

Completa con la operación cuya tabla de verdad da false en esta fila.

```ts
const a = true;
const b = false;
console.log(a ___ b);
```

Objetivo: `false`

- ✅ `&&`: Correcto: && necesita las dos true, y b es false.
- ▫️ `||`: || da true con que una sea true, y a lo es.
- ▫️ `!==`: true !== false es true: son distintos.

Pistas: 1) a es true y b es false. 2) ¿Cuál de las dos tablas da false con una sola true? 3) La de «y».

Explicación: Con una parte true y otra false, && da false y || da true. Esa fila es la que distingue las dos tablas.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s03-rev-7` · concepto logica-booleana

La IA y Marta discuten qué imprime esta línea. ¿Quién tiene razón?

```ts
console.log(true && false || true);
```

- La IA: Imprime `false`. (Hay un `false`, así que todo es falso.)
- Marta: Da un error. (No se pueden mezclar `&&` y `||` en la misma línea.)

Correcta: ninguno

Pistas: 1) Se resuelve por partes: primero el `&&`. 2) `&&` necesita los dos verdaderos. `||` se conforma con uno. 3) ¿Cuánto da `true && false`? ¿Y eso `|| true`?

Explicación: Imprime `true`. Paso a paso: `true && false` da `false`, y `false || true` da `true`. Es la tabla de verdad de la píldora de hoy. Cuando mezcles `&&` y `||`, pon paréntesis para que se lea a la primera.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s03-d07-x1` · concepto logica-booleana

Ley de De Morgan. ¿Qué escribe este programa?

```ts
const a = false;
const b = false;
console.log(!(a || b));
console.log(!a && !b);
```

- ✅ `true ⏎ true`: Eso es: las dos expresiones son equivalentes, siempre dan lo mismo.
- ▫️ `true ⏎ false`: !a y !b son true, así que !a && !b es true.
- ▫️ `false ⏎ false`: a || b es false, y negado es true.

Pistas: 1) Calcula a || b y luego niégalo. 2) !a es true y !b es true. 3) Las dos líneas dan lo mismo.

Explicación: «no (A o B)» es «(no A) y (no B)». Al negar, el «o» se convierte en «y».

#### Repaso 2 · ¿Qué imprime? · `s03-d07-x2` · concepto logica-booleana

&& va antes que ||. ¿Qué escribe este programa?

```ts
console.log(false && true || true);
```

- ✅ `true`: Eso es: primero false && true = false; luego false || true = true.
- ▫️ `false`: Eso sería false && (true || true). Sin paréntesis, && va primero.
- ▫️ `false && true || true`: Sin comillas no es texto: se calcula.

Pistas: 1) ¿Qué se calcula antes, && o ||? 2) && va antes, como * antes que +. 3) (false && true) || true.

Explicación: Si una condición mezcla && y ||, pon paréntesis aunque no hagan falta: el siguiente que la lea, tú o una IA, no tendrá que adivinar.

