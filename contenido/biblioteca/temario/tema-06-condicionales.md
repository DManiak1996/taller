---
semana: 3
orden: 6
---

# Tema 6. Condicionales: if, else if, else

Una sentencia condicional ejecuta un bloque de código solo si se cumple una condición.

## Sintaxis

```ts
if (condición) {
  // si la condición es true
} else if (otraCondición) {
  // si no, y otraCondición es true
} else {
  // en cualquier otro caso
}
```

- `if` («si») puede ir solo. `else if` («si no, si») y `else` («si no») son opcionales.
- Las condiciones se evalúan **en orden, de arriba abajo**. Se ejecuta el bloque de la **primera** que da `true` y se ignoran las demás.
- Se ejecuta como máximo un bloque. Con `else`, exactamente uno.
- El código entre llaves `{ }` es un **bloque**. Por convención, va sangrado dos espacios.
- La condición puede ser directamente un booleano: `if (consiente)` equivale a `if (consiente === true)`.

## Ejemplos

```ts
const afectados = 500;
if (afectados > 1000) {
  console.log("Riesgo alto");
} else if (afectados > 100) {
  console.log("Riesgo medio");
} else {
  console.log("Riesgo bajo");
}
// Riesgo medio
```

(Regla inventada para el ejemplo, no un criterio legal.)

## Errores típicos

- **Orden incorrecto en una cadena de `else if`:** si `afectados > 100` va antes que `afectados > 1000`, un caso de 5000 se clasifica como medio y el camino «alto» no se alcanza nunca. Se ordena de la condición más exigente a la menos.
- **Condición al revés:** `>` donde iba `<=`. El programa no da error, pero decide lo contrario.
- **Código fuera del bloque:** una línea después de la llave de cierre se ejecuta siempre, se cumpla o no la condición.
- **`elif` o `elseif`:** no existen en JavaScript ni TypeScript; se escribe `else if`, con espacio.

## Revisar código de una IA

- ¿Existe algún valor que caiga en el camino equivocado? Probar un valor de cada tramo y los límites exactos.
- ¿Hay algún camino al que no se pueda llegar nunca? Suele indicar un orden incorrecto.
- ¿El `else` final recoge solo los casos que debe?

## Documentación oficial

- [if...else](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/if...else) (MDN).

## Búscalo tú

La página de `if...else` en MDN recomienda una buena práctica sobre las llaves. ¿Cuál es, y en qué caso se vuelve más importante?

---

**Respuesta:** usar siempre bloques con llaves (`{ }`), aunque contengan una sola línea. Es especialmente importante cuando hay sentencias `if` anidadas (unas dentro de otras): sin llaves, un `else` puede quedar unido al `if` equivocado.
