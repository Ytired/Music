// 普通加载路由
// import songs from './songs.vue'
// 懒加载路由
const songs = () => import("./songs.vue")
export default {
  path: "/songs",
  name: "songs",
  component: songs,
  children: [],
}
