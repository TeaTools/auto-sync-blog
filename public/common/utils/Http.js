const axios = require('axios');

// sleep函数，sTime秒请求一次（默认0.2秒）
const sleep = async (sTime) => new Promise(resolve => {
    if (!sTime) {
        sTime = 200;
    } else {
        sTime *= 100; // 0.1秒单位
    }
    setTimeout(resolve, sTime)
});
const post = async (url, data) => {
    return await axios.post(url,
        JSON.stringify(data), {
            "headers": {
                "content-type": "application/json",
            },
        }).then(res => {
        return res;
    }).catch(err => {
        console.log('Post()' + url + '请求错误', err)
    })
}

const get = async (url, params) => {
    return await axios({
            url,
            params,
        })
        .then(res => {
            // console.log('成功', res)
            return res;
        }, err => {
            console.log('Get()' + url + '请求错误', err)
        })
}

module.exports = {
    post,
    get,
    sleep,
}