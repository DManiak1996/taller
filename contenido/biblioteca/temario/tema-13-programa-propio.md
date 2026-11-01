---
semana: 9
orden: 13
---

# Tema 13. Tu propio programa y la eficiencia

Un programa propio se construye por partes: primero el plan (qué entra, qué reglas se aplican y qué sale), después las reglas en tablas, el cálculo en funciones pequeñas, los tests y, al final, una revisión. La eficiencia mide cuántos pasos da el programa cuando la lista de datos crece.

## Sintaxis

El plan, en comentarios, antes del código:

```ts
// Entrada: tipo de plazo y tiempo pasado
// Reglas: límite y aviso de cada tipo
// Cálculo: lo que queda
// Salida: «en plazo», «urgente» o «vencido»
```

Las reglas, en tablas (objetos), no como números sueltos:

```ts
const limites = {
  brecha: 72,  // horas: el plazo de 72 horas del art. 33
  acceso: 30,  // días: plazo interno del despacho (el art. 12.3 da un mes)
};
const avisos = {
  brecha: 24,
  acceso: 5,
};
limites["brecha"]  // 72
limites[tipo]      // la clave sale de la variable tipo
limites["queja"]   // undefined: la clave no existe
```

## Ejemplos

La calculadora completa (versión 2):

```ts
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
estado("brecha", 72)   // "urgente": quedan 0, aún en plazo
estado("brecha", 73)   // "vencido"
estado("acceso", 25)   // "urgente": quedan 5 días
estado("queja", 5)     // "desconocido"
```

- Primero se descartan los datos raros; después, de lo más grave a lo menos grave. El primer `return` que se cumple termina la función.
- `< 0` deja el propio límite dentro del plazo; `<= 0` lo daría por vencido.

Aplicada a una lista de expedientes:

```ts
const exps = [
  { id: 7, tipo: "brecha", t: 80 },
  { id: 9, tipo: "brecha", t: 70 },
];
for (const e of exps) {
  console.log(e.id, estado(e.tipo, e.t));
}
// 7 vencido
// 9 urgente
```

Tests de los tres tipos de caso:

```ts
test("normal", () => {
  expect(estado("acceso", 10)).toBe("en plazo");
});
test("límite", () => {
  expect(estado("brecha", 72)).toBe("urgente");
});
test("raro", () => {
  expect(estado("queja", 5)).toBe("desconocido");
});
```

Lo que va en `toBe` sale de la norma, no de ejecutar el programa.

## Eficiencia: contar pasos

| Código | Pasos con n elementos | Con 1.000 |
| --- | --- | --- |
| Un bucle (`for`, `map`, `filter`) | n | 1.000 |
| Dos bucles seguidos | n + n | 2.000 |
| Un bucle dentro de otro | n × n | 1.000.000 |
| `find` | de 1 a n: se para al encontrar | entre 1 y 1.000 |
| Buscar por clave (`limites[tipo]`, un `Map`) | 1 | 1 |

- Bucles seguidos se suman; bucles anidados se multiplican.
- Un bucle dentro de otro a veces hace falta (comparar cada elemento con todos los demás). Si sobra, es el fallo de eficiencia más típico.
- Para buscar muchas veces por un dato (un id, un tipo), una tabla con esa clave evita recorrer la lista cada vez.

## Permisos y sudo

```
$ ls -l hola.sh
-rw-r--r--  1 daniel  staff  10  1 nov 10:00 hola.sh
$ chmod +x hola.sh
$ ls -l hola.sh
-rwxr-xr-x  1 daniel  staff  10  1 nov 10:00 hola.sh
$ ./hola.sh
Hola
```

- Las letras del principio son los permisos: `r` leer, `w` escribir, `x` ejecutar. Van en tres grupos: el dueño, su grupo y todos los demás.
- `chmod +x fichero` da el permiso de ejecutar; `chmod -x`, lo quita.
- `./hola.sh` ejecuta el guion de la carpeta actual. Sin la `x` da `permission denied`.
- `sudo orden` ejecuta la orden como administrador: pide la contraseña y el sistema deja de proteger sus propios ficheros.

## Errores típicos

- **Números mágicos:** el 72 escrito dentro del cálculo, o el mismo 5 usado para horas y para días.
- **Argumentos al revés:** `quedan(80, "brecha")` no da error, da `NaN`, y una cadena de `if` con `NaN` acaba en el último `return`.
- **Un tipo o un campo mal escrito:** `limites["Brecha"]` o `e.horas` dan `undefined`, y la resta da `NaN` sin avisar.
- **Un número que llega como texto:** `72 - "40"` da 32 sin error; `typeof` lo detecta.
- **Los `if` en mal orden:** si «urgente» (`<= 5`) va antes que «vencido» (`< 0`), nunca sale «vencido».
- **Probar solo el caso normal:** los fallos de plazos están en el límite.
- **`sudo` para saltarse un error de permisos:** el permiso que falta se da con `chmod`.

## Revisar código de una IA

- ¿Se puede decir en una frase qué problema resuelve el programa? Si no, falta el plan.
- ¿Hay números sueltos en el cálculo? ¿De dónde sale cada uno? Mejor en una tabla con nombre.
- ¿Qué pasa con un tipo que no existe, un campo mal escrito o un número como texto? Si sale «en plazo», es un fallo grave.
- ¿Los `if` van del caso más grave al menos grave, y se puede llegar a cada uno?
- ¿Lo que esperan los tests sale de la norma? ¿Prueban el límite (72 y 73) además del caso normal?
- ¿Sobran comprobaciones de cosas que no pueden pasar? También se revisa lo que sobra.
- ¿Hay un bucle dentro de otro? ¿Hace falta, o basta con uno, con `find` o con una clave?
- Nunca ejecutar una orden con `sudo` que no se entiende, la proponga quien la proponga.

## Documentación oficial

- [Array.prototype.find()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find) (MDN, en español): devuelve el primer elemento que cumple la condición.
- [typeof](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/typeof) (MDN, en español).
- [Map](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Map) (MDN, en español): una tabla con clave.
- `man chmod` y `man sudo`, en la propia terminal del Mac.

## Búscalo tú

En el manual de `chmod` (`man chmod`), en la parte de los modos simbólicos: además de `+` (añadir) y `-` (quitar), ¿qué otro signo existe, y qué hace?

---

**Respuesta:** `=`. Fija los permisos exactamente a los que se escriben y quita los demás. Por ejemplo, `chmod u=rw hola.sh` deja al dueño solo leer y escribir: si tenía la `x`, la pierde.
