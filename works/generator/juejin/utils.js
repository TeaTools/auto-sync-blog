import dateFormatter from "../../utils/date-formatter.js"
import { JUEJIN_POST_URL } from "../../website/juejin.js"

export const getArticleInfo = (article) => {
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
    tags = [],
  } = article

  const dateMap = dateFormatter(parseInt(ctime + "000"))

  const articleInfo = {
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
    tags: tags.map((t) => t.tag_name),
  }

  articleInfo.mdListString = article2MD(articleInfo)
  articleInfo.mdString = article2MD(articleInfo, false)

  return articleInfo
}

export function article2MD(articleBean, useList = true) {
  const { title, postUrl, dateMap, view_count, digg_count, comment_count, collect_count, brief_content, tags } =
    articleBean

  // let txt = `\r\n${useList ? "-" : "###"} [${title}](${postUrl})`
  let txt = `\r\r\n${useList ? "-" : "###"} ${title}`

  txt += `\n\r> ${brief_content}...`
  txt += `\n>\n> [前往掘金](${postUrl})`
  txt += `\n\n📊 **${view_count} 阅读 · ${digg_count} 点赞 · ${comment_count} 评论 · ${collect_count} 收藏**`
  txt += `\n\n📅 ${dateMap.YMD}`
  txt += `&emsp;🏷 ${tags.map((tagName) => `\`${tagName}\``).join("  ")}`

  let reg = /<[^>]+>/gi
  txt = txt.replace(reg, (match) => "`" + match + "`")

  return txt
}

export function overviewTableMD(yearCollMap = new Map(), yearMonthCollMap, year) {
  let tableMD = `
| 年份 | 总记 | 1月 | 2月| 3月 | 4月 | 5月 | 6月 | 7月 | 8月 | 9月 | 10月 | 11月 | 12月 |
| - | - | - | - | - | - | - | - | - | - | - | - | - | - |
`
  const columns = ["year", "count", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  if (year) {
    const tableRow = `|${columns
      .map((key) => {
        if (key === "year") return year
        if (key === "count") return yearCollMap.get(year).count || 0
        return yearMonthCollMap.get(`${year}${key}`) || "-"
      })
      .join("|")}|`
    return tableMD + tableRow
  }

  let tableRows = ""
  yearCollMap.forEach((yearColl, k) => {
    tableRows += `|${columns
      .map((key) => {
        if (key === "year") return k
        if (key === "count") return yearCollMap.get(k).count || 0
        return yearMonthCollMap.get(`${k}${key}`) || "-"
      })
      .join("|")}|\n`
  })

  return tableMD + tableRows
}
