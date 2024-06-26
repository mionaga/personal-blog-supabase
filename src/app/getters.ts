

// const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || 'http://localhost:3000/api';

// export const getArticles = async () => {
//     const res = await fetch(API_URL + '/articles', { cache: 'no-store' });
   
//           const articles = await res.json();
//           return articles.articles;
// }

// export const getArticle = async (id: string) => {
//     const res = await fetch(`${API_URL}/articles/${id}`, {
//       next: { revalidate: 60 },
//     });
  
//     const article = await res.json();
//     return article.article;
// }

// export const getAdminArticles = async () => {
//   const res = await fetch(`${API_URL}/admin/articles`, { cache: 'no-store' });
 
//     const articles = await res.json();
//     return articles.articles;
// }

// export const getAdminArticle = async (id: string) => {
//   const res = await fetch(`${API_URL}/admin/articles/${id}`);

//   const article = await res.json();
//   return article.article;
// }

// export const getCategories = async () => {
//   const res = await fetch(`${API_URL}/admin/categories`, { cache: 'no-store' });
//     const categories = await res.json();
//     return categories.categories;
// }

// export const getCategory = async (id: string) => {
//   const res = await fetch(`${API_URL}/admin/categories/${id}`, {
//    next: { revalidate: 60 },
//   });

//   const category = await res.json();
//   return category.categories;
// }

const API_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:3000/api';

export const getArticles = async () => {
    const res = await fetch(`${API_URL}/articles`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch articles');
    }
    const articles = await res.json();
    return articles.articles;
}

export const getArticle = async (id: string) => {
    const res = await fetch(`${API_URL}/articles/${id}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch article with id ${id}`);
    }
    const article = await res.json();
    return article.article;
}

export const getAdminArticles = async () => {
    const res = await fetch(`${API_URL}/admin/articles`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch admin articles');
    }
    const articles = await res.json();
    return articles.articles;
}

export const getAdminArticle = async (id: string) => {
    const res = await fetch(`${API_URL}/admin/articles/${id}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch admin article with id ${id}`);
    }
    const article = await res.json();
    return article.article;
}

export const getCategories = async () => {
    const res = await fetch(`${API_URL}/admin/categories`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }
    const categories = await res.json();
    return categories.categories;
}

export const getCategory = async (id: string) => {
    const res = await fetch(`${API_URL}/admin/categories/${id}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch category with id ${id}`);
    }
    const category = await res.json();
    return category.category;
}
