"use client"
import Jogo from '@/model/Jogo';
import React, { createContext, useState } from 'react';
import ResultadoJogo from '@/model/ResultadoJogo';
import TiposLoteria from '@/model/TiposLoteria';

interface GlobalContextType {
  jogos: string[];
  errorMessage: string | null;
  numeros: string[];
  resultados: ResultadoJogo[];
  loading: boolean; 
  setJogos: React.Dispatch<React.SetStateAction<string[]>>;
  setNumeros: React.Dispatch<React.SetStateAction<string[]>>;
  setResultados: React.Dispatch<React.SetStateAction<ResultadoJogo[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  tipoLoteria: TiposLoteria;
  mudaTipoLoteria: (tipo: TiposLoteria) => void;
  verificaJogo: (jogo?: string) => Promise<void>;
  verificaJogosAnteriores: (numJogosAnteriores: string) => Promise<void>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>; 
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
export default GlobalContext;

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [jogos, setJogos] = useState<string[]>([]);
  const [numeros, setNumeros] = useState<string[]>([]);
  const [resultados, setResultados] = useState<ResultadoJogo[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tipoLoteria, setTipoLoteria] = useState<TiposLoteria>(Jogo.tipoLoteria);
  const [loading, setLoading] = useState<boolean>(true); 

  function mudaTipoLoteria(t: TiposLoteria) {
    setTipoLoteria(t);
    Jogo.setTipoLoteria(t);
  }

  function preparaPraBusca(){
    setLoading(true);
    setErrorMessage(null);
    setResultados([]);
  }

  const verificaJogo = async (jogo: string = jogos[0]) => {
    preparaPraBusca();
      try {
        const r = await Jogo.comparaJogo(numeros, jogo);
        setResultados([r]);
      } catch (error) {
        setErrorMessage((error as any).message);
        setResultados([]);
        setTimeout(() => {
          setErrorMessage(null);
        }, 1500);
      }
    setLoading(false); 
  };

  const verificaJogosAnteriores = async (numJogosAnteriores: string) => {
    preparaPraBusca();
    try {
      if(+numJogosAnteriores === 0){
        throw new Error("Número de jogos anteriores inválido")
      }
      const r = await Jogo.comparaJogoAtualEAnteriores(numeros, +numJogosAnteriores);
      setResultados(r);
    } catch (error) {
      setErrorMessage((error as any).message);
      setResultados([]);
      setTimeout(() => {
        setErrorMessage(null);
      }, 1500);

    }
    setLoading(false); 
  };
  return (
    <GlobalContext.Provider value={{ jogos, numeros, resultados, errorMessage, setJogos, setNumeros, setResultados, verificaJogo, verificaJogosAnteriores, setErrorMessage, tipoLoteria, mudaTipoLoteria, loading, setLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};


