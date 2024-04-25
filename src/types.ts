export interface Asistencia {
  numero: number;
  dni: number;
  alumno: string;
  clases: (null | number)[];
}

export interface MarcarAsistencia {
  dni: number;
  fechaHoy: string;
}

export interface FechaClase {
    fecha: string;
}