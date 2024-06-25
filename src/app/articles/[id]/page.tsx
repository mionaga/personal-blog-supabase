import ImageFetcher from '@/app/components/ImageFetcher';
import { getArticle, getCategories } from '@/app/getters';
import { Article } from '@/types/article';
import { Category } from '@/types/category';
import { ConstructionOutlined } from '@mui/icons-material';
import { Metadata, ResolvingMetadata } from 'next';
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

  const article:Article = await getArticle(params.id);
  const categories:Category[] = await getCategories();
  console.log(article)

  if (!article) {
    notFound();
  }

//   const categoryIds:number[] = article.articleCategories.map(ac => ac.categoryId);
//   const categoryNames = categories
//     .filter(c => categoryIds.includes(c.id))
//     .map(c => c.name);

// console.log(categoryNames);
 
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
        {/* <div className='flex justify-start my-10 gap-5'>
          <h2 className='text-4xl italic px-4'>{article.title}</h2>
          {categoryNames.map((name, index) => (
            <p key={index} className='text-blue-700 text-xl font-bold pt-3'>{name}</p>
          ))}
        </div> */}
        
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
