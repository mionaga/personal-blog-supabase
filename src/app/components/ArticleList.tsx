import React from 'react'
import ArticleCard from './ArticleCard';
import { Article } from '@/types/article';

type ArticleListProps = {
    articles: Article[];
}

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <>
      <div>
        {
          articles.length > 0 
          ? (articles.map((article) => (
              <ArticleCard article={article} key={article.id} />
              )
            ))
          : (
            <p>投稿された記事はまだありません</p>
          )
         }
      </div>
    </>
    
  )
}

export default ArticleList