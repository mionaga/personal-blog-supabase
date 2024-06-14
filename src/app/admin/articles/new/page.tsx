'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ErrorMessage from '@/app/components/ErrorMessage';
import { getCategories } from '@/app/getters';
import ReactSelect from 'react-select';
import category from '../../categories/[id]/page';

const CreateArticles = () => {
  useEffect(() => {
    const fetchCategories = async () => {
      const categoryElems = await getCategories();
      setCategories(categoryElems);
    };
    fetchCategories();
  }, []);


  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [categories, setCategories] = useState<[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<{id:number, name:string}[]>([]);
  const [content, setContent] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categoryOptions = categories.map(category => {
    return {value: category.id, label: category.name}
  });

  const handleChange = (options) => {
    console.log("Select変更");
    console.log("option", options);
    if (options) {
      setSelectedCategories(options);
      console.log(selectedCategories)
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

     // バリデーションチェック
     const newErrors: { [key: string]: string } = {};
     if (title.trim() === '') newErrors.title = 'タイトルが空欄です';
     if (selectedCategories.length === 0) newErrors.categories = 'カテゴリーが選択されていません。';
     if (content.trim() === '') newErrors.content = '本文が空欄です';
 
     if (Object.keys(newErrors).length > 0) {
       setErrors(newErrors);
       return;
     }
    setErrors({});
    setLoading(true);

    await fetch('/api/admin/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, content, categories, thumbnailUrl})
    });

    setLoading(false);
    router.push(`/admin/posts/${id}`);
    router.refresh();
  }

  return (
    <>
      <div className='min-h-screen px-4'>
        <div className='p-6 text-slate-700'>
          <h2 className=' text-2xl font-bold mb-4'>ブログ新規作成</h2>

          <form onSubmit={handleSubmit}>

            <div className='mb-4'>
              <label htmlFor="title">タイトル</label>
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
              <label htmlFor="thumbnailUrl">画像選択</label>
              <input 
              type="text" 
              name="thumbnailUrl" 
              id="thumbnaiUrl"
              className='shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none bg-slate-50'
              onChange={e => {
                setThumbnailUrl(e.target.value);
              }}
              />
              {errors.thumbnailUrl && <ErrorMessage message={errors.thumbnailUrl} />}
            </div>

            <div className='mb-4'>
              <label htmlFor="category">カテゴリー選択</label>
              <ReactSelect 
              name="category" 
              id="category"
              instanceId="search-select-box"
              options={categoryOptions}
              placeholder='選択してください'
              components={{
                /** Defaultで表示されているセパレーターを消す */
                // IndicatorSeparator: () => null,
              }}
              isMulti
              // className='shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none'
              onChange={(options) => (options ? handleChange([...options]) : null)}
              
              // >
              //   <option value=''>選択してください</option>
              //   {categories.map(category => (
              //     <option 
              //     key={category.id}
              //     value={category.id.toString()}>
              //       {category.name}
              //   </option>
              //   )
              //   )}
              // </ReactSelect>
              />
              {errors.categories && <ErrorMessage message={errors.categories} />}
            </div>

            <div className='mb-4'>
              <label htmlFor="content">本文</label>
              <textarea 
              name="content" 
              id="content"
              className='shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none h-40'
              onChange={e => {
                setContent(e.target.value);
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
              disabled={loading}
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