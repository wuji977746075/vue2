<style>
.hide { display:none; }
header{ text-align: center;font-size: 25px;height: 40px;line-height: 40px;color:white; }
.cyan header{  background: #26b6be; }
.pink header{  background: #d77672; }
.color_box { width: 50px;height: 50px;color:white;display: inline-block; }
.id_cyan { background: #26b6be; }
.id_pink { background: #d77672; }
</style>
<!-- 本地记事本 -->
<template>
<div>
  <div class="" v-bind:class="color" ref="theme">

    <header> 记事本 </header>

    <textarea v-model="logText"></textarea><el-button v-on:click="log">提交</el-button>
    <br />

    <el-input-number name="uid" v-model="uid" @change="changeMes" :min="0" :max="100">
    </el-input-number> <br />
    <el-button type="primary" v-on:click="showBox">切换主题</el-button>

  </div>
  <div v-bind:class="{ hide:isHide }">
    <div class='color_box id_cyan' v-on:click="changeBg(cyan)">cyan</div>
    <div class='color_box id_pink' v-on:click="changeBg(pink)">pink</div>
  </div>

  <!-- 表单及提交及验证测试 -->
  <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="120px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="5">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="5">
          <el-form-item prop="date2">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
  </el-form>

</div>
</template>

<script>
import { mapState } from 'vuex' //vuex store
export default {
  data() {
    return {
      uid: this.$store.state.uid,
      color: 'cyan',
      isHide: true,
      logText: '',
      ruleForm: {
        name: '',
        date1: '',
        date2: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
      }
    }
  },
  created() {
    // console.log(this.$store);
  },
  mounted() {
    // console.log(this);
    // this.uid = ;
  },
  computed: {
    // uid() { //get
    //   return mapState.getUid;
    // },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // this.$message('validing...');
        this.$notify.info({
          title: '成功',
          message: '验证中...',
          offset: 100
        });
        if (valid) {
          // console.log(this.ruleForm);
          // var formData = JSON.stringify(this.ruleForm);
          var formData = this.ruleForm;
          console.log(formData);
          var v = this;
          this.$http.post(this.api_url+'form.php?id=5', formData,{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          .then((rsp) => {
            console.log(rsp);
            v.$message('ajax-success');
          })
          .catch((err) => {
            console.log(err);
            v.$message('ajax-error');
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeMes(v) {
      console.log(v);
      this.$store.commit('UPDATE_UID',v);
      // this.uid = parseInt(e.target.value)
      // this.$store.commit('UPDATE_UID',this.uid);
      // this.$store.state.headerTitle = this.uid
      // console.log(this.uid);
    },
    showBox(e) {
      this.isHide = !this.isHide
    },
    changeBg(e) {
      // console.log(e);
      this.color = this.color=='pink' ? 'cyan' : 'pink'
      // var div = this.$refs.theme
      // div = div.getAttribute('class')
      // console.log('class : ',div)
    },
    log(e) {
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