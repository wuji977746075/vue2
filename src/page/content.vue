<!-- 本地记事本 -->
<template>
<div>
  <div class="" v-bind:class="color" ref="theme">

    <header> 记事本 </header>

    <textarea v-model="logText"></textarea>
    <el-button v-on:click="log">记录</el-button>

    <el-input-number name="uid" v-model="uid" @change="changeMes" :min="0" :max="100">
    </el-input-number>
    <el-button type="primary" v-on:click="showBox">切换主题</el-button>

  </div>
  <div v-bind:class="{ hide:isHide }">
    <div class='color_box id_cyan' v-on:click="changeBg(cyan)">cyan</div>
    <div class='color_box id_pink' v-on:click="changeBg(pink)">pink</div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex' //vuex store
export default {
  data () {
    return {
      uid : this.$store.state.uid,
      color : 'cyan',
      isHide : true,
      logText : '',
    }
  },
  created (){
    // console.log(this.$store);
  },
  mounted () {
    // console.log(this);
    // this.uid = ;
  },
  computed:{
    // uid : function (){ //get
    //   return mapState.getUid;
    // },
  },
  methods:{
    changeMes:function(value){
      console.log(value);
      this.$store.commit('UPDATE_UID',value);
      // this.uid = parseInt(e.target.value)
      // this.$store.commit('UPDATE_UID',this.uid);
      // this.$store.state.headerTitle = this.uid
      // console.log(this.uid);
    },
    showBox : function(e){
      this.isHide = !this.isHide
    },
    changeBg:function(e){
      // console.log(e);
      this.color = this.color=='pink' ? 'cyan' : 'pink'
      // var div = this.$refs.theme
      // div = div.getAttribute('class')
      // console.log('class : ',div)
    },
    log:function(e){
      var t = this.logText
      if(!t){
        alert('need something')
      }else{
        console.log('log',t)
      }
    }
  }
}
</script>

<style>
.hide { display:none; }
header{ text-align: center;font-size: 25px;height: 40px;line-height: 40px;color:white; }
.cyan header{  background: #26b6be; }
.pink header{  background: #d77672; }
.color_box { width: 50px;height: 50px;color:white;display: inline-block; }
.id_cyan { background: #26b6be; }
.id_pink { background: #d77672; }
</style>
