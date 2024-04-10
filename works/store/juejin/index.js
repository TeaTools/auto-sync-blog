import { getUserArticles, getUserColumns } from "../../requests/juejin.js"
import configurations from "../../../configurations.js"

let articles = null

export const setArticles = async (newArticles) => {
  return articles = newArticles
}
export const getArticles = async () => {
  if (!articles) {
    articles = await getUserArticles(configurations.juejin.userId)
  }
  return articles
}

let columns = null

export const setColumns = async (newColumns) => {
  return columns = newColumns
}
export const getColumns = async () => {
  if (!columns) {
    columns = await getUserColumns(configurations.juejin.userId)
  }
  return columns
}
