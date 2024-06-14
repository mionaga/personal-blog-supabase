import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='flex items-center justify-center mt-20'>
        <div className='px-8 py-10 bg-white rounded-md shadow-sm'>
            <h1 className='text-2xl mb-3'>404エラー</h1>
            <p className='text-slate-700 mb-12'>ご指定のページが見つかりませんでした。</p> 
            <Link href="/"><span className='p-3 border rounded-xl bg-slate-100 hover:bg-slate-300'>Return Home</span></Link>   
        </div>
    </div>
  )
}

export default NotFound;