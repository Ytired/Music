// 普通加载路由
// import playList from './playList.vue'
// 懒加载路由
const playList = () => import('./playList.vue')
export default {
  path: '/playlist',
  name: 'playList',
  component: playList,
  children: [
  ]
}