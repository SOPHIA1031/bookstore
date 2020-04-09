// 项目入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'

Vue.prototype.$http = axios
// 配置请求的根路径
axios.defaults.baseURL = 'http://yrzhao.club:8000/api/bookstore/'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
