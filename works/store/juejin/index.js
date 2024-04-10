import { getUserArticles, getUserColumns } from "../../requests/juejin.js"
import configurations from "../../../configurations.js"
import { getArticleInfo } from "../../generator/juejin/utils.js"

let articles = null
let yearCollection = new Map()
let yearMonthCollection = new Map()

export const setArticles = async (newArticles = [], useSort = false) => {
  yearCollection.clear()
  yearMonthCollection.clear()

  newArticles.forEach((article) => {
    const formatInfo = getArticleInfo(article)

    const { YY, YYYYMM } = formatInfo.dateMap
    if (!yearMonthCollection.get(YYYYMM)) {
      yearMonthCollection.set(YYYYMM, 0)
    }
    const yearMonthColl = yearMonthCollection.get(YYYYMM)
    yearMonthCollection.set(YYYYMM, yearMonthColl + 1)

    if (!yearCollection.get(YY)) {
      yearCollection.set(YY, { count: 0, articles: [] })
    }
    const coll = yearCollection.get(YY)
    coll.count += 1
    coll.articles.push(article)

    article.formatInfo = formatInfo
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

// 所有专栏与文章列表
export const processColumnArticleMap = async (columnList, articlesMap, callback) => {
  const columnMap = new Map()

  for (let i = 0; i < columnList.length; i++) {
    const { column, column_version, column_id } = columnList[i]

    if (!column_version || columnMap.get(column_id)) continue

    const { content_sort_ids = [] } = column

    const columnArticleList = content_sort_ids.map((id) => articlesMap.get(id))

    callback && callback(columnArticleList)

    columnMap.set(column_id, { articles: columnArticleList, columnInfo: columnList[i] })
  }

  return columnMap
}

export const setArticlesAndColumnsMap = async (key, value) => {
  articlesAndColumnsMap[key] = value
  return articlesAndColumnsMap
}
export const getArticlesAndColumnsMap = async () => {
  const articles = await getArticles()
  const columns = await getColumns()

  const articlesMap = new Map()

  articles.forEach((article) => articlesMap.set(article.article_id, article))

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

  articlesAndColumnsMap = {
    articles,
    articlesMap,
    unColumnArticles,
    columns,
    columnMap,
    yearCollection,
    yearMonthCollection,
  }

  return articlesAndColumnsMap
}
