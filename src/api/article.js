/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

// 获取文章列表
export const getArticles =params=>{
  return request({
    method:'GET',
    url:'/mp/v1_0/articles',
    //Body参数使用data设置
    //Query参数使用params设置
    //Headers参数使用headers设置
    params
  })
}

//获取文章频道
export const getArticleChannels=()=>{
  return request({
    method:'GET',
    url:'/mp/v1_0/channels',
  })
}

//删除文章
export const deleteArticle=articleId=>{
  return request({
    method:'DELETE',
    //:target 需要传递路径参数
    url:`/mp/v1_0/articles/${articleId}`
  })
}

//新建文章
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft // 是否存为草稿（true 为草稿）
    },
    data
  })
}

//获取指定文章
export const getArticle=articleId=>{
  return request({
    method:'GET',
    url:`/mp/v1_0/articles/${articleId}`,
  })
}

//更新文章
export const updateArticle=(articleId,data,draft=false)=>{
  return request({
    method:'PUT',
    url:`/mp/v1_0/articles/${articleId}`,
    params:{
      draft
    },
    data
  })
}

/*
*修改文章评论状态
* */
export const updateCommentStatus=(articleId,allowComment)=>{
  return request({
    method:'PUT',
    url:'/mp/v1_0/comments/status',
    params:{
      article_id:articleId
    },
    data:{
      allow_comment:allowComment
    }
  })
}
