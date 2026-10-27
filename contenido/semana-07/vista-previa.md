# Semana 7: vista previa

Generado desde los JSON. Para revisar el contenido sin abrir el formato.

---

## Día 1: Objetos: una ficha con campos

**Objetivo:** Hoy aprendes a guardar varios datos de una misma cosa en un objeto, cada uno con su nombre, y a leer cada dato con un punto.

### Microlección

**Pantalla 1 · texto**

Hasta ahora, cada variable guardaba un dato suelto. Pero un expediente tiene número, estado, cliente… Un **objeto** (object) los guarda juntos, como una **ficha** con campos: cada campo tiene un **nombre** (la clave) y un **valor**. Se escribe entre llaves: `{ clave: valor, clave: valor }`.

**Pantalla 2 · pasoapaso**

```ts
const exp = {
  numero: 145,
  estado: "abierto",
};
console.log(exp.numero);
console.log(exp.estado);
```

- Línea 1: {"exp":"{ numero: 145, estado: \"abierto\" }"} · Las líneas 1 a 4 son una sola orden: crean un objeto con dos campos, numero y estado, y lo guardan en exp. Los campos se separan con comas.
- Línea 5: {"exp":"{ numero: 145, estado: \"abierto\" }"} · Para leer un campo: el objeto, un **punto** y la clave. `exp.numero` se lee «el número del expediente».
- Línea 6: {"exp":"{ numero: 145, estado: \"abierto\" }"} · `exp.estado` da el valor del campo estado.

**Pantalla 3 · codigo**

```ts
const persona = {
  nombre: "Laura",
  edad: 34,
  consiente: true,
};
console.log(persona.nombre);
console.log(persona);
```

Salida: `Laura` / `{ nombre: 'Laura', edad: 34, consiente: true }`

Un objeto mezcla tipos sin problema: texto, número y booleano. Si escribes el objeto entero, sale con sus llaves y sus claves (los textos, con comillas simples: es la forma de escribirlos de la consola).

**Pantalla 4 · deiure**

Al seudonimizar a un usuario dado de baja, DeIure elige un prefijo según su rol. Los prefijos están en un objeto: la clave es el rol y el valor, el prefijo. (`Record<string, string>` es el tipo de TypeScript: claves de texto con valores de texto.)

```ts
const ROLE_PREFIX: Record<string, string> = {
  user: 'USR',
  free: 'USR',
  paid: 'USR',
  admin: 'ADM',
  organization: 'ORG',
};
```

`DeIure/src/lib/pseudonymization.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s07-d01-r1` · concepto objetos

¿Qué escribe este programa?

```ts
const cliente = {
  nombre: "Clínica Arga",
  empleados: 40,
};
console.log(cliente.empleados + 2);
```

- ✅ `42`: Eso es: cliente.empleados vale 40, y 40 + 2 es 42.
- ▫️ `40`: Falta el + 2.
- ▫️ `Clínica Arga`: Se lee el campo empleados, no el nombre.

Pistas: 1) ¿Qué campo se lee en la última línea? 2) cliente.empleados vale 40. 3) Después se le suma 2.

Explicación: Un campo de un objeto se usa como cualquier variable: se puede escribir, sumar o comparar.

#### Reto 2 · Rellena el hueco · `s07-d01-r2` · concepto objetos

Completa para que escriba abierta.

```ts
const exp = {
  numero: 7,
  estado: "abierta",
};
console.log(___);
```

Objetivo: `abierta`

- ✅ `exp.estado`: Correcto: el objeto, un punto y la clave del campo.
- ▫️ `exp.abierta`: abierta es el valor, no la clave. Ese objeto no tiene ningún campo llamado abierta: sale undefined.
- ▫️ `estado`: estado no es una variable suelta: es un campo de exp. Sale un error.

Pistas: 1) ¿Cuál es la clave y cuál el valor? 2) La clave es estado; su valor, abierta. 3) Se lee con el objeto, un punto y la clave.

Explicación: Se busca por la clave, nunca por el valor: como en una ficha, miras la casilla «estado» para saber qué pone.

#### Reto 3 · Caza el fallo (Revisión) · `s07-rev-1` · concepto objetos

Le pediste a la IA: «Guarda el expediente en un objeto e imprime su estado». Da un error. Toca la línea que está mal.

```ts
const exp = {
  numero: 7,
  estado: "abierta",
};
console.log(estado);
```

- ✅ ``estado` vive dentro del objeto: hay que pedírselo a él con `exp.estado`.`: Exacto. Una propiedad no es una variable suelta: se lee con el nombre del objeto, un punto y la clave.
- ▫️ `Falta la coma después de `"abierta"`.`: Esa coma está, y además la última coma de un objeto es opcional. Mira cómo se lee el estado en la línea 5.
- ▫️ `Las claves de un objeto tienen que ir entre comillas: `"estado": "abierta"`.`: Las claves sencillas no necesitan comillas. El objeto está bien escrito; el problema es cómo se lee.

Pistas: 1) ¿Existe alguna variable que se llame `estado`? 2) `estado` es una clave del objeto `exp`. 3) Para leer una propiedad se escribe `objeto.clave`.

Explicación: Da `ReferenceError: estado is not defined`. La única variable es `exp`; `estado` es una de sus claves. Con `exp.estado` sale `abierta`. Al revisar, comprueba que cada propiedad se lee desde su objeto.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s07-d01-x1` · concepto objetos

¿Qué escribe este programa?

```ts
const caja = {
  ancho: 3,
  alto: 2,
};
console.log(caja);
```

- ✅ `{ ancho: 3, alto: 2 }`: Eso es: el objeto entero, con sus claves y valores.
- ▫️ `3 ⏎ 2`: Se escribe el objeto entero, no cada valor por separado.
- ▫️ `caja`: Sin comillas, caja es la variable: sale lo que guarda.

Pistas: 1) ¿Se lee un campo o el objeto entero? 2) No hay punto: es el objeto entero. 3) Sale entre llaves.

Explicación: Escribir el objeto entero es la forma más rápida de ver qué tiene dentro al revisar un programa.

### Para nota

#### Reto difícil · ¿Qué imprime? · `s07-d01-n1` · concepto objetos

Este programa avisa si una brecha lleva más de 72 horas sin notificar. ¿Qué escribe?

```ts
const b = {
  horas: 80,
  notificada: false,
};
if (b.horas > 72 && !b.notificada) {
  console.log("Retraso");
} else {
  console.log("En regla");
}
```

- ✅ `Retraso`: Eso es: 80 > 72 es true, y !false es true. Se cumplen las dos.
- ▫️ `En regla`: notificada es false, así que !b.notificada es true: se cumplen las dos condiciones.
- ▫️ `Retraso ⏎ En regla`: Un if…else solo entra en una de las dos ramas.

Pistas: 1) Calcula por separado las dos partes del &&. 2) b.horas > 72 es true. ¿Y !b.notificada? 3) ! le da la vuelta: !false es true.

Explicación: Los campos de un objeto entran en las condiciones igual que las variables de la semana 3.

#### Escribe el programa · `s07-d01-n2` · concepto objetos

Con los datos del objeto exp, escribe «Clínica Arga: 12 días».

Datos (no se tocan):

```ts
const exp = {
  cliente: "Clínica Arga",
  dias: 12,
};
```

Empieza con:

```ts
// Lee los dos campos de exp
// y escribe la frase
```

Tiene que salir: `Clínica Arga: 12 días`

Variantes ocultas:

- `const exp = { cliente: "Bufete Sur", dias: 0, };` → `Bufete Sur: 0 días`

Solución:

```ts
const n = exp.cliente;
console.log(`${n}: ${exp.dias} días`);
```

Pistas: 1) Necesitas exp.cliente y exp.dias. 2) Con comillas invertidas puedes meter cada campo en un hueco ${…}. 3) Fíjate en los dos puntos y el espacio después del nombre.

Explicación: Dentro de ${…} cabe un campo de un objeto, como cualquier variable. Si la línea queda larga, guarda antes un campo en una variable corta.

---

## Día 2: Cambiar campos y leerlos con corchetes

**Objetivo:** Hoy aprendes a cambiar y añadir campos a un objeto, qué pasa si escribes mal una clave y cómo leer un campo cuya clave está en una variable.

### Microlección

**Pantalla 1 · pasoapaso**

```ts
const exp = {
  numero: 145,
  estado: "abierto",
};
exp.estado = "cerrado";
exp.dias = 12;
console.log(exp);
```

- Línea 1: {"exp":"{ numero: 145, estado: \"abierto\" }"} · Se crea el objeto con dos campos.
- Línea 5: {"exp":"{ numero: 145, estado: \"cerrado\" }"} · Un campo se cambia como una variable: con `=`. El estado pasa a cerrado.
- Línea 6: {"exp":"{ numero: 145, estado: \"cerrado\", dias: 12 }"} · Si el campo no existía, se **añade**. Ahora la ficha tiene tres. Esto se ejecuta, pero TypeScript lo subraya: espera que la ficha tenga desde el principio todos sus campos. Lo verás en la semana de tipos.
- Línea 7: {"exp":"{ numero: 145, estado: \"cerrado\", dias: 12 }"} · ¿Y el const? Protege la caja, no lo que hay dentro: no puedes guardar en exp **otro** objeto, pero sí cambiar sus campos.

**Pantalla 2 · codigo**

```ts
const exp = {
  estado: "abierto",
};
console.log(exp.estdo);
```

Salida: `undefined`

Una clave mal escrita **no da error**: da undefined, porque ese campo no existe. Es un fallo silencioso, de los peores. TypeScript, en cambio, lo subraya en rojo en el editor antes de ejecutar: una de sus grandes ventajas.

**Pantalla 3 · codigo**

```ts
const exp = {
  estado: "abierto",
};
const campo = "estado";
console.log(exp[campo]);
console.log(exp["estado"]);
```

Salida: `abierto` / `abierto`

Con **corchetes** la clave puede venir de una variable: `exp[campo]` busca la clave que guarda campo, o sea estado. `exp.campo`, en cambio, buscaría una clave llamada literalmente «campo».

**Pantalla 4 · deiure**

Es el objeto de prefijos de ayer. El rol del usuario llega en la variable role, así que DeIure lee con corchetes. Si el rol no está en el objeto, sale undefined, y `|| 'USR'` pone USR en su lugar.

```ts
const prefix = ROLE_PREFIX[role] || 'USR';
```

`DeIure/src/lib/pseudonymization.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s07-d02-r1` · concepto objetos

¿Qué escribe este programa?

```ts
const exp = { dias: 10 };
exp.dias = exp.dias + 5;
exp.urgente = true;
console.log(exp);
```

- ✅ `{ dias: 15, urgente: true }`: Eso es: dias pasa de 10 a 15 y se añade el campo urgente.
- ▫️ `{ dias: 10, urgente: true }`: La línea 2 cambia dias: 10 + 5.
- ▫️ `{ dias: 15 }`: La línea 3 añade un campo nuevo, urgente.
- ▫️ `❌ Error: exp es const`: const impide guardar otro objeto en exp, no cambiar sus campos.

Pistas: 1) Sigue el objeto línea a línea. 2) La línea 2 cambia un campo; la 3 añade uno. 3) const no impide cambiar los campos.

Explicación: Un objeto en un const se puede modificar por dentro. Lo que no se puede es cambiarlo por otro.

#### Reto 2 · Rellena el hueco · `s07-d02-r2` · concepto objetos

Completa para que escriba 15: el campo dias tiene que aumentar en 5.

```ts
const exp = { dias: 10 };
___ = exp.dias + 5;
console.log(exp.dias);
```

Objetivo: `15`

- ✅ `exp.dias`: Correcto: se guarda el resultado en el propio campo.
- ▫️ `const dias`: Eso crea otra variable, dias, con 15. El campo del objeto sigue en 10.
- ▫️ `dias`: No existe ninguna variable dias: da error.

Pistas: 1) ¿Dónde tiene que quedar guardado el 15? 2) En el campo dias del objeto exp. 3) Se escribe igual que al leerlo.

Explicación: Para cambiar un campo hay que nombrarlo entero, objeto y clave: exp.dias.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s07-rev-2` · concepto objetos

La IA ha escrito la clave con una errata. La IA y Marta discuten qué pasa. ¿Quién tiene razón?

```ts
const exp = {
  estado: "abierta",
};
console.log(exp.estdo);
```

- La IA: Da un error. (El objeto no tiene ninguna clave `estdo`.)
- Marta: Imprime `undefined`. (Pedir una clave que no existe no es un error: da `undefined`.)

Correcta: Marta

Pistas: 1) Compara `estdo` con la clave del objeto, letra a letra. 2) ¿Qué daba una posición de lista que no existe? 3) Con las claves que no existen pasa lo mismo.

Explicación: Imprime `undefined`. En la ejecución, una errata en una clave no da error: da un `undefined` que aparece más adelante. Aquí TypeScript ayuda: en el editor la subraya y pregunta «Did you mean 'estado'?». Por eso conviene escribir TypeScript y mirar los subrayados.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s07-d02-x1` · concepto objetos

¿Qué escribe este programa?

```ts
const exp = {
  estado: "abierto",
};
console.log(exp.Estado);
```

- ✅ `undefined`: Eso es: Estado con mayúscula es otra clave, y no existe.
- ▫️ `abierto`: Las claves distinguen mayúsculas: Estado no es estado.
- ▫️ `❌ Error`: Un campo que no existe no da error: da undefined.

Pistas: 1) Compara letra a letra la clave del objeto y la que se lee. 2) Una lleva mayúscula. 3) ¿Qué da un campo que no existe?

Explicación: Igual que con las variables, una mayúscula cambia el nombre. Pero aquí no hay error que te avise: sale undefined.

#### Repaso 2 · Caza el fallo (Revisión) · `s07-rev-x1` · concepto objetos

Le pediste a la IA: «Imprime el campo del expediente que diga la variable `campo`». Sale `undefined`. Toca la línea que está mal.

```ts
const exp = { estado: "abierta" };
const campo = "estado";
console.log(exp.campo);
```

- ✅ ``exp.campo` busca una clave llamada «campo». Con la clave en una variable se usan corchetes: `exp[campo]`.`: Exacto. El punto usa el nombre tal cual; los corchetes usan el valor de la variable.
- ▫️ `Tenía que ser `exp."estado"`.`: Eso da un error de sintaxis. Si la clave está en una variable, se usan corchetes.
- ▫️ ``campo` tenía que ser `let`.`: `campo` no cambia, así que `const` está bien. Mira cómo se usa en la línea 3.

Pistas: 1) ¿Tiene `exp` alguna clave que se llame `campo`? 2) El punto busca la clave con ese nombre exacto. 3) Para usar el valor de una variable como clave, corchetes.

Explicación: Imprime `undefined`, porque `exp.campo` busca la clave «campo», que no existe. `exp[campo]` usa lo que vale `campo`, es decir, `"estado"`, e imprime `abierta`.

### Para nota

#### Reto difícil · ¿Qué imprime? · `s07-d02-n1` · concepto objetos

¿Qué escribe este programa?

```ts
const ficha = {
  nombre: "Ana",
  pais: "ES",
};
const campos = ["pais", "nombre"];
for (const c of campos) {
  console.log(ficha[c]);
}
```

- ✅ `ES ⏎ Ana`: Eso es: en cada vuelta, c guarda una clave, y ficha[c] da su valor, en el orden de la lista.
- ▫️ `pais ⏎ nombre`: ficha[c] no escribe la clave: escribe el valor de esa clave.
- ▫️ `Ana ⏎ ES`: Manda el orden de la lista campos, no el del objeto.
- ▫️ `undefined ⏎ undefined`: Eso pasaría con ficha.c. Con corchetes se usa lo que guarda c.

Pistas: 1) ¿Qué vale c en la primera vuelta? 2) c vale "pais", así que ficha[c] es ficha["pais"]. 3) La segunda vuelta hace lo mismo con nombre.

Explicación: Recorrer una lista de claves y leer cada una con corchetes es cómo se rellena una tabla campo a campo.

#### Escribe el programa · `s07-d02-n2` · concepto objetos

Tu despacho se fija un plazo interno de 30 días para contestar. Añade a exp un campo urgente: true si quedan 5 días o menos, false si no. Después escribe exp entero.

Datos (no se tocan):

```ts
const exp = { plazo: 30, dias: 28 };
```

Empieza con:

```ts
// Calcula los días que quedan
// Añade el campo urgente
// Escribe el objeto
```

Tiene que salir: `{ plazo: 30, dias: 28, urgente: true }`

Variantes ocultas:

- `const exp = { plazo: 30, dias: 25 };` → `{ plazo: 30, dias: 25, urgente: true }`
- `const exp = { plazo: 30, dias: 10 };` → `{ plazo: 30, dias: 10, urgente: false }`

Solución:

```ts
const quedan = exp.plazo - exp.dias;
exp.urgente = quedan <= 5;
console.log(exp);
```

Pistas: 1) Quedan plazo menos días pasados. 2) Una comparación ya da true o false: puedes guardarla directamente. 3) exp.urgente = quedan <= 5; añade el campo.

Explicación: Con 25 días pasados quedan 5 justos, y tiene que salir true: por eso es <= y no <.

---

## Día 3: Listas de objetos: una tabla

**Objetivo:** Hoy aprendes a guardar muchas fichas en una lista y a recorrerlas con for...of para contar o sumar según uno de sus campos.

### Microlección

**Pantalla 1 · texto**

Una lista de objetos es una **tabla**: cada objeto es una fila y cada clave, una columna. El registro de actividades de tratamiento, las solicitudes de derechos, las brechas… casi todos los datos de verdad tienen esta forma. Se recorre con el for...of de la semana 5: en cada vuelta, la variable es **una fila entera**.

**Pantalla 2 · pasoapaso**

```ts
const sols = [
  { tipo: "acceso", dias: 12 },
  { tipo: "supresión", dias: 40 },
];
let fuera = 0;
for (const s of sols) {
  if (s.dias > 30) {
    fuera = fuera + 1;
  }
}
console.log(fuera);
```

- Línea 1: {"sols":"[{ tipo: \"acceso\", dias: 12 }, { tipo: \"supresión\", dias: 40 }]"} · Una lista con dos solicitudes. Tu despacho se fija un plazo interno de 30 días para contestarlas, y queremos contar cuántas lo han pasado.
- Línea 5: {"sols":"[{ tipo: \"acceso\", dias: 12 }, { tipo: \"supresión\", dias: 40 }]","fuera":"0"} · El contador empieza en 0, fuera del bucle.
- Línea 6: {"sols":"[{ tipo: \"acceso\", dias: 12 }, { tipo: \"supresión\", dias: 40 }]","fuera":"0","s":"{ tipo: \"acceso\", dias: 12 }"} · Primera vuelta: s es la **primera fila entera**, el objeto de acceso.
- Línea 7: {"sols":"[{ tipo: \"acceso\", dias: 12 }, { tipo: \"supresión\", dias: 40 }]","fuera":"0","s":"{ tipo: \"acceso\", dias: 12 }"} · s.dias es 12: no pasa de 30. No entra.
- Línea 6: {"sols":"[{ tipo: \"acceso\", dias: 12 }, { tipo: \"supresión\", dias: 40 }]","fuera":"0","s":"{ tipo: \"supresión\", dias: 40 }"} · Segunda vuelta: ahora s es la fila de supresión.
- Línea 7: {"sols":"[{ tipo: \"acceso\", dias: 12 }, { tipo: \"supresión\", dias: 40 }]","fuera":"0","s":"{ tipo: \"supresión\", dias: 40 }"} · s.dias es 40: sí pasa de 30.
- Línea 8: {"sols":"[{ tipo: \"acceso\", dias: 12 }, { tipo: \"supresión\", dias: 40 }]","fuera":"1","s":"{ tipo: \"supresión\", dias: 40 }"} · El contador sube a 1.
- Línea 11: {"sols":"[{ tipo: \"acceso\", dias: 12 }, { tipo: \"supresión\", dias: 40 }]","fuera":"1"} · Una solicitud fuera de plazo.

**Pantalla 3 · codigo**

```ts
const brechas = [
  { sitio: "Web", horas: 5 },
  { sitio: "App", horas: 3 },
];
let total = 0;
for (const b of brechas) {
  total = total + b.horas;
}
console.log(total);
```

Salida: `8`

Para sumar, el acumulador suma **un campo** de cada fila, b.horas. Sumar b, la fila entera, no tiene sentido: es un objeto, no un número.

**Pantalla 4 · deiure**

Cuando DeIure procesa en lote las supresiones pendientes, cuenta cómo ha ido cada una recorriendo la lista de resultados y mirando un campo de cada fila. (`continue` salta a la siguiente vuelta, y `succeeded++` suma 1 al contador.)

```ts
for (const o of outcomes) {
  if (o.status !== 'fulfilled') continue;
  if (o.value.kind === 'success') succeeded++;
  else if (o.value.wasLastAttempt) abandoned++;
  else retried++;
}
```

`DeIure/src/lib/gdpr-pending-cascades.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s07-d03-r1` · concepto objetos

¿Qué escribe este programa?

```ts
const ps = [
  { nombre: "Ana", consiente: true },
  { nombre: "Leo", consiente: false },
  { nombre: "Eva", consiente: false },
];
for (const p of ps) {
  if (!p.consiente) {
    console.log(p.nombre);
  }
}
```

- ✅ `Leo ⏎ Eva`: Eso es: escribe el nombre de quienes no han dado su consentimiento.
- ▫️ `Ana`: El ! le da la vuelta: entran los que tienen consiente en false.
- ▫️ `false ⏎ false`: Se escribe p.nombre, no p.consiente.
- ▫️ `Leo`: El bucle sigue hasta el final: Eva también cumple.

Pistas: 1) En cada vuelta, p es una persona entera. 2) Entra en el if quien tiene consiente en false. 3) Y de esas, se escribe el nombre.

Explicación: Se mira un campo (consiente) para decidir y se escribe otro (nombre). Es la forma típica de recorrer una tabla.

#### Reto 2 · Rellena el hueco · `s07-d03-r2` · concepto objetos

Completa para que escriba 2: las solicitudes de acceso.

```ts
const sols = [
  { tipo: "acceso" },
  { tipo: "oposición" },
  { tipo: "acceso" },
];
let n = 0;
for (const s of sols) {
  if (___ === "acceso") {
    n = n + 1;
  }
}
console.log(n);
```

Objetivo: `2`

- ✅ `s.tipo`: Correcto: el campo tipo de la fila de esta vuelta.
- ▫️ `sols.tipo`: La lista no tiene campo tipo: lo tiene cada fila. Da undefined y sale 0.
- ▫️ `tipo`: No hay ninguna variable tipo: da error.

Pistas: 1) ¿Qué variable cambia en cada vuelta? 2) s es la fila de esta vuelta. 3) El dato está en un campo de s.

Explicación: La lista es la tabla entera; la variable del bucle es una fila. Los campos son de la fila.

#### Reto 3 · Caza el fallo (Revisión) · `s07-rev-3` · concepto objetos

Le pediste a la IA: «Suma las personas afectadas de todas las brechas». Tenía que salir 195. Toca la línea que está mal.

```ts
const brechas = [
  { sitio: "Web", afectados: 150 },
  { sitio: "CRM", afectados: 45 },
];
let total = 0;
for (const b of brechas) {
  total = total + b;
}
console.log(total);
```

- ✅ ``b` es el objeto entero. Hay que sumar su campo: `total + b.afectados`.`: Exacto. En cada vuelta, `b` es una brecha completa; el número está en `b.afectados`.
- ▫️ ``total` tiene que empezar en `""`.`: Así empezaría como texto y sería peor. Para sumar se empieza en 0, como está.
- ▫️ `Hay que recorrer con un `for` clásico y `brechas[i]`.`: `brechas[i]` también sería el objeto entero. El problema es qué se suma de cada brecha.

Pistas: 1) ¿Qué es `b` en cada vuelta: un número o un objeto? 2) El número está dentro del objeto, en una de sus claves. 3) ¿Cómo se lee la clave `afectados` de `b`?

Explicación: Imprime `0[object Object][object Object]`. Al sumar un objeto, JavaScript lo convierte en el texto `[object Object]` y lo pega. Si ves `[object Object]` en una salida, alguien ha usado un objeto entero donde iba uno de sus campos.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s07-d03-x1` · concepto objetos

¿Qué escribe este programa?

```ts
const l = [{ id: 1 }, { id: 2 }];
for (const x of l) {
  console.log(x.id * 10);
}
```

- ✅ `10 ⏎ 20`: Eso es: una línea por fila, con su id por 10.
- ▫️ `30`: No se suma nada: se escribe una vez en cada vuelta.
- ▫️ `{ id: 10 } ⏎ { id: 20 }`: Se escribe un número, x.id * 10, no la fila.

Pistas: 1) ¿Cuántas filas tiene l? 2) En cada vuelta, x es una fila. 3) Se escribe x.id por 10.

Explicación: Una lista de objetos también se puede escribir en una sola línea, si cabe.

### Para nota

#### Reto difícil · ¿Qué imprime? · `s07-d03-n1` · concepto objetos

Este programa busca la brecha con más personas afectadas. ¿Qué escribe?

```ts
const bs = [
  { sitio: "Web", n: 150 },
  { sitio: "App", n: 900 },
  { sitio: "CRM", n: 45 },
];
let mayor = bs[0];
for (const b of bs) {
  if (b.n > mayor.n) {
    mayor = b;
  }
}
console.log(mayor.sitio);
```

- ✅ `App`: Eso es: mayor guarda la fila entera con más afectados, y al final se escribe su sitio.
- ▫️ `900`: Se escribe mayor.sitio, no mayor.n.
- ▫️ `CRM`: No se queda con la última fila: solo cambia cuando encuentra una con más afectados.
- ▫️ `Web`: Empieza siendo Web, pero App tiene más afectados.

Pistas: 1) mayor empieza siendo la primera fila. 2) Solo cambia si la fila de la vuelta tiene más afectados. 3) Al final, ¿qué fila guarda? Se escribe su sitio.

Explicación: El máximo de la semana 5, pero guardando la fila entera: así conservas todos sus datos, no solo el número.

#### Escribe el programa · `s07-d03-n2` · concepto objetos

Tu despacho se fija un plazo interno de 30 días. Escribe el tipo de cada solicitud que lleve más de 30 días y, al final, «Total: » y cuántas son.

Datos (no se tocan):

```ts
const sols = [
  { tipo: "acceso", dias: 12 },
  { tipo: "supresión", dias: 40 },
  { tipo: "rectificación", dias: 30 },
];
```

Empieza con:

```ts
// Un contador
// Recorre sols
// Escribe el total
```

Tiene que salir: `supresión` / `Total: 1`

Variantes ocultas:

- `const sols = [ { tipo: "acceso", dias: 31 }, { tipo: "oposición", dias: 45 }, ];` → `acceso` / `oposición` / `Total: 2`
- `const sols = [ { tipo: "acceso", dias: 30 }, ];` → `Total: 0`

Solución:

```ts
let total = 0;
for (const s of sols) {
  if (s.dias > 30) {
    console.log(s.tipo);
    total = total + 1;
  }
}
console.log("Total:", total);
```

Pistas: 1) Un contador fuera del bucle y un if dentro. 2) Dentro del if: escribe s.tipo y suma 1 al contador. 3) El total se escribe después de cerrar el bucle.

Explicación: Con 30 días justos todavía está dentro del plazo: por eso es > y no >=. Una variante lo comprueba.

---

## Día 4: find: buscar el primero

**Objetivo:** Hoy aprendes a buscar en una lista el primer elemento que cumple una condición con find, y qué hacer cuando no hay ninguno.

### Microlección

**Pantalla 1 · texto**

Buscar algo en una lista es tan habitual que las listas traen la búsqueda hecha: `find` («encontrar»). Le das una **función flecha** con la condición; find la prueba con cada elemento, en orden, y te devuelve **el primero que cumple**. Si ninguno cumple, devuelve `undefined`. Es el bucle con return de la semana pasada, en una línea.

**Pantalla 2 · codigo**

```ts
const exps = [
  { id: 1, estado: "abierto" },
  { id: 2, estado: "cerrado" },
];
const e = exps.find((x) =>
  x.id === 2
);
console.log(e);
console.log(e.estado);
```

Salida: `{ id: 2, estado: 'cerrado' }` / `cerrado`

Lee la flecha como «el x cuyo id es 2». find devuelve la **fila entera**, así que después puedes leer cualquiera de sus campos.

**Pantalla 3 · codigo**

```ts
const exps = [
  { id: 1, estado: "abierto" },
];
const e = exps.find((x) =>
  x.id === 3
);
if (e === undefined) {
  console.log("No existe");
} else {
  console.log(e.estado);
}
```

Salida: `No existe`

**Importante:** si find no encuentra nada, da undefined, y leer un campo de undefined (`e.estado`) **rompe el programa**. Antes de usar lo que devuelve find, comprueba que existe.

**Pantalla 4 · deiure**

Al guardar el análisis de amenazas de una EIPD, DeIure busca si la amenaza ya existía, por su id. Si no la encuentra, existing queda en undefined y se crea una nueva. (Aquí la flecha va sin paréntesis en el parámetro: `amenaza => …` es lo mismo que `(amenaza) => …`.)

```ts
current.amenazas.find(amenaza => amenaza.id === baseExistingId)
```

`DeIure/src/lib/server/apartado-10-persist.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s07-d04-r1` · concepto metodos-array

¿Qué escribe este programa?

```ts
const ps = [
  { nombre: "Ana", baja: false },
  { nombre: "Leo", baja: true },
  { nombre: "Eva", baja: true },
];
const p = ps.find((x) => x.baja);
console.log(p.nombre);
```

- ✅ `Leo`: Eso es: Leo es el primero con baja en true, y find se para ahí.
- ▫️ `Leo ⏎ Eva`: find devuelve solo el primero que cumple.
- ▫️ `Eva`: find va en orden y se queda con el primero, no con el último.
- ▫️ `true`: find devuelve la fila entera, y se escribe su nombre.

Pistas: 1) La condición es x.baja: entra quien tiene baja en true. 2) Prueba las filas en orden. 3) find se para en la primera que cumple.

Explicación: find devuelve un solo elemento, el primero. Mañana verás qué usar cuando los quieres todos.

#### Reto 2 · Rellena el hueco · `s07-d04-r2` · concepto metodos-array

Completa para que escriba Bufete Sur, el cliente con id 7.

```ts
const clientes = [
  { id: 3, nombre: "Clínica Arga" },
  { id: 7, nombre: "Bufete Sur" },
];
const c = clientes.find((x) =>
  ___
);
console.log(c.nombre);
```

Objetivo: `Bufete Sur`

- ✅ `x.id === 7`: Correcto: compara el id de cada cliente con 7.
- ▫️ `x.id = 7`: Un solo = no compara: guarda 7 en el id del primer cliente, y find se queda con él. Sale Clínica Arga.
- ▫️ `clientes.id === 7`: La lista no tiene id: lo tiene cada cliente, x. No encuentra nada y se rompe.

Pistas: 1) x es cada cliente, uno a uno. 2) Hay que comparar su id con 7. 3) Para comparar, ===.

Explicación: Dentro de la flecha, x es el elemento que se está probando. La condición se escribe siempre sobre x.

#### Reto 3 · Caza el fallo (Revisión) · `s07-rev-4` · concepto metodos-array

Le pediste a la IA: «Busca el expediente 3 e imprime su estado». El 3 no existe y el programa se rompe. Toca la línea que está mal.

```ts
const exps = [
  { id: 1, estado: "abierta" },
  { id: 2, estado: "cerrada" },
];
const e = exps.find((x) =>
  x.id === 3
);
console.log(e.estado);
```

- ✅ ``find` da `undefined` si no encuentra nada. Antes de leer `e.estado`, hay que comprobar que `e` no es `undefined`.`: Exacto. `find` puede no encontrar nada, y el código tiene que estar preparado para ese caso.
- ▫️ `Tenía que ser `filter` en vez de `find`.`: `filter` daría una lista vacía, y `e.estado` daría `undefined`. Se buscaba un solo expediente: `find` es el correcto.
- ▫️ `La comparación tenía que ser `x.id = 3`.`: Con un solo `=` no compara: guarda. `===` está bien. El problema es lo que pasa cuando no hay ningún 3.

Pistas: 1) ¿Hay algún expediente con `id` 3? 2) Si no encuentra ninguno, `find` devuelve `undefined`. 3) ¿Se puede leer `.estado` de `undefined`?

Explicación: Da `TypeError: Cannot read properties of undefined`. `find` devuelve el primero que cumple o, si no hay ninguno, `undefined`. La IA suele probar solo con datos que existen. TypeScript lo avisa en el editor («'e' is possibly 'undefined'»), y al revisar un `find` conviene preguntar siempre: «¿y si no lo encuentra?».

### Repaso (reserva)

#### Repaso 1 · ¿Quién tiene razón? (Revisión) · `s07-rev-x3` · concepto metodos-array

La IA y Marta discuten qué imprime este `find`. ¿Quién tiene razón?

```ts
const plazos = [10, 40, 50];
const r = plazos.find((p) => p > 30);
console.log(r);
```

- La IA: Imprime `[ 40, 50 ]`. (Son los dos que pasan de 30.)
- Marta: Imprime `50`. (`find` recorre la lista y se queda con el último que cumple.)

Correcta: ninguno

Pistas: 1) ¿`find` devuelve una lista o un solo dato? 2) `find` se para en cuanto encuentra uno que cumple. 3) ¿Cuál es el primero que pasa de 30?

Explicación: Imprime `40`. `find` da el primero que cumple, y `filter`, una lista con todos los que cumplen. La IA los confunde a menudo: al revisar, pregúntate si se quiere uno o todos.

### Para nota

#### Reto difícil · ¿Qué imprime? · `s07-d04-n1` · concepto metodos-array

¿Qué escribe este programa?

```ts
const exps = [
  { id: 1, estado: "abierto" },
  { id: 2, estado: "cerrado" },
];
function estado(id) {
  const e = exps.find((x) =>
    x.id === id
  );
  if (e === undefined) {
    return "No existe";
  }
  return e.estado;
}
console.log(estado(2));
console.log(estado(5));
```

- ✅ `cerrado ⏎ No existe`: Eso es: el 2 existe y devuelve su estado; el 5 no, y find da undefined.
- ▫️ `cerrado ⏎ undefined`: Cuando e es undefined, la función devuelve «No existe» antes de llegar al último return.
- ▫️ `abierto ⏎ No existe`: Busca el id 2, que está cerrado.
- ▫️ `cerrado ⏎ ❌ Error`: El if comprueba undefined antes de leer e.estado: no se rompe.

Pistas: 1) En la primera llamada, id vale 2. 2) En la segunda, id vale 5: ¿qué devuelve find? 3) Si e es undefined, el primer return termina la función.

Explicación: Una función que busca y que sabe qué hacer cuando no encuentra: así es como debería escribirlo una IA.

#### Escribe el programa · `s07-d04-n2` · concepto metodos-array

Busca con find el primer cliente de Francia (pais «FR») y escribe su nombre. Si no hay ninguno, escribe «Ninguno».

Datos (no se tocan):

```ts
const clientes = [
  { nombre: "Lex Sur", pais: "ES" },
  { nombre: "Roux SA", pais: "FR" },
  { nombre: "Petit SA", pais: "FR" },
];
```

Empieza con:

```ts
// Busca con find
// Comprueba si existe
```

Tiene que salir: `Roux SA`

Variantes ocultas:

- `const clientes = [ { nombre: "Petit SA", pais: "FR" }, ];` → `Petit SA`
- `const clientes = [ { nombre: "Lex Sur", pais: "ES" }, ];` → `Ninguno`

Solución:

```ts
const c = clientes.find((x) =>
  x.pais === "FR"
);
if (c === undefined) {
  console.log("Ninguno");
} else {
  console.log(c.nombre);
}
```

Pistas: 1) La condición de find compara x.pais con «FR». 2) Guarda lo que devuelve find y compruébalo con un if. 3) Si es undefined, «Ninguno»; si no, su nombre.

Explicación: Sin el if, la variante sin clientes franceses rompería el programa al leer el nombre de undefined.

---

## Día 5: filter: quedarse con todos los que cumplen

**Objetivo:** Hoy aprendes a sacar de una lista todos los elementos que cumplen una condición con filter, y en qué se diferencia de find.

### Microlección

**Pantalla 1 · texto**

`filter` («filtrar») se usa como find, con una flecha que dice la condición, pero devuelve **una lista nueva con todos** los que cumplen. Léelo como «quédate con los que…». La lista original **no cambia**. Y si ninguno cumple, devuelve una lista vacía, `[]`.

**Pantalla 2 · codigo**

```ts
const horas = [10, 80, 30, 96];
const tarde = horas.filter((h) =>
  h > 72
);
console.log(tarde);
console.log(horas.length);
```

Salida: `[ 80, 96 ]` / `4`

Las brechas notificadas pasadas 72 horas. tarde es una lista nueva con dos; horas sigue teniendo las cuatro.

**Pantalla 3 · esquema**

*¿find o filter?*

**find** → El **primero** que cumple. Da un elemento suelto, o undefined si no hay ninguno.

↓

**filter** → **Todos** los que cumplen. Da siempre una lista, aunque sea de uno o vacía.

↓

**Cómo elegir** → ¿Te basta con uno (buscar un expediente por su número)? find. ¿Los quieres todos (las solicitudes vencidas)? filter.

**Pantalla 4 · deiure**

Para el resumen del análisis de riesgos, DeIure cuenta cuántos factores hay de cada nivel: filtra los que tienen ese nivel y mira cuántos quedan con .length. (`f => …` es una flecha con el parámetro sin paréntesis.)

```ts
const riesgosMuyAltos = factores.filter(f => f.nivelRiesgo === 'muy_alto').length;
const riesgosAltos = factores.filter(f => f.nivelRiesgo === 'alto').length;
```

`DeIure/src/lib/apartado-09-compiler.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s07-d05-r1` · concepto metodos-array

¿Qué escribe este programa?

```ts
const dias = [12, 40, 31, 30];
const r = dias.filter((d) =>
  d > 30
);
console.log(r);
```

- ✅ `[ 40, 31 ]`: Eso es: los dos que pasan de 30, en su orden.
- ▫️ `[ 40, 31, 30 ]`: 30 no es mayor que 30: se queda fuera.
- ▫️ `40`: Eso daría find, el primero. filter los da todos, en una lista.
- ▫️ `2`: filter da la lista, no cuántos hay. Para eso, .length.

Pistas: 1) Pregunta a cada número: ¿pasas de 30? 2) El 30 justo, ¿pasa? 3) filter da una lista.

Explicación: filter conserva el orden de la lista original y siempre devuelve una lista.

#### Reto 2 · Rellena el hueco · `s07-d05-r2` · concepto metodos-array

Completa para que escriba cuántas personas han pedido la baja: 2.

```ts
const ps = [
  { nombre: "Ana", baja: false },
  { nombre: "Leo", baja: true },
  { nombre: "Eva", baja: true },
];
const r = ps.filter((p) => p.baja);
console.log(___);
```

Objetivo: `2`

- ✅ `r.length`: Correcto: r es una lista con dos personas, y .length las cuenta.
- ▫️ `r`: Así sale la lista entera, no cuántas son.
- ▫️ `ps.length`: Esa es la lista original: tiene 3.

Pistas: 1) ¿Qué guarda r? 2) Una lista con las personas que cumplen. 3) ¿Cómo se sabe cuántos elementos tiene una lista?

Explicación: filter + .length es la forma corta de contar: «¿cuántos cumplen?».

#### Reto 3 · Caza el fallo (Revisión) · `s07-rev-5` · concepto metodos-array

Le pediste a la IA: «Quédate con las brechas de más de 100 afectados e imprime dónde fueron». Tenían que salir Web y CRM. Toca la línea que está mal.

```ts
const brechas = [
  { sitio: "Web", afectados: 150 },
  { sitio: "Email", afectados: 12 },
  { sitio: "CRM", afectados: 300 },
];
const grandes = brechas.filter((b) =>
  b.afectados < 100
);
for (const g of grandes) {
  console.log(g.sitio);
}
```

- ✅ `La condición está al revés: se queda con las pequeñas. Tenía que ser `b.afectados > 100`.`: Exacto. `filter` se queda con los que cumplen la condición, así que la condición tiene que describir los que quieres.
- ▫️ `Tenía que ser `find` en vez de `filter`.`: `find` daría solo la primera. Aquí se quieren todas las que cumplen, así que `filter` está bien.
- ▫️ ``filter` no se puede usar con objetos.`: Funciona con listas de lo que sea, también de objetos. Mira qué condición tienen que cumplir.

Pistas: 1) ¿Qué brecha sale, y cuántos afectados tiene? 2) `filter` se queda con las que cumplen la condición. 3) Lee la condición en voz alta: ¿dice «más de 100»?

Explicación: Imprime `Email`, justo la que no se quería. Una condición al revés en `filter` no da error: da la lista contraria. Léela en voz alta como «quédate con las que…» y compárala con lo que pediste.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s07-d05-x1` · concepto metodos-array

¿Qué escribe este programa?

```ts
const ns = [1, 2, 3];
const r = ns.filter((n) => n > 5);
console.log(r);
```

- ✅ `[]`: Eso es: ninguno pasa de 5, y filter devuelve una lista vacía.
- ▫️ `undefined`: Eso daría find. filter siempre devuelve una lista, aunque esté vacía.
- ▫️ `[ 1, 2, 3 ]`: filter se queda solo con los que cumplen, y no cumple ninguno.

Pistas: 1) ¿Algún número pasa de 5? 2) Ninguno. 3) ¿Qué devuelve filter cuando no se queda con nada?

Explicación: Una lista vacía no es un error: es la respuesta «no hay ninguno». Pruébalo siempre al revisar.

### Para nota

#### Reto difícil · ¿Qué imprime? · `s07-d05-n1` · concepto metodos-array

¿Qué escribe este programa?

```ts
const bs = [
  { sitio: "Web", horas: 80 },
  { sitio: "App", horas: 10 },
  { sitio: "CRM", horas: 72 },
];
const tarde = bs.filter((b) =>
  b.horas > 72
);
console.log(tarde.length);
console.log(bs.length);
```

- ✅ `1 ⏎ 3`: Eso es: solo la de 80 horas pasa de 72, y la lista original sigue con sus tres.
- ▫️ `2 ⏎ 3`: 72 no es mayor que 72: la del CRM queda dentro del plazo.
- ▫️ `1 ⏎ 1`: filter no toca la lista original: bs sigue teniendo tres.
- ▫️ `Web ⏎ 3`: Se escribe tarde.length, cuántas son.

Pistas: 1) ¿Cuáles pasan de 72 horas? Ojo con la de 72 justas. 2) tarde es una lista nueva. 3) ¿Cambia bs?

Explicación: Con 72 horas justas todavía se está a tiempo («a más tardar 72 horas», art. 33 RGPD). Y filter nunca cambia la lista de la que parte.

#### Escribe el programa · `s07-d05-n2` · concepto metodos-array

Con filter, guarda en una lista nueva las horas que pasan de 72. Escribe «Fuera:» con esa lista y, después, «Total:» con cuántas son.

Datos (no se tocan):

```ts
const horas = [10, 80, 72, 96];
```

Empieza con:

```ts
// Filtra las que pasan de 72
// Escribe la lista y el total
```

Tiene que salir: `Fuera: [ 80, 96 ]` / `Total: 2`

Variantes ocultas:

- `const horas = [73];` → `Fuera: [ 73 ]` / `Total: 1`
- `const horas = [5, 72];` → `Fuera: []` / `Total: 0`

Solución:

```ts
const tarde = horas.filter((h) =>
  h > 72
);
console.log("Fuera:", tarde);
console.log("Total:", tarde.length);
```

Pistas: 1) La flecha de filter dice qué se queda: h > 72. 2) Guarda lo que devuelve filter en una variable. 3) console.log("Fuera:", tarde) escribe el texto y la lista en la misma línea.

Explicación: Si no hay ninguna, sale la lista vacía [] y el total 0: una de las variantes lo comprueba.

---

## Día 6: map: transformar cada elemento

**Objetivo:** Hoy aprendes a transformar cada elemento de una lista con map, y a encadenar filter y map para elegir y transformar en dos pasos.

### Microlección

**Pantalla 1 · texto**

`map` («transformar») aplica la misma flecha a **cada** elemento y devuelve una lista nueva **del mismo tamaño** con los resultados. No elige: transforma. Lo más habitual es sacar un solo campo de cada fila, como copiar una columna de una tabla.

**Pantalla 2 · codigo**

```ts
const exps = [
  { id: 7, estado: "abierto" },
  { id: 9, estado: "cerrado" },
];
const ids = exps.map((e) => e.id);
console.log(ids);
```

Salida: `[ 7, 9 ]`

Dos filas entran, dos números salen: el id de cada una.

**Pantalla 3 · codigo**

```ts
const ns = [1, 2];
const r = ns.map((n) => {
  return n * 10;
});
console.log(r);
```

Salida: `[ 10, 20 ]`

Con llaves, la flecha necesita return, como en la semana 6. Si lo olvidas, cada elemento se transforma en undefined y sale `[ undefined, undefined ]`.

**Pantalla 4 · codigo**

```ts
const ps = [
  { nombre: "Ana", baja: false },
  { nombre: "Leo", baja: true },
  { nombre: "Eva", baja: true },
];
const nombres = ps
  .filter((p) => p.baja)
  .map((p) => p.nombre);
console.log(nombres);
```

Salida: `[ 'Leo', 'Eva' ]`

Se pueden **encadenar**: filter elige las filas y map saca el nombre de cada una. Para revisarlo, anota qué lista sale de cada paso: filter da dos personas; map, sus dos nombres.

**Pantalla 5 · deiure**

En el dock del escritorio de DeIure, para saber qué iconos fijados están cerrados, se encadenan los dos: filter se queda con los que no están abiertos, y map saca la clave de cada uno.

```ts
const closedPinned = input.pinned.filter(piece => !piece.open).map(piece => piece.key);
```

`DeIure/src/lib/desktop/dock-strip-layout.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s07-d06-r1` · concepto metodos-array

¿Qué escribe este programa?

```ts
const precios = [100, 50];
const conIva = precios.map((p) =>
  p * 1.21
);
console.log(conIva);
```

- ✅ `[ 121, 60.5 ]`: Eso es: cada precio por 1,21, en una lista del mismo tamaño.
- ▫️ `[ 100, 50 ]`: map devuelve una lista nueva con los resultados de la flecha.
- ▫️ `181.5`: map no suma: transforma cada precio por separado.

Pistas: 1) ¿Cuántos elementos tendrá la lista nueva? 2) Los mismos: dos. 3) Cada uno, multiplicado por 1.21.

Explicación: Fíjate en que en el código el decimal va con punto (1.21), aunque en español escribamos 1,21.

#### Reto 2 · Rellena el hueco · `s07-d06-r2` · concepto metodos-array

Completa para que escriba [ 'Ana', 'Leo' ].

```ts
const ps = [
  { nombre: "Ana", edad: 34 },
  { nombre: "Leo", edad: 51 },
];
const r = ps.map((p) => ___);
console.log(r);
```

Objetivo: `[ 'Ana', 'Leo' ]`

- ✅ `p.nombre`: Correcto: de cada persona, su nombre.
- ▫️ `ps.nombre`: La lista no tiene nombre: sale [ undefined, undefined ].
- ▫️ `p`: Así sale cada persona entera, con nombre y edad.

Pistas: 1) p es cada persona, una a una. 2) De cada una quieres un solo campo. 3) El campo nombre de p.

Explicación: Como en find y filter, la flecha trabaja sobre cada elemento, p, nunca sobre la lista entera.

#### Reto 3 · Caza el fallo (Revisión) · `s07-rev-6` · concepto metodos-array

Le pediste a la IA: «Pasa a horas cada plazo en días». Tenía que salir `[ 24, 48, 72 ]`. Toca la línea que está mal.

```ts
const dias = [1, 2, 3];
const horas = dias.map((d) => {
  d * 24;
});
console.log(horas);
```

- ✅ `La flecha lleva llaves y le falta `return`: `return d * 24;`.`: Exacto. `map` guarda lo que devuelve la flecha para cada dato; sin `return`, guarda `undefined` tres veces.
- ▫️ `Tenía que ser `filter` en vez de `map`.`: `filter` se queda con algunos datos, pero no los cambia. Para transformar cada uno, `map` es el correcto.
- ▫️ ``map` cambia la lista `dias`, así que hay que imprimir `dias`.`: `map` no toca la lista original: devuelve una nueva. Mira qué devuelve la flecha.

Pistas: 1) ¿Cuántos datos salen? ¿Y cuántos entraban? 2) `map` guarda, para cada dato, lo que devuelve la flecha. 3) Si ves `=> {`, busca el `return`.

Explicación: Imprime `[ undefined, undefined, undefined ]`. El tamaño es el correcto (`map` siempre devuelve tantos como recibe), pero cada hueco está vacío. Es el `return` olvidado de la semana 6, dentro de un `map`.

### Repaso (reserva)

#### Repaso 1 · ¿Quién tiene razón? (Revisión) · `s07-rev-x4` · concepto metodos-array

Primero `filter` y luego `map`, encadenados. La IA y Marta discuten qué imprime. ¿Quién tiene razón?

```ts
const brechas = [
  { sitio: "Web", afectados: 150 },
  { sitio: "CRM", afectados: 12 },
];
const sitios = brechas
  .filter((b) => b.afectados > 100)
  .map((b) => b.sitio);
console.log(sitios);
```

- Marta: Imprime `[ 'Web', 'CRM' ]`. (`map` recibe la lista original y saca el sitio de todas.)
- La IA: Imprime `[ 'Web' ]`. (`map` recibe lo que deja `filter`, que es solo la brecha de la web.)

Correcta: La IA

Pistas: 1) ¿Qué deja `filter`? 2) `map` trabaja con lo que devuelve `filter`, no con `brechas`. 3) ¿Cuántas brechas pasan de 100 afectados?

Explicación: Imprime `[ 'Web' ]`. En una cadena, cada método recibe el resultado del anterior. Para revisarla, lee un paso cada vez y anota qué lista sale de cada uno.

### Para nota

#### Reto difícil · ¿Qué imprime? · `s07-d06-n1` · concepto metodos-array

¿Qué escribe este programa?

```ts
const dias = [10, 35, 31];
const fuera = dias.map((d) =>
  d > 30
);
console.log(fuera);
console.log(fuera.length);
```

- ✅ `[ false, true, true ] ⏎ 3`: Eso es: map no elige, transforma. Cada número se convierte en el resultado de la comparación.
- ▫️ `[ 35, 31 ] ⏎ 2`: Eso haría filter. map devuelve una lista del mismo tamaño.
- ▫️ `[ false, true, true ] ⏎ 2`: La lista tiene tres elementos, aunque uno sea false.

Pistas: 1) ¿Qué devuelve la flecha para cada número? 2) d > 30 da true o false. 3) map siempre devuelve tantos elementos como tenía la lista.

Explicación: Confundir map con filter es de los fallos más típicos: map con una condición da una lista de true y false.

#### Escribe el programa · `s07-d06-n2` · concepto metodos-array

Tu despacho se fija un plazo interno de 30 días. Con filter y map, escribe la lista de nombres de quienes llevan más de 30 días esperando respuesta.

Datos (no se tocan):

```ts
const sols = [
  { nombre: "Ana", dias: 12 },
  { nombre: "Leo", dias: 40 },
];
```

Empieza con:

```ts
// Primero filter, después map
```

Tiene que salir: `[ 'Leo' ]`

Variantes ocultas:

- `const sols = [ { nombre: "Eva", dias: 30 }, { nombre: "Ian", dias: 31 }, { nombre: "Sol", dias: 45 }, ];` → `[ 'Ian', 'Sol' ]`
- `const sols = [ { nombre: "Ana", dias: 5 }, ];` → `[]`

Solución:

```ts
const tarde = sols
  .filter((s) => s.dias > 30)
  .map((s) => s.nombre);
console.log(tarde);
```

Pistas: 1) filter elige las solicitudes de más de 30 días. 2) map saca el nombre de cada una. 3) Puedes encadenarlos: sols.filter(…).map(…).

Explicación: El orden importa: si haces map primero, ya solo tienes nombres y no puedes filtrar por los días.

---

## Día 7: Píldora: copias y referencias (píldora de informática)

**Objetivo:** Hoy aprendes qué pasa en memoria al asignar un objeto a otra variable, por qué eso no es una copia y cómo se hace una copia de verdad.

### Microlección

**Pantalla 1 · texto**

Con números y textos, `const b = a` copia el dato. Con objetos y listas, **no**. La variable no guarda la ficha: guarda **dónde está**, como la signatura de un expediente en el archivo. `const b = a` copia la signatura, no el expediente: a y b son dos etiquetas de **la misma carpeta**. Eso se llama una **referencia**.

**Pantalla 2 · pasoapaso**

```ts
const a = { dias: 10 };
const b = a;
b.dias = 99;
console.log(a.dias);
```

- Línea 1: {"a":"{ dias: 10 }"} · Se crea una ficha, y a apunta a ella.
- Línea 2: {"a":"{ dias: 10 }","b":"{ dias: 10 }"} · b no es otra ficha: apunta a **la misma** que a.
- Línea 3: {"a":"{ dias: 99 }","b":"{ dias: 99 }"} · Se cambia la ficha a través de b… y a cambia también, porque es la misma ficha.
- Línea 4: {"a":"{ dias: 99 }","b":"{ dias: 99 }"} · a.dias da 99, aunque nadie tocó a directamente.

**Pantalla 3 · codigo**

```ts
const a = { dias: 10 };
const b = { ...a };
b.dias = 99;
console.log(a.dias, b.dias);
```

Salida: `10 99`

Para una **copia de verdad**, los tres puntos: `{ ...a }` crea una ficha nueva con los mismos campos. Ahora cambiar b no toca a. Con listas, igual: `[...lista]`. (Detalle: es una copia de un nivel; si un campo es a su vez un objeto, ese se sigue compartiendo.)

**Pantalla 4 · deiure**

Al preparar los iconos del escritorio, DeIure crea objetos nuevos que copian los campos comunes con `...common` y añaden su tipo. Así cada icono es una ficha propia, y cambiar uno no estropea los demás.

```ts
if (resource.kind === 'directory') return { ...common, kind: 'folder' };
```

`DeIure/src/lib/desktop/desktop-resource-node.ts`

**Pantalla 5 · terminal**

```
$ echo $SHELL
/bin/zsh
```

**Comando de la semana: variables de entorno.** La terminal también tiene variables, en mayúsculas y con `$` delante. `echo` escribe lo que le pidas: `echo $SHELL` dice qué terminal usas. La más importante es `PATH`: la lista de carpetas, separadas por `:`, donde la terminal busca los programas. `which node` te dice en cuál está node. En DeIure, las contraseñas viven en variables de entorno, y por eso no aparecen en el código. **Minirreto en tu Mac:** escribe `echo $PATH` y después `which node`. Comprueba que la carpeta de node aparece en tu PATH.

### Retos

#### Reto 1 · ¿Qué imprime? · `s07-d07-r1` · concepto referencias

Con listas pasa lo mismo. ¿Qué escribe este programa?

```ts
const a = [1, 2];
const b = a;
b[0] = 9;
console.log(a);
```

- ✅ `[ 9, 2 ]`: Eso es: a y b son la misma lista. Cambiarla por b la cambia para a.
- ▫️ `[ 1, 2 ]`: const b = a no copia la lista: los dos nombres apuntan a la misma.
- ▫️ `[ 9, 2, 1, 2 ]`: No se juntan dos listas: hay una sola, con su primer elemento cambiado.

Pistas: 1) ¿Cuántas listas hay en memoria? 2) Solo una, con dos nombres. 3) b[0] = 9 cambia esa lista.

Explicación: Listas y objetos se comportan igual: asignarlos a otra variable no los copia.

#### Reto 2 · Rellena el hueco · `s07-d07-r2` · concepto referencias

Completa para que escriba 99.

```ts
const a = { dias: 10 };
const b = { ...a };
b.dias = 99;
console.log(___);
```

Objetivo: `99`

- ✅ `b.dias`: Correcto: b es una copia, y solo se cambió b.
- ▫️ `a.dias`: b es una copia de verdad: cambiar b no toca a, que sigue en 10.
- ▫️ `a`: Así sale el objeto a entero, y además sigue con 10.

Pistas: 1) ¿{ ...a } copia o comparte? 2) Copia: a y b son fichas distintas. 3) ¿Cuál de las dos se cambió?

Explicación: Con los tres puntos hay dos fichas: cada cambio afecta solo a la que nombras.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s07-rev-7` · concepto referencias

La IA quería guardar una copia del expediente antes de cerrarlo. La IA y Marta discuten qué imprime. ¿Quién tiene razón?

```ts
const a = { estado: "abierta" };
const b = a;
b.estado = "cerrada";
console.log(a.estado);
```

- Marta: Imprime `abierta`. (`b` es una copia de `a`, y solo se ha cambiado la copia.)
- La IA: Imprime `cerrada`. (`b = a` no copia el objeto: `a` y `b` son dos nombres para el mismo.)

Correcta: La IA

Pistas: 1) ¿Cuántos objetos `{ }` se crean en el código? 2) Solo hay uno, en la línea 1. `b = a` no crea otro. 3) Si los dos nombres apuntan al mismo objeto, ¿qué ve `a`?

Explicación: Imprime `cerrada`. `const b = a` no copia el objeto: hace que `b` apunte al mismo. La «copia de seguridad» de la IA no protege nada. Para copiarlo se escribe `const b = { ...a };`, y con una lista, `[...lista]`.

### Repaso (reserva)

#### Repaso 1 · ¿Quién tiene razón? (Revisión) · `s07-rev-x2` · concepto referencias

Esta vez la IA copia el expediente con `...` antes de cerrarlo. La IA y Marta discuten qué imprime. ¿Quién tiene razón?

```ts
const a = { estado: "abierta" };
const b = { ...a };
b.estado = "cerrada";
console.log(a.estado);
```

- La IA: Imprime `cerrada`. (`a` y `b` son el mismo objeto, como siempre que se usa `=`.)
- Marta: Imprime `abierta`. (`{ ...a }` crea un objeto nuevo con lo que tenía `a`.)

Correcta: Marta

Pistas: 1) ¿Cuántas llaves `{ }` crean un objeto en este código? 2) La línea 2 tiene sus propias llaves: crea un objeto nuevo. 3) ¿Qué ve `a` si solo cambia el objeto nuevo?

Explicación: Imprime `abierta`. `{ ...a }` crea un objeto nuevo y copia dentro las claves de `a`. Ahora sí son dos objetos, y cambiar uno no toca el otro.

### Para nota

#### Reto difícil · ¿Qué imprime? · `s07-d07-n1` · concepto referencias

¿Qué escribe este programa?

```ts
function cerrar(exp) {
  exp.estado = "cerrado";
}
const e = { estado: "abierto" };
cerrar(e);
console.log(e.estado);
```

- ✅ `cerrado`: Eso es: el parámetro exp es otra etiqueta de la misma ficha que e. La función la cambia de verdad.
- ▫️ `abierto`: Con un número, la variable de fuera no cambiaría. Pero un objeto se pasa como referencia: la ficha es la misma.
- ▫️ `undefined`: La función no devuelve nada, pero e sigue existiendo; solo ha cambiado su estado.

Pistas: 1) ¿Qué recibe la función: una copia o la misma ficha? 2) La misma ficha: exp y e apuntan a ella. 3) La función le cambia el estado.

Explicación: Una función que recibe un objeto puede cambiarlo sin devolver nada. Al revisar código de una IA, vigila las funciones que modifican lo que reciben: es un cambio que no se ve en la llamada.

#### Escribe el programa · `s07-d07-n2` · concepto referencias

Haz una copia de verdad de exp, guárdala en copia, ponle a la copia el estado «cerrado» y escribe el estado de las dos: el de exp y el de copia.

Datos (no se tocan):

```ts
const exp = { estado: "abierto" };
```

Empieza con:

```ts
// Copia con los tres puntos
// Cierra la copia
// Escribe los dos estados
```

Tiene que salir: `abierto cerrado`

Variantes ocultas:

- `const exp = { estado: "pendiente" };` → `pendiente cerrado`

Solución:

```ts
const copia = { ...exp };
copia.estado = "cerrado";
console.log(exp.estado, copia.estado);
```

Pistas: 1) const copia = exp no sirve: sería la misma ficha. 2) La copia de verdad se hace con { ...exp }. 3) console.log con dos datos separados por coma los escribe con un espacio.

Explicación: Con const copia = exp saldría «cerrado cerrado»: habrías cerrado también el original.

