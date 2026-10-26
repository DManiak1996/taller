# Semana 5: vista previa

Generado desde los JSON. Para revisar el contenido sin abrir el formato.

---

## Día 1: Varias cosas en una caja: listas

**Objetivo:** Hoy aprendes a guardar varios datos en orden dentro de una sola caja, una lista, y a pedirle uno o preguntarle cuántos tiene.

### Microlección

**Pantalla 1 · codigo**

```ts
const plazos = [72, 30, 15];
console.log(plazos);
```

Salida: `[ 72, 30, 15 ]`

Una **lista** (en inglés, «array») va entre corchetes, con los datos separados por comas. Aquí, tres plazos en horas y días. Al escribirla, la consola pone espacios junto a los corchetes: es solo su forma de enseñarla.

**Pantalla 2 · pasoapaso**

```ts
const plazos = [72, 30, 15];
console.log(plazos[0]);
console.log(plazos.length);
```

- Línea 1: {"plazos":"[72, 30, 15]"} · Una sola caja con tres datos dentro, en orden.
- Línea 2: {"plazos":"[72, 30, 15]"} · `plazos[0]` pide el dato de la **posición 0**, que es el primero.
- Línea 3: {"plazos":"[72, 30, 15]"} · `.length` («longitud») dice cuántos datos tiene la lista.

**Pantalla 3 · texto**

Una lista es como un **libro de registro**: entradas numeradas, una detrás de otra. Puede guardar números, textos o lo que quieras, y crecer o encoger. Para mil interesados no necesitas mil cajas: te basta una lista.

**Pantalla 4 · deiure**

DeIure guarda los niveles de impacto de un riesgo en una lista, ordenados de menor a mayor. Al ser una lista, el orden importa: «limitado» va antes que «significativo».

```ts
const ESCALA_IMPACTO = [
  'muy_limitado',
  'limitado',
  'significativo',
  'muy_significativo',
] as const satisfies readonly Impacto[];
```

`DeIure/src/lib/eipd-residual-estimator.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s05-d01-r1` · concepto arrays

¿Qué escribe este programa?

```ts
const bases = [
  "consentimiento",
  "contrato",
  "obligación legal",
];
console.log(bases[0]);
console.log(bases.length);
```

- ✅ `consentimiento ⏎ 3`: Eso es: la posición 0 es la primera, y hay tres bases.
- ▫️ `contrato ⏎ 3`: La posición 0 es la primera, no la segunda.
- ▫️ `consentimiento ⏎ 2`: length cuenta los datos que hay: tres.

Pistas: 1) Una lista se puede escribir en varias líneas: es la misma lista. 2) [0] es la primera posición. 3) length cuenta cuántos datos hay.

Explicación: Escribir una lista larga en varias líneas, una por dato, la hace más fácil de leer.

#### Reto 2 · Rellena el hueco · `s05-d01-r2` · concepto arrays

Completa para que escriba cuántos datos tiene la lista.

```ts
const d = [10, 20, 30];
console.log(d.___);
```

Objetivo: `3`

- ✅ `length`: Correcto: length, «longitud».
- ▫️ `size`: size existe en otros lenguajes, pero en una lista de TypeScript da undefined.
- ▫️ `count`: count no existe en las listas: da undefined.

Pistas: 1) Es una palabra inglesa. 2) Significa «longitud». 3) length.

Explicación: Si pides algo que la lista no tiene, como .size, no da error: da undefined. Por eso conviene probar el código.

#### Reto 3 · Caza el fallo (Revisión) · `s05-rev-1` · concepto arrays

Le pediste a la IA: «Imprime el primer dato de la lista». Toca la línea que está mal.

```ts
const datos = ["email", "dni", "tel"];
console.log(datos[1]);
```

- ✅ `Las posiciones empiezan en 0. El primero es `datos[0]`; `datos[1]` es el segundo.`: Exacto. En las listas se cuenta desde 0: el primero está en la posición 0.
- ▫️ `Para leer una posición se usan paréntesis: `datos(1)`.`: Las posiciones de una lista se leen con corchetes, como está. El problema es el número.
- ▫️ `Una lista creada con `const` no se puede leer.`: Una lista `const` se puede leer sin problema. Fíjate en el número entre corchetes.

Pistas: 1) ¿Qué imprime? ¿Es el primero? 2) En una lista, la primera posición es la 0. 3) Si el primero es el 0, ¿qué es el 1?

Explicación: Imprime `dni`, el segundo. La IA ha contado desde 1, como contaríamos tú y yo. En programación las posiciones empiezan en 0, y este despiste es de los más comunes.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s05-d01-x1` · concepto arrays

¿Qué escribe este programa?

```ts
const v = [];
console.log(v.length);
```

- ✅ `0`: Eso es: una lista vacía tiene 0 datos.
- ▫️ `1`: Los corchetes no cuentan como dato: está vacía.
- ▫️ `[]`: length no enseña la lista: cuenta sus datos.

Pistas: 1) ¿Qué hay entre los corchetes? 2) Nada: es una lista vacía. 3) ¿Cuántos datos tiene una lista vacía?

Explicación: Muchas listas empiezan vacías y se van llenando. Lo verás en unos días.

#### Repaso 2 · ¿Qué imprime? · `s05-d01-x2` · concepto arrays

¿Qué escribe este programa?

```ts
const n = [5, 8];
console.log(n[0] + n[1]);
```

- ✅ `13`: Eso es: 5 + 8.
- ▫️ `58`: Son números, no textos: + suma.
- ▫️ `[ 5, 8 ]`: n[0] y n[1] son los datos sueltos, no la lista.

Pistas: 1) ¿Qué vale n[0]? ¿Y n[1]? 2) 5 y 8. 3) Son números: se suman.

Explicación: Cada dato de la lista se usa como cualquier otra caja.

---

## Día 2: Se empieza a contar en 0

**Objetivo:** Hoy aprendes por qué la primera posición de una lista es la 0, cómo pedir la última y qué pasa si pides una que no existe.

### Microlección

**Pantalla 1 · codigo**

```ts
const prob = [
  "baja",
  "media",
  "alta",
];
console.log(prob[0]);
console.log(prob[2]);
```

Salida: `baja` / `alta`

Las posiciones se cuentan **desde 0**: «baja» está en la 0, «media» en la 1 y «alta» en la 2. Piensa en la posición como «cuántos pasos desde el principio»: el primero está a 0 pasos.

**Pantalla 2 · codigo**

```ts
const prob = [
  "baja",
  "media",
  "alta",
];
console.log(prob.length);
console.log(prob[prob.length - 1]);
```

Salida: `3` / `alta`

Hay 3 datos, pero el último está en la posición 2. Por eso el último siempre es `length - 1`.

**Pantalla 3 · codigo**

```ts
const prob = [
  "baja",
  "media",
  "alta",
];
console.log(prob[3]);
```

Salida: `undefined`

La posición 3 no existe. El programa **no da error**: devuelve `undefined`, que significa «aquí no hay nada». Es un fallo silencioso: el programa sigue con un hueco donde esperabas un dato.

**Pantalla 4 · deiure**

DeIure lo deja escrito en un comentario junto a su escala de probabilidad: la posición 0 es el nivel 1. Las personas cuentan desde 1 y las listas desde 0, y hay que traducir.

```ts
// el índice 0 es el nivel 1 (improbable / muy limitado), el suelo.
const ESCALA_PROBABILIDAD = ['improbable', 'baja', 'media', 'alta']
```

`DeIure/src/lib/eipd-residual-estimator.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s05-d02-r1` · concepto arrays

¿Qué escribe este programa?

```ts
const f = ["A", "B", "C", "D"];
console.log(f[1]);
console.log(f[4]);
```

- ✅ `B ⏎ undefined`: Eso es: la posición 1 es la segunda, y la 4 no existe.
- ▫️ `A ⏎ D`: Se cuenta desde 0: f[1] es la B y f[4] estaría después de la D.
- ▫️ `B ⏎ ❌ Error en la línea 3`: Pedir una posición que no existe no da error: da undefined.

Pistas: 1) Numera las letras empezando por 0. 2) A es la 0, B la 1, C la 2, D la 3. 3) ¿Hay algo en la 4?

Explicación: Con 4 datos, las posiciones válidas son de la 0 a la 3.

#### Reto 2 · Rellena el hueco · `s05-d02-r2` · concepto arrays

Completa para que escriba el último dato, el 9.

```ts
const t = [3, 6, 9];
console.log(t[___]);
```

Objetivo: `9`

- ✅ `2`: Correcto: tres datos, posiciones 0, 1 y 2.
- ▫️ `3`: Hay 3 datos, pero la posición 3 no existe: daría undefined.
- ▫️ `t.length`: t.length vale 3: daría undefined, igual que t[3].

Pistas: 1) ¿En qué posición está el primero? 2) En la 0. Entonces, el tercero… 3) Es length - 1.

Explicación: t[t.length] siempre da undefined: es una posición después del último.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s05-rev-2` · concepto arrays

La IA y Marta discuten qué imprime este código. ¿Quién tiene razón?

```ts
const datos = ["email", "dni", "tel"];
console.log(datos[datos.length]);
```

- La IA: Imprime `tel`. (`length` es 3, y la lista tiene 3 datos: el 3 es el último.)
- Marta: Da un error. (La posición 3 no existe, así que el programa se para.)

Correcta: ninguno

Pistas: 1) ¿Cuánto vale `datos.length`? 2) Con 3 datos, las posiciones son 0, 1 y 2. 3) ¿Qué devuelve una posición que no existe: un error o algo especial?

Explicación: Imprime `undefined` («sin definir»). El último está en `datos.length - 1`, que es 2. Leer fuera de la lista no da error, y el `undefined` sigue adelante hasta que algo falla más tarde, lejos de donde nació. Por eso cuesta tanto encontrarlo.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s05-d02-x1` · concepto arrays

¿Qué escribe este programa?

```ts
const l = ["x", "y"];
console.log(l.length);
console.log(l[l.length - 1]);
```

- ✅ `2 ⏎ y`: Eso es: 2 datos, y el último está en la posición 1.
- ▫️ `2 ⏎ undefined`: l.length - 1 es 1, y en la 1 está la y.
- ▫️ `1 ⏎ y`: length cuenta los datos: hay 2.

Pistas: 1) ¿Cuántos datos hay? 2) length - 1 es 1. 3) ¿Qué hay en la posición 1?

Explicación: length cuenta desde 1; las posiciones, desde 0. Por eso el último es length - 1.

#### Repaso 2 · ¿Qué imprime? · `s05-d02-x2` · concepto arrays

¿Qué escribe este programa?

```ts
const a = [7];
console.log(a[0]);
console.log(a[1]);
```

- ✅ `7 ⏎ undefined`: Eso es: solo hay un dato, en la posición 0.
- ▫️ `❌ Error en la línea 3`: No da error: da undefined.
- ▫️ `undefined ⏎ 7`: El único dato está en la posición 0.

Pistas: 1) ¿Cuántos datos hay? 2) Uno, en la posición 0. 3) La posición 1 no existe.

Explicación: Una lista con un dato solo tiene la posición 0.

#### Repaso 3 · Caza el fallo (Revisión) · `s05-rev-x1` · concepto arrays

Le pediste a la IA: «Imprime el último dato de la lista». Toca la línea que está mal.

```ts
const datos = ["email", "dni", "tel"];
console.log(datos[3]);
```

- ✅ `Con 3 datos, el último está en la posición 2. La 3 no existe.`: Exacto. Lo más seguro es `datos[datos.length - 1]`, que vale aunque la lista crezca.
- ▫️ `Para el último hay que escribir `datos[-1]`.`: En algunos lenguajes eso funciona, pero en TypeScript `datos[-1]` también da `undefined`.
- ▫️ `La lista tendría que tener 4 datos.`: La lista está bien. El problema es en qué posición busca.

Pistas: 1) ¿Qué imprime? ¿Es `tel`? 2) Las posiciones van de 0 a `length - 1`. 3) Con 3 datos, ¿cuál es la última posición?

Explicación: Imprime `undefined`. El último de una lista de 3 está en la posición 2. Para no depender del tamaño, usa `datos[datos.length - 1]`.

---

## Día 3: Cambiar y añadir

**Objetivo:** Hoy aprendes a cambiar un dato de una lista y a añadir datos al final con push, y por qué una lista const sí se puede llenar.

### Microlección

**Pantalla 1 · pasoapaso**

```ts
const bases = ["consentimiento"];
bases.push("contrato");
console.log(bases);
```

- Línea 1: {"bases":"[\"consentimiento\"]"} · Una lista con una base de legitimación.
- Línea 2: {"bases":"[\"consentimiento\", \"contrato\"]"} · `push` («empujar») añade un dato **al final** de la lista.
- Línea 3: {"bases":"[\"consentimiento\", \"contrato\"]"} · La consola escribe los textos de una lista con comillas simples. Es lo mismo: solo cambia cómo los enseña.

**Pantalla 2 · codigo**

```ts
const e = ["abierta", "abierta"];
e[1] = "cerrada";
console.log(e);
```

Salida: `[ 'abierta', 'cerrada' ]`

Para cambiar un dato, se pone su posición a la izquierda del `=`, como con una caja normal.

**Pantalla 3 · texto**

¿Y cómo se puede cambiar una lista `const`? Porque `const` fija **qué lista** hay en la caja, no lo que lleva dentro. Es como un expediente con su número fijo: puedes añadirle papeles, pero no cambiarlo por otro expediente. `e = []` sí daría error.

**Pantalla 4 · deiure**

Un apartado 4 admite como mucho 50 figuras. Si llegan más de 50, DeIure añade un problema a su lista `issues` con push. Lo que va entre llaves es un objeto, una ficha con datos: lo verás pronto.

```ts
if (rawFigures.length > 50) {
  issues.push({ code: 'too_many_figures', path: ['figuras'] });
}
```

`DeIure/src/lib/apartado-04-normalizer.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s05-d03-r1` · concepto arrays

¿Qué escribe este programa?

```ts
const l = [1, 2];
l.push(3);
l.push(4);
console.log(l.length);
```

- ✅ `4`: Eso es: empezó con 2 y push añadió 2 más.
- ▫️ `2`: push sí cambia la lista: le añade datos.
- ▫️ `[ 1, 2, 3, 4 ]`: Se escribe l.length, no la lista: el número de datos.

Pistas: 1) ¿Cuántos datos tiene al principio? 2) Cada push añade uno. 3) 2 + 2.

Explicación: length cambia cada vez que la lista crece.

#### Reto 2 · Rellena el hueco · `s05-d03-r2` · concepto arrays

Completa para añadir a Luis a la lista de destinatarios.

```ts
const d = ["Ana"];
d.___("Luis");
console.log(d);
```

Objetivo: `[ 'Ana', 'Luis' ]`

- ✅ `push`: Correcto: push añade al final.
- ▫️ `add`: add no existe en las listas: daría error.
- ▫️ `append`: append existe en Python, que verás más adelante, pero no en las listas de TypeScript.

Pistas: 1) Es una palabra inglesa que significa «empujar». 2) Empuja el dato al final. 3) push.

Explicación: Cada lenguaje tiene sus nombres: Python usa append; TypeScript, push.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s05-rev-3` · concepto arrays

La IA y Marta discuten si este código funciona. ¿Quién tiene razón?

```ts
const brechas = ["B-01", "B-02"];
brechas.push("B-03");
console.log(brechas.length);
```

- La IA: Da un error. (`brechas` es una `const`, y una `const` no se puede cambiar.)
- Marta: Imprime `3`. (`const` impide cambiar la lista por otra, pero no lo que hay dentro.)

Correcta: Marta

Pistas: 1) ¿Qué hace `push`: crea una lista nueva o añade a la misma? 2) `const` impide escribir `brechas = ...` otra vez. 3) ¿Aparece `brechas =` en alguna línea después de la 1?

Explicación: Imprime `3`. `const` impide volver a asignar (`brechas = [...]`), pero deja cambiar el contenido de la lista. Si una IA te dice que no puedes hacer `push` en una `const`, ya sabes que se equivoca.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s05-d03-x1` · concepto arrays

¿Qué escribe este programa?

```ts
const n = [10, 20];
n[0] = 5;
console.log(n[0] + n[1]);
```

- ✅ `25`: Eso es: n[0] pasa a valer 5, y 5 + 20 = 25.
- ▫️ `30`: La línea 2 cambia el 10 por un 5.
- ▫️ `❌ Error: n es const`: const no impide cambiar lo de dentro de la lista.

Pistas: 1) La línea 2 cambia un dato. 2) Ahora la lista es [5, 20]. 3) 5 + 20.

Explicación: Cambiar un dato de una lista const está permitido; cambiar la lista entera, no.

#### Repaso 2 · ¿Quién tiene razón? (Revisión) · `s05-rev-x2` · concepto arrays

La IA y Marta discuten qué pasa con este código. ¿Quién tiene razón?

```ts
const lista = [1, 2];
lista = [1, 2, 3];
console.log(lista);
```

- La IA: Da un error. (Aquí sí se intenta poner otra lista en una `const`, y eso no se puede.)
- Marta: Imprime `[ 1, 2, 3 ]`. (Si con `push` se puede cambiar una lista `const`, así también.)

Correcta: La IA

Pistas: 1) ¿La línea 2 usa `push` o `=`? 2) `const` impide volver a asignar con `=`. 3) ¿Se crea la lista con `const` o con `let`?

Explicación: Da `TypeError: Assignment to constant variable`, el mismo error de la semana 1. Con listas, `const` deja cambiar el contenido (`push`, `lista[0] = ...`), pero no poner otra lista en su lugar.

---

## Día 4: Recorrer una lista con for

**Objetivo:** Hoy aprendes a pasar por todos los datos de una lista con un for y a evitar el error de uno con length.

### Microlección

**Pantalla 1 · pasoapaso**

```ts
const t = ["Ana", "Luis"];
for (let i = 0; i < t.length; i++) {
  console.log(i, t[i]);
}
```

- Línea 1: {"t":"[\"Ana\", \"Luis\"]"} · Dos titulares de datos.
- Línea 2: {"t":"[\"Ana\", \"Luis\"]","i":"0"} · El contador empieza en 0, la primera posición.
- Línea 2: {"t":"[\"Ana\", \"Luis\"]","i":"0"} · ¿0 < 2? Sí. (t.length vale 2.)
- Línea 3: {"t":"[\"Ana\", \"Luis\"]","i":"0"} · t[i] es t[0]: Ana.
- Línea 2: {"t":"[\"Ana\", \"Luis\"]","i":"1"} · i++: i vale 1.
- Línea 2: {"t":"[\"Ana\", \"Luis\"]","i":"1"} · ¿1 < 2? Sí.
- Línea 3: {"t":"[\"Ana\", \"Luis\"]","i":"1"} · t[1]: Luis.
- Línea 2: {"t":"[\"Ana\", \"Luis\"]","i":"2"} · i vale 2.
- Línea 2: {"t":"[\"Ana\", \"Luis\"]","i":"2"} · ¿2 < 2? No: ya ha pasado por todos.

**Pantalla 2 · texto**

Memoriza este patrón: `for (let i = 0; i < lista.length; i++)`. Empieza en 0 (la primera posición) y para **antes** de length (la última es length - 1). Dentro, `lista[i]` es el dato de cada vuelta.

**Pantalla 3 · codigo**

```ts
const t = ["Ana", "Luis"];
for (let i = 0; i <= t.length; i++) {
  console.log(i, t[i]);
}
```

Salida: `0 Ana` / `1 Luis` / `2 undefined`

Con `<=` da una vuelta de más y pide t[2], que no existe: sale `undefined`, sin error. Es el error de uno de la semana pasada, ahora con listas. En una carta a los titulares, sería una carta a «undefined».

**Pantalla 4 · deiure**

Tras seudonimizar a los usuarios dados de baja, DeIure recorre la lista de resultados con este mismo patrón, uno por usuario.

```ts
for (let i = 0; i < outcomes.length; i++) {
```

`DeIure/src/lib/pseudonymization.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s05-d04-r1` · concepto arrays

¿Qué escribe este programa?

```ts
const h = [8, 4, 6];
let total = 0;
for (let i = 0; i < h.length; i++) {
  total = total + h[i];
}
console.log(total);
```

- ✅ `18`: Eso es: 8 + 4 + 6.
- ▫️ `12`: Con i < h.length, i llega a 2: el 6 también se suma.
- ▫️ `3`: Ese es h.length, el número de datos, no la suma.

Pistas: 1) ¿Qué valores toma i? 2) 0, 1 y 2. 3) Suma h[0], h[1] y h[2].

Explicación: El acumulador de la semana pasada, ahora sumando los datos de una lista.

#### Reto 2 · Rellena el hueco · `s05-d04-r2` · concepto arrays

Completa para que escriba a cada titular una vez, sin ningún undefined.

```ts
const t = ["Ana", "Luis"];
for (let i = 0; i ___ t.length; i++) {
  console.log(t[i]);
}
```

Objetivo: `Ana` / `Luis`

- ✅ `<`: Correcto: i vale 0 y 1, las dos posiciones que existen.
- ▫️ `<=`: Daría una vuelta de más: Ana, Luis y undefined.
- ▫️ `>`: ¿0 > 2? No: no daría ninguna vuelta.

Pistas: 1) La última posición es length - 1. 2) i tiene que parar antes de llegar a length. 3) «Menor que».

Explicación: Con listas, la condición casi siempre es i < lista.length. Si ves <= length en código de una IA, sospecha.

#### Reto 3 · Caza el fallo (Revisión) · `s05-rev-4` · concepto arrays

Le pediste a la IA: «Imprime los nombres del equipo». Al final sale algo raro. Toca la línea que está mal.

```ts
const equipo = ["Ana", "Luis", "Eva"];
const total = equipo.length;
for (let i = 0; i <= total; i++) {
  console.log(equipo[i]);
}
```

- ✅ `Da una vuelta de más: con `<=` llega a la posición 3, que no existe. Tenía que ser `i < total`.`: Exacto. Con 3 nombres, las posiciones son 0, 1 y 2, así que `i` tiene que parar antes de 3.
- ▫️ `Tiene que empezar en `i = 1`.`: Entonces se saltaría a Ana, que está en la posición 0. El inicio está bien; mira el final.
- ▫️ ``total` tendría que ser `equipo.length + 1`.`: Eso añadiría otra vuelta de más. El problema ya es que sobra una.

Pistas: 1) ¿Qué sale en la última línea? 2) Las posiciones van de 0 a `length - 1`. 3) Cuando `i` vale 3, ¿existe `equipo[3]`?

Explicación: Imprime `Ana`, `Luis`, `Eva` y `undefined`. Es el fallo de la semana: con listas, la condición del `for` es `i < length`, nunca `i <= length`.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s05-d04-x1` · concepto arrays

¿Qué escribe este programa?

```ts
const n = [3, 5, 7, 9];
for (let i = 0; i < 2; i++) {
  console.log(n[i]);
}
```

- ✅ `3 ⏎ 5`: Eso es: la condición es i < 2, no i < n.length. Solo pasa por los dos primeros.
- ▫️ `3 ⏎ 5 ⏎ 7 ⏎ 9`: La condición no usa length: para cuando i llega a 2.
- ▫️ `5 ⏎ 7`: i empieza en 0: el primero es n[0], el 3.

Pistas: 1) Mira la condición con atención. 2) ¿Usa n.length? 3) i vale 0 y 1.

Explicación: Un número fijo en la condición solo funciona si la lista nunca cambia de tamaño. Con length, se adapta sola.

#### Repaso 2 · ¿Quién tiene razón? (Revisión) · `s05-rev-x4` · concepto arrays

La IA y Marta discuten qué imprime este bucle. ¿Quién tiene razón?

```ts
const equipo = ["Ana", "Luis", "Eva"];
const total = equipo.length;
for (let i = 1; i < total; i++) {
  console.log(equipo[i]);
}
```

- La IA: Imprime `Luis` y `Eva`. (Empieza en la posición 1, así que se salta a Ana.)
- Marta: Imprime `Ana`, `Luis` y `Eva`. (Un `for` sobre una lista siempre la recorre entera.)

Correcta: La IA

Pistas: 1) ¿Con qué valor empieza `i`? 2) Ana está en la posición 0. 3) Si `i` empieza en 1, ¿se lee alguna vez `equipo[0]`?

Explicación: Imprime `Luis` y `Eva`. El primer elemento se queda fuera. Las vueltas de menos al principio son tan comunes como las de más al final: revisa siempre las dos puntas.

---

## Día 5: Para cada uno: for…of

**Objetivo:** Hoy aprendes a recorrer una lista con for…of, que te da cada dato sin contadores ni posiciones, y cuándo usarlo en vez del for clásico.

### Microlección

**Pantalla 1 · pasoapaso**

```ts
const afectados = [120, 40, 300];
let total = 0;
for (const n of afectados) {
  total = total + n;
}
console.log(total);
```

- Línea 1: {"afectados":"[120, 40, 300]"} · Personas afectadas por tres brechas.
- Línea 2: {"afectados":"[120, 40, 300]","total":"0"} · El acumulador, a 0.
- Línea 3: {"afectados":"[120, 40, 300]","total":"0","n":"120"} · `for (const n of afectados)` se lee «para cada n de afectados». En la primera vuelta, n es el primer dato: 120.
- Línea 4: {"afectados":"[120, 40, 300]","total":"120","n":"120"} · Lo suma.
- Línea 3: {"afectados":"[120, 40, 300]","total":"120","n":"40"} · Siguiente vuelta: n pasa a ser el segundo dato, 40.
- Línea 4: {"afectados":"[120, 40, 300]","total":"160","n":"40"} · Lo suma.
- Línea 3: {"afectados":"[120, 40, 300]","total":"160","n":"300"} · n es el tercero, 300.
- Línea 4: {"afectados":"[120, 40, 300]","total":"460","n":"300"} · Lo suma. No quedan más datos: el bucle termina solo.
- Línea 6: {"afectados":"[120, 40, 300]","total":"460"} · Total de personas afectadas.

**Pantalla 2 · texto**

`for…of` te da **cada dato**, uno por vuelta, en orden. No hay contador, ni length, ni posiciones: no hay dónde equivocarse por uno. Se usa `const` porque en cada vuelta n es una caja nueva.

**Pantalla 3 · codigo**

```ts
const b = ["contrato", "ley"];
for (const x of b) {
  console.log("Base:", x);
}
```

Salida: `Base: contrato` / `Base: ley`

Funciona igual con textos. El nombre de la caja lo eliges tú: `x`, `base`, `n`…

**Pantalla 4 · texto**

¿Cuál usar? Si solo necesitas los datos, `for…of`: es más corto y más difícil de estropear. Si necesitas la **posición** (por ejemplo, para escribir «1.», «2.»…), el for clásico. Al revisar código de una IA, un for clásico que solo usa `lista[i]` se podría simplificar.

**Pantalla 5 · deiure**

Al redactar el apartado 11 de una EIPD, DeIure recorre las medidas de seguridad una a una con for…of para colocar cada una en su grupo.

```ts
for (const medida of medidas) {
```

`DeIure/src/lib/apartado-11-compiler.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s05-d05-r1` · concepto for-of

¿Qué escribe este programa?

```ts
const m = [2, 5, 1];
for (const x of m) {
  console.log(x * 10);
}
```

- ✅ `20 ⏎ 50 ⏎ 10`: Eso es: cada dato, multiplicado por 10, en orden.
- ▫️ `0 ⏎ 10 ⏎ 20`: for…of da los datos, no las posiciones.
- ▫️ `80`: No hay acumulador: escribe en cada vuelta.

Pistas: 1) ¿Qué vale x en cada vuelta? 2) 2, luego 5, luego 1. 3) Cada uno por 10.

Explicación: for…of da los datos en el mismo orden en que están en la lista.

#### Reto 2 · Rellena el hueco · `s05-d05-r2` · concepto for-of

Completa para que escriba cada nombre de la lista.

```ts
const d = ["Ana", "Eva"];
for (const x ___ d) {
  console.log(x);
}
```

Objetivo: `Ana` / `Eva`

- ✅ `of`: Correcto: «para cada x de d».
- ▫️ `in`: for…in existe, pero da las posiciones: escribiría 0 y 1. Una confusión muy común.
- ▫️ `de`: Las palabras del lenguaje están en inglés: daría error.

Pistas: 1) Es una palabra inglesa de dos letras. 2) Significa «de». 3) of.

Explicación: of da los datos; in, las posiciones. Una IA que confunde las dos produce un programa que funciona pero escribe números en vez de nombres.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s05-rev-5` · concepto for-of

La IA y Marta discuten qué imprime este bucle. ¿Quién tiene razón?

```ts
const equipo = ["Ana", "Luis", "Eva"];
for (const persona of equipo) {
  console.log(persona);
}
```

- Marta: Imprime `0`, `1` y `2`. (Un bucle recorre las posiciones de la lista.)
- La IA: Imprime `Ana`, `Luis` y `Eva`. (`for...of` te da directamente cada elemento, no su posición.)

Correcta: La IA

Pistas: 1) Lee la línea 2 en voz alta: «para cada persona de equipo». 2) `for...of` recorre los elementos, no las posiciones. 3) En la primera vuelta, ¿qué vale `persona`?

Explicación: Imprime `Ana`, `Luis` y `Eva`. Cuando no necesitas la posición, `for...of` es más corto y evita de raíz el error de la vuelta de más.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s05-d05-x1` · concepto for-of

¿Qué escribe este programa?

```ts
const l = [];
for (const x of l) {
  console.log(x);
}
console.log("Fin");
```

- ✅ `Fin`: Eso es: la lista está vacía, así que el bucle no da ninguna vuelta.
- ▫️ `undefined ⏎ Fin`: Con la lista vacía no hay ningún dato que escribir: cero vueltas.
- ▫️ `❌ Error en la línea 2`: Recorrer una lista vacía no da error: simplemente no entra.

Pistas: 1) ¿Cuántos datos tiene l? 2) Ninguno. 3) ¿Cuántas vueltas da el bucle?

Explicación: Un for…of da tantas vueltas como datos tiene la lista, también cero.

#### Repaso 2 · ¿Qué imprime? · `s05-d05-x2` · concepto for-of

¿Qué escribe este programa?

```ts
const r = [3, 1];
let dias = 0;
for (const n of r) {
  dias = dias + n;
}
console.log(dias);
```

- ✅ `4`: Eso es: 3 + 1.
- ▫️ `2`: Eso es r.length. Aquí se suman los datos.
- ▫️ `1`: dias acumula: no se queda con el último.

Pistas: 1) dias empieza en 0. 2) Suma cada dato. 3) 0 + 3 + 1.

Explicación: Sumar con for…of es más corto que con el for clásico y da lo mismo.

---

## Día 6: Sumar, contar y buscar

**Objetivo:** Hoy aprendes los tres usos más comunes de recorrer una lista: contar los que cumplen algo, buscar uno y quedarte con el mayor.

### Microlección

**Pantalla 1 · codigo**

```ts
const e = [40, 900, 15, 2000];
let grandes = 0;
for (const n of e) {
  if (n > 100) {
    grandes = grandes + 1;
  }
}
console.log(grandes);
```

Salida: `2`

**Contar**: un acumulador que suma 1, pero solo cuando se cumple el if. Aquí, cuántas brechas afectan a más de 100 personas.

**Pantalla 2 · codigo**

```ts
const ids = [14, 27, 33];
let esta = false;
for (const id of ids) {
  if (id === 27) {
    esta = true;
  }
}
console.log(esta);
```

Salida: `true`

**Buscar**: una caja que empieza en false y pasa a true si aparece lo que buscas. Se le llama **bandera**: se levanta y ya no se baja.

**Pantalla 3 · codigo**

```ts
const h = [8, 30, 12];
let max = 0;
for (const n of h) {
  if (n > max) {
    max = n;
  }
}
console.log(max);
```

Salida: `30`

**El mayor**: guarda el más grande visto hasta ahora y lo cambia cuando aparece uno mayor.

**Pantalla 4 · texto**

Casi todo lo que un programa hace con una lista es uno de estos patrones, o el de sumar. Al revisar código de una IA, pregunta: ¿la caja empieza en el valor correcto (0, false)? ¿Está **fuera** del bucle? ¿Acumula (`+ 1`, `+ n`) o pisa el valor en cada vuelta?

**Pantalla 5 · deiure**

Al estimar el riesgo residual, DeIure recorre las medidas de seguridad y avisa de las que no protegen frente a ninguna amenaza. Simplificado:

```ts
for (const m of medidas) {
  const lista = listaAmenazas(m);
  if (lista.length === 0) {
    avisar({ codigo: 'medida_sin_amenazas', medidaId: m.id });
  }
}
```

`DeIure/src/lib/eipd-residual-estimator.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s05-d06-r1` · concepto for-of

¿Qué escribe este programa?

```ts
const a = [5, 50, 500];
let s = 0;
for (const n of a) {
  if (n >= 50) {
    s = s + n;
  }
}
console.log(s);
```

- ✅ `550`: Eso es: solo suma los que cumplen n >= 50: 50 + 500.
- ▫️ `555`: El 5 no cumple n >= 50: no se suma.
- ▫️ `2`: Eso sería contarlos. Aquí se suma n, no 1.

Pistas: 1) ¿Qué datos cumplen n >= 50? 2) 50 y 500. 3) Y se suma n, no 1.

Explicación: Sumar o contar depende de lo que se añade en cada vuelta: + n suma los datos; + 1 los cuenta.

#### Reto 2 · Rellena el hueco · `s05-d06-r2` · concepto for-of

El plazo para contestar es de 30 días. Completa para contar las respuestas que llegaron fuera de plazo.

```ts
const dias = [10, 35, 40];
let fuera = 0;
for (const d of dias) {
  if (d ___ 30) {
    fuera = fuera + 1;
  }
}
console.log(fuera);
```

Objetivo: `2`

- ✅ `>`: Correcto: 35 y 40 pasan de 30.
- ▫️ `<`: Contaría las que llegaron a tiempo: 1.
- ▫️ `===`: Ninguna tardó exactamente 30 días: daría 0.

Pistas: 1) Fuera de plazo es tardar más de 30 días. 2) «Más de» se escribe… 3) Mayor que.

Explicación: Un contador con if: el if decide qué cuenta.

#### Reto 3 · Caza el fallo (Revisión) · `s05-rev-6` · concepto for-of

Le pediste a la IA: «Di si la lista incluye el DNI». Lo incluye, pero sale `false`. Toca la línea que está mal.

```ts
const datos = ["email", "dni", "tel"];
let hay = false;
for (const dato of datos) {
  hay = dato === "dni";
}
console.log(hay);
```

- ✅ `En cada vuelta pisa el resultado anterior. Al final solo cuenta el último dato, `tel`.`: Exacto. Encuentra el DNI en la segunda vuelta, pero en la tercera lo vuelve a poner a `false`. Arreglo: `if (dato === "dni") hay = true;`
- ▫️ `Tenía que ser un solo `=`: `dato = "dni"`.`: Eso intentaría cambiar el dato en vez de compararlo. Comparar con `===` está bien; el problema es lo que pasa después.
- ▫️ ``hay` tiene que empezar en `true`.`: Entonces diría que lo hay aunque no estuviera. Sigue `hay` vuelta a vuelta.

Pistas: 1) Apunta el valor de `hay` después de cada vuelta. 2) Al buscar, cuando encuentras algo no hay que volver a perderlo. 3) ¿Qué vale `hay` después de la vuelta de `tel`?

Explicación: Imprime `false`: `hay` vale `false`, `true` y otra vez `false`. Con este fallo, el programa solo acierta si lo que buscas es lo último de la lista. Un caso de prueba con el dato en medio lo destapa enseguida.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s05-d06-x1` · concepto for-of

¿Qué escribe este programa?

```ts
const r = ["alta", "baja", "alta"];
let n = 0;
for (const x of r) {
  if (x === "alta") {
    n = n + 1;
  }
}
console.log(n);
```

- ✅ `2`: Eso es: «alta» aparece dos veces.
- ▫️ `3`: Cuenta solo los que son «alta», no todos.
- ▫️ `1`: n acumula: no vuelve a 0 en cada vuelta.

Pistas: 1) ¿Cuántas veces aparece «alta»? 2) En la posición 0 y en la 2. 3) Dos.

Explicación: Contar textos funciona igual que contar números: if con === y + 1.

#### Repaso 2 · Caza el fallo (Revisión) · `s05-rev-x3` · concepto for-of

Le pediste a la IA: «Suma las horas de los tres turnos». Tenía que salir 90. Toca la línea que está mal.

```ts
const horas = [10, 30, 50];
let total = 0;
for (const hora of horas) {
  total = hora;
}
console.log(total);
```

- ✅ `No suma: en cada vuelta sustituye el total. Tenía que ser `total = total + hora`.`: Exacto. Para acumular hay que sumar lo nuevo a lo que ya había.
- ▫️ ``total` tiene que crearse dentro del bucle.`: Así se reiniciaría en cada vuelta, como viste en la semana de bucles. Crearlo fuera está bien.
- ▫️ `Hay que usar un `for` clásico con `i`.`: `for...of` vale perfectamente para sumar. El problema es la línea de dentro.

Pistas: 1) ¿Qué imprime? ¿De dónde sale ese número? 2) Acumular es sumar lo nuevo a lo que ya había. 3) ¿La línea 4 suma o sustituye?

Explicación: Imprime `50`, el último turno, en lugar de `90`. Cada vuelta tira lo anterior. Es el mismo despiste de la búsqueda de esta semana: lo que se acumula hay que construirlo sobre lo que ya había.

---

## Día 7: Píldora: listas frente a diccionarios (píldora de informática)

**Objetivo:** Hoy aprendes que la forma de guardar los datos decide cuánto cuesta encontrarlos, comparando una lista con un diccionario.

### Microlección

**Pantalla 1 · texto**

La semana pasada viste que dos algoritmos pueden dar el mismo resultado y tardar muy distinto. Hoy, la otra mitad: **cómo guardas los datos** decide cuánto cuesta encontrarlos. A eso se le llama **estructura de datos**.

**Pantalla 2 · codigo**

```ts
const r = ["Luis", "Marta", "Ana"];
let pasos = 0;
for (const n of r) {
  pasos = pasos + 1;
  if (n === "Ana") {
    console.log("Ana en", pasos);
  }
}
```

Salida: `Ana en 3`

Una lista es el **libro de registro numerado**: todo en orden, entrada tras entrada. Para encontrar a Ana sin saber su número, hay que mirar una a una. Aquí, 3 pasos; con 1000 nombres, hasta 1000.

**Pantalla 3 · codigo**

```ts
const ficha = { nombre: "Ana" };
console.log(ficha.nombre);
```

Salida: `Ana`

Un **diccionario** guarda cada dato con un **nombre** (una clave) y va directo a él, como el **índice alfabético** de expedientes: buscas «Ana» y te dice dónde está, sin pasar por los demás. En TypeScript se escribe con llaves. Lo verás pronto: hoy solo quédate con la idea.

**Pantalla 4 · texto**

El coste: buscar a Ana en una lista de 1000 puede llevar 1000 pasos; en un diccionario, uno. Ninguna es mejor siempre: la lista guarda el **orden**; el diccionario encuentra **por nombre**. Si una IA busca una y otra vez en una lista enorme, pregúntale si no le iría mejor un diccionario.

**Pantalla 5 · deiure**

Para no repetir un aviso, DeIure guarda los ya dados en un Set, una estructura que, como un diccionario, contesta de un golpe si algo ya está, sin recorrer nada.

```ts
if (avisadas.has(clave)) return;
avisadas.add(clave);
```

`DeIure/src/lib/eipd-residual-estimator.ts`

**Pantalla 6 · terminal**

```
$ grep -n nombre hola.ts
1:const nombre = "Daniel";
2:console.log("Hola,", nombre);
```

**Comando de la semana: grep.** Busca un texto dentro de ficheros y enseña las líneas donde aparece. `-n` añade el número de línea; `-i` no distingue mayúsculas de minúsculas; `-r` busca en una carpeta entera. **Minirreto en tu Mac:** en `practica`, escribe `grep -n nombre hola.ts`. Deben salir las dos líneas de tu programa con su número delante (con tu nombre, si lo cambiaste con nano). Prueba después `grep -n hola hola.ts` y luego `grep -ni hola hola.ts`: ¿por qué la primera no encuentra nada y la segunda sí?

### Retos

#### Reto 1 · ¿Qué imprime? · `s05-d07-r1` · concepto estructuras-datos

¿Qué escribe este programa?

```ts
const r = ["Eva", "Ana", "Luis"];
for (let i = 0; i < r.length; i++) {
  if (r[i] === "Luis") {
    console.log("Posición", i);
  }
}
```

- ✅ `Posición 2`: Eso es: Luis es el tercero, y las posiciones empiezan en 0.
- ▫️ `Posición 3`: Es el tercero, pero las posiciones se cuentan desde 0.
- ▫️ `Posición 0 ⏎ Posición 1 ⏎ Posición 2`: El console.log está dentro del if: solo escribe cuando encuentra a Luis.

Pistas: 1) ¿En qué posición está Luis? 2) Eva 0, Ana 1… 3) Luis, 2.

Explicación: Buscar en una lista con el for clásico te da también la posición. Aun así, ha mirado los tres nombres.

#### Reto 2 · Rellena el hueco · `s05-d07-r2` · concepto estructuras-datos

Completa para que avise una sola vez, al encontrar a Ana.

```ts
const r = ["Eva", "Ana", "Luis"];
for (const n of r) {
  if (n ___ "Ana") {
    console.log("Encontrada");
  }
}
```

Objetivo: `Encontrada`

- ✅ `===`: Correcto: compara si n es igual a «Ana».
- ▫️ `!==`: Avisaría con todos los que no son Ana: dos veces.
- ▫️ `=`: Un solo = guarda, no compara: intentaría cambiar n, que es const, y daría error.

Pistas: 1) Hay que comparar, no guardar. 2) Para comparar si son iguales se usan tres signos. 3) ===.

Explicación: = guarda; === compara. Confundirlos es de los fallos más antiguos de la programación.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s05-rev-7` · concepto estructuras-datos

Este código busca `tel` en una lista y cuenta cuántos datos mira. La IA y Marta discuten qué imprime. ¿Quién tiene razón?

```ts
const datos = ["email", "dni", "tel"];
let miradas = 0;
let hay = false;
for (const dato of datos) {
  miradas++;
  if (dato === "tel") hay = true;
}
console.log(hay, miradas);
```

- La IA: Imprime `true 1`. (El ordenador va directo a `tel`.)
- Marta: Imprime `true 3`. (Una lista se recorre de uno en uno: mira los tres.)

Correcta: Marta

Pistas: 1) ¿Cuántas vueltas da el bucle? 2) `miradas++` suma 1 en cada vuelta, encuentre o no. 3) ¿Cuántos datos tiene la lista?

Explicación: Imprime `true 3`. Para buscar en una lista hay que mirar uno a uno: con un millón de datos, hasta un millón de miradas. La semana que viene verás los objetos, que funcionan como un diccionario: buscas por la palabra y vas directo a su valor, sin recorrer nada.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s05-d07-x1` · concepto estructuras-datos

Buscas a Marta, que no está. ¿Qué escribe este programa?

```ts
const r = ["Eva", "Ana", "Luis"];
let pasos = 0;
for (const n of r) {
  pasos = pasos + 1;
}
console.log(pasos);
```

- ✅ `3`: Eso es: para saber que no está, hay que mirar todos.
- ▫️ `0`: Para saber que no está tiene que recorrerlos: pasos suma 1 por nombre.
- ▫️ `1`: pasos acumula una vez por vuelta, y hay tres vueltas.

Pistas: 1) ¿Cuántas vueltas da el bucle? 2) Una por nombre. 3) Tres.

Explicación: Lo que no está es lo más caro de buscar en una lista: obliga a mirarlo todo.

