<template>
  <el-menu class="nav-menu" text-color="#fff" default-active="/" background-color="#002033" >
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-document"></i>
      <span>内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="el-icon-picture-outline"></i>
      <span>素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="el-icon-s-promotion"></i>
      <span>发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="el-icon-chat-square"></i>
      <span>评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="el-icon-setting"></i>
      <span>粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-setting"></i>
      <span>个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default{
    name:'aside',
    data(){
      return{

      }
    }
  }
</script>

<style scoped>
  .nav-menu .iconfont{margin-right: 10px;padding-left: 5px;}
  .el-menu-item.is-active{color: rgb(255, 208, 75);}
</style>
