import { post } from "../utils/http-requester.js"
import { ARTICLE_API, COLUMN_API, COLUMN_LIST_API } from "../apis/juejin.js"

const getArticleParams = (user_id) => ({
  sort_type: 2,
  user_id, // 用户id
})
const getColumnsParams = (column_id) => {
  return {
    column_id, // 专栏id
    limit: 20, // 页大小
    sort: 2, // 排序（1最早 2最新）
  }
}
const getColumnsListParams = (user_id) => {
  return {
    audit_status: 2, // 审核状态（2为审核通过
    user_id: user_id,
    limit: 10,
  }
}

// 通用轮询请求
export const commonPollingRequest = async (url, requestBody, cursorTimes = 1) => {
  const resList = []
  let i = 0
  let isOver = false
  while (!isOver) {
    // 专栏文章参数、专栏列表不需要*10; 个人文章需要*10
    requestBody.cursor = String(i * cursorTimes)

    let res = await post(url, requestBody)
    let isBadWebCount = 0

    // 有可能网络异常，数据请求不到，那就重复5次
    while ((!res || !res.data) && isBadWebCount < 5) {
      res = await post(url, requestBody)
      isBadWebCount++
    }

    // 五次之后还是有问题就抛出异常（事不过五）
    if (isBadWebCount >= 5) {
      throw new Error("请求故障，请重试！")
    }

    if (res.data.err_no !== 0 || !res.data.data || !res.data.data.length) {
      // console.log("已经获取全部数据！");
      break
    }

    resList.push(...res.data.data)

    i++
    // await sleep()
  }
  return resList
}

// 获取用户所有文章
export const getUserArticles = async (userId) => {
  return await commonPollingRequest(ARTICLE_API, getArticleParams(userId), 10)
}
// 获取用户所有专栏
export const getUserColumns = async (userId) => {
  return await commonPollingRequest(COLUMN_LIST_API, getColumnsListParams(userId))
}
// 获取指定专栏所有文章
export const getColumnArticles = async (columnId) => {
  return await commonPollingRequest(COLUMN_API, getColumnsParams(columnId))
}
// 所有专栏与文章列表
export const processColumnArticleMap = async (columnList, articlesMap, callback) => {
  const columnMap = new Map()

  for (let i = 0; i < columnList.length; i++) {
    const { column, column_version, column_id } = columnList[i]

    if (!column_version || columnMap.get(column_id)) continue

    const { content_sort_ids = [] } = column

    const columnArticleList = content_sort_ids.map((id) => articlesMap.get(id))

    callback && callback(columnArticleList)

    columnMap.set(column_id, { articles: columnArticleList, columnInfo: columnList[i] })
  }

  return columnMap
}
