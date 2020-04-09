import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '../components/test.vue'
import Login from '../components/login.vue'
import Index from '../components/index.vue'
import Home from '../components/home.vue'
import Cate from '../components/bookCategory/Cate.vue'
import Cate1 from '../components/bookCategory/Cate1.vue'
import Cart from '../components/shoppingCart.vue'
import BookDetail from '../components/bookDetail.vue'
import MyOrder from '../components/order/myOrder.vue'

import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Row,
  Card
} from 'element-ui'

Vue.use(VueRouter)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Col)
Vue.use(Row)
Vue.use(Card)

const routes = [
  { path: '/test', component: Test },
  // 路由重定向，/跳转到登录页面
  { path: '/', redirect: '/login' },
  {
    path: '/login', component: Login
  },
  {
    path: '/index',
    component: Index,
    children: [
      { path: '/index', redirect: '/home' },
      { path: '/home', component: Home },
      { path: '/Category/:categoty_id', component: Cate },
      { path: '/Category1/:categoty_id', component: Cate1 }
    ]
  },
  { path: '/book/:id', component: BookDetail },
  { path: '/cart', component: Cart },
  { path: '/myOrder', component: MyOrder }

]

const router = new VueRouter({
  routes
})
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {

// })

export default router
