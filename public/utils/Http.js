const axios = require('axios');

const juejinPost = async (url, data, limit) => { // limit 是指页的大小，专栏和个人文章接口的参数不一样
    var articleList = []; // 记录文章列表
    var i = 0;
    var isOver = false;
    while (!isOver) {
        data.cursor = String(i * limit); // 专栏参数不需要*10，个人文章的参数需要*10
        console.log(data);
        var res = await post(url, data);
        // console.log(res.data);
        if (0 != res.data.err_no || !res.data.data || res.data.data.length == 0) {
            console.log("已经获取全部数据 或 数据有误！");
            break;
        }
        var artList = res.data.data;
        // console.log("artList.length：", artList.length);
        articleList = articleList.concat(artList);
        console.log("articleList.length：" + articleList.length);
        i++;
        await sleep();
    }
    return articleList;
}

// 不能给掘金太大压力，我们定义个sleep函数，0.2秒请求一次就好
const sleep = async () => new Promise(resolve => setTimeout(resolve, 200));

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
            return res
        }, err => {
            console.log('Get()' + url + '请求错误', err)
        })
}

module.exports = {
    juejinPost,
    post,
    get,
}
