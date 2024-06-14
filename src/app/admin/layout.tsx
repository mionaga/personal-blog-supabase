'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const AdminLayout = ({children}:{children: React.ReactNode}) => {
    const pathname = usePathname();
    const isSelected = (href: string) => {
        return pathname.includes(href)
    }

  return (
    <div className='md:flex mt-4 mx-2 mb-2 min-h-screen'>
        <aside className='w-full md:w-1/3 px-3 bg-stone-600  text-white'>
        <Link
          href="/admin/articles"
          className={`p-4 block mt-3 hover:bg-stone-300 hover:text-slate-600 ${
            isSelected('/admin/articles') && 'bg-stone-50 text-slate-600'
          }`}
        >
          記事一覧
        </Link>
        <Link
          href="/admin/categories"
          className={`p-4 block mt-3 hover:bg-stone-300 hover:text-slate-600 ${
            isSelected('/admin/categories') && 'bg-stone-50 text-slate-600'
          }`}
        >
          カテゴリー一覧
        </Link>
        </aside>

        <div className='p-4 md:w-2/3 w-full bg-stone-50'>{children}</div>

    </div>
  )
}

export default AdminLayout