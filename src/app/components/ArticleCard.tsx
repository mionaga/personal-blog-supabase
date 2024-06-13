import { Article } from '@/types/article'
import SelectedCategoy from './SelectedCategoy';
import Image from 'next/image';
import Link from 'next/link';

type ArticleCardProps = {
    article: Article;
}

const ArticleCard = ({ article }:ArticleCardProps) => {
    // console.log(article);

  return (
    <article key={article.id} className='p-4 mb-3 w-full max-w-xl hover:opacity-75'>
        <Link href={`articles/${article.id}`}>
        <Image 
                src={'/imges/girls-6615582_640.jpg'}
                alt='Article Image'
                width={1280}
                height={300}
                className='hover:opacity-75'
            />
            
            <div className='p-6 bg-white'>
            <span className='text-blue-700 pb-4 font-bold'>
                {article.articleCategories.map(category => (
                    <SelectedCategoy key={category.categoryId} category={category.category} />
                ))}
            </span>
            <h2 className='text-slate-900 text-3xl pb-4 font-bold hover:text-gray-700'>{article.title}</h2>
            <p className='text-sm pb-3 text-slate-800 font-medium'>published on {new Date(article.createdAt).toLocaleString()}</p>
            <p className='text-slate-800 font-bold pb-6'>
                {article.content.length > 70 ? article.content.substring(0, 70) + '...' : article.content}
            </p>
            <span className='text-cyan-900 hover:text-red-500 bg-blue-100 bg-opacity-3 p-3 rounded-md'>続きを読む</span>
            </div>
        </Link>
    </article>
  )
}

export default ArticleCard