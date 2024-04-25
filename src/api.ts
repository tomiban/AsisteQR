import { formatFecha } from "./app/utils/formatFecha";
import { Asistencia, FechaClase, MarcarAsistencia } from "./types";

/*
 * Función fetch para obtener un archivo CSV de una hoja de cálculo de Google Sheets. Luego, divide el texto en líneas y elimina las primeras 11 líneas, ya que son encabezados.
 * A continuación, mapea cada línea restante en un objeto Asistencia que contiene información sobre una asistencia, como el número, el DNI, el nombre del alumno y las clases que ha asistido.
 */
const api = {
  asistencias: {
    list: async (): Promise<Asistencia[]> => {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vSnAuXR4hgjQd6weuZaZXC1ppCaDz68S6DAq154BrB8J6DbQMnmd4XOmlvEPH3D04g-rw8ktNawI8rj/pub?gid=522128327&single=true&output=tsv"
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos de asistencia.");
        }

        const text = await response.text();

        const asistencias = text
          .split("\n") // Separar el texto en filas de la hoja de cálculo
          .slice(10) // Omitir las primeras 10 filas
          .map((row) => {
            // Dividir la fila en columnas
            const columns = row.split("\t");

            // Excluir la última columna (correspondiente al porcentaje)
            const columnsWithoutPercentage = columns.slice(0, -1);

            const [numero, dni, alumno, ...clases] = columnsWithoutPercentage; // almaceno cada clase en un arreglo clases

            // Convertir las clases a números enteros
            const clasesAsistencia = clases.map((clase) => {
              const parsedClase = parseInt(clase.trim());
              return isNaN(parsedClase) ? null : parsedClase;
            });

            return {
              numero: parseInt(numero),
              dni: parseInt(dni),
              alumno,
              clases: clasesAsistencia,
            };
          });
        return asistencias;
      } catch (error) {
        console.error("Error al obtener los datos de asistencia:", error);
        throw error; // Re-lanzar el error para que el llamador pueda manejarlo
      }
    },
    enviarAsistencia: async (asistencia: MarcarAsistencia) => {
      const { dni, fechaHoy } = asistencia;

      try {
        const asistencias = await api.asistencias.list(); //traemos todas las assitencias del sheet

        const alumnoEncontrado = await api.alumno.get(asistencias, dni); // buscamos al alumno de la sheet con el dni del form

        if (!alumnoEncontrado) {
          console.log("No se encontró al alumno con el DNI proporcionado.");
          return;
        }

        const indexAlumno = asistencias.findIndex(
          (alumno) => alumno.dni === dni              // obtenemos el index del alumno en la sheet
        );

        const fechaAsistenciaClase = await api.fecha.encontrarFechaCoincidente(
          fechaHoy // Obtenemos la fecha a la que le vamos a poner asistencia en caso de que exista en el sheet
        );

        if (!fechaAsistenciaClase) {
          console.log(
            "No se encontró la fecha de clase coincidente para el día de hoy."
          );
          return;
        }

        const indexFechaAsistencia = (await api.fecha.list()).findIndex(
          (f) => f.fecha === fechaAsistenciaClase // obtenemos el index de la fecha a la que vamos a cargar la asistencia
        );

        asistencias[indexAlumno].clases[indexFechaAsistencia] = 2;
        console.log(asistencias[indexAlumno].clases[indexFechaAsistencia]);
      } catch (error) {
        console.error("Error al obtener las asistencias:", error);
      }
    },
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
          const fechas = [];

          // Iterar sobre las columnas desde la columna C hasta la columna AF
          for (let i = 3; i < headers.length - 1; i++) {
            const fecha = headers[i].trim();
            if (fecha !== "null") {
              // Agregar la fecha al arreglo de fechas
              fechas.push({ fecha });
            }
          }
          return fechas;
        });
    },
    encontrarFechaCoincidente: async (
      fechaHoy: string
    ): Promise<string | null> => {
      try {
        // Obtener las fechas de clase
        const fechas = await api.fecha.list();

        // Buscar la primera fecha que coincida con la fecha enviada por el formulario
        const fechaCoincidente = fechas
          .map((f) => f.fecha)
          .find((fechaClase) => {
            return fechaClase === fechaHoy;
          });

        return fechaCoincidente ? fechaCoincidente : null;
      } catch (error) {
        console.error("Error al obtener las fechas de clase:", error);
        throw error;
      }
    },
  },
  alumno: {
    get: async (asistencias: Asistencia[], dni: number) =>
      asistencias.find((asistencia) => asistencia.dni === dni),
  },
};

export default api;
