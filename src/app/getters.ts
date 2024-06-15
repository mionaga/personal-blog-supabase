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

export const getArticle = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/articles/${id}`, {
      next: { revalidate: 60 },
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
  
    const article = await res.json();
    return article.article;
}

export const getAdminArticles = async () => {
  const res = await fetch('http://localhost:3000/api/admin/articles',
       { cache: 'no-store' }
      );
  
      if (!res.ok) {
          throw new Error("Failed to fetch article");
        }

        const articles = await res.json();
        return articles.articles;
}

export const getAdminArticle = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/admin/articles/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch article");
  }

  const article = await res.json();
  return article.article;
}

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