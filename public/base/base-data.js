// 拼接部分
const JUEJIN_URL = "https://juejin.cn/";
const JUEJIN_USER_URL = JUEJIN_URL + "user/";
const JUEJIN_POST_URL = JUEJIN_URL + "post/";
const JUEJIN_COLUMN_URL = JUEJIN_URL + "column/";

// 请求部分
const JUEJIN_API = "https://api.juejin.cn/";
const JUEJIN_USER_API = JUEJIN_API + "user_api/v1/user/get"; // 请求用户信息
const JUEJIN_COLUMN_API = JUEJIN_API + "content_api/v1/column/articles_cursor"; // 请求指定专栏里的文章列表
const JUEJIN_ARTICLE_API = JUEJIN_API + "content_api/v1/article/query_list"; // 请求获取文章列表


const MK_DIR_PATH = "docs/sort/"; // 生成文件的地址
// 生成 vuepress 配置相关
const README_FILE_PATH = "docs/README.md"; // README 生成路径
const CONFIG_FILE_PATH = "docs/.vuepress/config.js"; // config 生成路径

const TEMPLATE_PATH = "public/template/"; // 模板公共位置
const README_TEMPLATE_PATH = TEMPLATE_PATH + "vuepress/readme-template.md"; // README 模板
const CONFIG_TEMPLATE_PATH = TEMPLATE_PATH + "vuepress/config-template.js"; // config 模板
const YYMM_TEMPLATE_PATH = TEMPLATE_PATH + "article/year-month-template.md"; // 年月模板文件路径
const YY_TEMPLATE_PATH = TEMPLATE_PATH + "article/year-template.md"; // 年模板文件路径
const ALL_TEMPLATE_PATH = TEMPLATE_PATH + "article/all-template.md"; // 年模板文件路径

const COVER_JPG = `cover.jpg`; // 首页导图名称
const VUEPRESS_PUBLIC_PATH = `docs/.vuepress/public/`; // vuepress 生成静态资源
const BASE_COVER_JPG_PATH = `public/base/cover.jpg`; // 一张基础静态图片地址

const getArticleParams = (user_id) => {
    return {
        "sort_type": 2,
        user_id, // 用户id
    };
};

const getColumnsParams = (column_id) => {
    return {
        column_id, // 专栏id
        // "cursor": cursor, 这里在 Http.js 文件里有做处理
        "limit": 20, // 页大小
        "sort": 2, // 排序（1最早 2最新） 
    };
};

module.exports = {
    getColumnsParams,
    getArticleParams,
    JUEJIN_USER_API,
    JUEJIN_COLUMN_API,
    JUEJIN_ARTICLE_API,
    MK_DIR_PATH,
    README_FILE_PATH,
    README_TEMPLATE_PATH,
    CONFIG_FILE_PATH,
    CONFIG_TEMPLATE_PATH,
    YYMM_TEMPLATE_PATH,
    YY_TEMPLATE_PATH,
    ALL_TEMPLATE_PATH,
    COVER_JPG,
    VUEPRESS_PUBLIC_PATH,
    BASE_COVER_JPG_PATH,
    JUEJIN_URL,
    JUEJIN_USER_URL,
    JUEJIN_POST_URL,
    JUEJIN_COLUMN_URL,
}