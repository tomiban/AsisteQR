"use client";
import { useState } from "react";
import api from "@/api";
import { formatFecha } from "../utils/formatFecha";

const Formulario = () => {
  const [dni, setDni] = useState("");

  const handleChangeDni = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDni(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Obtener la fecha actual en el formato deseado
      const formattedDate = formatFecha(new Date());
      // Enviar los datos del formulario al servidor
      await api.asistencias.enviarAsistencia({
        dni: parseInt(dni),
        fechaHoy: formattedDate,
      });

    } catch (error) {
      console.error(
        "Error al enviar los datos del formulario al servidor:",
        error
      );
    }
  };

  return (
    <form className="flex flex-col mx-auto mt-10" onSubmit={handleSubmit}>
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
