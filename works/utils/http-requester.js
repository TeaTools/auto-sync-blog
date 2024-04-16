import axios from "axios"

export function sleep(second = 3000, data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), second)
  })
}

export const get = async (url, params) => {
  try {
    return await axios.get(url, { params })
  } catch (e) {
    console.log("Get " + url + " 请求异常", e)
  }
}

export const post = async (url, data) => {
  try {
    return await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (e) {
    console.log("Get " + url + " 请求异常", e)
  }
}
