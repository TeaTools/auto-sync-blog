const {
    getMapByString
} = require('./DateUtils');
const {
    JUEJIN_URL,
    JUEJIN_POST_URL,
} = require('../base/base-data');

const fs = require('fs');

// 数组去重和排序
function unique(arr) {
    const res = new Map();
    arr = arr.filter((item) => !res.has(item.article_info.ctime) && res.set(item.article_info.ctime, 1)); // 数组去重
    return arr.sort((star, next) => { // 降序排序（根据时间）
        return next.article_info.ctime - star.article_info.ctime; // 保证所有文章是降序
        // return star.article_info.ctime - next.article_info.ctime;
    });
}

// 解析文章列表
function getArticleMap(articleList) {
    var articleMap = new Map(); // 记录时间的
    articleList = unique(articleList); // 数组去重和排序
    for (var item of articleList) {
        var articleBean = getArticle(item);
        var ctime = parseInt(articleBean.ctime + "000");
        var dateMap = getMapByString(ctime); // 获取年月日 map 存储
        const {
            YMD,
            YYYYMM,
        } = dateMap;
        articleBean["YM"] = YYYYMM;
        articleBean["YMD"] = YMD; // 新增 转换年月日的（格式：x年x月x日）
        var str = articleMap.get(YYYYMM);
        if (!str) {
            str = new String();
        }
        str += article2MD(articleBean); // 转换成链接的形式，进行保存添加
        articleMap.set(YYYYMM, str);
    }
    return articleMap;
}

// 获取原 MarkDown 文件的内容
function getFileConnent(filePath) {
    if (!fs.existsSync(filePath)) {
        var init = "初始化";
        return init; // 当这个文件不存在的时候，存入一个值，确保 map 不用重复多次去验证
    }
    return fs.readFileSync(filePath, 'utf-8');
}

// 判断文章是否已经写过在原 MarkDown 文件中
function isArticleInMD(content, txt) {
    return content.indexOf(txt) !== -1;
}

// 文章转化为md文档格式
function article2MD(articleBean) {
    var txt = "\r\n- [" + articleBean.YMD + "：" + articleBean.title + "](" + articleBean.postUrl + ")";
    var reg = /<[^>]+>/gi;
    txt = txt.replace(reg, function (match) {
        return '`' + match + "`";
    }); // 替换所有有标签的标题，加引号 `<标签>`
    return txt;
}

// 解析、处理文章
function getArticle(article) {
    var {
        article_info
    } = article;
    var {
        cover_image, // 专栏导图（有可能没有）
        article_id, // 文章id 
        title, // 标题
        brief_content, // 摘要
        ctime, // 创建时间
    } = article_info;
    var articleBean = {
        cover_image,
        article_id,
        title,
        postUrl: JUEJIN_POST_URL + article_id, // 文章地址
        brief_content,
        ctime,
    }
    return articleBean;
}


module.exports = {
    getArticleMap,
}