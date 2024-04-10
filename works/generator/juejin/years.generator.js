import { mkdirp } from "mkdirp"
import { writeFileSync } from "fs"
import { YEARS_FILE_PATH } from "../../../build/config.base.js"
import { getArticlesAndColumnsMap } from "../../store/index.js"
import { overviewTableMD } from "./utils.js"

export const processYearsPage = async () => {
  await mkdirp(YEARS_FILE_PATH)

  const { yearCollection, yearMonthCollection } = await getArticlesAndColumnsMap()

  for (const [year] of yearCollection) {
    await processSingleYear(yearCollection, yearMonthCollection, year)
  }
}

export const processSingleYear = async (yearCollection, yearMonthCollection, year) => {
  let md = `# ${year} 年度概览`

  const yearColl = yearCollection.get(year)

  md += `\n## 本年发布 ${yearColl.count}`

  md += overviewTableMD(yearCollection, yearMonthCollection, year)

  md += `\n## 文章列表\n\n`

  for (const article of yearColl.articles) {
    md += article.formatInfo.mdString
  }

  await writeFileSync(`${YEARS_FILE_PATH}/${year}.md`, md)
}
