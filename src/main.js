// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入element-ui插件以及样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

//引入全局样式
import './styles/index.css'

//基于axios封装的请求模块
import axios from 'axios'

// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 请求的基础路径
})

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

Vue.config.productionTip = false

//全局注册element组件库
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)//渲染视图，挂载el, vue2.0写法
})
