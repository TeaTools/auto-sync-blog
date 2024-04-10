import { OVERVIEW_FILE_PATH } from "../../../build/config.base.js"
import { mkdirp } from "mkdirp"
import { writeFileSync } from "fs"
import { insertString } from "../../utils/common.js"
import { getArticles, getArticlesAndColumnsMap } from "../../store/index.js"
import { article2MD, overviewTableMD } from "./utils.js"

export const processArticleTimesCollection = (articleList = []) => {
  const timesCollectionMap = new Map()

  for (const article of articleList) {
    const { formatInfo: articleInfo } = article
    let strMap = timesCollectionMap.get(articleInfo.dateMap.YYYYMM)
    if (!strMap) {
      strMap = { str: "", count: 0 }
    }

    let { str, count } = strMap
    str += article2MD(articleInfo)
    count++
    strMap = { str, count }

    timesCollectionMap.set(articleInfo.dateMap.YYYYMM, strMap)
  }

  return timesCollectionMap
}

const processOverviewTimeCollectionItem = (collectionItem, key) => {
  return `\n## ${insertString(key, 4, "年")}月

  **发布文章数：${collectionItem.count}**

  ${collectionItem.str}
`
}

export const processOverviewMD = async () => {
  const { articles, yearMonthCollection, yearCollection } = await getArticlesAndColumnsMap()
  const timesCollectionMap = await processArticleTimesCollection(articles)

  let md = `# 累计发布 ${articles.length}`

  md += overviewTableMD(yearCollection, yearMonthCollection)

  timesCollectionMap.forEach((item, key) => (md += processOverviewTimeCollectionItem(item, key)))

  await mkdirp(OVERVIEW_FILE_PATH)

  writeFileSync(`${OVERVIEW_FILE_PATH}/index.md`, md, (err) => {
    if (err) throw err
    console.log("overview 写入成功~")
  })
}
