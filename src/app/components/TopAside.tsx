import React from 'react'
import { getCategories } from '../getters'
import { Category } from '@/types/category';
import Image from 'next/image';

type TopAsideProps = {
    categories: Category[];
    handleClick: (id: number) => void;
}

const TopAside = ({ categories, handleClick }: TopAsideProps) => {

  return (
    <>
        <div className="bg-white shadow-md rounded p-6 mb-6 mt-4">
            <div className='flex justify-around items-center mb-3'>
                <h3 className="font-bold text-gray-900 text-lg mb-2">About Me</h3>
                <Image 
                    src={'/imges/IMG_3198.jpeg'}
                    alt='Profile Image'
                    width={60}
                    height={60}
                    className='mx-auto rounded-full sm:mx-0 sm:shrink-0'
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                />
            </div>
            <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis laborum
             nisi consequatur animi consequuntur maiores, officia id est velit non,
              distinctio iure. Neque, et tenetur rem esse similique deserunt adipisci?
            </p>
        </div>
        <div className="bg-white shadow-md rounded p-4 mb-6 mt-4 w-full">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Category</h3>
            <ul className="text-gray-600 mt-2">
            {categories.map(category => (
                <li 
                    key={category.id}
                    className='px-2 pb-2 cursor-pointer text-blue-700 font-bold'
                    onClick={() => handleClick(category.id)} 
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