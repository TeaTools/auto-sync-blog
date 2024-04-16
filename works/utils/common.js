export function insertString(str, index, insertStr) {
  return str.substring(0, index) + insertStr + str.substring(index)
}
