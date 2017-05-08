<template>
<div>

  <el-table
    ref="multipleTable"
    :data="tableData"
    stripe
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
      label="日期"
      width="150">
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
      <template scope="scope">
        <!--el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper"-->
            <el-tag>{{ scope.row.name }}</el-tag>
          <!--/div>
        </el-popover-->
      </template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    <!-- :formatter="formatter" -->
      <template scope="scope">
        <el-input
          placeholder="请输入地址"
          v-model="scope.row.address"
          :disabled="!scope.row.edit">
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="tag"
      label="标签"
      width="100"
      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template scope="scope">
        <el-tag
          hit
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          close-transition>{{ scope.row.tag }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="amount3"
      label="数值 3（元）">
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

  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>

</div>
</template>

<script>
 import { formatDate } from '../../common/js/date';
 //表格统计 无效果?
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: []
      }
    },
    created() {
      //ajax get page data
      var data = [
        { id:"1",tag:'家' }
        ,{ id:"2",tag:'公司' }
        ,{ id:"3",tag:'家' }
        ,{ id:"4",tag:'家' }
      ];
      data.forEach (function(item,index) {
        item.name = '王小虎';
        item.date = formatDate(1495678900,'yyyy-MM-dd');
        item.address = '上海市普陀区金沙江路 1518 弄';
        item.edit = false;
      });
      this.tableData = data;
    },
    methods: {
      handleEdit(index, row) {
        // console.log(index, row);
        var id = row.id;
        row.edit = !row.edit;
        if(row.edit){ //保存
          // ajax-post edit

        }
      },
      handleDelete(index, row) {
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
      },
      getSum(param) { //bug 无反应
        // console.log('param',param);
        return ['总价','15','N/a','','','','',''];
        // const { columns, data } = param;
        // const sums = [];
        // columns.forEach((column, index) => {
        //   if (index === 0) {
        //     sums[index] = '总价';
        //     return;
        //   }
        //   const values = data.map(item => Number(item[column.property]));
        //   if (!values.every(value => isNaN(value))) {
        //     sums[index] = values.reduce((prev, curr) => {
        //       const value = Number(curr);
        //       if (!isNaN(value)) {
        //         return prev + curr;
        //       } else {
        //         return prev;
        //       }
        //     }, 0);
        //     sums[index] += ' 元';
        //   } else {
        //     sums[index] = 'N/A';
        //   }
        // });
        // return sums;
      }
    }
  }
</script>