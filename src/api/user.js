/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

export const login = data =>{//传参数data
  return request({
    method:'POST',
    url:'/mp/v1_0/authorizations',
    data: data
  })
}

//获取用户信息
export const getUserProfile =()=>{

 //console.log(user)
  return request({
    method:'GET',
    url:'/mp/v1_0/user/profile',
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过 headers 选项设置请求头(身份令牌)
    // headers:{
    //   Authorization:`Bearer ${user.token}`
    // }
  })
}
