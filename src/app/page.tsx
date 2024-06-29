import ArticleList from "./components/ArticleList";
import TopAside from "./components/TopAside";
import Pagination from './components/Pagination';
import { getArticles, getCategories } from "./getters";
import { Category } from "@/types/category";
import { Article } from "@/types/article";
import { articleValidate } from "./admin/articles/components/PostingValidate";
import { prisma } from "../../prisma/prisma";

type HomeProps = {
  articles: Article[];
  categories: Category[];
  totalArticles: number;
  currentPage: number;
  perPage: number;
};

export const revalidate = 0;

const Home = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const categoryId = searchParams.category ? parseInt(searchParams.category) : null;
  const perPage = 5;


  const articleData = await prisma.article.findMany({
    include: {
        articleCategories: {
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        },
    },
    orderBy: {
        createdAt: 'desc',
    },
})

  // const articleData = await getArticles();
  const categoryData = await getCategories();
 
  console.log('aaaaa:', articleData);

  let filteredArticles = await articleData;

  if (categoryId) {
    filteredArticles = await articleData.filter((article: Article) => 
      article.articleCategories.some(ac => ac.category.id === categoryId)
    );
  }

  const totalArticles = await filteredArticles.length;
  const currentArticles = filteredArticles.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <>
      <div>
        <div className="container mx-auto md:flex xl:mx-20 xl:gap-x-8 mt-3">
          <section className="w-full md:w-2/3 md:flex md:flex:col md:justify-center">
            <div className="flex flex-col items-center">
              <ArticleList articles={currentArticles} />
              <div className="p-1 mt-2 sm:mb-8 bg-slate-200 rounded-3xl">
                {currentArticles.length > 0
                ? <Pagination 
                    currentPage={currentPage}
                    perPage={perPage}
                    totalItems={totalArticles}
                  />
                : ''
                }
              </div>
            </div>
          </section>
          <aside className="w-full md:w-1/3 flex flex-col items-center px-3 md:pl-6 md:mt-12 md:fixed md:top-20 md:right-6">
            <TopAside categories={categoryData} />    
          </aside>
        </div>
      </div>
    </>
  );
};

export default Home;
