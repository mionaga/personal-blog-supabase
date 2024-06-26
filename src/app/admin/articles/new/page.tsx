'use client';

import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, useEffect } from 'react'
import ArticleForm from '../components/ArticleForm';
import { articleValidate } from '../components/PostingValidate';
import { Category } from '@/types/category';
import { supabase } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';
import { useSupabaseSessions } from '@/utils/_hooks/useSupabaseHooks';

const CreateArticles = () => {
 
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<{id:number, name:string}[]>([]);
  const [content, setContent] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<null | string>(null,);
  const [thumbnailImageKey, setThumbnailImageKey] = useState('')
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { token } = useSupabaseSessions()

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

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
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

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
      thumbnailImageKey,
    };

    try {
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(articleData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const createdArticle = await response.json();
      const newArticleId = createdArticle.id;

      alert('記事の投稿に成功しました。')
      setLoading(false);
      router.push(`/articles/${newArticleId}`);
      router.refresh();
    } catch (error) {
      console.error('Error creating article:', error);
      setLoading(false);
    }
  }

 
  return (
    <ArticleForm
      mode='new' 
      title={title}
      setTitle={setTitle}
      categories={categories}
      setCategories={setCategories}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
      content={content}
      setContent={setContent}
      setThumbnailUrl={setThumbnailUrl}
      thumbnailImageKey={thumbnailImageKey}
      loading={loading}
      errors={errors}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange} 
    />
  );
}

export default CreateArticles;
