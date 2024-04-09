export function replaceKeywords(str, keywordsMap = {}) {
  // 使用正则表达式匹配双大括号之间的内容
  const regex = /({{.*?}})/;
  let match = regex.exec(str);

  while (match) {
    // 对匹配到的内容进行替换
    const key = match[1]
    const translateContent = keywordsMap[key.trim()] || ''
    str = str.replace(key, translateContent);
    match = regex.exec(str);
  }
  return str;
}
