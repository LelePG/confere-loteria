interface BolaProps {
  n: string;
}

export default function ({ n }: BolaProps) {
  return (
    <div className="flex items-center justify-center w-20 h-20 bg-gray-50 m-2 rounded-full border-2 border-black shadow">
      <span className="text-4xl font-bold">{n}</span>
    </div>
  );
};

