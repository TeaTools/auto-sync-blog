/** 
 * 生成模块
 */
const JUEJIN = require("./juejin/utils");
const VUEPRESS = require("./vuepress/utils");

function voidGenrateWork() {
    var {
        JUEJIN_ARTICLE_YYYYMM_MAP, // 所有文章（yymm分类）
        JUEJIN_USER_INFO, // 用户信息
        JUEJIN_ALL_COUNT_MAP, // 添加统计放全局
        JUEJIN_COLUMN_LIST, // 用户所有专栏list（包括所有文章和统计文章数据情况）
        VUEPRESS_INFO, // vuepress 相关配置
        JUEJIN_HOT_COLUMN_LIST, // 推荐专栏list（包括所有文章和统计文章数据情况）
    } = global;
    // console.log("JUEJIN_COLUMN_LIST", JUEJIN_COLUMN_LIST)
    // console.log("JUEJIN_ALL_COUNT_MAP",JUEJIN_ALL_COUNT_MAP)
    // console.log("JUEJIN_USER_INFO",JUEJIN_USER_INFO)

    // vuepress 相关配置生成  
    generateVuepress(VUEPRESS_INFO);

    // 时间分类的文章
    generateTimeSortArticle(JUEJIN_ARTICLE_YYYYMM_MAP, JUEJIN_COLUMN_LIST, JUEJIN_ALL_COUNT_MAP, JUEJIN_USER_INFO, JUEJIN_HOT_COLUMN_LIST);
}

// 初始化 vuepress 相关配置的生成（和 user_id 和 column_id 关联）
function generateVuepress(vuepressInfo) {
    VUEPRESS.init(vuepressInfo); // 初始化 vuepress 相关配置文件
}

// 创建时间分类的文章
function generateTimeSortArticle(articleMap, columnList, countMap, userBean, columnHotList) {
    JUEJIN.updateArticleMap(articleMap, countMap, userBean);
    JUEJIN.updateArticleColumnList(columnList, userBean);
    JUEJIN.updateHotArticleColumnList(columnHotList);
}

module.exports = {
    voidGenrateWork,
}