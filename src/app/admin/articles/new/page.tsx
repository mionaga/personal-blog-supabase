'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ErrorMessage from '@/app/components/ErrorMessage';
import { Category } from '@prisma/client';

const CreateArticles = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [content, setContent] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const allFieldFilled = 
      title.trim() !== '' && 
      thumbnailUrl !== undefined && 
      categories.length !== 0 && 
      content.trim() !== '';

    setIsDisabled(!allFieldFilled); 
  }, [title, thumbnailUrl, content]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

     // バリデーションチェック
     const newErrors: { [key: string]: string } = {};
     if (title.trim() === '') newErrors.title = 'タイトルが空欄です';
     if (thumbnailUrl === undefined) newErrors.thumbnailUrl = '画像選択が空欄です';
     if (categories.length === 0) newErrors.category = 'カテゴリー選択が空欄です';
     if (content.trim() === '') newErrors.content = '本文が空欄です';
 
     if (Object.keys(newErrors).length > 0) {
       setErrors(newErrors);
       return;
     }
 
    setErrors({});
    setLoading(true);

    const API_URL = 'http://localhost:3000';
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('thumbnailUrl', thumbnailUrl!); 
    formData.append('categories', selectedCategories); 

    await fetch(`${API_URL}/api/admin/articles`, {
      method: 'POST',
      body: formData,
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      // body: JSON.stringify({title, content, categories: category, thumbnailUrl})
    });

    setLoading(false);
    router.push('/admin/articles');
    router.refresh();
  }

  return (
    <>
      <div className='min-h-screen py-8 px-4 md:px-12'>
        <div className='bg-gray-700 p-6 rounded shadow-mg'>
          <h2 className='text-slate-50 text-2xl font-bold mb-4'>ブログ新規作成</h2>

          <form encType='multipart/form-data' onSubmit={handleSubmit}>

            <div className='mb-4'>
              <label htmlFor="title" className='text-slate-300'>タイトル</label>
              <input 
              type="text" 
              name="title" 
              id="title"
              className='shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none'
              onChange={e => {
                setTitle(e.target.value);
              }}
              />
              {errors.title && <ErrorMessage message={errors.title} />}
            </div>

            <div className='mb-4'>
              <label htmlFor="thumbnailUrl" className='text-slate-300'>画像選択</label>
              <input 
              type="file" 
              name="thumbnailUrl" 
              id="thumbnaiUrl"
              className='shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none bg-slate-50'
              onChange={e => {
                const file = e.target.files?.[0];
                setThumbnailUrl(file);
              }}
              />
              {errors.thumbnailUrl && <ErrorMessage message={errors.thumbnailUrl} />}
            </div>

            <div className='mb-4'>
              <label htmlFor="category" className='text-slate-300'>カテゴリー選択</label>
              <select 
              multiple
              name="category" 
              id="category"
              value={selectedCategories}
              className='shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none'
              onChange={(e) => handleChange((e.target.value as unknown) as number[])}
              >
                {categories.map((category) => {
                  <CategoryItem key{category.id} value={category.id}>
                    {category.name}
                  </CategoryItem>
                })}
              </select>
              {errors.category && <ErrorMessage message={errors.category} />}
            </div>

            <div className='mb-4'>
              <label htmlFor="content" className='text-slate-300'>本文</label>
              <textarea 
              name="content" 
              id="content"
              className='shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none h-40'
              onChange={e => {
                setContent(e.target.value);
                setIsDisabled(e.target.value.trim() === '');
              }}
              />
              {errors.content && <ErrorMessage message={errors.content} />}
            </div>

            <button
              type='submit'
              className={`py-2 px-4 rounded-md text-slate-50 ${
                loading
                ? 'bg-orange-200 cursor-not-allowed'
                : 'bg-orange-400 hover:bg-orange-500'
              }`}
              disabled={loading || isDisabled}
            >
              {loading? '投稿中...' : '投稿'}
            </button>

          </form>
        </div>
      </div>      
    </>
  );
}

export default CreateArticles;