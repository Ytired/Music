// 普通加载路由
// import result from './result.vue'
// 懒加载路由
const result = () => import('./result.vue')
export default {
  path: '/result',
  name: 'result',
  component: result,
  children: [
  ]
}