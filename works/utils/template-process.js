/**
 * // 使用正则表达式匹配双大括号之间的内容并进行二次处理
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
