'use client'

import RawNews from './components/rawNews'
import { useEffect, useState } from 'react'
import PrettyNews from './components/prettyNews'
import { ArticlesResponse } from './types'

const url =
  'https://newsapi.org/v2/everything?q=oscar&apiKey='

export default function Home() {
  const [articles, setArticles] =
    useState<ArticlesResponse>({status: 'unknown'})

  const getNews = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setArticles(json));
  }

  useEffect(() => {
    getNews()
  }, [])

  return (
    <main className="flex min-h-screen flex-row items-center justify-between px-20 py-14">
      <RawNews data={articles} refresh={getNews} />
      <PrettyNews data={articles} />
    </main>
  )
}
