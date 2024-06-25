import { Category } from "@prisma/client";

export interface ArticleCategory {
  id: number;
  articleId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
}