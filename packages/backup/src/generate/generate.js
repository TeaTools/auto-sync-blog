import { init } from "./vuepress/utils.js";
import {
  updateArticleColumnList,
  updateArticleMap,
  updateHotArticleColumnList,
} from "./juejin/utils.js";

export function voidGenrateWork() {
  const {
    JUEJIN_ARTICLE_YYYYMM_MAP, // 所有文章（yymm分类）
    JUEJIN_USER_INFO, // 用户信息
    JUEJIN_ALL_COUNT_MAP, // 添加统计放全局
    JUEJIN_COLUMN_LIST, // 用户所有专栏list（包括所有文章和统计文章数据情况）
    VUEPRESS_INFO, // vitepress 相关配置
    JUEJIN_HOT_COLUMN_LIST, // 推荐专栏list（包括所有文章和统计文章数据情况）
  } = global;

  // vitepress 相关配置生成
  generateVitePress(VUEPRESS_INFO);

  // 时间分类的文章
  generateTimeSortArticle(
    JUEJIN_ARTICLE_YYYYMM_MAP,
    JUEJIN_COLUMN_LIST,
    JUEJIN_ALL_COUNT_MAP,
    JUEJIN_USER_INFO,
    JUEJIN_HOT_COLUMN_LIST,
  );
}

// 初始化 vitepress 相关配置的生成（和 user_id 和 column_id 关联）
function generateVitePress(pressInfo) {
  init(pressInfo); // 初始化 vitepress 相关配置文件
}

// 创建时间分类的文章
function generateTimeSortArticle(
  articleMap,
  columnList,
  countMap,
  userBean,
  columnHotList,
) {
  updateArticleMap(articleMap, countMap, userBean);
  updateArticleColumnList(columnList, userBean);
  updateHotArticleColumnList(columnHotList);
}
