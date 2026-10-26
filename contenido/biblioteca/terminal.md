# La terminal, bien explicada

## Qué es la terminal

La terminal es una ventana donde le das órdenes al ordenador escribiendo, en vez de haciendo clic. Lo que la escucha y la cumple se llama **shell** (en tu Mac, `zsh`).

Piénsalo como un escrito al juzgado. El Finder es el formulario con casillas: cómodo, pero solo puedes pedir lo que tiene casilla. La terminal es el escrito libre: tienes que redactarlo bien, pero puedes pedir cualquier cosa y con toda la precisión que quieras.

Cuando ves esto, el shell está esperando tu orden:

```
daniel@MacBook-Pro ~ %
```

Se lee así: tu usuario (`daniel`), el nombre del ordenador, la carpeta donde estás (`~` es tu carpeta personal) y `%`, que significa «te escucho». Escribes la orden, pulsas Enter, el shell la cumple y vuelve a mostrar el `%`.

## Las tres piezas de una orden

Casi toda orden tiene la misma forma: **comando, opciones y argumentos**, separados por espacios. Como en una demanda: quién actúa, de qué manera y sobre qué.

| Pieza | Qué es | En `ls -la Documentos` | En `node -e '…'` |
| --- | --- | --- | --- |
| Comando | El programa que trabaja | `ls` (listar) | `node` (ejecutar JavaScript) |
| Opciones | Cómo quieres que lo haga. Empiezan por guion | `-la` (largo y todo) | `-e` (evalúa este texto) |
| Argumentos | Sobre qué lo hace | `Documentos` (la carpeta) | `'console.log("Hola")'` (el código) |

### Las opciones, en detalle

- **Un guion y una letra**: `-l`, `-a`, `-e`. La letra suele ser la inicial de una palabra inglesa: l de *long*, a de *all*, e de *eval*.
- **Las letras se pueden pegar**: `ls -la` es lo mismo que `ls -l -a`. El orden da igual: `-al` también vale.
- **Dos guiones y una palabra entera**: `--help`, `--version`. Es la versión larga y legible. Muchas opciones existen de las dos formas: en `node`, `-e` y `--eval` son la misma.
- **Cada comando tiene sus propias letras**. La `-l` de `ls` no significa lo mismo que la `-l` de otro programa. Por eso existe `man` (sección de ayuda, más abajo).

### Tu primera orden con node

```
node -e 'console.log("Hola, Daniel")'
```

1. `node` es el programa que entiende JavaScript (y TypeScript sin tipos). Es el mismo motor que hay dentro de un navegador, pero sin ventana.
2. `-e` le dice: «no busques un archivo, ejecuta directamente el texto que viene detrás».
3. Las **comillas simples** `'…'` son para el shell: «esto es un solo argumento, pásaselo a node tal cual». Sin ellas, el shell partiría el texto por los espacios y se liaría con los paréntesis.
4. Las **comillas dobles** `"…"` ya son para JavaScript: marcan un texto. Hay comillas dentro de comillas porque hablan dos idiomas a la vez: primero el shell, luego JavaScript.
5. `console.log(…)` significa «muestra en pantalla lo que hay entre paréntesis».

### Por qué `"2" + 3` da 23

Son tipos de datos distintos.

| Escribes | Tipo | `+` hace | Resultado |
| --- | --- | --- | --- |
| `2 + 3` | dos números | sumar | `5` |
| `"2 + 3"` | un texto | nada: es solo texto | `2 + 3` |
| `"2" + 3` | texto y número | pegar (convierte el 3 en texto) | `23` |

Cuando uno de los dos lados es texto, `+` deja de sumar y pasa a pegar. Importa en la vida real: lo que alguien escribe en un formulario llega como texto, aunque sean cifras. Si una web suma «2» y 3 empleados y le salen 23, es este fallo. Puedes preguntar el tipo con `typeof`: `node -e 'console.log(typeof "2")'` responde `string`.

## Dónde estás: carpetas y rutas

La terminal siempre está «dentro» de una carpeta, como tú en un despacho concreto del edificio. Las órdenes actúan ahí salvo que digas otra cosa. Las carpetas forman un árbol que empieza en `/`, la raíz:

```
/                      la raíz: todo cuelga de aquí
└─ Users
   └─ daniel           tu carpeta personal = ~
      ├─ Desktop
      ├─ Documents
      └─ misiones      ← aquí harás las misiones
         └─ hola.ts
```

Una **ruta** es la dirección de un archivo dentro de ese árbol. Hay dos formas de darla:

- **Absoluta**: desde la raíz, empieza por `/`. `/Users/daniel/misiones/hola.ts` vale estés donde estés, como una dirección postal completa.
- **Relativa**: desde donde estás ahora. Si ya estás en `~/misiones`, basta con `hola.ts`. Es como decir «el despacho de al lado».

Cuatro atajos que verás todo el rato:

| Atajo | Significa |
| --- | --- |
| `~` | tu carpeta personal (`/Users/daniel`) |
| `.` | la carpeta donde estás |
| `..` | la carpeta de arriba (la que contiene a esta) |
| `/` | al principio, la raíz; en medio, separa carpetas |

Para moverte: `pwd` te dice dónde estás (*print working directory*), `cd misiones` entra en una carpeta, `cd ..` sube un nivel y `cd` a secas te devuelve a `~`.

## Las 12 órdenes que más usarás

Con estas haces el 90 % del trabajo diario. El nombre casi siempre es una abreviatura inglesa; saberla ayuda a recordarla.

| Orden | Viene de | Qué hace | Ejemplo |
| --- | --- | --- | --- |
| `pwd` | *print working directory* | Dice en qué carpeta estás | `pwd` |
| `ls` | *list* | Lista lo que hay en la carpeta | `ls -la` |
| `cd` | *change directory* | Entra en otra carpeta | `cd misiones` |
| `mkdir` | *make directory* | Crea una carpeta | `mkdir pruebas` |
| `touch` | tocar | Crea un archivo vacío | `touch notas.txt` |
| `cat` | *concatenate* | Enseña el contenido de un archivo | `cat notas.txt` |
| `less` | lo contrario de *more* | Lee un archivo largo por páginas (sales con `q`) | `less registro.log` |
| `nano` | un editor pequeño | Abre un archivo para editarlo | `nano notas.txt` |
| `cp` | *copy* | Copia un archivo | `cp notas.txt copia.txt` |
| `mv` | *move* | Mueve o cambia el nombre | `mv copia.txt viejo.txt` |
| `rm` | *remove* | Borra. **Sin papelera** | `rm viejo.txt` |
| `node` | Node.js | Ejecuta JavaScript o TypeScript | `node hola.ts` |

Las verás una por semana en el **comando de la semana**, en este orden: opciones y ayuda, moverte (`ls`, `cd`, `pwd`), leer y editar (`cat`, `less`, `nano`), y luego crear, copiar y borrar.

## Cómo pedir ayuda y no perderte

Nadie se sabe todas las letras de memoria: los programadores las consultan a diario. Hay dos sitios donde mirar.

- **`--help`**: un resumen rápido que imprime el propio programa. Prueba `node --help`. Si sale muy largo, `node --help | less` lo pone por páginas.
- **`man`**: el manual completo (*manual*). Prueba `man ls`. Dentro te mueves con las flechas o la barra espaciadora, buscas una palabra con `/` (por ejemplo `/-a` y Enter) y sales con `q`.

No todo programa tiene los dos: `ls` tiene manual pero no `--help` en el Mac; `node` tiene ambos. Si uno falla, prueba el otro.

Cinco teclas que te ahorran mucho:

| Tecla | Qué hace |
| --- | --- |
| Tab | Completa el nombre de un archivo o carpeta. Escribe `cd mis` y pulsa Tab |
| Flecha arriba | Recupera la orden anterior, para repetirla o corregirla |
| Ctrl + C | Cancela lo que se esté ejecutando. Tu botón de emergencia |
| Ctrl + L | Limpia la pantalla (lo de antes no se pierde) |
| `q` | Sale de `man` y de `less` |

Ojo con Ctrl + C: en la terminal no copia, cancela. Para copiar texto en el Mac se usa Cmd + C, como siempre.

## Editar un archivo con nano

`nano` es un editor de texto que vive dentro de la terminal. Sirve para cambios rápidos, sobre todo en un servidor donde no hay VS Code. Para escribir código de verdad seguirás usando VS Code.

Pruébalo así, paso a paso:

1. Ve a una carpeta de pruebas: `cd ~/Desktop`.
2. Abre un archivo nuevo: `nano prueba.txt`. Si no existe, nano lo crea al guardar.
3. Escribe una frase. Aquí el ratón no sirve: te mueves con las flechas.
4. Guarda con **Ctrl + O** (la letra O, de *output*). Abajo te pregunta el nombre: pulsa **Enter** para dejar `prueba.txt`.
5. Sal con **Ctrl + X** (*exit*). Si no habías guardado, te pregunta: `Y` guarda, `N` sale sin guardar.
6. Comprueba que se guardó: `cat prueba.txt`.
7. Si quieres, bórralo: `rm prueba.txt`.

Abajo del todo nano enseña una chuleta con sus teclas. El símbolo `^` significa Ctrl: `^O` es Ctrl + O y `^X` es Ctrl + X. Con eso ya no te quedas atrapado nunca. (El editor que sí atrapa a todo el mundo es `vim`; si algún día acabas dentro sin querer, sales escribiendo `:q!` y Enter.)

## Mac, Linux y Windows

Lo que aprendas en tu Mac te sirve casi entero en Linux, que es donde viven los servidores. Los dos son de la misma familia, Unix. Windows es otra familia; WSL2 mete un Linux de verdad dentro de Windows.

| | Mac (`zsh`) | Linux (`bash`) | Windows (PowerShell) |
| --- | --- | --- | --- |
| Órdenes de esta guía | Sí | Sí | Con otros nombres (`dir`, `Copy-Item`) |
| Separador de carpetas | `/` | `/` | `\` |
| Tu carpeta personal | `/Users/daniel` | `/home/daniel` | `C:\Users\daniel` |
| Instalar programas | `brew install …` | `apt install …` | `winget install …` |
| Mismas letras en las opciones | Casi siempre | Casi siempre | No |

La diferencia pequeña que sí notarás: algunas órdenes del Mac tienen menos opciones que las de Linux (como `ls --help`, que en Linux funciona y en el Mac no). Si copias una orden de un tutorial de Linux y falla en el Mac, esa suele ser la causa.

## Las órdenes que pueden hacer daño

La terminal no pregunta «¿estás seguro?» y no tiene papelera. Casi todo es inofensivo, pero cuatro cosas merecen respeto. Si la IA te propone alguna de estas, léela dos veces antes de pulsar Enter.

| Qué | Por qué es peligroso | Cómo protegerte |
| --- | --- | --- |
| `rm` | Borra para siempre, sin papelera | Usa `rm -i`, que pregunta antes de cada archivo |
| `rm -rf` | Borra carpetas enteras con todo dentro, sin preguntar (`r` de *recursive*, `f` de *force*) | No lo uses nunca con `~`, `/` o `*` detrás. Comprueba con `pwd` dónde estás |
| `>` | Escribe en un archivo y **machaca** lo que había: `echo hola > notas.txt` deja solo «hola» | Para añadir al final se usa `>>` |
| `sudo` | Ejecuta como administrador: el sistema deja de protegerte (*superuser do*) | Solo si sabes exactamente qué hace la orden |

Una regla de oro que vale también para revisar código de la IA: **antes de ejecutar, lee la orden y di en voz alta qué va a hacer**. Si no sabes explicarla, no la ejecutes; pregúntala.

## Minirretos para comprobarlo tú

Cinco pruebas de un minuto. Antes de pulsar Enter, apunta lo que crees que va a salir; luego compruébalo.

- `node --version` y `node -v`. ¿Sale lo mismo? ¿Por qué?
- `ls` y luego `ls -a` en `~`. ¿Qué archivos aparecen solo en el segundo, y qué tienen en común sus nombres?
- `node -e 'console.log(typeof 3, typeof "3")'`. ¿Qué dos palabras salen?
- `node -e 'console.log("5" - 2)'`. Con `+` pegaba. ¿Y con `-`? Este sorprende.
- Crea `reto.txt` con nano, escribe tu nombre, guárdalo, sal y ábrelo con `cat`. Después bórralo con `rm -i reto.txt`.

Si alguno no sale como esperabas, esa es justo la pregunta que merece la pena hacer.
