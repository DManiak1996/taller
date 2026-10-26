# Semana 1: vista previa

Generado desde los JSON. Para revisar el contenido sin abrir el formato.

---

## Día 1: Un programa es una lista de órdenes

**Objetivo:** Hoy aprendes a leer un programa como lo lee el ordenador, de arriba abajo, y a mostrar un mensaje con console.log.

### Microlección

**Pantalla 1 · texto**

Un **programa** es una lista de órdenes para el ordenador. Las lee **de arriba abajo**, una por línea, como los pasos de un procedimiento.

**Pantalla 2 · codigo**

```ts
console.log("Hola, Daniel");
```

Salida: `Hola, Daniel`

`console.log(...)` es la orden «escribe esto en pantalla». Lo que el programa escribe se llama **salida**. El `;` marca el final de la orden.

**Pantalla 3 · pasoapaso**

```ts
console.log("Solicitud recibida");
console.log("Identidad comprobada");
console.log("Respuesta enviada");
```

- Línea 1: {} · Primera orden: escribe la primera línea.
- Línea 2: {} · Baja a la siguiente y la escribe debajo.
- Línea 3: {} · Última orden. El programa termina.

**Pantalla 4 · texto**

Si cambias las líneas de sitio, cambia lo que sale. Cada `console.log` escribe **su propia línea**, en el orden en que aparece.

**Pantalla 5 · deiure**

DeIure usa `console.log` para contar qué está haciendo mientras funciona. Cuando guarda un apartado de una EIPD, escribe un mensaje parecido a este (simplificado):

```ts
console.log("Apartado guardado");
```

`DeIure/src/lib/api.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s01-d01-r1` · concepto orden-ejecucion

¿Qué escribe este programa?

```ts
console.log("Uno");
console.log("Dos");
console.log("Tres");
```

- ✅ `Uno ⏎ Dos ⏎ Tres`: Eso es: de arriba abajo, una línea por cada console.log.
- ▫️ `Tres ⏎ Dos ⏎ Uno`: El ordenador no empieza por abajo: lee de arriba abajo.
- ▫️ `Uno Dos Tres`: Cada console.log escribe en su propia línea, no todo seguido.

Pistas: 1) Mira por qué línea empieza el ordenador. 2) Se lee de arriba abajo, y cada console.log es una línea de salida. 3) La primera línea de salida es «Uno».

Explicación: Tres órdenes, tres líneas de salida, en el mismo orden en que están escritas.

#### Reto 2 · Caza el fallo (Revisión) · `s01-rev-1` · concepto orden-ejecucion

Le pediste a la IA: «Imprime primero el aviso de brecha y después la fecha límite». Toca la línea que está mal.

```ts
console.log("Fecha límite: 72 horas");
console.log("AVISO: hay una brecha");
```

- ✅ `Las líneas están al revés: el programa las ejecuta de arriba abajo, así que imprime primero la fecha.`: Exacto. El código funciona, pero no hace lo que pediste. Revisar no es solo ver si funciona: es comprobar que hace **lo que se pidió**.
- ▫️ `Falta algo entre las dos líneas para que se ejecuten en orden.`: No falta nada: el orden lo marca la posición de cada línea. La de arriba va primero, siempre.
- ▫️ `No se pueden poner dos `console.log` seguidos.`: Sí se puede: cada `console.log` imprime una línea nueva. Puedes poner tantos como quieras.

Pistas: 1) Lee la petición otra vez: ¿qué tenía que salir primero? 2) Un programa se ejecuta de arriba abajo, una línea detrás de otra. 3) Mira qué imprime la línea 1. ¿Es el aviso?

Explicación: El programa ejecuta las líneas en el orden en que están escritas. La IA puso la fecha arriba, así que sale primero. No da ningún error, y por eso es fácil que se te pase: **que funcione no significa que haga lo que pediste**.

#### Reto 3 · Ordena las líneas · `s01-d01-r3` · concepto orden-ejecucion

Ordena las líneas para que el programa escriba los pasos ante una brecha de seguridad en el orden correcto.

Líneas (orden correcto):

```ts
console.log("Detectar la brecha");
console.log("Contenerla");
console.log("Evaluar el riesgo");
console.log("Notificar en 72 horas");
```

Objetivo: `Detectar la brecha` / `Contenerla` / `Evaluar el riesgo` / `Notificar en 72 horas`

Pistas: 1) Fíjate en lo que tiene que escribir: la primera línea de la salida es la primera del programa. 2) Cada console.log produce una línea de salida, en el mismo orden. 3) Empieza por console.log("Detectar la brecha");

Explicación: El orden del programa es el orden de la salida. Por eso, si una IA te cambia dos líneas de sitio, el resultado cambia aunque las líneas sean las mismas.

### Repaso (reserva)

#### Repaso 1 · Rellena el hueco · `s01-d01-x1` · concepto console-log

Completa el programa para que escriba las dos líneas.

```ts
console.log("Solicitud recibida");
___
```

Objetivo: `Solicitud recibida` / `Plazo: un mes`

- ✅ `console.log("Plazo: un mes");`: Correcto: la orden completa, con el texto entre comillas.
- ▫️ `console("Plazo: un mes");`: Falta `.log`. La orden completa es `console.log`.
- ▫️ `log("Plazo: un mes");`: Falta `console.` delante. El ordenador no sabe qué es `log` a secas.

Pistas: 1) Mira cómo está escrita la primera línea. 2) La orden para escribir es siempre `console.log(...)`, entera. 3) Copia la forma de la línea 1 y cambia solo el texto.

Explicación: `console.log` es una orden con nombre exacto. Si falta un trozo, el ordenador no la reconoce y se para con un error.

#### Repaso 2 · ¿Qué imprime? · `s01-d01-x2` · concepto orden-ejecucion

¿Qué escribe este programa?

```ts
console.log("A");
console.log("B");
console.log("A");
```

- ✅ `A ⏎ B ⏎ A`: Eso es: se ejecutan las tres órdenes, aunque dos escriban lo mismo.
- ▫️ `A ⏎ B`: La tercera orden también se ejecuta, aunque repita el texto.
- ▫️ `A ⏎ A ⏎ B`: El orden de la salida es el orden de las líneas: la B va en medio.

Pistas: 1) Cuenta cuántos console.log hay. 2) Cada console.log se ejecuta una vez, de arriba abajo, aunque repita texto. 3) Son tres líneas de salida, y la segunda es B.

Explicación: El ordenador no se salta nada ni junta líneas repetidas: hace exactamente lo que pone, en orden.

---

## Día 2: El texto va entre comillas

**Objetivo:** Hoy aprendes a distinguir texto de números dentro de un programa y a leer tu primer mensaje de error sin asustarte.

### Microlección

**Pantalla 1 · texto**

Lo que va **entre comillas** es texto, y el ordenador lo copia tal cual, letra a letra. En programación a un texto se le llama **string** («cadena» de letras).

**Pantalla 2 · codigo**

```ts
console.log("10 + 5");
console.log(10 + 5);
```

Salida: `10 + 5` / `15`

Con comillas, lo copia. Los números van **sin comillas**, y con ellos sí calcula.

**Pantalla 3 · codigo**

```ts
console.log("Inicio");
console.log(Hola);
```

Salida: `Inicio` y error

Sin comillas, el ordenador cree que `Hola` es el nombre de algo que debería conocer. No lo conoce, así que se para y avisa: **ReferenceError: Hola is not defined** («Hola no está definido»).

**Pantalla 4 · texto**

Un **error** no es un desastre: es el ordenador diciéndote dónde se ha perdido. Fíjate en que «Inicio» sí salió: todo lo de **antes** del error se ejecuta. Los mensajes vienen en inglés; aquí te los traducimos.

**Pantalla 5 · deiure**

En DeIure verás texto entre comillas simples, como `'eipd_juridico'`. Simples o dobles valen igual, siempre que abras y cierres con la misma. Lo que hay antes del `=` lo entenderás mañana.

```ts
export const LEGAL_CORPUS_NAME = 'eipd_juridico';
```

`DeIure/src/lib/rag-system-constants.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s01-d02-r1` · concepto texto-comillas

¿Qué escribe este programa?

```ts
console.log("3 + 4");
console.log(3 + 4);
```

- ✅ `3 + 4 ⏎ 7`: Eso es: con comillas lo copia; sin comillas lo calcula.
- ▫️ `7 ⏎ 7`: La primera línea lleva comillas: es texto y se copia tal cual, sin calcular.
- ▫️ `3 + 4 ⏎ 3 + 4`: La segunda línea no lleva comillas: son números y el ordenador calcula.

Pistas: 1) Compara las dos líneas: ¿qué tiene una que no tenga la otra? 2) Entre comillas es texto y se copia; sin comillas, los números se calculan. 3) La primera línea de salida es «3 + 4».

Explicación: Las comillas cambian el significado: "3 + 4" es un texto de cinco caracteres; 3 + 4 es una suma.

#### Reto 2 · Rellena el hueco · `s01-d02-r2` · concepto texto-comillas

Completa para que el programa escriba «Derecho de acceso».

```ts
console.log(___);
```

Objetivo: `Derecho de acceso`

- ✅ `"Derecho de acceso"`: Correcto: texto entre comillas, abiertas y cerradas.
- ▫️ `Derecho de acceso`: Sin comillas, el ordenador intenta leer «Derecho», «de» y «acceso» como nombres de cosas, y no entiende nada.
- ▫️ `"Derecho de acceso`: Falta la comilla de cierre: para el ordenador, el texto no termina nunca.
- ▫️ `'Derecho de acceso"`: Abre con comilla simple y cierra con doble. Tienen que ser iguales.

Pistas: 1) Es texto, no un número. 2) El texto va entre comillas, y la de abrir y la de cerrar son iguales. 3) Busca la opción que empieza y termina con ".

Explicación: Las comillas marcan dónde empieza y dónde acaba un texto. Si falta una o no coinciden, el programa ni siquiera arranca.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s01-rev-2` · concepto texto-comillas

La IA y tu compañera Marta no se ponen de acuerdo sobre qué pasa al ejecutar esta línea. ¿Quién tiene razón?

```ts
console.log(Hola);
```

- La IA: Imprime `Hola`. (`console.log` imprime lo que pongas dentro del paréntesis.)
- Marta: Da un error. (Sin comillas, el ordenador no lo lee como texto: busca algo que se llame `Hola`, y no existe.)

Correcta: Marta

Pistas: 1) Fíjate en lo que hay alrededor de `Hola`… y en lo que no hay. 2) El texto va entre comillas. Lo que no lleva comillas, el programa lo busca como un nombre. 3) ¿Hay algo en el programa que se llame `Hola`?

Explicación: Al ejecutarlo sale `ReferenceError: Hola is not defined`, que en castellano es «no existe nada llamado Hola». Acostúmbrate a leer estos mensajes: dicen qué ha fallado y en qué línea. Y una IA puede sonar muy segura y estar equivocada: **no se cree a nadie, se comprueba**.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s01-d02-x1` · concepto texto-comillas

¿Qué escribe este programa?

```ts
console.log("Paso 1");
console.log(Paso2);
console.log("Paso 3");
```

- ✅ `Paso 1 ⏎ ❌ Error: Paso2 no está definido`: Eso es: escribe la primera línea y se para en la segunda.
- ▫️ `Paso 1 ⏎ Paso2 ⏎ Paso 3`: `Paso2` no lleva comillas, así que no es texto: el ordenador busca algo con ese nombre.
- ▫️ `Paso 1 ⏎ Paso 3`: Cuando hay un error, el programa se para. No se salta la línea y sigue.
- ▫️ `❌ Error: Paso2 no está definido`: Lo de antes del error sí se ejecuta: «Paso 1» llega a salir.

Pistas: 1) Busca la línea que no tiene comillas. 2) Sin comillas, Paso2 es un nombre desconocido: error. Y un error para el programa. 3) Sale «Paso 1» y después el error. «Paso 3» nunca llega.

Explicación: Dos ideas: sin comillas no es texto, y un error detiene el programa justo ahí. Lo anterior ya se hizo; lo posterior no se hace.

#### Repaso 2 · Ordena las líneas · `s01-d02-x2` · concepto texto-comillas

Ordena las líneas para que escriba exactamente esto. Ojo: sobra una.

Líneas (orden correcto):

```ts
console.log("Multa máxima:");
console.log(20000000);
console.log("euros");
```

Sobran: `console.log("20.000.000");`

Objetivo: `Multa máxima:` / `20000000` / `euros`

Pistas: 1) Mira la segunda línea del objetivo: ¿lleva puntos? 2) Los números se escriben sin comillas y sin puntos de miles. 3) La que sobra es la que tiene "20.000.000" entre comillas.

Explicación: En código, los números van sin comillas y sin puntos de miles. 20000000 es un número; "20.000.000" sería un texto que solo lo parece.

---

## Día 3: Guardar un dato con nombre: const

**Objetivo:** Hoy aprendes a guardar un dato con un nombre usando const y a usarlo después escribiendo ese nombre.

### Microlección

**Pantalla 1 · texto**

Una **variable** es una caja con etiqueta: guardas un dato dentro y luego lo pides por su nombre. La forma más sencilla de crear una es con `const`.

**Pantalla 2 · pasoapaso**

```ts
const plazo = 72;
console.log(plazo);
console.log("plazo");
```

- Línea 1: {"plazo":"72"} · Crea una caja con la etiqueta plazo y guarda dentro el 72.
- Línea 2: {"plazo":"72"} · Sin comillas, plazo es el nombre de la caja: escribe lo que hay dentro.
- Línea 3: {"plazo":"72"} · Con comillas es solo texto: escribe la palabra plazo, tal cual.

**Pantalla 3 · texto**

Léelo así: `const plazo = 72;` significa «crea la caja **plazo** y guarda en ella **72**». Aquí el `=` no quiere decir «es igual a», sino **«guarda»**. Y el nombre tiene que escribirse siempre igual, con las mismas mayúsculas.

**Pantalla 4 · codigo**

```ts
const responsable = "Clínica Arga";
console.log(responsable);
console.log(responsable);
```

Salida: `Clínica Arga` / `Clínica Arga`

Una vez guardado, lo usas tantas veces como quieras sin volver a escribir el dato.

**Pantalla 5 · deiure**

En DeIure, los días que algo pasa en la papelera antes de borrarse para siempre están guardados en una `const`. Si mañana fueran 60 días, se cambiaría solo esta línea y todo DeIure lo sabría. Para eso sirven los nombres. (`export` deja usarla desde otros ficheros; lo verás más adelante.)

```ts
export const TRASH_RETENTION_DAYS = 30;
```

`DeIure/src/lib/trash-retention.ts`

### Retos

#### Reto 1 · Rellena el hueco · `s01-d03-r1` · concepto const

Completa para que el programa escriba «AEPD».

```ts
const autoridad = "AEPD";
console.log(___);
```

Objetivo: `AEPD`

- ✅ `autoridad`: Correcto: el nombre de la caja, sin comillas, para que escriba lo que hay dentro.
- ▫️ `"autoridad"`: Con comillas escribiría la palabra «autoridad», no lo que hay dentro de la caja.
- ▫️ `AEPD`: AEPD es lo que hay dentro, pero sin comillas el ordenador busca una caja llamada AEPD, y no existe.
- ▫️ `Autoridad`: Casi: el nombre tiene que ser exacto. Autoridad con mayúscula es otro nombre, y no existe.

Pistas: 1) Para sacar lo que hay en una caja, se usa su etiqueta. 2) La etiqueta va sin comillas y escrita exactamente igual que en la línea 1. 3) La caja se llama autoridad, en minúsculas.

Explicación: Para usar un dato guardado escribes el nombre de la caja, sin comillas y tal cual lo creaste.

#### Reto 2 · Caza el fallo (Revisión) · `s01-rev-3` · concepto const

Le pediste a la IA: «Guarda el nombre del responsable del tratamiento e imprímelo». Toca la línea que está mal.

```ts
const responsable = "Clínica Ribera";
console.log("responsable");
```

- ✅ `Con comillas imprime la palabra «responsable» tal cual. Para imprimir lo que guarda la variable, va sin comillas.`: Eso es. `"responsable"` es un texto; `responsable` es el nombre de la caja donde guardaste «Clínica Ribera».
- ▫️ `Una `const` no se puede imprimir; tendría que ser `let`.`: Las dos se pueden imprimir. La diferencia entre `const` y `let` es otra: si luego se puede cambiar el valor.
- ▫️ `«Clínica Ribera» lleva tilde y eso da problemas.`: Las tildes dentro de un texto no dan ningún problema. El fallo está en la otra línea.

Pistas: 1) La línea 1 está bien. Mira la 2. 2) Entre comillas es texto tal cual. Sin comillas es el nombre de una variable. 3) ¿Qué imprime `console.log("responsable")`? ¿Es lo que pediste?

Explicación: El programa imprime `responsable`, no `Clínica Ribera`. No hay error, solo una salida equivocada. Es la diferencia entre `plazo` y `"plazo"`: con comillas es una palabra, sin comillas es lo que hay guardado con ese nombre.

#### Reto 3 · Ordena las líneas · `s01-d03-r3` · concepto const

Ordena las líneas para que escriba exactamente esto. Ojo: sobra una.

Líneas (orden correcto):

```ts
const dias = 30;
console.log(dias);
console.log("días en la papelera");
```

Sobran: `console.log("dias");`

Objetivo: `30` / `días en la papelera`

Pistas: 1) Antes de usar una caja, tiene que existir. 2) Primero se crea la const; luego se escribe su contenido, sin comillas. 3) Empieza por const dias = 30; y deja fuera la línea con "dias" entre comillas.

Explicación: El orden importa también para las cajas: primero se crean y después se usan. Y console.log(dias) escribe 30, mientras que console.log("dias") escribiría la palabra.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s01-d03-x1` · concepto const

¿Qué escribe este programa?

```ts
const pais = "España";
console.log("pais");
console.log(pais);
```

- ✅ `pais ⏎ España`: Eso es: primero el texto «pais» y después lo que hay en la caja pais.
- ▫️ `España ⏎ España`: La línea 2 lleva comillas: escribe la palabra pais, no el contenido de la caja.
- ▫️ `pais ⏎ pais`: La línea 3 no lleva comillas: es la caja, y dentro hay «España».
- ▫️ `España ⏎ pais`: El orden es el de las líneas: primero va la que tiene comillas.

Pistas: 1) Hay dos console.log: uno con comillas y otro sin ellas. 2) Con comillas es texto tal cual; sin comillas es el contenido de la caja. 3) La primera línea de salida es «pais».

Explicación: pais y "pais" se parecen, pero no son lo mismo: uno es una caja, el otro un texto.

#### Repaso 2 · Rellena el hueco · `s01-d03-x2` · concepto const

Completa para que el programa escriba «Consentimiento».

```ts
___ base = "Consentimiento";
console.log(base);
```

Objetivo: `Consentimiento`

- ✅ `const`: Correcto: const crea la caja.
- ▫️ `Const`: Las palabras del lenguaje van en minúscula. Const con mayúscula no existe.
- ▫️ `constante`: El lenguaje solo entiende la palabra abreviada: const.

Pistas: 1) Falta la palabra que crea la caja. 2) Es la palabra que has visto hoy, escrita exactamente igual. 3) Cinco letras, todas en minúscula.

Explicación: const es una palabra reservada del lenguaje: se escribe siempre así, en minúsculas.

#### Repaso 3 · Caza el fallo (Revisión) · `s01-rev-x1` · concepto nombres-variables

Le pediste a la IA: «Imprime cuántos meses hay para responder a una solicitud de acceso». Toca la línea que está mal.

```ts
const mesesParaResponder = 1;
console.log(mesesParaResponde);
```

- ✅ `El nombre está mal escrito: le falta la «r» final. Para el ordenador son dos nombres distintos.`: Bien visto. Una sola letra basta para que el programa no encuentre la variable.
- ▫️ `El 1 tendría que ir entre comillas.`: Es un número, así que va sin comillas. Compara letra a letra los dos nombres.
- ▫️ ``console.log` solo imprime texto, no números.`: `console.log` imprime números sin problema. Compara letra a letra los dos nombres.

Pistas: 1) Compara el nombre de la línea 1 con el de la línea 2. 2) Los nombres tienen que ser exactamente iguales, letra a letra. 3) Lee despacio el final de cada nombre.

Explicación: Al ejecutarlo sale `ReferenceError: mesesParaResponde is not defined`. TypeScript lo avisa antes y hasta sugiere el arreglo: `Did you mean 'mesesParaResponder'?` («¿querías decir…?»). Lee siempre el error entero: muchas veces trae la solución.

#### Repaso 4 · ¿Quién tiene razón? (Revisión) · `s01-rev-x4` · concepto nombres-variables

La IA y Marta discuten qué pasa con este código. ¿Quién tiene razón?

```ts
const Responsable = "Ana";
console.log(responsable);
```

- La IA: Imprime `Ana`. (Mayúsculas y minúsculas dan igual en los nombres.)
- Marta: Da un error. (Para el ordenador, `Responsable` y `responsable` son dos nombres distintos.)

Correcta: Marta

Pistas: 1) Compara la primera letra del nombre en cada línea. 2) El ordenador compara los nombres letra a letra, mayúsculas incluidas. 3) ¿Existe algo que se llame exactamente `responsable`, en minúscula?

Explicación: Al ejecutarlo sale `ReferenceError: responsable is not defined`. Para el ordenador, una mayúscula es una letra distinta. Por convención, en TypeScript las variables empiezan en minúscula.

---

## Día 4: Datos que cambian: let

**Objetivo:** Hoy aprendes a crear una variable con let, a cambiar su valor y a saber qué valor tiene en cada línea.

### Microlección

**Pantalla 1 · texto**

Algunos datos cambian: una solicitud pasa de «recibida» a «resuelta». Para eso existe `let`: una caja cuyo contenido **se puede cambiar**.

**Pantalla 2 · pasoapaso**

```ts
let estado = "recibida";
console.log(estado);
estado = "en trámite";
console.log(estado);
estado = "resuelta";
console.log(estado);
```

- Línea 1: {"estado":"\"recibida\""} · Crea la caja estado con «recibida» dentro.
- Línea 2: {"estado":"\"recibida\""} · Escribe lo que hay ahora en la caja.
- Línea 3: {"estado":"\"en trámite\""} · Cambia el contenido. «recibida» desaparece.
- Línea 4: {"estado":"\"en trámite\""} · Escribe el valor nuevo.
- Línea 5: {"estado":"\"resuelta\""} · Vuelve a cambiar.
- Línea 6: {"estado":"\"resuelta\""} · Cada console.log escribió lo que había en ese momento.

**Pantalla 3 · texto**

Fíjate: `let` se escribe **solo la primera vez**, al crear la caja. Para cambiar lo de dentro escribes el nombre, `=` y el valor nuevo. El valor antiguo se pierde.

**Pantalla 4 · codigo**

```ts
let estado = "recibida";
let estado = "resuelta";
console.log(estado);
```

Salida: (nada) y error

Si repites `let`, intentas crear otra caja con el mismo nombre, y el programa ni arranca: **Identifier 'estado' has already been declared** («estado ya existe»).

**Pantalla 5 · deiure**

Cuando DeIure redacta el análisis de riesgos de una EIPD, empieza con el título y le va añadiendo párrafos. Por eso es `let`: su contenido crece mientras se escribe. (Los `\n` son saltos de línea.)

```ts
let finalText = '# Analisis de Riesgos\n\n';
```

`DeIure/src/lib/apartado-09-compiler.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s01-d04-r1` · concepto let

¿Qué escribe este programa?

```ts
let intentos = 1;
intentos = 2;
console.log(intentos);
```

- ✅ `2`: Eso es: cuando llega al console.log, la caja ya tiene un 2.
- ▫️ `1`: El cambio de la línea 2 ocurre antes del console.log, así que ya no hay un 1.
- ▫️ `1 ⏎ 2`: Solo hay un console.log, así que solo sale una línea: lo que hay en ese momento.
- ▫️ `intentos`: Sin comillas, intentos es la caja: escribe su contenido, no la palabra.

Pistas: 1) Sigue las líneas en orden y apunta qué hay en la caja tras cada una. 2) Al llegar a la línea 3, la caja ya cambió. 3) Línea 1: 1. Línea 2: 2. ¿Qué escribe la línea 3?

Explicación: console.log escribe lo que hay en la caja justo en ese momento, no su historia.

#### Reto 2 · ¿Quién tiene razón? (Revisión) · `s01-rev-4` · concepto let

Había 120 personas afectadas por una brecha y ahora sabemos que son 150. La IA y Marta discuten qué pasa con este código. ¿Quién tiene razón?

```ts
let afectados = 120;
let afectados = 150;
console.log(afectados);
```

- La IA: Da un error. (`let` crea una variable nueva, y ya existe una que se llama `afectados`. Para cambiarla se escribe `afectados = 150;`, sin `let`.)
- Marta: Imprime `150`. (La segunda línea sustituye a la primera.)

Correcta: La IA

Pistas: 1) Compara el principio de la línea 1 y el de la línea 2. 2) `let` crea una variable. Una variable solo se crea una vez. 3) ¿Se pueden tener dos variables que se llamen igual?

Explicación: Al ejecutarlo sale `SyntaxError: Identifier 'afectados' has already been declared`: «ya existe algo llamado afectados». Crear una variable (`let afectados = 120;`) y cambiarla (`afectados = 150;`) son cosas distintas, y se escriben distinto.

#### Reto 3 · Ordena las líneas · `s01-d04-r3` · concepto let

Ordena las líneas para que escriba exactamente esto.

Líneas (orden correcto):

```ts
let brecha = "pendiente";
console.log(brecha);
brecha = "notificada";
console.log(brecha);
```

Objetivo: `pendiente` / `notificada`

Pistas: 1) Lo primero es crear la caja. 2) Entre los dos console.log tiene que cambiar el valor. 3) let, console.log, cambio, console.log.

Explicación: Los dos console.log son idénticos, pero escriben cosas distintas porque entre uno y otro cambió el contenido de la caja.

### Repaso (reserva)

#### Repaso 1 · Rellena el hueco · `s01-d04-x1` · concepto let

Completa para que el programa escriba «firmada».

```ts
let fase = "borrador";
___
console.log(fase);
```

Objetivo: `firmada`

- ✅ `fase = "firmada";`: Correcto: nombre, = y el valor nuevo. Sin let.
- ▫️ `let fase = "firmada";`: let solo se escribe al crear la caja. Repetirlo da error: «fase ya existe».
- ▫️ `"firmada" = fase;`: Al revés: la caja va a la izquierda del = y el valor nuevo, a la derecha.

Pistas: 1) La caja fase ya existe: solo hay que cambiar lo que tiene dentro. 2) Para cambiar: nombre de la caja = valor nuevo; sin let. 3) Empieza por fase =

Explicación: Crear (let fase = ...) y cambiar (fase = ...) son dos órdenes distintas. let solo aparece al crear.

#### Repaso 2 · ¿Qué imprime? · `s01-d04-x2` · concepto let

¿Qué escribe este programa?

```ts
let total = 5;
console.log(total);
total = 8;
console.log(total);
```

- ✅ `5 ⏎ 8`: Eso es: el primer console.log va antes del cambio y el segundo, después.
- ▫️ `8 ⏎ 8`: El primer console.log se ejecuta antes de la línea 3: en ese momento hay un 5.
- ▫️ `5 ⏎ 5`: La línea 3 cambia el contenido, así que el segundo console.log ve el 8.

Pistas: 1) Hay dos console.log: uno antes y otro después del cambio. 2) Cada console.log escribe lo que hay en ese momento. 3) La primera línea de salida es 5.

Explicación: El orden de las líneas decide qué valor ve cada console.log.

#### Repaso 3 · ¿Quién tiene razón? (Revisión) · `s01-rev-x2` · concepto let

El plazo para responder a una solicitud es de un mes, y se prorroga dos meses más. La IA escribió este código y Marta tiene dudas. ¿Quién tiene razón?

```ts
let plazoMeses = 1;
plazoMeses = 3;
console.log(plazoMeses);
```

- La IA: Imprime `3`. (La línea 2 cambia el valor, y `console.log` imprime el que hay en ese momento.)
- Marta: Imprime `1` y `3`. (La variable ha tenido dos valores, así que salen los dos.)

Correcta: La IA

Pistas: 1) Cuenta cuántos `console.log` hay. 2) Cada `console.log` imprime una línea, con el valor que tiene la variable en ese momento. 3) Cuando llega a la línea 3, ¿qué vale `plazoMeses`?

Explicación: Imprime solo `3`. La variable valía 1, pero la línea 2 la cambió antes de imprimirla. Y fíjate en que esta vez la IA tenía razón: no se trata de desconfiar de todo, sino de **comprobar**.

---

## Día 5: const o let: elegir bien

**Objetivo:** Hoy aprendes a elegir entre const y let y a detectar el fallo de cambiar una const, uno de los más típicos del código hecho por IA.

### Microlección

**Pantalla 1 · codigo**

```ts
const plazo = 72;
plazo = 48;
console.log(plazo);
```

Salida: (nada) y error

Una `const` **no se puede cambiar**. Si lo intentas, el programa falla en la línea 2: **Assignment to constant variable** («cambio en una variable constante»).

**Pantalla 2 · texto**

La ventaja de TypeScript es que este fallo te lo marca **antes de ejecutar**: en el editor sale subrayado en rojo con «No se puede asignar a "plazo" porque es una constante». Es como un corrector ortográfico, pero para código.

**Pantalla 3 · codigo**

```ts
const dni = "12345678Z";
let estado = "abierta";
estado = "cerrada";
console.log(dni);
console.log(estado);
```

Salida: `12345678Z` / `cerrada`

El DNI de una persona no cambia: `const`. El estado de su expediente, sí: `let`.

**Pantalla 4 · texto**

La regla: **usa `const` siempre**, y `let` solo cuando sepas que el valor va a cambiar. Así, cuando leas `const`, sabes que ese dato no se mueve en todo el programa.

**Pantalla 5 · deiure**

En las librerías de DeIure hay unas 37.000 `const` y unas 2.000 `let`: más de 18 por cada una. Es buena señal, porque casi nada cambia sin avisar. Cuando revises código de una IA, busca una `const` que más abajo cambia de valor: ahora ya sabes que eso falla.

`DeIure/src/lib`

### Retos

#### Reto 1 · Caza el fallo (Revisión) · `s01-rev-5` · concepto const

Le pediste a la IA: «Guarda el estado de la solicitud de acceso y cámbialo a respondida cuando la contestemos». Toca la línea que está mal.

```ts
const estado = "pendiente";
console.log(estado);
estado = "respondida";
console.log(estado);
```

- ✅ ``estado` se creó con `const`, y una `const` no se puede cambiar después. Tenía que ser `let`.`: Exacto. Es uno de los fallos más típicos de la IA: elige `const` y luego intenta cambiar el valor.
- ▫️ `No se puede imprimir la misma variable dos veces.`: Sí se puede, todas las veces que quieras. El problema es cambiar su valor.
- ▫️ ``"respondida"` tendría que ir sin comillas.`: Es un texto, así que las comillas están bien. Fíjate en cómo se creó `estado`.

Pistas: 1) El valor de `estado` tiene que cambiar. Mira cómo se creó. 2) `const` es para valores que no cambian; `let`, para los que sí. 3) La línea 3 cambia el valor. ¿Lo permite la palabra de la línea 1?

Explicación: El programa imprime `pendiente` y luego se para con `TypeError: Assignment to constant variable` («asignar a una constante»). TypeScript lo avisa antes incluso de ejecutar. El fallo se escribe en la línea 1 (`const`) y explota en la 3: por eso vale tocar cualquiera de las dos.

#### Reto 2 · Rellena el hueco · `s01-d05-r2` · concepto let

Completa para que el programa funcione y escriba 1.

```ts
___ contador = 0;
contador = 1;
console.log(contador);
```

Objetivo: `1`

- ✅ `let`: Correcto: el contador cambia en la línea 2, así que tiene que ser let.
- ▫️ `const`: Con const, la línea 2 fallaría: una const no se puede cambiar.
- ▫️ `Let`: Casi: las palabras del lenguaje van en minúscula.

Pistas: 1) Mira la línea 2: ¿qué le pasa al contador? 2) Si el valor cambia después, no puede ser const. 3) Es let, en minúsculas.

Explicación: Elige mirando el resto del programa: si la caja cambia más abajo, let; si no, const.

#### Reto 3 · Ordena las líneas · `s01-d05-r3` · concepto let

Ordena las líneas para que escriba «firmada». Ojo: sobra una.

Líneas (orden correcto):

```ts
let firma = "pendiente";
firma = "firmada";
console.log(firma);
```

Sobran: `const firma = "pendiente";`

Objetivo: `firmada`

Pistas: 1) La firma cambia de valor. ¿const o let? 2) Como cambia, la caja se crea con let. La línea con const sobra. 3) let, cambio, console.log.

Explicación: La línea con const parece igual de buena, pero con ella la línea del cambio fallaría. Elegir entre const y let es decidir si el dato va a cambiar.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s01-d05-x1` · concepto const

¿Qué escribe este programa?

```ts
const pais = "España";
console.log(pais);
pais = "Francia";
console.log(pais);
```

- ✅ `España ⏎ ❌ Error: no se puede cambiar una const`: Eso es: escribe España y se para al intentar cambiar la const.
- ▫️ `España ⏎ Francia`: pais es una const: la línea 3 no puede cambiarla, falla.
- ▫️ `❌ Error: no se puede cambiar una const`: La línea 2 va antes del fallo, así que «España» sí sale.
- ▫️ `Francia ⏎ Francia`: Se ejecuta de arriba abajo: el primer console.log va antes de cualquier cambio.

Pistas: 1) ¿Con qué palabra se creó pais? 2) Una const no se puede cambiar: la línea 3 da error y el programa se para. 3) Sale una línea antes del error.

Explicación: Es el fallo de la semana: cambiar una const. Lo anterior al fallo se ejecuta; lo posterior, no.

#### Repaso 2 · ¿Qué imprime? · `s01-d05-x2` · concepto let

¿Qué escribe este programa?

```ts
let fase = "uno";
const fin = "tres";
fase = "dos";
console.log(fase);
console.log(fin);
```

- ✅ `dos ⏎ tres`: Eso es: fase es let y cambia a «dos»; fin es const, pero nadie la toca.
- ▫️ `❌ Error: no se puede cambiar una const`: La línea 3 cambia fase, que es let. La const fin no se toca.
- ▫️ `uno ⏎ tres`: La línea 3 cambia fase antes de los console.log.

Pistas: 1) ¿Qué caja se cambia en la línea 3, y con qué se creó? 2) Cambiar una let está permitido. Lo que falla es cambiar una const. 3) No hay error. fase vale «dos».

Explicación: Una const en el programa no es un problema: solo falla si alguien intenta cambiarla.

#### Repaso 3 · Caza el fallo (Revisión) · `s01-rev-x3` · concepto const

Le pediste a la IA: «Cuenta las solicitudes: había 4 y ha llegado una más». Toca la línea que está mal.

```ts
const solicitudes = 4;
solicitudes = 5;
console.log(solicitudes);
```

- ✅ ``solicitudes` se creó con `const`, así que no se puede cambiar. Tenía que ser `let`.`: Exacto. Si un valor va a cambiar, se crea con `let`.
- ▫️ `Para cambiar el valor hay que repetir `const`: `const solicitudes = 5;``: Eso intentaría crear otra variable con el mismo nombre, y también daría error. El problema está en cómo se creó.
- ▫️ `Los números no se pueden cambiar, solo los textos.`: Se puede cambiar cualquier valor si la variable se creó con `let`.

Pistas: 1) El número de solicitudes tiene que cambiar. Mira cómo se creó la variable. 2) `const` es para lo que no cambia; `let`, para lo que sí. 3) ¿Permite la palabra de la línea 1 lo que hace la línea 2?

Explicación: Al ejecutarlo sale `TypeError: Assignment to constant variable` y no se imprime nada. La regla de la semana: usa `const` por defecto y `let` solo cuando el valor vaya a cambiar.

---

## Día 6: Mensajes con variables

**Objetivo:** Hoy aprendes a escribir en una sola línea un texto junto al valor de una variable, y por qué una variable no se puede usar antes de crearla.

### Microlección

**Pantalla 1 · codigo**

```ts
const plazo = 72;
console.log("Plazo:", plazo, "horas");
```

Salida: `Plazo: 72 horas`

Dentro de `console.log` puedes poner varias cosas separadas por **comas**. Las escribe en la misma línea, con un espacio entre cada una.

**Pantalla 2 · pasoapaso**

```ts
const persona = "Laura";
let total = 1;
console.log(persona, "pidió", total);
total = 2;
console.log(persona, "pidió", total);
```

- Línea 1: {"persona":"\"Laura\""} · Caja persona, con «Laura». No va a cambiar: const.
- Línea 2: {"persona":"\"Laura\"","total":"1"} · Caja total: las solicitudes que ha hecho Laura. Va a cambiar: let.
- Línea 3: {"persona":"\"Laura\"","total":"1"} · Junta tres cosas en una línea: dos cajas y un texto.
- Línea 4: {"persona":"\"Laura\"","total":"2"} · Llega otra solicitud: la caja pasa a 2.
- Línea 5: {"persona":"\"Laura\"","total":"2"} · La misma línea de código, con el valor nuevo.

**Pantalla 3 · codigo**

```ts
console.log("Plazo:", plazo);
const plazo = 72;
```

Salida: (nada) y error

Al revés no funciona. En la línea 1 la caja aún no existe: **Cannot access 'plazo' before initialization** («no se puede usar plazo antes de crearla»).

**Pantalla 4 · deiure**

DeIure usa esta misma forma para dejar mensajes de **depuración** (buscar fallos): un texto fijo, una coma y una variable.

```ts
console.log('[DEBUG formatZodErrors] Error message:', errorMessage);
```

`DeIure/src/lib/validations.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s01-d06-r1` · concepto console-log

¿Qué escribe este programa?

```ts
const dias = 30;
console.log("Quedan", dias, "días");
```

- ✅ `Quedan 30 días`: Eso es: tres cosas en una línea, separadas por espacios.
- ▫️ `Quedan dias días`: dias sin comillas es la caja: escribe su contenido, 30.
- ▫️ `Quedan ⏎ 30 ⏎ días`: Un solo console.log escribe una sola línea, aunque lleve comas.
- ▫️ `Quedan30días`: Las comas se convierten en espacios en la salida.

Pistas: 1) Hay un solo console.log. ¿Cuántas líneas saldrán? 2) Cada coma se convierte en un espacio, y las cajas se sustituyen por lo que llevan dentro. 3) La caja dias tiene un 30.

Explicación: Con comas, console.log junta textos y valores en una línea. Es la forma más rápida de comprobar qué hay en una caja.

#### Reto 2 · Rellena el hueco · `s01-d06-r2` · concepto console-log

Completa para que escriba «Avisar a la AEPD».

```ts
const quien = "la AEPD";
console.log("Avisar a", ___);
```

Objetivo: `Avisar a la AEPD`

- ✅ `quien`: Correcto: la caja, sin comillas, y console.log pone el espacio.
- ▫️ `"quien"`: Con comillas escribiría «Avisar a quien».
- ▫️ `AEPD`: Sin comillas, el ordenador busca una caja llamada AEPD, y no existe.

Pistas: 1) Lo que falta es el contenido de una caja. 2) Se escribe el nombre de la caja, sin comillas. 3) La caja se llama quien.

Explicación: Texto fijo con comillas, valor guardado sin ellas, y una coma entre los dos.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s01-rev-6` · concepto orden-ejecucion

La IA y Marta discuten qué imprime este código sobre una brecha. ¿Quién tiene razón?

```ts
console.log(estado);
let estado = "abierta";
```

- La IA: Imprime `abierta`. (El programa ya conoce todas las variables antes de empezar.)
- Marta: Da un error. (El código va de arriba abajo: en la línea 1, `estado` todavía no existe.)

Correcta: Marta

Pistas: 1) ¿Qué línea se ejecuta primero? 2) Una variable no existe hasta que se ejecuta la línea que la crea. 3) Cuando se ejecuta la línea 1, ¿se ha ejecutado ya la línea 2?

Explicación: Al ejecutarlo sale `ReferenceError: Cannot access 'estado' before initialization`: «no puedes usar estado antes de crearlo». Es la misma regla de siempre: **de arriba abajo**.

### Repaso (reserva)

#### Repaso 1 · Ordena las líneas · `s01-d06-x1` · concepto orden-ejecucion

Ordena las líneas para que escriba exactamente esto. Ojo: sobra una.

Líneas (orden correcto):

```ts
const titular = "Pedro";
console.log("Titular:", titular);
console.log("Solicitud recibida");
```

Sobran: `console.log("Titular:", "titular");`

Objetivo: `Titular: Pedro` / `Solicitud recibida`

Pistas: 1) Antes de usar titular, la caja tiene que existir. 2) Primero la const; luego el console.log que la usa, sin comillas. 3) La que sobra escribe la palabra «titular» en vez de «Pedro».

Explicación: Crear antes de usar, y sin comillas para el contenido de la caja.

#### Repaso 2 · ¿Qué imprime? · `s01-d06-x2` · concepto orden-ejecucion

¿Qué escribe este programa?

```ts
console.log("Inicio");
console.log("Titular:", titular);
const titular = "Pedro";
```

- ✅ `Inicio ⏎ ❌ Error: no se puede usar titular antes de crearla`: Eso es: «Inicio» sale y en la línea 2 la caja aún no existe.
- ▫️ `Inicio ⏎ Titular: Pedro`: La caja se crea en la línea 3, demasiado tarde para la línea 2.
- ▫️ `Inicio ⏎ Titular: titular`: Sin comillas, titular es una caja, no texto.

Pistas: 1) ¿En qué línea se crea titular? 2) Se ejecuta de arriba abajo: en la línea 2, titular todavía no existe. 3) Sale una línea y después el error.

Explicación: Una caja solo existe desde la línea en que se crea. Usarla antes da error.

---

## Día 7: Píldora: del fichero a la pantalla (píldora de informática)

**Objetivo:** Hoy aprendes qué pasa dentro del ordenador cuando ejecutas un programa, y cómo lo ejecutarás tú en el Mac con la orden node.

### Microlección

**Pantalla 1 · terminal**

`hola.ts`

```ts
const nombre = "Daniel";
console.log("Hola,", nombre);
```

```
$ node hola.ts
Hola, Daniel
```

Hasta hoy el taller ejecutaba el código por ti. En tu Mac lo harás desde la **terminal**, una ventana donde das órdenes escribiendo. `node hola.ts` quiere decir «Node, ejecuta este fichero».

**Pantalla 2 · esquema**

*Qué pasa al pulsar Enter*

**hola.ts** → Tu código. Para el ordenador, de momento es solo texto.

↓

**Node** → Lee el fichero, le quita lo que es solo de TypeScript y queda JavaScript, el lenguaje que sabe ejecutar.

↓

**Procesador** → El chip que ejecuta las órdenes, una detrás de otra, miles de millones por segundo.

↓

**Memoria** → Donde viven tus cajas (las variables) mientras el programa funciona.

↓

**Terminal** → Lo que escribe console.log aparece aquí.

**Pantalla 3 · codigo**

```ts
const plazo: number = 72;
console.log(plazo);
```

Salida: `72`

Esto es TypeScript: `: number` es una nota que dice «aquí va un número». Sirve para que el editor te avise de errores, como el de la const del día 5. Node la borra antes de ejecutar, y queda `const plazo = 72;`, que es JavaScript.

**Pantalla 4 · texto**

Las cajas viven en la **memoria** solo mientras el programa funciona. Cuando termina, desaparecen. Por eso, para que un dato dure, hay que guardarlo en un fichero o en una **base de datos**. Así se guarda, por ejemplo, tu racha del taller.

**Pantalla 5 · deiure**

DeIure es lo mismo a lo grande. Cuando una IA te dice «ejecuta `npm run dev`», es una orden de terminal que acaba pidiendo a Node que ponga en marcha miles de ficheros. Y sus EIPD no se pierden al apagar porque se guardan en una base de datos (PostgreSQL), no en la memoria.

```ts
"dev": "next dev --webpack --port 3002",
```

`DeIure/package.json`

### Retos

#### Reto 1 · ¿Qué imprime? · `s01-d07-r1` · concepto ordenador

Ejecutas este fichero con node. ¿Qué aparece en la terminal?

```ts
const plazo: number = 72;
console.log(plazo);
```

- ✅ `72`: Eso es: Node quita `: number` y ejecuta el resto.
- ▫️ `number`: `: number` es solo una nota para el editor. No se escribe en ningún sitio.
- ▫️ `plazo: number = 72`: La terminal no enseña tu código: enseña lo que escribe console.log.
- ▫️ `❌ Error: Node no entiende TypeScript`: Node quita los tipos antes de ejecutar, así que funciona.

Pistas: 1) ¿Qué hace Node con lo que es solo de TypeScript? 2) Lo quita. Queda const plazo = 72; console.log(plazo); 3) Sale lo que hay en la caja plazo.

Explicación: Los tipos de TypeScript ayudan mientras escribes, pero no cambian lo que hace el programa: Node los borra y ejecuta JavaScript.

#### Reto 2 · Caza el fallo (Revisión) · `s01-rev-7` · concepto orden-ejecucion

Le pediste a la IA: «Cambia el estado de la brecha a notificada e imprímelo». Toca la línea que está mal.

```ts
let estado = "detectada";
console.log(estado);
estado = "notificada";
```

- ✅ `Imprime antes de cambiar el valor. Hay que cambiarlo primero e imprimir después.`: Eso es. El programa imprime `detectada` y cambia el valor cuando ya no se va a imprimir nada más.
- ▫️ `Una variable creada con `let` no se puede cambiar.`: Al revés: `let` es precisamente para las variables que cambian. La que no se puede cambiar es `const`.
- ▫️ `Tendría que ser `console.log("notificada")`.`: Eso imprimiría la palabra, pero sin usar la variable. Lo que se pidió es cambiar `estado` e imprimir su valor.

Pistas: 1) ¿Qué imprime este programa? ¿Es lo que pediste? 2) El programa va de arriba abajo: `console.log` imprime el valor que hay **en ese momento**. 3) Cuando se ejecuta la línea 2, ¿qué vale `estado`?

Explicación: Imprime `detectada`, no `notificada`. No hay ningún error: el código funciona, pero hace las cosas en mal orden. Estos fallos silenciosos son los más peligrosos, porque nada te avisa.

#### Reto 3 · Ordena las líneas · `s01-d07-r3` · concepto let

Repaso de la semana: ordena las líneas para que escriba exactamente esto. Ojo: sobra una.

Líneas (orden correcto):

```ts
let dias = 30;
console.log("Quedan", dias, "días");
dias = 10;
console.log("Quedan", dias, "días");
```

Sobran: `const dias = 30;`

Objetivo: `Quedan 30 días` / `Quedan 10 días`

Pistas: 1) El valor cambia de 30 a 10. ¿const o let? 2) Créala con let; el cambio va entre los dos console.log. 3) let, console.log, cambio, console.log. La const sobra.

Explicación: Toda la semana en cuatro líneas: crear con let porque cambia, escribir con comas, cambiar sin repetir let y volver a escribir.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s01-d07-x1` · concepto terminal

Este es el fichero aviso.ts. ¿Qué aparece en la terminal al escribir node aviso.ts?

```ts
const plazo = 72;
console.log("Plazo:", plazo, "horas");
console.log("Fin");
```

- ✅ `Plazo: 72 horas ⏎ Fin`: Eso es: una línea por cada console.log, con el valor de la caja.
- ▫️ `aviso.ts`: La terminal no repite el nombre del fichero: muestra lo que escribe console.log.
- ▫️ `Plazo: plazo horas ⏎ Fin`: plazo va sin comillas: es la caja, y dentro hay un 72.
- ▫️ `Plazo: 72 horas`: La línea 3 también es un console.log: falta «Fin».

Pistas: 1) En la terminal solo aparece lo que escribe console.log. 2) Hay dos console.log: dos líneas de salida. 3) La primera es «Plazo: 72 horas».

Explicación: Ejecutar un fichero en la terminal es lo mismo que has hecho toda la semana en el taller: la salida es lo que escriben los console.log.

#### Repaso 2 · Rellena el hueco · `s01-d07-x2` · concepto terminal

Completa para que escriba la orden «node hola.ts».

```ts
const archivo = "hola.ts";
console.log("node", ___);
```

Objetivo: `node hola.ts`

- ✅ `archivo`: Correcto: la caja archivo contiene «hola.ts».
- ▫️ `"archivo"`: Con comillas escribiría la palabra «archivo».
- ▫️ `hola.ts`: Sin comillas, el ordenador busca una caja llamada hola, y no existe.

Pistas: 1) El nombre del fichero ya está guardado en una caja. 2) Usa la caja: su nombre, sin comillas. 3) La caja se llama archivo.

Explicación: Lo mismo de toda la semana: el texto fijo entre comillas, el dato guardado por su nombre.

