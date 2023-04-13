function getMapByString(date) {
    var source = new Date(date);
    var YY = source.getFullYear().toString(); // 年
    var MM = source.getMonth() + 1; // 月
    MM = MM < 10 ? ('0' + MM.toString()) : MM.toString();
    var DD = source.getDate(); // 日
    DD = DD < 10 ? ('0' + DD.toString()) : DD.toString();

    var hour = (source.getHours() < 10 ? '0' + source.getHours() : source.getHours()) + ':'; // 得到小时数
    var minute = (source.getMinutes() < 10 ? '0' + source.getMinutes() : source.getMinutes()) + ':'; // 得到分钟数
    var second = source.getSeconds() < 10 ? '0' + source.getSeconds() : source.getSeconds(); // 得到秒数

    var YMD = YY + '-' + MM + '-' + DD;
    var YYYYMMDD = YY + '' + MM + '' + DD;
    var YYYYMM = YY + '' + MM;
    var YMDHMS = YMD + " " + hour + minute + second;
    var map = {
        YY,
        MM,
        DD,
        YMD,
        YYYYMM,
        YYYYMMDD,
        YMDHMS,
    }
    return map;
}

module.exports = {
    getMapByString,
}