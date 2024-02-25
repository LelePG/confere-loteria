interface LoteriaData {
    qtdeNumeros: { min: number; max: number };
    qtdeAcertosParaPremio: number[];
    numerosPossiveis: { min: number; max: number };
}

enum TiposLoteria {
    megasena = "megasena",
    lotofacil = "lotofacil",
    quina = "quina",
    lotomania = "lotomania",
    duplasena = "duplasena",
}
export default TiposLoteria;

export const TiposLoteriaData: { [key in TiposLoteria]: LoteriaData } = {
    megasena: {
        qtdeNumeros: { min: 6, max: 20 },
        qtdeAcertosParaPremio: [6, 5, 4],
        numerosPossiveis: { min: 1, max: 60 }
    },
    lotofacil: {
        qtdeNumeros: { min: 15, max: 18 },
        qtdeAcertosParaPremio: [15, 14, 13, 12, 11],
        numerosPossiveis: { min: 1, max: 25 }
    },
    quina: {
        qtdeNumeros: { min: 5, max: 15 },
        qtdeAcertosParaPremio: [5, 4, 3, 2],
        numerosPossiveis: { min: 1, max: 80 }
    },
    lotomania: {
        qtdeNumeros: { min: 50, max: 50 },
        qtdeAcertosParaPremio: [20, 19, 18, 17, 16, 15],
        numerosPossiveis: { min: 0, max: 99 }
    },
    duplasena: {
        qtdeNumeros: { min: 6, max: 15 },
        qtdeAcertosParaPremio: [6, 5, 4, 3],
        numerosPossiveis: { min: 1, max: 50 }
    },
};
