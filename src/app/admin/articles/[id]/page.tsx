'use client'

import React, { useEffect, useState } from 'react'
import DeleteArticleButton from '../components/DeleteArticleButton';
import { getAdminArticle, getCategories } from '@/app/getters';
import { notFound, useParams, useRouter } from 'next/navigation'
import ArticleForm from '../components/ArticleForm';
import { articleValidate } from '../components/PostingValidate';
import { Category } from '@/types/category';


const EditArticle = () => {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
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

      const categories = article.articleCategories.map((ac:any) => ac.category);
      setSelectedCategories(categories);
     
    }
    fetchArticle();
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

     // ヴァリデーションチェック
     const newErrors = articleValidate(title, selectedCategories, content);
     if (Object.keys(newErrors).length > 0) {
       setErrors(newErrors);
       return;
     }
 
     setErrors({});
     setLoading(true);

     const articleData = {
      title,
      content,
      categories: selectedCategories.map(cat => cat.id),
      thumbnailUrl
    };

    console.log(articleData);

     try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData)
      });

      console.log(res);
  
      setLoading(false);
      router.push(`/articles/${id}`);
      router.refresh();
     } catch (error) {
      console.error('Error updating article:', error);
      setLoading(false);
     }
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
      <div className='flex justify-end mx-8'>
        <p className='text-xl text-slate-500'>この記事を削除しますか？▶️</p>
        <DeleteArticleButton id={id} />
      </div>
    </>
  )
}

export default EditArticle;