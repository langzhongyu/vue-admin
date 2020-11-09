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


Vue.config.productionTip = false

//全局注册element组件库
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)//渲染视图，挂载el, vue2.0写法
}).$mount('#app')
