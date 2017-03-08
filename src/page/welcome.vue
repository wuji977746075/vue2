<template>
<div>sds
  <h1 class="logo">welcome.html</h1>
  <ul class="list">
    <li v-for="item in lists" v-text="item.title"></li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      lists:[]
    }
  },
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.get_data()
  },
  methods: {
    get_data: function(params) {
      console.log('===',params)
      var v = this
      if (!params) params = {}
      // 我们这里用全局绑定的 $api 方法来获取数据，方便吧~
      // request('GET', '/search').end(function(res,rsp){
      //   console.log('===',rsp)
      // });
    },
  },
}
</script>