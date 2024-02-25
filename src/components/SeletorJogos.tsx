"use client"
import React, { useState } from 'react';
import InputNumero from './Inputs/InputNumero';
import useGlobal from '@/context/useGlobal';

const SeletorJogos = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [numJogosAnteriores, setNumJogosAnteriores] = useState("");
  const [jogoEspecifico, setJogoEspecifico] = useState("");
  const { verificaJogo, verificaJogosAnteriores, setErrorMessage } = useGlobal();

  return (
    <div className="">
      <div className="mb-4">
        <label className="text-lg mb-2">Escolha quais jogos quer verificar:</label>
        <select
          className="border-2 border-gray-300 p-2 rounded-lg w-full"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Selecione uma opção</option>
          <option value="ultimoJogo">Último Jogo</option>
          <option value="jogosAnteriores">Último Jogo e Jogos Anteriores</option>
          <option value="jogoEspecifico">Jogo Específico</option>
        </select>
      </div>
      {selectedOption === 'jogosAnteriores' && (
        <InputNumero
          min="0"
          max="10"
          value={numJogosAnteriores}
          onChange={(value) => setNumJogosAnteriores(value.toString())}
          placeholder="Número de Jogos Anteriores"
          textLabel='Quantidade de jogos anteriores:'
        />
      )}
      {selectedOption === 'jogoEspecifico' && (
        <InputNumero
          value={Number(jogoEspecifico)}
          onChange={(value) => setJogoEspecifico(value.toString())}
          placeholder="Número do Jogo Específico"
          textLabel='Número do jogo:'
        />
      )}
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={async () => {
            if (selectedOption === 'ultimoJogo') {
              await verificaJogo();
            } else if (selectedOption === 'jogosAnteriores') {
              await verificaJogosAnteriores(numJogosAnteriores);
            } else if (selectedOption === 'jogoEspecifico') {
              await verificaJogo(jogoEspecifico);
            } else {
              setErrorMessage("Opção inválida. Por favor, selecione uma opção válida.");
            }
          }}
        >
          Consultar
        </button>
      </div>
    </div>
  );
};

export default SeletorJogos;
