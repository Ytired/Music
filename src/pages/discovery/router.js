// 普通加载路由
// import discovery from './discovery.vue'
// 懒加载路由
const discovery = () =>
  import ("./discovery.vue")

export default {
  path: "/discovery",
  name: "discovery",
  component: discovery,
  children: [],
}