"use strict";
const ModeloTarea = require("./ModeloTarea");
const MAX_TAREAS = 10;
const GestorTareas = function () {
    this.tareas = [];
};
GestorTareas.prototype.estaLleno = function () {
    return this.tareas.length >= MAX_TAREAS;
};
GestorTareas.prototype.agregar = function (tarea) {
    if (this.estaLleno()) {
        return false;
    }
    this.tareas.push(tarea);
    return true;
};
GestorTareas.prototype.obtenerTodas = function () {
    return [...this.tareas];
};
GestorTareas.prototype.filtrarPorEstado = function (estado) {
    return this.tareas.reduce((encontradas, tarea, index) => {
        if (tarea.estado === estado) {
            encontradas.push({ tarea, index });
        }
        return encontradas;
    }, []);
};
GestorTareas.prototype.buscarPorTitulo = function (titulo) {
    return this.tareas.find((tarea) => tarea.titulo === titulo);
};
module.exports = GestorTareas;
//# sourceMappingURL=GestorTareas.js.map