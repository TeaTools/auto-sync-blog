const fs = require('fs');
const BASE_DATA = require('./base');


// 格式化对应的 README 配置内容
const getREADME = (user_id, cover_png) => {
    // var cover_png = `/head.png`;
    if (!cover_png) {
        cover_png = `/` + BASE_DATA.COVER_JPG;
        // 创建到 generate 生成模块
        // console.log("创建成功", cover_png);
    }
    var template = fs.readFileSync(BASE_DATA.README_TEMPLATE_PATH, 'utf-8');
    template = template.replaceAll("{{link}}", BASE_DATA.JUEJIN_USER_URL + user_id).replaceAll("{{cover_png}}", cover_png);
    return template;
}


// 复制本地的问题
const downloadLocalFile = (url, filePath) => {
    fs.readFile(url, function (err, originBuffer) { // 读取文件路径（图片）
        fs.writeFileSync(filePath, originBuffer, function (err) { // 把 buffer 写入到文件
            if (err) {
                console.log(err)
            }
        });
        // var base64Img = originBuffer.toString("base64"); // base64 编码
        // var decodeImg = new Buffer(base64Img, "base64") // new Buffer(string, encoding)
        // fs.writeFileSync(path, decodeImg, function (err) { // 生成(把base64位编码写入到文件)
        //     if (err) {
        //         console.log(err)
        //     }
        // })
    })
}

// 格式化对应的 config 配置内容
const getConfig = (userBean) => {
    var {
        user_name,
        time_sort_list_str, // 这个需要加双引号（即"{{[]}}"） 一个数组的时间
        find_me_url,
        order_column_url,
        baidu_count_url,
        start_year,
        favicon_ico,
        logo_png,
    } = userBean;
    var template = fs.readFileSync(BASE_DATA.CONFIG_TEMPLATE_PATH, 'utf-8');
    template = template
        .replaceAll("{{find_me_url}}", find_me_url)
        .replaceAll("{{order_column_url}}", order_column_url)
        .replaceAll("\"{{time_sort_list}}\"", time_sort_list_str)
        .replaceAll("{{user_name}}", user_name)
        .replaceAll("{{start_year}}", start_year)
        .replaceAll("{{baidu_count_url}}", baidu_count_url)
        .replaceAll("{{favicon_ico}}", favicon_ico)
        .replaceAll("{{logo_png}}", logo_png)
    return template;
}



function getVuepressInfo(userBean, articleMap) {
    var vuepressParams = {};
    var yyMap = new Map(); // 年月日的已经排序好，不过是倒序的，所以遍历一般好让年月的时间正序起来
    var yyList = []; // 需要添加时间的分类b
    articleMap.forEach((strMap, yymm) => {
        const yy = yymm.substring(0, 4);
        var yyStr = yyMap.get(yy);
        if (!yyStr) {
            yyMap.set(yy, true);
            yyList.push(yy);
        }
    });
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
    time_sort_list_str += "]";
    vuepressParams.time_sort_list_str = time_sort_list_str; // 时间分类生成
    vuepressParams.start_year = start_year; // 写作开始的年份
    vuepressParams.baidu_count_url = userBean.baidu_count_url; // 百度统计（有需要可自行修改为对应的 key ）
    vuepressParams.find_me_url = userBean.home_url; // 找到我（掘金首页）
    vuepressParams.favicon_ico = userBean.avatar_large; // 页面标题旁的小图标
    vuepressParams.logo_png = userBean.avatar_large; // 头像
    vuepressParams.user_name = userBean.user_name; // 名字
    // if (column_id) {
    //     userBean.order_column_url = JUEJIN_COLUMN_URL + column_id; // 订阅地址 （如果有指定专栏，那么订阅对应的专栏）
    // }
    vuepressParams.order_column_url = userBean.home_url + "columns"; // 订阅地址 （如果是指定用户所有文章，那么订阅就会变成该用户下的专栏页）

    const config = getConfig(vuepressParams);
    const readME = getREADME(userBean.user_id, userBean.cover_png);
    const vuepressInfo = {
        config,
        readME,
    }
    return vuepressInfo;
}

module.exports = {
    getVuepressInfo,
}