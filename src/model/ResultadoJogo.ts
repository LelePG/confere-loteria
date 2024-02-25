import Resultado from './Resultado';

export default interface ResultadoJogo extends Resultado {
  jogo: number|string;
  premio: boolean;
}

