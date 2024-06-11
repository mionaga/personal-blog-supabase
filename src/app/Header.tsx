'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const Header = () => {
    const pathname = usePathname();
    const isAdminRoute = pathname.includes('/admin');

  return (
    <header className='py-5 px-10 border-b flex justify-between'>
        <div>
            <h1 className='text-2xl font-extrabold'>
                <Link href='/'>Blog</Link>
            </h1>
        </div>
        <div>
            <nav>
                {isAdminRoute && (
                    <Link href='/articles/new' className='font-medium text-sm bg-orange-300 px-3 py-4 rounded-lg shadow-md hover:shadow-none'>記事を書く</Link>
                )}
            </nav>
        </div>
    </header>
  )
}

export default Header;