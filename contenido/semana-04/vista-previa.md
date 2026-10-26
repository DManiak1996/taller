# Semana 4: vista previa

Generado desde los JSON. Para revisar el contenido sin abrir el formato.

---

## Día 1: Repetir sin copiar: for

**Objetivo:** Hoy aprendes a repetir un bloque de código las veces que quieras con for, sin copiar y pegar líneas.

### Microlección

**Pantalla 1 · codigo**

```ts
console.log("Aviso enviado");
console.log("Aviso enviado");
console.log("Aviso enviado");
```

Salida: `Aviso enviado` / `Aviso enviado` / `Aviso enviado`

Avisar a 3 interesados de una brecha copiando la línea funciona. ¿Y si fueran 500? Para eso están los **bucles**: escribes el bloque una vez y le dices cuántas veces repetirlo.

**Pantalla 2 · pasoapaso**

```ts
for (let i = 1; i <= 3; i++) {
  console.log("Aviso", i);
}
```

- Línea 1: {"i":"1"} · `let i = 1` crea un contador, i, que empieza en 1. Se hace una sola vez.
- Línea 1: {"i":"1"} · ¿1 <= 3? Sí: entra en el bloque.
- Línea 2: {"i":"1"} · Primera vuelta.
- Línea 1: {"i":"2"} · Al terminar el bloque vuelve arriba e i++ suma 1 a i: ahora vale 2.
- Línea 1: {"i":"2"} · ¿2 <= 3? Sí: otra vuelta.
- Línea 2: {"i":"2"} · Segunda vuelta.
- Línea 1: {"i":"3"} · i++: i vale 3.
- Línea 1: {"i":"3"} · ¿3 <= 3? Sí: «menor o igual» incluye el 3.
- Línea 2: {"i":"3"} · Tercera vuelta.
- Línea 1: {"i":"4"} · i++: i vale 4.
- Línea 1: {"i":"4"} · ¿4 <= 3? No: el bucle termina. Tres vueltas.

**Pantalla 3 · texto**

`for` («para») repite el bloque entre llaves **mientras la condición sea true**. La caja `i` cuenta las vueltas, y dentro del bloque puedes usarla: por eso cada aviso lleva su número. Se suele llamar `i`, pero vale cualquier nombre.

**Pantalla 4 · deiure**

DeIure recorre el texto de una EIPD línea a línea con un for. `bodyLines.length` es cuántas líneas tiene el texto: lo verás la semana que viene.

```ts
for (let i = 0; i < bodyLines.length; i++) {
```

`DeIure/src/lib/apartado-04-figura-markers.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s04-d01-r1` · concepto bucle-for

¿Qué escribe este programa?

```ts
for (let i = 1; i <= 4; i++) {
  console.log("Carta", i);
}
```

- ✅ `Carta 1 ⏎ Carta 2 ⏎ Carta 3 ⏎ Carta 4`: Eso es: i va de 1 a 4, y en cada vuelta escribe su número.
- ▫️ `Carta 1 ⏎ Carta 2 ⏎ Carta 3`: Con <= el 4 también cuenta: ¿4 <= 4? Sí.
- ▫️ `Carta 4`: console.log está dentro del bucle: escribe en cada vuelta, no solo en la última.

Pistas: 1) ¿Qué valores toma i? 2) Empieza en 1 y sigue mientras i <= 4. 3) 1, 2, 3 y 4: cuatro vueltas, una línea en cada una.

Explicación: Para saber qué hace un for, mira dónde empieza el contador, cuándo para y qué hay dentro del bloque.

#### Reto 2 · Rellena el hueco · `s04-d01-r2` · concepto bucle-for

Completa para que envíe 5 avisos.

```ts
for (let i = 1; i <= ___; i++) {
  console.log("Aviso", i);
}
```

Objetivo: `Aviso 1` / `Aviso 2` / `Aviso 3` / `Aviso 4` / `Aviso 5`

- ✅ `5`: Correcto: de 1 a 5 son cinco vueltas.
- ▫️ `4`: De 1 a 4 son cuatro vueltas: faltaría un aviso.
- ▫️ `6`: De 1 a 6 son seis: sobraría un aviso.

Pistas: 1) El contador empieza en 1. 2) Con <=, el último número también da vuelta. 3) De 1 a 5.

Explicación: Si el contador empieza en 1 y usa <=, el número de la condición es justo el número de vueltas.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s04-rev-1` · concepto bucle-for

La IA y Marta discuten cuántas veces imprime este bucle el recordatorio. ¿Quién tiene razón?

```ts
for (let i = 1; i <= 3; i++) {
  console.log("Recordatorio");
}
```

- La IA: Lo imprime 3 veces. (`i` vale 1, 2 y 3. Cuando llega a 4, `i <= 3` ya no se cumple y el bucle para.)
- Marta: Lo imprime 4 veces. (Los bucles siempre cuentan desde el 0: 0, 1, 2 y 3.)

Correcta: La IA

Pistas: 1) Mira la primera parte del `for`: ¿con qué valor empieza `i`? 2) El bucle repite mientras la condición del medio se cumpla. 3) Apunta los valores de `i`: 1, 2, 3… ¿y 4?

Explicación: Lo imprime 3 veces. Para saber cuántas vueltas da un `for`, mira dónde empieza (`i = 1`), dónde para (`i <= 3`) y cuánto avanza (`i++`, de uno en uno). Son las tres partes que tienes que revisar en cualquier bucle.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s04-d01-x1` · concepto bucle-for

¿Qué escribe este programa?

```ts
for (let i = 1; i <= 2; i++) {
  console.log("Hola");
}
console.log("Fin");
```

- ✅ `Hola ⏎ Hola ⏎ Fin`: Eso es: el bloque se repite dos veces y «Fin», que va fuera, una.
- ▫️ `Hola ⏎ Fin ⏎ Hola ⏎ Fin`: «Fin» está fuera de las llaves: no se repite.
- ▫️ `Hola ⏎ Fin`: El bucle da dos vueltas: i vale 1 y luego 2.

Pistas: 1) ¿Qué líneas están dentro de las llaves? 2) Solo console.log("Hola") se repite. 3) Dos vueltas, y después la línea de fuera.

Explicación: Lo que está dentro de las llaves se repite; lo de después se ejecuta una vez, cuando el bucle termina.

#### Repaso 2 · ¿Quién tiene razón? (Revisión) · `s04-rev-x1` · concepto bucle-for

La IA y Marta discuten qué números imprime este bucle. ¿Quién tiene razón?

```ts
for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

- La IA: Imprime `1`, `2` y `3`. (Da tres vueltas, así que cuenta hasta 3.)
- Marta: Imprime `0`, `1` y `2`. (Empieza en 0 y para antes de llegar a 3.)

Correcta: Marta

Pistas: 1) ¿Con qué valor empieza `i`? 2) El bucle sigue mientras `i < 3`. 3) ¿Cumple 3 la condición `i < 3`?

Explicación: Imprime `0`, `1` y `2`. Tres vueltas, pero empezando en 0. Lo verás muchísimo, sobre todo con listas, la semana que viene.

---

## Día 2: Las tres partes del for

**Objetivo:** Hoy aprendes a leer las tres partes de un for (inicio, condición y paso) y a detectar el error más típico de los bucles: una vuelta de más o de menos.

### Microlección

**Pantalla 1 · esquema**

*for (let i = 1; i <= 3; i++)*

**Inicio** → let i = 1. Crea el contador. Solo se hace una vez, al principio.

↓

**Condición** → i <= 3. Se pregunta antes de cada vuelta. Si da false, el bucle termina.

↓

**Bloque** → Lo que hay entre llaves. Se ejecuta una vez por vuelta.

↓

**Paso** → i++. Se hace al final de cada vuelta, y vuelve a la condición.

**Pantalla 2 · codigo**

```ts
let n = 5;
n++;
console.log(n);
```

Salida: `6`

`n++` es una forma corta de escribir `n = n + 1`. Y `n--` resta 1. En los for los verás constantemente.

**Pantalla 3 · codigo**

```ts
for (let i = 1; i < 3; i++) {
  console.log(i);
}
```

Salida: `1` / `2`

Con `<` en vez de `<=`, el 3 se queda fuera: dos vueltas, no tres. Es el **error de uno**, el fallo más típico de los bucles, también en el código de las IA. No da error: simplemente falta (o sobra) una vuelta.

**Pantalla 4 · texto**

Para revisar un for, comprueba los extremos: ¿cuál es el **primer** valor de i? ¿Y el **último** que entra? Si te piden «del 1 al 5», el primero debe ser 1 y el último 5.

**Pantalla 5 · deiure**

Cuando DeIure dibuja un gráfico de una hoja de cálculo, este for traza las líneas de la cuadrícula: i va de 0 a 4 con <=, así que son **cinco** líneas.

```ts
for (let i = 0; i <= 4; i++) {
```

`DeIure/src/lib/spreadsheet-chart-svg.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s04-d02-r1` · concepto bucle-for

¿Qué escribe este programa?

```ts
for (let i = 2; i <= 4; i++) {
  console.log(i);
}
```

- ✅ `2 ⏎ 3 ⏎ 4`: Eso es: empieza en 2 y el 4 entra porque es <=.
- ▫️ `2 ⏎ 3`: Con <= el 4 también entra.
- ▫️ `1 ⏎ 2 ⏎ 3 ⏎ 4`: El inicio es let i = 2: el contador empieza en 2.

Pistas: 1) Mira el inicio: ¿cuánto vale i la primera vez? 2) Y la condición: ¿entra el 4? 3) Del 2 al 4, los dos incluidos.

Explicación: El contador no tiene por qué empezar en 0 ni en 1: empieza donde diga el inicio.

#### Reto 2 · Rellena el hueco · `s04-d02-r2` · concepto bucle-for

Completa el inicio para que escriba 1, 2 y 3.

```ts
for (let i = ___; i <= 3; i++) {
  console.log(i);
}
```

Objetivo: `1` / `2` / `3`

- ✅ `1`: Correcto: empieza en 1 y termina en 3.
- ▫️ `0`: Empezaría en 0: escribiría 0, 1, 2 y 3, una vuelta de más.
- ▫️ `3`: Empezaría en 3: solo escribiría el 3.

Pistas: 1) ¿Cuál es el primer número que debe salir? 2) El inicio es el primer valor de i. 3) El 1.

Explicación: Empezar en 0 en vez de en 1 es la otra cara del error de uno: una vuelta de más.

#### Reto 3 · Caza el fallo (Revisión) · `s04-rev-2` · concepto bucle-for

Le pediste a la IA: «Imprime los días 1 a 5 del plazo». Toca la línea que está mal.

```ts
for (let dia = 1; dia < 5; dia++) {
  console.log(`Día ${dia}`);
}
```

- ✅ `Para en el 4: con `<` el 5 se queda fuera. Tenía que ser `dia <= 5`.`: Exacto. Es el fallo de la semana: una vuelta de menos por culpa de `<` frente a `<=`.
- ▫️ `Tiene que empezar en 0: `let dia = 0`.`: Entonces imprimiría un «Día 0», que no existe. El inicio está bien; mira dónde para.
- ▫️ ``dia++` tendría que ser `dia + 1`.`: `dia + 1` calcula el siguiente, pero no lo guarda: el bucle no avanzaría nunca. `dia++` está bien.

Pistas: 1) ¿Cuál es el último día que imprime? 2) `<` es «menor que»: el propio 5 no entra. 3) ¿Es 5 menor que 5?

Explicación: Imprime del `Día 1` al `Día 4`. Falta el último. Las vueltas de más o de menos son el fallo más típico de los bucles. Revisa siempre la primera y la última vuelta: ¿empieza y acaba donde debe?

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s04-d02-x1` · concepto bucle-for

¿Cuántas líneas escribe este programa?

```ts
for (let i = 1; i < 4; i++) {
  console.log("Vuelta");
}
```

- ✅ `Vuelta ⏎ Vuelta ⏎ Vuelta`: Eso es: i vale 1, 2 y 3. Con < el 4 no entra.
- ▫️ `Vuelta ⏎ Vuelta ⏎ Vuelta ⏎ Vuelta`: Con < el 4 se queda fuera: son tres vueltas.
- ▫️ `Vuelta`: El bucle repite el bloque mientras i < 4.

Pistas: 1) ¿Qué valores de i cumplen i < 4? 2) Empieza en 1. 3) 1, 2 y 3.

Explicación: Con <, el número de la condición no entra. De 1 a < 4 son tres vueltas.

#### Repaso 2 · ¿Qué imprime? · `s04-d02-x2` · concepto bucle-for

¿Qué escribe este programa?

```ts
let n = 10;
n--;
n--;
console.log(n);
```

- ✅ `8`: Eso es: cada n-- resta 1.
- ▫️ `9`: Hay dos n--: resta 1 dos veces.
- ▫️ `10`: n-- sí cambia la caja: es n = n - 1.

Pistas: 1) n-- es una forma corta de algo. 2) n-- es n = n - 1. 3) Dos veces: 10, 9, 8.

Explicación: ++ suma 1 y -- resta 1. Son atajos muy comunes en los bucles.

---

## Día 3: Ir sumando: el acumulador

**Objetivo:** Hoy aprendes a sumar un total vuelta a vuelta con una caja que acumula, y los dos fallos que lo estropean.

### Microlección

**Pantalla 1 · pasoapaso**

```ts
let multa = 0;
for (let dia = 1; dia <= 3; dia++) {
  multa = multa + 100;
}
console.log(multa);
```

- Línea 1: {"multa":"0"} · Una penalización inventada de 100 € por cada día de retraso. La caja del total empieza en 0, **fuera** del bucle.
- Línea 2: {"multa":"0","dia":"1"} · Inicio: dia vale 1.
- Línea 2: {"multa":"0","dia":"1"} · ¿1 <= 3? Sí.
- Línea 3: {"multa":"100","dia":"1"} · multa = 0 + 100. La caja guarda el total que lleva.
- Línea 2: {"multa":"100","dia":"2"} · dia++: dia vale 2.
- Línea 2: {"multa":"100","dia":"2"} · ¿2 <= 3? Sí.
- Línea 3: {"multa":"200","dia":"2"} · multa = 100 + 100. Suma sobre lo que ya había.
- Línea 2: {"multa":"200","dia":"3"} · dia vale 3.
- Línea 2: {"multa":"200","dia":"3"} · ¿3 <= 3? Sí.
- Línea 3: {"multa":"300","dia":"3"} · multa = 200 + 100.
- Línea 2: {"multa":"300","dia":"4"} · dia vale 4.
- Línea 2: {"multa":"300","dia":"4"} · ¿4 <= 3? No: sale del bucle.
- Línea 5: {"multa":"300"} · dia ya no existe fuera del bucle; multa, sí. Escribe el total.

**Pantalla 2 · texto**

Esto es un **acumulador**: una caja creada **antes** del bucle, con un valor inicial, a la que cada vuelta le suma algo. Es como el contador de horas de un despacho: empieza a cero y cada tarea añade lo suyo.

**Pantalla 3 · codigo**

```ts
let total = 0;
for (let i = 1; i <= 4; i++) {
  total = total + i;
}
console.log(total);
```

Salida: `10`

Dentro del bucle también puedes sumar el propio contador: 1 + 2 + 3 + 4 = 10.

**Pantalla 4 · texto**

Al revisar un acumulador de una IA, mira dos cosas. 1) ¿Se crea **fuera** del bucle? Si se crea dentro, vuelve a empezar en cada vuelta y pierde lo sumado. 2) ¿Empieza en el valor correcto? Para sumar, 0.

**Pantalla 5 · deiure**

Una tarea programada de DeIure seudonimiza a los usuarios que se dieron de baja hace más de 30 días. Lleva tres acumuladores, que empiezan en 0 antes del bucle: los procesados, los que se salta y los que fallan. Dentro del bucle, simplificado:

```ts
if (o.status === 'fulfilled') {
  if (o.value) processed++;
  else skipped++;
} else {
  errors++;
}
```

`DeIure/src/lib/pseudonymization.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s04-d03-r1` · concepto bucle-for

¿Qué escribe este programa?

```ts
let total = 0;
for (let i = 1; i <= 3; i++) {
  total = total + i;
}
console.log(total);
```

- ✅ `6`: Eso es: 1 + 2 + 3 = 6.
- ▫️ `3`: Ese es el último valor de i, pero total va acumulando todos.
- ▫️ `1 ⏎ 3 ⏎ 6`: console.log está fuera del bucle: escribe una sola vez, al final.

Pistas: 1) ¿Dónde está el console.log, dentro o fuera de las llaves? 2) En cada vuelta, total suma el valor de i. 3) 0 + 1 + 2 + 3.

Explicación: Si el console.log va después del bucle, solo ves el resultado final.

#### Reto 2 · Rellena el hueco · `s04-d03-r2` · concepto bucle-for

Este acumulador multiplica en vez de sumar: duplica 3 veces. Completa el valor inicial para que escriba 8.

```ts
let p = ___;
for (let i = 1; i <= 3; i++) {
  p = p * 2;
}
console.log(p);
```

Objetivo: `8`

- ✅ `1`: Correcto: 1 × 2 × 2 × 2 = 8.
- ▫️ `0`: 0 multiplicado por lo que sea sigue siendo 0.
- ▫️ `2`: Daría 2 × 2 × 2 × 2 = 16.

Pistas: 1) ¿Qué pasa si multiplicas por 0? 2) Hace falta un número que no cambie lo que multiplica. 3) El que no cambia nada al multiplicar es el 1.

Explicación: Para sumar, el acumulador empieza en 0; para multiplicar, en 1. Son los números que «no cambian nada».

#### Reto 3 · Caza el fallo (Revisión) · `s04-rev-3` · concepto bucle-for

Le pediste a la IA: «Muestra las horas acumuladas tras cada turno de 8 horas: 8, 16 y 24». Toca la línea que está mal.

```ts
for (let t = 1; t <= 3; t++) {
  let total = 0;
  total = total + 8;
  console.log(total);
}
```

- ✅ ``total` se crea dentro del bucle, así que vuelve a 0 en cada vuelta. Hay que crearlo antes del `for`.`: Exacto. Lo que tiene que acumularse vuelta a vuelta se crea fuera del bucle, antes de empezar.
- ▫️ `Tenía que ser `total = 8`.`: Así siempre valdría 8, que es justo lo que ya pasa. Fíjate en dónde se pone a 0.
- ▫️ `El `console.log` tiene que ir fuera del bucle.`: Entonces solo imprimiría una vez, y se pide el total tras cada turno. El fallo está antes.

Pistas: 1) ¿Qué imprime? ¿Pasa alguna vez de 8? 2) Todo lo que está entre las llaves del `for` se repite en cada vuelta. 3) ¿Qué le pasa a `total` al empezar cada vuelta?

Explicación: Imprime `8`, `8` y `8`. En cada vuelta se crea un `total` nuevo a 0, así que nunca acumula. Regla para revisar: el acumulador se crea **antes** del bucle y se actualiza **dentro**.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s04-d03-x1` · concepto bucle-for

Cada día suma 10 solicitudes nuevas. ¿Qué escribe este programa?

```ts
let t = 0;
for (let d = 1; d <= 3; d++) {
  t = t + 10;
  console.log(t);
}
```

- ✅ `10 ⏎ 20 ⏎ 30`: Eso es: el console.log está dentro, así que escribe el total de cada vuelta.
- ▫️ `30`: El console.log está dentro del bucle: escribe en cada vuelta.
- ▫️ `10 ⏎ 10 ⏎ 10`: t no vuelve a 0: se crea fuera del bucle y conserva lo sumado.

Pistas: 1) ¿El console.log está dentro o fuera? 2) Dentro: escribe una vez por vuelta. 3) Y t va creciendo de 10 en 10.

Explicación: Con el console.log dentro ves cómo crece el acumulador; fuera, solo el final.

#### Repaso 2 · Caza el fallo (Revisión) · `s04-rev-x2` · concepto bucle-for

Le pediste a la IA: «Suma 3 turnos de 8 horas». Tenía que salir 24. Toca la línea que está mal.

```ts
let total = 1;
for (let t = 1; t <= 3; t++) {
  total = total + 8;
}
console.log(total);
```

- ✅ `El total empieza en 1. Para sumar desde cero, tiene que empezar en 0.`: Exacto. Un acumulador para sumar empieza en 0.
- ▫️ `El bucle tiene que empezar en `t = 0`.`: Así daría 4 vueltas y sumaría un turno de más. Las vueltas están bien; mira el valor inicial del total.
- ▫️ `Tenía que ser `total = total * 8`.`: Multiplicar daría 512. Sumar 8 en cada vuelta es correcto; el problema es desde dónde empieza.

Pistas: 1) ¿Qué imprime? ¿Cuánto se pasa? 2) Un acumulador tiene que empezar en un valor que no estropee la suma. 3) ¿Con qué valor empieza `total`?

Explicación: Imprime `25` en lugar de `24`. Un error de uno en el valor inicial es difícil de ver a simple vista. Por eso conviene probar con un caso que sepas calcular de cabeza.

---

## Día 4: Mientras que: while

**Objetivo:** Hoy aprendes a repetir con while mientras se cumpla una condición, y cuándo conviene más que un for.

### Microlección

**Pantalla 1 · pasoapaso**

```ts
let dias = 3;
while (dias > 0) {
  console.log("Quedan", dias);
  dias = dias - 1;
}
console.log("Vencido");
```

- Línea 1: {"dias":"3"} · Quedan 3 días para contestar una solicitud de acceso.
- Línea 2: {"dias":"3"} · ¿3 > 0? Sí: entra.
- Línea 3: {"dias":"3"} · Avisa.
- Línea 4: {"dias":"2"} · Pasa un día: dias baja a 2. Sin esta línea, el bucle no terminaría nunca.
- Línea 2: {"dias":"2"} · Vuelve arriba. ¿2 > 0? Sí.
- Línea 3: {"dias":"2"} · Avisa.
- Línea 4: {"dias":"1"} · dias baja a 1.
- Línea 2: {"dias":"1"} · ¿1 > 0? Sí.
- Línea 3: {"dias":"1"} · Avisa.
- Línea 4: {"dias":"0"} · dias baja a 0.
- Línea 2: {"dias":"0"} · ¿0 > 0? No: sale del bucle.
- Línea 6: {"dias":"0"} · Sigue con lo de después.

**Pantalla 2 · texto**

`while` («mientras») repite el bloque **mientras la condición sea true**. No trae contador: lo que cambie la condición lo tienes que poner tú dentro del bloque. Usa `for` cuando sabes cuántas vueltas habrá, y `while` cuando no lo sabes de antemano.

**Pantalla 3 · codigo**

```ts
let copias = 1;
while (copias < 10) {
  copias = copias * 2;
}
console.log(copias);
```

Salida: `16`

Duplica hasta llegar a 10 o más: 1, 2, 4, 8, 16. No sabías de antemano que serían cuatro vueltas, y no hacía falta saberlo.

**Pantalla 4 · deiure**

Cada figura del apartado 4 de una EIPD lleva un identificador único. Si ya está usado, DeIure le añade `_1`; si ese también, `_2`, y así **mientras** siga repetido. `suffix += 1` es lo mismo que `suffix = suffix + 1`.

```ts
while (params.seen.has(id)) {
  id = `${base}_${suffix}`;
  suffix += 1;
}
```

`DeIure/src/lib/apartado-04-normalizer.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s04-d04-r1` · concepto bucle-while

¿Qué escribe este programa?

```ts
let n = 1;
while (n < 5) {
  n = n + 2;
}
console.log(n);
```

- ✅ `5`: Eso es: 1, 3, 5. Con 5, la condición n < 5 ya es false.
- ▫️ `3`: Con 3, ¿3 < 5? Sí: da otra vuelta.
- ▫️ `7`: Con 5, ¿5 < 5? No: ya no da otra vuelta.

Pistas: 1) Apunta el valor de n después de cada vuelta. 2) 1, luego 3, luego… 3) ¿5 < 5?

Explicación: Para seguir un while, apunta la caja vuelta a vuelta y pregunta la condición cada vez.

#### Reto 2 · Rellena el hueco · `s04-d04-r2` · concepto bucle-while

Quedan 3 solicitudes por revisar. Completa para que escriba «Revisar» 3 veces.

```ts
let pendientes = 3;
while (pendientes ___ 0) {
  console.log("Revisar");
  pendientes = pendientes - 1;
}
```

Objetivo: `Revisar` / `Revisar` / `Revisar`

- ✅ `>`: Correcto: 3, 2 y 1 son mayores que 0. Con 0, para.
- ▫️ `<`: ¿3 < 0? No: no daría ni una vuelta.
- ▫️ `>=`: También entraría con 0: cuatro vueltas, una de más.

Pistas: 1) Debe repetir mientras queden pendientes. 2) Quedan mientras pendientes sea mayor que 0. 3) Con 0 debe parar.

Explicación: > 0 o >= 0 es la diferencia entre acertar y dar una vuelta de más: el error de uno también existe en los while.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s04-rev-4` · concepto bucle-while

La IA y Marta discuten qué imprime este código. ¿Quién tiene razón?

```ts
let horas = 0;
while (horas < 72) {
  horas = horas + 24;
}
console.log(horas);
```

- La IA: Imprime `96`. (Un `while` siempre da una vuelta de más antes de parar.)
- Marta: Imprime `72`. (Al llegar a 72, `horas < 72` ya no se cumple y el bucle para.)

Correcta: Marta

Pistas: 1) Apunta el valor de `horas` tras cada vuelta. 2) El `while` comprueba la condición **antes** de cada vuelta. 3) Cuando `horas` vale 72, ¿se cumple `horas < 72`?

Explicación: Imprime `72`: 0, 24, 48, 72 y para. El `while` pregunta antes de cada vuelta. Seguir las vueltas a mano, apuntando el valor de la variable, es la mejor forma de revisar un bucle. Es lo mismo que hace el visualizador.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s04-d04-x1` · concepto bucle-while

¿Qué escribe este programa?

```ts
let x = 10;
while (x > 7) {
  x = x - 1;
  console.log(x);
}
```

- ✅ `9 ⏎ 8 ⏎ 7`: Eso es: resta antes de escribir. Con 7, ¿7 > 7? No: para.
- ▫️ `10 ⏎ 9 ⏎ 8`: Primero resta y luego escribe: el primer número es 9.
- ▫️ `9 ⏎ 8 ⏎ 7 ⏎ 6`: Con x = 7, ¿7 > 7? No: no da otra vuelta.

Pistas: 1) ¿Qué va antes dentro del bloque, restar o escribir? 2) Resta y luego escribe. 3) Para cuando x deja de ser mayor que 7.

Explicación: El orden de las líneas dentro del bucle importa: cambia lo que ves en cada vuelta.

#### Repaso 2 · ¿Quién tiene razón? (Revisión) · `s04-rev-x4` · concepto bucle-while

La IA y Marta discuten qué imprime este código. ¿Quién tiene razón?

```ts
let horas = 80;
while (horas < 72) {
  horas = horas + 1;
}
console.log(horas);
```

- Marta: Imprime `81`. (Un `while` siempre da al menos una vuelta.)
- La IA: Imprime `80`. (La condición no se cumple ni la primera vez, así que no entra en el bucle.)

Correcta: La IA

Pistas: 1) ¿Se cumple la condición con 80? 2) El `while` comprueba la condición antes de cada vuelta, también antes de la primera. 3) Si no entra nunca, ¿cambia `horas`?

Explicación: Imprime `80`. Un `while` puede dar cero vueltas. Cuando revises un bucle, piensa también en ese caso: ¿qué pasa si no hay nada que repetir?

---

## Día 5: Hacia atrás y de dos en dos

**Objetivo:** Hoy aprendes a hacer bucles que cuentan hacia atrás o dan saltos, cambiando el paso del for.

### Microlección

**Pantalla 1 · codigo**

```ts
for (let i = 3; i >= 1; i--) {
  console.log(i);
}
console.log("¡Plazo cerrado!");
```

Salida: `3` / `2` / `1` / `¡Plazo cerrado!`

Una cuenta atrás: empieza en 3, sigue **mientras** i >= 1 y en cada vuelta `i--` resta 1. Al contar hacia atrás, la condición mira hacia abajo: `>=` en vez de `<=`.

**Pantalla 2 · codigo**

```ts
for (let i = 0; i < 6; i = i + 2) {
  console.log(i);
}
```

Salida: `0` / `2` / `4`

El paso puede ser cualquier cambio: aquí `i = i + 2` salta de dos en dos. El 6 no sale porque `6 < 6` es false.

**Pantalla 3 · texto**

Para revisar cualquier for, haz siempre tres preguntas: ¿**dónde empieza**? ¿**dónde para** (y el último entra o no)? ¿**cuánto cambia** en cada vuelta? Con esas tres respuestas sabes todos los valores que tomará el contador.

**Pantalla 4 · deiure**

Para contar las páginas de un PDF, DeIure lee el fichero a trozos de 8192 bytes: el contador `offset` (posición) avanza de 8192 en 8192. `+=` suma sobre lo que ya hay.

```ts
for (let offset = 0; offset < bytes.length; offset += 8192)
```

`DeIure/src/lib/pdf-page-count.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s04-d05-r1` · concepto bucle-for

¿Qué escribe este programa?

```ts
for (let i = 10; i > 0; i = i - 3) {
  console.log(i);
}
```

- ✅ `10 ⏎ 7 ⏎ 4 ⏎ 1`: Eso es: resta 3 cada vez. Después del 1 vendría -2, que ya no es > 0.
- ▫️ `10 ⏎ 7 ⏎ 4`: ¿1 > 0? Sí: el 1 también sale.
- ▫️ `7 ⏎ 4 ⏎ 1`: El primer valor es el del inicio, 10, y se escribe antes de restar.

Pistas: 1) Empieza en 10 y resta 3 cada vuelta. 2) 10, 7, 4, 1… ¿y luego? 3) -2 no es mayor que 0: ahí para.

Explicación: El paso se aplica al final de cada vuelta: el primer valor siempre es el del inicio.

#### Reto 2 · Rellena el hueco · `s04-d05-r2` · concepto bucle-for

Completa el paso para que escriba 5, 3 y 1.

```ts
for (let i = 5; i >= 1; ___) {
  console.log(i);
}
```

Objetivo: `5` / `3` / `1`

- ✅ `i = i - 2`: Correcto: baja de dos en dos.
- ▫️ `i--`: i-- resta 1: escribiría 5, 4, 3, 2 y 1.
- ▫️ `i = i - 3`: Bajaría de tres en tres: 5 y 2.

Pistas: 1) ¿Cuánto hay del 5 al 3? 2) Baja 2 cada vez. 3) Restar 2: i = i - 2.

Explicación: El paso decide de cuánto en cuánto cambia el contador.

#### Reto 3 · Caza el fallo (Revisión) · `s04-rev-5` · concepto bucle-for

Le pediste a la IA: «Haz una cuenta atrás 3, 2, 1 y luego imprime ¡Enviado!». Toca la línea que está mal.

```ts
for (let i = 3; i > 1; i--) {
  console.log(i);
}
console.log("¡Enviado!");
```

- ✅ `Para antes del 1: con `i > 1`, el 1 no entra. Tenía que ser `i >= 1`.`: Exacto. La misma vuelta de menos de siempre, ahora contando hacia atrás.
- ▫️ `Para contar hacia atrás hay que usar `i++`.`: `i++` suma 1, así que `i` crecería sin parar. Para bajar se usa `i--`, como está.
- ▫️ `«¡Enviado!» tiene que ir dentro del bucle.`: Entonces se imprimiría en cada vuelta. Tiene que salir una vez, al final, como está.

Pistas: 1) ¿Qué números imprime? ¿Falta alguno? 2) `i--` resta 1 en cada vuelta. El bucle sigue mientras `i > 1`. 3) Cuando `i` vale 1, ¿se cumple `i > 1`?

Explicación: Imprime `3`, `2` y `¡Enviado!`. Se salta el 1. Contando hacia atrás pasa lo mismo que hacia delante: comprueba siempre la última vuelta.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s04-d05-x1` · concepto bucle-for

¿Qué escribe este programa?

```ts
for (let i = 1; i <= 8; i = i * 2) {
  console.log(i);
}
```

- ✅ `1 ⏎ 2 ⏎ 4 ⏎ 8`: Eso es: duplica cada vez, y el 8 entra porque es <=.
- ▫️ `1 ⏎ 2 ⏎ 3 ⏎ 4 ⏎ 5 ⏎ 6 ⏎ 7 ⏎ 8`: El paso es i * 2, no i++: duplica.
- ▫️ `2 ⏎ 4 ⏎ 8`: El primer valor es el del inicio, 1.

Pistas: 1) Mira el paso: no es i++. 2) Multiplica por 2 cada vuelta. 3) 1, 2, 4, 8… y 16 ya no es <= 8.

Explicación: El paso puede ser cualquier cálculo, también multiplicar.

#### Repaso 2 · ¿Qué imprime? · `s04-d05-x2` · concepto bucle-for

¿Qué escribe este programa?

```ts
for (let i = 2; i >= 0; i--) {
  console.log(i);
}
console.log("¡Ya!");
```

- ✅ `2 ⏎ 1 ⏎ 0 ⏎ ¡Ya!`: Eso es: con >= 0, el 0 también entra.
- ▫️ `2 ⏎ 1 ⏎ ¡Ya!`: ¿0 >= 0? Sí: el 0 también sale.
- ▫️ `2 ⏎ ¡Ya! ⏎ 1 ⏎ ¡Ya! ⏎ 0 ⏎ ¡Ya!`: «¡Ya!» está fuera del bucle: sale una vez, al final.

Pistas: 1) Cuenta hacia atrás desde 2. 2) ¿El 0 cumple i >= 0? 3) Sí. Y después, la línea de fuera.

Explicación: >= incluye el límite; > lo deja fuera. Mira siempre si el último valor entra.

---

## Día 6: El bucle que no acaba

**Objetivo:** Hoy aprendes por qué un bucle puede no terminar nunca, cómo pararlo y qué mirar para que no te pase.

### Microlección

**Pantalla 1 · codigo**

```ts
let revisadas = 0;
let horas = 0;
while (revisadas < 5) {
  horas = horas + 2;
}
console.log(horas);
```

Salida: (nada) y error

Quería sumar 2 horas por cada una de 5 EIPD revisadas. Pero nada dentro del bucle cambia `revisadas`: siempre vale 0, y `0 < 5` es true para siempre. Es un **bucle infinito**. El taller lo corta a las 100 000 vueltas y te avisa con el error «Demasiadas vueltas»: cuando lo veas, busca qué no cambia dentro del bucle.

**Pantalla 2 · codigo**

```ts
let revisadas = 0;
let horas = 0;
while (revisadas < 5) {
  horas = horas + 2;
  revisadas = revisadas + 1;
}
console.log(horas);
```

Salida: `10`

Con una línea que hace avanzar `revisadas`, la condición acaba siendo false y el bucle termina.

**Pantalla 3 · texto**

En tu Mac, un bucle infinito deja la terminal colgada y el ventilador acelerado. Para pararlo, pulsa **Ctrl + C** en la terminal: corta el programa que esté en marcha. Te servirá para cualquier orden que no acabe.

**Pantalla 4 · texto**

Tres causas típicas, para revisar código de una IA: 1) nada dentro del bucle cambia la caja de la condición; 2) la cambia **en la dirección equivocada** (suma cuando debía restar); 3) la condición usa `!==` y el contador **se salta** el valor: si vas de 2 en 2 desde 1, nunca llegas al 6.

**Pantalla 5 · deiure**

Para no esperar para siempre, DeIure pone un tope. Cuando guarda un documento, intenta «echar el cerrojo» al fichero para que nadie más lo toque a la vez, pero como mucho 300 veces. Si no lo consigue, se rinde con un error de «fichero ocupado» en vez de quedarse colgado.

```ts
for (let attempt = 0; attempt < 300; attempt += 1) {
```

`DeIure/src/lib/project-files.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s04-d06-r1` · concepto bucle-while

¿Qué escribe este programa?

```ts
let n = 0;
while (n !== 6) {
  n = n + 2;
}
console.log(n);
```

- ✅ `6`: Eso es: 0, 2, 4, 6. Al llegar a 6, n !== 6 es false y para.
- ▫️ `❌ No termina nunca`: Aquí sí termina: de 2 en 2 desde 0, n pasa justo por el 6.
- ▫️ `8`: Con 6 la condición ya es false: no da otra vuelta.

Pistas: 1) Apunta n vuelta a vuelta. 2) 0, 2, 4… ¿pasa por el 6? 3) Sí: cuando vale 6, para.

Explicación: Funciona, pero por los pelos: si n empezara en 1, pasaría de 5 a 7 y no pararía nunca. Con < o > es más seguro que con !==.

#### Reto 2 · Rellena el hueco · `s04-d06-r2` · concepto bucle-while

Ahora n empieza en 1. Completa la condición para que el bucle termine y escriba 7.

```ts
let n = 1;
while (n ___ 6) {
  n = n + 2;
}
console.log(n);
```

Objetivo: `7`

- ✅ `<`: Correcto: 1, 3, 5, 7. Con 7, ¿7 < 6? No: para.
- ▫️ `!==`: 1, 3, 5, 7, 9… n se salta el 6 y el bucle no termina nunca.
- ▫️ `>`: ¿1 > 6? No: no da ninguna vuelta y escribe 1.

Pistas: 1) n vale 1, 3, 5, 7… ¿llega a valer 6 alguna vez? 2) No: con !== no pararía nunca. 3) Hace falta «mientras sea menor que».

Explicación: Una condición con < o > para aunque el contador se salte el límite. Con !== hay que acertar el valor exacto.

#### Reto 3 · Caza el fallo (Revisión) · `s04-rev-6` · concepto bucle-while

Le pediste a la IA: «Calcula cuántos días son 72 horas, de 24 en 24». Al ejecutarlo, no termina nunca. Toca la línea que está mal.

```ts
let horas = 0;
let dias = 0;
while (horas < 72) {
  dias = dias + 1;
}
console.log(dias);
```

- ✅ ``horas` nunca cambia, así que `horas < 72` se cumple siempre. Falta `horas = horas + 24` dentro del bucle.`: Exacto. Si nada de lo que hay dentro del bucle cambia la condición, el bucle no termina nunca.
- ▫️ `Tenía que ser `horas <= 72`.`: Con `<=` tampoco pararía: `horas` sigue valiendo 0 para siempre. Mira qué cambia en cada vuelta.
- ▫️ ``dias` tendría que ser `const`.`: `dias` cambia en cada vuelta, así que tiene que ser `let`. El problema es la variable que **no** cambia.

Pistas: 1) ¿Qué variable aparece en la condición del `while`? 2) Para que un bucle termine, algo de dentro tiene que acercar la condición a falso. 3) ¿Cambia `horas` en alguna vuelta?

Explicación: Es un bucle infinito: `horas` vale 0 para siempre y el programa no llega al `console.log`. El taller lo corta y te avisa con «Demasiadas vueltas»; un servidor de verdad se quedaría colgado. Al revisar un `while`, busca dentro la línea que cambia la variable de la condición.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s04-d06-x1` · concepto bucle-while

¿Qué escribe este programa?

```ts
let h = 0;
while (h !== 10) {
  h = h + 4;
}
console.log(h);
```

- ✅ `❌ No termina nunca`: Eso es: 0, 4, 8, 12… h se salta el 10 y la condición nunca es false.
- ▫️ `10`: h nunca vale 10: va de 4 en 4 desde 0.
- ▫️ `12`: Para escribir algo tendría que salir del bucle, y no sale nunca.

Pistas: 1) Apunta h vuelta a vuelta. 2) 0, 4, 8, 12… ¿vale 10 alguna vez? 3) Nunca: la condición siempre es true.

Explicación: Con !== el contador tiene que caer justo en el valor. Si salta por encima, el bucle no acaba.

#### Repaso 2 · Caza el fallo (Revisión) · `s04-rev-x3` · concepto bucle-while

Le pediste a la IA: «Cuenta atrás desde 3 y luego imprime Despegue». No termina nunca. Toca la línea que está mal.

```ts
let i = 3;
while (i > 0) {
  i = i + 1;
}
console.log("Despegue");
```

- ✅ `Suma en vez de restar: `i` crece y nunca baja de 0. Tenía que ser `i = i - 1`.`: Exacto. El paso va en la dirección contraria y la condición nunca deja de cumplirse.
- ▫️ `Tenía que ser `i >= 0`.`: Con `>=` seguiría sin terminar: `i` sube sin parar. Mira hacia dónde se mueve `i`.
- ▫️ `Un `while` no puede contar hacia atrás; hace falta un `for`.`: Un `while` puede contar en cualquier dirección. El problema es hacia dónde se mueve `i`.

Pistas: 1) Apunta `i` en las primeras vueltas: 3, 4… 2) Para que el bucle termine, `i` tiene que acercarse a 0. 3) ¿Suma o resta la línea 3?

Explicación: Es un bucle infinito: `i` vale 3, 4, 5… y nunca deja de ser mayor que 0. Cuando revises un bucle, pregúntate siempre: ¿la variable de la condición se acerca al final?

---

## Día 7: Píldora: qué es un algoritmo (píldora de informática)

**Objetivo:** Hoy aprendes qué es un algoritmo, a escribirlo en pasos antes de programar y por qué dos algoritmos que dan el mismo resultado pueden tardar muy distinto.

### Microlección

**Pantalla 1 · texto**

Un **algoritmo** es una lista de pasos precisos que cualquiera puede seguir sin improvisar y que **termina**. Un protocolo de respuesta a brechas bien hecho lo es. Programar es escribir algoritmos en un idioma que entiende el ordenador; con bucles e if ya tienes las piezas.

**Pantalla 2 · esquema**

*Buscar el expediente 700 entre 1000 ordenados*

**Mitad** → Abre el archivador por la mitad y mira qué número hay.

↓

**¿Es este?** → Si es el 700, has terminado.

↓

**¿Antes o después?** → Si el 700 va después, quédate con la mitad de detrás; si va antes, con la de delante.

↓

**Repite** → Vuelve al primer paso con la mitad que te queda.

**Pantalla 3 · texto**

Eso de arriba es **pseudocódigo**: el algoritmo en tu idioma, antes de escribirlo en código. Compáralo con mirar los expedientes uno a uno: con 1000, puedes necesitar 1000 pasos; partiendo por la mitad, unos 10. Con un millón, un millón de pasos contra unos 20. Los dos funcionan, pero uno es muchísimo más **eficiente**.

**Pantalla 4 · codigo**

```ts
let n = 1000;
let pasos = 0;
while (n > 1) {
  n = n / 2;
  pasos++;
}
console.log(pasos);
```

Salida: `10`

¿Cuántas veces puedes partir 1000 por la mitad hasta quedarte con uno? 10. Por eso bastan unos 10 pasos. Al revisar código de una IA no basta con que funcione: un algoritmo lento puede tardar minutos con muchos datos.

**Pantalla 5 · esquema**

*Un algoritmo de DeIure: la baja de un usuario*

**Día 0** → Baja lógica: la cuenta se desactiva, pero no se borra.

↓

**Reactivación** → Hasta el día 30, el usuario puede recuperar su cuenta.

↓

**Día 30** → Seudonimización: el nombre se cambia por un código y la clave se guarda aparte.

↓

**Tres años** → Anonimización irreversible.

**Pantalla 6 · terminal**

```
$ ls copias
hola.ts
```

**Comando de la semana: mkdir, cp, mv y rm.** `mkdir` crea una carpeta; `cp` copia un fichero; `mv` lo mueve o le cambia el nombre; `rm` lo borra, **sin pasar por la papelera**: no hay deshacer. **Minirreto en tu Mac:** en `practica`, haz `mkdir copias`, luego `cp hola.ts copias/` y `ls copias`: debe salir `hola.ts`. Después `mv copias/hola.ts copias/adios.ts` y otra vez `ls copias`: ahora debe salir `adios.ts`. Para terminar, `rm copias/adios.ts`.

### Retos

#### Reto 1 · ¿Qué imprime? · `s04-d07-r1` · concepto algoritmos

Un algoritmo que busca el expediente 4 mirándolos uno a uno. ¿Qué escribe?

```ts
const buscado = 4;
for (let i = 1; i <= 6; i++) {
  if (i === buscado) {
    console.log("Encontrado en", i);
  }
}
```

- ✅ `Encontrado en 4`: Eso es: mira los 6, pero solo con el 4 la condición es true.
- ▫️ `Encontrado en 4 ⏎ Encontrado en 5 ⏎ Encontrado en 6`: La condición es i === 4, no i >= 4: solo se cumple una vez.
- ▫️ `1 ⏎ 2 ⏎ 3 ⏎ 4`: El console.log está dentro del if: solo escribe cuando encuentra el 4.

Pistas: 1) El for da 6 vueltas. ¿En cuántas se cumple el if? 2) Solo cuando i vale 4. 3) Escribe una sola línea.

Explicación: Un if dentro de un for es la forma de buscar algo uno a uno. Fíjate: sigue mirando el 5 y el 6 aunque ya lo haya encontrado. Más adelante verás cómo parar antes.

#### Reto 2 · Rellena el hueco · `s04-d07-r2` · concepto algoritmos

Para medir cuánto trabaja un algoritmo, se cuentan sus pasos. Completa para que cuente las 8 vueltas.

```ts
let pasos = 0;
for (let i = 1; i <= 8; i++) {
  pasos = pasos ___ 1;
}
console.log(pasos);
```

Objetivo: `8`

- ✅ `+`: Correcto: suma 1 por vuelta, 8 en total.
- ▫️ `-`: Restaría: acabaría en -8.
- ▫️ `*`: 0 × 1 sigue siendo 0: no contaría nada.

Pistas: 1) Es un acumulador que empieza en 0. 2) En cada vuelta debe crecer 1. 3) Sumar.

Explicación: Contar pasos es la forma más sencilla de comparar dos algoritmos: el que da menos, gana.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s04-rev-7` · concepto algoritmos

Este algoritmo cuenta cuántas veces hay que partir 10 por la mitad hasta que quede 1 o menos. La IA y Marta discuten qué imprime. ¿Quién tiene razón?

```ts
let n = 10;
let pasos = 0;
while (n > 1) {
  n = n / 2;
  pasos = pasos + 1;
}
console.log(pasos);
```

- La IA: Imprime `3`. (10, 5 y 2: tres pasos.)
- Marta: Imprime `5`. (Hasta llegar a 1 desde 10 hay cinco mitades.)

Correcta: ninguno

Pistas: 1) Apunta `n` tras cada vuelta. Ojo: dividir puede dar decimales. 2) El bucle sigue mientras `n` sea mayor que 1. 3) 10, 5, 2.5… ¿cuántas vueltas hasta bajar de 1?

Explicación: Imprime `4`. Ahora imagina que buscas un dato en una lista ordenada y, en cada paso, descartas la mitad de los datos que te quedan por mirar. Con 1.000 datos te bastan unos 10 pasos, y con un millón, unos 20. Muchos algoritmos rápidos funcionan así. Contar los pasos es la forma de medir si un código es eficiente.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s04-d07-x1` · concepto algoritmos

¿Cuántas veces se puede partir 32 por la mitad hasta llegar a 1?

```ts
let n = 32;
let pasos = 0;
while (n > 1) {
  n = n / 2;
  pasos++;
}
console.log(pasos);
```

- ✅ `5`: Eso es: 32, 16, 8, 4, 2, 1. Cinco pasos.
- ▫️ `16`: 16 es la primera mitad, no el número de pasos.
- ▫️ `6`: Cuenta los pasos, no los números: de 32 a 1 hay cinco divisiones.

Pistas: 1) Apunta n después de cada vuelta. 2) 16, 8, 4, 2, 1. 3) ¿Cuántas divisiones has hecho?

Explicación: Partir por la mitad reduce muy deprisa: con 32 elementos, 5 pasos; con 1000, 10.

#### Repaso 2 · ¿Qué imprime? · `s04-d07-x2` · concepto algoritmos

Buscar uno a uno entre 1000. ¿Qué escribe este programa?

```ts
let pasos = 0;
for (let i = 1; i <= 1000; i++) {
  pasos++;
}
console.log(pasos);
```

- ✅ `1000`: Eso es: una vuelta por expediente.
- ▫️ `10`: Esos serían los pasos partiendo por la mitad, no mirando uno a uno.
- ▫️ `999`: Con <=, el 1000 también da vuelta.

Pistas: 1) ¿Cuántas vueltas da el for? 2) De 1 a 1000, los dos incluidos. 3) Una vuelta, un paso.

Explicación: 1000 pasos contra 10: el mismo resultado, cien veces más trabajo.

