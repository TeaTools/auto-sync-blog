import { get, post } from "../utils/http-requester.js"
import {ARTICLE_API, COLUMN_LIST_API, RECENT_ARTICLE_API, CATEGORY_LIST_API, USER_API} from "../apis/juejin.js"

const getArticleParams = (user_id) => ({
  sort_type: 2,
  user_id, // 用户id
})
const getColumnsListParams = (user_id) => {
  return {
    audit_status: 2, // 审核状态（2为审核通过
    user_id: user_id,
    limit: 10,
  }
}
const getRecentArticleParams = (cate_id) => {
  return {
    cate_id, // 类别 ID
    id_type: 2,
    limit: 20,
    sort_type: 300, // 默认最新排序
  }
}

// 通用终止轮询判断
export const commonPollingOver = (responseData) => {
  return responseData.err_no !== 0 || !responseData.data || !responseData.data.length
}
// 通用轮询请求
export const commonPollingRequest = async (url, requestBodyGenerator, overPolling = commonPollingOver) => {
  const resList = []
  let idx = 0
  let badCount = 0
  let lastResponse = null
  console.log("循环请求开始~")
  console.log("请求地址：", url)
  while (true) {
    const requestBody = requestBodyGenerator(idx, lastResponse)

    let res = await post(url, requestBody)

    // 有可能网络异常，数据请求不到，那就重复5次
    while ((!res || !res.data) && badCount < 5) {
      res = await post(url, requestBody)
      badCount++
    }

    // 五次之后还是有问题就抛出异常（事不过五）
    if (badCount >= 5) {
      throw new Error(url + " 请求故障，请重试！")
    }

    if (overPolling(res.data)) {
      console.log("循环请求结束~")
      break
    }
    resList.push(...res.data.data)

    lastResponse = res
    badCount = 0

    idx++
  }
  return resList
}

// 获取用户所有文章
export const getUserArticles = async (userId) => {
  const requestBodyGenerator = (idx) => {
    return {
      ...getArticleParams(userId),
      cursor: String(idx * 10),
    }
  }
  return await commonPollingRequest(ARTICLE_API, requestBodyGenerator)
}
// 获取用户所有专栏
export const getUserColumns = async (userId) => {
  const requestBodyGenerator = (idx) => {
    return {
      ...getColumnsListParams(userId),
      cursor: idx.toString(),
    }
  }
  return await commonPollingRequest(COLUMN_LIST_API, requestBodyGenerator)
}

// 掘金默认分类
export const getCategoryList = async () => {
  const res = await get(CATEGORY_LIST_API)

  return res.data.data
}
// 近期热门文章
export const getRecentArticles = async (cate_id, days = 3) => {
  const now = Date.now()
  const timeStep = days * 24 * 3600 * 1000 // 近三天

  const requestBodyGenerator = (idx, lastResponse) => {
    return {
      ...getRecentArticleParams(cate_id),
      cursor: lastResponse ? lastResponse.data.cursor : "0",
    }
  }
  const pollingOver = (responseData) => {
    if (commonPollingOver(responseData)) return true

    const list = responseData.data
    const length = list.length

    return list.filter((i) => now - Number(i.article_info.ctime + "000") > timeStep).length >= length * 0.8
  }

  const allArticles = await commonPollingRequest(RECENT_ARTICLE_API, requestBodyGenerator, pollingOver)

  return allArticles.filter((i) => now - Number(i.article_info.ctime + "000") < timeStep)
}

// 指定用户个人信息
export const getUserInfo = async (user_id) => {
  const res = await get(USER_API, { user_id })

  return res.data.data
}
