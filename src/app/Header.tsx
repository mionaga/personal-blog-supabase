'use client'

import Link from 'next/link'
import React from 'react'
import HeaderDrawer from './components/HeaderDrawer';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    const isAdminRoute = pathname.includes('/admin');
   
  return (
    <header className={`py-5 px-10 flex justify-between ${isAdminRoute ? 'bg-slate-600 text-slate-50' : 'border-b text-slate-700' }`}>
        <div>
            <h1 className='text-2xl font-extrabold md:pl-10'>
                <Link href='/'>Blog</Link>
            </h1>
        </div>
        <div>
            <nav>
                {/* {isAdminRoute && (
                    <Link href='/admin/articles/new' className='font-medium text-sm bg-orange-300 px-3 py-4 rounded-lg shadow-md hover:shadow-none md:mr-10'>記事を書く</Link>
                )} */}
                <HeaderDrawer isAdminRoute={isAdminRoute} />
            </nav>
        </div>
    </header>
  )
}

export default Header;
