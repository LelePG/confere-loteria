import Ball from './Bola';

interface DezenasProps {
  numeros: string[];
}

export default function({ numeros }: DezenasProps) {
  return (
    <div className="flex justify-center space-x-4 my-3 flex-wrap">
      {numeros.map((numero, i) => (
        <Ball key={i} n={numero} />
      ))}
    </div>
  );
};

