import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'//@表示src路径
import Home from '@/views/Home'
import Layout from '@/views/Layout'
import Article from '@/views/article'
import Image from '@/views/Image'
import Publish from '@/views/Publish'
import Comment from '@/views/Comment'
import Fans from '@/views/Fans'
import Settings from '@/views/Settings'

Vue.use(Router)

const routes = [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      children:[
        {
          path:'',
          name:"home",
          component:Home
        },
        {
          path:'/article',
          name:"articleIndex",
          component:Article
        },
        {
          path:'/image',
          name:"imageIndex",
          component:Image
        },
        {
          path:'/publish',
          name:"publish",
          component:Publish
        },
        {
          path:'/comment',
          name:"comment",
          component:Comment
        },
        {
          path:'/fans',
          name:"fans",
          component:Fans
        },
        {
          path:'/settings',
          name:"settings",
          component:Settings
        },
      ]
    },
  ];

const router=new Router({
  routes
})

//路由导航守卫，所有页面导航都会经过此处（拦截页面）
//to:要去的路由信息
//from:来自哪里的路由信息
//next:放行方法
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  //读取本地存储用户信息
  var user=JSON.parse(window.localStorage.getItem('user'));

  if(to.path!='/login'){
    if(user){
      next();
    }else{
      next('login');
    }
  }else{
    //允许通过
    next();
  }

})

export default router;
