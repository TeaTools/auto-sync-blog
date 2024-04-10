import { getUserArticles, getUserColumns, processColumnArticleMap } from "../../requests/juejin.js"
import configurations from "../../../configurations.js"
import { getArticleInfo } from "../../generator/juejin/utils.js"

let articles = null

export const setArticles = async (newArticles = [], useSort = false) => {
  newArticles.forEach(article => {
    article.formatInfo = getArticleInfo(article)
  })

  articles = newArticles

  if (useSort) {
    articles = newArticles.sort((prev, next) => next.article_info.ctime - prev.article_info.ctime)
  }

  return articles
}
export const getArticles = async () => {
  if (!articles) {
    const newArticles = await getUserArticles(configurations.juejin.userId)
    await setArticles(newArticles, true)
  }
  return articles
}

let columns = null

export const setColumns = async (newColumns) => {
  return (columns = newColumns)
}
export const getColumns = async () => {
  if (!columns) {
    await setColumns(getUserColumns(configurations.juejin.userId))
  }
  return columns
}

let articlesAndColumnsMap = { articles, columns }

export const setArticlesAndColumnsMap = async (key, value) => {
  articlesAndColumnsMap[key] = value
  return articlesAndColumnsMap
}
export const getArticlesAndColumnsMap = async () => {
  const articles = await getArticles()
  const columns = await getColumns()

  const articlesMap = new Map()

  articles.forEach(article => articlesMap.set(article.article_id, article))

  let unColumnArticles = [...articles]

  const removeUnColumnArticle = (columnArticleList) => {
    for (let idx = 0; idx < columnArticleList.length; idx++) {
      const { article_id } = columnArticleList[idx]
      if (!article_id) continue

      const removeIndex = unColumnArticles.findIndex((item) => item.article_id === article_id)
      if (removeIndex > -1) {
        unColumnArticles.splice(removeIndex, 1)
      }
    }
  }

  const columnMap = await processColumnArticleMap(columns, articlesMap, removeUnColumnArticle)

  return {
    articles,
    articlesMap,
    unColumnArticles,
    columns,
    columnMap,
  }
}
