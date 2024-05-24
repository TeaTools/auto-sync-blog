import {insertString} from "./common.js";

/**
 * 使用正则表达式匹配双大括号之间的内容并进行二次处理
 * @param {string} str
 * @param {(string) => string} callback
 * @return {string}
 */
export function replaceKeywords(str, callback) {
  const pattern = /{{(.*?)}}/g
  const matches = str.match(pattern)

  if (matches) {
    const processedMatches = matches.map((match) => callback(match.replace(/{{|}}/g, "").trim()))

    return str.replace(pattern, () => processedMatches.shift())
  }

  return str
}

/**
 * 排行榜数据前置标记
 */
export const markerMap = {
  0: "<font size=10>🥇</font>&ensp; ",
  1: "<font size=10>🥈</font>&ensp; ",
  2: "<font size=10>🥉</font>&ensp; ",
  x: (idx) => `<font size=6>${idx + 1}.</font>&ensp; `,
}
/**
 * 生成文章数据，插入排行榜标记
 * @param {Array} articles
 */
export const processTopArticles = (articles) => {
  return articles
    .map((i, idx) => {
      return insertString(i.formatInfo.mdString, 7, markerMap[idx] || markerMap.x(idx))
    })
    .join("\n\n")
}
