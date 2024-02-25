import TiposLoteria from '@/model/TiposLoteria';
import useGlobal from '@/context/useGlobal';

const SeletorTipoLoteria = () => {
    const { tipoLoteria, mudaTipoLoteria } = useGlobal();

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        mudaTipoLoteria(e.target.value as TiposLoteria);
    };

    return (
      <div className='p-0 m-0'>
      <label className="text-lg mb-2">Escolha a loteria:</label>
        <select className="border-2 border-gray-300 p-2 mb-3 rounded-lg w-full m-0" value={tipoLoteria} onChange={handleSelectChange}>
            <option value="">Selecione um tipo de loteria</option>
            {Object.values(TiposLoteria).map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
            ))}
        </select>
        </div>
    );
};

export default SeletorTipoLoteria;
