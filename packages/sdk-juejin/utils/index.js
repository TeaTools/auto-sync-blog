const {
  JUEJIN_USER_URL,
  JUEJIN_POST_URL,
  JUEJIN_COLUMN_URL,
} = require("../../../../sdk-juejin/apis/base"); // 静态变量

const DateUtils = require('../../../utils/DateUtils'); // 请求

// 筛选需要的用户信息
const getUserInfo = (user_info) => {
  var {
    description, // 介绍
    blog_address, // 博客地址
    user_name, // 用户名
    user_id, // user_id
    avatar_large, // 头像
  } = user_info;
  var userBean = {
    description, // 介绍
    blog_address, // 博客地址
    user_name, // 用户名
    user_id, // user_id
    avatar_large, // 头像
    home_url: JUEJIN_USER_URL + user_id + "/", // 掘金主页
  }
  return userBean;
}

// 专栏模块处理
function getArticleColumnList(columnMap) {
  // 所有专栏的对应文章（key：专栏id && 专栏标题；value：专栏下的所有文章）

  var articleColumnList = [];

  columnMap.forEach((list, key) => {
    // console.log("list ", JSON.stringify(list), " key ", key)
    // return;
    // var strList = key.split("&&"); // [0]是id，[1]是标题
    var articleMap = getArticleMap(list); // 转换成 yyyymm 格式
    list = unique(list); // 数组去重和排序
    var columnCountMap = getCountArticles(list, articleMap); // 该专栏的统计情况
    var articleColumn = {
      idAndTitile: key,
      columnCountMap,
      articleMap,
    }
    articleColumnList.push(articleColumn);
  });
  return articleColumnList;
}

// 统计模块
function getCountArticles(userArticleList, articleMap) {
  // 添加统计数据操作
  var countMap = {
    // 添加总文章数
    postTotal: userArticleList.length,
  }
  articleMap.forEach((strMap, yymm) => {
    // console.log(yymm, strMap);
    if (yymm.length > 4) {
      const yy = yymm.substring(0, 4);
      // 添加年月统计
      countMap[yymm] = strMap["count"];
      var yyCount = countMap[yy];
      if (!yyCount) {
        yyCount = 0;
      }
      yyCount += strMap["count"];
      countMap[yy] = yyCount;
    }
  });
  return countMap;
}

// 解析文章列表
function getArticleMap(articleList) {
  var articleMap = new Map(); // 记录时间的
  if (!articleList) {
    console.log("getArticleMap（）articleList参数为空", articleList);
    return;
  }
  // console.log("getArticleMap（）", articleList)
  articleList = unique(articleList); // 数组去重和排序
  for (var item of articleList) {
    // console.log("articleBean", item);
    var articleBean = getArticleInfo(item);
    var ctime = parseInt(articleBean.ctime + "000");
    var dateMap = DateUtils.getMapByString(ctime); // 获取年月日 map 存储
    const {
      YMD,
      YYYYMM,
    } = dateMap;
    articleBean["YM"] = YYYYMM;
    articleBean["YMD"] = YMD; // 新增 转换年月日的（格式：x年x月x日）
    var strMap = articleMap.get(YYYYMM);
    if (!strMap) {
      strMap = {
        str: "",
        count: 0,
      }
    }
    var {
      str,
      count
    } = strMap;
    str += article2MD(articleBean);
    count++;
    strMap = {
      str,
      count,
    }
    articleMap.set(YYYYMM, strMap);
  }
  return articleMap;
}


// 解析、处理文章
function getArticleInfo(article) {
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

// 数组去重和排序
function unique(arr) {
  const res = new Map();
  arr = arr.filter((item) => !res.has(item.article_info.ctime) && res.set(item.article_info.ctime, 1)); // 数组去重
  return arr.sort((star, next) => { // 降序排序（根据时间）
    return next.article_info.ctime - star.article_info.ctime; // 保证所有文章是降序
    // return star.article_info.ctime - next.article_info.ctime;
  });
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

module.exports = {
  getUserInfo,
  getArticleMap,
  getCountArticles,
  getArticleColumnList,
}
