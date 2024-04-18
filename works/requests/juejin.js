import { post } from "../utils/http-requester.js"
import { ARTICLE_API, COLUMN_API, COLUMN_LIST_API } from "../apis/juejin.js"

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

// 通用轮询请求
export const commonPollingRequest = async (url, requestBody, cursorTimes = 1) => {
  const resList = []
  let i = 0
  let isOver = false
  console.log("循环请求开始~")
  console.log("请求地址：", url)
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
      console.log("循环请求结束~")
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
