# Chuleta de la semana 3: decisiones

## Comparar

| Signo | Significa | `5 ? 3` |
| --- | --- | --- |
| `===` | igual | `false` |
| `!==` | distinto | `true` |
| `>` / `<` | mayor / menor | `true` / `false` |
| `>=` / `<=` | mayor o igual / menor o igual | `true` / `false` |

Una comparación da `true` o `false`. Usa siempre `===`, con tres iguales.

## if, else if, else

```ts
if (afectados > 1000) {
  console.log("Alto");
} else if (afectados > 100) {
  console.log("Medio");
} else {
  console.log("Bajo");
}
```

- Las preguntas se hacen **en orden** y gana la **primera** que da `true`. Solo se ejecuta un camino.
- Ordena de la condición más exigente a la menos.

## Y, o, no

- `&&` («y»): da `true` si se cumplen **todas**. Requisitos acumulativos.
- `||` («o»): da `true` si se cumple **al menos una**. Supuestos alternativos.
- `!` («no»): le da la vuelta. `!true` es `false`.

`&&` va antes que `||`. Si mezclas los dos, pon paréntesis.

**De Morgan:** «no (A y B)» es lo mismo que «(no A) o (no B)».

En el Mac: `&` con Mayúsculas + 6; `|` con Alt + 1.

## Para revisar código de una IA

- ¿La condición está al revés (`>` donde iba `<=`)? Prueba un dato de cada lado del límite, y el propio límite.
- ¿Pide **todos** los requisitos (`&&`) o basta **uno** (`||`)?
- En una cadena de `else if`, ¿hay algún camino al que no se llegue nunca?
