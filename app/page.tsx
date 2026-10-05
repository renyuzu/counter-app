'use client';

import { useState } from 'react';

export default function CounterPage() {
  // ① カウント数値のState
  const [count, setCount] = useState(10);

  // ② 操作履歴を保存する配列State（初期値は空の配列 []）
  const [logs, setLogs] = useState<string[]>([]);

  // ③ カウント変更と同時に履歴を追加する関数
  const updateCount = (newValue: number, actionName: string) => {
    setCount(newValue);
    // 新しい履歴を配列の先頭に追加する
    setLogs((prev) => [`${actionName}（現在値: ${newValue}）`, ...prev]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h1 className="text-4xl font-bold">カウント: {count}</h1>

      <div className="flex gap-2">
        {/* -1 ボタン */}
        <button
          onClick={() => updateCount(count - 1, '-1 を押しました')}
          disabled={count <= 0}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          -1
        </button>

        {/* リセットボタン */}
        <button
          onClick={() => updateCount(0, 'リセットしました')}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          リセット
        </button>

        {/* +1 ボタン */}
        <button
          onClick={() => updateCount(count + 1, '+1 を押しました')}
          disabled={count >= 20}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          +1
        </button>

        {/* +5 ボタン */}
        <button
          onClick={() => updateCount(count + 5, '+5 を押しました')}
          disabled={count + 5 > 20}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          +5
        </button>
      </div>

      {/* ④ 操作履歴の表示エリア */}
      <div className="mt-6 w-full max-w-md border p-4 rounded bg-gray-50">
        <h2 className="font-bold mb-2">📜 操作履歴</h2>
        {logs.length === 0 ? (
          <p className="text-gray-400 text-sm">まだ操作履歴はありません。</p>
        ) : (
          <ul className="list-disc pl-5 text-sm space-y-1">
            {logs.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}