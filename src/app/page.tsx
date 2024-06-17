import Image from "next/image";
import ArticleList from "./components/ArticleList";
import { getArticles } from "./getters";
import TopAside from "./components/TopAside";

export default async function Home() {
  const articles = await getArticles();

  return (
   <div className="container mx-auto md:flex xl:mx-20 xl:gap-x-8 mt-3">
    <section className="w-full md:w-2/3 md:flex md:flex:col md:justify-center">
      <ArticleList articles={articles} />
    </section>
    <aside className="w-full md:w-1/3 flex flex-col items-center px-3 md:pl-6 md:fixed md:top-20 md:right-6">
      <TopAside />    
    </aside>
   </div>
  );
}