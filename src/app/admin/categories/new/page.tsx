'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import CategoryForm from '../components/CategoryForm';
import { categoryValidate } from '../../articles/components/PostingValidate';

const NewCategory = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = categoryValidate(name);
    if (Object.keys(newErrors).length >0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    await fetch("/api/admin/categories", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name})
    })
    
    setLoading(false);
    router.push('/admin/categories');
    router.refresh();
  }

  return (
    <>
      <div className="py-3 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">新規カテゴリー登録</h1>
        <div className='bg-stone-300 px-5 py-2 rounded-sm font-bold text-slate-600 hover:bg-stone-500 hover:text-white cursor-pointer'>
          <Link href={'/admin/categories/'}>サイトトップに戻る</Link>
        </div>
      </div>
        <CategoryForm 
          name={name} 
          setName={setName}
          handleSubmit={handleSubmit}
          loading={loading} 
          errors={errors} 
        />
      </div>
    </>
  )
}

export default NewCategory;