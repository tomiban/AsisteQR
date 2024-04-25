// utils/fechaUtils.ts

export const formatFecha = (fecha: Date): string => {
    return fecha
      .toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
      .replace(/\//g, "-");
  };
  