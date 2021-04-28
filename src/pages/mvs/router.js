// 普通加载路由
// import mvs from './mvs.vue'
// 懒加载路由
const mvs = () => import('./mvs.vue')
export default {
  path: '/mvs',
  name: 'mvs',
  component: mvs,
  children: [
  ]
}