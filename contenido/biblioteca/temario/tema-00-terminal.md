---
semana: 1
orden: 0
---

# Tema 0. La terminal

La terminal es un programa en el que se dan órdenes al ordenador escribiéndolas, en lugar de usar el ratón. El programa que lee y ejecuta esas órdenes se llama **shell** (intérprete de órdenes). En macOS es `zsh`.

## Sintaxis

```
comando -opciones argumentos
```

| Pieza | Función | En `ls -la Documentos` |
| --- | --- | --- |
| Comando | El programa que se ejecuta | `ls` (listar) |
| Opciones | Cómo debe hacerlo. Empiezan por `-` | `-la` (formato largo y todos los ficheros) |
| Argumentos | Sobre qué actúa | `Documentos` (la carpeta) |

- Una opción corta lleva un guion y una letra (`-l`). Las cortas se pueden juntar: `-la` equivale a `-l -a`.
- Una opción larga lleva dos guiones y una palabra (`--version`). Muchas opciones tienen las dos formas: `node -v` y `node --version` hacen lo mismo.
- El prompt (indicador) `daniel@MacBook-Pro ~ %` muestra el usuario, el ordenador, la carpeta actual (`~` es la carpeta personal) y `%`, que indica que el shell espera una orden.

## Carpetas y rutas

Las carpetas (*directories*, directorios) forman un árbol que empieza en `/`, la raíz. La terminal siempre está situada en una carpeta, la **carpeta actual**, y las órdenes actúan en ella salvo que se indique otra.

```
/
└─ Users
   └─ daniel        ← ~
      ├─ Documents
      └─ practica
         └─ hola.ts
```

Una **ruta** es la dirección de un fichero o carpeta en ese árbol:

- **Ruta absoluta:** empieza en la raíz, con `/`. `/Users/daniel/practica/hola.ts` es válida desde cualquier carpeta.
- **Ruta relativa:** parte de la carpeta actual. Desde `/Users/daniel/practica`, basta con `hola.ts`.

| Símbolo | Significado |
| --- | --- |
| `~` | La carpeta personal (en el Mac, `/Users/nombre`) |
| `.` | La carpeta actual |
| `..` | La carpeta que contiene a la actual |
| `/` | Al principio de una ruta, la raíz; en medio, separa carpetas |

Por dentro, una carpeta es una tabla del sistema de archivos que asocia cada **nombre** con una **ficha** (*inode*, nodo índice) que indica dónde están los datos en el disco. Por eso `mv` dentro del mismo disco es instantáneo aunque el fichero sea enorme: solo cambia el nombre o la tabla en la que aparece, no mueve los datos. Y por eso `rm` no tiene papelera: quita la entrada de la tabla y marca ese espacio como libre para reutilizarlo.

Mac y Linux pertenecen a la misma familia de sistemas (Unix) y comparten casi todas estas órdenes. Windows usa otras (PowerShell) y separa las carpetas con `\`; WSL2 permite usar Linux dentro de Windows.

## Órdenes de referencia

| Orden | Función | Opciones útiles |
| --- | --- | --- |
| `pwd` | Muestra la carpeta actual | |
| `ls` | Lista el contenido de una carpeta | `-l` detalle, `-a` ocultos |
| `cd carpeta` | Cambia de carpeta | `cd ..` sube un nivel; `cd ~` vuelve a la carpeta personal |
| `cat fichero` | Muestra un fichero entero | |
| `less fichero` | Muestra un fichero página a página | `q` para salir |
| `nano fichero` | Edita un fichero en la terminal | `Ctrl + O` guarda, `Ctrl + X` sale |
| `mkdir carpeta` | Crea una carpeta | `-p` crea también las intermedias |
| `cp origen destino` | Copia un fichero | `-r` copia carpetas |
| `mv origen destino` | Mueve o renombra | |
| `rm fichero` | Borra un fichero, **sin papelera** | `-r` borra carpetas (con cuidado) |
| `grep texto fichero` | Busca un texto dentro de ficheros | `-n` número de línea, `-i` sin distinguir mayúsculas, `-r` en una carpeta |
| `node fichero.ts` | Ejecuta un programa | `-v` versión, `-e` ejecuta código escrito en la propia orden |

## Del fichero a la pantalla

1. El código se escribe en un fichero de texto (`hola.ts`) y se guarda en el disco.
2. `node hola.ts` pide a **Node** (el programa que ejecuta JavaScript fuera del navegador) que lo ejecute.
3. Node elimina las anotaciones de tipos de TypeScript y ejecuta el JavaScript que queda. **No comprueba los tipos**: para eso existe otra herramienta, `tsc`.
4. Lo que escribe `console.log` aparece en la terminal. El código no aparece; solo su resultado.

Node ejecuta ficheros `.ts` directamente desde las versiones 22.18 y 23.6. El taller exige Node 24 o posterior.

## Ejemplos

```
node -e 'console.log(2 + 3)'
```

Escribe `5`. La opción `-e` (de *eval*, evaluar) ejecuta el código que va entre comillas, sin fichero.

```
grep -n nombre hola.ts
```

Escribe cada línea de `hola.ts` que contiene `nombre`, precedida de su número.

## Teclas

| Tecla | Función |
| --- | --- |
| Tab | Completa el nombre de un fichero o carpeta |
| Flecha arriba | Recupera la orden anterior |
| Ctrl + C | Cancela el programa en marcha (no copia: para copiar, Cmd + C) |
| Ctrl + L | Limpia la pantalla |
| `q` | Sale de `man` y de `less` |

## Errores típicos

| Mensaje | Causa |
| --- | --- |
| `command not found: node` | Node no está instalado o la terminal se abrió antes de instalarlo |
| `No such file or directory` | El fichero no está en la carpeta actual. Comprobar con `pwd` y `ls` |
| `Unknown file extension ".ts"` | Versión de Node anterior a la 22.18 |
| La terminal no responde | Un programa sigue en marcha (por ejemplo, un bucle infinito). `Ctrl + C` lo detiene |

## Revisar código de una IA

- Antes de ejecutar una orden propuesta por una IA, leer cada pieza: comando, opciones y argumentos.
- Leer dos veces las órdenes que pueden destruir datos. La terminal no pide confirmación ni tiene papelera:
  - `rm` y `rm -rf`: borran ficheros y carpetas enteras (`-r`, recursivo; `-f`, sin preguntar). Comprobar con `pwd` en qué carpeta se está; `rm -i` pide confirmación.
  - `>`: escribe la salida de una orden en un fichero y **sobrescribe** lo que hubiera (`echo hola > notas.txt` deja solo «hola»). `>>` añade al final.
  - `sudo`: ejecuta la orden con permisos de administrador; el sistema deja de proteger sus propios ficheros.
- Si la IA dice que una orden «compila» o «comprueba tipos», verificar qué herramienta lo hace: `node` ejecuta, pero no comprueba tipos.

## Documentación oficial

- `man comando` muestra el manual de cada orden en la propia terminal (por ejemplo, `man ls`). Dentro, `/palabra` busca y `q` sale.
- Muchas órdenes aceptan `--help`, que imprime un resumen (en macOS, no todas: `ls`, por ejemplo, no).
- Opciones de Node: [Command-line API](https://nodejs.org/api/cli.html) (en inglés).
- TypeScript en Node: [Modules: TypeScript](https://nodejs.org/api/typescript.html) (en inglés).

## Búscalo tú

En el manual de `ls` (`man ls`), ¿qué opción ordena los ficheros por fecha de modificación, del más reciente al más antiguo?

---

**Respuesta:** `-t`. Por ejemplo, `ls -lt` muestra la lista detallada con los ficheros modificados más recientemente al principio.
