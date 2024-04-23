import { Asistencia, FechaClase } from "./types";

/*
 * Función fetch para obtener un archivo CSV de una hoja de cálculo de Google Sheets. Luego, divide el texto en líneas y elimina las primeras 11 líneas, ya que son encabezados.
 * A continuación, mapea cada línea restante en un objeto Asistencia que contiene información sobre una asistencia, como el número, el DNI, el nombre del alumno y las clases que ha asistido.
 */
const api = {
  asistencias: {
    list: async (): Promise<Asistencia[]> => {
      return fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSnAuXR4hgjQd6weuZaZXC1ppCaDz68S6DAq154BrB8J6DbQMnmd4XOmlvEPH3D04g-rw8ktNawI8rj/pub?gid=522128327&single=true&output=tsv"
      )
        .then((res) => res.text())
        .then((text) =>
          text
            .split("\n")
            .slice(10)
            .map((row) => {
              const [
                numero,
                dni,
                alumno,
                clase1,
                clase2,
                clase3,
                clase4,
                clase5,
                clase6,
                clase7,
                clase8,
                clase9,
                clase10,
                clase11,
                clase12,
                clase13,
                clase14,
                clase15,
                clase16,
                clase17,
                clase18,
                clase19,
                clase20,
                clase21,
                clase22,
                clase23,
                clase24,
                clase25,
                clase26,
                clase27,
                clase28,
                clase29,
              ] = row.split("\t");
              return {
                numero: parseInt(numero),
                dni: parseInt(dni),
                alumno,
                clase1: parseInt(clase1),
                clase2: parseInt(clase2),
                clase3: parseInt(clase3),
                clase4: parseInt(clase4),
                clase5: parseInt(clase5),
                clase6: parseInt(clase6),
                clase7: parseInt(clase7),
                clase8: parseInt(clase8),
                clase9: parseInt(clase9),
                clase10: parseInt(clase10),
                clase11: parseInt(clase11),
                clase12: parseInt(clase12),
                clase13: parseInt(clase13),
                clase14: parseInt(clase14),
                clase15: parseInt(clase15),
                clase16: parseInt(clase16),
                clase17: parseInt(clase17),
                clase18: parseInt(clase18),
                clase19: parseInt(clase19),
                clase20: parseInt(clase20),
                clase21: parseInt(clase21),
                clase22: parseInt(clase22),
                clase23: parseInt(clase23),
                clase24: parseInt(clase24),
                clase25: parseInt(clase25),
                clase26: parseInt(clase26),
                clase27: parseInt(clase27),
                clase28: parseInt(clase28),
                clase29: parseInt(clase29),
              };
            })
        );
    },
   enviarAsistencia: async (asistencia: Asistencia) => {
        
   }
  },
  fecha: {
    list: async (): Promise<FechaClase[]> => {
      return fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSnAuXR4hgjQd6weuZaZXC1ppCaDz68S6DAq154BrB8J6DbQMnmd4XOmlvEPH3D04g-rw8ktNawI8rj/pub?gid=522128327&single=true&output=tsv"
      )
        .then((res) => res.text())
        .then((text) => {
            const rows = text.split("\n");
            const headers = rows[9].split("\t"); // Obtener las fechas de la fila 10
            const fechas: FechaClase[] = [];
  
            // Iterar sobre las columnas desde la columna C hasta la columna AF
            for (let i = 3; i < headers.length - 1; i++) {
              const fechaString = headers[i].trim();
              if (fechaString !== 'null') {
                // Convertir la cadena de fecha al formato de JavaScript
                const [dia, mes, año] = fechaString.split("-");
                const fecha = new Date(`${mes}-${dia}-${año}`);
                fechas.push({
                  fecha,
                });
              }
            }
            return fechas;
        });
    },
  },
};

export default api;
