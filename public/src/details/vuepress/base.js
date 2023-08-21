const COVER_JPG = `cover.jpg`; // 首页导图名称
const VUEPRESS_PUBLIC_PATH = `docs/.vuepress/public/`; // vuepress 生成静态资源
const BASE_COVER_JPG_PATH = `public/template/vuepress/cover.jpg`; // 一张基础静态图片地址
const BASE_PUBLIC_CSS_PATH = `public/template/vuepress/index.css`; // 全局 css 样式模板路径
const PUBLIC_CSS_PATH = VUEPRESS_PUBLIC_PATH + `css/`; // 生成路径
// 模板公共位置
const TEMPLATE_PATH = "public/template/";
const README_TEMPLATE_PATH = TEMPLATE_PATH + "vuepress/readme-template.md"; // README 模板
const CONFIG_TEMPLATE_PATH = TEMPLATE_PATH + "vuepress/config-template.js"; // config 模板
const YYMM_TEMPLATE_PATH = TEMPLATE_PATH + "article/year-month-template.md"; // 年月模板文件路径
const YY_TEMPLATE_PATH = TEMPLATE_PATH + "article/year-template.md"; // 年模板文件路径
const ALL_TEMPLATE_PATH = TEMPLATE_PATH + "article/all-template.md"; // 年模板文件路径
// 拼接部分
const JUEJIN_URL = "https://juejin.cn/";
const JUEJIN_USER_URL = JUEJIN_URL + "user/";
const JUEJIN_POST_URL = JUEJIN_URL + "post/";
const JUEJIN_COLUMN_URL = JUEJIN_URL + "column/";
module.exports = {
    COVER_JPG,
    VUEPRESS_PUBLIC_PATH,
    BASE_COVER_JPG_PATH,
    README_TEMPLATE_PATH,
    CONFIG_TEMPLATE_PATH,
    YYMM_TEMPLATE_PATH,
    YY_TEMPLATE_PATH,
    ALL_TEMPLATE_PATH,
    JUEJIN_USER_URL,
    BASE_PUBLIC_CSS_PATH,
    PUBLIC_CSS_PATH,
}