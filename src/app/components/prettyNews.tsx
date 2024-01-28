'use client'

import React, { useState, useEffect } from 'react'
import { Article, ArticlesResponse, ArticleRowItem } from '../types/Article'
import Button from './button'
import ArticleItem from './articleItem'

interface NewsProps {
  data: ArticlesResponse
}

interface artType {  
  [key: string]: ArticleRowItem;
} 

const PrettyNews = ({ data = { status: 'unknown' } }: NewsProps) => {
  const [result, setResult] = useState({rows: {}})
  const [worker, setWorker] = useState<Worker | null>(null)

  useEffect(() => {
    // Create a new web worker. Worker creation should be in one line because of Next.js bug
    const myWorker = new Worker(
      new URL('../workers/worker.ts', import.meta.url)
    )

    // Set up event listener for messages from the worker
    myWorker.onmessage = function (event) {
      setResult(event.data)
    }

    // Save the worker instance to state
    setWorker(myWorker)

    // Clean up the worker when the component unmounts
    return () => {
      myWorker.terminate()
    }
  }, []) // Run this effect only once when the component mounts

  const onGroup = () => {
    // Send a message to the worker
    if (worker) {
      worker.postMessage(data)
    }
  }

  const renderArticles = (articles: Article[]) => {
    return articles.map((article: Article, i: number) => {
      return <ArticleItem key={i} article={article} showUrl={true}/>
    })
  }

  const item = result.rows as artType

  return (
    <div className="flex flex-col w-1/2 px-4 items-center">
      <p>Result from the worker</p>
      <div className=" w-full bg-gray-50 max-h-128 overflow-y-auto p-4">
        {Object.keys(item).map((source, ind) => {
          return (
            <div key={ind} className="mb-4">
              <p className="text-yellow pb-2">{item[source].sourceName}</p>
              <div>{renderArticles(item[source].articles)}</div>
              <span>Number of articles: {item[source].total}</span>
            </div>
          )
        })}
      </div>
      <div className="mt-8">
        <Button title="Group articles" onClick={onGroup} />
      </div>
    </div>
  )
}

export default PrettyNews
