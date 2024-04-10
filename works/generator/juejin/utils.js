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
    tags: tags.map((t) => t.tag_name),
  }
}

export function article2MD(articleBean, useList = true) {
  const { title, postUrl, dateMap, view_count, digg_count, comment_count, collect_count, brief_content, tags } =
    articleBean

  let txt = `\r\n${useList ? "-" : "###"} [${title}](${postUrl})`

  txt += `\n\r> ${brief_content}...`
  txt += `\n\n· ${view_count} 阅读 · ${digg_count} 点赞 · ${comment_count} 评论 · ${collect_count} 收藏 ·`
  txt += `\n\n📅 ${dateMap.YMD}\n\n🔖 ${tags.map((tagName) => `\`${tagName}\``).join("  ")}`

  let reg = /<[^>]+>/gi
  txt = txt.replace(reg, (match) => "`" + match + "`")

  return txt
}
