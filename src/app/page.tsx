import api from "@/api";
import Image from "next/image";
import GeneratorQr from "./components/GeneradorQr";
import Formulario from "./components/Formulario";

export default async function Home() {
   
    const asistencias = await api.asistencias.list();
    return <div className="flex flex-col justify-center items-center gap-20">
{      
      JSON.stringify(asistencias, null, 2)} 
      <Formulario />
      <GeneratorQr url="https://docs.google.com/spreadsheets/d/1PfuXbQwfyqw3HboPNy3B4bEcTauwkIq25JygXRKpL8k/edit#gid=0" />
    </div>
}
