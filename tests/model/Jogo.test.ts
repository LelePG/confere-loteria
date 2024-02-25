import Jogo from "../../src/model/Jogo";
import TiposLoteria, { TiposLoteriaData } from "../../src/model/TiposLoteria";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});

describe("setTipoLoteria", () => {
    it("should set the tipoLoteria", () => {
        Jogo.setTipoLoteria(TiposLoteria.lotofacil);
        expect(Jogo.tipoLoteria).toBe(TiposLoteria.lotofacil);
    });
});

describe("pegarDezenasSorteadas", () => {
    it("should fetch and return dezenas sorteadas", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ dezenas: ["01", "02", "03"], concurso: "1234" }));
        const result = await Jogo.pegarDezenasSorteadas();
        expect(result).toEqual({ dezenasSorteadas: ["01", "02", "03"], concurso: "1234" });
    });
});

describe("comparaResultado", () => {
    it("should compare sorted and bet numbers and return the result", () => {
        const result = Jogo.comparaResultado(["01", "02", "03"], ["02", "03", "04"]);
        expect(result).toEqual({ acertos: 2, dezenasSorteadas: ["01", "02", "03"] });
    });
});

describe("validaAposta", () => {
    it("should validate the bet", () => {
        Jogo.setTipoLoteria(TiposLoteria.megasena);
        const isValid = Jogo.validaAposta(["01", "02", "03", "04", "05", "06"]);
        expect(isValid).toBe(true);
    });

    it("should invalidate the bet when numbers are out of range (min)", () => {
        Jogo.setTipoLoteria(TiposLoteria.megasena);
        const isValid = Jogo.validaAposta(["00", "02", "03", "04", "05", "06"]);
        expect(isValid).toBe(false);
    });

    it("should invalidate the bet when numbers are out of range (max)", () => {
        Jogo.setTipoLoteria(TiposLoteria.megasena);
        const isValid = Jogo.validaAposta(["01", "02", "03", "04", "05", "84"]);
        expect(isValid).toBe(false);
    });

    it("should invalidate the bet when numbers are duplicated", () => {
        Jogo.setTipoLoteria(TiposLoteria.megasena);
        const isValid = Jogo.validaAposta(["01", "02", "02", "04", "05", "06"]);
        expect(isValid).toBe(false);
    });

    it("should invalidate the bet when there are too few numbers", () => {
        Jogo.setTipoLoteria(TiposLoteria.megasena);
        const isValid = Jogo.validaAposta(["01", "02", "03", "04", "05"]);
        expect(isValid).toBe(false);
    });

    it("should invalidate the bet when there are too many numbers", () => {
        Jogo.setTipoLoteria(TiposLoteria.megasena);
        const isValid = Jogo.validaAposta([
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
        ]);
        expect(isValid).toBe(false);
    });
});

describe("verificaPremio", () => {
    it("should verify if the bet won", () => {
        Jogo.setTipoLoteria(TiposLoteria.megasena);
        const hasWon = Jogo.verificaPremio(6);
        expect(hasWon).toBe(true);
    });

    it("should verify if the bet won for lotofacil", () => {
        Jogo.setTipoLoteria(TiposLoteria.lotofacil);
        TiposLoteriaData[TiposLoteria.lotofacil].qtdeAcertosParaPremio.forEach((num) => {
            const hasWon = Jogo.verificaPremio(num);
            expect(hasWon).toBe(true);
        });
    });

    it("should verify if the bet won for quina", () => {
        Jogo.setTipoLoteria(TiposLoteria.quina);
        TiposLoteriaData[TiposLoteria.quina].qtdeAcertosParaPremio.forEach((num) => {
            const hasWon = Jogo.verificaPremio(num);
            expect(hasWon).toBe(true);
        });
    });

    it("should verify if the bet won for lotomania", () => {
        Jogo.setTipoLoteria(TiposLoteria.lotomania);
        TiposLoteriaData[TiposLoteria.lotomania].qtdeAcertosParaPremio.forEach((num) => {
            const hasWon = Jogo.verificaPremio(num);
            expect(hasWon).toBe(true);
        });
    });

    it("should verify if the bet won for duplasena", () => {
        Jogo.setTipoLoteria(TiposLoteria.duplasena);
        TiposLoteriaData[TiposLoteria.duplasena].qtdeAcertosParaPremio.forEach((num) => {
            const hasWon = Jogo.verificaPremio(num);
            expect(hasWon).toBe(true);
        });
    });

    it("should verify if the bet won for 11 points in lotofacil", () => {
        Jogo.setTipoLoteria(TiposLoteria.lotofacil);
        const hasWon = Jogo.verificaPremio(11);
        expect(hasWon).toBe(true);
    });

    it("should verify if the bet lost", () => {
        Jogo.setTipoLoteria(TiposLoteria.megasena);
        const hasWon = Jogo.verificaPremio(3);
        expect(hasWon).toBe(false);
    });
});

describe("comparaJogo", () => {
    it("should throw an error for invalid bet", async () => {
        Jogo.setTipoLoteria(TiposLoteria.megasena);
        await expect(Jogo.comparaJogo(["100"])).rejects.toThrow("Aposta inválida");
    });

    it("should compare the game and return the result", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ dezenas: ["01", "02", "03"], concurso: "1234" }));
        Jogo.setTipoLoteria(TiposLoteria.megasena);
        const result = await Jogo.comparaJogo(["01", "02", "03", "04", "05", "06"]);
        expect(result).toEqual(expect.objectContaining({ acertos: 3 }));
    });

    it("should return the latest result for invalid number of previous games", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ dezenas: ["07", "08", "09"], concurso: "1235" }));
        Jogo.setTipoLoteria(TiposLoteria.megasena);
        const resultados = await Jogo.comparaJogoAtualEAnteriores(["07", "08", "09", "10", "11", "12"], -12);
        expect(resultados).toHaveLength(1);
        expect(resultados[0]).toEqual(expect.objectContaining({ acertos: 3, jogo: "1235" }));
    });

    describe("comparaJogoAtualEAnteriores", () => {
        it("should compare current and previous games", async () => {
            fetchMock.mockResponseOnce(
                JSON.stringify({ dezenas: ["01", "02", "03", "24", "25", "36"], concurso: "1234" })
            );
            fetchMock.mockResponseOnce(
                JSON.stringify({ dezenas: ["14", "15", "16", "21", "22", "23"], concurso: "1233" })
            );

            const resultados = await Jogo.comparaJogoAtualEAnteriores(["01", "02", "03", "04", "05", "06"], 1);

            expect(resultados).toHaveLength(2);
            expect(resultados[0]).toEqual(expect.objectContaining({ acertos: 3, jogo: "1234" }));
            expect(resultados[1]).toEqual(expect.objectContaining({ acertos: 0, jogo: "1233" }));
        });

        it("should handle errors when comparing games", async () => {
            fetchMock.mockRejectOnce(new Error("Failed to fetch data"));

            await expect(Jogo.comparaJogoAtualEAnteriores(["01", "02", "03", "04", "05", "06"], 1)).rejects.toThrow(
                "Erro ao comparar o jogo. Verifique os inputs ou tente novamente mais tarde"
            );
        });
    });
});
