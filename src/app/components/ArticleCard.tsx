import { Article } from '@/types/article'
import SelectedCategory from './SelectedCategory';
import Link from 'next/link';
import ImageFetcher from './ImageFetcher';
import { ArticleCategory } from '@/types/articleCategory';

type ArticleCardProps = {
    article: Article;
}

const ArticleCard = ({ article }:ArticleCardProps) => {
    console.log('article :', article.articleCategories);

  return (
    <article key={article.id} className='my-6 w-full max-w-xl shadow-sm hover:opacity-75 hover:shadow-none md:m-5'>
        <Link href={`articles/${article.id}`}>
        {article.thumbnailImageKey && (
          <ImageFetcher 
            thumbnailImageKey={article.thumbnailImageKey} 
            alt='Article Image'
            width={600}
            height={300}
            className='image-auto bg-slate-50 p-2 hover:opacity-75'
        />
        )}
            <div className='p-6 bg-white'>
            <span className='text-blue-700 pb-4 font-bold'>
                {article.articleCategories.map((ac: ArticleCategory) => (
                    <div key={ac.categoryId}>
                        <SelectedCategory articleCategory={ac} />
                    </div>
                ))}
            </span>
            <h2 className='text-slate-900 text-3xl pb-4 font-bold hover:text-gray-700'>{article.title}</h2>
            <p className='text-sm pb-3 text-slate-800 font-medium'>published on {new Date(article.createdAt).toLocaleDateString()}</p>
            <p className='text-slate-800 font-bold pb-6'>
                {article.content.length > 70 ? article.content.substring(0, 70) + '...' : article.content}
            </p>
            <span className='text-cyan-900 hover:text-red-500 bg-blue-100 bg-opacity-3 p-3 rounded-md'>続きを読む</span>
            </div>
        </Link>
    </article>
  )
}

export default ArticleCard;