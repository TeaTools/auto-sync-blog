import fs from "fs";
import path from "path";
import https from "https";

// 递归创建参考代码来源地址：https://blog.csdn.net/liruiqing520/article/details/107262653
// 递归创建目录 异步方法
export function mkdirs(dirname, callback) {
  fs.exists(dirname, function (exists) {
    if (exists) {
      callback();
    } else {
      // console.log(path.dirname(dirname));
      mkdirs(path.dirname(dirname), function () {
        fs.mkdir(dirname, callback);
        console.log(
          "在" + path.dirname(dirname) + "目录创建好" + dirname + "目录",
        );
      });
    }
  });
}
// 递归创建目录 同步方法
export function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

// 公共部分，更新文件
export function updateArticleFile(
  filePath,
  finalData,
  addData,
  startyymm,
  countMap,
) {
  console.log("updateArticleFile-filePath：", filePath);
  var finalDataMap = isUpdateYYOrYYMM(startyymm, finalData, countMap);
  var { content, optPosition } = finalDataMap;
  finalData = updateOptPosition(optPosition, addData, content);
  updateFile(filePath, finalData);
}

export function updateFile(filePath, finalData) {
  try {
    fs.writeFileSync(filePath, finalData, (err) => {
      // 重写该文档（appendFile是追加并不存在就直接创建）
      if (err) throw err;
      console.log("写入成功" + filePath);
    });
  } catch (err) {
    console.log(err);
  }
}

// "## 年月" 判断是否需要添加，不需要则返回原文和位置；需要添加后再返回原文和位置
export function isUpdateYYOrYYMM(startyymm, content, countMap) {
  const YY = startyymm.substring(0, 4);
  const MM = startyymm.substring(4);
  const YY_MM = YY + "-" + MM;
  content = content.replaceAll("&{YY}&", YY).replaceAll("&{MM}&", MM);
  var findOrUpdateStr = "## " + YY_MM;
  var findPosition = content.indexOf(findOrUpdateStr);
  if (findPosition !== -1) {
    // 已经存在，返回这个位置和原文
    return {
      optPosition: findPosition + findOrUpdateStr.length,
      content,
    };
  }
  // 不存在，添加插入
  const templateValue = "的模板 -->";
  var findTemplatePosition =
    content.indexOf(templateValue) + templateValue.length;
  content = updateOptPosition(
    findTemplatePosition,
    "\r\n" + findOrUpdateStr,
    content,
  );
  findTemplatePosition += "\r\n".length + findOrUpdateStr.length;
  var ymTemplateStr = "\r\n" + "**该月文章数：" + countMap[startyymm] + "**";
  content = updateOptPosition(findTemplatePosition, ymTemplateStr, content);
  findTemplatePosition += ymTemplateStr.length;
  return {
    optPosition: findTemplatePosition,
    content,
  };
}

// 插入内容更新到指定位置（optPosition 位置，addTxt 添加内容，content 原数据）
export function updateOptPosition(optPosition, addTxt, content) {
  content =
    content.substring(0, optPosition) + addTxt + content.substring(optPosition);
  return content;
}

// 下载文件
export async function downloadFile(downUrl, fileNamePath) {
  // Download the file
  await https
    .get(downUrl, (res) => {
      // Open file in local filesystem
      const file = fs.createWriteStream(fileNamePath);
      // Write data into local file
      res.pipe(file);
      // Close the file
      file.on("finish", () => {
        file.close();
        console.log(`File downloaded!`, fileNamePath);
      });
    })
    .on("error", (err) => {
      console.log("Error: ", err.message, fileNamePath);
    });
}

// 复制本地的问题
export const downloadLocalFile = (url, filePath) => {
  fs.readFile(url, function (err, originBuffer) {
    // 读取文件路径（图片）
    fs.writeFileSync(filePath, originBuffer, function (err) {
      // 把 buffer 写入到文件
      if (err) {
        console.log(err);
      }
    });
    // var base64Img = originBuffer.toString("base64"); // base64 编码
    // var decodeImg = new Buffer(base64Img, "base64") // new Buffer(string, encoding)
    // fs.writeFileSync(path, decodeImg, function (err) { // 生成(把base64位编码写入到文件)
    //     if (err) {
    //         console.log(err)
    //     }
    // })
  });
};

// downloadLocalFile(`public/base/cover.jpg`, `docs/.vitepress/public/`, `cover.jpg`);

// 读取
export function getFileData(filePath, templatePath) {
  var finalData = new String();
  if (fs.existsSync(filePath)) {
    // 文档存在，读取里面内容
    finalData = fs.readFileSync(filePath, "utf-8");
  } else {
    // 文档不存在，读取模板文件
    finalData = fs.readFileSync(templatePath, "utf-8");
  }
  return finalData;
}
