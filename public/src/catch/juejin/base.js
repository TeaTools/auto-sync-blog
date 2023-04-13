// 请求部分
const API = "https://api.juejin.cn/";
const USER_API = API + "user_api/v1/user/get"; // 请求用户信息
const COLUMN_API = API + "content_api/v1/column/articles_cursor"; // 请求指定专栏里的文章列表
const ARTICLE_API = API + "content_api/v1/article/query_list"; // 请求获取文章列表
const COLUMN_LIST_API = API + "content_api/v1/column/self_center_list"; // 请求获取专栏列表
const COLUMN_INFO_API = API + "content_api/v1/column/detail"; // 单个专栏详情

module.exports = {
    USER_API,
    COLUMN_API,
    ARTICLE_API,
    COLUMN_LIST_API,
    COLUMN_INFO_API,
}