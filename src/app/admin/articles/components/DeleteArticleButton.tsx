'use client'

import { useRouter } from 'next/navigation';
import React from 'react'

type DeleteButtonProps = {
    id: string;
}

const DeleteArticleButton = ({ id }: DeleteButtonProps) => {
    const router = useRouter();

    const handleRemove = async () => {
        await fetch(`http://localhost:3000//api/admin/articles/${id}`, { method: 'DELETE' });

        router.push('/admin/articles');
        router.refresh();
    }

  return (
    <div
    className='text-red-700 hover:text-red-600 font-semibold text-lg cursor-pointer'
    onClick={handleRemove}
    >削除</div>
  )
}

export default DeleteArticleButton