'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import ArticleForm from '../components/ArticleForm';
import { postingValidate } from '../components/PostingValidate';

const CreateArticles = () => {
 
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [categories, setCategories] = useState<[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<{id:number, name:string}[]>([]);
  const [content, setContent] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ヴァリデーションチェック
    const newErrors = postingValidate(title, selectedCategories, content);
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

    try {
      await fetch('/api/admin/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData)
      });

      setLoading(false);
      router.push(`/admin/articles`);
      router.refresh();
    } catch (error) {
      console.error('Error creating article:', error);
      setLoading(false);
    }
  }

  return (
    <ArticleForm 
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
  );
}

export default CreateArticles;
