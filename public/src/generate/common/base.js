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
const COLUMN_ARTICLE_TEMPLATE_PATH = TEMPLATE_PATH + "column/article-template.md"; // 专栏内文章md
const COLUMN_MY_TEMPLATE_PATH = TEMPLATE_PATH + "column/my-template.md"; // 我的专栏md
const COLUMN_HOT_TEMPLATE_PATH = TEMPLATE_PATH + "column/hot-template.md"; // 推荐专栏md


const DOCS_SORT_PATH = "docs/sort/"; // 生成文件的地址

// 生成 vuepress 配置相关
const README_FILE_PATH = "docs/README.md"; // README 生成路径
const CONFIG_FILE_PATH = "docs/.vuepress/config.js"; // config 生成路径

module.exports = {
    COVER_JPG,
    VUEPRESS_PUBLIC_PATH,
    README_TEMPLATE_PATH,
    CONFIG_TEMPLATE_PATH,
    YYMM_TEMPLATE_PATH,
    YY_TEMPLATE_PATH,
    ALL_TEMPLATE_PATH,
    DOCS_SORT_PATH,
    COLUMN_ARTICLE_TEMPLATE_PATH,
    README_FILE_PATH,
    CONFIG_FILE_PATH,
    COLUMN_MY_TEMPLATE_PATH,
    COLUMN_HOT_TEMPLATE_PATH,
    BASE_PUBLIC_CSS_PATH,
    PUBLIC_CSS_PATH,
    BASE_COVER_JPG_PATH,
}