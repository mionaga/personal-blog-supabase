import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { getAdminArticles } from '@/app/getters'
import DeleteArticleButton from './components/DeleteArticleButton'

export default async function Page() {
  
    const articles = await getAdminArticles();

  return (
    <div className="py-3 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">記事一覧</h1>
        <div className='bg-stone-300 px-5 py-2 rounded-sm font-bold text-slate-600 hover:bg-stone-500 hover:text-white cursor-pointer'>
          <Link href={'/'}>サイトトップに戻る</Link>
        </div>
      </div>

      <div className="">
        {articles.map((article) => {
          return (
            <div className="border-b border-gray-300 p-4 hover:bg-gray-100 cursor-pointer flex justify-between gap-20">
              <div className="w-4/5 flex justify-between">

                <Link href={`/admin/articles/${article.id}`} key={article.id}>
                  <div>
                    <div className="text-xl font-bold">
                        {article.title}
                    </div>
                    <div className="text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>

                <Link href={`/admin/articles/${article.id}`} key={article.id}>
                  <div>
                    <Image src={'/imges/girls-6615582_640.jpg'} alt='blog-image' height={50} width={80} className=''></Image>
                  </div>
                </Link>

              </div>
              <div className="w-1/5 flex justify-between">
   
                <button  className='text-amber-600 hover:text-amber-800 font-semibold text-lg cursor-pointer'>
                  <Link href={`/admin/articles/${article.id}`} key={article.id}>編集</Link>
                </button>
                <DeleteArticleButton id={article.id} />
              </div>
             
            </div>

          )
        })}
      </div>
    </div>
  )
}