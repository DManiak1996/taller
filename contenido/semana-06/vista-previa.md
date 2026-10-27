# Semana 6: vista previa

Generado desde los JSON. Para revisar el contenido sin abrir el formato.

---

## Día 1: Una receta con nombre: function

**Objetivo:** Hoy aprendes a guardar un grupo de órdenes con un nombre usando function, y a ejecutarlo cuando quieras llamándolo.

### Microlección

**Pantalla 1 · texto**

Una **función** es una receta con nombre: un grupo de órdenes que escribes una vez y ejecutas cuando quieras. Es como una cláusula tipo del despacho: se redacta una vez y se usa en cada contrato.

**Pantalla 2 · pasoapaso**

```ts
function saludar() {
  console.log("Buenos días");
}
saludar();
saludar();
```

- Línea 2: {"saludar":"función"} · Las líneas 1 a 3 solo guardan la receta. La línea 4 la **llama**: el programa salta dentro y ejecuta la línea 2.
- Línea 4: {"saludar":"función"} · Acaba la función y vuelve a la línea 4, donde estaba.
- Línea 2: {"saludar":"función"} · La línea 5 la llama otra vez: vuelve a saltar dentro.
- Línea 5: {"saludar":"función"} · Vuelve a la línea 5 y el programa termina. Una receta, dos usos.

**Pantalla 3 · codigo**

```ts
function firmar() {
  console.log("Firmado");
}
console.log("Fin");
```

Salida: `Fin`

Escribir una función **no la ejecuta**: solo guarda la receta. Aquí nadie la llama, así que «Firmado» no sale nunca. Para ejecutarla hay que **llamarla**: su nombre y `()`.

**Pantalla 4 · texto**

Las partes: `function`, el nombre (con las reglas de siempre para los nombres), `()` y, entre llaves, el **cuerpo**, que son las órdenes. Al revisar código de una IA, busca dos fallos: una función que nadie llama y una llamada sin paréntesis, `saludar;`, que no da error pero tampoco hace nada.

**Pantalla 5 · deiure**

En las librerías de DeIure, la palabra `function` aparece más de 4.000 veces. Esta es de las más cortas: da la lista de iconos de la barra del escritorio, que de entrada está vacía. Lo de `: DockItem[]` es un tipo (llegarán más adelante) y `return` lo verás pasado mañana.

```ts
export function defaultDockItems(): DockItem[] {
  return [];
}
```

`DeIure/src/lib/desktop/dock-preferences.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s06-d01-r1` · concepto funciones

¿Qué escribe este programa?

```ts
function avisar() {
  console.log("Aviso");
}
console.log("Inicio");
avisar();
avisar();
```

- ✅ `Inicio ⏎ Aviso ⏎ Aviso`: Eso es: la función solo se ejecuta cuando se la llama, y se la llama dos veces después de «Inicio».
- ▫️ `Aviso ⏎ Inicio ⏎ Aviso ⏎ Aviso`: Escribir la función no la ejecuta: «Aviso» solo sale cuando se la llama.
- ▫️ `Inicio ⏎ Aviso`: Se la llama dos veces: dos avisos.

Pistas: 1) Las líneas 1 a 3, ¿escriben algo por sí solas? 2) No: solo guardan la receta. Sale algo cuando se llama a avisar(). 3) Primero «Inicio» y luego una línea por cada llamada.

Explicación: El orden de lo que sale lo deciden las llamadas, no el sitio donde está escrita la función.

#### Reto 2 · Rellena el hueco · `s06-d01-r2` · concepto funciones

Completa la última línea para que la función se ejecute y escriba «Cerrado».

```ts
function cerrar() {
  console.log("Cerrado");
}
___;
```

Objetivo: `Cerrado`

- ✅ `cerrar()`: Correcto: el nombre y los paréntesis la llaman.
- ▫️ `cerrar`: Sin paréntesis no la llama: no da error, pero no hace nada.
- ▫️ `Cerrado()`: Cerrado es lo que escribe, no el nombre de la función: da error.
- ▫️ `function cerrar()`: Eso empieza a escribir otra función. Para usarla basta su nombre y ().

Pistas: 1) Hay que llamarla. 2) Llamar a una función es escribir su nombre seguido de algo. 3) Su nombre y ().

Explicación: Los paréntesis son los que la ponen en marcha. Sin ellos, solo la nombras.

#### Reto 3 · Caza el fallo (Revisión) · `s06-rev-1` · concepto funciones

Le pediste a la IA: «Escribe una función que avise de la brecha y úsala». No imprime nada. Toca la línea que está mal.

```ts
function avisar() {
  console.log("Brecha detectada");
}
avisar;
```

- ✅ `Sin paréntesis no se llama a la función: solo se nombra. Tenía que ser `avisar();`.`: Exacto. Los paréntesis son los que dicen «ejecútala ahora».
- ▫️ `Falta un `return` dentro de la función.`: Esta función solo imprime; no tiene que devolver nada. El problema es que nunca llega a ejecutarse.
- ▫️ `La función tiene que estar debajo de la línea que la usa.`: Primero se define y luego se usa, como está. Mira cómo se usa en la línea 4.

Pistas: 1) Definir una función no la ejecuta. ¿Dónde se ejecuta? 2) Para llamar a una función se escribe su nombre y `()`. 3) ¿Qué le falta a la línea 4?

Explicación: No imprime nada. Las líneas 1 a 3 solo preparan la receta, y la línea 4 la nombra pero no la cocina. Con `avisar();` se ejecuta. No da ningún error, así que al revisar comprueba que cada función se llama de verdad.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s06-d01-x1` · concepto funciones

¿Qué escribe este programa?

```ts
function paso() {
  console.log("Paso");
}
paso;
paso();
```

- ✅ `Paso`: Eso es: paso; sin paréntesis no la llama. Solo la línea 5 la ejecuta.
- ▫️ `Paso ⏎ Paso`: La línea 4 no lleva paréntesis: no la llama.
- ▫️ `❌ Error en la línea 4`: No da error: simplemente no hace nada.

Pistas: 1) Compara las líneas 4 y 5. 2) Solo con () se llama a la función. 3) Una sola llamada de verdad.

Explicación: Una llamada sin paréntesis es un fallo silencioso: no hay error que te avise.

#### Repaso 2 · ¿Quién tiene razón? (Revisión) · `s06-rev-x1` · concepto funciones

Aquí se llama a la función antes de escribirla. La IA y Marta discuten qué pasa. ¿Quién tiene razón?

```ts
avisar();
function avisar() {
  console.log("Aviso enviado");
}
```

- La IA: Imprime `Aviso enviado`. (Las funciones hechas con `function` se preparan antes de que empiece el programa.)
- Marta: Da un error. (El código va de arriba abajo, y en la línea 1 la función todavía no existe.)

Correcta: La IA

Pistas: 1) Fíjate en cómo se crea: con `function`, no con `const`. 2) Las `function` se preparan antes de que el programa empiece. 3) ¿Pasaría lo mismo con `const avisar = () => ...`?

Explicación: Imprime `Aviso enviado`. Las funciones hechas con `function` están listas desde el principio; las flechas guardadas en `const`, no (con ellas sí daría error). Aun así, es más claro definir antes de usar.

---

## Día 2: Datos de entrada: parámetros

**Objetivo:** Hoy aprendes a pasarle datos a una función con parámetros, para que la misma receta sirva para casos distintos.

### Microlección

**Pantalla 1 · pasoapaso**

```ts
function avisar(nombre) {
  console.log("Aviso a", nombre);
}
avisar("Laura");
avisar("Marta");
```

- Línea 2: {"avisar":"función","nombre":"\"Laura\""} · La línea 4 llama a avisar con «Laura». Al saltar dentro, la caja nombre se llena con «Laura».
- Línea 4: {"avisar":"función"} · Termina la función y vuelve a la línea 4. Fuera de la función, nombre ya no existe.
- Línea 2: {"avisar":"función","nombre":"\"Marta\""} · Nueva llamada: esta vez nombre vale «Marta».
- Línea 5: {"avisar":"función"} · La misma receta, con un dato distinto en cada llamada.

**Pantalla 2 · texto**

`nombre` es un **parámetro**: una caja que la función crea al empezar y llena con lo que le pasas al llamarla. Lo que le pasas, `"Laura"`, se llama **argumento**. Es como el hueco «[NOMBRE DEL INTERESADO]» de un modelo de carta: cada vez se rellena con uno distinto.

**Pantalla 3 · codigo**

```ts
function avisar(nombre) {
  console.log("Aviso a", nombre);
}
avisar();
```

Salida: `Aviso a undefined`

Si no le pasas nada, el parámetro vale **undefined** («sin definir»). No da error: escribe algo raro y sigue. Al revisar código, comprueba que cada llamada lleva sus argumentos.

**Pantalla 4 · deiure**

Cada carpeta de proyecto del escritorio de DeIure tiene un identificador: «project:» y el número del proyecto. Lo fabrica una función con un parámetro, `projectId`. Lo de `: string` son tipos (llegarán más adelante) y `return` lo verás mañana.

```ts
export function projectResourceId(projectId: string): string {
  return `project:${projectId}`;
}
```

`DeIure/src/lib/desktop/desktop-resource.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s06-d02-r1` · concepto parametros-return

¿Qué escribe este programa?

```ts
function plazo(dias) {
  console.log("Quedan", dias);
}
plazo(10);
plazo(3);
```

- ✅ `Quedan 10 ⏎ Quedan 3`: Eso es: en cada llamada, dias vale lo que se le pasa.
- ▫️ `Quedan dias ⏎ Quedan dias`: dias va sin comillas: es la caja, con el número de cada llamada.
- ▫️ `Quedan 10 ⏎ Quedan 10`: En la segunda llamada, dias vale 3: cada llamada llena la caja de nuevo.

Pistas: 1) ¿Qué vale dias en la primera llamada? ¿Y en la segunda? 2) El parámetro toma el valor del argumento de cada llamada. 3) 10 y luego 3.

Explicación: El parámetro es una caja nueva en cada llamada, llena con lo que le pases esa vez.

#### Reto 2 · Rellena el hueco · `s06-d02-r2` · concepto parametros-return

Completa la llamada para que escriba «Hola, Ana».

```ts
function saludo(nombre) {
  console.log(`Hola, ${nombre}`);
}
saludo(___);
```

Objetivo: `Hola, Ana`

- ✅ `"Ana"`: Correcto: el argumento es un texto, así que va entre comillas.
- ▫️ `Ana`: Sin comillas, Ana sería el nombre de una caja que no existe: da error.
- ▫️ `nombre`: nombre solo existe dentro de la función. Aquí fuera no existe: da error.
- ▫️ `"nombre"`: Eso pasa la palabra «nombre»: escribiría «Hola, nombre».

Pistas: 1) Lo que va entre los paréntesis de la llamada es el dato que recibe nombre. 2) El dato es un texto. 3) Los textos van entre comillas.

Explicación: El parámetro se llama nombre dentro de la función, pero al llamarla le pasas el dato en sí.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s06-rev-2` · concepto parametros-return

La IA y Marta discuten qué pasa al llamar a la función sin darle el nombre. ¿Quién tiene razón?

```ts
function saludar(nombre) {
  console.log(`Hola, ${nombre}`);
}
saludar();
```

- La IA: Da un error. (La función necesita un nombre y no se lo hemos dado.)
- Marta: Imprime `Hola, ` y nada más. (Como no hay nombre, ese hueco se queda vacío.)

Correcta: ninguno

Pistas: 1) ¿Qué valor recibe `nombre` en la línea 4? 2) Un parámetro sin argumento vale `undefined`, igual que una posición vacía de una lista. 3) ¿Qué hace la plantilla con `undefined`?

Explicación: Imprime `Hola, undefined`. En la ejecución no hay error, pero TypeScript lo subraya en el editor: «Expected 1 arguments, but got 0». Cuando veas `undefined` en una salida, busca un dato que no ha llegado.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s06-d02-x1` · concepto parametros-return

¿Qué escribe este programa?

```ts
function ver(x) {
  console.log(x);
}
ver();
ver(0);
```

- ✅ `undefined ⏎ 0`: Eso es: sin argumento, x vale undefined; con 0, vale 0.
- ▫️ `0 ⏎ 0`: La primera llamada no pasa nada: x vale undefined.
- ▫️ `❌ Error: falta el argumento`: No da error: sin argumento, x vale undefined y el programa sigue.

Pistas: 1) ¿Qué se le pasa en la línea 4? 2) Nada: el parámetro se queda sin definir. 3) undefined y luego 0.

Explicación: Un argumento olvidado no detiene el programa: aparece como undefined más adelante, y por eso cuesta encontrarlo.

---

## Día 3: Devolver un resultado: return

**Objetivo:** Hoy aprendes a que una función devuelva un resultado con return, para guardarlo y usarlo después, y en qué se diferencia de escribirlo con console.log.

### Microlección

**Pantalla 1 · pasoapaso**

```ts
function doble(n) {
  return n * 2;
}
const a = doble(5);
console.log(a);
```

- Línea 2: {"doble":"función","n":"5"} · La línea 4 llama a doble con 5. Dentro, n vale 5, y return **devuelve** n * 2, que es 10.
- Línea 4: {"doble":"función","a":"10"} · El 10 vuelve a la línea 4, al sitio de la llamada, y se guarda en a.
- Línea 5: {"doble":"función","a":"10"} · Ahora el resultado está en una caja: puedes escribirlo o usarlo para otro cálculo.

**Pantalla 2 · texto**

`return` («devolver») hace dos cosas: **entrega un resultado** a quien llamó y **termina la función**. Es como pedirle un informe a un compañero: te lo devuelve y tú decides qué haces con él. `console.log`, en cambio, solo lo escribe en la pantalla: no te lo da.

**Pantalla 3 · codigo**

```ts
function doble(n) {
  console.log(n * 2);
}
const a = doble(5);
console.log(a);
```

Salida: `10` / `undefined`

El fallo más típico de la semana: la función **escribe** el resultado, pero no lo **devuelve**. Sin return, la llamada vale undefined y a se queda sin el dato.

**Pantalla 4 · codigo**

```ts
function estado(dias) {
  if (dias > 30) {
    return "Fuera";
  }
  return "En plazo";
}
console.log(estado(40));
console.log(estado(12));
```

Salida: `Fuera` / `En plazo`

return termina la función en el acto. Con 40, sale por el primer return y ya no llega al segundo. Con 12, el if no entra y llega al return del final.

**Pantalla 5 · deiure**

Al compartir una carpeta, DeIure enseña un texto según el estado. El primer return que se cumple decide y termina la función; si no se cumple ninguno, llega al del final. (Un if con una sola orden puede ir sin llaves.)

```ts
if (state === 'review_pending') return 'Pendiente de aprobación';
if (state === 'compensating') return 'Recuperando la carpeta…';
return 'Compartiendo…';
```

`DeIure/src/lib/desktop/sharing-progress.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s06-d03-r1` · concepto parametros-return

¿Qué escribe este programa?

```ts
function triple(n) {
  return n * 3;
}
const x = triple(2);
console.log(x + 1);
```

- ✅ `7`: Eso es: triple(2) devuelve 6, se guarda en x, y 6 + 1 es 7.
- ▫️ `6`: Falta el + 1 de la última línea.
- ▫️ `undefined`: Aquí sí hay return: triple(2) vale 6.

Pistas: 1) ¿Qué devuelve triple(2)? 2) Devuelve 6, y se guarda en x. 3) La última línea escribe x + 1.

Explicación: Lo que devuelve una función se puede guardar y seguir usando, como cualquier otro dato.

#### Reto 2 · Rellena el hueco · `s06-d03-r2` · concepto parametros-return

Completa la función para que escriba 21, el 21 % de 100.

```ts
function iva(precio) {
  ___;
}
console.log(iva(100));
```

Objetivo: `21`

- ✅ `return precio * 0.21`: Correcto: devuelve el cálculo, y la última línea lo escribe.
- ▫️ `console.log(precio * 0.21)`: Escribe 21 dentro, pero no lo devuelve: la última línea escribe además undefined.
- ▫️ `precio * 0.21`: Calcula, pero no devuelve nada: sale undefined.

Pistas: 1) ¿Quién escribe en la pantalla, la función o la última línea? 2) La última línea escribe lo que devuelve iva(100). 3) Hace falta devolver el cálculo.

Explicación: Calcular no basta: sin return, el resultado se pierde al terminar la función.

#### Reto 3 · Caza el fallo (Revisión) · `s06-rev-3` · concepto parametros-return

Le pediste a la IA: «Haz una función que pase días a horas». Sale `undefined`. Toca la línea que está mal.

```ts
function aHoras(dias) {
  dias * 24;
}
const horas = aHoras(3);
console.log(horas);
```

- ✅ `Calcula, pero no devuelve nada. Falta `return`: `return dias * 24;`.`: Exacto. Sin `return`, la función hace la cuenta y la tira. Es el fallo de la semana.
- ▫️ `Hay que poner `console.log(dias * 24)` dentro de la función.`: Así lo verías en pantalla, pero `horas` seguiría valiendo `undefined`. Imprimir no es devolver.
- ▫️ ``aHoras(3)` tendría que ir sin paréntesis.`: Sin paréntesis no se llamaría a la función. La llamada está bien; mira lo que hay dentro.

Pistas: 1) ¿Qué recibe `horas` de la función? 2) Una función solo da un resultado si lo devuelve con `return`. 3) ¿Hay algún `return` en la función?

Explicación: Imprime `undefined`. La función calcula 72, pero sin `return` el resultado se pierde. Es el fallo más típico de la IA con funciones, y uno de los más difíciles de ver: no hay error, solo un `undefined` que aparece más adelante.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s06-d03-x1` · concepto parametros-return

¿Qué escribe este programa?

```ts
function f(n) {
  return n + 1;
  console.log("Hola");
}
console.log(f(1));
```

- ✅ `2`: Eso es: return termina la función, y la línea 3 no llega a ejecutarse.
- ▫️ `Hola ⏎ 2`: La línea 3 va después del return: no se ejecuta nunca.
- ▫️ `2 ⏎ Hola`: Después de return no se ejecuta nada de la función.

Pistas: 1) ¿Qué pasa con la función al llegar a return? 2) Termina en el acto. 3) Solo sale lo que escribe la última línea.

Explicación: Una línea después de return no se ejecuta nunca. En VS Code sale en gris: es código «inalcanzable».

#### Repaso 2 · Caza el fallo (Revisión) · `s06-rev-x2` · concepto parametros-return

Le pediste a la IA: «Haz una función que sume una lista de horas». Tenía que salir 90. Toca la línea que está mal.

```ts
function suma(lista) {
  let total = 0;
  for (const n of lista) {
    total = total + n;
    return total;
  }
}
console.log(suma([10, 30, 50]));
```

- ✅ `El `return` está dentro del bucle: sale de la función en la primera vuelta. Tiene que ir después del bucle.`: Exacto. `return` termina la función en el acto, aunque el bucle no haya acabado.
- ▫️ ``total` tiene que crearse dentro del bucle.`: Así se reiniciaría en cada vuelta. Crearlo fuera está bien; mira dónde está el `return`.
- ▫️ `Hay que usar un `for` con `i` en vez de `for...of`.`: `for...of` vale para sumar. El problema es que el bucle no llega a dar más de una vuelta.

Pistas: 1) ¿Cuántas vueltas llega a dar el bucle? 2) `return` termina la función en ese mismo momento. 3) ¿Está el `return` dentro o fuera de las llaves del `for`?

Explicación: Imprime `10`: suma el primero y se va. Lo que va después de un `return` no se ejecuta, y eso incluye las vueltas que le quedaban al bucle. La sangría ayuda a verlo: el `return` está al nivel de dentro del bucle.

---

## Día 4: Varios parámetros, en su orden

**Objetivo:** Hoy aprendes a escribir funciones con varios parámetros, por qué importa el orden de los argumentos y cómo una función puede responder sí o no.

### Microlección

**Pantalla 1 · codigo**

```ts
function quedan(plazo, pasadas) {
  return plazo - pasadas;
}
console.log(quedan(72, 20));
console.log(quedan(20, 72));
```

Salida: `52` / `-52`

Los argumentos se reparten **por orden**: el primero va al primer parámetro y el segundo, al segundo. Al revés no hay error, pero el resultado es otro.

**Pantalla 2 · texto**

Es un fallo silencioso, y muy típico de la IA: los nombres no ayudan a repartir. Aunque fuera tengas una caja llamada `pasadas`, si la pones la primera, irá a `plazo`. Para revisarlo, prueba la función con un caso cuyo resultado sepas de memoria.

**Pantalla 3 · codigo**

```ts
function enPlazo(dias) {
  return dias <= 30;
}
console.log(enPlazo(12));
if (enPlazo(45)) {
  console.log("Bien");
} else {
  console.log("Reclamar");
}
```

Salida: `true` / `Reclamar`

Una función puede devolver true o false. Así una pregunta queda con un nombre claro y se usa directamente en un if. Suelen llamarse `es…`, `tiene…` o, en inglés, `is…` y `has…`.

**Pantalla 4 · deiure**

Si subes un fichero cuyo nombre ya existe, DeIure le añade un número: «informe.pdf» pasa a ser «informe (2).pdf». La función recibe dos datos y en este orden: primero el nombre y después el número.

```ts
export function fileNameWithSuffix(fileName: string, index: number): string {
```

`DeIure/src/lib/file-name-conflict.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s06-d04-r1` · concepto parametros-return

¿Qué escribe este programa?

```ts
function media(total, n) {
  return total / n;
}
console.log(media(10, 2));
console.log(media(2, 10));
```

- ✅ `5 ⏎ 0.2`: Eso es: en la segunda llamada, total vale 2 y n vale 10.
- ▫️ `5 ⏎ 5`: El orden cambia el reparto: en la segunda, total recibe 2 y n recibe 10.
- ▫️ `5 ⏎ ❌ Error: argumentos al revés`: No hay error: solo un resultado distinto. Por eso cuesta verlo.

Pistas: 1) En cada llamada, ¿qué va a total y qué va a n? 2) El primer argumento va a total y el segundo a n. 3) 10 / 2 y luego 2 / 10.

Explicación: Cambiar el orden de los argumentos no rompe el programa: lo hace mentir. Hay que mirarlo en cada llamada.

#### Reto 2 · Rellena el hueco · `s06-d04-r2` · concepto parametros-return

Completa la función para que diga si a es mayor que b: true con (5, 3) y false con (3, 3).

```ts
function mayor(a, b) {
  return a ___ b;
}
console.log(mayor(5, 3));
console.log(mayor(3, 3));
```

Objetivo: `true` / `false`

- ✅ `>`: Correcto: 5 > 3 es true y 3 > 3 es false.
- ▫️ `>=`: 3 >= 3 es true: la segunda línea saldría true.
- ▫️ `<`: Al revés: 5 < 3 es false.
- ▫️ `===`: 5 === 3 es false: la primera saldría false.

Pistas: 1) La función devuelve directamente el resultado de una comparación. 2) «Mayor que», sin incluir el igual. 3) Con 3 y 3 tiene que dar false.

Explicación: Una función que devuelve una comparación responde sí o no. Pruébala siempre en el límite, como con 3 y 3.

#### Reto 3 · Caza el fallo (Revisión) · `s06-rev-4` · concepto parametros-return

Le pediste a la IA: «Han pasado 50 horas y el límite es 72: di si estamos en plazo». Sale `false`. Toca la línea que está mal.

```ts
function enPlazo(horas, limite) {
  return horas <= limite;
}
console.log(enPlazo(72, 50));
```

- ✅ `Los argumentos van al revés: `horas` recibe 72 y `limite` recibe 50. Tenía que ser `enPlazo(50, 72)`.`: Exacto. Cada argumento va al parámetro que ocupa su mismo puesto, sin mirar el nombre.
- ▫️ `La comparación tenía que ser `horas >= limite`.`: La función está bien: está en plazo si las horas no pasan del límite. El fallo está en cómo se la llama.
- ▫️ `Una función no puede devolver `true` o `false`.`: Puede devolver lo que quieras, también `true` o `false`. Mira el orden de los números de la línea 4.

Pistas: 1) ¿Qué valor recibe `horas` en esta llamada? 2) El primer argumento va al primer parámetro, y el segundo al segundo. 3) Compara el orden de la línea 1 con el de la línea 4.

Explicación: Imprime `false`: la función cree que han pasado 72 horas con un límite de 50. El orden de los argumentos importa, y si se cambia no hay error. Al revisar una llamada, ponla al lado de la definición y empareja cada valor con su parámetro.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s06-d04-x1` · concepto parametros-return

¿Qué escribe este programa?

```ts
function txt(n, unidad) {
  return `${n} ${unidad}`;
}
console.log(txt("h", 72));
```

- ✅ `h 72`: Eso es: va por orden. n recibe "h" y unidad recibe 72.
- ▫️ `72 h`: Los argumentos van al revés de lo que parece: n recibe "h".
- ▫️ `❌ Error: n tiene que ser un número`: Aquí nada comprueba los tipos. Con tipos de TypeScript, el editor sí lo marcaría.

Pistas: 1) ¿Qué recibe n? ¿Y unidad? 2) El primer argumento va al primer parámetro. 3) n es "h" y unidad es 72.

Explicación: Este es uno de los fallos que TypeScript evita: con tipos, el editor avisa si pasas un texto donde va un número.

#### Repaso 2 · Caza el fallo (Revisión) · `s06-rev-x3` · concepto parametros-return

Tu despacho se fija un plazo interno de 30 días para responder. Le pediste a la IA: «Di si un día aún está dentro del plazo». El día 30 sale fuera. Toca la línea que está mal.

```ts
function enPlazo(dias) {
  return dias < 30;
}
console.log(enPlazo(30));
```

- ✅ `Con `<`, el día 30 no entra. Tenía que ser `dias <= 30`.`: Exacto. El límite de siempre, ahora escondido dentro de una función.
- ▫️ `Falta un `if` que devuelva `true` o `false`.`: La comparación ya da `true` o `false`, y se puede devolver tal cual. El problema es qué comparación.
- ▫️ `La llamada tendría que ser `enPlazo(31)`.`: Lo que preguntas es si el día 30 está en plazo, así que la llamada está bien. Mira la comparación.

Pistas: 1) Con 30 días, ¿debería estar en plazo? 2) `<` deja fuera el propio límite; `<=` lo incluye. 3) ¿Es 30 menor que 30?

Explicación: Imprime `false`. Una función con un nombre claro (`enPlazo`) da confianza, pero hay que mirar dentro. Pruébala con el valor del límite: es donde se esconden estos fallos.

---

## Día 5: Lo de dentro se queda dentro

**Objetivo:** Hoy aprendes qué variables puede ver una función y cuáles no, y por qué lo que se crea dentro de una función no existe fuera.

### Microlección

**Pantalla 1 · codigo**

```ts
function calcular() {
  const total = 50;
  console.log(total);
}
calcular();
console.log(total);
```

Salida: `50` y error

total se crea **dentro** de la función: solo existe ahí, mientras se ejecuta. Fuera, el programa falla con **total is not defined**. El trozo de código donde existe una variable es su **ámbito**.

**Pantalla 2 · texto**

Piensa en una sala de reuniones con pizarra: lo que se apunta dentro se borra al salir. Desde dentro se ve el cartel del pasillo, pero desde el pasillo no se ve la pizarra. Ya lo viste con los bucles: la `i` de un `for` no existe después del bucle.

**Pantalla 3 · pasoapaso**

```ts
const tarifa = 100;
function coste(horas) {
  const total = horas * tarifa;
  return total;
}
const precio = coste(3);
console.log(precio);
```

- Línea 1: {"tarifa":"100"} · tarifa se crea fuera de todo: se ve desde cualquier sitio.
- Línea 3: {"tarifa":"100","coste":"función","horas":"3","total":"300"} · La línea 6 llama a coste con 3. Dentro existen horas y total, y desde dentro también se ve tarifa.
- Línea 4: {"tarifa":"100","coste":"función","horas":"3","total":"300"} · Devuelve total.
- Línea 6: {"tarifa":"100","coste":"función","precio":"300"} · De vuelta fuera, horas y total han desaparecido. Solo queda lo que se devolvió, guardado en precio.
- Línea 7: {"tarifa":"100","coste":"función","precio":"300"} · Lo único que sale de una función es lo que devuelve.

**Pantalla 4 · codigo**

```ts
const estado = "abierta";
function cerrar() {
  const estado = "cerrada";
  return estado;
}
console.log(cerrar());
console.log(estado);
```

Salida: `cerrada` / `abierta`

Dentro de la función se crea **otra** caja estado, distinta de la de fuera, que no cambia. Dos cajas con el mismo nombre confunden: al revisar código, desconfía de ellas.

**Pantalla 5 · deiure**

Cuando un usuario lleva 30 días de baja, DeIure cambia su nombre por un seudónimo como «DEL-USR-a8Kd2pQz». prefix y random solo existen dentro de la función: fuera llega únicamente el seudónimo que devuelve. (El `|| 'USR'` pone «USR» si el rol no está en la lista.)

```ts
function generatePseudonym(role: string): string {
  const prefix = ROLE_PREFIX[role] || 'USR';
  const random = nanoid(8);
  return `DEL-${prefix}-${random}`;
}
```

`DeIure/src/lib/pseudonymization.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s06-d05-r1` · concepto ambito

¿Qué escribe este programa?

```ts
let total = 1;
function poner() {
  let total = 5;
  return total;
}
poner();
console.log(total);
```

- ✅ `1`: Eso es: el let de dentro crea otra caja. La de fuera sigue valiendo 1.
- ▫️ `5`: Dentro se crea una caja nueva con let: la de fuera no se toca.
- ▫️ `❌ Error: total ya existe`: Dentro de la función empieza otro ámbito: puede tener su propia caja con el mismo nombre.

Pistas: 1) ¿Cuántas cajas total hay? 2) Dos: la de fuera y la que crea el let de dentro. 3) La última línea está fuera.

Explicación: let o const dentro de una función crean una caja nueva, aunque fuera haya otra con el mismo nombre.

#### Reto 2 · Rellena el hueco · `s06-d05-r2` · concepto ambito

Completa la última línea para que escriba 15.

```ts
const base = 10;
function sumar(n) {
  return base + n;
}
console.log(___);
```

Objetivo: `15`

- ✅ `sumar(5)`: Correcto: n vale 5, y desde dentro se ve base, que vale 10.
- ▫️ `base + n`: n solo existe dentro de sumar: aquí fuera da error.
- ▫️ `sumar`: Sin paréntesis no la llama: escribe la función, no 15.
- ▫️ `sumar(15)`: Devolvería 10 + 15, que es 25.

Pistas: 1) Fuera de la función, ¿existe n? 2) No: para usar n hay que llamar a la función y pasarle el dato. 3) base ya vale 10; faltan 5.

Explicación: Desde fuera no se puede tocar lo de dentro: se le pasan datos como argumentos y se recoge lo que devuelve.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s06-rev-5` · concepto ambito

La IA y Marta discuten qué pasa con este código. ¿Quién tiene razón?

```ts
function calcular() {
  const total = 150;
}
calcular();
console.log(total);
```

- La IA: Imprime `150`. (La función ya se ha ejecutado, así que `total` existe.)
- Marta: Da un error. (`total` se creó dentro de la función, y fuera de ella no existe.)

Correcta: Marta

Pistas: 1) ¿Dónde se crea `total`? 2) Lo que se crea dentro de las llaves de una función solo existe ahí dentro. 3) En la línea 5, ¿estamos dentro o fuera de la función?

Explicación: Da `ReferenceError: total is not defined`. Cada función tiene su propio espacio, su ámbito. Para que un resultado salga de ella, tiene que devolverlo: `return 150;` y `const total = calcular();`.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s06-d05-x1` · concepto ambito

Ahora dentro no hay let. ¿Qué escribe este programa?

```ts
let total = 1;
function poner() {
  total = 5;
}
poner();
console.log(total);
```

- ✅ `5`: Eso es: sin let no se crea otra caja. La función cambia la de fuera.
- ▫️ `1`: Dentro no hay let: total es la caja de fuera, y la función la cambia a 5.
- ▫️ `❌ Error: total no está definido`: Desde dentro se ve lo de fuera: total existe.

Pistas: 1) ¿La línea 3 crea una caja o cambia una que ya existe? 2) Sin let, cambia la que encuentra: la de fuera. 3) poner() la deja en 5.

Explicación: Una función que cambia cajas de fuera es difícil de seguir. Es mejor que reciba los datos y devuelva el resultado.

---

## Día 6: La forma corta: funciones flecha

**Objetivo:** Hoy aprendes a leer y escribir funciones flecha, la forma corta que más vas a ver en DeIure y en el código de las IA.

### Microlección

**Pantalla 1 · codigo**

```ts
function doble(n) {
  return n * 2;
}
const triple = (n) => n * 3;
console.log(doble(4));
console.log(triple(4));
```

Salida: `8` / `12`

Las dos son funciones. La segunda es una **función flecha**: se guarda en una const, los parámetros van entre paréntesis y, detrás de la flecha `=>`, lo que devuelve. Sin llaves, el return es **automático**.

**Pantalla 2 · texto**

Para leerla en voz alta: `(n) => n * 3` es «dado n, devuelve n por 3». Con varios parámetros, `(a, b) => a + b`. Sin ninguno, `() => 5`. En las librerías de DeIure hay miles: es la forma que más verás.

**Pantalla 3 · codigo**

```ts
const enPlazo = (dias) => {
  dias <= 30;
};
console.log(enPlazo(10));
```

Salida: `undefined`

Con llaves `{ }`, el return **deja de ser automático** y hay que escribirlo. Es de los olvidos más comunes de las IA. Las dos versiones buenas: `{ return dias <= 30; }`, o sin llaves: `(dias) => dias <= 30`.

**Pantalla 4 · codigo**

```ts
console.log(mitad(10));
const mitad = (n) => n / 2;
```

Salida: (nada) y error

Una diferencia con `function`: una flecha guardada en una const no existe hasta su línea. Usarla antes da el error de la semana 1: **Cannot access 'mitad' before initialization**.

**Pantalla 5 · deiure**

En las hojas de cálculo de DeIure, una celda cuenta como vacía si no tiene nada. `null` y `undefined` son dos formas de «nada», y `''` es un texto vacío. Es una flecha de una línea que devuelve true o false:

```ts
const isBlank = (value: unknown) => value === null || value === undefined || value === '';
```

`DeIure/src/lib/spreadsheet-merges.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s06-d06-r1` · concepto funciones

¿Qué escribe este programa?

```ts
const suma = (a, b) => a + b;
const comision = (x) => x * 0.2;
console.log(suma(2, 3));
console.log(comision(suma(5, 5)));
```

- ✅ `5 ⏎ 2`: Eso es: suma(5, 5) devuelve 10, y comision(10) devuelve 2.
- ▫️ `5 ⏎ 10`: comision recibe 10 y devuelve 10 * 0.2.
- ▫️ `5 ⏎ 1`: Primero se calcula suma(5, 5), que da 10, no 5.

Pistas: 1) En la línea 4, ¿qué se calcula primero? 2) Lo de dentro: suma(5, 5). 3) comision(10).

Explicación: Una llamada dentro de otra se resuelve de dentro afuera: lo que devuelve la de dentro es el argumento de la de fuera.

#### Reto 2 · Rellena el hueco · `s06-d06-r2` · concepto funciones

Esta flecha lleva llaves. Completa para que escriba 9.

```ts
const cuadrado = (n) => {
  ___ n * n;
};
console.log(cuadrado(3));
```

Objetivo: `9`

- ✅ `return`: Correcto: con llaves, el return hay que escribirlo.
- ▫️ `const r =`: Guarda el cálculo, pero no lo devuelve: sale undefined.
- ▫️ `=>`: La flecha ya está arriba: aquí da error.

Pistas: 1) ¿Lleva llaves la flecha? 2) Con llaves, el return no es automático. 3) Hace falta devolver n * n.

Explicación: Sin llaves, la flecha devuelve sola; con llaves, se comporta como una function normal.

#### Reto 3 · Caza el fallo (Revisión) · `s06-rev-6` · concepto funciones

Le pediste a la IA: «Pásame días a horas con una función flecha». Sale `undefined`. Toca la línea que está mal.

```ts
const aHoras = (dias) => {
  dias * 24;
};
console.log(aHoras(3));
```

- ✅ `Con llaves, la flecha necesita `return`. O se quitan las llaves: `(dias) => dias * 24`.`: Exacto. Sin llaves, la flecha devuelve sola; con llaves, hay que escribir el `return`.
- ▫️ `Las funciones flecha no pueden tener parámetros.`: Pueden tener los que quieras, entre los paréntesis. El problema es lo que devuelve.
- ▫️ `Hay que llamarla sin paréntesis: `aHoras 3`.`: Para llamarla hacen falta los paréntesis, como está. Mira lo que hay dentro de las llaves.

Pistas: 1) ¿La flecha lleva llaves `{ }`? 2) Sin llaves, la flecha devuelve sola. Con llaves, hace falta `return`. 3) ¿Hay `return` dentro de las llaves?

Explicación: Imprime `undefined`. Es el mismo fallo del `return` olvidado, en la forma que más verás en DeIure y en el código de las IA. Truco de revisor: si ves `=> {`, busca el `return`.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s06-d06-x1` · concepto funciones

¿Qué escribe este programa?

```ts
const f = (n) => { n + 1; };
const g = (n) => n + 1;
console.log(f(1));
console.log(g(1));
```

- ✅ `undefined ⏎ 2`: Eso es: f lleva llaves y no tiene return; g devuelve sola.
- ▫️ `2 ⏎ 2`: f lleva llaves y le falta el return: devuelve undefined.
- ▫️ `undefined ⏎ undefined`: g no lleva llaves: devuelve n + 1 automáticamente.

Pistas: 1) ¿Cuál de las dos lleva llaves? 2) Con llaves hace falta return. 3) f no devuelve nada; g sí.

Explicación: Dos flechas casi iguales y un resultado distinto: las llaves cambian las reglas.

#### Repaso 2 · ¿Quién tiene razón? (Revisión) · `s06-rev-x4` · concepto funciones

La IA y Marta discuten qué imprime esta función flecha. ¿Quién tiene razón?

```ts
const doble = (n) => n * 2;
console.log(doble(4));
```

- La IA: Imprime `undefined`. (No hay ningún `return`.)
- Marta: Imprime `8`. (Sin llaves, la flecha devuelve sola lo que hay a la derecha.)

Correcta: Marta

Pistas: 1) ¿Lleva llaves la flecha? 2) Sin llaves, la flecha devuelve lo que hay a la derecha de `=>`. 3) ¿Cuánto es 4 * 2?

Explicación: Imprime `8`. Sin llaves, el `return` va implícito. No pidas un `return` donde no hace falta: revisar también es no «arreglar» lo que está bien.

---

## Día 7: Píldora: divide y vencerás (píldora de informática)

**Objetivo:** Hoy aprendes a partir un problema grande en funciones pequeñas con una sola tarea cada una, que es como se escriben y se revisan los programas de verdad.

### Microlección

**Pantalla 1 · texto**

Un programa grande no se escribe de golpe: se **descompone** en partes pequeñas, cada una con una sola tarea y un nombre claro. Es como un dictamen, que no se redacta de una vez sino por apartados (hechos, fundamentos, conclusión), y cada apartado se revisa por separado.

**Pantalla 2 · esquema**

*Avisar de una solicitud que vence*

**Calcular** → ¿Cuántos días quedan? Una función: quedan(plazo, pasados).

↓

**Clasificar** → ¿Es urgente? Otra función: urgente(dias).

↓

**Redactar** → El texto del aviso: otra más, aviso(nombre, dias).

↓

**Juntar** → El programa principal llama a las tres, en orden.

**Pantalla 3 · codigo**

```ts
function quedan(plazo, pasados) {
  return plazo - pasados;
}
function aviso(nombre, dias) {
  return `${nombre}: quedan ${dias}`;
}
const q = quedan(30, 26);
console.log(aviso("Laura", q));
```

Salida: `Laura: quedan 4`

Cada función hace una sola cosa y se puede probar sola: si el aviso sale mal, sabes en cuál mirar. Al revisar código de una IA, desconfía de las funciones larguísimas que lo hacen todo.

**Pantalla 4 · texto**

Señales de una buena descomposición: cada función cabe en una pantalla; su nombre es un verbo que dice lo que hace (`calcular`, `validar`, `formatear`); y recibe lo que necesita por parámetros, en vez de tomarlo de fuera. Si una IA te entrega una función de 200 líneas, pídele que la divida.

**Pantalla 5 · deiure**

El análisis de riesgos de una EIPD lo redacta una función grande, pero escribir el nivel de riesgo en mayúsculas se lo encarga a una pequeña. (`? :` es un if en una línea: si el nivel es «muy_alto», devuelve «MUY ALTO»; si no, el nivel en mayúsculas.)

```ts
function formatNivelRiesgo(nivel: FactorRiesgo['nivelRiesgo']): string {
  return nivel === 'muy_alto' ? 'MUY ALTO' : nivel.toUpperCase();
}
```

`DeIure/src/lib/apartado-09-compiler.ts`

**Pantalla 6 · terminal**

```
$ node hola.ts > salida.txt

```

**Comando de la semana: tuberías y redirección.** `>` guarda en un fichero lo que saldría en la pantalla: por eso aquí no sale nada. Si el fichero ya existe, lo **sobrescribe**; `>>` añade al final. `|` (tubería) pasa lo que escribe una orden a la siguiente: `ls | grep ts` lista y se queda con las líneas que contienen «ts». **Minirreto en tu Mac:** en `practica`, haz `node hola.ts > salida.txt` y después `cat salida.txt`: ahí está el saludo. Repite con `>>` y vuelve a hacer `cat`: ahora sale dos veces.

### Retos

#### Reto 1 · ¿Qué imprime? · `s06-d07-r1` · concepto descomposicion

¿Qué escribe este programa?

```ts
function neto(bruto) {
  return bruto - 20;
}
function mitad(n) {
  return n / 2;
}
console.log(mitad(neto(100)));
```

- ✅ `40`: Eso es: neto(100) da 80, y mitad(80) da 40.
- ▫️ `30`: Primero se calcula lo de dentro: neto(100), que da 80. Luego, la mitad.
- ▫️ `80`: Falta la función de fuera: mitad(80) da 40.

Pistas: 1) ¿Qué llamada se resuelve primero? 2) La de dentro: neto(100). 3) Y después mitad de ese resultado.

Explicación: Dos funciones pequeñas encadenadas: cada una se entiende sola, y juntas resuelven el problema.

#### Reto 2 · Rellena el hueco · `s06-d07-r2` · concepto descomposicion

Un plazo de 30 días del que han pasado 26. Completa para que escriba true: es urgente.

```ts
function quedan(plazo, pasados) {
  return plazo - pasados;
}
function urgente(dias) {
  return dias <= 5;
}
console.log(urgente(___));
```

Objetivo: `true`

- ✅ `quedan(30, 26)`: Correcto: quedan 4 días, y 4 <= 5 es true.
- ▫️ `quedan(30, 20)`: Así quedarían 10 días: no es urgente.
- ▫️ `quedan(26)`: Falta un argumento: pasados vale undefined y la resta da NaN.

Pistas: 1) urgente necesita los días que quedan. 2) Esos días los calcula la otra función. 3) Llama a quedan con el plazo y los días pasados, en ese orden.

Explicación: Lo que devuelve una función puede ser directamente el argumento de otra. Así se conectan las partes.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s06-rev-7` · concepto descomposicion

Dos funciones pequeñas que se usan juntas: han pasado 2 días, ¿cuántas horas quedan hasta las 72? La IA y Marta discuten qué imprime. ¿Quién tiene razón?

```ts
const aHoras = (dias) => dias * 24;
const quedan = (horas) => 72 - horas;
console.log(quedan(aHoras(2)));
```

- Marta: Imprime `70`. (`quedan` recibe el 2 y hace 72 - 2.)
- La IA: Imprime `24`. (Primero `aHoras(2)` da 48, y luego `quedan(48)` da 24.)

Correcta: La IA

Pistas: 1) Empieza por los paréntesis de más adentro. 2) `aHoras(2)` se calcula primero, y su resultado pasa a `quedan`. 3) ¿Cuánto es `aHoras(2)`? ¿Y `72` menos eso?

Explicación: Imprime `24`. Dividir un problema en funciones pequeñas (pasar a horas, calcular lo que queda) hace que cada pieza se pueda revisar y probar por separado. Cuando una IA te dé una función enorme, pregúntate en qué piezas se podría partir.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s06-d07-x1` · concepto descomposicion

¿Qué escribe este programa?

```ts
const suma = (a, b) => a + b;
const media = (a, b) =>
  suma(a, b) / 2;
console.log(media(4, 8));
```

- ✅ `6`: Eso es: media usa suma y divide entre 2: 12 / 2.
- ▫️ `8`: media divide la suma entre 2: (4 + 8) / 2.
- ▫️ `12`: Falta el / 2 de media.

Pistas: 1) media llama a suma. 2) suma(4, 8) es 12. 3) Y media lo divide entre 2.

Explicación: Una función puede apoyarse en otra. Si suma tuviera un fallo, media lo heredaría: por eso se prueban por separado.

