'use client'

import Link from 'next/link'
import React from 'react'
import HeaderDrawer from './components/HeaderDrawer';
import { usePathname } from 'next/navigation';
import { useSupabaseSessions } from '../utils/_hooks/useSupabaseHooks';
import { supabase } from '@/utils/supabase';


const Header = () => {
    const pathname = usePathname();
    const isAdminRoute = pathname.includes('/admin');

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/';
    }

    const { session, isLoading } = useSupabaseSessions();

    if (isLoading) {
        return (
            <header className={`py-5 px-10 flex justify-between ${isAdminRoute ? 'bg-slate-600 text-slate-50' : 'border-b text-slate-700' }`}>
                <div>
                    <h1 className='text-2xl font-extrabold md:pl-10'>
                        <Link href='/'>Blog</Link>
                    </h1>
                </div>
                <div>
                    <div className='bg-slate-50 rounded-full py-3 px-2'>Loading...</div>
                </div>
            </header>
        );
    }
   
  return (
    <header className={`py-5 px-10 flex justify-between ${isAdminRoute ? 'bg-slate-600 text-slate-50' : 'border-b text-slate-700' }`}>
        <div>
            <h1 className='text-2xl font-extrabold md:pl-10'>
                <Link href='/'>Blog</Link>
            </h1>
        </div>
        <div>
            <nav>
                {
                    session? (
                    <HeaderDrawer isAdminRoute={isAdminRoute} handleLogout={handleLogout} />
                    ) 
                    : (
                    <Link  href={'/login'}>
                        <div className='bg-slate-50 rounded-full py-3 px-2'>Login</div>   
                    </Link>
                    )
                }
            </nav>
        </div>
    </header>
  )
}

export default Header;
