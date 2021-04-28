import axios from "axios"
//导入进度条插件
import NProgress from "nprogress"

export function request(config) {
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
    //发送网络请求
  return instance(config)
}

//bannar图片
export function getBanner() {
  return request({
    url: "/banner",
    methods: "get",
    params: {},
  })
}