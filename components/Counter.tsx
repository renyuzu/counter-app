'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Counter() {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  // 1. ページ読み込み時にSupabaseから現在のカウント数を取得
  useEffect(() => {
    fetchCount()
  }, [])

  const fetchCount = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('counters')
      .select('count')
      .eq('id', 1)
      .single()

    if (error) {
      console.error('Error fetching count:', error)
    } else if (data) {
      setCount(data.count)
    }
    setLoading(false)
  }

  // 2. カウントを変更してSupabaseに保存
  const updateCount = async (newCount: number) => {
    setCount(newCount)
    const { error } = await supabase
      .from('counters')
      .update({ count: newCount })
      .eq('id', 1)

    if (error) {
      console.error('Error updating count:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-10">読み込み中...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">リアルタイムカウンター</h2>
      <div className="text-6xl font-extrabold text-blue-600 dark:text-blue-400">
        {count}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => updateCount(count - 1)}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
        >
          - 1
        </button>
        <button
          onClick={() => updateCount(count + 1)}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
        >
          + 1
        </button>
      </div>
    </div>
  )
}