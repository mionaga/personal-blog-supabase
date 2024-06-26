import React from 'react'
import { Category } from '@/types/category';
import Image from 'next/image';
import Link from 'next/link';

type TopAsideProps = {
    categories: Category[];
}

const TopAside = ({ categories }: TopAsideProps) => {

  return (
    <>
        <div className="bg-white shadow-md rounded px-6 pt-8 pb-12 mb-6 mt-4">
            <div className='flex justify-around items-center mb-3'>
                <h3 className="font-bold text-gray-900 text-lg mb-2">About Me</h3>
                <Image 
                    src={'/imges/IMG_1956.jpeg'}
                    alt='Profile Image'
                    width={60}
                    height={70}
                    className='image-auto rounded-full sm:mx-0 sm:shrink-0'
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                />
            </div>
            <p className="text-gray-600">
            こんにちは！<br></br>
            このブログにお越しいただき、ありがとうございます。<br></br>
            京都市に在住のitokonaです。<br></br>
            娘と息子、夫、2匹の猫の6人家族で暮らしています。<br></br>
            趣味はお菓子作りとパン屋巡り、パティスリー巡りです。
            たまに家族でキャンプに出かけることもあります。<br></br>
            このブログでは、バタバタと過ぎ去る日々の中での私たち家族のことや、趣味のこと、そして京都での暮らしについて発信していけた
            らと思っています。<br></br>
            どうぞ、のぞいていってください。
            
            </p>
        </div>
        <div className="bg-white shadow-md rounded p-4 mb-6 mt-4 w-full">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Category</h3>
            <ul className="text-gray-600 mt-2">
            {categories.map(category => (
                <Link href={`?category=${category.id}`} key={category.id}>
                    <li className='px-2 pb-2 cursor-pointer text-blue-700 font-bold'>
                        {category.name}
                    </li>
                </Link>
            ))}
            <Link href={'/'}>
                <li className='px-2 pb-2 cursor-pointer text-blue-700 font-bold'>
                    All blogs
                </li>
            </Link>
            </ul>
        </div>
    </>
  )
}

export default TopAside