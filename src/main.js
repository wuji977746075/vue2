// 引用vue
import Vue from 'vue'
// 引用router
import VueRouter from 'vue-router'
// use router
Vue.use(VueRouter)
// 入口文件为 src/App.vue 文件 所以要引用
import App from './App'
// 引用router config
import routes from './config/routes'
// use router config
const router = new VueRouter({
  routes
})
// 引用API文件
import api from './config/api'
// 将API方法绑定到全局
Vue.prototype.$api = api

// run
new Vue({
  router,
  el: '#app',
  render : (h) => h(App)
})