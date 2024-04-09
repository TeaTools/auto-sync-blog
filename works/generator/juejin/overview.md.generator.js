import { JUEJIN_POST_URL } from "../../website/juejin.js"
import dateFormatter from "../../utils/date-formatter.js"
import { processArticlesAndColumns } from "../../requests/juejin.js"
import configurations from "../../../configurations.js"
import { OVERVIEW_FILE_PATH } from "../../../build/config.base.js"
import { mkdirp } from "mkdirp"
import { writeFileSync } from "fs"
import { insertString } from "../../utils/common.js"

const getArticleInfo = (article) => {
  const {
    article_info: {
      title, // 标题
      article_id, // 文章id
      cover_image, // 专栏导图（有可能没有）
      brief_content, // 摘要
      ctime, // 创建时间
      view_count,
      digg_count,
      comment_count,
      collect_count,
    },
  } = article

  const dateMap = dateFormatter(parseInt(ctime + "000"))

  return {
    cover_image,
    article_id,
    title,
    postUrl: JUEJIN_POST_URL + article_id, // 文章地址
    brief_content,
    ctime,
    dateMap,
    view_count,
    digg_count,
    comment_count,
    collect_count,
  }
}

function article2MD(articleBean) {
  const { title, postUrl, dateMap, view_count, digg_count, comment_count, collect_count, brief_content } = articleBean

  let txt = "\r\n- [" + dateMap.YMD + "：" + title + "](" + postUrl + ")"

  txt += `\n\r\r > ${brief_content}... \n\n> · 阅读：${view_count}\r· 点赞：${digg_count}\r· 评论：${comment_count}\r· 收藏：${collect_count}`

  let reg = /<[^>]+>/gi
  txt = txt.replace(reg, (match) => "`" + match + "`")

  return txt
}

export const processArticleTimesCollection = (articleList = []) => {
  const timesCollectionMap = new Map()

  const sortedArticleList = articleList.sort((prev, next) => {
    return next.article_info.ctime - prev.article_info.ctime
  })

  for (const article of sortedArticleList) {
    const articleInfo = getArticleInfo(article)

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
  console.log(collectionItem)
  return `## ${insertString(key, 4, "-")}

  **该月文章数：${collectionItem.count}。**

  ${collectionItem.str}
`
}

export const processOverviewMD = async () => {
  const { articles } = await processArticlesAndColumns(configurations.juejin.userId)
  const timesCollectionMap = await processArticleTimesCollection(articles)

  let md = ""

  timesCollectionMap.forEach((item, key) => (md += processOverviewTimeCollectionItem(item, key)))

  await mkdirp(OVERVIEW_FILE_PATH)

  writeFileSync(`${OVERVIEW_FILE_PATH}/index.md`, md, (err) => {
    if (err) throw err
    console.log("overview 写入成功~")
  })
}
