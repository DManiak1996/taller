# Semana 2: vista previa

Generado desde los JSON. Para revisar el contenido sin abrir el formato.

---

## Día 1: Tres tipos de dato

**Objetivo:** Hoy aprendes a reconocer los tres tipos de dato básicos (texto, número y verdadero o falso) y a preguntar a un programa de qué tipo es algo con typeof.

### Microlección

**Pantalla 1 · texto**

Cada dato tiene un **tipo**, igual que en un expediente no es lo mismo una fecha que un nombre. Los tres básicos son **texto** (`string`), **número** (`number`) y **verdadero o falso** (`boolean`).

**Pantalla 2 · codigo**

```ts
const responsable = "Clínica Arga"; // texto
const afectados = 150; // número
const notificada = true; // verdadero o falso
console.log(responsable, afectados, notificada);
```

Salida: `Clínica Arga 150 true`

Lo que va detrás de `//` es un **comentario**: una nota para personas que el ordenador ignora. `true` (verdadero) y `false` (falso) van **sin comillas**.

**Pantalla 3 · codigo**

```ts
console.log(typeof 150);
console.log(typeof "Clínica Arga");
console.log(typeof true);
console.log(typeof "150");
```

Salida: `number` / `string` / `boolean` / `string`

`typeof` pregunta el tipo de un dato. Fíjate en el último: "150" lleva comillas, así que es texto aunque parezca un número.

**Pantalla 4 · texto**

En TypeScript puedes escribir el tipo junto a la caja: `const afectados: number = 150;`. Si después alguien, o una IA, intenta guardar ahí un texto, el editor lo subraya en rojo **antes de ejecutar**. Para eso sirve el «Type» de TypeScript.

**Pantalla 5 · deiure**

DeIure usa un boolean como interruptor: con `false`, una función está apagada. Para encenderla bastaría con cambiar esta línea a `true`.

```ts
export const EIPD_HIDDEN_GENERATION_ENABLED = false;
```

`DeIure/src/lib/apartado-generate-request.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s02-d01-r1` · concepto tipos

¿Qué escribe este programa?

```ts
console.log(typeof 72);
console.log(typeof "72");
```

- ✅ `number ⏎ string`: Eso es: el primero es un número; el segundo lleva comillas y es texto.
- ▫️ `number ⏎ number`: El segundo 72 va entre comillas: para el programa es texto.
- ▫️ `string ⏎ string`: El primero va sin comillas: es un número de verdad.
- ▫️ `72 ⏎ 72`: typeof no escribe el dato, sino su tipo.

Pistas: 1) Compara las dos líneas: solo cambian las comillas. 2) Sin comillas es number; con comillas es string. 3) La primera línea de salida es number.

Explicación: Las comillas deciden el tipo: 72 es un número y "72" es un texto. Esta diferencia es la raíz del fallo de esta semana.

#### Reto 2 · ¿Quién tiene razón? (Revisión) · `s02-rev-1` · concepto tipos

La IA y Marta discuten qué pasa con este código. ¿Quién tiene razón?

```ts
const notificada = "false";
console.log(notificada);
```

- La IA: Da un error. (`false` es verdadero o falso, y eso nunca va entre comillas.)
- Marta: No imprime nada. (El valor es falso, así que no hay nada que imprimir.)

Correcta: ninguno

Pistas: 1) Fíjate en las comillas de la línea 1. 2) Todo lo que va entre comillas es texto, diga lo que diga. 3) Si `notificada` es un texto, ¿qué hace `console.log` con un texto?

Explicación: Imprime `false`. Parece el valor falso, pero es el texto «false», porque va entre comillas. En pantalla se ven igual; para el programa son tipos distintos, y la semana que viene verás que eso cambia las decisiones que toma. A veces ninguna de las dos opiniones es la buena: **compruébalo tú**.

#### Reto 3 · Ordena las líneas · `s02-d01-r2` · concepto tipos

En España, desde los 14 años se puede consentir el tratamiento de datos. Ordena las líneas para que escriba esto. Ojo: sobra una.

Líneas (orden correcto):

```ts
const edad = 14;
console.log(typeof edad);
console.log(edad);
```

Sobran: `const edad = "14";`

Objetivo: `number` / `14`

Pistas: 1) La primera línea de la salida es el tipo de edad. 2) Si sale number, la edad se guardó sin comillas. 3) const edad = 14; y luego los dos console.log en el orden de la salida.

Explicación: Las dos versiones de edad escriben 14, pero solo una es un número. typeof te dice cuál.

### Repaso (reserva)

#### Repaso 1 · Rellena el hueco · `s02-d01-x1` · concepto tipos

Completa para que el dato sea un verdadero o falso y el programa escriba «boolean».

```ts
const consentimiento = ___;
console.log(typeof consentimiento);
```

Objetivo: `boolean`

- ✅ `true`: Correcto: true, sin comillas, es un boolean.
- ▫️ `"true"`: Con comillas es el texto «true», no un boolean.
- ▫️ `"sí"`: Es un texto. Un boolean solo puede ser true o false, sin comillas.
- ▫️ `verdadero`: El lenguaje solo entiende true y false, en inglés. verdadero sería el nombre de una caja que no existe.

Pistas: 1) Un boolean solo tiene dos valores posibles. 2) Son true y false, en inglés y sin comillas. 3) La respuesta es la que no lleva comillas y está en inglés.

Explicación: true y false son valores del lenguaje, no textos. Con comillas dejan de ser boolean.

#### Repaso 2 · ¿Qué imprime? · `s02-d01-x2` · concepto tipos

¿Qué escribe este programa?

```ts
const activo = false;
console.log(activo, typeof activo);
```

- ✅ `false boolean`: Eso es: el dato y, separado por un espacio, su tipo.
- ▫️ `activo boolean`: activo sin comillas es la caja: se escribe su contenido, false.
- ▫️ `false string`: false sin comillas es un boolean.

Pistas: 1) console.log escribe dos cosas separadas por un espacio. 2) La primera es el contenido de la caja; la segunda, su tipo. 3) El contenido es false, sin comillas.

Explicación: Un boolean se escribe como true o false, y su tipo es boolean.

---

## Día 2: Calcular con números

**Objetivo:** Hoy aprendes a sumar, restar, multiplicar y dividir en un programa, y a usar paréntesis para decidir qué se calcula primero.

### Microlección

**Pantalla 1 · codigo**

```ts
console.log(72 + 24);
console.log(72 - 24);
console.log(72 * 2);
console.log(72 / 24);
```

Salida: `96` / `48` / `144` / `3`

Sumar `+`, restar `-`, multiplicar `*` (asterisco) y dividir `/` (barra).

**Pantalla 2 · codigo**

```ts
console.log(2 + 3 * 4);
console.log((2 + 3) * 4);
```

Salida: `14` / `20`

Como en el colegio: primero `*` y `/`, después `+` y `-`. Los **paréntesis** mandan sobre todo lo demás.

**Pantalla 3 · pasoapaso**

```ts
let multas = 0;
multas = multas + 3000;
multas = multas + 1500;
console.log(multas);
```

- Línea 1: {"multas":"0"} · La caja empieza en 0.
- Línea 2: {"multas":"3000"} · Primero calcula la derecha (0 + 3000) y luego guarda el resultado en multas.
- Línea 3: {"multas":"4500"} · Otra vez: 3000 + 1500, y lo guarda.
- Línea 4: {"multas":"4500"} · Así se acumula un total.

**Pantalla 4 · texto**

Los decimales se escriben con **punto**, no con coma: `2.5`. Y los números grandes, sin puntos de miles: `20000000`. Si quieres leerlo mejor, puedes separar con guion bajo: `20_000_000`.

**Pantalla 5 · deiure**

DeIure limita el tamaño de los PDF que se suben. En vez de escribir 62914560, lo calcula: 60 × 1024 × 1024 bytes, es decir, 60 megas. Así cualquiera entiende de dónde sale.

```ts
export const MAX_PDF_SIZE_BYTES = 60 * 1024 * 1024;
```

`DeIure/src/lib/file-validation.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s02-d02-r1` · concepto operaciones

¿Qué escribe este programa?

```ts
console.log(10 + 2 * 5);
```

- ✅ `20`: Eso es: primero 2 × 5 = 10, y luego 10 + 10.
- ▫️ `60`: Eso sería (10 + 2) × 5. Sin paréntesis, la multiplicación va primero.
- ▫️ `10 + 2 * 5`: Sin comillas no es texto: el programa calcula.

Pistas: 1) ¿Qué se hace antes, sumar o multiplicar? 2) Primero * y /, después + y -. 3) 2 * 5 = 10. ¿Y 10 + 10?

Explicación: El orden de las operaciones es el de las matemáticas. Si quieres otro, pon paréntesis.

#### Reto 2 · Caza el fallo (Revisión) · `s02-rev-2` · concepto operaciones

Le pediste a la IA: «Calcula la nota media de dos exámenes, un 6 y un 8». Tenía que salir 7. Toca la línea que está mal.

```ts
const examen1 = 6;
const examen2 = 8;
const media = examen1 + examen2 / 2;
console.log(media);
```

- ✅ `Primero se divide y luego se suma, como en matemáticas. Faltan paréntesis: `(examen1 + examen2) / 2`.`: Exacto. Divide 8 entre 2 y suma 6: sale 10. Los paréntesis obligan a sumar primero.
- ▫️ `Para dividir hay que usar `:` en lugar de `/`.`: En programación se divide con `/`. El símbolo está bien; el problema es en qué orden se hacen las operaciones.
- ▫️ `Las notas tendrían que ir entre comillas.`: Con comillas serían textos, y entonces sí que no podrías calcular. Son números y van sin comillas.

Pistas: 1) Calcula a mano lo que hace la línea 3. ¿Sale 7? 2) Como en matemáticas: primero multiplicaciones y divisiones, después sumas y restas. 3) ¿Qué se divide entre 2: la suma o solo el segundo examen?

Explicación: Imprime `10`, no `7`. El programa divide primero (8 / 2 = 4) y luego suma (6 + 4). No da error, solo un número equivocado: por eso hay que **comprobar el resultado con un caso que sepas calcular a mano**.

#### Reto 3 · Ordena las líneas · `s02-d02-r2` · concepto operaciones

Ordena las líneas para que escriba exactamente esto.

Líneas (orden correcto):

```ts
let total = 100;
total = total * 2;
total = total + 10;
console.log(total);
```

Objetivo: `210`

Pistas: 1) 210 = 200 + 10. ¿Qué se hizo primero? 2) Primero se duplica (100 × 2) y después se suma 10. 3) let, multiplicar, sumar, console.log.

Explicación: Las mismas operaciones en otro orden dan otro resultado: sumar primero daría 220.

### Repaso (reserva)

#### Repaso 1 · Rellena el hueco · `s02-d02-x1` · concepto operaciones

Completa para saber cuántos días son 48 horas.

```ts
const horas = 48;
console.log(horas ___ 24);
```

Objetivo: `2`

- ✅ `/`: Correcto: 48 entre 24 son 2 días.
- ▫️ `*`: Eso multiplica: saldría 1152.
- ▫️ `-`: Eso resta: saldría 24.
- ▫️ `÷`: El símbolo de dividir en código es la barra /.

Pistas: 1) Para pasar de horas a días, ¿multiplicas o divides? 2) Divides entre 24. 3) Dividir se escribe con la barra.

Explicación: En código, dividir es / y multiplicar es *. Los símbolos ÷ y × no existen.

#### Repaso 2 · ¿Qué imprime? · `s02-d02-x2` · concepto operaciones

¿Qué escribe este programa?

```ts
console.log(7 / 2);
```

- ✅ `3.5`: Eso es: divide con decimales, y el decimal se escribe con punto.
- ▫️ `3`: No redondea: da el resultado exacto.
- ▫️ `3,5`: El programa escribe el decimal con punto, no con coma.

Pistas: 1) ¿Redondea o da el resultado exacto? 2) Da el resultado exacto, con decimales. 3) Los decimales llevan punto.

Explicación: / da el resultado exacto, con decimales, y siempre con punto decimal.

#### Repaso 3 · Caza el fallo (Revisión) · `s02-rev-x2` · concepto operaciones

Le pediste a la IA: «Calcula cuántas horas son 3 días». Tenía que salir 72. Toca la línea que está mal.

```ts
const horasPorDia = 24;
const dias = 3;
console.log(horasPorDia + dias);
```

- ✅ `Suma en vez de multiplicar. Tenía que ser `horasPorDia * dias`.`: Exacto. 3 días son 3 veces 24 horas: se multiplica con `*`.
- ▫️ `Para multiplicar hay que escribir `x`.`: En programación se multiplica con `*`, no con `x`. Pero fíjate: esta línea no multiplica.
- ▫️ `Faltan paréntesis alrededor de la operación.`: Aquí solo hay una operación, así que los paréntesis no cambian nada. Mira qué operación es.

Pistas: 1) ¿Qué imprime? ¿Se parece a 72? 2) `+` suma, `-` resta, `*` multiplica y `/` divide. 3) ¿Cuántas veces 24 horas hay en 3 días?

Explicación: Imprime `27` en lugar de `72`. Un símbolo equivocado y el resultado no tiene nada que ver. Por eso las 72 horas del artículo 33 son un buen caso de prueba: sabes de memoria cuánto tiene que salir.

---

## Día 3: Cuando + pega en vez de sumar

**Objetivo:** Hoy aprendes que + con un texto pega en vez de sumar, para detectar el fallo "5" + 3, el más típico de esta semana en el código hecho por IA.

### Microlección

**Pantalla 1 · codigo**

```ts
console.log("Hola, " + "Daniel");
```

Salida: `Hola, Daniel`

Con textos, `+` **pega** uno detrás de otro. El espacio no lo pone solo: va dentro de las comillas, detrás de la coma.

**Pantalla 2 · codigo**

```ts
console.log(5 + 3);
console.log("5" + 3);
console.log("5" + "3");
```

Salida: `8` / `53` / `53`

Si uno de los dos es texto, `+` no suma: convierte el número en texto y los **pega**. "5" + 3 da "53".

**Pantalla 3 · pasoapaso**

```ts
const recibidas = "5";
const nuevas = 3;
const total = recibidas + nuevas;
console.log(total);
```

- Línea 1: {"recibidas":"\"5\""} · Ojo: el 5 está entre comillas. Es texto.
- Línea 2: {"recibidas":"\"5\"","nuevas":"3"} · Este 3 sí es un número.
- Línea 3: {"recibidas":"\"5\"","nuevas":"3","total":"\"53\""} · Texto + número: pega. total es el texto "53".
- Línea 4: {"recibidas":"\"5\"","nuevas":"3","total":"\"53\""} · Esperabas 8 y sale 53. Y el programa no da ningún error.

**Pantalla 4 · texto**

¿Por qué pasa en la vida real? Lo que llega de un formulario web o de un fichero llega como **texto**, aunque parezca un número. Si se suma sin convertirlo, sale "53" en vez de 8, **sin ningún aviso**. Lo arreglarás el día 6.

**Pantalla 5 · deiure**

DeIure usa `+` con textos para ir componiendo el análisis de riesgos de una EIPD. `+=` es un atajo: `finalText += "…"` significa `finalText = finalText + "…"`, es decir, «pega esto al final».

```ts
finalText += '## Resumen Estadistico\n\n';
```

`DeIure/src/lib/apartado-09-compiler.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s02-d03-r1` · concepto texto-mas-numero

¿Qué escribe este programa?

```ts
console.log("10" + 5);
```

- ✅ `105`: Eso es: "10" es texto, así que + pega el 5 detrás.
- ▫️ `15`: Sería 15 si los dos fueran números, pero "10" lleva comillas.
- ▫️ `10 + 5`: Solo el 10 va entre comillas; el + y el 5 son código.

Pistas: 1) ¿Alguno de los dos lleva comillas? 2) Si uno es texto, + pega en vez de sumar. 3) Pega "10" y "5".

Explicación: Basta con que uno de los dos sea texto para que + pegue. Es el fallo de la semana.

#### Reto 2 · Caza el fallo (Revisión) · `s02-rev-3` · concepto texto-mas-numero

Le pediste a la IA: «Suma los días laborables y los del fin de semana». Tenía que salir 7. Toca la línea que está mal.

```ts
const diasLaborables = "5";
const diasFinde = 2;
console.log(diasLaborables + diasFinde);
```

- ✅ `El 5 está entre comillas, así que es texto. Texto + número pega uno detrás de otro en vez de sumar.`: Eso es. `"5" + 2` da `"52"`. Es el fallo de la semana: quítale las comillas al 5.
- ▫️ ``console.log` no sabe hacer sumas: hay que guardar el resultado antes.`: `console.log` puede imprimir una operación directamente. El problema está en lo que se suma.
- ▫️ `Hay que poner el número más grande primero.`: El orden de una suma de números no cambia el resultado. Mira bien la línea 1.

Pistas: 1) ¿Qué imprime este código? Compáralo con lo que pediste. 2) `+` suma si los dos lados son números, y pega si uno de ellos es texto. 3) ¿Qué tipo de dato es `"5"`?

Explicación: Imprime `52`, no `7`. Como `"5"` es texto, `+` lo pega con el 2 en vez de sumarlo. No hay ningún error que te avise: es uno de los fallos más típicos de la IA, y lo vas a volver a ver.

#### Reto 3 · Ordena las líneas · `s02-d03-r2` · concepto texto-mas-numero

Ordena las líneas para que escriba exactamente esto.

Líneas (orden correcto):

```ts
let mensaje = "Brecha";
mensaje = mensaje + " notificada";
mensaje = mensaje + " a la AEPD";
console.log(mensaje);
```

Objetivo: `Brecha notificada a la AEPD`

Pistas: 1) Cada línea de en medio pega un trozo al final del mensaje. 2) Los trozos se pegan en el orden en que se leen en la salida. 3) Primero « notificada», después « a la AEPD».

Explicación: Pegar texto con + es como ir escribiendo una frase a trozos: el orden de las líneas es el orden de las palabras.

### Repaso (reserva)

#### Repaso 1 · Rellena el hueco · `s02-d03-x1` · concepto texto-mas-numero

Completa para que escriba «Plazo: 30 días».

```ts
const dias = 30;
console.log("Plazo: " + ___ + " días");
```

Objetivo: `Plazo: 30 días`

- ✅ `dias`: Correcto: el contenido de la caja, pegado entre los dos textos.
- ▫️ `"dias"`: Con comillas pegaría la palabra «dias».
- ▫️ `Dias`: El nombre tiene que ser exacto: Dias con mayúscula no existe.

Pistas: 1) Hay que pegar el contenido de una caja. 2) Las cajas se usan por su nombre, sin comillas. 3) La caja se llama dias.

Explicación: Aquí + pega a propósito: texto, número y texto forman una frase. Fíjate en los espacios dentro de las comillas.

#### Repaso 2 · ¿Qué imprime? · `s02-d03-x2` · concepto texto-mas-numero

¿Qué escribe este programa?

```ts
const a = "2";
const b = "2";
console.log(a + b);
```

- ✅ `22`: Eso es: dos textos, así que + los pega.
- ▫️ `4`: Los dos llevan comillas: son textos, y + pega.
- ▫️ `a + b`: a y b sin comillas son cajas: se usa su contenido.

Pistas: 1) ¿Qué tipo tienen a y b? 2) Los dos son texto. Texto + texto pega. 3) Pega "2" y "2".

Explicación: Con dos textos, + siempre pega, aunque los textos parezcan números.

#### Repaso 3 · ¿Quién tiene razón? (Revisión) · `s02-rev-x3` · concepto texto-mas-numero

La IA y Marta discuten qué imprime esta línea. ¿Quién tiene razón?

```ts
console.log(1 + 2 + "3");
```

- Marta: Imprime `123`. (Como hay un texto, todo se pega.)
- La IA: Imprime `33`. (Se hace de izquierda a derecha: 1 + 2 son 3, y luego 3 pegado a "3" da "33".)

Correcta: La IA

Pistas: 1) Hazlo paso a paso, de izquierda a derecha. 2) Número + número suma. Número + texto pega. 3) ¿Cuánto es `1 + 2`? Y ahora, ¿qué pasa al juntarlo con `"3"`?

Explicación: Imprime `33`. Primero `1 + 2` da 3 (dos números: suma). Después `3 + "3"` da `"33"` (hay un texto: pega). El orden importa, y por eso con datos mezclados es mejor usar plantillas o convertir con `Number()`.

---

## Día 4: Plantillas de texto

**Objetivo:** Hoy aprendes a escribir textos con datos dentro usando plantillas, la forma que más verás en DeIure.

### Microlección

**Pantalla 1 · codigo**

```ts
const nombre = "Laura";
const dias = 30;
console.log(`${nombre} tiene ${dias} días para responder`);
```

Salida: `Laura tiene 30 días para responder`

Una **plantilla** va entre **comillas invertidas** (en el teclado del Mac, la tecla a la derecha de la P). Dentro, `${...}` es un hueco donde se mete el valor de una caja.

**Pantalla 2 · codigo**

```ts
const total = 8;
console.log("Total: " + total + " solicitudes");
console.log(`Total: ${total} solicitudes`);
```

Salida: `Total: 8 solicitudes` / `Total: 8 solicitudes`

Hacen lo mismo. La plantilla se lee mejor porque el texto se ve tal cual va a quedar, con sus espacios.

**Pantalla 3 · codigo**

```ts
const horas = 72;
console.log(`Son ${horas / 24} días`);
```

Salida: `Son 3 días`

Dentro de `${...}` también puede ir un cálculo.

**Pantalla 4 · codigo**

```ts
const horas = 72;
console.log("Quedan ${horas} horas");
```

Salida: `Quedan ${horas} horas`

Con comillas normales, `${...}` no funciona: lo escribe tal cual. Es un fallo muy frecuente, y el programa no avisa.

**Pantalla 5 · deiure**

DeIure deja constancia de cada acción con una plantilla: qué se hizo, sobre qué y quién. Es el registro que sirve para demostrar el cumplimiento (la responsabilidad proactiva del artículo 5.2 del RGPD). Simplificado:

```ts
console.log(`[AUDIT] ${actionType} ${entityType} by ${userName}`);
```

`DeIure/src/lib/audit-logger.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s02-d04-r1` · concepto plantillas-texto

¿Qué escribe este programa?

```ts
const n = 3;
console.log(`Brechas: ${n}`);
console.log("Brechas: ${n}");
```

- ✅ `Brechas: 3 ⏎ Brechas: ${n}`: Eso es: la plantilla rellena el hueco; las comillas normales lo copian tal cual.
- ▫️ `Brechas: 3 ⏎ Brechas: 3`: La segunda línea usa comillas normales: ahí ${n} no es un hueco.
- ▫️ `Brechas: ${n} ⏎ Brechas: ${n}`: La primera línea sí es una plantilla (comillas invertidas): rellena el hueco.

Pistas: 1) Mira qué comillas usa cada línea. 2) Solo las comillas invertidas convierten ${...} en un hueco. 3) La primera línea de salida es «Brechas: 3».

Explicación: Las comillas deciden: invertidas, plantilla con huecos; normales, texto tal cual.

#### Reto 2 · ¿Quién tiene razón? (Revisión) · `s02-rev-4` · concepto plantillas-texto

La IA y Marta discuten qué imprime este aviso. ¿Quién tiene razón?

```ts
const horas = 72;
console.log('Tienes ${horas} horas para notificar la brecha');
```

- Marta: Imprime `Tienes ${horas} horas para notificar la brecha`, tal cual. (Las plantillas solo funcionan con comillas invertidas, y aquí son comillas simples.)
- La IA: Imprime `Tienes 72 horas para notificar la brecha`. (`${horas}` mete el valor de la variable dentro del texto.)

Correcta: Marta

Pistas: 1) Mira con lupa las comillas de la línea 2. 2) `${...}` solo funciona dentro de comillas invertidas: `` ` ``. 3) ¿Son invertidas las comillas de la línea 2?

Explicación: Imprime `Tienes ${horas} horas para notificar la brecha`, con el `${horas}` a la vista. Las comillas simples `'` y las invertidas `` ` `` se parecen mucho, pero solo las invertidas hacen de plantilla. En el iPhone están en el teclado de símbolos, junto a la tilde.

#### Reto 3 · Ordena las líneas · `s02-d04-r2` · concepto plantillas-texto

Ordena las líneas para que escriba exactamente esto. Ojo: sobra una.

Líneas (orden correcto):

```ts
const horas = 48;
const dias = horas / 24;
console.log(`Quedan ${dias} días`);
```

Sobran: `console.log("Quedan ${dias} días");`

Objetivo: `Quedan 2 días`

Pistas: 1) dias se calcula a partir de horas. ¿Cuál tiene que existir antes? 2) Primero horas, luego dias, luego el mensaje con plantilla. 3) La que sobra usa comillas normales.

Explicación: Una caja que se calcula con otra tiene que ir después de ella. Y el mensaje necesita comillas invertidas para rellenar el hueco.

### Repaso (reserva)

#### Repaso 1 · Rellena el hueco · `s02-d04-x1` · concepto plantillas-texto

Completa para que escriba «Notificar a la AEPD».

```ts
const autoridad = "AEPD";
console.log(`Notificar a la ___`);
```

Objetivo: `Notificar a la AEPD`

- ✅ `${autoridad}`: Correcto: el hueco completo, con $ y llaves.
- ▫️ `autoridad`: Sin ${...}, dentro de la plantilla es solo la palabra «autoridad».
- ▫️ `{autoridad}`: Falta el $ delante de las llaves: lo escribiría tal cual.
- ▫️ `$autoridad`: Faltan las llaves: el hueco es ${...} entero.

Pistas: 1) Dentro de una plantilla, el valor de una caja va en un hueco. 2) El hueco se escribe con $, llave de abrir, nombre y llave de cerrar. 3) Es ${autoridad}.

Explicación: El hueco tiene tres piezas: $, llaves y el nombre. Si falta una, el programa escribe el texto tal cual, sin avisar.

#### Repaso 2 · ¿Qué imprime? · `s02-d04-x2` · concepto plantillas-texto

¿Qué escribe este programa?

```ts
console.log(`${2 + 3}`);
console.log(`2 + 3`);
```

- ✅ `5 ⏎ 2 + 3`: Eso es: lo de dentro del hueco se calcula; lo de fuera se copia.
- ▫️ `5 ⏎ 5`: La segunda plantilla no tiene hueco ${...}: se copia tal cual.
- ▫️ `2 + 3 ⏎ 2 + 3`: En la primera, 2 + 3 está dentro de un hueco: se calcula.

Pistas: 1) ¿Cuál de las dos tiene un hueco ${...}? 2) Dentro del hueco se calcula; fuera es texto. 3) La primera línea de salida es 5.

Explicación: Una plantilla es texto salvo lo que va dentro de ${...}, que es código.

#### Repaso 3 · Caza el fallo (Revisión) · `s02-rev-x4` · concepto plantillas-texto

Le pediste a la IA: «Imprime cuántas horas quedan para notificar la brecha». Toca la línea que está mal.

```ts
const horasQueQuedan = 22;
console.log(`Quedan {horasQueQuedan} horas para notificar.`);
```

- ✅ `Falta el `$` delante de la llave: tenía que ser `${horasQueQuedan}`.`: Bien visto. Sin el `$`, las llaves son solo dos caracteres más del texto.
- ▫️ `Las comillas invertidas no valen: tienen que ser normales.`: Al revés: las invertidas son justo las que hacen falta para una plantilla. Mira lo que hay justo antes de la llave.
- ▫️ `No se puede poner un número dentro de un texto.`: Con una plantilla sí se puede. El problema es cómo se ha escrito el hueco.

Pistas: 1) ¿Qué imprime? ¿Sale el 22? 2) El hueco de una plantilla se escribe `${...}`: un dólar y dos llaves. 3) Compara `{horasQueQuedan}` con `${horasQueQuedan}`.

Explicación: Imprime `Quedan {horasQueQuedan} horas para notificar.`, con las llaves a la vista. El hueco de una plantilla necesita las tres piezas: comillas invertidas, `$` y llaves.

---

## Día 5: Datos, cálculo y mensaje

**Objetivo:** Hoy aprendes a combinar datos, un cálculo y una plantilla para escribir un mensaje útil, como el aviso de un plazo.

### Microlección

**Pantalla 1 · texto**

Casi todo programa pequeño tiene tres partes: **datos** (lo que sabes), **cálculo** (lo que sacas de ellos) y **mensaje** (lo que enseñas). Si sabes ver esas tres partes, sabes leer el programa.

**Pantalla 2 · pasoapaso**

```ts
const solicitudes = 4;
const minutosPorSolicitud = 15;
const total = solicitudes * minutosPorSolicitud;
console.log(`Hoy: ${solicitudes} solicitudes, ${total} minutos`);
```

- Línea 1: {"solicitudes":"4"} · Dato: hoy hay 4 solicitudes.
- Línea 2: {"solicitudes":"4","minutosPorSolicitud":"15"} · Dato: cada una lleva 15 minutos.
- Línea 3: {"solicitudes":"4","minutosPorSolicitud":"15","total":"60"} · Cálculo: 4 × 15 = 60.
- Línea 4: {"solicitudes":"4","minutosPorSolicitud":"15","total":"60"} · Mensaje: una plantilla con dos huecos.

**Pantalla 3 · texto**

Fíjate en el nombre `minutosPorSolicitud`: varias palabras juntas, con mayúscula al empezar cada una nueva (se llama **camelCase**, porque las mayúsculas parecen jorobas). Un nombre largo y claro es mejor que `m`: el código se lee muchas más veces de las que se escribe.

**Pantalla 4 · codigo**

```ts
const facturacion = 2_000_000;
const multa = facturacion * 0.04;
console.log(`Hasta el 4 %: ${multa} euros`);
```

Salida: `Hasta el 4 %: 80000 euros`

Mismas tres partes con una multa del RGPD: dato, cálculo (el 4 % es multiplicar por 0.04) y mensaje.

**Pantalla 5 · deiure**

DeIure calcula los días entre dos fechas restándolas y dividiendo entre 86_400_000, que son los milisegundos de un día. Es el mismo patrón: datos, cálculo y, después, un mensaje.

```ts
const days = (Date.parse(to) - Date.parse(from)) / 86_400_000;
```

`DeIure/src/lib/calendar-tool-contract.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s02-d05-r1` · concepto plantillas-texto

¿Qué escribe este programa?

```ts
const horas = 72;
const dias = horas / 24;
console.log(`${horas} horas son ${dias} días`);
```

- ✅ `72 horas son 3 días`: Eso es: dos huecos, cada uno con su caja.
- ▫️ `72 horas son 72 días`: El segundo hueco es dias, que vale 72 / 24.
- ▫️ `${horas} horas son ${dias} días`: Son comillas invertidas: es una plantilla y rellena los huecos.

Pistas: 1) Calcula primero cuánto vale dias. 2) 72 / 24 = 3. Luego rellena cada hueco con su caja. 3) El primer hueco es 72 y el segundo, 3.

Explicación: Datos (horas), cálculo (dias) y mensaje (la plantilla).

#### Reto 2 · Caza el fallo (Revisión) · `s02-rev-5` · concepto plantillas-texto

Le pediste a la IA: «Imprime un aviso que diga quién tiene que responder a quién». Toca la línea que está mal.

```ts
const solicitante = "Ana Pérez";
const responsable = "Clínica Ribera";
console.log(`${responsable} tiene que responder a ${responsable} en un mes.`);
```

- ✅ `Usa `responsable` dos veces. La segunda tenía que ser `solicitante`.`: Bien visto. Es un fallo de copiar y pegar, muy típico de la IA y de las personas.
- ▫️ `No se pueden meter dos `${}` en la misma plantilla.`: Se pueden meter todos los que quieras. Fíjate en qué variable va dentro de cada uno.
- ▫️ `Falta un `+` para unir los textos.`: Con plantillas no hace falta `+`: el texto y los datos van juntos entre las comillas invertidas.

Pistas: 1) Lee en voz alta lo que imprimiría la línea 3. 2) Cada `${...}` mete el valor de la variable que tiene dentro. 3) ¿Se usa `solicitante` en algún sitio?

Explicación: Imprime `Clínica Ribera tiene que responder a Clínica Ribera en un mes.` No hay error, pero el mensaje no tiene sentido. Una pista de revisor: si creas una variable y luego no se usa en ningún sitio, algo suele estar mal.

#### Reto 3 · Ordena las líneas · `s02-d05-r2` · concepto operaciones

Ordena las líneas para que escriba exactamente esto.

Líneas (orden correcto):

```ts
let minutos = 0;
minutos = minutos + 15;
minutos = minutos * 2;
console.log(`Total: ${minutos} minutos`);
```

Objetivo: `Total: 30 minutos`

Pistas: 1) 30 = (0 + 15) × 2. ¿Qué va antes? 2) Primero se suma 15 y después se duplica. 3) let, sumar, multiplicar, mensaje.

Explicación: Si se multiplica primero, 0 × 2 = 0, y luego + 15 daría 15. El orden de los cálculos importa.

### Repaso (reserva)

#### Repaso 1 · Rellena el hueco · `s02-d05-x1` · concepto operaciones

Hay que enviar una carta a cada afectado por una brecha, a 2 euros cada una. Completa para que escriba «Coste: 300 euros».

```ts
const afectados = 150;
const porCarta = 2;
console.log(`Coste: ${___} euros`);
```

Objetivo: `Coste: 300 euros`

- ✅ `afectados * porCarta`: Correcto: 150 cartas por 2 euros.
- ▫️ `afectados + porCarta`: Eso suma: saldría 152.
- ▫️ `"afectados * porCarta"`: Con comillas, el hueco escribiría ese texto en vez de calcular.

Pistas: 1) ¿Cuánto cuestan 150 cartas a 2 euros? 2) Hay que multiplicar las dos cajas. 3) Multiplicar es *.

Explicación: Dentro del hueco va el cálculo, sin comillas.

#### Repaso 2 · Rellena el hueco · `s02-d05-x2` · concepto texto-mas-numero

Completa para que la racha suba un día y escriba «Racha: 7 días».

```ts
let racha = 6;
racha = ___;
console.log(`Racha: ${racha} días`);
```

Objetivo: `Racha: 7 días`

- ✅ `racha + 1`: Correcto: 6 + 1, los dos números.
- ▫️ `racha + "1"`: "1" es texto: + pegaría y saldría 61.
- ▫️ `racha + racha`: Eso duplica: saldría 12.

Pistas: 1) Hay que sumar uno a lo que ya hay. 2) Los dos tienen que ser números para que + sume. 3) El 1 va sin comillas.

Explicación: El fallo de la semana, escondido: un 1 entre comillas convierte la suma en pegar.

---

## Día 6: Convertir texto en número

**Objetivo:** Hoy aprendes a convertir un texto en número con Number(), que es como se arregla el fallo "5" + 3, y a reconocer NaN cuando la conversión sale mal.

### Microlección

**Pantalla 1 · codigo**

```ts
const recibidas = "5";
console.log(recibidas + 3);
console.log(Number(recibidas) + 3);
```

Salida: `53` / `8`

`Number(...)` convierte un texto en número. Con eso, `+` vuelve a sumar.

**Pantalla 2 · pasoapaso**

```ts
const delFormulario = "120";
const afectados = Number(delFormulario);
const total = afectados + 30;
console.log(total);
```

- Línea 1: {"delFormulario":"\"120\""} · Llega del formulario como texto: "120".
- Línea 2: {"delFormulario":"\"120\"","afectados":"120"} · Lo convierte: ahora es el número 120, sin comillas.
- Línea 3: {"delFormulario":"\"120\"","afectados":"120","total":"150"} · Número + número: suma.
- Línea 4: {"delFormulario":"\"120\"","afectados":"120","total":"150"} · 150, como debía ser.

**Pantalla 3 · codigo**

```ts
console.log(Number("abc"));
console.log(Number("abc") + 3);
```

Salida: `NaN` / `NaN`

Si el texto no es un número, sale **NaN** (Not a Number: «no es un número»). Y todo lo que se calcula con NaN da NaN. El programa no se para: hay que estar atento.

**Pantalla 4 · codigo**

```ts
console.log(Number("12.5"));
console.log(Number("12,5"));
```

Salida: `12.5` / `NaN`

Trampa española: nosotros escribimos 12,5, pero el programa espera **punto**. Con coma, NaN.

**Pantalla 5 · deiure**

Los apartados de una EIPD tienen números (del 1 al 14) que a veces llegan como texto, por ejemplo "07". DeIure los convierte antes de compararlos:

```ts
const num = Number(raw);
```

`DeIure/src/lib/eipd-state.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s02-d06-r1` · concepto convertir-numero

¿Qué escribe este programa?

```ts
console.log(Number("7") + 1);
```

- ✅ `8`: Eso es: Number convierte "7" en 7, y 7 + 1 suma.
- ▫️ `71`: Eso pasaría sin Number(). Aquí el 7 ya es un número.
- ▫️ `NaN`: "7" sí es un número escrito como texto, así que la conversión funciona.

Pistas: 1) ¿Qué hace Number() con "7"? 2) Lo convierte en el número 7. Número + número suma. 3) 7 + 1.

Explicación: Number() quita las «comillas» por dentro: el texto pasa a ser un número y + vuelve a sumar.

#### Reto 2 · Caza el fallo (Revisión) · `s02-rev-6` · concepto convertir-numero

Le pediste a la IA: «Suma los afectados que llegan del formulario web a los 30 que ya teníamos». Los formularios siempre entregan los datos como texto. Toca la línea que está mal.

```ts
const afectadosFormulario = "120";
const afectadosPrevios = 30;
const total = afectadosFormulario + afectadosPrevios;
console.log(`Total de afectados: ${total}`);
```

- ✅ ``afectadosFormulario` es texto. Hay que convertirlo con `Number()` antes de sumar.`: Exacto: `Number(afectadosFormulario) + afectadosPrevios` da 150.
- ▫️ `Hay que quitar las comillas de la línea 1.`: En este ejemplo funcionaría, pero el dato llega así del formulario y no lo puedes cambiar. Lo que sí puedes hacer es convertirlo antes de sumar.
- ▫️ `Una plantilla no puede mostrar números.`: Las plantillas muestran números sin problema. El fallo está antes, en la suma.

Pistas: 1) ¿Qué tipo de dato es `afectadosFormulario`? 2) Texto + número pega en vez de sumar. Para sumar, primero hay que convertir el texto en número. 3) ¿Qué hace `Number("120")`?

Explicación: Imprime `Total de afectados: 12030`. Lo que llega de fuera (un formulario, un fichero, una web) suele llegar como texto. Antes de calcular con ello, conviértelo con `Number()`. Imagina este número en una notificación a la autoridad de control.

#### Reto 3 · Ordena las líneas · `s02-d06-r2` · concepto convertir-numero

El plazo llega de un formulario como texto. Ordena las líneas para que escriba exactamente esto. Ojo: sobra una.

Líneas (orden correcto):

```ts
const texto = "30";
const dias = Number(texto);
console.log(dias + 1);
```

Sobran: `console.log(texto + 1);`

Objetivo: `31`

Pistas: 1) Para sumar 1 hace falta un número, no un texto. 2) Primero el texto, luego la conversión, luego la suma. 3) La que sobra suma 1 al texto y saldría 301.

Explicación: Convertir antes de calcular. Es el arreglo del fallo de la semana.

### Repaso (reserva)

#### Repaso 1 · Rellena el hueco · `s02-d06-x1` · concepto convertir-numero

La edad llega como texto. Completa para que escriba 16.

```ts
const edad = "15";
console.log(___ + 1);
```

Objetivo: `16`

- ✅ `Number(edad)`: Correcto: convierte y luego suma.
- ▫️ `edad`: edad es texto: + pegaría y saldría 151.
- ▫️ `number(edad)`: Number se escribe con N mayúscula; number en minúscula no existe.

Pistas: 1) edad es un texto. ¿Qué pasa si le sumas 1? 2) Hay que convertirlo primero en número. 3) Number, con N mayúscula.

Explicación: Number() con mayúscula. Sin conversión, "15" + 1 da "151".

#### Repaso 2 · ¿Qué imprime? · `s02-d06-x2` · concepto convertir-numero

¿Qué escribe este programa?

```ts
console.log(Number("12,5"));
```

- ✅ `NaN`: Eso es: con coma no lo entiende como número.
- ▫️ `12.5`: El programa espera punto decimal; con coma no sabe leerlo.
- ▫️ `125`: No quita la coma: directamente no lo reconoce como número.
- ▫️ `12,5`: Number() devuelve un número o NaN, nunca el texto tal cual.

Pistas: 1) ¿Qué separador decimal usa el programa? 2) Usa punto. Un texto con coma no es un número para él. 3) Cuando no es un número, sale NaN.

Explicación: Los datos escritos a la española (12,5) hay que convertirlos con cuidado. Number() solo entiende el punto.

#### Repaso 3 · ¿Quién tiene razón? (Revisión) · `s02-rev-x1` · concepto convertir-numero

Alguien ha escrito el plazo con letras en un formulario. La IA y Marta discuten qué pasa. ¿Quién tiene razón?

```ts
const horas = Number("setenta y dos");
console.log(horas);
```

- La IA: Imprime `72`. (`Number()` entiende los números escritos con letras.)
- Marta: Da un error. (Ese texto no es un número, así que el programa se para.)

Correcta: ninguno

Pistas: 1) `Number()` convierte cifras escritas como texto, como `"72"`. 2) Cuando `Number()` no puede convertir algo, no da error: devuelve un valor especial. 3) Ese valor especial son tres letras y significa «no es un número».

Explicación: Imprime `NaN` (*Not a Number*). Ojo: no da error, así que el programa sigue y cualquier cálculo con `NaN` da `NaN`. Cuando conviertas un dato de fuera, comprueba que de verdad sale un número.

---

## Día 7: Píldora: ceros, unos y tildes (píldora de informática)

**Objetivo:** Hoy aprendes cómo guarda el ordenador números y letras con ceros y unos, y por qué a veces una ñ sale convertida en un garabato.

### Microlección

**Pantalla 1 · texto**

Por dentro, el ordenador solo guarda **ceros y unos**. Cada cero o uno es un **bit**. Ocho bits juntos forman un **byte**. Todo, números, letras, fotos, se guarda así.

**Pantalla 2 · codigo**

```ts
console.log((5).toString(2));
console.log((72).toString(2));
```

Salida: `101` / `1001000`

`.toString(2)` escribe un número en **binario**, con ceros y unos. 5 es 101: un 4, ningún 2 y un 1. No hace falta que memorices la orden; solo la idea.

**Pantalla 3 · codigo**

```ts
console.log("A".charCodeAt(0));
console.log("B".charCodeAt(0));
console.log("ñ".charCodeAt(0));
```

Salida: `65` / `66` / `241`

Las letras también son números: hay una tabla común a todo el mundo (**Unicode**) donde la A es el 65, la B el 66 y la ñ el 241. `.charCodeAt(0)` te dice el número de una letra.

**Pantalla 4 · esquema**

*Por qué «España» sale como «EspaÃ±a»*

**Escribes «ñ»** → Se guarda con el sistema UTF-8: las letras sin tilde ocupan 1 byte; la ñ y las vocales con tilde, 2.

↓

**Otro programa lo abre** → Si cree que cada byte es una letra (un sistema antiguo), lee la ñ como dos letras.

↓

**Sale «Ã±»** → Esos dos bytes, leídos por separado, son «Ã» y «±». La información está bien; está mal leída.

↓

**La solución** → Que quien escribe y quien lee usen el mismo sistema. Hoy, casi siempre, UTF-8.

**Pantalla 5 · deiure**

Cuando DeIure guarda un texto, cuenta sus **bytes**, no sus letras, porque el límite de espacio se mide en bytes. Una «ñ» cuenta doble. La segunda línea dice «si son demasiados bytes, recházalo»; esa forma de decidir (`if`) llega la semana que viene.

```ts
const bytes = new TextEncoder().encode(content);
if (bytes.length > MAX_WORKSPACE_TEXT_BYTES) throw policyError('WORKSPACE_TOO_LARGE');
```

`DeIure/src/lib/workspace-file-policy.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s02-d07-r1` · concepto bits-texto

¿Qué escribe este programa?

```ts
console.log((2).toString(2));
console.log((3).toString(2));
```

- ✅ `10 ⏎ 11`: Eso es: 2 es un 2 y ningún 1 (10); 3 es un 2 y un 1 (11).
- ▫️ `2 ⏎ 3`: .toString(2) los escribe en binario, solo con ceros y unos.
- ▫️ `1 ⏎ 11`: En binario, el 1 solo es 1. El 2 necesita dos cifras: 10.

Pistas: 1) En binario solo hay ceros y unos. 2) Las cifras valen, de derecha a izquierda, 1, 2, 4, 8… 3) 2 = un 2 y ningún 1.

Explicación: En binario, cada cifra vale el doble que la de su derecha: 1, 2, 4, 8… 3 = 2 + 1 = 11.

#### Reto 2 · ¿Quién tiene razón? (Revisión) · `s02-rev-7` · concepto bits-texto

`.length` cuenta cuántos caracteres tiene un texto. La IA y Marta discuten qué imprime este código. ¿Quién tiene razón?

```ts
console.log("España".length);
```

- La IA: Imprime `6`. (E, s, p, a, ñ, a: seis caracteres.)
- Marta: Imprime `7`. (La ñ ocupa dos bytes en el ordenador, así que cuenta doble.)

Correcta: La IA

Pistas: 1) Cuenta las letras de «España» con el dedo. 2) `.length` cuenta caracteres, no bytes. 3) ¿Cuántos caracteres es la ñ: uno o dos?

Explicación: Imprime `6`. Caracteres y bytes no son lo mismo: en un fichero, «España» ocupa 7 bytes, porque la ñ necesita 2. Cuando un programa lee esos bytes como si cada uno fuera una letra, salen cosas como «EspaÃ±a». Ese es el origen de las tildes rotas que habrás visto alguna vez.

#### Reto 3 · Ordena las líneas · `s02-d07-r2` · concepto bits-texto

Ordena las líneas para que escriba exactamente esto.

Líneas (orden correcto):

```ts
const letra = "A";
const codigo = letra.charCodeAt(0);
console.log(`${letra} es el ${codigo}`);
```

Objetivo: `A es el 65`

Pistas: 1) codigo se calcula a partir de letra. 2) Primero letra, luego codigo y luego el mensaje. 3) Empieza por const letra = "A";

Explicación: Datos, cálculo y mensaje, como el día 5, ahora con el número de una letra.

### Repaso (reserva)

#### Repaso 1 · Rellena el hueco · `s02-d07-x1` · concepto bits-texto

Completa para comprobar que la B va justo detrás de la A en la tabla, y que escriba 1.

```ts
console.log("B".charCodeAt(0) ___ "A".charCodeAt(0));
```

Objetivo: `1`

- ✅ `-`: Correcto: 66 − 65 = 1.
- ▫️ `+`: Eso suma los dos números: 131.
- ▫️ `*`: Eso multiplica: 4290.

Pistas: 1) La A es el 65 y la B el 66. 2) Para ver la distancia entre dos números, se restan. 3) Restar es -.

Explicación: Las letras van seguidas en la tabla, por eso se pueden ordenar alfabéticamente comparando números.

#### Repaso 2 · ¿Qué imprime? · `s02-d07-x2` · concepto bits-texto

¿Qué escribe este programa?

```ts
console.log((8).toString(2));
```

- ✅ `1000`: Eso es: un 8, y ningún 4, 2 ni 1.
- ▫️ `8`: .toString(2) lo escribe en binario.
- ▫️ `111`: 111 es 4 + 2 + 1 = 7. El 8 necesita una cifra más.

Pistas: 1) Las cifras valen 1, 2, 4, 8… de derecha a izquierda. 2) El 8 es justo una de esas cifras. 3) Un 1 en la posición del 8 y ceros en el resto.

Explicación: Las potencias de 2 en binario son un 1 seguido de ceros: 1, 10, 100, 1000.

