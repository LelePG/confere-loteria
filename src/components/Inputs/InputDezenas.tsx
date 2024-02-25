"use client"
import useGlobal from '@/context/useGlobal';

export default function() {
  const { numeros, setNumeros } = useGlobal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumeros(value.split(','))
  };

  return (
    <div className='p-0 m-0'>
    <label className="text-lg mb-2">Digite os números:</label>
    <input
      type="text"
      className="border-2 border-gray-300 p-2 rounded-lg w-full h-10"
      value={numeros.join(",")}
      onChange={handleChange}
      placeholder="Digite o números separados por vírgula"
      />
    </div>
  );
};

