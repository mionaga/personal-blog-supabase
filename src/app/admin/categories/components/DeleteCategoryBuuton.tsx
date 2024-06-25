'use client'

import { useSupabaseSessions } from '@/utils/_hooks/useSupabaseHooks';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type DeleteCategoryButtonProps = {
    id: string;
}

const DeleteCategoryButton = ({ id }: DeleteCategoryButtonProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { token } = useSupabaseSessions();

    const handleRemove = async () => {
        setLoading(true);

        await fetch(`/api/admin/categories/${id}`, { 
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          }
        });

        setLoading(false);
        router.push('/admin/categories');
        router.refresh();
    }

  return (
    <div
    className='text-red-700 hover:text-red-600 font-semibold text-lg cursor-pointer mt-3'
    onClick={handleRemove}
    >削除</div>
  )
}

export default DeleteCategoryButton;