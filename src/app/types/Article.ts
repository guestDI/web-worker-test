import { Status } from './common'

interface Source {
  id: string
  name: string
}

export interface Article {
  source: Source
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

export interface CombinedArticle {
  sourceId?: string
  sourceName?: string
  percentageOfTotal?: number
  articles?: Array<Omit<Article, 'source'>>
}

export interface ArticlesResponse {
  status: Status
  totalResults?: number
  articles?: Article[]
}

export interface ArticleRowItem {
  sourceName?: string
  total?: number
  articles?: Array<Omit<Article, 'source'>>
}
