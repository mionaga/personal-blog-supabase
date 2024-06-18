const API_URL = 'http://localhost:3000/api'

export const getArticles = async () => {
    const res = await fetch(API_URL + '/articles');
   
          const articles = await res.json();
          return articles.articles;
}

export const getArticle = async (id: string) => {
    const res = await fetch(`${API_URL}/articles/${id}`, {
      next: { revalidate: 60 },
    });
  
    const article = await res.json();
    return article.article;
}

export const getAdminArticles = async () => {
  const res = await fetch(`${API_URL}/admin/articles`,
       { cache: 'no-store' }
      );
 
        const articles = await res.json();
        return articles.articles;
}

export const getAdminArticle = async (id: string) => {
  const res = await fetch(`${API_URL}/admin/articles/${id}`);

  const article = await res.json();
  return article.article;
}

export const getCategories = async () => {
    const res = await fetch(`${API_URL}/admin/categories`,
         { cache: 'no-store' }
        );
          const categories = await res.json();
          return categories.categories;
}

export const getCategory = async (id: string) => {
  const res = await fetch(`${API_URL}/admin/categories/${id}`, {
    next: { revalidate: 60 },
  });

  const category = await res.json();
  return category.categories;
}