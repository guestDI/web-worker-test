import { Article } from '../types'
import Link from 'next/link'

interface ArticleItemProps {
  article: Article
  showUrl?: boolean
}

const ArticleItem = ({ article, showUrl = false }: ArticleItemProps) => {
  return (
    <div className="border-solid border rounded p-2 mb-2">
      {article.source?.name && <h3 className="text-yellow">{article.source.name}</h3>}
      <p className="text-sm py-1">{article.title}</p>
      <p className="text-xs">{article.content}</p>
      {showUrl && <Link href={article.url ?? ""} className="text-xs pt-2">{article.url}</Link>}
    </div>
  )
}

export default ArticleItem
