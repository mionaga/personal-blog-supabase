const API_URL = process.env.NEXT_PUBLIC_API_BASEURL || 'http://localhost:3000';

export const getArticles = async () => {
    const res = await fetch(`${API_URL}/api/articles`, { cache: 'no-store' });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch articles: ${errorText}`);
    }
    const articles = await res.json();
    return articles.articles;
}

export const getArticle = async (id: string) => {
    const res = await fetch(`${API_URL}/api/articles/${id}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch article with id ${id}`);
    }
    const article = await res.json();
    return article.article;
}

export const getAdminArticles = async () => {
    const res = await fetch(`${API_URL}/api/admin/articles`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch admin articles');
    }
    const articles = await res.json();
    return articles.articles;
}

export const getAdminArticle = async (id: string) => {
    const res = await fetch(`${API_URL}/api/admin/articles/${id}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch admin article with id ${id}`);
    }
    const article = await res.json();
    return article.article;
}

export const getCategories = async () => {
    const res = await fetch(`${API_URL}/api/admin/categories`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }
    const categories = await res.json();
    return categories.categories;
}

