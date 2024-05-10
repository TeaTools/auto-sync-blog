import { getArticlesAndColumnsMap } from "../../store/index.js"
import { mkdirp } from "mkdirp"
import { RANKING_FILE_PATH } from "../../../build/config.base.js"
import { writeFileSync } from "fs"
import {processTopArticles} from "../../utils/template-process.js";
import {sortArticleArray} from "../../utils/common.js";

const template = (a, b, c, d) => `---
aside: false
---
<script setup>
import { ref } from 'vue';

const active = ref(0);
</script>

# 数据排行榜
<div class="ranking-tabs">
  <div class="ranking-tabs_header">
    <div :class="['ranking-tab-item', active === 0 ? 'ranking-tab-item_active' : '']" @click="active = 0">👀 阅读榜</div>
    <div :class="['ranking-tab-item', active === 1 ? 'ranking-tab-item_active' : '']" @click="active = 1">👍 点赞榜</div>
    <div :class="['ranking-tab-item', active === 2 ? 'ranking-tab-item_active' : '']" @click="active = 2">💬 评论榜</div>
    <div :class="['ranking-tab-item', active === 3 ? 'ranking-tab-item_active' : '']" @click="active = 3">🗃 收藏榜</div>
  </div>
  
  <div class="ranking-tabs_ranking-list" v-show="active === 0">
  ${processTopArticles(a)}
  </div>
  
  <div class="ranking-tabs_ranking-list" v-show="active === 1">
  ${processTopArticles(b)}
  </div>
  
  <div class="ranking-tabs_ranking-list" v-show="active === 2">
  ${processTopArticles(c)}
  </div>
  
  <div class="ranking-tabs_ranking-list" v-show="active === 3">
  ${processTopArticles(d)}
  </div>
</div>
`

export const processRankingList = async () => {
  await mkdirp(RANKING_FILE_PATH)

  const { articles } = await getArticlesAndColumnsMap()

  const diggRanking = sortArticleArray(articles, "digg_count")
  const viewRanking = sortArticleArray(articles, "view_count")
  const commentRanking = sortArticleArray(articles, "comment_count")
  const collectRanking = sortArticleArray(articles, "collect_count")

  const md = template(viewRanking, diggRanking, commentRanking, collectRanking)

  await writeFileSync(`${RANKING_FILE_PATH}/index.md`, md)

  console.log("Ranking list 写入成功~")
}
