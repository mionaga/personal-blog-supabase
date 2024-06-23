'use client'

import ArticleList from "./components/ArticleList";
import { getArticles, getCategories } from "./getters";
import TopAside from "./components/TopAside";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { Article } from "@/types/article";
import { Pagination } from "@mui/material";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedId, setSelectedId] = useState<number | undefined>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchTopData = async () => {
      try {
        const [articleData, categoryData] = await Promise.all([
          getArticles(),
          getCategories()
        ]);
        setArticles(articleData);
        setCategories(categoryData);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTopData();
  }, []);

  const handleClick = (selectedId: number) => {
    const selectedCategory = categories.filter(c => selectedId === c.id)
    if (selectedCategory.length >0) {
      setSelectedId(selectedCategory[0].id)
      console.log(selectedCategory[0].id)
    }
  }

  return (
    <div>
      <div className="container mx-auto md:flex xl:mx-20 xl:gap-x-8 mt-3">
        <section className="w-full md:w-2/3 md:flex md:flex:col md:justify-center">
          <ArticleList 
            articles={articles} 
            selectedId={selectedId}
            currentPage={currentPage}
          />
        </section>
        <aside className="w-full md:w-1/3 flex flex-col items-center px-3 md:pl-6 md:mt-12 md:fixed md:top-20 md:right-6">
          <TopAside 
            categories={categories}
            handleClick={handleClick}  
          />    
        </aside>
      </div>
      {!loading && (
        <Pagination 
          currentPage={currentPage}
          limit={5}
          count={articles.length}
          path="/"
        />
      )}
    </div>
   
  );
}