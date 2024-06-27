'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import DeleteArticleButton from '../components/DeleteArticleButton';
import { getAdminArticle } from '@/app/getters';
import { notFound, useParams, useRouter } from 'next/navigation'
import ArticleForm from '../components/ArticleForm';
import { articleValidate } from '../components/PostingValidate';
import { useSupabaseSessions } from '@/utils/_hooks/useSupabaseHooks';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/utils/supabase';


const EditArticle = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<{id:number, name:string}[]>([]);
  const [content, setContent] = useState<string>('');
  const [preThumbnailUrl, setPreThumbnailUrl] = useState<string>('');
  const [thumbnailImageKey, setThumbnailImageKey] = useState('')
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { token } = useSupabaseSessions();
 
  useEffect(() => { 
      const fetchArticle = async () => {
      const article = await getAdminArticle(id);
      if (!article) {
        notFound();
        return
      }
      setTitle(article.title);
      setContent(article.content);
      setThumbnailImageKey(article.thumbnailImageKey)
      const categories = article.articleCategories.map((ac:any) => ac.category);
      setSelectedCategories(categories);

      const { data } = supabase
        .storage
        .from('article_thumbnail')
        .getPublicUrl(article.thumbnailImageKey);
      if (data) {
        setPreThumbnailUrl(data.publicUrl);
      }
    }
    fetchArticle();
  }, [id])

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    let filePath = thumbnailImageKey;

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const filePath = `private/${uuidv4()}`;

      const { data, error } = await supabase.storage
      .from('article_thumbnail')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
      return;
    }
    setThumbnailImageKey(data.path);

    const { data: publicUrlData } = supabase
        .storage
        .from('article_thumbnail')
        .getPublicUrl(data.path);
      if (publicUrlData) {
        setPreThumbnailUrl(publicUrlData.publicUrl);
      }
    }
  }

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
      thumbnailImageKey
    };

    if (!token) {
      setErrors({ authorization: 'トークンが存在しません。ログインしてください。' });
      setLoading(false);
      return;
    }

     try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(articleData)
      });
      const updatedArticle = await res.json();
      setLoading(false);
      alert('記事の更新に成功しました。');
      await router.push(`/articles/${id}`);
    
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
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        content={content}
        setContent={setContent}
        setThumbnailUrl={setPreThumbnailUrl}
        thumbnailImageKey={thumbnailImageKey}
        loading={loading}
        errors={errors}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
      />
      <div className='sm:flex justify-end mx-8'>
        <p className='text-xl text-slate-500'>この記事を削除しますか？▶️</p>
        <DeleteArticleButton id={id} />
      </div>
    </>
  )
}

export default EditArticle;