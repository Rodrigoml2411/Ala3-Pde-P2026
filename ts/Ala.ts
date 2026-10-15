
const readline = require("readline");
import ModeloTarea = require("./ModeloTarea");
import GestorTareas = require("./GestorTareas");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function input(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      resolve(answer);
    });
  });
}

const MAX_TITULO = 100;
const MAX_DESC = 500;

const gestorTareas = new GestorTareas();

function mostrarDetalleTarea(tarea: ModeloTarea.Tarea): void {
  console.log("Título:", tarea.titulo);
  console.log("Descripción:", tarea.descripcion);
  console.log("Estado:", ModeloTarea.nombresEstado[tarea.estado]);
  console.log("Dificultad:", ModeloTarea.emojisDificultad[tarea.dificultad]);
  console.log("Fecha de creación:", tarea.fechaCreacion);
}

async function agregarTareas(): Promise<void> {
  if (gestorTareas.estaLleno()) {
    console.log("Límite de tareas alcanzado.\n");
    return;
  }

  const nueva = new ModeloTarea.Tarea(
    "",
    "",
    ModeloTarea.Dificultad.FACIL,
    ModeloTarea.Estado.PENDIENTE,
    "",
  );

  nueva.titulo = (await input("Ingrese el título de la tarea: ")).slice(0, MAX_TITULO);
  nueva.descripcion = (await input("Descripción (opcional, ENTER para omitir): ")).slice(0, MAX_DESC);

  const dif = parseInt(await input("Dificultad (0: Fácil, 1: Medio, 2: Difícil): "));
  nueva.dificultad = (dif >= 0 && dif <= 2) ? dif as ModeloTarea.Dificultad : ModeloTarea.Dificultad.FACIL;

  const est = parseInt(await input("Estado (0: Pendiente, 1: En curso, 2: Terminada, 3: Cancelada): "));
  nueva.estado = (est >= 0 && est <= 3) ? est as ModeloTarea.Estado : ModeloTarea.Estado.PENDIENTE;

  nueva.fechaCreacion = await input("Ingrese la fecha de creación (Formato: AAAA-MM-DD): ");

  gestorTareas.agregar(nueva);

  console.log("✅ Tarea agregada con éxito.\n");
}

function mostrarTareas(): void {
  const tareas = gestorTareas.obtenerTodas();
  if (tareas.length === 0) {
    console.log("No hay tareas registradas.\n");
    return;
  }

  for (const [index, tarea] of tareas.entries()) {
    console.log(`\nTarea #${index + 1}`);
    mostrarDetalleTarea(tarea);
  }
}

function filtrarPorEstado(estado: ModeloTarea.Estado): void {
  const encontradas = gestorTareas.filtrarPorEstado(estado);
  if (encontradas.length === 0) {
    console.log("No hay tareas en este estado.\n");
  } else {
    for (const t of encontradas) {
      console.log(`Tarea #${t.index + 1}: ${t.tarea.titulo}`);
      console.log("Descripción:", t.tarea.descripcion, "\n");
    }
  }
}

async function verTareas(): Promise<void> {
  let opcion: number;

  do {
    console.log("\n¿Qué tareas deseas ver?");
    console.log("1. Todas las tareas.");
    console.log("2. Tareas pendientes.");
    console.log("3. Tareas en curso.");
    console.log("4. Tareas terminadas.");
    console.log("5. Tareas canceladas.");
    console.log("0. Salir.");

    opcion = parseInt(await input("> "));

    switch (opcion) {
      case 1:
        mostrarTareas();
        break;
      case 2:
        filtrarPorEstado(ModeloTarea.Estado.PENDIENTE);
        break;
      case 3:
        filtrarPorEstado(ModeloTarea.Estado.EN_CURSO);
        break;
      case 4:
        filtrarPorEstado(ModeloTarea.Estado.TERMINADA);
        break;
      case 5:
        filtrarPorEstado(ModeloTarea.Estado.CANCELADA);
        break;
      case 0:
        console.log("Saliendo de la visualización...");
        break;
      default:
        console.log("Opción no válida.");
        break;
    }
  } while (opcion !== 0);
}

async function buscarTareas(): Promise<void> {
  const tituloBuscado = await input("Pon el nombre de la tarea que deseas buscar: ");
  const encontrada = gestorTareas.buscarPorTitulo(tituloBuscado);

  if (encontrada) {
    console.log("\n✅ Tarea encontrada:");
    mostrarDetalleTarea(encontrada);
  } else {
    console.log("❌ Tarea no encontrada.");
  }
}

async function main(): Promise<void> {
  let respuesta: number;

  do {
    console.log("\nHola Olivia!!");
    console.log("¿Qué deseas hacer?");
    console.log("1. Ver mis tareas.");
    console.log("2. Buscar una tarea.");
    console.log("3. Agregar una tarea.");
    console.log("0. Salir.");

    respuesta = parseInt(await input("> "));

    switch (respuesta) {
      case 1:
        await verTareas();
        break;
      case 2:
        await buscarTareas();
        break;
      case 3:
        await agregarTareas();
        break;
      case 0:
        console.log("Saliendo del programa...");
        break;
      default:
        console.log("Opción no válida.");
    }
  } while (respuesta !== 0);

  rl.close();
}

main();