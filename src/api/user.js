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
