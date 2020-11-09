/**基于axios封装请求模块**/

import axios from 'axios'
//引入json-bigint
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  //处理后端返回的原原始数据
  transformResponse:[function(data){
    // console.log(data);
    try {//捕获异常
      //防止后端返回数据不是标准JSON数据
      return JSONbig.parse(data)
    } catch (err) {
      console.log("转换失败！",err)
      return data
    }
  }]
})

//请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 给所有需要身份认证的请求设置token
      const user=JSON.parse(window.localStorage.getItem('user'));
      if(user){
        config.headers.Authorization=`Bearer ${user.token}`
      }
      return config;

  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么

    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default request
