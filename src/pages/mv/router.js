// 普通加载路由
// import mv from './mv.vue'
// 懒加载路由
const mv = () =>
  import ('./mv.vue')
export default {
  path: '/mv',
  name: 'mv',
  component: mv,
  children: []
}