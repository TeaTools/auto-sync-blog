import { getArticlesAndColumnsMap } from "../../store/index.js"
import { mkdirp } from "mkdirp"
import { TAGS_FILE_PATH } from "../../../build/config.base.js"
import { writeFileSync } from "fs"

export const processTagsOverview = async () => {
  await mkdirp(TAGS_FILE_PATH)

  const { tagCollection } = await getArticlesAndColumnsMap()

  let tagMD = `# 我的标签`

  for (const [tag_id, tagColl] of tagCollection) {

    const { articles, count, info } = tagColl

    tagMD += `\n\n## ${info.tag_name}`
    tagMD += `\n\n> · ${count} 文章 ·`
    tagMD += `\n> [进入标签](/tags/${tag_id})`

    await processTagDetail(tagColl, articles)
  }

  await writeFileSync(`${TAGS_FILE_PATH}/index.md`, tagMD)

  console.log("Tags overview 写入成功~")
}

export const processTagDetail = async (tagColl, articles) => {
  let md = `# ${tagColl.info.tag_name}`

  md += `\n## 数据统计\n\n`

  md += `\n\n· ${tagColl.count} 文章 ·`

  md += `\n## 文章列表\n\n`

  articles && articles.forEach(article => {
    md += `\n${article.formatInfo.mdString}`
  })

  await writeFileSync(`${TAGS_FILE_PATH}/${tagColl.info.tag_id}.md`, md)

  console.log(`${tagColl.info.tag_name} 写入成功~`)
}
