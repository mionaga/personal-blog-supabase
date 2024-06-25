import React from 'react'
import ArticleCard from './ArticleCard';
import { Article } from '@/types/article';

type ArticleListProps = {
    articles: Article[];
    selectedId: number | undefined;
}

const ArticleList = ({ articles, selectedId }: ArticleListProps) => {
    const filteredArticles = selectedId 
      ? articles.filter(article => {
        const idList = article.articleCategories.map(element => element.categoryId);
        return idList.includes(selectedId);
        })
      : articles;

  return (
    <>
      <div>
        {
          filteredArticles.length > 0 
          ? (filteredArticles.map((article) => (
              <ArticleCard article={article} key={article.id} />
              )
            ))
          : (
            <p>{selectedId ? '選択されたカテゴリーの投稿記事はありません' : ''}</p>
          )
         }
      </div>
    </>
    
  )
}

export default ArticleList