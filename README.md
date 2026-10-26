# Taller

Mi taller de programación: una web que abro en el iPhone para el reto diario (10 minutos) y en el ordenador para las misiones.

**Web:** https://dmaniak1996.github.io/taller/ (en el iPhone: Safari › Compartir › Añadir a pantalla de inicio)

## Cómo es una sesión

1. Una microlección de un concepto, con un visualizador paso a paso.
2. Tres retos que se responden tocando: ¿qué imprime esto?, rellena el hueco, ordena las líneas, caza el fallo de la IA y ¿quién tiene razón?
3. Un repaso de algo que fallé hace 1, 3 o 7 días.
4. La racha y el avance en el mapa de conceptos.

## Cómo está hecho

| Carpeta | Qué hay |
|---|---|
| `contenido/` | Las lecciones y retos, en JSON. `formato.ts` dice qué forma tienen. |
| `misiones/` | Las fichas de las misiones que hago en el ordenador. |
| `src/sandbox/` | El sandbox: ejecuta el código de los retos dentro del navegador, aislado y sin red. |
| `src/progreso/` | La racha, el repaso espaciado y el guardado (en el dispositivo y en Supabase). |
| `src/pantallas/`, `src/ui/` | Las pantallas, en React. |
| `test/` | Las pruebas. `contenido.test.ts` **ejecuta** cada ejemplo y cada reto y comprueba que la respuesta correcta es de verdad la correcta. |
| `supabase/esquema.sql` | Las tablas del progreso, con reglas para que solo yo vea mis datos. |

Hecho con TypeScript, React y Vite. Cada vez que algo llega a `main`, GitHub Actions pasa las pruebas y, si todas salen bien, publica la web.

## Probarlo en mi ordenador

```sh
npm install
npm test        # todas las pruebas
npm run dev     # la web en http://localhost:5173/taller/
```

## Mis datos

Solo se guarda mi email (si entro) y, por cada reto, cuántas veces fallé, cuántas pistas pedí y si vi la solución. Desde «Tus datos» puedo descargarlo todo en JSON.
