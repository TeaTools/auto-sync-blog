import { getArticlesAndColumnsMap } from "../../store/index.js"
import { mkdirp } from "mkdirp"
import { COLUMNS_FILE_PATH } from "../../../build/config.base.js"
import { writeFileSync } from "fs"
import { article2MD } from "./utils.js"

export const processColumnsOverview = async () => {
  await mkdirp(COLUMNS_FILE_PATH)

  const { columnMap } = await getArticlesAndColumnsMap()

  let columnMd = `# 我的专栏`

  for (const [columnId, column] of columnMap) {

    const { articles, columnInfo } = column

    columnMd += `\n\n## ${columnInfo.column_version.title}`
    columnMd += `\n\n> · ${columnInfo.column.article_cnt} 文章 · ${columnInfo.column.follow_cnt} 订阅 ·`
    columnMd += `\n> [进入专栏](/columns/${columnId})`

    await processColumnDetail(columnInfo, articles)
  }

  await writeFileSync(`${COLUMNS_FILE_PATH}/index.md`, columnMd, (err) => {
    if (err) throw err
    console.log("overview 写入成功~")
  })
}

export const processColumnDetail = async (column, articles) => {
  let md = `# ${column.column_version.title}`

  articles && articles.forEach(article => {
    md += `\n${article2MD(article.formatInfo, false)}`
  })

  await writeFileSync(`${COLUMNS_FILE_PATH}/${column.column_id}.md`, md, (err) => {
    if (err) throw err
    console.log(`${column.column_version.title} 写入成功~`)
  })
}
