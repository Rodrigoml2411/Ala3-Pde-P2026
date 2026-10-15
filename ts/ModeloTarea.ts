namespace ModeloTarea {
  export enum Estado {
    PENDIENTE = 0,
    EN_CURSO,
    TERMINADA,
    CANCELADA,
  }

  export enum Dificultad {
    FACIL = 0,
    MEDIO,
    DIFICIL,
  }

  export interface Tarea {
    titulo: string;
    descripcion: string;
    dificultad: Dificultad;
    estado: Estado;
    fechaCreacion: string;
  }

  export interface ConstructorTarea {
    new (
      titulo: string,
      descripcion: string,
      dificultad: Dificultad,
      estado: Estado,
      fechaCreacion: string,
    ): Tarea;
  }

  export const Tarea: ConstructorTarea = function (
    this: Tarea,
    titulo: string,
    descripcion: string,
    dificultad: Dificultad,
    estado: Estado,
    fechaCreacion: string,
  ): void {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.dificultad = dificultad;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
  } as unknown as ConstructorTarea;

  export const nombresEstado: string[] = ["Pendiente", "En curso", "Terminada", "Cancelada"];
  export const emojisDificultad: string[] = ["⭐", "⭐⭐", "⭐⭐⭐"];
}

export = ModeloTarea;