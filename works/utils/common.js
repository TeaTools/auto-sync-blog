/**
 * 在指定位置插入字符串
 *
 * @param {string} str - 原始字符串
 * @param {number} index - 插入位置的索引
 * @param {string} insertStr - 要插入的字符串
 * @returns {string} - 插入后的新字符串
 */
export function insertString(str, index, insertStr) {
  return str.substring(0, index) + insertStr + str.substring(index)
}

/**
 * 对数组进行排序并返回前10个元素
 *
 * @param {Array} articles - 要排序的数组
 * @param {string} key - 用于排序的键名
 * @returns {Array} - 排序后的前10个元素数组
 */
export const sortArticleArray = (articles, key) => {
  const copyArr = articles.slice()
  return copyArr.sort((a, b) => b.formatInfo[key] - a.formatInfo[key]).slice(0, 10)
}
