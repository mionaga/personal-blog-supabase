import ImageFetcher from '@/app/components/ImageFetcher';
import { getArticle, getCategories } from '@/app/getters';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

export async function generateMetadata ({
  params,
}: {
  params: { id: number };
  parent?: ResolvingMetadata;
}): Promise<Metadata> {

  const article = await getArticle(params.id);

  return {
    title: article?.title,
    description: article?.content,
  }
}


export default async function ArticleDetail({ 
  params
 }: {
  params: { id: number };
 }) {

  const article = await getArticle(params.id);
  const categories = await getCategories();

  if (!article) {
    notFound();
  }

  const categoryIds = article.articleCategories.map(e => e.categoryId);
  const categoryNames = categories
    .filter(category => categoryIds.includes(category.id))
    .map(category => category.name);


  return (
    <div className='flex flex-row sm:p-6'>
      <div className="md:basis-1/6"></div>
      <div className="md:basis-4/6 mt-10 p-5 md:p-10 bg-gray-300 rounded">
        {article.thumbnailImageKey && (
          <ImageFetcher 
            thumbnailImageKey={article.thumbnailImageKey}
            alt='Article Image'
            width={800}
            height={300}
            className='rounded'
          />
        )}
        <div className='flex justify-start my-10 gap-5'>
          <h2 className='text-4xl italic px-4'>{article.title}</h2>
          {categoryNames.map((name, index) => (
            <p key={index} className='text-blue-700 text-xl font-bold pt-3'>{name}</p>
          ))}
        </div>
        
        <div className="text-lg align-middle whitespace-break-spaces leading-relaxed text-justify px-4 mb-3">{article.content}</div>
        <div className='p-2 flex justify-end mt-6'>
          <Link href='/'>
            <p className=' bg-slate-200 p-3 rounded-full'>ブログ一覧ページへ戻る</p>  
          </Link>
        </div>
      </div>
      <div className="md:basis-1/6"></div>
    </div>
  );
}
