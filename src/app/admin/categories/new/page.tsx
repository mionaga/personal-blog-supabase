'use client';

import Link from 'next/link';
import React, { useState } from 'react'

const NewCategory = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("/api/admin/categories", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name})
    })
    console.log('Category created:', name);
    setName(''); 
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">カテゴリー名</label>
          <input 
          type="text"
          name="name"
          id="name"
          onChange={e => setName(e.target.value)}  
        />
        </div>
        <button type='submit'>
          作成
        </button>
      </form>
      <div>登録済みカテゴリー一覧</div>
      </div>
    </>
  )
}

export default NewCategory;