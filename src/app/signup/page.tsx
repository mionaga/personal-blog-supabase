'use client'

import { supabase } from '@/utils/supabase'
import React, { useState } from 'react'

const Signup = ()=> {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'http://localhost:3000/login',
            },
        })
        if (error) {
            alert('登録に失敗しました')
        } else {
            setEmail('')
            setPassword('')
            alert('確認メールを送信しました。')
        }
    }

  return (

    <div className='flex justify-center py-[240px]'>
        <div className='flex justify-center w-full bg-gray-200 px-6 py-8 max-w-[500px] shadow'>
            <form 
                onSubmit={handleSubmit}
                className='space-y-4 w-full max-w-[400px]'
            >
                <div>
                    <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>
                        メールアドレス
                    </label>
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5'
                        placeholder='name@company.com'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        vallue={email}      
                    />
                </div>
                <div>
                    <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900'>
                        パスワード
                    </label>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5'
                        placeholder='•••••••••'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        vallue={password}      
                    />
                </div>
                
                <div>
                    <button
                        type='submit'
                        className='w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                    >
                        登録
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup