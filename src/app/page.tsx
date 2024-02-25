"use client"
import SeletorJogos from "@/components/SeletorJogos"
import InputDezenas from "@/components/Inputs/InputDezenas"
import Resultado from "@/components/ResultadosSorteios"
import useGlobal from "@/context/useGlobal"
import InputTipoLoteria from "@/components/Inputs/InputTipoLoteria"

export default function () {
  const { errorMessage } = useGlobal()
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Verifique se você venceu na loteria</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
        <InputDezenas />
        <div className="m-0 p-0">
          <InputTipoLoteria />
          <SeletorJogos />
        </div>
      </div>
      {errorMessage && <div className="bg-red-100 my-3 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{errorMessage}</span>
      </div>}
      <Resultado />
    </div>
  )
}
