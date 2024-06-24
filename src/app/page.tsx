'use client'

import ArticleList from "./components/ArticleList";
import Pagination from './components/Pagination';
import { getArticles, getCategories } from "./getters";
import TopAside from "./components/TopAside";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { Article } from "@/types/article";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedId, setSelectedId] = useState<number | undefined>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  useEffect(() => {
    const fetchTopData = async () => {
      setLoading(true);
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

  const perPage = 5;
  const currentArticles = articles.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div>
      <div className="container mx-auto md:flex xl:mx-20 xl:gap-x-8 mt-3">
        <section className="w-full md:w-2/3 md:flex md:flex:col md:justify-center">
        {!loading && (
            <div className="flex flex-col items-center">
              <ArticleList 
                articles={currentArticles} 
                selectedId={selectedId}
              />
              <div className="p-1 mt-2 sm:mb-8 bg-slate-200 rounded-3xl">
                <Pagination 
                  currentPage={currentPage}
                  perPage={perPage}
                  totalItems={articles.length}
                  handlePageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </section>
        <aside className="w-full md:w-1/3 flex flex-col items-center px-3 md:pl-6 md:mt-12 md:fixed md:top-20 md:right-6">
          <TopAside 
            categories={categories}
            handleClick={handleClick}  
          />    
        </aside>
      </div>
     
    </div>
   
  );
}