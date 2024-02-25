"use client"
import useGlobal from '@/context/useGlobal';
import Dezenas from './Dezenas';
import Loading from './Loading';

export default function () {
  const { resultados, loading } = useGlobal();

  return (
    <div className="overflow-y-auto">
      {loading && <Loading/>}
        {resultados.map((resultado, index) => (
          <div key={index} className="border p-4 my-4 text-xl">
            <p className="text-xl font-bold">Concurso {resultado.jogo}</p>
            <Dezenas numeros={resultado.dezenasSorteadas}></Dezenas>
            <p>Acertos: {resultado.acertos}</p>
            <p className={`${resultado.premio ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}`}>{resultado.premio ? `Com ${resultado.acertos} acertos dá pra conseguir um premio ` : 'Você não enriqueceu'}</p>
          </div>
        ))}
      </div>
  );
};


