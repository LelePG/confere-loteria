interface InputProps {
  value: number | string; 
  onChange: (value: number | string) => void;
  placeholder?: string;
  min?: string;
  max?: string;
  textLabel:string;
}

export default function ({ value, onChange, placeholder, min, max, textLabel }: InputProps) {
  return (
    <div className='p-0 m-0'>
    <label className="text-lg mb-2">{textLabel}</label>
    <input
      type="number"
      className="border-2 border-gray-300 p-2 rounded-lg w-full"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(+e.target.value)}
      placeholder={placeholder}
      min={min}
      max={max}
    />
    </div>
  );
};

