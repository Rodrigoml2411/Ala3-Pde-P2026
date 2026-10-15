"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const ModeloTarea = require("./ModeloTarea");
const GestorTareas = require("./GestorTareas");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function input(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}
const MAX_TITULO = 100;
const MAX_DESC = 500;
const gestorTareas = new GestorTareas();
function mostrarDetalleTarea(tarea) {
    console.log("Título:", tarea.titulo);
    console.log("Descripción:", tarea.descripcion);
    console.log("Estado:", ModeloTarea.nombresEstado[tarea.estado]);
    console.log("Dificultad:", ModeloTarea.emojisDificultad[tarea.dificultad]);
    console.log("Fecha de creación:", tarea.fechaCreacion);
}
function agregarTareas() {
    return __awaiter(this, void 0, void 0, function* () {
        if (gestorTareas.estaLleno()) {
            console.log("Límite de tareas alcanzado.\n");
            return;
        }
        const nueva = new ModeloTarea.Tarea("", "", ModeloTarea.Dificultad.FACIL, ModeloTarea.Estado.PENDIENTE, "");
        nueva.titulo = (yield input("Ingrese el título de la tarea: ")).slice(0, MAX_TITULO);
        nueva.descripcion = (yield input("Descripción (opcional, ENTER para omitir): ")).slice(0, MAX_DESC);
        const dif = parseInt(yield input("Dificultad (0: Fácil, 1: Medio, 2: Difícil): "));
        nueva.dificultad = (dif >= 0 && dif <= 2) ? dif : ModeloTarea.Dificultad.FACIL;
        const est = parseInt(yield input("Estado (0: Pendiente, 1: En curso, 2: Terminada, 3: Cancelada): "));
        nueva.estado = (est >= 0 && est <= 3) ? est : ModeloTarea.Estado.PENDIENTE;
        nueva.fechaCreacion = yield input("Ingrese la fecha de creación (Formato: AAAA-MM-DD): ");
        gestorTareas.agregar(nueva);
        console.log("✅ Tarea agregada con éxito.\n");
    });
}
function mostrarTareas() {
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
function filtrarPorEstado(estado) {
    const encontradas = gestorTareas.filtrarPorEstado(estado);
    if (encontradas.length === 0) {
        console.log("No hay tareas en este estado.\n");
    }
    else {
        for (const t of encontradas) {
            console.log(`Tarea #${t.index + 1}: ${t.tarea.titulo}`);
            console.log("Descripción:", t.tarea.descripcion, "\n");
        }
    }
}
function verTareas() {
    return __awaiter(this, void 0, void 0, function* () {
        let opcion;
        do {
            console.log("\n¿Qué tareas deseas ver?");
            console.log("1. Todas las tareas.");
            console.log("2. Tareas pendientes.");
            console.log("3. Tareas en curso.");
            console.log("4. Tareas terminadas.");
            console.log("5. Tareas canceladas.");
            console.log("0. Salir.");
            opcion = parseInt(yield input("> "));
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
    });
}
function buscarTareas() {
    return __awaiter(this, void 0, void 0, function* () {
        const tituloBuscado = yield input("Pon el nombre de la tarea que deseas buscar: ");
        const encontrada = gestorTareas.buscarPorTitulo(tituloBuscado);
        if (encontrada) {
            console.log("\n✅ Tarea encontrada:");
            mostrarDetalleTarea(encontrada);
        }
        else {
            console.log("❌ Tarea no encontrada.");
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let respuesta;
        do {
            console.log("\nHola Olivia!!");
            console.log("¿Qué deseas hacer?");
            console.log("1. Ver mis tareas.");
            console.log("2. Buscar una tarea.");
            console.log("3. Agregar una tarea.");
            console.log("0. Salir.");
            respuesta = parseInt(yield input("> "));
            switch (respuesta) {
                case 1:
                    yield verTareas();
                    break;
                case 2:
                    yield buscarTareas();
                    break;
                case 3:
                    yield agregarTareas();
                    break;
                case 0:
                    console.log("Saliendo del programa...");
                    break;
                default:
                    console.log("Opción no válida.");
            }
        } while (respuesta !== 0);
        rl.close();
    });
}
main();
//# sourceMappingURL=Ala.js.map