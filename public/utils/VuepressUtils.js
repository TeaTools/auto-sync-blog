const fs = require('fs');
const {
    downloadLocalFile,
    mkdirsSync,
} = require('./FileUtils');
const http = require('./Http');
const {
    JUEJIN_USER_API,
    JUEJIN_USER_URL,
    README_FILE_PATH,
    README_TEMPLATE_PATH,
    CONFIG_FILE_PATH,
    CONFIG_TEMPLATE_PATH,
    COVER_JPG,
    VUEPRESS_PUBLIC_PATH,
    BASE_COVER_JPG_PATH,
} = require("../base/base-data"); // 静态变量

// 创建 README 文件
const initREADME = (initREADMEData) => {
    const {
        user_id,
        cover_png,
    } = initREADMEData;
    const readmeRes = getREADME(user_id, cover_png);
    fs.writeFileSync(README_FILE_PATH, readmeRes, (err) => { // 重写该文档（appendFile是追加并不存在就直接创建）
        if (err) throw err;
        console.log('写入成功' + README_FILE_PATH);
    })
}

// 创建 config 文件
const initConfig = (replaceConfigData) => {
    var res = getConfig(replaceConfigData);
    // console.log(res)
    var finalData = res;
    fs.writeFileSync(CONFIG_FILE_PATH, finalData, (err) => { // 重写该文档（appendFile是追加并不存在就直接创建）
        if (err) throw err;
        console.log('写入成功' + filePath);
    })

}
const init = (userBean) => {
    var isMkdir = mkdirsSync(VUEPRESS_PUBLIC_PATH); // 先把文件夹创建好
    if (!isMkdir) {
        console.log('新建文件夹有误！');
        return;
    }
    initConfig(userBean);
    initREADME(userBean);
}

// 获取用户信息
const getJuejinUserInfo = async (user_id) => {
    var data = {
        user_id,
    };
    var res = await http.get(JUEJIN_USER_API, data);
    var user_info = res.data.data;
    return getUserBean(user_info);
}

// 筛选需要的用户信息
const getUserBean = (user_info) => {
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

// 格式化对应的 README 配置内容
const getREADME = (user_id, cover_png) => {
    // var cover_png = `/head.png`;
    if (!cover_png) {
        cover_png = `/` + COVER_JPG;
        downloadLocalFile(BASE_COVER_JPG_PATH, VUEPRESS_PUBLIC_PATH + COVER_JPG);
        console.log("创建成功", cover_png);
    }
    var template = fs.readFileSync(README_TEMPLATE_PATH, 'utf-8');
    template = template.replaceAll("{{link}}", JUEJIN_USER_URL + user_id).replaceAll("{{cover_png}}", cover_png);
    return template;
}

// 格式化对应的 config 配置内容
const getConfig = (replaceData) => {
    var {
        user_name,
        time_sort_list_str, // 这个需要加双引号（即"{{[]}}"） 一个数组的时间
        find_me_url,
        order_column_url,
        baidu_count_url,
        start_year,
        favicon_ico,
        logo_png,
    } = replaceData;

    var template = fs.readFileSync(CONFIG_TEMPLATE_PATH, 'utf-8');
    template = template
        .replaceAll("{{find_me_url}}", find_me_url)
        .replaceAll("{{order_column_url}}", order_column_url)
        .replaceAll("\"{{time_sort_list}}\"", time_sort_list_str)
        .replaceAll("{{user_name}}", user_name)
        .replaceAll("{{start_year}}", start_year)
        .replaceAll("`{{baidu_coutn_url}}`", baidu_count_url)
        .replaceAll("{{favicon_ico}}", favicon_ico)
        .replaceAll("{{logo_png}}", logo_png)
    return template;
}

module.exports = {
    getJuejinUserInfo,
    init,
}