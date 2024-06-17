import { getCategories } from '@/app/getters'
import DeleteCategoryButton from './components/DeleteCategoryBuuton';
import Link from 'next/link';
import React from 'react'

const CategoriesIndex = async () => {
    const categories = await getCategories();
    console.log(categories);

  return (
    <>
      <div className="py-3 px-4">
      <div className="sm:flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold ml-2">カテゴリー一覧</h1>
        <div className='bg-stone-300 px-5 py-2 rounded-sm font-bold text-slate-600 hover:bg-stone-500 hover:text-white cursor-pointer'>
          <Link href={'/admin/categories/new'}>新規カテゴリーの登録</Link>
        </div>
      </div>

      <div className="">
        {categories.map((category) => {
          return (
            <div className="border-b border-gray-300 p-4 cursor-pointer flex justify-between gap-10 hover:bg-gray-100">
              <div className="md:w-3/4 flex justify-between">

                <Link href={`/admin/categories/${category.id}`} key={category.id}>
                  <div>
                    <div className="text-xl font-bold">
                        {category.name}
                    </div>
                    <div className="text-gray-500">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
                
              </div>
              <div className="md:w-1/4 flex justify-between gap-2">
   
                <button  className='text-amber-600 hover:text-amber-800 font-semibold text-lg cursor-pointer'>
                  <Link href={`/admin/categories/${category.id}`} key={category.id}>編集</Link>
                </button>
                <DeleteCategoryButton id={category.id} />
                
              </div>
             
          </div>

          )
        })}  
        </div>
        </div>
    </>
  )
}

export default CategoriesIndex