'use client'

import Image from "next/image";
import ArticleList from "./components/ArticleList";
import { getArticles, getCategories } from "./getters";
import TopAside from "./components/TopAside";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { Article } from "@/types/article";

export default async function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [id, setId] = useState<number>()

  useEffect(() => {
    const fetchTopData = async () => {
      const articlesData = await getArticles();
      setArticles(articlesData);

      const categoryData = await getCategories();
      setCategories(categoryData);
    }
    fetchTopData();
  }, [])

  const handleClick = (id: number) => {
    const selectedCategory = categories.filter(c => id === c.id)
    setId(selectedCategory[0].id)
  }


  return (
   <div className="container mx-auto md:flex xl:mx-20 xl:gap-x-8 mt-3">
    <section className="w-full md:w-2/3 md:flex md:flex:col md:justify-center">
      <ArticleList articles={articles} />
    </section>
    <aside className="w-full md:w-1/3 flex flex-col items-center px-3 md:pl-6 md:fixed md:top-20 md:right-6">
      <TopAside 
        categories={categories}
        handleClick={handleClick}  
      />    
    </aside>
   </div>
  );
}