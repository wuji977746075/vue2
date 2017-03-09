<template>
<div>
  <h1 class="logo" v-text="title"></h1>
  <h1 class="logos" v-text="tit"></h1>
  <router-link to="/welcome">welcome.html</router-link>
  <router-link to="/content">content.html</router-link>
  <ul class="list">
    <li v-for="item in list" v-text="item.title"></li>
  </ul>
</div>
</template>


<script>
// import {savaToLocal} from '../common/js/store';
// import {loadFromlLocal} from '../common/js/store';
export default {
  data() { //组件数据
    return {
      list:[],
      title: 'cnsodejs Api Test',
      tit:'state check',
    }
  },
  created () { // 组件创建完
    // this.get_data()
  },
  mounted() { // 组件加载完
    setTimeout(() => {
    //   //localstorge
    //   savaToLocal('index', 'title', 'title')
    //   this.title = loadFromlLocal('index', 'title', '未找到title')
    //store
    this.tit = this.$store.state.headerTitle
    this.$store.state.headerTitle = this.title
    }, 2000)
  },
  computed: { // 实时计算
    // ...mapState([
    //   'headerTitle', 'menuShow'
    // ])
    // getTitle () {
    //   return store.state.headerTitle
    // }
  },
  methods: { // 组件方法
    get_data: function(params) {
      var v = this
      if (!params) params = {}
      // 我们这里用全局绑定的 $api 方法来获取数据，方便吧~
      // v.$api.get('topics', params, function(r) {
      //   console.log(r)
      //   v.list = r.data
      // })
    },
  },
}
</script>