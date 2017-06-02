<template>
  <div>
    <div>user info page</div>
    <router-link to="/user">user/index</router-link>
    <router-link to="/user/love">user/love</router-link>
    <span>{{msg}}</span>
    <input v-bind:value="msg" @change="changeMes"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props : ['msg'],
    methods :{
      changeMes (v) {
        var s = v.target.value
        console.log('child-send',s)
        this.$emit('upup',s)
      }
    }
  }
</script>