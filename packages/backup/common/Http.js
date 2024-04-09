import axios from "axios";

// sleep函数，sTime秒请求一次（默认0.2秒）
export const sleep = async (sTime = 200) => {
  return new Promise((resolve) => {
    setTimeout(resolve, sTime);
  });
};

export const post = async (url, data) => {
  return await axios
    .post(url, JSON.stringify(data), {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("Post()" + url + "请求错误", err);
    });
};

export const get = async (url, params) => {
  return await axios({
    url,
    params,
  }).then(
    (res) => {
      // console.log('成功', res)
      return res;
    },
    (err) => {
      console.log("Get()" + url + "请求错误", err);
    },
  );
};
