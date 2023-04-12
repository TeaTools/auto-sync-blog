const FileUtils = require("../common/FileUtils");
const BASE_DATA = require("../common/base");

// 更新年月的文档（YYYYMM）
function updateYYMM(startyymm, addData, dirPath, countMap, userBean) { // 更新文档
    var filePath = dirPath + startyymm + ".md"; // 文件路径 
    var fileData = FileUtils.getFileData(filePath, BASE_DATA.YYMM_TEMPLATE_PATH); // 获取文件内容（不存在则获取模板内容）
    // 添加
    fileData = fileData.replaceAll("&{author}&", userBean["user_name"]) // 作者
    // 添加月的文章总数（这个可以到写入月数据时添加）
    FileUtils.updateArticleFile(filePath, fileData, addData, startyymm, countMap);
}

// 更新年的文档（YYYY）
function updateYY(startyymm, addData, dirPath, countMap, userBean) { // 更新文档
    const yy = startyymm.substring(0, 4);
    var filePath = dirPath + yy + ".md"; // 文件路径 
    var fileData = FileUtils.getFileData(filePath, BASE_DATA.YY_TEMPLATE_PATH); // 获取文件内容（不存在则获取模板内容）
    // 添加
    fileData = fileData.replaceAll("&{author}&", userBean["user_name"]) // 作者
    var findPosition = fileData.indexOf("&{count}&");
    if (findPosition !== -1) { // 存在这个更新
        fileData = fileData.replaceAll("&{count}&", countMap[yy]);
    }
    // 添加月的文章总数（这个可以到写入月数据时添加）
    FileUtils.updateArticleFile(filePath, fileData, addData, startyymm, countMap);
}

function updateArticleMap(articleMap, countMap, userBean) {
    var yymmMapList = []; // 年月日的已经排序好，不过是倒序的，所以遍历一般好让年月的时间正序起来
    articleMap.forEach((strMap, yymm) => {
        yymmMapList.push({
            yymm,
            strMap
        });
    });
    // console.log(yymmMapList);
    // return;
    for (var backIndex in yymmMapList) {
        var oneMap = yymmMapList[yymmMapList.length - backIndex - 1];
        var {
            yymm,
            strMap
        } = oneMap;
        // console.log(oneMap, str, yymm)
        const {
            str
        } = strMap;
        updateCommon(yymm, str, BASE_DATA.DOCS_SORT_PATH, countMap, userBean);
    }
}

function updateHotArticleColumnList(columnHotList) {
    for (var i = 0; i < columnHotList.length; i++) {
        var articleHotColumn = columnHotList[i];
        var {
            idAndTitile, // 还有个user_name
            columnCountMap,
            articleMap,
        } = articleHotColumn;
        var yymmMapList = []; // 年月日的已经排序好，不过是倒序的，所以遍历一般好让年月的时间正序起来
        articleMap.forEach((strMap, yymm) => {
            yymmMapList.push({
                yymm,
                strMap,
            });
        });
        var commonMap = {
            idAndTitile,
            columnCountMap,
        };
        // console.log(yymmMapList);
        // return;
        updateHotColumn(commonMap, BASE_DATA.DOCS_SORT_PATH);
        for (var backIndex in yymmMapList) {
            var oneMap = yymmMapList[yymmMapList.length - backIndex - 1];
            updateArticleHotColumn(commonMap, oneMap, BASE_DATA.DOCS_SORT_PATH);
        }
    }
}

// 推荐专栏
function updateHotColumn(commonMap, dirPath) {
    const columnDirPath = dirPath + "column/";
    // var isMkHotDir = FileUtils.mkdirsSync(hotDirPath);
    var isMkMyDir = FileUtils.mkdirsSync(columnDirPath);
    if (!isMkMyDir) {
        console.log('新建文件夹有误！', "isMkMyDir", isMkMyDir, );
        return;
    }
    const {
        idAndTitile,
        columnCountMap,
    } = commonMap;
    var strList = idAndTitile.split("&&"); // [0]是id，[1]是标题，[2]是对应专栏的作者名
    var filePath = columnDirPath + "推荐专栏.md";
    var fileData = FileUtils.getFileData(filePath, BASE_DATA.COLUMN_HOT_TEMPLATE_PATH);
    var templateValue = "- [{columnName}](/sort/column/my/{columnName}) **文章数：{postTotal}**";
    templateValue = templateValue.replaceAll("{columnName}", strList[1]).replaceAll("{postTotal}", columnCountMap["postTotal"]);
    fileData = fileData.replaceAll("&{author}&", strList[2]) // 作者
    fileData += "\r\n" + templateValue;
    FileUtils.updateFile(filePath, fileData);
}

function updateArticleHotColumn(commonMap, oneMap, dirPath) {
    const hotDirPath = dirPath + "column/hot/";
    var isMkHotDir = FileUtils.mkdirsSync(hotDirPath);
    // if (!isMkHotDir || !isMkMyDir) {
    //     console.log('新建文件夹有误！', "isMkHotDir", isMkHotDir, "isMkMyDir", isMkMyDir, );
    //     return;
    // }
    if (!isMkHotDir) {
        console.log('新建文件夹有误！', "isMkMyDir", isMkMyDir, );
        return;
    }
    const {
        yymm,
        strMap,
    } = oneMap;
    const {
        str
    } = strMap;
    const {
        idAndTitile,
        columnCountMap,
    } = commonMap;
    var strList = idAndTitile.split("&&"); // [0]是id，[1]是标题，[2]是对应专栏的作者名
    const fileName = strList[1];
    var filePath = hotDirPath + fileName + ".md"; // 文件路径 
    var fileData = FileUtils.getFileData(filePath, BASE_DATA.COLUMN_ARTICLE_TEMPLATE_PATH); // 获取文件内容（不存在则获取模板内容）
    // 添加
    fileData = fileData.replaceAll("&{author}&", strList[2]) // 作者
        .replaceAll("&{title}&", fileName);
    var findPosition = fileData.indexOf("&{postTotal}&");
    if (findPosition !== -1) { // 存在更新
        fileData = fileData.replaceAll("&{postTotal}&", columnCountMap["postTotal"]); // 所有文章总数
        fileData = initYearTotal(fileData, columnCountMap); // 初始化的年文章数量
    }
    // 添加月的文章总数（这个可以到写入月数据时添加）
    FileUtils.updateArticleFile(filePath, fileData, str, yymm, columnCountMap);

}

function updateArticleColumnList(columnList, userBean) {
    for (var i = 0; i < columnList.length; i++) {
        var articleColumn = columnList[i];
        var {
            idAndTitile,
            columnCountMap,
            articleMap,
        } = articleColumn;
        var yymmMapList = []; // 年月日的已经排序好，不过是倒序的，所以遍历一般好让年月的时间正序起来
        articleMap.forEach((strMap, yymm) => {
            yymmMapList.push({
                yymm,
                strMap,
            });
        });
        var commonMap = {
            idAndTitile,
            columnCountMap,
        };
        // console.log(yymmMapList);
        // return;
        updateColumn(commonMap, BASE_DATA.DOCS_SORT_PATH, userBean);
        for (var backIndex in yymmMapList) {
            var oneMap = yymmMapList[yymmMapList.length - backIndex - 1];
            updateArticleColumn(commonMap, oneMap, BASE_DATA.DOCS_SORT_PATH, userBean);
        }
    }
}

// 更新专栏md
function updateColumn(commonMap, dirPath, userBean) {
    const columnDirPath = dirPath + "column/";
    // var isMkHotDir = FileUtils.mkdirsSync(hotDirPath);
    var isMkMyDir = FileUtils.mkdirsSync(columnDirPath);
    if (!isMkMyDir) {
        console.log('新建文件夹有误！', "isMkMyDir", isMkMyDir, );
        return;
    }
    const {
        idAndTitile,
        columnCountMap,
    } = commonMap;
    var strList = idAndTitile.split("&&"); // [0]是id，[1]是标题
    var filePath = columnDirPath + "我的专栏.md";
    var fileData = FileUtils.getFileData(filePath, BASE_DATA.COLUMN_MY_TEMPLATE_PATH);
    var templateValue = "- [{columnName}](/sort/column/my/{columnName}) **文章数：{postTotal}**";
    templateValue = templateValue.replaceAll("{columnName}", strList[1]).replaceAll("{postTotal}", columnCountMap["postTotal"]);
    fileData = fileData.replaceAll("&{author}&", userBean["user_name"]) // 作者
    fileData += "\r\n" + templateValue;
    FileUtils.updateFile(filePath, fileData);
}

function updateArticleColumn(commonMap, oneMap, dirPath, userBean) {
    // const hotDirPath = dirPath + "column/hot/";
    const myDirPath = dirPath + "column/my/";
    // var isMkHotDir = FileUtils.mkdirsSync(hotDirPath);
    var isMkMyDir = FileUtils.mkdirsSync(myDirPath);
    // if (!isMkHotDir || !isMkMyDir) {
    //     console.log('新建文件夹有误！', "isMkHotDir", isMkHotDir, "isMkMyDir", isMkMyDir, );
    //     return;
    // }
    if (!isMkMyDir) {
        console.log('新建文件夹有误！', "isMkMyDir", isMkMyDir, );
        return;
    }
    const {
        yymm,
        strMap,
    } = oneMap;
    const {
        str
    } = strMap;
    const {
        idAndTitile,
        columnCountMap,
    } = commonMap;
    var strList = idAndTitile.split("&&"); // [0]是id，[1]是标题
    const fileName = strList[1];
    var filePath = myDirPath + fileName + ".md"; // 文件路径 
    var fileData = FileUtils.getFileData(filePath, BASE_DATA.COLUMN_ARTICLE_TEMPLATE_PATH); // 获取文件内容（不存在则获取模板内容）

    //     if (fileName == "未分类") {
    //         fileData = fileData.replaceAll(`&{author}&"`, userBean["user_name"] + `"
    // categories: 
    //  - 专栏`) // 未分类专栏
    //     }
    // 添加
    fileData = fileData.replaceAll("&{author}&", userBean["user_name"]) // 作者
        .replaceAll("&{title}&", fileName);
    var findPosition = fileData.indexOf("&{postTotal}&");
    if (findPosition !== -1) { // 存在更新
        fileData = fileData.replaceAll("&{postTotal}&", columnCountMap["postTotal"]); // 所有文章总数
        fileData = initYearTotal(fileData, columnCountMap); // 初始化的年文章数量
    }
    // 添加月的文章总数（这个可以到写入月数据时添加）
    FileUtils.updateArticleFile(filePath, fileData, str, yymm, columnCountMap);
}

// 更新进行一步的公共部分
function updateCommon(startyymm, addData, dirPath, countMap, userBean) {
    var isMkDir = FileUtils.mkdirsSync(dirPath);
    const yy = startyymm.substring(0, 4);
    const yearDirPath = dirPath + yy + "/";
    var isMkYearDir = FileUtils.mkdirsSync(yearDirPath);
    if (!isMkDir || !isMkYearDir) {
        console.log('新建文件夹有误！', "isMkDir：", isMkDir, "isMkYearDir：", isMkYearDir, );
        return;
    }
    updateYYMM(startyymm, addData, yearDirPath, countMap, userBean);
    updateYY(startyymm, addData, yearDirPath, countMap, userBean);
    updateAll(startyymm, addData, dirPath, countMap, userBean);
}

// 更新总的文档（all.md）
function updateAll(startyymm, addData, dirPath, countMap, userBean) { // 更新文档
    // 判断该文档是否存在
    // console.log(dirPath)
    const fileName = "all";
    var filePath = dirPath + fileName + ".md"; // 文件路径 
    var fileData = FileUtils.getFileData(filePath, BASE_DATA.ALL_TEMPLATE_PATH); // 获取文件内容（不存在则获取模板内容）
    // 添加
    fileData = fileData.replaceAll("&{author}&", userBean["user_name"]) // 作者
    var findPosition = fileData.indexOf("&{postTotal}&");
    if (findPosition !== -1) { // 存在更新
        fileData = fileData.replaceAll("&{postTotal}&", countMap["postTotal"]); // 所有文章总数
        fileData = initYearTotal(fileData, countMap); // 初始化的年文章数量
    }
    // 添加月的文章总数（这个可以到写入月数据时添加）
    FileUtils.updateArticleFile(filePath, fileData, addData, startyymm, countMap);
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
        content = FileUtils.updateOptPosition(findTemplatePosition, updateStr, content);
    }
    return content;
}

module.exports = {
    updateArticleMap,
    updateArticleColumnList,
    updateHotArticleColumnList,
}