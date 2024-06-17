import React from 'react'
import DeleteArticleButton from '../components/DeleteArticleButton';
import { getAdminArticle } from '@/app/getters';
import { notFound } from 'next/navigation'


const EditArticle = async ({ params }: { params: { id: string } }) => {
    const article = await getAdminArticle(params.id);
    if (!article) {
      notFound();
    }

  return (
    <>

      <DeleteArticleButton id={article.id} />
    </>
  )
}

export default EditArticle;