# Semana 9: vista previa

Generado desde los JSON. Para revisar el contenido sin abrir el formato.

---

## Día 1: Tu calculadora de plazos: primero, el plan

**Objetivo:** Esta semana construyes tu primer programa propio, una calculadora de plazos del RGPD. Hoy aprendes a planificarlo antes de escribir código: qué entra, qué sale y qué pasos hay en medio.

### Microlección

**Pantalla 1 · texto**

Un programa propio no empieza en el teclado, sino en papel. Es como un dictamen: primero los **hechos** (los datos que entran), después la **norma** (las reglas) y al final la **conclusión** (lo que sale). Si no sabes decir en una frase qué debe hacer tu programa, todavía no es momento de escribirlo.

**Pantalla 2 · esquema**

*La calculadora de plazos*

**Entrada** → Qué plazo es (una brecha o una solicitud de acceso) y cuánto tiempo ha pasado.

↓

**Reglas** → Brecha: el plazo de 72 horas del art. 33. Acceso: el art. 12.3 da un mes; tu despacho se fija un plazo interno de 30 días.

↓

**Cálculo** → Cuánto queda: el límite menos lo que ha pasado.

↓

**Salida** → «en plazo», «urgente» o «vencido».

**Pantalla 3 · codigo**

```ts
// Entrada: horas desde la brecha
const horas = 50;
// Cálculo: cuántas quedan
const quedan = 72 - horas;
// Salida
console.log(`Quedan ${quedan} h`);
```

Salida: `Quedan 22 h`

Primero se escribe el plan como **comentarios** y después, debajo de cada uno, el código. Es la primera versión: solo sirve para brechas, pero funciona. Mañana la mejoras.

**Pantalla 4 · deiure**

Las reglas de DeIure piden lo mismo a los agentes de IA antes de escribir nada: decir en una frase qué problema real resuelve el cambio. Si la frase sale floja, no se escribe.

```ts
1. **Test de problema real.** Antes de proponer o aceptar un microcorte/feature, nombra en UNA frase qué problema real de un usuario resuelve.
```

`CLAUDE.md`

### Retos

#### Reto 1 · Ordena las líneas · `s09-d01-r1` · concepto programa-propio

Ordena el plan hecho código: entrada, cálculo, decisión y salida.

Líneas (orden correcto):

```ts
const horas = 80;
const quedan = 72 - horas;
const vencido = quedan < 0;
console.log(vencido);
```

Objetivo: `true`

Pistas: 1) Cada línea usa algo de la anterior. 2) Primero el dato; después lo que se calcula con él. 3) La salida va siempre al final.

Explicación: Cuando cada paso usa el resultado del anterior, solo hay un orden posible. Es el mismo orden del plan.

#### Reto 2 · ¿Qué imprime? · `s09-d01-r2` · concepto programa-propio

Han pasado 72 horas justas desde la brecha. ¿Qué escribe este programa?

```ts
const horas = 72;
const quedan = 72 - horas;
if (quedan < 0) {
  console.log("Vencido");
} else {
  console.log(`Quedan ${quedan} h`);
}
```

- ✅ `Quedan 0 h`: Eso es: 0 no es menor que 0. Con 72 horas justas todavía se está en el plazo de 72 horas del art. 33.
- ▫️ `Vencido`: quedan vale 0, y 0 < 0 es false: entra en el else.
- ▫️ `Quedan 72 h`: quedan es 72 menos las horas pasadas: 0.

Pistas: 1) Calcula quedan. 2) Vale 0. ¿Es 0 < 0? 3) No: entra en el else.

Explicación: El primer caso que hay que pensar en una calculadora de plazos es el propio límite.

#### Reto 3 · Caza el fallo (Revisión) · `s09-rev-1` · concepto programa-propio

La IA escribió primero el plan en comentarios y después el código. Han pasado 50 horas desde que conociste la brecha y tenían que quedar 22. Sale `-22`. Toca la línea que no sigue el plan.

```ts
// Entrada: horas pasadas
// Salida: horas que quedan
// Paso: 72 menos las pasadas
const pasadas = 50;
const quedan = pasadas - 72;
console.log(quedan);
```

- ✅ `El plan dice «72 menos las pasadas», y el código hace «pasadas menos 72». Tenía que ser `72 - pasadas`.`: Exacto. El plan estaba bien; el código no lo sigue. Por eso se escribe primero: para poder comparar.
- ▫️ `Los comentarios sobran: el programa no los usa.`: El programa no los ejecuta, pero a ti te dicen qué debería hacer. Gracias a ellos se ve el fallo.
- ▫️ ``quedan` tenía que ser `let`.`: `quedan` no cambia después, así que `const` está bien. Compara la línea 5 con el paso del plan.

Pistas: 1) Lee el paso del plan, en la línea 3. 2) Ahora lee la cuenta de la línea 5. ¿Dicen lo mismo? 3) En una resta, el orden importa.

Explicación: Imprime `-22`. El plan en comentarios (entradas, salida y pasos) sirve de vara de medir: cada línea de código tiene que hacer lo que dice su paso. Al revisar, pon el plan y el código uno al lado del otro.

### Repaso (reserva)



### Para nota

#### Reto difícil · Rellena el hueco · `s09-d01-n1` · concepto programa-propio

Han pasado 72 horas justas, que todavía están dentro del plazo. Completa la condición para que escriba «En plazo».

```ts
const horas = 72;
const quedan = 72 - horas;
if (quedan ___ 0) {
  console.log("Vencido");
} else {
  console.log("En plazo");
}
```

Objetivo: `En plazo`

- ✅ `<`: Correcto: vencido solo si queda menos de 0. Con 0 aún se está a tiempo.
- ▫️ `<=`: Con <=, 0 cuenta como vencido: las 72 horas justas se darían por perdidas.
- ▫️ `===`: Con ===, solo saldría «Vencido» con 0 justo, y no con 80 horas.

Pistas: 1) ¿Cuánto vale quedan con 72 horas? 2) 0. Y con 0 todavía se está a tiempo. 3) La condición de vencido tiene que dejar fuera el 0.

Explicación: < o <=: un solo carácter decide si el último momento del plazo cuenta. Es el fallo más típico de las calculadoras de plazos.

#### Escribe el programa · `s09-d01-n2` · concepto programa-propio

Primera versión de tu calculadora. Con las horas pasadas desde una brecha, muestra «Quedan 22 h» si queda tiempo, o «Vencido hace 8 h» si se ha pasado de 72.

Datos (no se tocan):

```ts
const horas = 50;
```

Empieza con:

```ts
// Cálculo: cuántas quedan
// Salida: quedan o vencido
```

Tiene que salir: `Quedan 22 h`

Variantes ocultas:

- `const horas = 80;` → `Vencido hace 8 h`
- `const horas = 72;` → `Quedan 0 h`

Solución:

```ts
const quedan = 72 - horas;
if (quedan < 0) {
  const n = horas - 72;
  console.log("Vencido hace", n, "h");
} else {
  console.log("Quedan", quedan, "h");
}
```

Pistas: 1) Empieza por el cálculo: 72 menos las horas. 2) Un if con dos salidas. Vencido solo si queda menos de 0. 3) Si está vencido, las horas de retraso son horas - 72.

Explicación: Con 72 horas justas tiene que salir «Quedan 0 h»: una de las variantes lo comprueba.

---

## Día 2: Las reglas, en un objeto

**Objetivo:** Hoy aprendes a sacar los números de las reglas a un objeto, para que la calculadora sirva para varios plazos y que cambiar una regla sea cambiarla en un solo sitio.

### Microlección

**Pantalla 1 · texto**

Ayer el 72 iba escrito dentro del cálculo. Un número suelto así se llama **número mágico**: nadie sabe de dónde sale y, si cambia la norma, hay que buscarlo por todo el código. Mejor guardar las reglas en un **objeto**: la clave es el tipo de plazo y el valor, su límite. Es tu tabla de normas.

**Pantalla 2 · codigo**

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
const tipo = "brecha";
console.log(limites[tipo]);
console.log(limites.acceso);
```

Salida: `72` / `30`

Con corchetes, la clave sale de una variable: así el mismo código sirve para cualquier tipo. brecha va en horas y acceso en días (el plazo interno de tu despacho; el art. 12.3 da un mes).

**Pantalla 3 · codigo**

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
const tipo = "queja";
const lim = limites[tipo];
if (lim === undefined) {
  console.log(`No conozco «${tipo}»`);
}
```

Salida: `No conozco «queja»`

Un tipo que no está en la tabla da undefined. Tu programa tiene que decidir qué hacer entonces; si no, seguirá calculando con undefined y saldrá NaN.

**Pantalla 4 · deiure**

DeIure guarda así cuánto tiempo conserva la clave que permite saber quién era un usuario dado de baja: tres años, con la norma en la que se apoya al lado (el art. 78 de la LOPDGDD, la prescripción de las sanciones). Después la clave se destruye y los datos quedan anonimizados. Es una constante con nombre, no un 3 suelto en mitad del cálculo.

```ts
/** LOPDGDD Art.78 — statute of limitations for sanctions */
const RETENTION_YEARS = 3;
```

`DeIure/src/lib/pseudonymization.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s09-d02-r1` · concepto programa-propio

¿Qué escribe este programa?

```ts
const unidades = {
  brecha: "horas",
  acceso: "días",
};
const t = "acceso";
console.log(`En ${unidades[t]}`);
```

- ✅ `En días`: Eso es: t vale «acceso», y unidades[t] da su valor.
- ▫️ `En horas`: t vale «acceso», no «brecha».
- ▫️ `En undefined`: Eso pasaría con unidades.t. Con corchetes se usa lo que guarda t.

Pistas: 1) ¿Qué vale t? 2) «acceso». 3) unidades[t] es lo mismo que unidades["acceso"].

Explicación: Una tabla por cada dato de las reglas: límites, unidades… Mañana las usará una función.

#### Reto 2 · Rellena el hueco · `s09-d02-r2` · concepto programa-propio

Completa para que avise de que «queja» no está en la tabla.

```ts
const limites = { brecha: 72 };
const tipo = "queja";
if (limites[tipo] === ___) {
  console.log("Tipo desconocido");
}
```

Objetivo: `Tipo desconocido`

- ✅ `undefined`: Correcto: una clave que no existe da undefined.
- ▫️ `null`: Una clave que no existe da undefined, no null. Son distintos y === lo nota.
- ▫️ `0`: No da 0: da undefined. Y el 0 podría ser un límite de verdad.

Pistas: 1) ¿Qué da leer una clave que no existe? 2) Lo viste en la semana 7, con la errata en la clave. 3) undefined.

Explicación: Comprobar undefined antes de usar un dato de una tabla evita los NaN silenciosos.

#### Reto 3 · Caza el fallo (Revisión) · `s09-rev-2` · concepto programa-propio

Las reglas de la calculadora: 72 horas para la brecha (el plazo del art. 33) y 30 días para una solicitud (el plazo interno que se fija tu despacho). Al pedir el límite, el programa se rompe. Toca la línea que está mal.

```ts
const reglas = {
  brecha: { limite: 72 },
  solicitud: { limite: 30 },
};
const tipo = "Brecha";
console.log(reglas[tipo].limite);
```

- ✅ `La clave es `brecha`, en minúscula. `reglas["Brecha"]` no existe, da `undefined`, y de `undefined` no se puede leer `.limite`.`: Exacto. Una mayúscula cambia la clave. Es un «dato raro» de los que hay que probar.
- ▫️ `Con la clave en una variable hay que usar el punto: `reglas.tipo`.`: Al revés: `reglas.tipo` buscaría una clave llamada «tipo». Con una variable, corchetes, como está.
- ▫️ `Un objeto no puede tener otros objetos dentro.`: Puede: `brecha` guarda el objeto `{ limite: 72 }`. Mira el valor de `tipo`.

Pistas: 1) ¿Qué devuelve `reglas[tipo]`? 2) Compara `tipo` con las claves del objeto, letra a letra. 3) ¿Se puede leer `.limite` de `undefined`?

Explicación: Da `TypeError: Cannot read properties of undefined`. `"Brecha"` no es `"brecha"`, así que `reglas[tipo]` da `undefined`. En tu programa, el tipo lo escribe una persona: piensa qué debe pasar si llega mal escrito.

### Repaso (reserva)



### Para nota

#### Reto difícil · ¿Qué imprime? · `s09-d02-n1` · concepto programa-propio

¿Qué escribe este programa?

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
const tipos = ["acceso", "queja"];
for (const t of tipos) {
  console.log(t, limites[t]);
}
```

- ✅ `acceso 30 ⏎ queja undefined`: Eso es: queja no está en la tabla, y sale undefined sin ningún error.
- ▫️ `acceso 30 ⏎ queja 0`: Una clave que no existe da undefined, no 0.
- ▫️ `acceso 30`: El bucle da dos vueltas: también escribe la de queja.
- ▫️ `acceso 30 ⏎ ❌ Error`: Leer una clave que no existe no da error: da undefined.

Pistas: 1) El bucle da una vuelta por tipo. 2) En cada vuelta lee limites[t]. 3) ¿Qué da una clave que no existe?

Explicación: Ni un error ni un aviso: por eso tu programa tiene que comprobar el undefined él solo.

#### Escribe el programa · `s09-d02-n2` · concepto programa-propio

Con la tabla limites, muestra «brecha: quedan 22»: el tipo y lo que queda. Si el tipo no está en la tabla, muestra «Desconocido: queja» con el tipo que sea.

Datos (no se tocan):

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
const tipo = "brecha";
const pasado = 50;
```

Empieza con:

```ts
// Busca el límite en la tabla
// ¿Existe? Si no, avisa
```

Tiene que salir: `brecha: quedan 22`

Variantes ocultas:

- `const limites = { brecha: 72, acceso: 30, }; const tipo = "acceso"; const pasado = 12;` → `acceso: quedan 18`
- `const limites = { brecha: 72, acceso: 30, }; const tipo = "queja"; const pasado = 5;` → `Desconocido: queja`

Solución:

```ts
const lim = limites[tipo];
if (lim === undefined) {
  console.log("Desconocido:", tipo);
} else {
  const q = lim - pasado;
  console.log(`${tipo}: quedan ${q}`);
}
```

Pistas: 1) Guarda limites[tipo] en una variable. 2) Si es undefined, avisa; si no, calcula. 3) Lo que queda es el límite menos lo pasado.

Explicación: El mismo código sirve para los dos plazos y para el que no existe. Si mañana cambia una regla, solo se toca la tabla.

---

## Día 3: El cálculo, en funciones

**Objetivo:** Hoy conviertes el cálculo en dos funciones pequeñas, quedan y estado, que se pueden usar con cualquier plazo y encadenar.

### Microlección

**Pantalla 1 · codigo**

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
function quedan(tipo, pasado) {
  return limites[tipo] - pasado;
}
console.log(quedan("brecha", 50));
console.log(quedan("acceso", 31));
```

Salida: `22` / `-1`

quedan busca el límite en la tabla y le resta lo pasado. Un resultado negativo quiere decir que el plazo se ha pasado.

**Pantalla 2 · codigo**

```ts
function estado(resto) {
  if (resto < 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
console.log(estado(-1));
console.log(estado(0));
console.log(estado(20));
```

Salida: `vencido` / `urgente` / `en plazo`

estado traduce un número a una palabra. Con 0 todavía no está vencido, pero es urgente. Y **el orden de los if importa**: primero se descarta lo vencido y después lo urgente.

**Pantalla 3 · texto**

Cada función hace una sola cosa y tiene un nombre que lo dice: es la descomposición de la semana 6. Se encadenan como `estado(quedan("brecha", 70))`: primero se calcula lo de dentro (2) y luego lo de fuera («urgente»). Si algo sale mal, puedes probar cada pieza por separado.

**Pantalla 4 · deiure**

Al compartir una carpeta, DeIure traduce un estado interno a un texto con una función pequeña de varios return, igual que tu estado. El primer if que se cumple decide.

```ts
if (state === 'review_pending') return 'Pendiente de aprobación';
if (state === 'compensating') return 'Recuperando la carpeta…';
return 'Compartiendo…';
```

`DeIure/src/lib/desktop/sharing-progress.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s09-d03-r1` · concepto programa-propio

¿Qué escribe este programa?

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
function quedan(tipo, pasado) {
  return limites[tipo] - pasado;
}
function estado(resto) {
  if (resto < 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
const r = quedan("brecha", 70);
console.log(r, estado(r));
```

- ✅ `2 urgente`: Eso es: quedan 2 horas, y 2 <= 5.
- ▫️ `2 en plazo`: 2 es menor o igual que 5: es urgente.
- ▫️ `70 urgente`: r es lo que queda (72 - 70), no lo pasado.

Pistas: 1) Calcula primero r. 2) r vale 2. 3) ¿Qué devuelve estado(2)?

Explicación: Guardar el resultado intermedio en r deja ver los dos datos: el número y la palabra.

#### Reto 2 · Rellena el hueco · `s09-d03-r2` · concepto programa-propio

Completa para que escriba «vencido»: una brecha de hace 80 horas.

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
function quedan(tipo, pasado) {
  return limites[tipo] - pasado;
}
function estado(resto) {
  if (resto < 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
const r = quedan(___);
console.log(estado(r));
```

Objetivo: `vencido`

- ✅ `"brecha", 80`: Correcto: quedan -8 horas, y estado(-8) es «vencido».
- ▫️ `80, "brecha"`: Los argumentos van al revés: limites[80] no existe y la resta da NaN. Ningún if se cumple y sale «en plazo». Sin error.
- ▫️ `"brecha", 70`: Con 70 horas aún quedan 2: es urgente, no vencido.

Pistas: 1) estado necesita lo que queda. 2) Lo calcula quedan, con el tipo primero y lo pasado después. 3) Comprueba el orden de los argumentos.

Explicación: Con los argumentos al revés no salta ningún error: sale una respuesta tranquilizadora y falsa. Por eso se prueba.

#### Reto 3 · Caza el fallo (Revisión) · `s09-rev-3` · concepto programa-propio

Le pediste a la IA: «Si quedan menos de 0 horas, vencido; si quedan menos de 24, urgente; si no, en plazo». Con -5 horas sale `urgente`. Toca la línea que está mal.

```ts
function estado(quedan) {
  if (quedan < 24) {
    return "urgente";
  } else if (quedan < 0) {
    return "vencido";
  }
  return "en plazo";
}
console.log(estado(-5));
```

- ✅ `El orden está mal: -5 también es menor que 24, así que entra en «urgente» y nunca llega a «vencido». Hay que preguntar primero por `quedan < 0`.`: Exacto. En una cadena de `if`, gana la primera condición que se cumple. «vencido» no se alcanzaba nunca.
- ▫️ `Tenía que ser `quedan <= 24`.`: Eso cambia qué pasa con 24 justas, pero -5 seguiría saliendo «urgente». El problema es el orden.
- ▫️ `Falta un `else` antes de `return "en plazo"`.`: Ese `return` ya solo se alcanza si no se cumple ninguna condición. Mira qué condición atrapa al -5.

Pistas: 1) ¿Es -5 menor que 24? 2) En una cadena de `if`, ¿cuál se ejecuta si se cumplen dos? 3) ¿Hay algún valor que pueda llegar a «vencido»?

Explicación: Imprime `urgente`. Cualquier número menor que 0 también es menor que 24, así que la rama «vencido» no se alcanza nunca. Con tramos, se pregunta del más estrecho al más amplio. Al revisar, busca una rama a la que no se pueda llegar.

### Repaso (reserva)



### Para nota

#### Reto difícil · ¿Qué imprime? · `s09-d03-n1` · concepto programa-propio

Aquí los if de estado están en otro orden. ¿Qué escribe?

```ts
function estado(resto) {
  if (resto <= 5) {
    return "urgente";
  }
  if (resto < 0) {
    return "vencido";
  }
  return "en plazo";
}
console.log(estado(-3));
```

- ✅ `urgente`: Eso es: -3 <= 5 es true, y el primer return termina la función. El «vencido» no llega nunca.
- ▫️ `vencido`: El primer if ya se cumple con -3: devuelve «urgente» y no sigue.
- ▫️ `en plazo`: -3 <= 5 es true: entra en el primer if.

Pistas: 1) ¿Qué if se comprueba primero? 2) ¿-3 es menor o igual que 5? 3) return termina la función.

Explicación: Con este orden, ningún plazo sale nunca «vencido». Un fallo así solo se ve probando un número negativo.

#### Escribe el programa · `s09-d03-n2` · concepto programa-propio

Escribe tu función estado(resto): «vencido» si es menor que 0, «urgente» si es 5 o menos y «en plazo» si no. Después muestra cada caso de la lista con su estado: «20: en plazo».

Datos (no se tocan):

```ts
const casos = [20, 3, -1];
```

Empieza con:

```ts
// function estado(resto) { … }
// Recorre casos
```

Tiene que salir: `20: en plazo` / `3: urgente` / `-1: vencido`

Variantes ocultas:

- `const casos = [0, 5, 6];` → `0: urgente` / `5: urgente` / `6: en plazo`
- `const casos = [-10];` → `-10: vencido`

Solución:

```ts
function estado(resto) {
  if (resto < 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
for (const r of casos) {
  console.log(`${r}: ${estado(r)}`);
}
```

Pistas: 1) Tres posibles resultados: tres return. 2) Primero descarta lo vencido (menor que 0) y después lo urgente. 3) Dentro del for, llama a estado con cada caso.

Explicación: Las variantes prueban los límites: 0 y 5 son urgentes y 6 ya está en plazo.

---

## Día 4: Probar tu calculadora

**Objetivo:** Hoy pruebas tu calculadora con tres clases de casos: el normal, el límite y el raro. Así descubres los fallos que con un solo ejemplo no se ven.

### Microlección

**Pantalla 1 · texto**

Tu calculadora ya funciona con 50 horas. ¿Y con 72 justas? ¿Y si alguien escribe «queja»? Probar un programa es como revisar un contrato: no basta con leer la cláusula que todo el mundo cumple, hay que mirar **los extremos y los casos raros**. Es ahí donde se esconden los fallos.

**Pantalla 2 · esquema**

*Tres clases de casos*

**Normal** → El caso de todos los días: quedan 20 → «en plazo».

↓

**Límite** → Justo en la frontera: 0, 5 y 6. Con 0 aún no está vencido; con 5 es urgente y con 6 ya no.

↓

**Raro** → Lo que no debería pasar, pero pasa: un tipo que no existe, un número negativo.

**Pantalla 3 · codigo**

```ts
function estado(resto) {
  if (resto < 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
test("normal", () => {
  expect(estado(20)).toBe("en plazo");
});
test("límite", () => {
  expect(estado(0)).toBe("urgente");
});
test("vencido", () => {
  expect(estado(-1)).toBe("vencido");
});
```

Salida: `✓ normal` / `✓ límite` / `✓ vencido`

Un test por clase de caso. Lo que va en toBe sale de **la norma**, no de ejecutar el programa: el plazo de 72 horas del art. 33 incluye las 72 justas, así que con 0 todavía no está vencido.

**Pantalla 4 · codigo**

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
function quedan(tipo, pasado) {
  return limites[tipo] - pasado;
}
function estado(resto) {
  if (resto < 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
test("tipo raro", () => {
  const r = quedan("queja", 5);
  const e = estado(r);
  expect(e).toBe("desconocido");
});
```

Salida: `× tipo raro` / `  Expected: 'desconocido'` / `  Received: 'en plazo'`

Este test **falla, y está bien que falle**: descubre un agujero. Con un tipo que no existe, la resta da NaN, ningún if se cumple y sale «en plazo». Un test escrito antes del arreglo te dice qué tienes que arreglar. Lo arreglas el día 6.

**Pantalla 5 · deiure**

DeIure prueba sus tipos de evento igual: los válidos y también los raros, como un texto vacío, null o un número. test.each repite el mismo test con cada valor de la lista.

```ts
test.each(['shared', '', null, 1])('rechaza un tipo inválido: %s', type => {
  expect(calendarEventInputSchema.safeParse({ ...event, type }).success).toBe(false);
```

`DeIure/src/lib/__tests__/calendar-event-types.test.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s09-d04-r1` · concepto programa-propio

Este estado tiene un fallo. ¿Qué escriben sus tests?

```ts
function estado(resto) {
  if (resto <= 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
test("normal", () => {
  expect(estado(20)).toBe("en plazo");
});
test("límite", () => {
  expect(estado(0)).toBe("urgente");
});
```

- ✅ `✓ normal ⏎ × límite ⏎   Expected: 'urgente' ⏎   Received: 'vencido'`: Eso es: con <= 0, el 0 cuenta como vencido. El caso normal no lo nota; el límite sí.
- ▫️ `✓ normal ⏎ ✓ límite`: Mira el primer if: resto <= 0. Con 0 se cumple y devuelve «vencido».
- ▫️ `× normal ⏎   Expected: 'en plazo' ⏎   Received: 'urgente' ⏎ ✓ límite`: 20 no cumple ninguno de los dos if: devuelve «en plazo», y el test normal pasa.

Pistas: 1) Compara el primer if con el de la lección. 2) Aquí es <= 0, no < 0. 3) ¿Qué devuelve estado(0)?

Explicación: Si solo hubieras probado el caso normal, el fallo habría pasado. Los fallos de plazos viven en los límites.

#### Reto 2 · Rellena el hueco · `s09-d04-r2` · concepto programa-propio

Completa el test con lo que dice la norma: 72 horas justas desde la brecha.

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
function quedan(tipo, pasado) {
  return limites[tipo] - pasado;
}
function estado(resto) {
  if (resto < 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
test("72 justas", () => {
  const r = quedan("brecha", 72);
  expect(estado(r)).toBe(___);
});
```

Objetivo: `✓ 72 justas`

- ✅ `"urgente"`: Correcto: quedan 0 horas. Aún no está vencido, pero es urgente.
- ▫️ `"vencido"`: El plazo de 72 horas del art. 33 incluye las 72 justas: con 0 todavía se está a tiempo.
- ▫️ `"en plazo"`: Quedan 0 horas, y 0 <= 5: es urgente.

Pistas: 1) ¿Cuánto vale r? 2) 0. ¿Es menor que 0? 3) No. ¿Es 5 o menos?

Explicación: Lo que espera un test se decide con la norma en la mano. Si lo copias de lo que sale al ejecutar, el test dará por bueno cualquier fallo.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s09-rev-4` · concepto programa-propio

La IA escribió la función y también su test, y sale en verde. La IA y Marta discuten. ¿Quién tiene razón?

```ts
function enPlazo(pasadas) {
  return pasadas < 72;
}
test("72 h justas: fuera", () => {
  expect(enPlazo(72)).toBe(false);
});
```

- La IA: Pasa, así que `enPlazo` está bien. (El test comprueba justo el límite, que es donde están los fallos.)
- Marta: Pasa, pero la función y el test están mal. (El plazo de 72 horas del art. 33 incluye las 72 horas justas. El test espera lo mismo que hace el código, y los dos se equivocan igual.)

Correcta: Marta

Pistas: 1) ¿El test pasa o falla? 2) Con 72 horas justas, ¿se está en plazo? 3) ¿Qué pasa si el código y el test cometen el mismo error?

Explicación: Sale `✓`, y aun así los dos están mal: el plazo de 72 horas del art. 33 incluye las 72 horas justas. Cuando la misma IA escribe el código y los tests, puede equivocarse igual en ambos. Lo que espera cada test (el `toBe(...)`) lo decides tú, porque eres quien conoce la regla.

### Repaso (reserva)



### Para nota

#### Reto difícil · ¿Qué imprime? · `s09-d04-n1` · concepto programa-propio

Este estado tiene el fallo del 0. ¿Qué escriben estos tests?

```ts
function estado(resto) {
  if (resto <= 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
test("normal", () => {
  expect(estado(20)).toBe("en plazo");
});
test("vencido", () => {
  expect(estado(-3)).toBe("vencido");
});
```

- ✅ `✓ normal ⏎ ✓ vencido`: Eso es: los dos pasan. Ninguno prueba el 0, así que el fallo sigue ahí, escondido.
- ▫️ `✓ normal ⏎ × vencido ⏎   Expected: 'vencido' ⏎   Received: 'urgente'`: -3 <= 0 se cumple: devuelve «vencido» y el test pasa.
- ▫️ `× normal ⏎   Expected: 'en plazo' ⏎   Received: 'vencido' ⏎ ✓ vencido`: 20 no cumple ningún if: devuelve «en plazo».

Pistas: 1) Calcula estado(20) con este código. 2) Ahora estado(-3). 3) ¿Algún test usa el 0?

Explicación: Todo verde no quiere decir que esté bien: quiere decir que lo que has probado está bien. Si falta el caso límite, el fallo pasa.

#### Escribe el programa · `s09-d04-n2` · concepto programa-propio

Escribe tres tests para estado: «en plazo» comprueba estado(20), «límite» comprueba estado(0) y «vencido» comprueba estado(-1). Lo que esperas sale de la norma.

Datos (no se tocan):

```ts
function estado(resto) {
  if (resto < 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
```

Empieza con:

```ts
// test(nombre, () => {
//   expect(…).toBe(…);
// });
```

Tiene que salir: `✓ en plazo` / `✓ límite` / `✓ vencido`

Variantes ocultas:

- `function estado(resto) { if (resto <= 0) { return "vencido"; } if (resto <= 5) { return "urgente"; } return "en plazo"; }` → `✓ en plazo` / `× límite` / `  Expected: 'urgente'` / `  Received: 'vencido'` / `✓ vencido`
- `function estado(resto) { if (resto <= 5) { return "urgente"; } if (resto < 0) { return "vencido"; } return "en plazo"; }` → `✓ en plazo` / `✓ límite` / `× vencido` / `  Expected: 'vencido'` / `  Received: 'urgente'`

Solución:

```ts
test("en plazo", () => {
  expect(estado(20)).toBe("en plazo");
});
test("límite", () => {
  expect(estado(0)).toBe("urgente");
});
test("vencido", () => {
  expect(estado(-1)).toBe("vencido");
});
```

Pistas: 1) Un test por caso, con el nombre que pide el enunciado. 2) Con 0 todavía no está vencido: es urgente. 3) Con -1 sí está vencido.

Explicación: Las variantes ocultas usan dos estado rotos: el del 0 y el de los if en otro orden. Tus tests tienen que cazar los dos.

---

## Día 5: Muchos plazos a la vez

**Objetivo:** Hoy aplicas tu calculadora a una lista entera de expedientes: los recorres, te quedas con los que corren prisa y sacas un pequeño informe.

### Microlección

**Pantalla 1 · texto**

Un despacho no lleva un plazo: lleva muchos. Cada expediente es un **objeto** con su número, su tipo y el tiempo que ha pasado (`t`), y todos juntos van en una **lista**. Tus funciones no cambian: solo hay que llamarlas una vez por expediente.

**Pantalla 2 · codigo**

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
function quedan(tipo, pasado) {
  return limites[tipo] - pasado;
}
function estado(resto) {
  if (resto < 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
const exps = [
  { id: 7, tipo: "brecha", t: 80 },
  { id: 8, tipo: "acceso", t: 12 },
  { id: 9, tipo: "brecha", t: 70 },
];
for (const e of exps) {
  const r = quedan(e.tipo, e.t);
  console.log(e.id, estado(r));
}
```

Salida: `7 vencido` / `8 en plazo` / `9 urgente`

El 7 es una brecha de hace 80 horas: vencida. El 8 es una solicitud de acceso de hace 12 días: le quedan 18. El 9 es una brecha de hace 70 horas: quedan 2, urgente.

**Pantalla 3 · codigo**

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
function quedan(tipo, pasado) {
  return limites[tipo] - pasado;
}
function estado(resto) {
  if (resto < 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
const exps = [
  { id: 7, tipo: "brecha", t: 80 },
  { id: 8, tipo: "acceso", t: 12 },
  { id: 9, tipo: "brecha", t: 70 },
];
const resto = (e) =>
  quedan(e.tipo, e.t);
const venc = exps.filter(
  (e) => resto(e) < 0,
);
console.log(venc.map((e) => e.id));
```

Salida: `[ 7 ]`

resto es una función de una línea que pide lo que queda de **un expediente**. Con ella, filter se queda con los vencidos y map saca solo sus números. Son las herramientas de la semana 7, ahora sobre tu propio programa.

**Pantalla 4 · deiure**

Para saber qué está haciendo cada apartado de una EIPD, DeIure se queda primero con los agentes que están trabajando. Es un filter, como tu lista de vencidos.

```ts
const working = own.filter(row => row.status === 'working');
```

`DeIure/src/lib/recorrido-agents.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s09-d05-r1` · concepto programa-propio

¿Qué escribe este programa?

```ts
function estado(resto) {
  if (resto < 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
const rs = [-2, 3, 40];
const es = rs.map(
  (r) => estado(r),
);
console.log(es);
```

- ✅ `[ 'vencido', 'urgente', 'en plazo' ]`: Eso es: map aplica estado a cada número y devuelve una lista nueva, en el mismo orden.
- ▫️ `[ -2, 3, 40 ]`: Eso es rs. es guarda lo que devuelve estado con cada número.
- ▫️ `[ 'vencido' ]`: Eso haría filter. map devuelve tantos elementos como tiene la lista.

Pistas: 1) map da una vuelta por cada número. 2) En cada vuelta guarda estado(r). 3) Tres números, tres palabras.

Explicación: map transforma cada elemento y filter elige algunos. Aquí se transforma: cada resto pasa a ser una palabra.

#### Reto 2 · Rellena el hueco · `s09-d05-r2` · concepto programa-propio

Completa para contar los urgentes: los que no están vencidos, pero les quedan 5 o menos.

```ts
function estado(resto) {
  if (resto < 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
const rs = [-2, 3, 40, 1];
const urg = rs.filter(
  (r) => ___,
);
console.log(urg.length);
```

Objetivo: `2`

- ✅ `estado(r) === "urgente"`: Correcto: el 3 y el 1. Reutilizas la regla que ya escribiste.
- ▫️ `r <= 5`: Eso también cuenta el -2, que no es urgente: está vencido. Daría 3.
- ▫️ `estado(r) = "urgente"`: Con un solo = se intenta guardar un valor, no comparar. Da un error.

Pistas: 1) Ya tienes una función que decide qué es urgente. 2) Compara lo que devuelve con «urgente». 3) Para comparar, ===.

Explicación: Si repites la regla a mano (r <= 5) es fácil olvidar una parte. Llamar a estado garantiza que se aplica la misma regla en todo el programa.

#### Reto 3 · Caza el fallo (Revisión) · `s09-rev-5` · concepto programa-propio

Le pediste a la IA: «Di qué expedientes están fuera de plazo». Tenía que salir `Fuera: 2,3`. Sale `Fuera: undefined`. Toca la línea que está mal.

```ts
const exps = [
  { id: 1, quedan: 10 },
  { id: 2, quedan: -3 },
  { id: 3, quedan: -8 },
];
const fuera = exps.filter((e) =>
  e.quedan < 0
);
console.log(`Fuera: ${fuera.id}`);
```

- ✅ ``fuera` es una lista, no un expediente: no tiene `.id`. Primero hay que sacar los ids con `map`.`: Exacto. `filter` siempre devuelve una lista, aunque tenga uno solo o ninguno.
- ▫️ `Tenía que ser `find` en vez de `filter`.`: `find` daría solo el primero, el 2. Se piden todos los que están fuera, así que `filter` está bien.
- ▫️ `La condición tenía que ser `e.quedan > 0`.`: Fuera de plazo son los que tienen menos de 0, así que la condición está bien. Mira qué es `fuera`.

Pistas: 1) ¿Qué devuelve `filter`: un expediente o una lista? 2) ¿Tiene una lista una clave `id`? 3) ¿Qué método pasa de una lista de expedientes a una lista de ids?

Explicación: Imprime `Fuera: undefined`, porque una lista no tiene `.id`. Con `map` se saca la lista de ids, y dentro de una plantilla una lista se escribe separada por comas: `Fuera: 2,3`. Al revisar, pregúntate en cada variable si es una lista o un solo dato.

### Repaso (reserva)

#### Repaso 1 · Caza el fallo (Revisión) · `s09-rev-x3` · concepto programa-propio

Tu despacho se fija un plazo interno de 30 días para responder a una solicitud. La IA ha escrito el informe y sale `Quedan 20 horas`. Toca la línea que está mal.

```ts
const limite = {
  brecha: 72,
  solicitud: 30,
};
const unidad = {
  brecha: "horas",
  solicitud: "días",
};
function informe(tipo, pasado) {
  const q = limite[tipo] - pasado;
  return `Quedan ${q} horas`;
}
console.log(informe("solicitud", 10));
```

- ✅ `La unidad está escrita a mano: siempre dice «horas». Tiene que salir de `unidad[tipo]`.`: Exacto. La IA preparó `unidad` y luego no la usó. Un dato que no se usa es una pista.
- ▫️ `La resta está al revés: `pasado - limite[tipo]`.`: Así saldría -20. Lo que queda es el límite menos lo pasado, como está. Fíjate en la palabra del final.
- ▫️ ``limite` tiene que guardar 30 días en horas: 720.`: Se puede, pero entonces habría que pasar también lo pasado a horas. Lo sencillo es usar la unidad de cada tipo.

Pistas: 1) ¿En qué unidad va el plazo de una solicitud? 2) ¿Se usa en algún sitio el objeto `unidad`? 3) ¿Qué palabra de la plantilla está escrita a mano?

Explicación: Imprime `Quedan 20 horas`, pero son 20 días. La IA preparó el objeto `unidad` y después escribió «horas» a mano. Con la brecha parecía correcto, y solo falla con otro tipo. Al revisar, busca datos preparados que nunca se usan y prueba cada tipo, no solo el primero.

### Para nota

#### Reto difícil · ¿Qué imprime? · `s09-d05-n1` · concepto programa-propio

Hay una errata en el nombre de un campo. ¿Qué escribe este programa?

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
function quedan(tipo, pasado) {
  return limites[tipo] - pasado;
}
function estado(resto) {
  if (resto < 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
const exps = [
  { id: 7, tipo: "brecha", t: 80 },
  { id: 9, tipo: "brecha", t: 70 },
];
for (const e of exps) {
  const r = quedan(e.tipo, e.horas);
  console.log(e.id, estado(r));
}
```

- ✅ `7 en plazo ⏎ 9 en plazo`: Eso es: e.horas no existe y da undefined. 72 - undefined es NaN, ningún if se cumple y todo sale «en plazo».
- ▫️ `7 vencido ⏎ 9 urgente`: Eso saldría con e.t. El campo se llama t, no horas.
- ▫️ `❌ Error`: Leer un campo que no existe no da error: da undefined, y la cuenta sigue con NaN.

Pistas: 1) ¿Cómo se llama el campo del tiempo? 2) t. ¿Qué da e.horas? 3) undefined. ¿Y 72 - undefined?

Explicación: Una errata que no da error y deja todo «en plazo» es el peor fallo posible en una calculadora de plazos. Mañana lo blindas.

#### Escribe el programa · `s09-d05-n2` · concepto programa-propio

Muestra en pantalla los expedientes que no están en plazo, con el formato «Exp. 7: vencido». Al final, muestra cuántos son: «Avisos: 2».

Datos (no se tocan):

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
function quedan(tipo, pasado) {
  return limites[tipo] - pasado;
}
function estado(resto) {
  if (resto < 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
const exps = [
  { id: 7, tipo: "brecha", t: 80 },
  { id: 8, tipo: "acceso", t: 12 },
  { id: 9, tipo: "brecha", t: 70 },
];
```

Empieza con:

```ts
// Un contador que empieza en 0
// Recorre exps
// Al final, los avisos
```

Tiene que salir: `Exp. 7: vencido` / `Exp. 9: urgente` / `Avisos: 2`

Variantes ocultas:

- `const limites = { brecha: 72, acceso: 30, }; function quedan(tipo, pasado) { return limites[tipo] - pasado; } function estado(resto) { if (resto < 0) { return "vencido"; } if (resto <= 5) { return "urgente"; } return "en plazo"; } const exps = [ { id: 1, tipo: "acceso", t: 31 }, { id: 2, tipo: "acceso", t: 26 }, { id: 3, tipo: "brecha", t: 72 }, ];` → `Exp. 1: vencido` / `Exp. 2: urgente` / `Exp. 3: urgente` / `Avisos: 3`
- `const limites = { brecha: 72, acceso: 30, }; function quedan(tipo, pasado) { return limites[tipo] - pasado; } function estado(resto) { if (resto < 0) { return "vencido"; } if (resto <= 5) { return "urgente"; } return "en plazo"; } const exps = [ { id: 4, tipo: "acceso", t: 1 }, ];` → `Avisos: 0`

Solución:

```ts
let n = 0;
for (const e of exps) {
  const r = quedan(e.tipo, e.t);
  const s = estado(r);
  if (s !== "en plazo") {
    console.log(`Exp. ${e.id}: ${s}`);
    n = n + 1;
  }
}
console.log("Avisos:", n);
```

Pistas: 1) Calcula el estado de cada expediente con tus dos funciones. 2) Si no es «en plazo», muéstralo y suma 1 al contador. 3) El contador se declara con let antes del for y se muestra después.

Explicación: Una variante no tiene ningún aviso: tiene que salir «Avisos: 0», y nada más.

---

## Día 6: Revisar tu propio programa

**Objetivo:** Hoy revisas tu calculadora como revisarías un escrito tuyo antes de enviarlo: buscas la regla que no encaja, el dato raro y lo que sobra.

### Microlección

**Pantalla 1 · texto**

Revisar tu propio programa es como releer un escrito tuyo con los ojos de la otra parte. Tres preguntas: **¿la regla vale igual para todos los casos?**, **¿qué pasa con un dato raro?** y **¿sobra algo?** La primera ya da una sorpresa.

**Pantalla 2 · codigo**

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
function quedan(tipo, pasado) {
  return limites[tipo] - pasado;
}
function estado(resto) {
  if (resto < 0) {
    return "vencido";
  }
  if (resto <= 5) {
    return "urgente";
  }
  return "en plazo";
}
const r = quedan("brecha", 60);
console.log(r, estado(r));
```

Salida: `12 en plazo`

Quedan 12 horas para notificar a la autoridad, ¿y sale «en plazo»? El 5 de estado tenía sentido para una solicitud (5 días), no para una brecha (5 horas). **Un mismo número para dos unidades**: otro número mágico, escondido.

**Pantalla 3 · codigo**

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
const avisos = {
  brecha: 24,
  acceso: 5,
};
function estado(tipo, pasado) {
  const lim = limites[tipo];
  if (lim === undefined) {
    return "desconocido";
  }
  if (typeof pasado !== "number") {
    return "dato erróneo";
  }
  const r = lim - pasado;
  if (r < 0) {
    return "vencido";
  }
  if (r <= avisos[tipo]) {
    return "urgente";
  }
  return "en plazo";
}
console.log(estado("brecha", 60));
console.log(estado("queja", 5));
console.log(estado("brecha", "x"));
```

Salida: `urgente` / `desconocido` / `dato erróneo`

Versión 2. Una segunda tabla dice cuándo avisar en cada tipo: tu despacho decide avisar con 24 horas o menos en una brecha y con 5 días o menos en una solicitud. estado recibe el tipo y lo pasado, y comprueba **primero** los datos raros: el tipo que no existe y el tiempo que no es un número.

**Pantalla 4 · texto**

La tercera pregunta: ¿sobra algo? Comprueba solo lo que **puede pasar de verdad**. Un tipo mal escrito, sí: lo teclea una persona. Que la tabla limites esté vacía, no: la escribes tú. Revisar no es solo añadir comprobaciones; también es **quitar** las que no protegen de nada.

**Pantalla 5 · deiure**

Las reglas de DeIure piden a los agentes de IA lo mismo: no defenderse de lo imposible y no escribir de más.

```ts
- Sin error handling para escenarios imposibles.
- Si escribes 200 líneas y podrían ser 50, reescribe.
```

`CLAUDE.md`

### Retos

#### Reto 1 · elegir · `s09-d06-r1` · concepto programa-propio

La IA dice: «Solo he cambiado el umbral de urgente para que dependa del tipo». ¿Es verdad?

- ✅ `No: también ha cambiado el vencido`: Eso es: < 0 pasa a <= 0, y las 72 horas justas saldrían «vencido». Ese cambio no se había pedido.
- ▫️ `Sí: solo ha cambiado el umbral`: Hay dos pares de − y +. El primero toca la condición de vencido.
- ▫️ `No: ha borrado el vencido`: El return «vencido» no lleva marca: sigue ahí.

Pistas: 1) ¿Cuántas líneas llevan −? 2) Dos. Una es la del umbral. 3) Compara la otra carácter a carácter.

Explicación: Revisa siempre el diff contra lo que se dice que se ha hecho. Un carácter de más en una condición cambia el último día de un plazo.

#### Reto 2 · ¿Qué imprime? · `s09-d06-r2` · concepto programa-propio

Con la versión 2, ¿qué escribe este programa?

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
const avisos = {
  brecha: 24,
  acceso: 5,
};
function estado(tipo, pasado) {
  const lim = limites[tipo];
  if (lim === undefined) {
    return "desconocido";
  }
  if (typeof pasado !== "number") {
    return "dato erróneo";
  }
  const r = lim - pasado;
  if (r < 0) {
    return "vencido";
  }
  if (r <= avisos[tipo]) {
    return "urgente";
  }
  return "en plazo";
}
console.log(estado("brecha", 48));
console.log(estado("acceso", 25));
console.log(estado("acceso", 24));
```

- ✅ `urgente ⏎ urgente ⏎ en plazo`: Eso es: quedan 24 horas (24 <= 24), 5 días (5 <= 5) y 6 días (6 > 5).
- ▫️ `en plazo ⏎ urgente ⏎ en plazo`: Con 48 horas quedan 24, y el aviso de la brecha es 24 o menos: urgente.
- ▫️ `urgente ⏎ urgente ⏎ urgente`: Con 24 días quedan 6, y el aviso del acceso es 5 o menos.

Pistas: 1) Calcula lo que queda en cada caso. 2) 24 horas, 5 días y 6 días. 3) Compara cada uno con su aviso: 24 para la brecha y 5 para el acceso.

Explicación: Los tres casos están justo en la frontera de su aviso. Si estos tres salen bien, el resto también.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s09-rev-6` · concepto programa-propio

Revisas tu propia calculadora con un dato raro: alguien ha escrito -5 horas. La IA y Marta discuten qué pasa. ¿Quién tiene razón?

```ts
function quedan(pasadas) {
  return 72 - pasadas;
}
console.log(quedan(-5));
```

- Marta: Da un error. (No pueden haber pasado -5 horas.)
- La IA: Imprime `77`, sin avisar de nada. (Para JavaScript es una resta normal: 72 - (-5) = 77.)

Correcta: La IA

Pistas: 1) ¿Comprueba la función si el dato tiene sentido? 2) Restar un negativo es sumar. 3) ¿Cuánto es 72 + 5?

Explicación: Imprime `77`: más horas de las que da el plazo, sin ningún aviso. Un programa solo comprueba lo que le pides. Al revisar el tuyo, prueba datos raros (negativos, cero, un tipo mal escrito) y decide qué debe pasar, por ejemplo con `if (pasadas < 0)` y un mensaje.

### Repaso (reserva)

#### Repaso 1 · ¿Quién tiene razón? (Revisión) · `s09-rev-x4` · concepto programa-propio

Alguien escribe el tipo con un espacio de más al final. La IA y Marta discuten qué pasa. ¿Quién tiene razón?

```ts
const limite = { brecha: 72 };
function quedan(tipo, pasadas) {
  return limite[tipo] - pasadas;
}
console.log(quedan("brecha ", 50));
```

- La IA: Imprime `22`. (El espacio no importa: sigue siendo «brecha».)
- Marta: Da un error. (La clave `"brecha "` no existe en el objeto.)

Correcta: ninguno

Pistas: 1) ¿Es `"brecha "` la misma clave que `"brecha"`? 2) ¿Qué da una clave que no existe? 3) ¿Cuánto es `undefined - 50`?

Explicación: Imprime `NaN`. La clave con espacio no existe, `limite[tipo]` da `undefined`, y la resta da `NaN` (no es un número). Ni error ni aviso. Sigue la pista hacia atrás: `NaN` lleva a `undefined`, y `undefined`, a la clave.

### Para nota

#### Reto difícil · Rellena el hueco · `s09-d06-n1` · concepto programa-propio

Desde un formulario, el tiempo puede llegar como texto: "40". Completa la comprobación para que salga «en plazo» y después «dato erróneo».

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
const avisos = {
  brecha: 24,
  acceso: 5,
};
function estado(tipo, pasado) {
  const lim = limites[tipo];
  if (lim === undefined) {
    return "desconocido";
  }
  if (typeof pasado ___ "number") {
    return "dato erróneo";
  }
  const r = lim - pasado;
  if (r < 0) {
    return "vencido";
  }
  if (r <= avisos[tipo]) {
    return "urgente";
  }
  return "en plazo";
}
console.log(estado("brecha", 40));
console.log(estado("brecha", "40"));
```

Objetivo: `en plazo` / `dato erróneo`

- ✅ `!==`: Correcto: si el tiempo no es un número, se avisa. 40 pasa y "40" no.
- ▫️ `===`: Al revés: el 40 de verdad saldría «dato erróneo» y el texto «en plazo».
- ▫️ `<`: < no sirve para comparar tipos: ningún caso entra, y el texto "40" sale «en plazo» como si nada.

Pistas: 1) typeof pasado da «number» o «string». 2) Quieres avisar cuando NO es un número. 3) «Distinto de» se escribe !==.

Explicación: 72 - "40" da 32 sin ningún error: JavaScript convierte el texto en número al restar. Por eso hay que comprobarlo a mano.

#### Escribe el programa · `s09-d06-n2` · concepto programa-propio

Escribe estado(tipo, pasado) con las dos tablas: «desconocido» si el tipo no está en limites, «vencido», «urgente» si quedan avisos[tipo] o menos, o «en plazo». Después muestra cada caso así: «brecha 60: urgente».

Datos (no se tocan):

```ts
const limites = {
  brecha: 72,
  acceso: 30,
};
const avisos = {
  brecha: 24,
  acceso: 5,
};
const casos = [
  { tipo: "brecha", t: 60 },
  { tipo: "acceso", t: 12 },
  { tipo: "queja", t: 3 },
];
```

Empieza con:

```ts
// function estado(tipo, pasado) { … }
// Recorre casos
```

Tiene que salir: `brecha 60: urgente` / `acceso 12: en plazo` / `queja 3: desconocido`

Variantes ocultas:

- `const limites = { brecha: 72, acceso: 30, }; const avisos = { brecha: 24, acceso: 5, }; const casos = [ { tipo: "brecha", t: 72 }, { tipo: "brecha", t: 73 }, { tipo: "acceso", t: 25 }, ];` → `brecha 72: urgente` / `brecha 73: vencido` / `acceso 25: urgente`
- `const limites = { brecha: 72, acceso: 30, }; const avisos = { brecha: 24, acceso: 5, }; const casos = [ { tipo: "brecha", t: 47 }, { tipo: "acceso", t: 31 }, ];` → `brecha 47: en plazo` / `acceso 31: vencido`

Solución:

```ts
function estado(tipo, pasado) {
  const lim = limites[tipo];
  if (lim === undefined) {
    return "desconocido";
  }
  const r = lim - pasado;
  if (r < 0) {
    return "vencido";
  }
  if (r <= avisos[tipo]) {
    return "urgente";
  }
  return "en plazo";
}
for (const k of casos) {
  const s = estado(k.tipo, k.t);
  console.log(`${k.tipo} ${k.t}:`, s);
}
```

Pistas: 1) Lo primero en estado: busca el límite y comprueba si es undefined. 2) Después calcula lo que queda y compáralo con 0 y con avisos[tipo]. 3) En el for, llama a estado con k.tipo y k.t.

Explicación: Es tu calculadora completa. Las variantes prueban las fronteras: 72 horas justas, una hora de más y 5 días justos.

---

## Día 7: Píldora: cuántos pasos da tu programa cuando la lista crece (píldora de informática)

**Objetivo:** Hoy aprendes a medir la eficiencia de un programa contando sus pasos: uno por elemento, uno por cada pareja o uno solo. Y, como comando de la semana, los permisos de un fichero y sudo.

### Microlección

**Pantalla 1 · texto**

Con 3 expedientes, cualquier programa es rápido. Con 30.000, no. La eficiencia no se mide en segundos, sino en **pasos**: cuántas veces trabaja el programa **cuando la lista crece**. Es como buscar un expediente en el archivo: puedes abrir carpeta por carpeta o ir directo a la etiqueta del archivador.

**Pantalla 2 · codigo**

```ts
const horas = [80, 12, 70, 5];
let pasos = 0;
for (const h of horas) {
  pasos = pasos + 1;
}
console.log("Pasos:", pasos);
```

Salida: `Pasos: 4`

Un bucle da **un paso por elemento**. Con 4 horas, 4 pasos; con 1.000, 1.000. Si la lista se duplica, los pasos se duplican. Es lo normal y está bien.

**Pantalla 3 · codigo**

```ts
const horas = [80, 12, 70, 5];
let pasos = 0;
for (const a of horas) {
  for (const b of horas) {
    pasos = pasos + 1;
  }
}
console.log("Pasos:", pasos);
```

Salida: `Pasos: 16`

Un bucle **dentro** de otro da un paso por cada **pareja**: 4 × 4 = 16. Con 1.000 elementos, un millón de pasos. A veces hace falta (comparar cada expediente con todos los demás), pero si sobra, es el fallo de eficiencia más típico de una IA.

**Pantalla 4 · esquema**

*Cuántos pasos, con 1.000 expedientes*

**Un bucle** → 1.000 pasos: uno por elemento.

↓

**Un bucle dentro de otro** → 1.000 × 1.000 = un millón de pasos.

↓

**find** → Se para en cuanto encuentra lo que busca: si está el primero, 1 paso; si no está, 1.000.

↓

**Buscar por clave** → limites[tipo] va directo, sin recorrer nada: 1 paso, sea la tabla del tamaño que sea.

**Pantalla 5 · deiure**

DeIure guarda la actividad de cada apartado de una EIPD en un Map, una tabla con clave. Para saber cómo va un apartado no recorre todos: va directo a su clave, como tu limites[tipo].

```ts
const result = new Map<string, SectionActivity>();
```

`DeIure/src/lib/recorrido-agents.ts`

**Pantalla 6 · terminal**

```
$ ls -l hola.sh
-rw-r--r--  1 daniel  staff  10  1 nov 10:00 hola.sh
```

**Comando de la semana: chmod y sudo.** Las letras del principio son los **permisos**: r leer, w escribir, x ejecutar, para ti, tu grupo y todos. Aquí no hay ninguna x: el guion no se puede ejecutar. `chmod +x hola.sh` se la da. `sudo` ejecuta una orden **como administrador**: te pide la contraseña y puede tocarlo todo, también romper el sistema. Regla: nunca pongas sudo delante de una orden que no entiendes, y menos si te la propone una IA. Las reglas de DeIure dicen lo mismo: los agentes de IA no ejecutan sudo. **Minirreto en tu Mac:** `echo "echo Hola" > hola.sh`, `./hola.sh` (sale «permission denied»), `chmod +x hola.sh` y otra vez `./hola.sh`.

### Retos

#### Reto 1 · ¿Qué imprime? · `s09-d07-r1` · concepto eficiencia

Aquí los dos bucles van uno detrás de otro, no uno dentro de otro. ¿Qué escribe?

```ts
const horas = [80, 12, 70];
let pasos = 0;
for (const a of horas) {
  pasos = pasos + 1;
}
for (const b of horas) {
  pasos = pasos + 1;
}
console.log(pasos);
```

- ✅ `6`: Eso es: 3 pasos y después otros 3. Seguidos, se suman.
- ▫️ `9`: Eso sería con un bucle dentro de otro. Aquí el segundo empieza cuando acaba el primero.
- ▫️ `3`: Hay dos bucles, y cada uno da 3 pasos.

Pistas: 1) ¿Está el segundo for dentro del primero? 2) No: va después. 3) 3 + 3.

Explicación: Bucles seguidos se suman y bucles anidados se multiplican. Con 1.000 elementos: 2.000 pasos frente a un millón.

#### Reto 2 · elegir · `s09-d07-r2` · concepto eficiencia

Has creado hola.sh y al ejecutarlo sale esto. ¿Qué haces?

- ✅ `chmod +x hola.sh, y probar otra vez`: Eso es: al fichero le falta el permiso de ejecutar, la x.
- ▫️ `sudo ./hola.sh`: sudo no le da la x al fichero: te da poderes de administrador que aquí no necesitas. Nunca lo uses para saltarte un error que no entiendes.
- ▫️ `Borrarlo y escribirlo otra vez`: Un fichero nuevo nace igual, sin la x. Lo que falta es el permiso.

Pistas: 1) «permission denied»: falta un permiso. 2) ¿Cuál? El de ejecutar. 3) Se da con chmod.

Explicación: Un error de permisos se arregla dando el permiso justo que falta, no con sudo.

#### Reto 3 · Caza el fallo (Revisión) · `s09-rev-7` · concepto eficiencia

Le pediste a la IA: «Cuenta los expedientes vencidos y cuántos pasos das». El resultado es correcto (2), pero da 16 pasos para 4 expedientes. Toca la línea que sobra.

```ts
const quedan = [3, -1, 7, -2];
let pasos = 0;
let fuera = 0;
for (const q of quedan) {
  for (const otro of quedan) {
    pasos++;
    if (otro === q && q < 0) {
      fuera++;
    }
  }
}
console.log(fuera, pasos);
```

- ✅ `El segundo bucle no hace falta: para cada expediente vuelve a recorrer la lista entera. Con 4 da 16 pasos; con 1000, un millón.`: Exacto. Basta un bucle y `if (q < 0)`: 4 pasos para 4 expedientes.
- ▫️ ``pasos++` está mal colocado: hay que quitarlo.`: Quitarlo no reduce los pasos; solo dejarías de contarlos. Lo que los multiplica es otra línea.
- ▫️ `Hay que usar `filter` y el programa irá más rápido.`: `filter` también mira cada dato una vez, como un bucle sencillo. Lo que sobra es el bucle de dentro.

Pistas: 1) ¿Cuántas vueltas da el bucle de dentro por cada vuelta del de fuera? 2) 4 vueltas × 4 vueltas son 16 pasos. 3) ¿Hace falta comparar cada expediente con todos los demás para saber si está vencido?

Explicación: Imprime `2 16`; arreglado, `2 4`. El resultado es el mismo, pero un bucle dentro de otro da n × n pasos: 16 con 4 expedientes y un millón con 1000. Es el fallo de la semana, porque no se ve en las pruebas pequeñas. Cuando veas un bucle dentro de otro, pregúntate si de verdad hace falta.

### Repaso (reserva)

#### Repaso 1 · ¿Quién tiene razón? (Revisión) · `s09-rev-x1` · concepto eficiencia

La IA y Marta discuten cuántos pasos cuenta este código. ¿Quién tiene razón?

```ts
const ids = [4, 8, 15, 16];
let pasos = 0;
for (const a of ids) {
  for (const b of ids) {
    pasos++;
  }
}
console.log(pasos);
```

- La IA: Imprime `4`. (La lista tiene 4 datos.)
- Marta: Imprime `8`. (Hay dos bucles de 4: 4 + 4.)

Correcta: ninguno

Pistas: 1) ¿Los bucles van uno detrás de otro o uno dentro de otro? 2) Por cada vuelta del de fuera, el de dentro da todas las suyas. 3) ¿Cuánto es 4 × 4?

Explicación: Imprime `16`. Dos bucles seguidos suman (4 + 4), y uno dentro de otro multiplica (4 × 4). Con 1000 datos, la diferencia es enorme: 2000 pasos frente a un millón.

#### Repaso 2 · ¿Quién tiene razón? (Revisión) · `s09-rev-x2` · concepto eficiencia

Se cuenta cuántas veces mira `find` antes de dar el resultado. La IA y Marta discuten qué imprime. ¿Quién tiene razón?

```ts
const quedan = [10, -3, 5, -8];
let pasos = 0;
const v = quedan.find((q) => {
  pasos++;
  return q < 0;
});
console.log(v, pasos);
```

- Marta: Imprime `-3 4`. (`find` recorre la lista entera y luego da el primero que cumple.)
- La IA: Imprime `-3 2`. (`find` se para en cuanto encuentra uno: mira el 10, mira el -3 y termina.)

Correcta: La IA

Pistas: 1) ¿Cuál es el primer número menor que 0? 2) ¿En qué posición está? 3) ¿Sigue mirando `find` después de encontrarlo?

Explicación: Imprime `-3 2`. `find` se para en el primero que cumple, así que con suerte da muy pocos pasos. `filter` siempre mira toda la lista. Si solo necesitas uno, `find` es más rápido.

### Para nota

#### Reto difícil · ¿Qué imprime? · `s09-d07-n1` · concepto eficiencia

Se cuenta cuántas veces mira find. ¿Qué escribe este programa?

```ts
const ids = [4, 8, 15, 16, 23];
let pasos = 0;
const e = ids.find((id) => {
  pasos = pasos + 1;
  return id > 10;
});
console.log(e, "en", pasos, "pasos");
```

- ✅ `15 en 3 pasos`: Eso es: mira el 4, el 8 y el 15, y con el 15 se para. Los otros dos ni los mira.
- ▫️ `15 en 5 pasos`: find no sigue mirando: se para en cuanto encuentra el primero que cumple.
- ▫️ `[ 15, 16, 23 ] en 5 pasos`: Eso se parece a filter. find devuelve solo el primero, y se para ahí.

Pistas: 1) ¿Cuál es el primer id mayor que 10? 2) El 15, el tercero. 3) find se para en cuanto lo encuentra.

Explicación: find es tan rápido como pronto encuentre: lo que busques más a menudo, cuanto antes en la lista.

#### Escribe el programa · `s09-d07-n2` · concepto eficiencia

Con una sola vuelta por la lista, cuenta las brechas vencidas (más de 72 horas) y los pasos que das. Muestra en pantalla «Vencidas: 2» y después «Pasos: 4».

Datos (no se tocan):

```ts
const horas = [80, 12, 96, 70];
```

Empieza con:

```ts
// Dos contadores que empiezan en 0
// Un solo for
```

Tiene que salir: `Vencidas: 2` / `Pasos: 4`

Variantes ocultas:

- `const horas = [73];` → `Vencidas: 1` / `Pasos: 1`
- `const horas = [10, 20, 30, 40, 50, 72];` → `Vencidas: 0` / `Pasos: 6`

Solución:

```ts
let venc = 0;
let pasos = 0;
for (const h of horas) {
  pasos = pasos + 1;
  if (h > 72) {
    venc = venc + 1;
  }
}
console.log("Vencidas:", venc);
console.log("Pasos:", pasos);
```

Pistas: 1) Un contador para las vencidas y otro para los pasos. 2) Los pasos suben en cada vuelta; las vencidas, solo si h > 72. 3) Muestra los dos al final, fuera del for.

Explicación: Con un bucle dentro de otro, los pasos saldrían al cuadrado (16 en vez de 4). Una variante acaba en 72 justas: no está vencida.

