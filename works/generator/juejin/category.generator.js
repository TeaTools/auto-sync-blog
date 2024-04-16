import { getArticlesAndColumnsMap } from "../../store/index.js"
import { mkdirp } from "mkdirp"
import { CATEGORIES_FILE_PATH } from "../../../build/config.base.js"
import { writeFileSync } from "fs"

export const processCategoriesOverview = async () => {
  await mkdirp(CATEGORIES_FILE_PATH)

  const { categoryCollection } = await getArticlesAndColumnsMap()

  let categoryMD = `# 我的分类`

  for (const [category_id, categoryColl] of categoryCollection) {
    const { articles, count, info } = categoryColl

    categoryMD += `\n\n## ${info.category_name}`
    categoryMD += `\n\n> · ${count} 文章 ·`
    categoryMD += `\n> [进入分类](/categories/${category_id})`

    await processCategoryDetail(categoryColl, articles)
  }

  await writeFileSync(`${CATEGORIES_FILE_PATH}/index.md`, categoryMD)

  console.log("Category overview 写入成功~")
}

export const processCategoryDetail = async (categoryColl, articles) => {
  let md = `# ${categoryColl.info.category_name}`

  md += `\n## 数据统计\n\n`

  md += `\n\n· ${categoryColl.count} 文章 ·`

  md += `\n## 文章列表\n\n`

  articles &&
    articles.forEach((article) => {
      md += `\n${article.formatInfo.mdString}`
    })

  await writeFileSync(`${CATEGORIES_FILE_PATH}/${categoryColl.info.category_id}.md`, md)

  console.log(`${categoryColl.info.category_name} 写入成功~`)
}
