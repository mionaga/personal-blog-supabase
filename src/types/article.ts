import { Category } from "./category"

export interface Article {
    id: number
    title: string
    content: string
    createdAt: string
    postCategories: { category: Category }[]
    thumbnailUrl: string
  }