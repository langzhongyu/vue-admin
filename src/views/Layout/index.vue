<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto" v-model="isCollapse">
      <asideIndex :is-collapse="isCollapse"></asideIndex>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="header-container">
          <div style="display: flex;">
            <i class="icon" :class="{'el-icon-s-unfold':isCollapse,'el-icon-s-fold':!isCollapse}" @click="isCollapse=!isCollapse"></i>
            <span>个人博客中心</span>
          </div>
          <el-dropdown>
            <div class="picture">
              <img class="photoImg" :src="user.photo" alt="">
              <span class="text">{{user.name}}</span>
              <i class="el-icon-arrow-down"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <!-- 组件默认不识别原生组件，需要内部处理 -->
              <!-- 在一个组件的根元素上直接监听一个原生事件 -->
              <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main">

        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import asideIndex from './components/aside'
  import {getUserProfile} from '@/api/user.js'
  import globalBus from '@/utils/global-bus'
  export default{
    name:'layout',
    data(){
      return {
        isCollapse:false,
        user:{}
      }
    },
    created(){
      //组件初始化，请求获取用户资料
      this.loadUserProfile()
      //注册通信事件
      globalBus.$on('update-user',(data)=>{
          this.user.name=data.name;
          this.user.photo=data.photo;
      })
    },
    methods:{
      //除了登录接口，其他所有接口都需要授权才能使用（需提供身份令牌token才能获取数据）
      loadUserProfile () {
        getUserProfile().then(res => {
          this.user=res.data.data;
          //console.log(JSON.stringify(this.user))
        })
      },
      onLogout(){
        window.localStorage.removeItem('user');
        this.$confirm('确定退出吗?', '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/login');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });

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
.header-container{display: flex;justify-content: space-between; align-items: center;height: 60px;letter-spacing: 2px;}
.header-container .icon{font-size: 22px;}
.header-container .picture{float: right;display: flex;align-items: center;}
.header-container .photoImg{border-radius: 50%;width: 30px;height: 30px;}
.header-container .picture .text{margin:0 4px 0 8px;}

</style>
