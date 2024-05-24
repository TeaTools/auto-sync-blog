import { mkdirp } from "mkdirp"
import { writeFileSync } from "fs"
import { RECENT_TOP_FILE_PATH } from "../../../build/config.base.js"
import { getCategoryList, getRecentArticles } from "../../requests/juejin.js"
import { insertString } from "../../utils/common.js"
import { getArticleInfo } from "./utils.js"
import { getGlobalConfig } from "../../store/configuration/index.js"
import { markerMap } from "../../utils/template-process.js"

// const userInfoMap = new Map()

// 近期热门

// 数量
const topLength = 20
// 前推天数
const timeRange = 3
// 排除分类
const excludeCategory = ["开发工具", "代码人生", "阅读"]

// 计算文章优先级
const getArticlePriority = async (article) => {
  const { article_info } = article

  const { collect_count, comment_count, digg_count, view_count, rank_index } = article_info

  // const user_id = article_info.user_id
  // let userInfo = userInfoMap.get(user_id)
  //
  // if (!userInfo) {
  //   userInfo = await getUserInfo(user_id)
  //   userInfoMap.set(user_id, userInfo)
  // }
  //
  // const { follower_count, level, power, got_digg_count } = userInfo

  const totalCount = collect_count * 10 + comment_count * 10 + digg_count * 5 + view_count / 5
  // follower_count * 8 +
  // level * 2 +
  // power +
  // got_digg_count * 2

  return totalCount * Math.ceil(rank_index)
}

// 单个分类文章排行榜 md
const processTopArticles = (articles) => {
  return (
    articles
      .map((i, idx) => {
        const info = getArticleInfo(i)
        let md = insertString(info.mdString, 7, markerMap[idx] || markerMap.x(idx))
        md += `\r\r✒ [${info.user_name}](${info.authorUrl}) &emsp; ${info.job_title}${info.company ? " @ " + info.company : ""}\r\r`
        return md
      })
      .join("\r\r") + "\r"
  )
}

// 生成页面完整 md
const recentTemplateGenerator = (categories, categoryArticlesMap) => {
  return `---
aside: false
---
<script setup>
import { ref } from 'vue';

const active = ref(0);
</script>

# 近期热门文章排行榜

<div class="ranking-tabs">
<div class="ranking-tabs_header">
    ${categories.map((c, idx) => `
<div :class="['ranking-tab-item', active === ${idx} ?'ranking-tab-item_active' : '']" @click="active = ${idx}">${c.category_name}</div>`).join("\r\r")}
</div>
  
  ${categories
    .map(
      (c, idx) => `
<div class="ranking-tabs_ranking-list" v-show="active === ${idx}">
${processTopArticles(categoryArticlesMap.get(c.category_id) || [])}
</div>`,
    )
    .join("\r\r")}
</div>
`
}



// ${processTopArticles(categoryArticlesMap.get(c.category_id) || [])}

export const processRecentTopList = async () => {
  try {
    await mkdirp(RECENT_TOP_FILE_PATH)

    const categoryArticlesMap = new Map()
    const categories = await getCategoryList()

    const filteredCategories = categories.filter((c) => !excludeCategory.includes(c.category_name))

    for (const filteredCategory of filteredCategories) {
      const articles = await getRecentArticles(filteredCategory.category_id, timeRange)

      for (const article of articles) {
        article.priority = await getArticlePriority(article)
      }

      const sortedArticles = articles.sort((a, b) => b.priority - a.priority)

      const topArticles = sortedArticles.slice(0, topLength)

      categoryArticlesMap.set(filteredCategory.category_id, topArticles)
    }

    const mdString = recentTemplateGenerator(filteredCategories, categoryArticlesMap)

    await writeFileSync(`${RECENT_TOP_FILE_PATH}/index.md`, mdString)

    console.log("Ranking list 写入成功~")
  } catch (e) {
    console.error(e)
  }
}
