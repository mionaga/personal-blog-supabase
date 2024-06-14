'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Article } from '@/types/article'
import Image from 'next/image'

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
    <div className="py-3 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">記事一覧</h1>
      </div>

      <div className="">
        {articles.map((article) => {
          return (
            <Link href={`/admin/articles/${article.id}`} key={article.id}>
              <div className="border-b border-gray-300 p-4 hover:bg-gray-100 cursor-pointer flex justify-between">
                <div>
                  <div className="text-xl font-bold">{article.title}</div>
                  <div className="text-gray-500">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <Image src={'/imges/girls-6615582_640.jpg'} alt='blog-image' height={50} width={80} className=''></Image>
                </div>
                <button></button>
                <button></button>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}