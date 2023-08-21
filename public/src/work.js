// 获取模块（catch）
const CATCH_WORK = require("./catch/catch");
// 解析模块（details）
const DETAILS_WORK = require("./details/details");
// 生成模块（generate）
const GENERATE_WORK = require("./generate/generate");

async function run(juejin_user_id, juejin_column_id, baidu_count_url) {
    if (!baidu_count_url)
        baidu_count_url = `var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?f7c04e5ddb588d9604e7d1ef5b7483af";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();`;
    var juejinBody = {
        juejin_user_id,
        juejin_column_list: [juejin_column_id],
        baidu_count_url,
    }
    // console.log("global：", global);
    console.log("开始获取数据");
    await CATCH_WORK.voidCatchWork(juejinBody);
    console.log("获取数据完成（开始解析数据）");
    await DETAILS_WORK.voidDetailsWork(baidu_count_url);
    console.log("解析数据完成（开始生成数据）");
    await GENERATE_WORK.voidGenrateWork();
    console.log("生成数据完成");
}


module.exports = {
    run,
}