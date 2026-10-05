type CounterProps = {
  count: number;
  onUpdate: (newValue: number, actionName: string) => void;
  onReset: () => void;
};

export default function Counter({ count, onUpdate, onReset }: CounterProps) {
  return (
    <div className="space-y-4 text-center">
      <p className="text-4xl font-bold">{count}</p>
      
      <div className="flex justify-center gap-2">
        <button
          onClick={() => onUpdate(count + 1, '+1 を押しました')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          +1
        </button>
        <button
          onClick={() => onUpdate(count - 1, '-1 を押しました')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          -1
        </button>
        <button
          onClick={onReset}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          リセット
        </button>
      </div>
    </div>
  );
}