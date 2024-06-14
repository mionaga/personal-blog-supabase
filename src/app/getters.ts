export const getArticles = async () => {
    const res = await fetch('http://localhost:3000/api/articles',
         { cache: 'no-store' }
        );
    
        if (!res.ok) {
            throw new Error("Failed to fetch article");
          }
  
          const articles = await res.json();
          return articles.articles;
}

export const getArticle = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/articles/${id}`, {
      next: { revalidate: 60 },
    });
  
    if (res.status === 404) {
      notFound();
    }
  
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
  
    const article = await res.json();
    return article.article;
  };

  export const getCategories = async () => {
    const res = await fetch('http://localhost:3000/api/admin/categories',
         { cache: 'no-store' }
        );
    
        if (!res.ok) {
            throw new Error("Failed to fetch categories");
          }
  
          const categories = await res.json();
          return categories.categories;
}