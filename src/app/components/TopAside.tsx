import React from 'react'
import { getCategories } from '../getters'

const TopAside = async () => {
    const categories = await getCategories();

  return (
    <>
        <div className="bg-white shadow-md rounded p-4 mb-6 mt-4">
            <h3 className="font-bold text-gray-900 mb-2">About Me</h3>
            <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
            </p>
        </div>
        <div className="bg-white shadow-md rounded p-4 mb-6 mt-4 w-full">
            <h3 className="font-bold text-gray-900 mb-2">Category</h3>
            <ul className="text-gray-600 mt-2">
            {categories.map(category => (
                <li 
                    key={category.id}
                    className='px-2'
                    // onClick={{onSelectCategory(category.id)}} 
                     >
                    {category.name}
                </li>
            ))}
            </ul>
        </div>
    </>
  )
}

export default TopAside