'use client'

import { Category } from '@/types/category';
import ErrorMessage from '@/app/components/ErrorMessage';
import React, { ChangeEvent, useEffect } from 'react'
import SelectCategory from './SelectCategory';
import Link from 'next/link';
import { supabase } from '@/utils/supabase';

type ArticleFormProps = {
  mode: 'new' | 'edit';
  title: string;
  setTitle: (title: string) => void;
  categories: Category[];
  setCategories: ( categories: Category[] ) => void;
  selectedCategories: { id: number, name: string }[];
  setSelectedCategories: (categories: { id: number, name: string }[]) => void;
  content: string
  setContent: (content: string) => void;
  setThumbnailUrl: (thumbnailUrl: string) => void
  thumbnailImageKey: string;
  loading: boolean;
  errors: { [key: string]: string };
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const ArticleForm = ({
  mode,
  title,
  setTitle,
  categories,
  setCategories,
  selectedCategories,
  setSelectedCategories,
  content,
  setContent, 
  setThumbnailUrl,
  thumbnailImageKey,
  loading,
  errors,
  handleSubmit,
  handleImageChange,
}: ArticleFormProps) => {

  useEffect(() => {
    if (!thumbnailImageKey) return;

    const fetchImage = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from('article_thumbnail')
        .getPublicUrl(thumbnailImageKey)

      console.log(publicUrl)

      setThumbnailUrl(publicUrl);
    }
    fetchImage();
  }, [thumbnailImageKey])

  return (
    <div className='min-h-screen sm:px-4'>
      <div className='p-6 text-slate-700'>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {mode === 'new' ? 'ブログ新規作成' : 'ブログ編集'}
          </h2>
          <div className='bg-stone-300 px-5 py-2 rounded-sm font-bold mb-4 text-slate-600 hover:bg-stone-500 hover:text-white cursor-pointer'>
            <Link href={'/admin/articles'}>記事一覧画面へ</Link>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="title">タイトル</label>
            <input 
              type="text" 
              name="title" 
              id="title"
              value={title}
              className='shadow-md border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none'
              onChange={e => setTitle(e.target.value)}
            />
            {errors.title && <ErrorMessage message={errors.title} />}
          </div>

          <div className='mb-4'>
            <label htmlFor="thumbnailImageKey">画像選択</label>
            <input 
              type="file" 
              // name="thumbnailImageKey" 
              accept='image/*'
              id="thumbnailImageKey"
              className='shadow-md border rounded w-ful bg-white py-3 px-2 my-3 mx-2 text-gray-700 leading-tight focus:outline-none'
              onChange={handleImageChange}
            />
            {errors.thumbnailUrl && <ErrorMessage message={errors.thumbnailUrl} />}
          </div>

          <div className='mb-4'>
           <SelectCategory
              categories={categories} 
              setCategories={setCategories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              errors={errors}
            />
          </div>

          <div className='mb-4'>
            <label htmlFor="content">本文入力欄</label>
            <textarea 
              name="content" 
              id="content"
              value={content}
              className='shadow-md border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none h-30'
              onChange={e => setContent(e.target.value)}
            />
            {errors.content && <ErrorMessage message={errors.content} />}
          </div>

          <div className='mb-4 px-3 sm:px-10 py-2 sm:py-6 bg-zinc-100 text-lg align-middle whitespace-break-spaces leading-relaxed text-justify '>
            {content}
          </div>

          <button
            type='submit'
            className={`py-2 px-4 rounded-md text-slate-50 ${
              loading
              ? 'bg-orange-200 cursor-not-allowed'
              : 'bg-orange-400 hover:bg-orange-500'
            }`}
            disabled={loading}
          >
            {loading ? '投稿中...' : '投稿'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ArticleForm