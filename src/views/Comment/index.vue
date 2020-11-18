<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        :data="articles"
        v-loading="loading">
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数">
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          prop="comment_status"
          label="评论状态">
          <template slot-scope="scope">
            {{scope.row.comment_status==true?"正常":"关闭"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作">
          <el-switch
            slot-scope="scope"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="scope.row.statusDisabled"
            @change="chang_status(scope.row)">
          </el-switch>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="margin-top:20px;"
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="changePage"
        :current-page.sync="page"
        :disabled="loading">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {getArticles,updateCommentStatus} from '@/api/article'
  export default{
    name:"comment",
    data(){
      return {
        articles:[],//评论数据列表
        totalCount:0,
        page:1,
        pageSize:10,
        loading:false,
        loadingPage:false
      }
    },
    created(){
      this.loadArticles(1)
    },
    methods:{
      loadArticles(page=1){
          this.loading=true
          getArticles({
            response_type:'comment',
            page,
            per_page:this.pageSize,
          }).then(res=>{
            const {total_count,results}=res.data.data
            results.forEach(article=>{
              article.statusDisabled = false
            })
            this.articles=results;
            this.totalCount=total_count;
            this.loading=false
            //console.log(JSON.stringify(res.data.data))
          }).catch(()=>{
            this.$message({
              type: 'info',
              message: '获取数据失败！'
            });
          })
      },
      chang_status(article){
        //console.log(JSON.stringify(article))
        this.loadingPage=true
        updateCommentStatus(article.id.toString(),article.comment_status).then(res=>{
          article.statusDisabled = false
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '评论状态修改失败！'
          });
        })
      },
      changePage(page){
        this.loadArticles(page)
      }
    }
  }
</script>

<style scoped>

</style>
