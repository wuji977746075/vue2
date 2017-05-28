<template>
<div>
  <div>
    <span v-if="isLogin">已登录 | {{ username }} <button @click="logout">注销</button></span>
    <span v-if="!isLogin">未登录 | <router-link to="/content">前往登陆</router-link></span>
  </div>
  <router-view :login-info="login_info"></router-view>
  <div>--- footer --- </div>
</div>
</template>

<script>

  import { mapState } from 'vuex'
  import { getCookie } from '../common/js/store'
  import { setCookie } from '../common/js/store'
  import { delCookie } from '../common/js/store'
    //表格统计 无效果?
  export default {
    data() {
      return {
        login_info  : null
      }
    },
    computed : {
      isLogin : function() {
        return Boolean(this.login_info)
      },
      username : function() {
        return this.login_info ? this.login_info.name : '';
      }
    },
    created() {
      this.login_info = getCookie('login_info')
    },
    methods : {
      logout() {
        delCookie('login_info')
        this.login_info = null
      }
    }
  }
</script>