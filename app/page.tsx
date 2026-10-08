'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Todo = {
  id: number
  title: string
  is_completed: boolean
  created_at: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all')
  console.log("現在のtodosデータ:", todos);

  // 1. タスク一覧の取得 (Read)
  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    else setTodos(data || [])
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // 2. タスクの新規追加 (Create)
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const { error } = await supabase
      .from('todos')
      .insert([{ title }])

    if (error) console.error(error)
    else {
      setTitle('')
      fetchTodos()
    }
  }

  // 3. 完了状態の切り替え (Update)
  const toggleTodo = async (id: number, currentStatus: boolean) => {
    const { error } = await supabase
      .from('todos')
      .update({ is_completed: !currentStatus })
      .eq('id', id)

    if (error) console.error(error)
    else fetchTodos()
  }

  // 4. タスクの削除 (Delete)
  const deleteTodo = async (id: number) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    if (error) console.error(error)
    else fetchTodos()
  }

  // ★ 絞り込み済みのタスク一覧を計算（元の todos は破壊しない）
  const filteredTodos = todos.filter((todo) => {
  const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  const matchesStatus =
    filterStatus === 'all'
      ? true
      : filterStatus === 'completed'
      ? todo.is_completed
      : !todo.is_completed

  return matchesSearch && matchesStatus
  })

  return (
    <main className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">ToDo アプリ</h1>

      {/* 入力フォーム */}
      <form onSubmit={addTodo} className="flex gap-2 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいタスクを入力"
          className="border p-2 rounded flex-1 text-black"
        />
        <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-full">
          タスクを登録
        </button>
      </form>

      {/* ★ ここから追加：検索＆フィルターエリア */}
      <div className="my-6 space-y-3">
        {/* 検索入力欄 */}
        <input
          type="text"
          placeholder="タスクを検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />

        {/* 絞り込みボタン */}
        <div className="flex gap-2">
          {(['all', 'active', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded text-sm ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {status === 'all' ? 'すべて' : status === 'active' ? '未完了' : '完了'}
            </button>
          ))}
        </div>
      </div>

      {/* タスク一覧 */}
      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-2 border-2 border-slate-200 rounded-xl p-3 bg-slate-50 shadow-sm">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.is_completed}
                onChange={() => toggleTodo(todo.id, todo.is_completed)}
              />
              <span className={todo.is_completed ? 'line-through text-gray-400' : ''}>
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-gray-700 text-white px-3 py-1.5 rounded text-sm"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}