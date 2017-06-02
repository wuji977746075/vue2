<template>
<div>

  <span v-if="isLogin">已登录 | {{ name }}</span>
  <span v-if="!isLogin">未登录 | <router-link to="/content">前往登陆</router-link></span>

  <h1 class="logo" v-text="headerTitle"></h1>
  <div v-text="news"></div>
  <input v-bind:value="message" v-on:input="changeMes" placeholder="edit me" debounce="500">
  <p>Message is: {{ message }}</p>
  <router-link to="/welcome">welcome.html</router-link>
  <router-link to="/content">content.html</router-link>
  <ul class="list">
    <li v-for="item in flist" v-text="item.title"></li>
  </ul>
</div>
</template>

<script>
import { mapState,mapGetters } from 'vuex' //vuex store
import { savaToLocal,loadFromlLocal } from '../common/js/store' //handel localStorage
export default {
  data () {
    return { //组件数据
      list: [],
      message: '',
    }
  },
  // props: ['father_message'],
  created() { // 组件创建
    this.get_data()
  },
  mounted() { // 组件加载
    console.log(this)
    // setTimeout(() => {
    // localstorge
    // savaToLocal('index', 'title', 'title')
    this.message = loadFromlLocal('index', 'message', 'init-message')
    // }, 2000)
  },
  computed: {
    flist : function () {
      return this.list.filter(function(item,index){
        // console.log(item,index)
        return index < 5
      });
    },
    ac () { //get
      return this.news + this.headerTitle.split('').reverse().join('')
    },
    bc: { //get and set
      get() {
        return this.news + ' by get'
      },
      set() {
        this.news = this.news + ' by set'
      }
    },
    ...mapState([
      'headerTitle','news','menus'
    ]),
    ...mapGetters([
      'UID','isLogin','name'
    ]),
  },
  methods: { // 组件方法
    changeMes(e) { //input(立即) change(失焦)
      // console.log(e);
      this.message = e.target.value
      savaToLocal('index', 'message', this.message)
    },
    get_data(params) {
      var v = this
      if (!params) params = {}
      // 我们这里用全局绑定的 $api 方法来获取数据，方便吧~
      v.$api.get('topics', params, function(r) {
        console.log(r)
        v.list = r.data
      })
    }
  },
}
</script>