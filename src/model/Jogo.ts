import Resultado from "./Resultado";
import ResultadoJogo from "./ResultadoJogo";
import TiposLoteria, { TiposLoteriaData } from "./TiposLoteria";

export default class Jogo {
  static tipoLoteria: TiposLoteria = TiposLoteria.megasena;
  static urlBase = `https://loteriascaixa-api.herokuapp.com/api/`;

  static setTipoLoteria(tipo: TiposLoteria): void {
    Jogo.tipoLoteria = tipo;
  }

  static async pegarDezenasSorteadas(numeroDoJogo: string = "latest"): Promise<{ dezenasSorteadas: string[], concurso: string }> {
    const response = await fetch(`${Jogo.urlBase}${Jogo.tipoLoteria}/${numeroDoJogo}`);
    const data = await response.json();
    return { dezenasSorteadas: data.dezenas, concurso: data.concurso };
  }

  static comparaResultado(dezenasSorteadas: string[], numerosApostados: string[]): Resultado {
    let acertos = 0;
    const dezenasSorteadasNumbers = dezenasSorteadas.map(num => parseInt(num));
    const numerosApostadosNumbers = new Set(numerosApostados.map(num => parseInt(num)));
    for (const numeroSorteado of dezenasSorteadasNumbers) {
      if (numerosApostadosNumbers.has(numeroSorteado)) {
        acertos++;
      }
    }

    return { acertos, dezenasSorteadas };
  }

  static validaAposta(numerosApostados: string[]): boolean {
    const tipoLoteriaData = TiposLoteriaData[Jogo.tipoLoteria];
    const { min, max } = tipoLoteriaData.qtdeNumeros;
    const numerosPossiveis = tipoLoteriaData.numerosPossiveis;

    if (numerosApostados.length < min || numerosApostados.length > max) {
      return false;
    }

    return numerosApostados.every((numero, index, self) => {
      const num = parseInt(numero);
      const isInRange = num >= numerosPossiveis.min && num <= numerosPossiveis.max;
      const isUnique = self.indexOf(numero) === index;
      return isInRange && isUnique;
    });
  }

  static verificaPremio(acertos: number): boolean {
    const tipoLoteriaData = TiposLoteriaData[Jogo.tipoLoteria];
    const { qtdeAcertosParaPremio } = tipoLoteriaData;

    for (const qtde of qtdeAcertosParaPremio) {
      if (acertos === qtde) {
        return true;
      }
    }

    return false;
  }

  static async comparaJogo(numerosApostados: string[], numeroDoJogo?: string): Promise<ResultadoJogo> {
    if (!Jogo.validaAposta(numerosApostados)) {
      throw new Error("Aposta inválida");
    }

    try {
      const { dezenasSorteadas, concurso } = await Jogo.pegarDezenasSorteadas(numeroDoJogo);
      const comparacao = Jogo.comparaResultado(dezenasSorteadas, numerosApostados);
      const premio = Jogo.verificaPremio(comparacao.acertos)
      return { ...comparacao, premio, jogo: concurso };
    } catch (error) {
      throw new Error("Erro ao comparar o jogo. Verifique os inputs ou tente novamente mais tarde ");
    }
  }

  static async comparaJogoAtualEAnteriores(numerosApostados: string[], qtdeJogosAnteriores: number): Promise<ResultadoJogo[]> {
    
    const jogoAtual = await Jogo.comparaJogo(numerosApostados);
    const resultados = [jogoAtual];
    const concursoAtual = jogoAtual.jogo;
    for (let i = 1; i <= +qtdeJogosAnteriores; i++) {
      const numero = +concursoAtual - i;
      const resultado = await Jogo.comparaJogo(numerosApostados, numero.toString());
      resultados.push(resultado);
    }
    return resultados
  }
}
