import Vue from "vue"
import VueRouter from "vue-router"
// 路由懒加载
const discovery = () => import("pages/discovery/discovery.vue")
const playLists = () => import("pages/playLists/playLists.vue")
const playList = () => import("pages/playList/playList.vue")
const songs = () => import("pages/songs/songs.vue")
const mvs = () => import("pages/mvs/mvs.vue")
const mv = () => import("pages/mv/mv.vue")
const result = () => import("pages/result/result.vue")

// 1.安装VueRouter
Vue.use(VueRouter)
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

// 2.获取路由信息
const routes = [
  { path: "/", redirect: "/discovery" },
  { path: "/discovery", component: discovery },
  { path: "/playLists", component: playLists },
  { path: "/playList", component: playList },
  { path: "/songs", component: songs },
  { path: "/mvs", component: mvs },
  { path: "/mv", component: mv },
  { path: "/result", component: result },
]
// 3.创建路由对象
const router = new VueRouter({
  mode: "history",
  routes,
})
// 4.导出
export default router
