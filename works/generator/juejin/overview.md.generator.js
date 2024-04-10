import { OVERVIEW_FILE_PATH } from "../../../build/config.base.js"
import { mkdirp } from "mkdirp"
import { writeFileSync } from "fs"
import { insertString } from "../../utils/common.js"
import { getArticles } from "../../store/index.js"
import { article2MD } from "./utils.js"

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
  return `## ${insertString(key, 4, "-")}

  **该月文章数：${collectionItem.count}。**

  ${collectionItem.str}
`
}

export const processOverviewMD = async () => {
  const articles = await getArticles()
  const timesCollectionMap = await processArticleTimesCollection(articles)

  let md = ""

  timesCollectionMap.forEach((item, key) => (md += processOverviewTimeCollectionItem(item, key)))

  await mkdirp(OVERVIEW_FILE_PATH)

  writeFileSync(`${OVERVIEW_FILE_PATH}/index.md`, md, (err) => {
    if (err) throw err
    console.log("overview 写入成功~")
  })
}
