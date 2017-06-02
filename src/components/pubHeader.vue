<template>
  <div class="pub-header">
    <span v-if="isLogin">已登录 | {{ name }} <button @click="logout('')">注销</button></span>
    <span v-if="!isLogin">未登录 | <router-link to="/content">前往登陆</router-link></span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  computed : {
    ...mapGetters(['isLogin','name'])
  },
  methods : {
    logout (msg) {
      this.$store.commit('Logout')
    }
  }
}
</script>

<style>

</style>