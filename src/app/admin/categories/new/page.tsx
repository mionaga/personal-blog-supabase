'use client';

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
      <h2>カテゴリー作成</h2>
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
    </>
  )
}

export default NewCategory;