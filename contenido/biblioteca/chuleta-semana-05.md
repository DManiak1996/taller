# Chuleta de la semana 5: listas

## Crear y leer

```ts
const plazos = [72, 30, 15];
console.log(plazos[0]);     // 72
console.log(plazos.length); // 3
```

- Una lista (array) va entre corchetes, con los datos separados por comas.
- Las posiciones empiezan en **0**. El último está en `length - 1`.
- Pedir una posición que no existe no da error: da `undefined`.

## Cambiar y añadir

```ts
const e = ["abierta", "abierta"];
e[1] = "cerrada";
e.push("nueva");
```

- `lista[i] = valor` cambia un dato; `push` añade al final.
- Una lista `const` se puede llenar y cambiar por dentro. Lo que no se puede es poner otra lista en la caja.

## Recorrer

```ts
for (let i = 0; i < t.length; i++) {
  console.log(i, t[i]);
}

for (const x of t) {
  console.log(x);
}
```

| | for clásico | for…of |
| --- | --- | --- |
| Te da | la posición `i` | cada dato |
| Úsalo si | necesitas la posición | solo necesitas los datos |
| Riesgo | error de uno con `<=` | casi ninguno |

`for…in` existe, pero da las posiciones, no los datos.

## Patrones

- **Sumar:** `total = total + n`.
- **Contar:** `if (…) { n = n + 1; }`.
- **Buscar:** una bandera que empieza en `false` y pasa a `true`.
- **El mayor:** `if (n > max) { max = n; }`.

## Listas frente a diccionarios

Una lista es el libro de registro numerado: guarda el orden, pero para buscar por nombre hay que mirar uno a uno (con 1000, hasta 1000 pasos). Un diccionario es el índice alfabético: va directo por nombre (un paso). Lo verás pronto con los objetos.

## Para revisar código de una IA

- ¿La condición es `i < lista.length` y no `<=`?
- ¿Usa `[0]` para el primero y `length - 1` para el último?
- ¿El acumulador o la bandera están fuera del bucle?
- ¿Acumula o pisa el valor en cada vuelta?
- ¿Busca una y otra vez en una lista enorme?

## Terminal de la semana

`grep texto fichero` enseña las líneas donde aparece. `-n` con número de línea, `-i` sin distinguir mayúsculas, `-r` en toda una carpeta.
