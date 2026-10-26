# Chuleta de la semana 4: bucles y algoritmos

## for: cuando sabes cuántas vueltas

```ts
for (let i = 1; i <= 3; i++) {
  console.log("Aviso", i);
}
```

| Parte | En el ejemplo | Cuándo se hace |
| --- | --- | --- |
| Inicio | `let i = 1` | Una vez, al principio |
| Condición | `i <= 3` | Antes de cada vuelta |
| Paso | `i++` | Al final de cada vuelta |

- `i++` es `i = i + 1`; `i--` es `i = i - 1`.
- El paso puede ser cualquier cosa: `i = i + 2`, `i = i * 2`…

## while: mientras se cumpla

```ts
let dias = 3;
while (dias > 0) {
  dias = dias - 1;
}
```

`while` no trae contador: algo **dentro** tiene que cambiar la condición.

## Acumulador

```ts
let total = 0;
for (let i = 1; i <= 4; i++) {
  total = total + i;
}
console.log(total); // 10
```

Se crea **fuera** del bucle. Para sumar empieza en 0; para multiplicar, en 1.

## Bucle infinito

Si la condición nunca llega a ser `false`, el bucle no acaba. En el taller sale «Demasiadas vueltas». En la terminal, se para con **Ctrl + C**.

## Algoritmos

Un algoritmo es una lista de pasos precisos que termina. Escríbelo primero en tu idioma (pseudocódigo). Dos algoritmos con el mismo resultado pueden trabajar muy distinto: buscar entre 1000 uno a uno puede costar 1000 pasos; partiendo por la mitad, unos 10.

## Para revisar código de una IA

- **Error de uno:** ¿cuál es el primer valor y el último que entra? `<` deja fuera el límite; `<=` lo incluye.
- ¿El acumulador se crea fuera del bucle y empieza en el valor correcto?
- ¿Algo dentro del bucle hace avanzar la condición, en la dirección correcta?
- Con `!==` en la condición, ¿el contador puede saltarse el valor?

## Terminal de la semana

`mkdir carpeta` crea, `cp a b` copia, `mv a b` mueve o renombra, `rm a` borra **sin papelera**.
