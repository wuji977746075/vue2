<template>
<div>
  <h1 class="logo" v-text="headerTitle"></h1>
  <div v-text="news"></div>
  <input v-bind:value="message" v-on:input="changeMes" placeholder="edit me" debounce="500">
  <p>Message is: {{ message }}</p>
  <router-link to="/welcome">welcome.html</router-link>
  <router-link to="/content">content.html</router-link>
  <ul class="list">
    <li v-for="item in list" v-text="item.title"></li>
  </ul>
</div>
</template>

<script>
import { mapState } from 'vuex' //vuex store
import { savaToLocal } from '../common/js/store'; //set localStorage
import { loadFromlLocal } from '../common/js/store'; //get localStorage
export default {
  data () {
    return { //组件数据
      list:[],
      headerTitle: '',
      news:'',
      menus:'',
      message:'',
    }
  },
  // props: ['father_message'],
  created () { // 组件创建
    this.get_data()
  },
  mounted () { // 组件加载
    console.log(this);
    this.headerTitle = this.$store.state.headerTitle
    this.news  = this.$store.state.news
    this.menus = this.$store.state.menus
    // setTimeout(() => {
    // localstorge
    // savaToLocal('index', 'title', 'title')
    this.message = loadFromlLocal('index', 'message', 'init-message')
    // }, 2000)
  },
  computed : { // 附加计算属性
    ac : function (){ //get
      return this.news + this.headerTitle.split('').reverse().join('')
    },
    bc : { //get and set
      get : function (){
        return this.news + ' by get';
      },
      set : function (){
        this.news = this.news + ' by set';
      }
    }
  },
  methods: { // 组件方法
    changeMes : function (e){ //input(立即) change(失焦)
      // console.log(e);
      this.message = e.target.value
      savaToLocal('index', 'message', this.message)
    },
    get_data: function(params) {
      var v = this
      if (!params) params = {}
      // 我们这里用全局绑定的 $api 方法来获取数据，方便吧~
      v.$api.get('topics', params, function(r) {
        console.log(r)
        v.list = r.data
      })
    },
  },
}
</script>