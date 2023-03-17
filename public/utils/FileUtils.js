const fs = require('fs'); // 文件操作
const path = require("path"); // path 实现创建多层目录
const https = require('https'); // 请求
// const request = require("request");
const BASE_DATA = require("../base/base-data"); // 静态变量
const {
    count
} = require('console');
// 递归创建参考代码来源地址：https://blog.csdn.net/liruiqing520/article/details/107262653
// 递归创建目录 异步方法  
function mkdirs(dirname, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback();
        } else {
            // console.log(path.dirname(dirname));  
            mkdirs(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
                console.log('在' + path.dirname(dirname) + '目录创建好' + dirname + '目录');
            });
        }
    });
}
// 递归创建目录 同步方法
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

// 更新年月的文档（YYYYMM）
function updateYYMM(startyymm, addData, dirPath, userBean) { // 更新文档
    var isMkdir = mkdirsSync(dirPath);
    if (!isMkdir) {
        console.log('新建文件夹有误！');
        return;
    }
    var filePath = dirPath + startyymm + ".md"; // 文件路径 
    var fileData = getFileData(filePath, BASE_DATA.YYMM_TEMPLATE_PATH); // 获取文件内容（不存在则获取模板内容）
    // 添加
    fileData = fileData.replaceAll("&{author}&", userBean["user_name"]) // 作者
    var {
        countMap
    } = userBean;
    // 添加月的文章总数（这个可以到写入月数据时添加）
    updateFile(filePath, fileData, addData, startyymm, countMap);
}
// 更新年的文档（YYYY）
function updateYY(startyymm, addData, dirPath, userBean) { // 更新文档
    var isMkdir = mkdirsSync(dirPath);
    if (!isMkdir) {
        console.log('新建文件夹有误！');
        return;
    }
    const yy = startyymm.substring(0, 4);
    var filePath = dirPath + yy + ".md"; // 文件路径 
    var fileData = getFileData(filePath, BASE_DATA.YY_TEMPLATE_PATH); // 获取文件内容（不存在则获取模板内容）
    // 添加
    fileData = fileData.replaceAll("&{author}&", userBean["user_name"]) // 作者
    var {
        countMap
    } = userBean;
    var findPosition = fileData.indexOf("&{count}&");
    if (findPosition !== -1) { // 存在这个更新
        fileData = fileData.replaceAll("&{count}&", countMap[yy]);
    }

    // 添加月的文章总数（这个可以到写入月数据时添加）
    updateFile(filePath, fileData, addData, startyymm, countMap);
}


// 更新总的文档（all.md）
function updateAll(startyymm, addData, dirPath, userBean) { // 更新文档
    var isMkdir = mkdirsSync(dirPath);
    if (!isMkdir) {
        console.log('新建文件夹有误！');
        return;
    }
    // 判断该文档是否存在
    // console.log(dirPath)
    const fileName = "all";

    var filePath = dirPath + fileName + ".md"; // 文件路径 
    var fileData = getFileData(filePath, BASE_DATA.ALL_TEMPLATE_PATH); // 获取文件内容（不存在则获取模板内容）

    // 添加
    fileData = fileData.replaceAll("&{author}&", userBean["user_name"]) // 作者
    var {
        countMap
    } = userBean;
    var findPosition = fileData.indexOf("&{postTotal}&");
    if (findPosition !== -1) { // 存在更新
        fileData = fileData.replaceAll("&{postTotal}&", countMap["postTotal"]); // 所有文章总数
        fileData = initYearTotal(fileData, countMap); // 初始化的年文章数量
    }

    // 添加月的文章总数（这个可以到写入月数据时添加）
    updateFile(filePath, fileData, addData, startyymm, countMap);
}

// 初始化年文章的统计
function initYearTotal(content, countMap) {
    var yytemplateStr = "**&{yy}&年文章数量：&{count}&**";

    // console.log(countMap)
    for (var yy in countMap) {
        yy = String(yy);
        // console.log(yy, yy.length)
        if (yy.length > 4) {
            // console.log("跳过：", yy)
            continue;
        }
        const count = countMap[yy];
        var updateStr = yytemplateStr.replaceAll("&{yy}&", yy).replaceAll("&{count}&", count);
        var findPosition = content.indexOf(updateStr);
        if (findPosition !== -1) { // 已经存在，返回这个位置和原文
            // console.log("跳过：", yy)
            continue;
        }
        // console.log(count);
        const templateValue = "<!-- 目录总的模板 -->";
        var findTemplatePosition = content.indexOf(templateValue);
        updateStr = "\r\n" + updateStr + "\r\n";
        content = updateOptPosition(findTemplatePosition, updateStr, content);
    }
    return content;
}


function getFileData(filePath, templatePath) {
    var finalData = new String();
    if (fs.existsSync(filePath)) {
        // 文档存在，读取里面内容
        finalData = fs.readFileSync(filePath, 'utf-8');
    } else {
        // 文档不存在，读取模板文件
        finalData = fs.readFileSync(templatePath, 'utf-8');
    }
    return finalData;
}


// 公共部分，更新文件
function updateFile(filePath, finalData, addData, startyymm, countMap) {
    console.log(filePath)
    try {
        var finalDataMap = isUpdateYYOrYYMM(startyymm, finalData, countMap);
        var {
            content,
            optPosition
        } = finalDataMap;

        finalData = updateOptPosition(optPosition, addData, content);
        fs.writeFileSync(filePath, finalData, (err) => { // 重写该文档（appendFile是追加并不存在就直接创建）
            if (err) throw err;
            console.log('写入成功' + filePath);
        })
    } catch (err) {
        console.log(err)
    }
}

// "## 年月" 判断是否需要添加，不需要则返回原文和位置；需要添加后再返回原文和位置
function isUpdateYYOrYYMM(startyymm, content, countMap) {
    const YY = startyymm.substring(0, 4);
    const MM = startyymm.substring(4);
    const YY_MM = YY + "-" + MM;
    content = content.replaceAll("&{YY}&", YY).replaceAll("&{MM}&", MM);
    var findOrUpdateStr = "## " + YY_MM;
    var findPosition = content.indexOf(findOrUpdateStr);
    if (findPosition !== -1) { // 已经存在，返回这个位置和原文
        return {
            optPosition: findPosition + findOrUpdateStr.length,
            content,
        };
    }
    // 不存在，添加插入
    const templateValue = "的模板 -->";
    var findTemplatePosition = content.indexOf(templateValue) + templateValue.length;
    content = updateOptPosition(findTemplatePosition, "\r\n" + findOrUpdateStr, content);
    findTemplatePosition += "\r\n".length + findOrUpdateStr.length;
    var ymTemplateStr = "\r\n" + "**当月文章数：" + countMap[startyymm] + "**";
    content = updateOptPosition(findTemplatePosition, ymTemplateStr, content);
    findTemplatePosition += ymTemplateStr.length;
    return {
        optPosition: findTemplatePosition,
        content,
    };
}

// 插入内容更新到指定位置（optPosition 位置，addTxt 添加内容，content 原数据）
function updateOptPosition(optPosition, addTxt, content) {
    content = content.substring(0, optPosition) + addTxt + content.substring(optPosition);
    return content;
}

// 下载文件
async function downloadFile(downUrl, fileNamePath) {
    // Download the file
    await https.get(downUrl, (res) => {
        // Open file in local filesystem
        const file = fs.createWriteStream(fileNamePath);
        // Write data into local file
        res.pipe(file);
        // Close the file
        file.on('finish', () => {
            file.close();
            console.log(`File downloaded!`, fileNamePath);
        });
    }).on("error", (err) => {
        console.log("Error: ", err.message, fileNamePath);
    });

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

// downloadLocalFile(`public/base/cover.jpg`, `docs/.vuepress/public/`, `cover.jpg`);


module.exports = {
    mkdirs,
    mkdirsSync,
    updateYYMM,
    updateYY,
    updateAll,
    downloadFile,
    downloadLocalFile,
}