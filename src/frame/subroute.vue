<template>
<div class="pub" id="js-pub">
  <pub-header></pub-header>
  <router-view @upup="childsay" :msg="msg"></router-view>
  <pub-footer></pub-footer>
</div>
</template>

<style lang="scss">
  @import "../style/user";
</style>

<script>
  // import { mapState,mapGetters } from 'vuex'
  import pubHeader from '../components/pubHeader'
  import pubFooter from '../components/pubFooter'
  import { getCookie,setCookie,delCookie } from '../common/js/store'
    //表格统计 无效果?
  export default {
    components : { pubHeader,pubFooter },//这里注册
    data() {
      return {
        msg : 'parent-msg',
      }
    },
    computed : {
    },
    created() {
    },
    methods : {
      childsay(msg) {
        this.msg = msg
        console.log('parent-receive',msg)
      }
    }
  }
</script>