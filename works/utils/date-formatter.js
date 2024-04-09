export default function getMapByString(date) {
  const source = new Date(date)
  const YY = source.getFullYear().toString() // 年
  let MM = source.getMonth() + 1 // 月
  MM = MM < 10 ? "0" + MM.toString() : MM.toString()
  let DD = source.getDate() // 日
  DD = DD < 10 ? "0" + DD.toString() : DD.toString()

  const hour = (source.getHours() < 10 ? "0" + source.getHours() : source.getHours()) + ":" // 得到小时数
  const minute = (source.getMinutes() < 10 ? "0" + source.getMinutes() : source.getMinutes()) + ":" // 得到分钟数
  const second = source.getSeconds() < 10 ? "0" + source.getSeconds() : source.getSeconds() // 得到秒数

  const YMD = YY + "-" + MM + "-" + DD
  const YYYYMMDD = YY + "" + MM + "" + DD
  const YYYYMM = YY + "" + MM
  const YMDHMS = YMD + " " + hour + minute + second

  return {
    YY,
    MM,
    DD,
    YMD,
    YYYYMM,
    YYYYMMDD,
    YMDHMS,
  }
}
