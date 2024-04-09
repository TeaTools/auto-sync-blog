import { sleep, get, post } from "../../../utils/Http.js";
import * as JUEJIN_BASE from './base.js'

// 文章列表信息请求（post 请求
export const userArtMapPost = async (userId) => {
    console.log("开始-获取个人所有文章")
    // 获取个人所有文章
    var userArticleList = await juejinCommonPost(JUEJIN_BASE.ARTICLE_API, getArticleParams(userId), 10);
    // console.log(userArticleList);
    // 递归深拷贝所有文章，进行筛选出还没有分到专栏的（用JSON.parse(JSON.stringify(userArticleList)) 深拷贝无法处理循环引用的情况，否则会导致死循环）
    var noColumnArticleList = deepClone(userArticleList);
    // 获取用户的专栏列表
    console.log("结束-获取个人所有文章")
    console.log("开始-获取用户的专栏列表")
    var columnList = await juejinCommonPost(JUEJIN_BASE.COLUMN_LIST_API, getColumnsListParams(userId), 1);
    console.log("结束-获取用户的专栏列表")
    // 所有专栏的对应文章（key：专栏id；value：专栏下的所有文章）
    var columnMap = new Map();
    // 所有专栏再获取所有文章
    for (var i = 0; i < columnList.length; i++) {
        // 获取所需要的信息
        const {
            column_version
        } = columnList[i];
        if (!column_version) {
            continue;
        }
        const {
            title,
            column_id
        } = column_version;
        var columnMapKey = column_id + "&&" + title;
        if (columnMap.get(columnMapKey)) {
            // map已存在，跳过
            continue;
        }
        console.log("开始-获取用户的专栏" + column_id + "对应的文章")
        var columnArticleList = await columnArtListPost(column_id);
        console.log("结束-获取用户的专栏" + column_id + "对应的文章")
        columnMap.set(columnMapKey, columnArticleList);
        // 遍历专栏对应的所有文章
        for (var columnArticleIndex = 0; columnArticleIndex < columnArticleList.length; columnArticleIndex++) {
            // console.log("columnArticleList[i]", columnArticleList[i])
            if (!columnArticleList[columnArticleIndex]) {
                continue;
            }
            var {
                article_id
            } = columnArticleList[columnArticleIndex];
            if (!article_id) {
                console.log("空了")
                continue;
            }
            // 已经在专栏里的，进行删除深拷贝的那份
            var removeIndex = noColumnArticleList.findIndex(item => item.article_id === article_id);
            if (removeIndex === -1) {
                continue;
            }
            // console.log("删除成功", columnArticleList[i])
            noColumnArticleList.splice(removeIndex, 1);
        }
    }
    // console.log("noColumnArticleList：", JSON.stringify(noColumnArticleList))
    // 没有专栏的所有文章
    columnMap.set("202304125201314&&未分类", noColumnArticleList);
    return {
        userArticleList, // 用户所有文章
        columnMap, // 所有专栏的对应文章（key：专栏id；value：专栏下的所有文章）
    };
}

// 获取用户信息（get 请求
export const userInfoGet = async (userId) => {
    var data = {
        user_id: userId,
    };
    var res = await get(JUEJIN_BASE.USER_API, data);
    var user_info = res.data.data;
    return user_info;
}

// 指定专栏文章列表请求（post 请求
export const columnArtListPost = async (column_id) => {
    // 获取指定专栏
    return await juejinCommonPost(JUEJIN_BASE.COLUMN_API, getColumnsParams(column_id), 1);
}

export const juejinColumnsInfoPost = async (columnId) => {
    var data = {
        column_id: columnId,
    };
    var res = await get(JUEJIN_BASE.COLUMN_INFO_API, data);
    return res.data.data;
}

// juejin请求相关公共接口（post请求
const juejinCommonPost = async (url, requestBody, cursorTimes) => {
    // 记录请求列表
    var resList = [];
    var i = 0;
    var isOver = false;
    while (!isOver) {
        // 专栏文章参数、专栏列表不需要*10;个人文章需要*10
        requestBody.cursor = String(i * cursorTimes);
        console.log(requestBody);
        var res = await post(url, requestBody);
        var isBadWebCount = 0;
        while ((!res || !res.data) && isBadWebCount < 5) {
            // 有可能网络异常，数据请求不到，那就重复5次
            res = await post(url, requestBody);
            isBadWebCount++;
        }
        if (isBadWebCount >= 5) { // 三次之后还是有问题就抛出异常（事不过五）
            console.log("请求故障，请重试！");
            throw new Error("请求故障，请重试！");
        }
        if (0 !== res.data.err_no || !res.data.data || res.data.data.length == 0) {
            break;
        }
        var resDataData = res.data.data;
        // console.log("resDataData.length：", resDataData.length);
        resList = resList.concat(resDataData);
        // console.log("resList.length：" + resList.length);
        i++;
        await sleep();
    }
    return resList;
}

// 获取文章的请求参数
const getArticleParams = (user_id) => {
    return {
        "sort_type": 2,
        user_id, // 用户id
    };
};

// 获取专栏详情的文章请求参数
const getColumnsParams = (column_id) => {
    return {
        column_id, // 专栏id
        // "cursor": cursor, 这里在发请求的方法里有做处理
        "limit": 20, // 页大小
        "sort": 2, // 排序（1最早 2最新）
    };
};

// 获取专栏列表的请求参数
const getColumnsListParams = (user_id) => {
    return {
        "audit_status": 2, // 审核状态（2为审核通过
        "user_id": user_id,
        // "cursor": "2", 这里在发请求的方法里有做处理
        "limit": 10
    }
}

// 递归深拷贝
const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const clone = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = deepClone(obj[key]);
        }
    }
    return clone;
}
