<template>
<div>
  <h1 class="logo" v-text="headerTitle"></h1>
  <h1 v-text="menus"></h1>
  <div v-text="news"></div>
  <router-link to="/welcome">welcome.html</router-link>
  <router-link to="/content">content.html</router-link>
  <ul class="list">
    <li v-for="item in list" v-text="item.title"></li>
  </ul>
</div>
</template>

<script>
import { mapState } from 'vuex'
// import {savaToLocal} from '../common/js/store';
// import {loadFromlLocal} from '../common/js/store';
export default {
  data() { //组件数据
    return {
      list:[],
      headerTitle: '',
      news:'',
      menus:'',
    }
  },
  created () { // 组件创建完
    // this.get_data()
  },
  mounted() { // 组件加载完
    // setTimeout(() => {
    //localstorge
    //   savaToLocal('index', 'title', 'title')
    //   this.title = loadFromlLocal('index', 'title', '未找到title')
    //store
    // }, 2000)
    // this.$store.state.headerTitle = this.headerTitle
    // this.news = this.$store.state.menus
  },
  computed: { // 实时计算
    ...mapState([ //对象展开运算符,store与局部计算属性混合
      'news','headerTitle','menus'
    ])
    // getTitle () {
    //   return store.state.headerTitle
    // }
  },
  methods: { // 组件方法
    // get_data: function(params) {
    //   var v = this
    //   if (!params) params = {}
      // 我们这里用全局绑定的 $api 方法来获取数据，方便吧~
      // v.$api.get('topics', params, function(r) {
      //   console.log(r)
      //   v.list = r.data
      // })
    // },
  },
}
</script>