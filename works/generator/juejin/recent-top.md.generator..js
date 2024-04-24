import { mkdirp } from "mkdirp"
import { RECENT_TOP_FILE_PATH } from "../../../build/config.base.js"
import { writeFileSync } from "fs"
import { getRecentArticles, getUserInfo } from "../../requests/juejin.js"
import configurations from "../../../configurations.js"
import { insertString } from "../../utils/common.js"
import { getArticleInfo } from "./utils.js"

const userInfoMap = new Map()

// 近期热门

// 数量
const topLength = 20
// 前推天数
const timeRange = 3

// 计算文章优先级
const getArticlePriority = async (article) => {
  const { article_info } = article

  const { collect_count, comment_count, digg_count, view_count } = article_info

  // const user_id = article_info.user_id
  // let userInfo = userInfoMap.get(user_id)
  //
  // if (!userInfo) {
  //   userInfo = await getUserInfo(user_id)
  //   userInfoMap.set(user_id, userInfo)
  // }
  //
  // const { follower_count, level, power, got_digg_count } = userInfo

  return (
    collect_count * 10 + comment_count * 10 + digg_count * 5 + view_count / 5
    // follower_count * 8 +
    // level * 2 +
    // power +
    // got_digg_count * 2
  )
}

const markerMap = {
  0: "<font size=10>🥇</font>&ensp; ",
  1: "<font size=10>🥈</font>&ensp; ",
  2: "<font size=10>🥉</font>&ensp; ",
  x: (idx) => `<font size=6>${idx + 1}.</font>&ensp; `,
}

const processTopArticles = (articles) => {
  return articles
    .map((i, idx) => {
      console.log(i.priority)
      const info = getArticleInfo(i)
      return insertString(info.mdString, 7, markerMap[idx] || markerMap.x(idx))
    })
    .join("\n\n")
}

export const processRecentTopList = async () => {
  try {
    await mkdirp(RECENT_TOP_FILE_PATH)

    const articles = await getRecentArticles(configurations.juejin.userId, timeRange)

    for (const article of articles) {
      article.priority = await getArticlePriority(article)
    }

    const sortedArticles = articles.sort((a, b) => b.priority - a.priority)

    const topArticles = sortedArticles.slice(0, topLength)

    let md = `# 近期热门文章排行榜`

    md += `\n\n${processTopArticles(topArticles)}`

    await writeFileSync(`${RECENT_TOP_FILE_PATH}/index.md`, md)

    console.log("Ranking list 写入成功~")
  } catch (e) {
    console.error(e)
  }
}
