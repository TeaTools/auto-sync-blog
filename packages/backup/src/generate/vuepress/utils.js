import fs from "fs";
import * as BASE_DATA from "../../../common/base.js";
import * as FileUtils from "../common/FileUtils.js";

// vite press configurations
export const init = (pressInfo) => {
  const isMkdir = FileUtils.mkdirsSync(BASE_DATA.VUEPRESS_PUBLIC_PATH); // 先把文件夹创建好
  if (!isMkdir) {
    throw new Error("新建文件夹有误！")
  }
  const { config, readME } = pressInfo;
  initConfig(config);
  initREADME(readME);
};

// 创建 README 文件
const initREADME = (readmeRes) => {
  FileUtils.downloadLocalFile(
    BASE_DATA.BASE_COVER_JPG_PATH,
    BASE_DATA.VUEPRESS_PUBLIC_PATH + BASE_DATA.COVER_JPG,
  );
  var isMkYearDir = FileUtils.mkdirsSync(BASE_DATA.PUBLIC_CSS_PATH);
  const cssData = FileUtils.getFileData(BASE_DATA.BASE_PUBLIC_CSS_PATH);

  fs.writeFileSync(BASE_DATA.PUBLIC_CSS_PATH + "index.css", cssData, (err) => {
    // 重写该文档（appendFile是追加并不存在就直接创建）
    if (err) throw err;
    console.log("写入成功" + BASE_DATA.PUBLIC_CSS_PATH + "index.css");
  });
  fs.writeFileSync(BASE_DATA.README_FILE_PATH, readmeRes, (err) => {
    // 重写该文档（appendFile是追加并不存在就直接创建）
    if (err) throw err;
    console.log("写入成功" + BASE_DATA.README_FILE_PATH);
  });
};

// 创建 config 文件
const initConfig = (finalData) => {
  fs.writeFileSync(BASE_DATA.CONFIG_FILE_PATH, finalData, (err) => {
    // 重写该文档（appendFile是追加并不存在就直接创建）
    if (err) throw err;
    console.log("写入成功" + filePath);
  });
};

