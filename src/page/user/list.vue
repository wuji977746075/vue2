<template>
<div>
  <el-table
    v-loading="loading"
    element-loading-text="拼命加载中"
    ref="multipleTable"
    :data="tableData"
    stripe
    :height = "440"
    empty-text="暂无数据"
    show-summary
    style="width: 100%"
    tooltip-effect="dark"
    @selection-change="handleSelectionChange">
    <!-- :summary-method="getSum" -->
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="id"
      label="ID"
      sortable
      width="80">
    </el-table-column>
    <el-table-column
      prop="contactname"
      label="姓名"
      width="120">
      <template scope="scope">
        <el-tag>{{ scope.row.contactname }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="detailinfo"
      label="地址">
    <!-- :formatter="formatter" -->
      <template scope="scope">
        <el-input
          placeholder="请输入地址"
          v-model="scope.row.detailinfo"
          :disabled="!scope.row.edit">
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="uid"
      label="UID">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="手机号码">
    </el-table-column>
    <el-table-column
      label="操作"
      show-overflow-tooltip>
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">{{ scope.row.edit ? '保存':'编辑' }}</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <br />
  <el-pagination
   layout="total,prev, pager, next,jumper"
   :current-page="cur_page"
   @current-change='handlePager'
   @size-change="handleSizeChange"
   :page-sizes="[10, 20, 50]"
   :page-size="per_page"
   :total="total">
  </el-pagination>
  <!--el-button
   size="small"
   type="primary"
   @click="handlePage(-1)"
   :disabled="!hasPrev"
   icon="arrow-left">上一页</el-button>
  <el-button
   size="small"
   type="primary"
   @click="handlePage(1)"
   :disabled="!hasNext">下一页<i class="el-icon-arrow-right el-icon--right"></el-button-->
</div>
</template>

<style>
 .el-tag:empty{
    display:none;
 }
</style>

<script>

  var qs = require('qs')
  // import { mapState,mapGetters } from 'vuex'
  import { formatDate } from '../../common/js/date'

  //表格统计 无效果?
  export default {
    data() {
      return {
        tableData: [],
        cur_page : 0, //当前页,init:0
        per_page : 10,//每页大小,init:10
        page  : 1,    //前往的页码,init:1
        total : 0,
        loading : true,
        multipleSelection: [],
      }
    },
    computed : { //不应该使用箭头函数来定义计算属性函数
      hasPrev : function() {
        return this.cur_page > 1
      },
      hasNext : function(){
        return this.cur_page < this.pages
      },
      pages : function() {
        return Math.max(Math.ceil(this.total/this.per_page),1)
      },
    },
    // props: ['loginInfo'],
    mounted() {
      // console.log(this.loginInfo)
      this.getData();
    },
    created() {
    },
    methods: {
      getData() {
        var v = this;
        v.page = Math.min(Math.max(v.page,1),v.pages);
        var api_url = v.api_url+'api.php?type=list&p='+v.page+'&s='+v.per_page;
        console.log('created : rsq : '+api_url);
        if(v.page != v.cur_page){
          v.loading = true;
          v.tableData = [];
          //ajax get page data
          v.$http.get(api_url).then((rsp) => {
            v.cur_page = v.page;
            var data = rsp.data;
            // console.log('ajax-list : ',data);
            if(data.state){
              v.total = Math.max(data.info.count,0);
              data = data.info.list;
              data.forEach (function(item,index) {
                // item.date = formatDate(1495678900,'yyyy-MM-dd');
                item.edit = false;
              });
              v.tableData = data;
              v.loading = false;
            }else{
              v.$message.error(data.info);
            }
          }).catch((err) => {
            v.$message.error(err);
          });
        }
      },
      handleSizeChange(size) {
        console.log(size);
        this.per_page = size;
        this.getData();
      },
      logout() {
        console.log('logout')
        this.$emit('upup','hehe')
      },
      handlePager(page) {
        this.page = page;
        this.getData();
      },
      handlePage(plus) { //分页
        if(plus === -1){
          this.page --;
          this.getData();
        }else if(plus === 1){
          this.page ++;
          this.getData();
        }else{
          this.$message.error('非法操作');
        }
      },
      handleEdit(index, row) { //编辑 和 保存
        var v = this;
        if(row.edit){ //保存
          row.edit = !row.edit;
          // ajax-post edit
          var api_url = v.api_url+'api.php?type=edit';
          var formData = qs.stringify(row);
          v.$http.post(api_url,formData).then((rsp) => {
            var data = rsp.data;
            // console.log('ajax-eidt : ',data);
            v.$message.success(data.info);
            // if(data.state){
            //   //重新加载数据
            //   v.getData(this.page);
            // }
          }).catch((err) => {
            v.$message.error(err);
          });
        }else{
          row.edit = !row.edit;
        }
      },
      handleDelete(index, row) { //删除
        var id = row.id;
        // ajax del
      },
      handleClick() {
        console.log('click');
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(rows) {
        this.multipleSelection = rows;
        var ids = [];
        if(rows){
          rows.forEach(row => {
            ids.push(row.id);
          });
        }
        console.log('ids',ids);
      },
      formatter(row, column) {
        // console.log(row,column);
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      }
    }
  }
</script>