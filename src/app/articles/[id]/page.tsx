import { getArticle } from '@/app/getters';
import { Metadata, ResolvingMetadata } from 'next';
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

  if (!article) {
    notFound();
  }

  return (
    <>
      <h3>{article.title}</h3>
    </>
  );
}
