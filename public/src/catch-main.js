const FileUtils = require('../utils/FileUtils');
const {
    getArticleMap,
} = require('../utils/ArticleUtils');
const http = require("../utils/Http");
const VuepressUtils = require("../utils/VuepressUtils");
const BASE_DATA = require("../base/base-data"); // 静态数据和方法

// 获取数据
async function catchTxt(user_id, column_id) {
    var articleList = [];
    // console.log(BASE_DATA.JUEJIN_COLUMN_API,BASE_DATA.JUEJIN_ARTICLE_API)
    // console.log(BASE_DATA.JUEJIN_ARTICLE_API)
    if (column_id && column_id !== "undefined") { // 专栏id存在，只选择爬取专栏的
        var columnParams = BASE_DATA.getColumnsParams(column_id);
        console.log(columnParams)
        articleList = await http.juejinPost(BASE_DATA.JUEJIN_COLUMN_API, columnParams, 1); // 获取指定专栏
    } else {
        var articleParams = BASE_DATA.getArticleParams(user_id);
        articleList = await http.juejinPost(BASE_DATA.JUEJIN_ARTICLE_API, articleParams, 10); // 获取个人所有文章
    }

    console.log("articleList.length：" + articleList.length)
    var articleMonthMap = getArticleMap(articleList); // 解析数据
    console.log("articleMap.size：", articleMonthMap.size);
    if (articleMonthMap.size == 0) {
        console.log("当前没有文章噢~ 请再检查");
        return;
    }
    // return;
    // 生成 vuepress 相关配置文件
    var userBean = await getInitUserBean(user_id, column_id, articleMonthMap, articleList[0]); // 用户信息处理
    initVuepress(userBean);

    var countMap = {
        postTotal: articleList.length, // 添加总文章数
    }
    articleMonthMap.forEach((strMap, yymm) => {
        countMap[yymm] = strMap["count"]; // 添加年月统计
        const yy = yymm.substring(0, 4);
        var yyCount = countMap[yy];
        if (!yyCount) {
            yyCount = 0;
        }
        yyCount += strMap["count"];
        countMap[yy] = yyCount;
    });

    userBean["countMap"] = countMap; // 添加统计板块
    console.log(userBean)
    // return;
    // 添加文章和文章内容
    update(articleMonthMap, BASE_DATA.MK_DIR_PATH, userBean);
}


// 进一步处理文章和更新操作
function update(articleMap, mk_dir_path,  userBean) {
    var yymmMapList = []; // 年月日的已经排序好，不过是倒序的，所以遍历一般好让年月的时间正序起来
    articleMap.forEach((strMap, yymm) => {
        yymmMapList.push({
            yymm,
            strMap
        });
    });
    // console.log(yymmMapList);
    // return;
    for (var backIndex in yymmMapList) {
        var oneMap = yymmMapList[yymmMapList.length - backIndex - 1];
        var {
            yymm,
            strMap
        } = oneMap;
        // console.log(oneMap, str, yymm)
        const {
            str
        } = strMap;
        const yy = yymm.substring(0, 4);
        FileUtils.updateYYMM(yymm, str, mk_dir_path + yy + "/", userBean);
        FileUtils.updateYY(yymm, str, mk_dir_path + yy + "/", userBean);
        FileUtils.updateAll(yymm, str, mk_dir_path, userBean);
    }
    return;
}

// 初始化 vuepress 相关配置的生成（和 user_id 和 column_id 关联）
async function initVuepress(userBean) {
    VuepressUtils.init(userBean); // 初始化 vuepress 相关配置文件

}

// 处理匹配用户的相关配置
async function getInitUserBean(user_id, column_id, articleMap, article) {
    var userBean = await VuepressUtils.getJuejinUserInfo(user_id);
    var yyMap = new Map(); // 年月日的已经排序好，不过是倒序的，所以遍历一般好让年月的时间正序起来
    var yyList = []; // 需要添加时间的分类
    articleMap.forEach((str, yymm) => {
        const yy = yymm.substring(0, 4);
        var yyStr = yyMap.get(yy);
        if (!yyStr) {
            yyMap.set(yy, true);
            yyList.push(yy);
        }
    });
    var cover_png = ""; // 首页导图
    if (column_id && column_id !== "undefined") { // 指定专栏，把专栏的导图放入
        var {
            article_info
        } = article;
        // console.log(article)
        // console.log(article_info)
        cover_png = article_info.cover_image; // 专栏导图（有可能没有）
    }
    userBean.cover_png = cover_png;
    // 添加分类（按年的分类）
    var time_sort_template = `{
    text: '{{year}}',
        link: '/categories/{{year}}/'
    }, `;
    var time_sort_list_str = `[`;
    var start_year = Number(yyList[0]);
    for (var yy of yyList) {
        if (start_year > Number(yy)) {
            start_year = Number(yy);
        }
        time_sort_list_str += time_sort_template.replace("{{year}}", yy).replace("{{year}}", yy);
    }
    time_sort_list_str += "]"
    userBean.time_sort_list_str = time_sort_list_str; // 
    userBean.start_year = start_year; // 写作开始的年份
    userBean.baidu_count_url = `\`var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?f7c04e5ddb588d9604e7d1ef5b7483af";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      \``; // 百度统计（有需要可自行修改为对应的 key ）
    userBean.find_me_url = userBean.home_url; // 找到我（掘金首页）
    userBean.favicon_ico = userBean.avatar_large; // 页面标题旁的小图标
    userBean.logo_png = userBean.avatar_large; // 头像
    if (column_id) {
        userBean.order_column_url = BASE_DATA.JUEJIN_COLUMN_URL + column_id; // 订阅地址 （如果有指定专栏，那么订阅对应的专栏）
    } else {
        userBean.order_column_url = userBean.home_url + "columns"; // 订阅地址 （如果是指定用户所有文章，那么订阅就会变成该用户下的专栏页）
    }
    return userBean;
}

module.exports = {
    catchTxt,
}