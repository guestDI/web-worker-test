'use client'

import React from 'react'
import { Article, ArticlesResponse } from '../types'
import Button from './button'
import ArticleItem from './articleItem'

interface NewsProps {
  data: ArticlesResponse
  refresh: () => void
}

const RawNews = ({ data, refresh }: NewsProps) => {
  const onRefresh = () => {
    refresh?.()
  }

  return (
    <div className="flex flex-col w-1/2 px-4 items-center">
      <p>Raw results</p>
      <div className=" w-4/5 bg-gray-50 max-h-128 overflow-y-auto p-4">
        {data?.articles?.map(
          (article: Article, ind: number) => {
            return (
              <ArticleItem key={ind} article={article} />
            )
          }
        )}
      </div>
      <div className="mt-8">
        <Button
          title="Fetch articles"
          onClick={onRefresh}
        />
      </div>
    </div>
  )
}

export default RawNews
