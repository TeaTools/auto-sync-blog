import { voidCatchWork } from "./catch/catch.js";
import { voidDetailsWork } from "./details/details.js";
import { voidGenrateWork } from "./generate/generate.js";

/**
 *
 * @param {string} userId
 * @param {string} columnsId
 * @param {string} baiduHM
 * @return {Promise<void>}
 */
export async function run(userId, columnsId, baiduHM) {
  // 当前未解决百度统计问题，参数接收出现问题
  if (!baiduHM) {
    baiduHM = `var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?f7c04e5ddb588d9604e7d1ef5b7483af";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();`;
  }

  const juejinBody = {
    userId,
    columnsId: columnsId.split(","),
    baiduHM,
  };

  console.log("开始获取数据");
  await voidCatchWork({ userId, columnsId });

  console.log("获取数据完成（开始解析数据）");
  await voidDetailsWork(baiduHM);

  console.log("解析数据完成（开始生成数据）");
  await voidGenrateWork();

  console.log("生成数据完成");
}
