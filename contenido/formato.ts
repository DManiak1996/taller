// Formato del contenido del taller (reto diario).
// Lo escribe el hilo "Preparar lecciones de fundamentos"; lo lee la web del taller.
// Un fichero JSON por día: contenido/semana-NN/dia-NN.json, con la forma de `Dia`.
//
// Reglas que la web puede dar por hechas:
// - Todo se responde tocando: no hay que teclear nada en el iPhone.
// - Los textos admiten solo **negrita** y `código`. Nada más de Markdown.
// - Cada reto tiene exactamente una respuesta correcta.
// - Todo el código de ejemplo se ha ejecutado de verdad y su salida es la indicada.
// - Líneas de código de 38 caracteres o menos siempre que se pueda (partir en variables).
//   Si alguna es más larga, la web NO hace scroll horizontal: la parte que no cabe salta
//   a la fila siguiente con sangría francesa y una marca ↪ al principio (Mono ~15 px).
//   Cada línea lógica conserva un único número y se toca como un único bloque aunque
//   ocupe dos filas (clave en "fallo": lineasFallo cuenta líneas lógicas, no filas).

export type ConceptoId = string; // p. ej. "orden-ejecucion", "const", "let"

export interface Dia {
  id: string;               // "s01-d01"
  semana: number;           // 1
  dia: number;              // 1..7
  titulo: string;           // corto, cabe en una línea del iPhone
  objetivo: string;         // "Hoy aprendes a ..." (una frase: lo que sabrá hacer después)
  conceptos: ConceptoId[];  // conceptos que avanza en el mapa
  pildora?: true;           // la microlección de este día es la «píldora de informática» de la semana
  leccion: Pantalla[];      // 2 a 5 pantallas, una idea por pantalla (unos 2 minutos)
  retos: RetoODeRef[];      // 3 retos de tipos distintos (puede citar uno de revisión con { ref })
  repaso: RetoODeRef[];     // retos de reserva para repasar este día a los 1, 3 y 7 días
  paraNota?: ParaNota;      // bloque opcional al final del día: no cuenta para la racha ni para cerrar el día
}

// ---------- Microlección ----------

export type Pantalla =
  | { tipo: "texto"; texto: string }
  | {
      tipo: "codigo";
      codigo: string;
      salida?: string[];    // líneas que imprime, si imprime algo
      nota?: string;        // una frase debajo del código
      lanzaError?: true;    // el ejemplo falla a propósito (salida = lo impreso antes del fallo)
    }
  | {
      tipo: "pasoapaso";    // el visualizador
      codigo: string;
      pasos: Paso[];
    }
  | {
      tipo: "deiure";       // «esto está en DeIure, aquí»
      texto: string;
      codigo?: string;      // fragmento real o simplificado de DeIure
      fichero?: string;     // ruta en el repo DeIure, si aplica
    }
  | {
      tipo: "terminal";     // una terminal simulada: el fichero (opcional), la orden y lo que sale
      fichero?: { nombre: string; codigo: string };
      orden: string;        // lo que se teclea, sin el "$": "node hola.ts"
      salida: string[];     // lo que aparece debajo
      nota?: string;
    }
  | {
      tipo: "diff";         // un cambio de Git: cada línea empieza por " " (igual), "+" (añadida) o "-" (quitada)
      fichero: string;      // "informe.ts"
      lineas: string[];     // [" const plazo = 72;", "-console.log(plazo);", "+console.log(\"Plazo:\", plazo);"]
      nota?: string;
    }
  | {
      tipo: "esquema";      // un diagrama de flujo vertical: cajas unidas por flechas, de arriba abajo
      titulo?: string;
      pasos: { titulo: string; texto: string }[]; // 3 a 6 cajas; titulo de 1 a 3 palabras
    };

export interface Paso {
  linea: number;                      // línea que se acaba de ejecutar (empieza en 1)
  variables: Record<string, string>;  // estado tras ejecutar esa línea, como se escribiría en código: { plazo: "72", estado: "\"abierta\"" }
  salida: string[];                   // todo lo impreso hasta ahora
  nota: string;                       // qué ha pasado, en una frase
  error?: string;                     // si esta línea falla, el mensaje en lenguaje llano
}

// ---------- Retos ----------

export type Tema = "rgpd" | "neutro";

interface RetoBase {
  id: string;               // "s01-d01-r1"
  semana: number;           // semana del mapa de conceptos que trabaja
  concepto: ConceptoId;     // para el repaso espaciado y el mapa
  tema: Tema;
  enunciado: string;        // la pregunta, en una o dos frases
  pistas: [string, string, string]; // 1: dónde mirar · 2: la regla · 3: casi la respuesta
  explicacion: string;      // se muestra siempre al terminar, acierte o no
}

export interface Opcion {
  texto: string;            // en "predecir", la salida exacta (varias líneas separadas por \n)
  correcta?: true;
  siEliges: string;         // feedback al tocarla: por qué está bien o qué confusión revela
}

// ¿Qué imprime esto?
export interface RetoPredecir extends RetoBase {
  tipo: "predecir";
  codigo: string;
  opciones: Opcion[];       // 3 o 4; la web las baraja
  lanzaError?: true;        // el programa falla a propósito: la opción correcta describe el error
}

// Rellena el hueco. El código lleva una sola marca ___ donde va la opción elegida.
export interface RetoHueco extends RetoBase {
  tipo: "hueco";
  codigo: string;
  salidaEsperada: string[]; // lo que debe imprimir el programa ya completo
  opciones: Opcion[];       // 3 o 4 fichas; la web las baraja
}

// Ordena las líneas. `lineas` va en el orden correcto; la web las baraja.
export interface RetoOrdenar extends RetoBase {
  tipo: "ordenar";
  lineas: string[];         // 3 a 5 líneas; solo un orden es válido
  sobran?: string[];        // líneas trampa que se barajan con las buenas y hay que dejar fuera
  salidaEsperada: string[]; // lo que imprime en el orden correcto (la web lo enseña como objetivo)
}

// ---------- Retos del Profesor de revisión ----------
// Los escribe el hilo "Enseñar a revisar código" en contenido/revision/semana-NN.json
// (un array de RetoFallo | RetoRazon). Un día los incluye con { ref: "<id>" } en `retos` o `repaso`.

// Caza el fallo de la IA. Dos toques: 1) la línea culpable, 2) el porqué.
export interface RetoFallo extends RetoBase {
  tipo: "fallo";
  codigo: string;           // el código "de la IA", con el fallo
  lineasFallo: number[];    // líneas que cuentan como acierto (empiezan en 1)
  opciones: Opcion[];       // 3 porqués; la web las baraja
  arreglo: string;          // el código arreglado; la web resalta las líneas que cambian
  lanzaError?: true;        // el código con fallo lanza un error (si no, imprime algo distinto)
}

// ¿Quién tiene razón? Dos asistentes discrepan; Daniel elige uno o "ninguno".
export interface RetoRazon extends RetoBase {
  tipo: "razon";
  codigo: string;
  opiniones: { quien: string; dice: string; porque: string }[]; // 2 normalmente; quien = "A", "B"
  correcta: string;         // un `quien` o "ninguno"
  siEliges: Record<string, string>; // feedback por elección, claves = cada quien y "ninguno"
  comprobar?: true;         // al terminar, la web ejecuta el código delante de él
}

// Elige la respuesta sobre algo que no se ejecuta (semana 8, Git): leer un diff o lo que dice la terminal.
export interface RetoElegir extends RetoBase {
  tipo: "elegir";
  bloque:
    | { tipo: "diff"; fichero: string; lineas: string[] }        // como la pantalla "diff"
    | { tipo: "terminal"; orden: string; salida: string[] };     // como la pantalla "terminal", sin fichero
  opciones: Opcion[];       // 3 o 4; la web las baraja
}

// test y expect (semana 8): el sandbox los trae, como Vitest en pequeño. Un test que pasa imprime
// «✓ nombre»; uno que falla, «× nombre», «  Expected: X» y «  Received: Y» (X e Y como dentro de un
// console.log de una lista: los textos entre comillas), y el programa sigue. Un test sin expect pasa.
// Si dentro del test salta otro error: «× nombre» y «  TypeError: …». Solo hay toBe (Object.is) y
// toEqual (en profundidad). Para Node: scripts/pruebas-en-node.js del repo taller hace lo mismo.

export type Reto = RetoPredecir | RetoHueco | RetoOrdenar | RetoFallo | RetoRazon | RetoElegir;
export type RetoODeRef = Reto | { ref: string };

// ---------- «Para nota» (opcional, al final del día) ----------
// Se ofrece al terminar el día y se puede hacer más tarde (lo normal: escribir en el Mac).
// Saltárselo no rompe la racha ni deja el día sin hacer.

export interface ParaNota {
  reto: RetoPredecir | RetoHueco | RetoOrdenar; // un reto normal, más difícil
  escribir: RetoEscribir;
}

// Escribe el programa. Se abre en el editor de la Zona libre con «Comprobar».
// La web ejecuta `datos` + "\n" + lo que escribe Daniel y compara la consola, línea a línea y sin los
// espacios del final de cada línea, con `salidaEsperada`; después hace lo mismo con cada variante
// (sus `datos` sustituyen a los de arriba). Solo acierta si pasan todas.
export interface RetoEscribir extends RetoBase {
  tipo: "escribir";
  datos?: string;           // líneas fijas de solo lectura encima del editor: "const plazo = 72;"
  inicial?: string;         // lo que ya viene escrito en el editor (normalmente comentarios guía)
  salidaEsperada: string[]; // lo que debe imprimir con `datos`
  variantes?: { datos: string; salidaEsperada: string[] }[]; // 1 o 2 juegos de datos que la web prueba sin enseñarlos
  solucion: string;         // la referencia; se enseña al final, con la explicación
}

