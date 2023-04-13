/** 
 * 获取模块
 */
const JUEJIN = require("./juejin/utils");

async function voidCatchWork(bodyJson) {
    const {
        juejin_user_id,
        juejin_column_list,
    } = bodyJson;
    // 用户文章和专栏
    await userArticleWork(juejin_user_id);

    // 用户信息
    await userInfoWork(juejin_user_id);

    // 推荐专栏
    await hotColumnWork(juejin_column_list);
}


// 获取用户文章列表信息（包括专栏情况）
async function userArticleWork(userId) {
    // 获取个人所有文章
    var {
        userArticleList, // 用户所有文章
        columnMap, // 所有专栏的对应文章（key：专栏id && 专栏标题；value：专栏下的所有文章）
    } = await JUEJIN.userArtMapPost(userId);
    console.log("获取到该用户的所有文章数量：" + userArticleList.length);
    // console.log("columnMap", columnMap);
    console.log("获取到该用户的所有专栏数量：" + (columnMap.size)); // 有一个专栏是未分类专栏
    // 存入全局
    global.JUEJIN_ARTICLE_LIST = userArticleList;
    global.JUEJIN_COLUMN_MAP = columnMap;
}

// 获取用户信息（get请求）
async function userInfoWork(userId) {
    var userInfo = await JUEJIN.userInfoGet(userId);
    if (!userInfo) {
        throw new Error('juejin_user_id出错，不存在用户');
    }
    // 存入全局
    global.JUEJIN_USER_INFO = userInfo;
    console.log("用户信息：" + JSON.stringify(userInfo)); // 有一个专栏是未分类专栏
}

// 获取强力推荐的专栏
async function hotColumnWork(columnIdList) {
    var reaMap = new Map();
    for (const columnId of columnIdList) {
        // 获取指定专栏的所有文章
        var columnArticleList = await JUEJIN.columnArtListPost(columnId);
        var res = await JUEJIN.juejinColumnsInfoPost(columnId);
        const {
            column_version,
            author,
        } = res;
        const {
            title,
        } = column_version;
        const {
            user_name,
        } = author;
        reaMap.set(columnId + "&&" + title + "&&" + user_name, columnArticleList);
    }
    global.JUEJIN_HOT_COLUMN_MAP = reaMap;
}



module.exports = {
    voidCatchWork,
}