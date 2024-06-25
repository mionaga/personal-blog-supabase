'use client'

import ErrorMessage from '@/app/components/ErrorMessage';
import React from 'react'

type CategoryFormProps = {
    name: string;
    setName: (name: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    loading: boolean;
    errors: { [key: string]: string };
}

const CategoryForm = ({ name, setName, handleSubmit, loading, errors }:CategoryFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
        <div className='mb-4'>
        <label htmlFor="name" className='text-slate-600'>カテゴリー名</label>
        <input 
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className='shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none'
        />
        {errors.name && <ErrorMessage message={errors.name} />}
        </div>
        <button 
            type='submit'
            className={`py-2 px-4 rounded-md text-slate-50 ${
                loading
                ? "bg-orange-200 cursor-not-allowed"
                : "bg-orange-400 hover:bg-orange-500"
            }`}
            disabled={loading}
        >
        {loading ? '登録中...' : '登録'}
        </button>
    </form>
  )
}

export default CategoryForm