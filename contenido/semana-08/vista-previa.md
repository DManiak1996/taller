# Semana 8: vista previa

Generado desde los JSON. Para revisar el contenido sin abrir el formato.

---

## Día 1: Git: guardar fotos del proyecto

**Objetivo:** Hoy aprendes qué es un commit, los tres estados de un cambio (modificado, preparado y guardado) y a leer lo que dice git status.

### Microlección

**Pantalla 1 · texto**

**Git** guarda la historia de un proyecto. Cada vez que haces un **commit**, guarda una **foto** de todos los ficheros, con un mensaje, la fecha y quién la hizo. Es como numerar cada versión de un contrato: puedes ver qué cambió entre una y otra y volver a cualquiera. Nada se pierde.

**Pantalla 2 · esquema**

*Del cambio a la foto*

**Modificado** → Cambias un fichero. Git lo ve, pero todavía no lo guarda.

↓

**Preparado** → Con `git add fichero` lo eliges para la próxima foto.

↓

**Guardado** → Con `git commit -m "mensaje"` se hace la foto de lo preparado, y solo de eso.

**Pantalla 3 · terminal**

```
$ git status
On branch main
Changes to be committed:
  modified:   informe.ts

Changes not staged for commit:
  modified:   datos.ts

Untracked files:
  notas.txt
```

`git status` te dice cómo está cada fichero (en inglés; aquí, resumido). **To be committed**: preparado, entra en la próxima foto. **Not staged**: modificado, pero sin `git add`. **Untracked**: un fichero nuevo que Git todavía no vigila.

**Pantalla 4 · terminal**

```
$ git commit -m "Añade informe"
[main 3f2a1c0] Añade informe
 1 file changed, 2 insertions(+)
```

La foto se ha hecho con informe.ts, el único preparado. 3f2a1c0 es el **código de la foto** (el hash), y main, la rama en la que estás. datos.ts y notas.txt siguen como estaban.

**Pantalla 5 · deiure**

En DeIure trabajan a la vez varios agentes de IA, así que su CLAUDE.md les obliga a elegir uno a uno los ficheros que preparan. `git add .` lo prepara **todo**, también lo que no es tuyo o lo que no debería subir nunca.

```ts
- **Staging selectivo — SIEMPRE**: `git add <rutas concretas>`. **NUNCA `git add .` / `git add -A`**
```

`CLAUDE.md`

### Retos

#### Reto 1 · elegir · `s08-d01-r1` · concepto git

Mira lo que dice git status. ¿Qué fichero entraría en un commit ahora mismo?

- ✅ `Solo brecha.ts`: Eso es: es el único en «to be committed», el que se preparó con git add.
- ▫️ `Solo plazos.ts`: plazos.ts está modificado pero sin preparar: no entra.
- ▫️ `Los dos`: Un commit guarda solo lo preparado. plazos.ts necesitaría antes un git add.

Pistas: 1) Hay dos apartados: ¿cuál significa «preparado»? 2) «Changes to be committed»: lo que entra en el commit. 3) Lo de «not staged» se queda fuera.

Explicación: git add elige y git commit guarda lo elegido. Así cada foto lleva solo los cambios que tú decides.

#### Reto 2 · elegir · `s08-d01-r2` · concepto git

Has creado notas.txt y haces un commit. ¿Por qué no se ha guardado nada?

- ✅ `Falta git add notas.txt`: Correcto: Git no vigila notas.txt hasta que lo preparas.
- ▫️ `El mensaje está mal escrito`: El mensaje vale. Git dice que no has añadido nada al commit.
- ▫️ `notas.txt está vacío`: Git dice «untracked»: el fichero existe, pero no se ha preparado.

Pistas: 1) Busca la palabra clave: «nothing added». 2) «No se ha añadido nada al commit». 3) ¿Qué orden añade un fichero a la próxima foto?

Explicación: Un fichero nuevo no entra solo: primero git add, después git commit. La terminal siempre te dice qué falta, en inglés.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s08-rev-1` · concepto git

Esto dice `git status` (resumido). Ahora escribes `git commit -m "Informe"`. La IA y Marta discuten qué entra en el commit. ¿Quién tiene razón?

```ts
$ git status
On branch main
Changes to be committed:
  modified:   informe.ts

Changes not staged for commit:
  modified:   datos.ts

Untracked files:
  notas.txt
```

- Marta: Los cambios de los tres ficheros. (Un commit es una foto de todo lo que hay en la carpeta.)
- La IA: Solo el cambio de `informe.ts`. (Es lo único preparado con `git add`. Lo demás se queda fuera de esta foto.)

Correcta: La IA

Pistas: 1) «to be committed» significa «para meter en el commit». 2) «not staged» significa «no preparado»: falta `git add`. 3) «Untracked» significa que Git ni siquiera lo sigue.

Explicación: Solo entra el cambio de `informe.ts`. `git status` tiene tres apartados: preparado para el commit (`git add` ya hecho), modificado pero sin preparar, y sin seguimiento (un fichero nuevo que Git aún no vigila). Antes de cada commit, mira en qué apartado está cada fichero.

### Repaso (reserva)

#### Repaso 1 · ¿Quién tiene razón? (Revisión) · `s08-rev-x3` · concepto git

La IA te propone `git add .` y luego el commit. Antes, miras `git status`. La IA y Marta discuten si hay algo que revisar. ¿Quién tiene razón?

```ts
$ git add .
$ git status
Changes to be committed:
  new file:   .env
  modified:   informe.ts
```

- Marta: No, todo bien. (`git add .` añade lo que has cambiado, que es justo lo que quieres.)
- La IA: Sí: hay que sacar `.env`. (Un `.env` suele guardar contraseñas y claves. Hay que sacarlo con `git restore --staged .env` y añadirlo a `.gitignore`.)

Correcta: La IA

Pistas: 1) Fíjate en `new file`: un fichero que nunca había estado en Git. 2) ¿Qué suele guardar un `.env`? 3) Lo que se sube a GitHub queda en el historial, aunque luego se borre.

Explicación: Hay que sacar `.env`. `git add .` prepara todo lo que hay en la carpeta, también lo que no debe subirse. Unas claves subidas a GitHub quedan en el historial aunque se borren después, y habría que cambiarlas. Mira siempre `git status` antes de un commit, y ten un `.gitignore` con `.env`.

### Para nota

#### Reto difícil · ¿Qué imprime? · `s08-d01-n1` · concepto git

Este programa imita a git status. ¿Qué escribe?

```ts
const fs = [
  { nombre: "a.ts", listo: true },
  { nombre: "b.ts", listo: false },
  { nombre: "c.ts", listo: true },
];
const entran = fs
  .filter((f) => f.listo)
  .map((f) => f.nombre);
console.log(entran);
const n = fs.length - entran.length;
console.log(n);
```

- ✅ `[ 'a.ts', 'c.ts' ] ⏎ 1`: Eso es: entran los dos preparados, y queda uno fuera.
- ▫️ `[ 'b.ts' ] ⏎ 2`: filter se queda con los que tienen listo en true.
- ▫️ `[ 'a.ts', 'c.ts' ] ⏎ 3`: La segunda línea resta: 3 ficheros menos 2 que entran.
- ▫️ `2 ⏎ 1`: map devuelve una lista con los nombres, no cuántos son.

Pistas: 1) filter elige los que tienen listo en true. 2) map saca el nombre de cada uno. 3) La última línea resta las longitudes de las dos listas.

Explicación: Repaso de la semana 7 con un caso de Git: filter elige, map transforma y .length cuenta.

#### Escribe el programa · `s08-d01-n2` · concepto git

Escribe el nombre de cada fichero preparado (estado «listo»), uno por línea, y al final «Total: » con cuántos son. Son los que entrarían en el commit.

Datos (no se tocan):

```ts
const fs = [
  { nombre: "a.ts", estado: "listo" },
  { nombre: "b.ts", estado: "otro" },
];
```

Empieza con:

```ts
// Elige los preparados
// Escribe sus nombres y el total
```

Tiene que salir: `a.ts` / `Total: 1`

Variantes ocultas:

- `const fs = [ { nombre: "x.ts", estado: "listo" }, { nombre: "y.ts", estado: "listo" }, ];` → `x.ts` / `y.ts` / `Total: 2`
- `const fs = [ { nombre: "z.ts", estado: "nuevo" }, ];` → `Total: 0`

Solución:

```ts
const listos = fs.filter((f) =>
  f.estado === "listo"
);
for (const f of listos) {
  console.log(f.nombre);
}
console.log("Total:", listos.length);
```

Pistas: 1) Primero, filter con los de estado «listo». 2) Después, un for...of que escriba el nombre de cada uno. 3) El total es la longitud de la lista filtrada.

Explicación: Si no hay ninguno preparado, el bucle no da ninguna vuelta y solo sale «Total: 0», como cuando git dice que no hay nada que guardar.

---

## Día 2: Ramas: trabajar sin tocar main

**Objetivo:** Hoy aprendes qué es una rama, a crearla y cambiarte a ella, y por qué los cambios se hacen en una rama y no directamente en main.

### Microlección

**Pantalla 1 · texto**

**main** es la rama principal: la versión buena, la que se publica. Para cambiar algo, se crea una **rama** (branch), una línea de trabajo aparte. Es como redactar sobre una copia de trabajo del contrato: el original no se toca hasta que el cambio está revisado. Si sale mal, se tira la rama y main sigue intacta.

**Pantalla 2 · terminal**

```
$ git switch -c informe
Switched to a new branch 'informe'
```

`git switch -c nombre` **crea** una rama y te **cambia** a ella (c de create). Desde ahora, tus commits van a la rama informe, no a main.

**Pantalla 3 · terminal**

```
$ git branch
* informe
  main
```

`git branch` lista las ramas. El asterisco marca **en cuál estás**. Para volver: `git switch main` (sin -c, porque ya existe).

**Pantalla 4 · esquema**

*El camino de un cambio*

**Crear rama** → Desde main: `git switch -c informe`.

↓

**Trabajar** → Cambias, `git add` y `git commit`, las veces que haga falta. main no se entera.

↓

**Revisar** → Alguien revisa el cambio. En GitHub se pide con una pull request (PR).

↓

**Fusionar** → Si está bien, los commits de la rama pasan a main.

**Pantalla 5 · deiure**

En DeIure, cada tarea va en su propia rama, con el nombre de quién la hace delante. Así dos agentes de IA nunca pisan el trabajo del otro, y main solo recibe lo revisado.

```ts
- Una tarea que edita = una rama con prefijo de propietario (`codex/...`, `claude/...`)
```

`CLAUDE.md`

### Retos

#### Reto 1 · elegir · `s08-d02-r1` · concepto git

Esto dice git branch. ¿A qué rama irá tu próximo commit?

- ✅ `main`: Eso es: el asterisco marca la rama en la que estás, y ahí va el commit.
- ▫️ `brecha`: brecha es la primera de la lista, pero el asterisco está en main.
- ▫️ `A las tres`: Un commit va solo a la rama en la que estás.

Pistas: 1) Hay una marca al principio de una línea. 2) El asterisco señala la rama actual. 3) El commit va a la rama actual.

Explicación: Antes de un commit, mira en qué rama estás. Un commit en main por error es de los despistes más típicos.

#### Reto 2 · elegir · `s08-d02-r2` · concepto git

Quieres volver a main, pero escribes esto. ¿Qué ha pasado?

- ✅ `Sobra el -c: main ya existe`: Correcto: -c es para crear. Para cambiarte a una rama que existe, git switch main.
- ▫️ `Se ha borrado main`: fatal significa que la orden no se ha hecho: no ha cambiado nada.
- ▫️ `Hay que hacer antes un commit`: El mensaje dice que la rama main ya existe: el problema es el -c.

Pistas: 1) Lee el mensaje: «a branch named 'main' already exists». 2) -c significa crear. 3) ¿Se puede crear algo que ya existe?

Explicación: «fatal» en Git quiere decir que la orden se ha parado sin hacer nada. Lee el resto: casi siempre dice qué pasa.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s08-rev-2` · concepto git

Has creado una rama, has hecho un commit en ella y has vuelto a `main`. La IA y Marta discuten si el cambio de `informe.ts` está en `main`. ¿Quién tiene razón?

```ts
$ git switch -c informe
Switched to a new branch 'informe'
$ git add informe.ts
$ git commit -m "Informe"
$ git switch main
Switched to branch 'main'
```

- Marta: Sí, está en `main`. (El commit ya está guardado en el proyecto.)
- La IA: No, `main` sigue como estaba. (El commit se hizo en la rama `informe`. Llega a `main` cuando se fusiona, por ejemplo con un PR.)

Correcta: La IA

Pistas: 1) `git switch -c informe` crea la rama y te cambia a ella. 2) ¿En qué rama estabas al hacer el commit? 3) Cambiar de rama no se lleva los commits de la otra.

Explicación: `main` sigue como estaba. El commit vive en la rama `informe`, y al volver a `main` el fichero vuelve a su versión de `main`. Así trabajas en las misiones: una rama por cambio y un PR para fusionarla cuando esté revisada.

### Repaso (reserva)



### Para nota

#### Reto difícil · ¿Qué imprime? · `s08-d02-n1` · concepto git

Una rama copia la historia de main y sigue por su cuenta. ¿Qué escribe este programa?

```ts
const main = ["a91", "b27"];
const otra = main;
const rama = [...main];
rama[2] = "c3f";
console.log(main.length);
console.log(otra.length);
console.log(rama.length);
```

- ✅ `2 ⏎ 2 ⏎ 3`: Eso es: rama es una copia, y crecer no toca a main. otra es la misma lista que main.
- ▫️ `3 ⏎ 3 ⏎ 3`: rama se hizo con los tres puntos: es una lista distinta.
- ▫️ `2 ⏎ 3 ⏎ 3`: otra apunta a la misma lista que main, y esa no ha cambiado.

Pistas: 1) ¿Cuál de las dos es una copia de verdad? 2) La de los tres puntos. otra es otro nombre para main. 3) Solo rama recibe un tercer elemento.

Explicación: Repaso de la semana 7: const otra = main no copia. Una rama de Git sí se comporta como la copia: lo que añades en ella no aparece en main.

#### Escribe el programa · `s08-d02-n2` · concepto git

Imita a git branch: escribe cada rama en una línea, con «* » delante si es la actual y con dos espacios si no.

Datos (no se tocan):

```ts
const ramas = ["main", "informe"];
const actual = "informe";
```

Empieza con:

```ts
// Recorre las ramas
// Elige el principio de cada línea
```

Tiene que salir: `  main` / `* informe`

Variantes ocultas:

- `const ramas = ["main", "a", "b"]; const actual = "main";` → `* main` / `  a` / `  b`
- `const ramas = ["main"]; const actual = "main";` → `* main`

Solución:

```ts
for (const r of ramas) {
  if (r === actual) {
    console.log(`* ${r}`);
  } else {
    console.log(`  ${r}`);
  }
}
```

Pistas: 1) Un for...of por las ramas y un if dentro. 2) Compara cada rama con actual. 3) Con comillas invertidas puedes poner delante «* » o dos espacios.

Explicación: Fíjate en que console.log("  ", r) no vale: pondría un espacio de más. Con comillas invertidas controlas cada espacio.

---

## Día 3: Leer un diff: qué ha cambiado

**Objetivo:** Hoy aprendes a leer un diff, la lista de líneas quitadas y añadidas, que es lo primero que hay que mirar al revisar un cambio de una IA.

### Microlección

**Pantalla 1 · texto**

Un **diff** (de difference) enseña lo que ha cambiado en un fichero: `git diff` lo compara con la última foto. Cada línea lleva una marca: **−** en **rojo** es una línea quitada, **+** en **verde** es una línea añadida, y sin marca, una línea igual que se enseña para situarte. GitHub lo enseña igual, con los mismos colores.

**Pantalla 2 · diff**

{"tipo":"diff","fichero":"plazo.ts","lineas":[" const plazo = 72;","-const aviso = 48;","+const aviso = 60;"," console.log(plazo);"],"nota":"Cambiar una línea se ve como **una − y una +**: la versión vieja sale y la nueva entra. Aquí solo ha cambiado aviso, de 48 a 60. Las otras dos líneas están igual."}

**Pantalla 3 · diff**

{"tipo":"diff","fichero":"informe.ts","lineas":[" const cliente = \"Arga\";","+const pais = \"ES\";"," console.log(cliente);","-console.log(pais);","+console.log(cliente, pais);"],"nota":"Una + sola es una línea nueva; una − sola, una línea borrada. Lee el diff de arriba abajo y pregúntate, de cada marca: ¿esto se pidió?"}

**Pantalla 4 · texto**

Revisar el diff es la tarea número uno al revisar a una IA. Una IA puede decir «solo he cambiado el mensaje» y haber tocado también una condición. **El diff no miente**: compara lo que dice que ha hecho con lo que se ve en rojo y verde.

**Pantalla 5 · deiure**

Antes de subir nada a GitHub, el CLAUDE.md de DeIure obliga a mirar todo lo que va a salir, porque puede haber trabajo de varios agentes y no solo el propio.

```ts
- Antes de pushear: (1) `git log origin/main..HEAD` para ver **qué sale**
```

`CLAUDE.md`

### Retos

#### Reto 1 · elegir · `s08-d03-r1` · concepto git

¿Qué ha cambiado en este diff?

- ✅ `horas pasa de 80 a 70`: Eso es: la − es la versión vieja y la + la nueva.
- ▫️ `horas pasa de 70 a 80`: Al revés: la − (roja) es lo que había, la + (verde) lo que queda.
- ▫️ `Se ha añadido horas`: Hay una − y una + de la misma variable: es un cambio, no una línea nueva.
- ▫️ `También ha cambiado afectados`: afectados no lleva marca: es una línea igual.

Pistas: 1) ¿Qué líneas llevan marca? 2) La − es lo que se quita; la +, lo que se pone. 3) Junta las dos: es la misma variable con otro valor.

Explicación: Una − seguida de una + parecida es casi siempre una línea cambiada. Compáralas carácter a carácter.

#### Reto 2 · elegir · `s08-d03-r2` · concepto git

Pediste a la IA: «añade una línea que escriba el total». ¿Ha hecho solo eso?

- ✅ `No: también ha roto la suma`: Eso es: además de añadir el console.log, ha cambiado la suma, que ya no acumula.
- ▫️ `Sí: solo añade el console.log`: Mira la − y la + de dentro del bucle: esa línea también ha cambiado.
- ▫️ `No: ha borrado el bucle`: El for no lleva marca: sigue igual.

Pistas: 1) Cuenta las marcas: ¿hay solo una +? 2) Hay una − y una + dentro del bucle. 3) Compara las dos: ¿sigue sumando?

Explicación: Un cambio que no se pidió es la primera señal de alarma. Aquí, total = b.n ya no suma: se queda con la última brecha.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s08-rev-3` · concepto git

La IA dice: «Solo he cambiado el texto del mensaje». Este es su diff. La IA y Marta discuten. ¿Quién tiene razón?

```ts
$ git diff
--- a/plazo.ts
+++ b/plazo.ts
 function enPlazo(horas) {
-  return horas <= 72;
+  return horas < 72;
 }
-console.log("Plazo OK");
+console.log("Plazo correcto");
```

- La IA: Solo cambia el mensaje. (Las líneas con − y + son el texto nuevo del aviso.)
- Marta: También cambia el límite del plazo. (Hay otra pareja − y +: `<=` pasa a ser `<`, y las 72 horas justas quedan fuera.)

Correcta: Marta

Pistas: 1) Las líneas con − son lo que había; las de +, lo que hay ahora. 2) Las líneas que empiezan con un espacio no cambian. 3) Compara la línea con − y la línea con + de `return`.

Explicación: Cambia dos cosas: el mensaje y el límite. Con `<`, las 72 horas justas ya no están en plazo, y el art. 33 RGPD dice «sin dilación indebida y, de ser posible, a más tardar 72 horas después de que haya tenido constancia». Un resumen de la IA no sustituye al diff: léelo entero, pareja a pareja.

### Repaso (reserva)



### Para nota

#### Reto difícil · ¿Qué imprime? · `s08-d03-n1` · concepto git

Este programa cuenta las líneas de un diff. ¿Qué escribe?

```ts
const diff = [
  { marca: " ", t: "let a = 1;" },
  { marca: "-", t: "let b = 2;" },
  { marca: "+", t: "let b = 3;" },
  { marca: "+", t: "let c = 4;" },
];
const nuevas = diff
  .filter((l) => l.marca === "+")
  .map((l) => l.t);
console.log(nuevas.length);
console.log(nuevas[1]);
```

- ✅ `2 ⏎ let c = 4;`: Eso es: hay dos líneas +, y la de la posición 1 es la segunda.
- ▫️ `2 ⏎ let b = 3;`: Las posiciones empiezan en 0: nuevas[1] es la segunda.
- ▫️ `3 ⏎ let c = 4;`: Solo cuentan las de marca +: la − y la de espacio quedan fuera.
- ▫️ `2 ⏎ +`: map se queda con el texto t de cada línea, no con la marca.

Pistas: 1) filter se queda con las de marca +. 2) map saca el texto de cada una. 3) nuevas[1] es la segunda de la lista.

Explicación: GitHub resume cada cambio contando así las líneas + y −.

#### Escribe el programa · `s08-d03-n2` · concepto git

Haz tu propio diff. antes y despues tienen las mismas posiciones. Si una línea es igual, escribe un espacio y la línea. Si cambia, escribe «-» con la vieja y, debajo, «+» con la nueva.

Datos (no se tocan):

```ts
const antes = ["a", "b", "c"];
const despues = ["a", "B", "c"];
```

Empieza con:

```ts
// Recorre las posiciones con un for
// Compara antes[i] y despues[i]
```

Tiene que salir: ` a` / `-b` / `+B` / ` c`

Variantes ocultas:

- `const antes = ["x", "y"]; const despues = ["X", "Y"];` → `-x` / `+X` / `-y` / `+Y`
- `const antes = ["igual"]; const despues = ["igual"];` → ` igual`

Solución:

```ts
const n = antes.length;
for (let i = 0; i < n; i++) {
  const a = antes[i];
  const d = despues[i];
  if (a === d) {
    console.log(` ${a}`);
  } else {
    console.log(`-${a}`);
    console.log(`+${d}`);
  }
}
```

Pistas: 1) Necesitas la posición para mirar las dos listas a la vez: un for clásico con i. 2) En cada vuelta, compara antes[i] con despues[i]. 3) Con comillas invertidas pones la marca pegada a la línea.

Explicación: Así trabaja Git, en versión simplificada: compara línea a línea y marca lo que cambia. El Git de verdad también sabe encontrar líneas añadidas o borradas en medio.

---

## Día 4: Tests: comprobar sin mirar a mano

**Objetivo:** Hoy aprendes qué es un test, a leer test y expect, y a entender el informe: ✓ si pasa, × si falla, con Expected y Received.

### Microlección

**Pantalla 1 · texto**

Un **test** es una comprobación automática: llama a una función con un dato conocido y compara lo que devuelve con lo que **debería** devolver. Es como una lista de verificación de cumplimiento que se pasa sola cada vez que alguien toca el código. Si alguien rompe algo, un test se pone en rojo.

**Pantalla 2 · codigo**

```ts
function quedan(horas) {
  return 72 - horas;
}
test("a las 50 h quedan 22", () => {
  expect(quedan(50)).toBe(22);
});
```

Salida: `✓ a las 50 h quedan 22`

`test` recibe un **nombre** (lo que comprueba) y una flecha con la comprobación. `expect(x).toBe(y)` se lee «espero que x sea y». Aquí quedan(50) da 22, así que pasa: ✓.

**Pantalla 3 · codigo**

```ts
function iva(precio) {
  return precio * 0.2;
}
test("IVA de 100", () => {
  expect(iva(100)).toBe(21);
});
```

Salida: `× IVA de 100` / `  Expected: 21` / `  Received: 20`

Si falla, sale × y el informe, en inglés: **Expected** es lo esperado (lo que pusiste en toBe) y **Received**, lo recibido (lo que devolvió la función). La diferencia es el fallo: el 0.2 tenía que ser 0.21.

**Pantalla 4 · texto**

Hay dos herramientas de tests muy usadas: **Vitest** (la de tus misiones) y **Jest** (la de DeIure). Se escriben casi igual: `test`, `expect`, `toBe`. Jest también acepta `it` en vez de `test`, y las dos agrupan tests con `describe`. En un fichero de Vitest de verdad, la primera línea es `import { test, expect } from "vitest";`. Aquí no hace falta.

**Pantalla 5 · deiure**

Un test real de DeIure, con Jest. Comprueba cómo se escriben los milisegundos en pantalla. Fíjate en que prueba los **límites**: menos de 1000, entre 1000 y 9999, y sin dato (null).

```ts
describe('format-metrics (es-ES)', () => {
  test('formatMs: <1000 → "Xms"', () => {
    expect(formatMs(480)).toBe('480 ms');
  });
  test('formatMs: null → "—"', () => {
    expect(formatMs(null)).toBe('—');
  });
```

`DeIure/src/lib/__tests__/format-metrics.test.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s08-d04-r1` · concepto tests

¿Qué escribe este programa?

```ts
const doble = (n) => n * 2;
test("doble de 2", () => {
  expect(doble(2)).toBe(4);
});
test("doble de 0", () => {
  expect(doble(0)).toBe(2);
});
```

- ✅ `✓ doble de 2 ⏎ × doble de 0 ⏎   Expected: 2 ⏎   Received: 0`: Eso es: el primero pasa, y en el segundo se esperaba 2 y la función devolvió 0.
- ▫️ `✓ doble de 2 ⏎ × doble de 0 ⏎   Expected: 0 ⏎   Received: 2`: Al revés: Expected es lo que pone en toBe (2); Received, lo que devolvió doble(0) (0).
- ▫️ `✓ doble de 2 ⏎ ✓ doble de 0`: doble(0) es 0, y el test espera 2: falla.

Pistas: 1) Calcula doble(2) y doble(0). 2) Compara cada uno con lo que pone en toBe. 3) Expected es lo de toBe; Received, lo que devolvió la función.

Explicación: Aquí el fallo está en el test, no en la función: doble de 0 es 0. Un test también puede estar mal escrito.

#### Reto 2 · Rellena el hueco · `s08-d04-r2` · concepto tests

Completa para que el test pase.

```ts
function iva(precio) {
  return precio * 0.21;
}
test("IVA de 100", () => {
  expect(iva(100)).toBe(___);
});
```

Objetivo: `✓ IVA de 100`

- ✅ `21`: Correcto: iva(100) devuelve el número 21.
- ▫️ `"21"`: Es un texto, y la función devuelve un número: Expected '21', Received 21. toBe distingue el tipo.
- ▫️ `100`: Eso sería el precio, no el IVA.

Pistas: 1) ¿Qué devuelve iva(100)? 2) Un número: 21. 3) Ojo con las comillas.

Explicación: En el informe, los textos salen entre comillas y los números sin ellas: así se ve si el fallo es de tipo.

#### Reto 3 · Caza el fallo (Revisión) · `s08-rev-4` · concepto tests

La IA dice que su función está lista, pero el test sale en rojo. Lee el informe y toca la línea que está mal.

```ts
function quedan(horas) {
  return 72 + horas;
}
test("a las 50 h quedan 22", () => {
  expect(quedan(50)).toBe(22);
});
```

- ✅ `Suma en vez de restar: `72 - horas`. Received (122) es lo que da el código; Expected (22), lo que pide el test.`: Exacto. Expected dice lo que tenía que salir, y Received, lo que salió. La diferencia te lleva al fallo.
- ▫️ `El test está mal: tiene que esperar 122.`: Así pasaría, pero con un número imposible: quedarían 122 horas de 72. El test es el contrato; se arregla el código.
- ▫️ `Al test le falta un `return`.`: Un test no devuelve nada: comprueba con `expect`. Mira Received: el que da 122 es el código.

Pistas: 1) ¿Qué número sale en Received? 2) ¿Cómo se llega a 122 con 72 y 50? 3) Para saber cuántas quedan, ¿se suma o se resta?

Explicación: Sale `× a las 50 h quedan 22`, con Expected 22 y Received 122. Expected es lo que pide el test; Received, lo que dio el código. 122 es 72 + 50: la función suma donde tenía que restar.

### Repaso (reserva)

#### Repaso 1 · ¿Qué imprime? · `s08-d04-x1` · concepto tests

¿Qué escribe este programa?

```ts
function saludo(n) {
  return "Hola " + n;
}
test("saludo", () => {
  expect(saludo("Ana"))
    .toBe("Hola, Ana");
});
```

- ✅ `× saludo ⏎   Expected: 'Hola, Ana' ⏎   Received: 'Hola Ana'`: Eso es: falta la coma. El informe enseña los dos textos para compararlos letra a letra.
- ▫️ `✓ saludo`: Compara letra a letra: el test espera una coma que la función no pone.
- ▫️ `× saludo ⏎   Expected: 'Hola Ana' ⏎   Received: 'Hola, Ana'`: Expected es lo de toBe, el texto con coma.

Pistas: 1) ¿Qué devuelve saludo("Ana")? 2) Compáralo con lo que pone en toBe. 3) Hay un carácter de diferencia.

Explicación: Un expect largo se puede partir en dos líneas: .toBe sigue en la línea de abajo.

### Para nota

#### Reto difícil · ¿Qué imprime? · `s08-d04-n1` · concepto tests

¿Qué escribe este programa?

```ts
const exps = [{ id: 1, estado: "A" }];
const buscar = (id) =>
  exps.find((e) => e.id === id);
test("id 1", () => {
  expect(buscar(1).estado).toBe("A");
});
test("id 9", () => {
  expect(buscar(9).estado).toBe("A");
});
console.log("fin");
```

- ✅ `✓ id 1 ⏎ × id 9 ⏎   TypeError: Cannot read properties of undefined (reading 'estado') ⏎ fin`: Eso es: find no encuentra el 9, da undefined, y leer .estado de undefined es un error. El test falla, pero el programa sigue.
- ▫️ `✓ id 1 ⏎ × id 9 ⏎   Expected: 'A' ⏎   Received: undefined`: No llega a comparar: el error salta antes, al leer .estado de undefined.
- ▫️ `✓ id 1 ⏎ ✓ id 9 ⏎ fin`: No existe ningún expediente con id 9.

Pistas: 1) ¿Qué devuelve buscar(9)? 2) find sin resultado da undefined. 3) ¿Qué pasa al leer un campo de undefined dentro de un test?

Explicación: Un error dentro de un test lo pone en rojo, pero no para los demás. Es el caso que un buen test debe probar: el expediente que no existe.

#### Escribe el programa · `s08-d04-n2` · concepto tests

restan(dias) devuelve cuántos días quedan de un plazo de 30. Escribe un test llamado «12 días: quedan 18» que compruebe que restan(12) da 18.

Datos (no se tocan):

```ts
function restan(dias) {
  return 30 - dias;
}
```

Empieza con:

```ts
// test(nombre, () => { … })
// y dentro, expect(…).toBe(…)
```

Tiene que salir: `✓ 12 días: quedan 18`

Variantes ocultas:

- `function restan(dias) { return 30 + dias; }` → `× 12 días: quedan 18` / `  Expected: 18` / `  Received: 42`
- `function restan(dias) { return dias - 30; }` → `× 12 días: quedan 18` / `  Expected: 18` / `  Received: -18`

Solución:

```ts
test("12 días: quedan 18", () => {
  expect(restan(12)).toBe(18);
});
```

Pistas: 1) Copia la forma del test de la lección. 2) Dentro de expect va la llamada; dentro de toBe, lo que debería dar. 3) expect(restan(12)).toBe(18);

Explicación: Las variantes ocultas usan versiones rotas de restan, y tu test tiene que ponerse en rojo con ellas. Un test que no puede fallar no comprueba nada.

---

## Día 5: toBe y toEqual: igual no es lo mismo

**Objetivo:** Hoy aprendes cuándo usar toBe y cuándo toEqual, y por qué dos objetos con el mismo contenido no son el mismo objeto.

### Microlección

**Pantalla 1 · texto**

`toBe` comprueba que dos cosas son **la misma**. Con números, textos y booleanos funciona como `===`. Pero ¿recuerdas la semana pasada? Dos objetos con el mismo contenido son **dos fichas distintas**, con signaturas distintas. Para ellos, toBe falla.

**Pantalla 2 · codigo**

```ts
const fuera = (l) =>
  l.filter((h) => h > 72);
const r = fuera([10, 80]);
test("con toBe", () => {
  expect(r).toBe([80]);
});
test("con toEqual", () => {
  expect(r).toEqual([80]);
});
```

Salida: `× con toBe` / `  Expected: [ 80 ]` / `  Received: [ 80 ]` / `✓ con toEqual`

El primer informe parece absurdo: Expected y Received son iguales… pero son dos listas distintas. `toEqual` compara **el contenido**, campo a campo y elemento a elemento: es la que se usa con listas y objetos.

**Pantalla 3 · esquema**

*¿toBe o toEqual?*

**Número, texto, booleano** → toBe: `expect(total).toBe(195)`.

↓

**Lista u objeto** → toEqual: `expect(r).toEqual([80, 96])`.

↓

**Si dudas** → Si Expected y Received se ven iguales y aun así falla, cambia toBe por toEqual.

**Pantalla 4 · deiure**

En DeIure, este test compara dos objetos de progreso calculados por caminos distintos. Como son objetos, usa toEqual: lo que importa es que su contenido coincida.

```ts
  it('projects the database completed count with the same denominator', () => {
    const fromApartados = getProjectProgress({
      '01': { finalData: 'x'.repeat(51) },
      '02': { finalData: 'x'.repeat(51) },
    });

    expect(getProjectProgressFromCompletedCount(2)).toEqual(fromApartados);
  });
```

`DeIure/src/lib/__tests__/project-progress.test.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s08-d05-r1` · concepto tests

¿Qué escribe este programa?

```ts
const exp = {
  estado: "abierto",
  dias: 12,
};
test("ficha", () => {
  expect(exp).toEqual({
    estado: "abierto",
    dias: 12,
  });
});
```

- ✅ `✓ ficha`: Eso es: toEqual compara el contenido, y coincide campo a campo.
- ▫️ `× ficha ⏎   Expected: { estado: 'abierto', dias: 12 } ⏎   Received: { estado: 'abierto', dias: 12 }`: Eso pasaría con toBe. toEqual mira el contenido, no si es la misma ficha.
- ▫️ `× ficha ⏎   Expected: 12 ⏎   Received: 12`: Se compara el objeto entero, no un campo.

Pistas: 1) ¿Qué compara toEqual? 2) El contenido, campo a campo. 3) ¿Coinciden los dos campos?

Explicación: Con objetos y listas, toEqual. Así el test comprueba lo que de verdad importa: los datos.

#### Reto 2 · Rellena el hueco · `s08-d05-r2` · concepto tests

Completa para que el test pase.

```ts
const ids = (l) => l.map((e) => e.id);
const l = [{ id: 3 }, { id: 7 }];
test("ids", () => {
  expect(ids(l)).___([3, 7]);
});
```

Objetivo: `✓ ids`

- ✅ `toEqual`: Correcto: ids(l) es una lista, y se compara su contenido.
- ▫️ `toBe`: ids(l) y [3, 7] tienen lo mismo, pero son dos listas distintas: toBe falla.
- ▫️ `equal`: No existe: el nombre es toEqual, con «to» delante y la E en mayúscula. Da un error.

Pistas: 1) ¿Qué devuelve ids: un número o una lista? 2) Una lista. 3) Con listas, ¿toBe o toEqual?

Explicación: map devuelve siempre una lista nueva, así que con toBe nunca pasaría: es la misma trampa de las referencias de la semana 7.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s08-rev-5` · concepto tests

Dos expedientes con el mismo contenido. La IA y Marta discuten si este test pasa. ¿Quién tiene razón?

```ts
const a = { estado: "abierta" };
const b = { estado: "abierta" };
test("a y b son iguales", () => {
  expect(b).toBe(a);
});
```

- La IA: Pasa. (Los dos tienen exactamente lo mismo dentro.)
- Marta: Falla. (`toBe` pide que sean el mismo objeto, y son dos. Para comparar lo de dentro está `toEqual`.)

Correcta: Marta

Pistas: 1) ¿Cuántas veces se escriben unas llaves `{ }` que crean un objeto? 2) `toBe` comprueba si es el mismo, no si se parece. 3) Recuerda `b = a` frente a `{ ...a }` de la semana 7.

Explicación: Falla, aunque Expected y Received se vean iguales. Son dos objetos con el mismo contenido. `toBe` pregunta «¿es el mismo?» y `toEqual`, «¿tiene lo mismo dentro?». Con números y textos da igual cuál uses; con objetos y listas, `toEqual`.

### Repaso (reserva)

#### Repaso 1 · Caza el fallo (Revisión) · `s08-rev-x2` · concepto tests

`horas` vale `[24, 48]`, pero el test de la IA sale en rojo. Esta vez el código está bien y el fallo está en el test. Toca la línea que está mal.

```ts
const dias = [1, 2];
const horas = dias.map((d) => d * 24);
test("pasa días a horas", () => {
  expect(horas).toBe([24, 48]);
});
```

- ✅ ``toBe` pide que sea la misma lista, y `[24, 48]` crea otra. Para comparar lo de dentro: `toEqual`.`: Exacto. Con listas y objetos, `toEqual`.
- ▫️ ``map` tiene que llevar llaves y `return`.`: Sin llaves, la flecha devuelve sola, y `horas` vale `[24, 48]`. El código está bien.
- ▫️ `Tiene que esperar `[1, 2]`.`: Esa es la lista de días. El test espera las horas, `[24, 48]`, y eso está bien. Mira cómo compara.

Pistas: 1) ¿Expected y Received se parecen? 2) Si tienen lo mismo dentro, ¿qué pregunta `toBe`? 3) Una lista escrita con `[ ]` es una lista nueva.

Explicación: Sale `×` con Expected y Received que parecen iguales: es la pista de un `toBe` con listas u objetos. `[24, 48]` crea una lista nueva, que no es `horas` aunque tenga lo mismo. Con `toEqual` pasa.

### Para nota

#### Reto difícil · ¿Qué imprime? · `s08-d05-n1` · concepto tests

Repaso de referencias con tests. ¿Qué escribe este programa?

```ts
const a = { dias: 10 };
const b = a;
const c = { ...a };
test("b", () => {
  expect(b).toBe(a);
});
test("c", () => {
  expect(c).toBe(a);
});
```

- ✅ `✓ b ⏎ × c ⏎   Expected: { dias: 10 } ⏎   Received: { dias: 10 }`: Eso es: b es la misma ficha que a, así que toBe pasa; c es una copia, otra ficha.
- ▫️ `× b ⏎   Expected: { dias: 10 } ⏎   Received: { dias: 10 } ⏎ × c ⏎   Expected: { dias: 10 } ⏎   Received: { dias: 10 }`: b no es una copia: const b = a da otro nombre a la misma ficha. toBe pasa.
- ▫️ `✓ b ⏎ ✓ c`: c se hizo con los tres puntos: es otra ficha, y toBe lo nota.

Pistas: 1) ¿Cuántas fichas hay en memoria? 2) Dos: a (que también se llama b) y la copia c. 3) toBe solo pasa si es la misma ficha.

Explicación: toBe responde a «¿es la misma ficha?» y toEqual a «¿tienen lo mismo?». Aquí b pasaría con las dos; c, solo con toEqual.

#### Escribe el programa · `s08-d05-n2` · concepto tests

fuera(lista) devuelve las horas que pasan de 72. Escribe un test llamado «fuera de plazo» que compruebe que fuera([10, 80, 96]) da [80, 96].

Datos (no se tocan):

```ts
const fuera = (l) =>
  l.filter((h) => h > 72);
```

Empieza con:

```ts
// Es una lista: ¿toBe o toEqual?
```

Tiene que salir: `✓ fuera de plazo`

Variantes ocultas:

- `const fuera = (l) => l.filter((h) => h < 72);` → `× fuera de plazo` / `  Expected: [ 80, 96 ]` / `  Received: [ 10 ]`
- `const fuera = (l) => l.map((h) => h > 72);` → `× fuera de plazo` / `  Expected: [ 80, 96 ]` / `  Received: [ false, true, true ]`

Solución:

```ts
test("fuera de plazo", () => {
  const r = fuera([10, 80, 96]);
  expect(r).toEqual([80, 96]);
});
```

Pistas: 1) Llama a fuera con [10, 80, 96] dentro del test. 2) Lo que devuelve es una lista. 3) expect(…).toEqual([80, 96]).

Explicación: Con toBe el test fallaría siempre, incluso con la función bien: por eso aquí no vale. Las variantes ocultas usan las dos versiones rotas de la semana 7: la condición al revés y map en vez de filter.

---

## Día 6: Escribir buenos tests: que puedan fallar

**Objetivo:** Hoy aprendes a elegir los casos de un test (el normal, el límite y el vacío) y a comprobar que un test sirve: tiene que poder ponerse en rojo.

### Microlección

**Pantalla 1 · texto**

Un test en verde no demuestra nada si **no podía fallar**. Un test sin `expect`, o con `expect(true).toBe(true)`, pasa siempre, haga lo que haga la función. El truco para saber si un test sirve: **rompe la función a propósito** y mira si se pone en rojo.

**Pantalla 2 · codigo**

```ts
function enPlazo(horas) {
  return horas < 72;
}
test("10 h, en plazo", () => {
  expect(enPlazo(10)).toBe(true);
});
test("72 h justas, en plazo", () => {
  expect(enPlazo(72)).toBe(true);
});
```

Salida: `✓ 10 h, en plazo` / `× 72 h justas, en plazo` / `  Expected: true` / `  Received: false`

La función tiene el fallo de siempre: `<` donde iba `<=` (el plazo de 72 horas del art. 33 incluye las 72 justas). El test de 10 horas no lo ve. Solo el del **límite** lo caza.

**Pantalla 3 · esquema**

*Qué casos probar*

**El normal** → Un dato corriente: 10 horas. Comprueba que la idea funciona.

↓

**El límite** → El propio límite y el de al lado: 72 y 73. Ahí se esconden casi todos los fallos.

↓

**El vacío** → La lista vacía, el 0, el dato que no llega. ¿Qué debe pasar?

**Pantalla 4 · deiure**

Este test de DeIure prueba un caso «vacío» fácil de olvidar: un nombre de proyecto hecho solo de espacios. `toBe(false)` comprueba que se rechaza.

```ts
  it('rejects a name made only of spaces, as the UI and the PATCH do', () => {
    expect(projectSchema.safeParse({ ...base, name: '   ' }).success).toBe(false);
```

`DeIure/src/lib/__tests__/validations-project-name.test.ts`

### Retos

#### Reto 1 · ¿Qué imprime? · `s08-d06-r1` · concepto tests

Un test para el caso vacío. ¿Qué escribe este programa?

```ts
function media(l) {
  let s = 0;
  for (const n of l) {
    s = s + n;
  }
  return s / l.length;
}
test("lista vacía", () => {
  expect(media([])).toBe(0);
});
```

- ✅ `× lista vacía ⏎   Expected: 0 ⏎   Received: NaN`: Eso es: 0 / 0 no es 0, es NaN. El caso vacío ha cazado un fallo.
- ▫️ `✓ lista vacía`: Con la lista vacía, s es 0 y l.length también: 0 / 0 da NaN.
- ▫️ `× lista vacía ⏎   Expected: 0 ⏎   Received: 0`: Si recibiera 0, pasaría. Calcula 0 / 0.

Pistas: 1) Con [], el bucle no da ninguna vuelta. 2) s vale 0 y l.length vale 0. 3) ¿Cuánto es 0 / 0 en JavaScript?

Explicación: Nadie piensa en la lista vacía hasta que llega. Por eso se prueba siempre.

#### Reto 2 · Rellena el hueco · `s08-d06-r2` · concepto tests

Esta función falla con 72 horas justas. Elige el dato que hace que el test cace el fallo, es decir, que se ponga en rojo.

```ts
function enPlazo(horas) {
  return horas < 72;
}
test("límite", () => {
  expect(enPlazo(___)).toBe(true);
});
```

Objetivo: `× límite` / `  Expected: true` / `  Received: false`

- ✅ `72`: Correcto: con el límite exacto, la función dice false y el test se pone en rojo.
- ▫️ `71`: Con 71 la función acierta: el test pasa y el fallo se escapa.
- ▫️ `10`: Un caso normal: la función acierta y el fallo no se ve.

Pistas: 1) ¿Con qué dato se equivoca la función? 2) Con el que está justo en el límite. 3) Ni uno menos ni uno más: el propio límite.

Explicación: El fallo solo existe en un punto, el 72. Un test que no lo prueba sale en verde aunque la función esté mal.

#### Reto 3 · Caza el fallo (Revisión) · `s08-rev-6` · concepto tests

La IA dice: «El test pasa en verde, así que enPlazo funciona». Pero con 72 horas justas devuelve `false`. ¿Por qué no lo caza el test? Toca la línea del test que está mal.

```ts
function enPlazo(horas) {
  return horas < 72;
}
test("72 h justas, en plazo", () => {
  enPlazo(72);
});
```

- ✅ `Llama a la función, pero no comprueba nada. Sin `expect`, el test pasa siempre. Falta `expect(enPlazo(72)).toBe(true);`.`: Exacto. Un test sin `expect` no puede fallar, y un test que no puede fallar no prueba nada.
- ▫️ `El nombre del test está mal escrito.`: El nombre solo sirve para el informe. Lo que importa es qué comprueba dentro.
- ▫️ `Falta un `console.log(enPlazo(72))` dentro del test.`: Así verías `false`, pero el test seguiría en verde. Lo que hace fallar un test es `expect`.

Pistas: 1) ¿Qué comprueba el test? 2) Un test falla cuando un `expect` no se cumple. 3) ¿Hay algún `expect` en el test?

Explicación: Con el fallo sale `✓`, en verde. Con el `expect`, sale `×` con Expected `true` y Received `false`: ahora sí caza el fallo de `enPlazo`. Antes de fiarte de un verde, mira que cada test tenga un `expect` que compare con el valor correcto.

### Repaso (reserva)

#### Repaso 1 · ¿Quién tiene razón? (Revisión) · `s08-rev-x1` · concepto tests

La IA ha escrito este test y dice que prueba su función. La IA y Marta discuten. ¿Quién tiene razón?

```ts
function quedan(horas) {
  return 72 + horas;
}
test("quedan funciona", () => {
  quedan(50);
  expect(true).toBe(true);
});
```

- La IA: Pasa, y eso prueba que `quedan` funciona. (Llama a la función y tiene su `expect`.)
- Marta: Pasa, pero no prueba nada. (Compara `true` con `true`, haga lo que haga `quedan`.)

Correcta: Marta

Pistas: 1) ¿Qué compara el `expect`? 2) ¿Puede `true` no ser `true`? 3) ¿Se usa en algún sitio lo que devuelve `quedan(50)`?

Explicación: Sale `✓`, pero el test no puede fallar: `expect(true).toBe(true)` se cumple siempre. Es un truco que a veces usan las IA para que todo salga en verde. Un `expect` tiene que comparar lo que devuelve el código con el valor correcto: `expect(quedan(50)).toBe(22)`.

#### Repaso 2 · ¿Quién tiene razón? (Revisión) · `s08-rev-x4` · concepto tests

La IA ha escrito dos tests para `enPlazo` y los dos salen en verde. La IA y Marta discuten si basta. ¿Quién tiene razón?

```ts
function enPlazo(horas) {
  return horas < 72;
}
test("10 h, en plazo", () => {
  expect(enPlazo(10)).toBe(true);
});
test("100 h, fuera", () => {
  expect(enPlazo(100)).toBe(false);
});
```

- Marta: Basta: los dos pasan. (Prueban un caso dentro del plazo y otro fuera.)
- La IA: No basta: falta el límite. (Con 72 horas justas, `enPlazo` devuelve `false`, y ningún test lo prueba.)

Correcta: La IA

Pistas: 1) ¿Dónde se esconden los fallos de `<` y `<=`? 2) ¿Hay algún test con el valor del límite? 3) ¿Qué devuelve `enPlazo(72)`?

Explicación: Salen dos `✓`, pero `enPlazo(72)` da `false` aunque el art. 33 RGPD dice «sin dilación indebida y, de ser posible, a más tardar 72 horas después de que haya tenido constancia». Para elegir los casos de un test: uno normal, el propio límite y, si hay listas, la vacía. Que todo esté en verde solo dice que pasan los casos que alguien eligió.

### Para nota

#### Reto difícil · ¿Qué imprime? · `s08-d06-n1` · concepto tests

Tests dentro de un bucle, uno por caso. ¿Qué escribe este programa?

```ts
function nivel(n) {
  if (n > 100) {
    return "alto";
  }
  return "bajo";
}
const casos = [50, 100, 101];
for (const n of casos) {
  test(`${n}`, () => {
    expect(nivel(n)).toBe("bajo");
  });
}
```

- ✅ `✓ 50 ⏎ ✓ 100 ⏎ × 101 ⏎   Expected: 'bajo' ⏎   Received: 'alto'`: Eso es: 100 no es mayor que 100, así que es bajo; 101 ya es alto.
- ▫️ `✓ 50 ⏎ × 100 ⏎   Expected: 'bajo' ⏎   Received: 'alto' ⏎ × 101 ⏎   Expected: 'bajo' ⏎   Received: 'alto'`: 100 > 100 es false: con 100 devuelve bajo.
- ▫️ `✓ 50 ⏎ ✓ 100 ⏎ ✓ 101`: 101 es mayor que 100: devuelve alto, y el test espera bajo.

Pistas: 1) Hay un test por cada número de casos. 2) Calcula nivel con cada uno. Ojo con el 100. 3) Los textos salen entre comillas en el informe.

Explicación: Un bucle de tests prueba muchos casos con poco código. El nombre de cada test, aquí el número, dice cuál ha fallado.

#### Escribe el programa · `s08-d06-n2` · concepto tests

Escribe dos tests para enPlazo: «72 h, en plazo», que compruebe que enPlazo(72) da true, y «73 h, fuera», que compruebe que enPlazo(73) da false.

Datos (no se tocan):

```ts
function enPlazo(horas) {
  return horas <= 72;
}
```

Empieza con:

```ts
// Un test para el límite
// y otro para el de al lado
```

Tiene que salir: `✓ 72 h, en plazo` / `✓ 73 h, fuera`

Variantes ocultas:

- `function enPlazo(horas) { return horas < 72; }` → `× 72 h, en plazo` / `  Expected: true` / `  Received: false` / `✓ 73 h, fuera`
- `function enPlazo(horas) { return horas <= 73; }` → `✓ 72 h, en plazo` / `× 73 h, fuera` / `  Expected: false` / `  Received: true`

Solución:

```ts
test("72 h, en plazo", () => {
  expect(enPlazo(72)).toBe(true);
});
test("73 h, fuera", () => {
  expect(enPlazo(73)).toBe(false);
});
```

Pistas: 1) Dos tests, uno detrás de otro, con los nombres exactos. 2) Dentro de expect, la llamada; dentro de toBe, true o false. 3) No cambies el orden: expect(lo que da la función).toBe(lo que debería dar).

Explicación: Las variantes ocultas rompen la función por un lado y por el otro del límite, y cada uno de tus tests caza uno de los fallos. Por eso hacen falta los dos.

---

## Día 7: Píldora: Git por dentro, fotos del proyecto (píldora de informática)

**Objetivo:** Hoy aprendes cómo guarda Git la historia: cada commit es una foto que apunta a la anterior, y una rama es solo una etiqueta que apunta a una foto.

### Microlección

**Pantalla 1 · texto**

Cada commit es una **foto completa** del proyecto, con un código único (el **hash**, como c3f9e21), el autor, la fecha, el mensaje y un dato clave: **qué foto había antes**, su padre. Las fotos forman una cadena, como las actas de un libro registro: cada una se numera, remite a la anterior y, en el uso normal, ninguna se arranca. Para cambiar algo, se añade un acta nueva.

**Pantalla 2 · esquema**

*La cadena de fotos*

**a91c3e8** → «Primer commit». No tiene padre: es el principio.

↓

**b27a0d4** → «Datos de la brecha». Su padre es a91c3e8.

↓

**c3f9e21** → «Informe». Su padre es b27a0d4. Aquí apuntan main y HEAD.

**Pantalla 3 · texto**

Una **rama** no es una copia del proyecto: es una **etiqueta** que apunta a una foto, igual que una variable apunta a un objeto (la referencia de la semana 7). Por eso crear una rama es instantáneo. Al hacer un commit, la foto nueva toma como padre la anterior y la etiqueta de tu rama **avanza** hasta ella. **HEAD** es el «usted está aquí»: la rama en la que estás.

**Pantalla 4 · deiure**

Como el mensaje de cada foto queda para siempre, DeIure fija cómo escribirlo: el tipo de cambio, el área entre paréntesis y qué se hizo. Por ejemplo, `fix(files): reemplazar conserva el historial`.

```ts
- **Conventional commits**: `tipo(scope): descripción`. Tipos: `feat` · `fix` · `docs` · `test` · `refactor` · `chore` · `perf`.
```

`CLAUDE.md`

**Pantalla 5 · terminal**

```
$ git log --oneline
c3f9e21 (HEAD -> main) Informe
b27a0d4 Datos de la brecha
a91c3e8 Primer commit
```

**Comando de la semana: git status, git log y git diff.** `git status` dice cómo está cada fichero; `git diff`, qué ha cambiado línea a línea; `git log --oneline`, la cadena de fotos, de la más nueva a la más vieja. **Minirreto en tu Mac:** `mkdir fotos`, `cd fotos`, `git init` y `echo "hola" > a.txt`. Después: `git status`, `git add a.txt`, `git commit -m "Primera foto"` y `git log --oneline`. Si Git te pide tu nombre y tu email, te dice la orden exacta para dárselos.

### Retos

#### Reto 1 · elegir · `s08-d07-r1` · concepto git

Esto dice git log. ¿Cuál fue el primer commit del proyecto?

- ✅ `41be6a0 Inicio`: Eso es: git log va de la foto más nueva (arriba) a la más vieja (abajo).
- ▫️ `e81a2b3 Plazos`: Ese es el más reciente: git log empieza por arriba con la última foto.
- ▫️ `Ninguno: falta información`: La última línea es la foto sin padre: el principio.

Pistas: 1) ¿git log empieza por la foto más nueva o por la más vieja? 2) Por la más nueva, arriba. 3) La primera de todas está abajo del todo.

Explicación: Arriba, lo último; abajo, el origen. Al revés que un libro registro en papel.

#### Reto 2 · elegir · `s08-d07-r2` · concepto git

Estás en la rama informe. ¿Qué commit tiene informe que main no tiene?

- ✅ `d4e5f60 Tabla`: Eso es: la etiqueta main está en c3f9e21, una foto por detrás. Tabla solo está en informe.
- ▫️ `c3f9e21 Informe`: Ahí apunta main: esa foto la tienen las dos ramas.
- ▫️ `Todos`: main contiene su foto y todas las anteriores: c3f9e21 y b27a0d4.

Pistas: 1) Busca dónde está cada etiqueta, entre paréntesis. 2) main apunta a c3f9e21; informe, a d4e5f60. 3) Una rama contiene su foto y todas las de debajo.

Explicación: Las ramas son etiquetas en la misma cadena. informe avanzó una foto; main se quedó donde estaba.

#### Reto 3 · ¿Quién tiene razón? (Revisión) · `s08-rev-7` · concepto git

Esto dice `git log --oneline`. La IA y Marta discuten qué es `main`. ¿Quién tiene razón?

```ts
$ git log --oneline
c3f9e21 (HEAD -> main) Informe
b27a0d4 Datos de la brecha
a91c3e8 Primer commit
```

- La IA: Una copia completa del proyecto, guardada aparte. (Cada rama tiene sus propios ficheros.)
- Marta: Es el commit `c3f9e21`, y ya no cambia. (Al lado de ese commit pone `main`.)

Correcta: ninguno

Pistas: 1) ¿Qué pasará con `main` cuando hagas otro commit? 2) Cada commit apunta al anterior, como una cadena de fotos. 3) Una rama es como un nombre que apunta a un objeto, igual que en la semana 7.

Explicación: `main` es una etiqueta que apunta a un commit; ahora, a `c3f9e21`. Cada commit apunta a su padre (`b27a0d4`, y este a `a91c3e8`). Al hacer otro commit, la etiqueta avanza. Por eso crear una rama es instantáneo: solo es una etiqueta nueva.

### Repaso (reserva)



### Para nota

#### Reto difícil · ¿Qué imprime? · `s08-d07-n1` · concepto git

Tres commits, A, B y C, y cada uno apunta a su padre (null significa «ninguno»). Este programa recorre la cadena. ¿Qué escribe?

```ts
const a = { msg: "A", padre: null };
const b = { msg: "B", padre: a };
const c = { msg: "C", padre: b };
let x = c;
while (x !== null) {
  console.log(x.msg);
  x = x.padre;
}
```

- ✅ `C ⏎ B ⏎ A`: Eso es: empieza por c y salta de padre en padre hasta null. Es lo que hace git log.
- ▫️ `A ⏎ B ⏎ C`: Empieza por c, el más nuevo, y va hacia atrás.
- ▫️ `C`: El while sigue mientras x no sea null: salta al padre en cada vuelta.

Pistas: 1) x empieza siendo c. 2) En cada vuelta, x pasa a ser su padre. 3) ¿Cuándo se para? Cuando llega a null.

Explicación: Cada campo padre es una referencia a otro objeto. Git guarda la historia exactamente así.

#### Escribe el programa · `s08-d07-n2` · concepto git

Imita a git log --oneline: escribe el id y el mensaje de cada commit separados por un espacio. Al primero (el más nuevo) ponle «(HEAD -> main)» entre los dos.

Datos (no se tocan):

```ts
const log = [
  { id: "c3f9e21", msg: "Informe" },
  { id: "a91c3e8", msg: "Inicio" },
];
```

Empieza con:

```ts
// Recorre log con su posición
// El de la posición 0 es especial
```

Tiene que salir: `c3f9e21 (HEAD -> main) Informe` / `a91c3e8 Inicio`

Variantes ocultas:

- `const log = [ { id: "41be6a0", msg: "Inicio" }, ];` → `41be6a0 (HEAD -> main) Inicio`
- `const log = [ { id: "e81a2b3", msg: "Plazos" }, { id: "7c0d9f1", msg: "Brechas" }, { id: "41be6a0", msg: "Inicio" }, ];` → `e81a2b3 (HEAD -> main) Plazos` / `7c0d9f1 Brechas` / `41be6a0 Inicio`

Solución:

```ts
for (let i = 0; i < log.length; i++) {
  const e = log[i];
  if (i === 0) {
    console.log(e.id,
      "(HEAD -> main)", e.msg);
  } else {
    console.log(e.id, e.msg);
  }
}
```

Pistas: 1) Necesitas saber la posición: un for clásico con i. 2) Si i es 0, el commit lleva la etiqueta. 3) console.log con varios datos separados por coma los une con un espacio.

Explicación: La etiqueta solo va en el primero porque HEAD y main apuntan a la foto más nueva.

