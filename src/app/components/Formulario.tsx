"use client";
// ComponenteFormulario.tsx

import { useState } from "react";
import api from "@/api";
import { Asistencia } from "@/types";

const Formulario = () => {
  const [dni, setDni] = useState("");
  const [alumno, setAlumno] = useState({});

  const handleChangeDni = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDni(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Obtener la lista de asistencias
      const asistencias: Asistencia[] = await api.asistencias.list();
      // Verificar si el DNI ingresado está en la lista de asistencias
      const [alumnoEncontrado] = asistencias.filter(
        (asistencia: Asistencia) => asistencia.dni == parseInt(dni)
      );

     
      if (alumnoEncontrado) {
        // Guardar la información del alumno
        setAlumno(alumnoEncontrado)
        console.log(alumno)
      } else {
        console.log("El alumno no está presente en la lista de asistencias.");
      }
    } catch (error) {
      console.error("Error al obtener la lista de asistencias:", error);
    }
  };

  return (
    <form className="flex flex-col   mx-auto mt-10" onSubmit={handleSubmit}>
      <label className="font-bold mb-2" htmlFor="dni">
        Ingrese su DNI:
      </label>
      <input
        type="text"
        id="dni"
        name="dni"
        className="border border-gray-300 rounded py-2 px-4 mb-4 text-black"
        onChange={handleChangeDni}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1"
      >
        Enviar
      </button>
    </form>
  );
};

export default Formulario;
