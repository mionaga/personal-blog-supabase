'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Article } from '@/types/article'

export default function Page() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch('/api/admin/articles')
      const {articles } = await res.json()
      setArticles(articles)
    }

    fetchArticle()
  }, [])

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">記事一覧</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link href="/admin/articles/new">新規作成</Link>
        </button>
      </div>

      <div className="">
        {articles.map((article) => {
          return (
            <Link href={`/admin/articles/${article.id}`} key={article.id}>
              <div className="border-b border-gray-300 p-4 hover:bg-gray-100 cursor-pointer">
                <div className="text-xl font-bold">{article.title}</div>
                <div className="text-gray-500">
                  {new Date(article.createdAt).toLocaleDateString()}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}