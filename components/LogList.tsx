type LogListProps = {
  logs: string[];
};

export default function LogList({ logs }: LogListProps) {
  if (logs.length === 0) {
    return <p className="text-gray-400 text-sm italic">履歴はまだありません</p>;
  }

  return (
    <ul className="list-disc pl-5 text-sm space-y-1">
      {logs.map((log, index) => (
        <li key={index}>{log}</li>
      ))}
    </ul>
  );
}