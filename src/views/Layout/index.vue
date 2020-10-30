<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="200px">
      <asideIndex></asideIndex>
    </el-aside>
    <el-container>
      <el-header class="header">Header</el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
  import asideIndex from './components/aside'
  export default{
    name:'layout',
    data(){
      return {

      }
    },
    components:{
      asideIndex
    }
  }
</script>

<style scoped>
.layout-container{position: fixed;left: 0;top: 0;right: 0;bottom: 0;}
.layout-container .aside{background:#002033;width: 200px;}
.layout-container .header{background: #fff;}
.layout-container .main{background: #e9eef3;}
</style>
