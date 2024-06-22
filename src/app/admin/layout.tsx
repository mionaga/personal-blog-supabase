'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import { useRouteGuard } from '../_hooks/useSupabaseHooks';

const AdminLayout = ({
  children,
}:{
  children: React.ReactNode
}) => {
    useRouteGuard();

    const pathname = usePathname();
    const isSelected = (href: string) => {
        return pathname.includes(href)
    }

  return (
    <div className='md:flex min-h-screen'>
        <aside className='w-full md:w-1/3 md:px-3 bg-gray-400  text-white'>
        <Link
          href="/admin/articles"
          className={`p-4 block md:mt-3 md:border hover:bg-stone-300 hover:text-slate-600 hover:border-0 ${
            isSelected('/admin/articles') && 'bg-stone-50 text-slate-600'
          }`}
        >
          記事一覧
        </Link>
        <Link
          href="/admin/categories"
          className={`p-4 block md:mt-3 md:border hover:bg-stone-300 hover:text-slate-600 hover:border-0 ${
            isSelected('/admin/categories') && 'bg-stone-50 text-slate-600'
          }`}
        >
          カテゴリー一覧
        </Link>
        </aside>

        <div className='sm:p-4 md:w-2/3 w-full bg-stone-200 min-h-svh'>{children}</div>

    </div>
  )
}

export default AdminLayout