// 引用vue
import Vue from 'vue'
// 引用router
import VueRouter from 'vue-router'
// use router
Vue.use(VueRouter)
// 入口文件为 src/App.vue 文件 所以要引用
import App from './App'

import store from './vuex/store'
// import {loadFromlLocal} from './common/js/store';  // 公共方法：本地缓存

// import VueLazyload from 'vue-lazyload';  // 引入图片懒加载模块
// error，loading是图片路径, 用require引入
// Vue.use(VueLazyload, {
//     error: require('./assets/404.png'),
//     loading: require('./assets/loading.gif'),
//     attempt: 1
//   }
// );

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

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
  store,
  router,
  el: '#app',
  render : (h) => h(App)
})