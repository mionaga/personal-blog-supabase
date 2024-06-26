'use client'

import { getAdminArticles } from '@/app/getters';
import { useSupabaseSessions } from '@/utils/_hooks/useSupabaseHooks';
import { fabClasses } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type DeleteButtonProps = {
    id: number;
}

const DeleteArticleButton = ({ id }: DeleteButtonProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { token } = useSupabaseSessions();

    const handleRemove = async () => {
        if (!token) return;
        setLoading(true);
        const res =await fetch(`http://localhost:3000//api/admin/articles/${id}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': token,
          }
        });

        const data = await res.json();
        alert(`「${data.article.title}」のブログ記事を削除しました。`)
        setLoading(false);

        await router.push('/admin/articles');
        router.refresh();
    }

  return (
    <button
    className='text-red-700 hover:text-red-600 font-semibold text-lg cursor-pointer'
    onClick={handleRemove}
    disabled={loading}
    >
      {loading? '削除中...' : '削除'}
    </button>
  )
}

export default DeleteArticleButton