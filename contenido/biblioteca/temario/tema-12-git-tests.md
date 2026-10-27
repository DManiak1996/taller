---
semana: 8
orden: 12
---

# Tema 12. Git y tests

Git guarda la historia de un proyecto como una cadena de fotos (commits) y permite trabajar en ramas sin tocar la versión principal. Un test es una comprobación automática que llama al código con un dato conocido y compara el resultado con el esperado.

## Sintaxis

Git, en la terminal:

```
git status
git add informe.ts
git commit -m "Añade informe"
git diff
git log --oneline
git switch -c informe
git switch main
git branch
```

| Orden | Qué hace |
| --- | --- |
| `git status` | Dice cómo está cada fichero: preparado, modificado o sin seguimiento |
| `git add fichero` | Prepara el fichero para la próxima foto |
| `git commit -m "…"` | Hace la foto de lo preparado, con un mensaje |
| `git diff` | Enseña las líneas cambiadas que aún no están preparadas |
| `git log --oneline` | Lista las fotos, de la más nueva a la más vieja |
| `git switch -c nombre` | Crea una rama y se cambia a ella |
| `git switch nombre` | Se cambia a una rama que ya existe |
| `git branch` | Lista las ramas; el asterisco marca la actual |

Tests:

```ts
test("nombre del caso", () => {
  expect(valor).toBe(esperado);
});
expect(lista).toEqual([80, 96]);
```

- `test(nombre, fn)` define una comprobación. El nombre dice qué se comprueba.
- `expect(x).toBe(y)` comprueba que x es y (como `===`). Para números, textos y booleanos.
- `expect(x).toEqual(y)` compara el contenido, campo a campo. Para listas y objetos.
- Se escribe primero lo que da el código y después lo que debería dar: `expect(funcion(dato)).toBe(esperado)`.
- Vitest (las misiones) y Jest (DeIure) se escriben casi igual. Jest acepta también `it` en vez de `test`, y los dos agrupan tests con `describe`. En Vitest, el fichero empieza con `import { test, expect } from "vitest";`.

## Ejemplos

Los tres estados de un cambio:

```
$ git status
Changes to be committed:
  modified:   informe.ts
Changes not staged for commit:
  modified:   datos.ts
Untracked files:
  notas.txt
```

`informe.ts` entra en el próximo commit; `datos.ts` está cambiado pero sin `git add`; `notas.txt` es nuevo y Git aún no lo vigila.

Un diff: `-` (rojo) es lo quitado, `+` (verde) lo añadido, y sin marca, lo que sigue igual. Cambiar una línea se ve como una `-` y una `+`.

```diff
 const plazo = 72;
-const aviso = 48;
+const aviso = 60;
```

Un test que pasa y otro que falla:

```ts
const doble = (n) => n * 2;
test("doble de 2", () => {
  expect(doble(2)).toBe(4);
});
test("doble de 3", () => {
  expect(doble(3)).toBe(5);
});
// ✓ doble de 2
// × doble de 3
//   Expected: 5
//   Received: 6
```

**Expected** es lo que el test esperaba (lo de `toBe`); **Received**, lo que devolvió el código.

## Git por dentro

- Cada commit es una foto completa del proyecto con un código único (hash, como `c3f9e21`), autor, fecha, mensaje y un enlace a la foto anterior, su padre. Las fotos forman una cadena.
- Una rama es una etiqueta que apunta a una foto, como una variable que apunta a un objeto. Al hacer un commit, la etiqueta de la rama avanza a la foto nueva.
- `HEAD` indica la rama en la que se está.
- Un commit solo guarda lo preparado con `git add`.

## Buenos tests

- Un test tiene que **poder fallar**. Sin `expect`, o con `expect(true).toBe(true)`, pasa siempre.
- Para saber si sirve: romper la función a propósito y ver si se pone en rojo.
- Probar tres tipos de caso: el **normal**, el **límite** (el propio límite y el de al lado: 72 y 73) y el **vacío** (la lista vacía, el 0, el dato que falta).
- Si Expected y Received se ven iguales y aun así falla, son dos listas u objetos distintos: hay que usar `toEqual`.
- Un error dentro de un test lo pone en rojo, pero los demás tests se siguen ejecutando.

## Errores típicos

- **Hacer el commit sin `git add`:** no se guarda nada, o se guarda solo lo que ya estaba preparado.
- **`git add .`** prepara todo, también ficheros que no deberían subir nunca (contraseñas, notas personales).
- **Commit en la rama equivocada:** no mirar antes en qué rama se está (`git branch` o `git status`).
- **`git switch -c` con una rama que ya existe:** da `fatal`, y no hace nada.
- **`toBe` con listas u objetos:** falla aunque el contenido sea igual.
- **Test sin `expect`:** sale en verde sin comprobar nada.
- **Expected y Received al revés:** escribir `expect(esperado).toBe(funcion())` confunde el informe.
- **Probar solo casos normales:** el fallo del límite se escapa.

## Revisar código de una IA

- Leer el diff entero antes de aceptar un cambio. Cada `-` y cada `+` debe corresponder a algo que se pidió.
- Desconfiar de un «solo he cambiado X» si el diff toca más líneas.
- Antes de un commit, `git status`: ¿se prepara solo lo que toca? ¿Se cuela algún `.env` o fichero ajeno?
- Ante un test en verde: ¿tiene `expect`? ¿Podría fallar? Romper la función a propósito para comprobarlo.
- ¿Los tests prueban el límite y el caso vacío, o solo un caso cómodo?
- Si la IA «arregla» un test cambiando lo que espera en vez del código, desconfiar: el test es el contrato.

## Documentación oficial

- [Guardando cambios en el Repositorio](https://git-scm.com/book/es/v2/Fundamentos-de-Git-Guardando-cambios-en-el-Repositorio) (libro Pro Git, en español): `git status`, `git add`, `git diff` y `git commit`.
- [Ver el Historial de Confirmaciones](https://git-scm.com/book/es/v2/Fundamentos-de-Git-Ver-el-Historial-de-Confirmaciones) (Pro Git): `git log`.
- [¿Qué es una rama?](https://git-scm.com/book/es/v2/Ramificaciones-en-Git-%c2%bfQu%c3%a9-es-una-rama%3F) (Pro Git): commits, ramas y `HEAD`, con dibujos.
- [Using Matchers](https://jestjs.io/docs/using-matchers) (documentación de Jest, en inglés): `toBe`, `toEqual` y los demás.
- [expect](https://vitest.dev/api/expect) (documentación de Vitest, en inglés).

## Búscalo tú

En el capítulo «¿Qué es una rama?» del libro Pro Git: ¿cómo define el libro una rama en una frase? ¿Y cuánto ocupa crear una rama nueva?

---

**Respuesta:** «Una rama Git es simplemente un apuntador móvil apuntando a una de esas confirmaciones». Crear una rama es escribir 41 bytes en un archivo: los 40 caracteres del código de la foto y un salto de línea. Por eso es instantáneo: no se copia nada, solo se crea una etiqueta nueva.
