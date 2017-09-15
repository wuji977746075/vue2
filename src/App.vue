<template>
  <div class="app">
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in"
      >
    </router-view>
  </div>
</template>

<script>
export default {
  components: {}
}
// var app = document.getElementById('js-app');
// app.style.height = document.body.scrollHeight+'px';
</script>

<style lang="scss">
  @import "./style/common";
</style>