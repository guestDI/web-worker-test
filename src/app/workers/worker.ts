import { ArticlesResponse, ArticleRowItem } from "../types";

const performIntensiveTask = (data: ArticlesResponse) => {
  const rows: Record<string, ArticleRowItem> = {};

  data.articles?.map(({source, ...rest}) => {
    let rowItem: ArticleRowItem = {};

    if(rows[source.id]){
      rowItem = rows[source.id];
    }

    rowItem.sourceName = source.name;
    rowItem.articles = rowItem.articles?.length ? [...rowItem.articles, { ...rest }] : [{ ...rest }]

    rowItem.total = rows[source.id]?.articles?.length || 1,
    rows[source.id] = rowItem;
  })

  const summary = {
    total: data.totalResults,
    rows
  };

  return summary
}

onmessage = function (event) {
  const data = event.data

  const result = performIntensiveTask(data)

  // Send the result back to the main thread
  postMessage(result)
}
