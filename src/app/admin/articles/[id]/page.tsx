'use client'

import React, { useEffect, useState } from 'react'
// import DeleteArticleButton from '../components/DeleteArticleButton';
import { getAdminArticle, getCategories } from '@/app/getters';
import { notFound, useParams, useRouter } from 'next/navigation'
import ArticleForm from '../components/ArticleForm';


const EditArticle = () => {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [categories, setCategories] = useState<[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<{id:number, name:string}[]>([]);
  const [content, setContent] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
 
  useEffect(() => {
    const fetchArticle = async () => {
      const article = await getAdminArticle(id);
      if (!article) {
        notFound();
        return
      }

      setTitle(article.title);
      setContent(article.content);

      const categories = article.articleCategories.map((ac: any) => ac.category);
      setSelectedCategories(categories);
     
    }
    fetchArticle();
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`/api/admin/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, categories, thumbnailUrl })
    });

    setLoading(false);
    router.push(`/articles/${id}`);
    router.refresh();
  }

  return (
    <>
      <ArticleForm
        mode='edit'
        title={title}
        setTitle={setTitle}
        categories={categories}
        setCategories={setCategories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        loading={loading}
        errors={errors}
        handleSubmit={handleSubmit}
      />
      {/* <DeleteArticleButton id={article.id} /> */}
    </>
  )
}

export default EditArticle;