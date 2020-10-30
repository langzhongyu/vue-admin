import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'//@表示src路径
import Home from '@/views/Home'
import Layout from '@/views/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/layout',
      name: 'layout',
      component: Layout
    },
  ]
})
