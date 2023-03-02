const fs = require('fs'); // 文件操作
const path = require("path"); // path 实现创建多层目录
const https = require('https'); // 请求
// const request = require("request");
const {
    YYMM_TEMPLATE_PATH,
    YY_TEMPLATE_PATH,
    ALL_TEMPLATE_PATH,
} = require("../base/base-data"); // 静态变量

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
function updateYYMM(startyymm, addData, dirPath) { // 更新文档
    var isMkdir = mkdirsSync(dirPath);
    if (!isMkdir) {
        console.log('新建文件夹有误！');
        return;
    }
    // 判断该文档是否存在
    console.log(dirPath)
    const YY = startyymm.substring(0, 4);
    const MM = startyymm.substring(4);
    const YY_MM = YY + "-" + MM;
    updateFile(YYMM_TEMPLATE_PATH, dirPath, addData, YY, MM, YY_MM, startyymm);
}
// 更新年的文档（YYYY）
function updateYY(startyymm, addData, dirPath) { // 更新文档
    var isMkdir = mkdirsSync(dirPath);
    if (!isMkdir) {
        console.log('新建文件夹有误！');
        return;
    }
    // 判断该文档是否存在
    // console.log(dirPath)
    const YY = startyymm.substring(0, 4);
    const MM = startyymm.substring(4);
    const YY_MM = YY + "-" + MM;
    updateFile(YY_TEMPLATE_PATH, dirPath, addData, YY, MM, YY_MM, YY);
}
// 更新总的文档（all.md）
function updateAll(startyymm, addData, dirPath) { // 更新文档
    var isMkdir = mkdirsSync(dirPath);
    if (!isMkdir) {
        console.log('新建文件夹有误！');
        return;
    }
    // 判断该文档是否存在
    // console.log(dirPath)
    const YY = startyymm.substring(0, 4);
    const MM = startyymm.substring(4);
    const YY_MM = YY + "-" + MM;
    const fileName = "all";
    updateFile(ALL_TEMPLATE_PATH, dirPath, addData, YY, MM, YY_MM, fileName);
}

// 公共部分，更新文件
function updateFile(templatePath, dirPath, addData, YY, MM, titleName, fileName) {
    var filePath = dirPath + fileName + ".md";
    var finalData = new String();
    console.log(filePath)
    try {
        if (fs.existsSync(filePath)) {
            // 文档存在，读取里面内容
            finalData = fs.readFileSync(filePath, 'utf-8');
        } else {
            // 文档不存在，读取模板文件
            finalData = fs.readFileSync(templatePath, 'utf-8');
            finalData = finalData.replaceAll("&{YY}&", YY).replaceAll("&{MM}&", MM);
        }
        var finalDataMap = isUpdateYYOrYYMM("## " + titleName, finalData);
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
function isUpdateYYOrYYMM(findOrUpdateStr, content) {
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
    return {
        optPosition: findTemplatePosition + "\r\n".length + findOrUpdateStr.length,
        content,
    };
}

// 插入内容更新到指定位置
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