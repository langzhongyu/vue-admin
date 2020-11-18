<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
       <div class="item-top">
         <el-radio-group v-model="radio1" size="mini">
           <el-radio-button label="全部"></el-radio-button>
           <el-radio-button label="收藏"></el-radio-button>
         </el-radio-group>
        <el-button type="text" @click="centerDialogVisible = true">点击打开 Dialog</el-button>

        <el-dialog
          title="提示"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <span>需要注意的是内容是默认不居中的</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
       </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default{
    name:"imageIndex",
    data(){
      return {
        radio1: '全部',
        centerDialogVisible: false
      }
    },
  }
</script>

<style scoped>
  .item-top{display: flex;width: 100%;justify-content: space-between;}
</style>
