import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { getAdminArticles } from '@/app/getters'
import DeleteArticleButton from './components/DeleteArticleButton'
import ImageFetcher from '@/app/components/ImageFetcher'
import { Article } from '@mui/icons-material'

export default async function Page() {

  const articles = await getAdminArticles();

  return (
    <div className="py-3 px-4">
      <div className="sm:flex justify-between items-center mb-8">
        <h1 className="md:text-xl font-bold ml-2">記事一覧</h1>
        <div className='bg-stone-300 px-5 py-2 rounded-sm font-bold text-slate-600 hover:bg-stone-500 hover:text-white cursor-pointer mt-3'>
          <Link href={'/'}>サイトトップに戻る</Link>
        </div>
      </div>

      <div className="">
        {articles.map((article) => {
          return (
            <div key={article.id} className="border-b border-gray-300 p-4 hover:bg-gray-100 cursor-pointer sm:flex justify-between gap-20">
              <div className="sm:w-4/5 md:w-2/3 sm:flex justify-between">

                <Link href={`/admin/articles/${article.id}`} key={article.id}>
                  <div className='mr-2'>
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
                    {article.thumbnailImageKey && (
                      <ImageFetcher
                        thumbnailImageKey={article.thumbnailImageKey}
                        alt={'Article Image'}
                        width={50}
                        height={50}
                        className=''
                      />
                    )}
                  </div>
                </Link>

              </div>
              <div className="sm:w-1/5 md:w-1/3 sm:flex justify-end gap-3">
   
                <button  className='text-amber-600 hover:text-amber-800 font-semibold text-lg cursor-pointer'>
                  <Link href={`/admin/articles/${article.id}`} key={article.id}>編集</Link>
                </button>
                <div className='mt-3'>
                  <DeleteArticleButton id={article.id} />
                </div>
              </div>
             
            </div>

          )
        })}
      </div>
    </div>
  )
}