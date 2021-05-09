import axios from "axios"
//导入进度条插件
import NProgress from "nprogress"

//创建axios的实例
const instance = axios.create({
  baseURL: "https://autumnfish.cn",
  timeout: 3000,
})

// axios的拦截器
//请求拦截
instance.interceptors.request.use(
  config => {
    // 进度条开始
    NProgress.start()
    return config
  },
  err => {
    console.log(err)
  }
)

//响应拦截
instance.interceptors.response.use(
  res => {
    // 进度条结束
    NProgress.done()
    return res.data
  },
  err => {
    console.log(err)
  }
)

//bannar图片
export function getBanner(params) {
  return instance.get("/banner", {
    params,
  })
}

//getNewmusic获取最新音乐
export function getNewmusic(params) {
  return instance.get("/top/song/", {
    params,
  })
}

// playMusic 博放音乐
export function playMusic(params) {
  return instance.get("/song/url", {
    params,
  })
}

// 最新MV
export function getMvs(params) {
  return instance.get("/mv/all", {
    params,
  })
}

// 搜索歌曲
export function searchMusic(params) {
  return instance.get("/search", {
    params,
  })
}

//歌单详情
export function songListDetails(params) {
  return instance.get("/playlist/detail", {
    params,
  })
}

// 歌单评论
export function getTopComments(params) {
  return instance.get("/comment/playlist", {
    params,
  })
}

//MV
export function getMv(params) {
  return instance.get("/mv/url", {
    params,
  })
}

// 相关mv
export function getRelevantMvs(params) {
  return instance.get("/simi/mv", {
    params,
  })
}

// mv信息
export function getmvDetails(params) {
  return instance.get("/mv/detail", {
    params,
  })
}

// 获取歌手头像
export function getArtistIcon(params) {
  return instance.get("/artists", {
    params,
  })
}

// 获取mv评论
export function getMvComments(params) {
  return instance.get("/comment/mv", {
    params,
  })
}
