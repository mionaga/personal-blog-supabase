import { getCategories } from '@/app/getters'
import React from 'react'

const CategoriesIndex = async () => {
    const categories = await getCategories();
    console.log(categories);

  return (
    <>
        <h1>カテゴリー一覧</h1>
        {categories.map(category => (
            <div>
                {category.name}
            </div>
        ))}

    
    </>
  )
}

export default CategoriesIndex