// 普通加载路由
// import playLists from './playLists.vue'
// 懒加载路由
const playLists = () =>
  import ("./playLists.vue")
export default {
  path: "/playlists",
  name: "playLists",
  component: playLists,
  children: [],
}