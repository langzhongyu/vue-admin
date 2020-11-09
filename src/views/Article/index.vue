<template>
  <div class="article-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 内容管理 -->
      <el-form ref="form" :model="form" label-width="80px" class="main-cont" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option :label="channel.name" :value="channel.id" v-for="(channel,index) in channels" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
                v-model="rangeDate"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-ddd">
              </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="loading" type="primary" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到 {{totalCount}} 条结果：</span>
      </div>
      <el-table
          :data="articles"
          style="width: 100%"
          size="small"
          v-loading="loading">
          <el-table-column
            prop="cover"
            label="封面">
            <template slot-scope="scope">
              <img v-if="scope.row.cover.type===0" src="./pic_bg.png" alt="" class="article-img">
              <img v-else :src="scope.row.cover.images[0]" alt="" class="article-img">
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="发布时间">
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作">
            <template slot-scope="scope">
                    <el-button
                      circle
                      class="el-icon-edit"
                      type="primary"
                      size="mini"
					            @click="$router.push('/publish?id='+scope.row.id)"></el-button>
                    <el-button
                      size="mini"
                      circle
                      class="el-icon-delete"
                      type="danger"
                      @click="onDeleteArticle(scope.row.id)"></el-button>
                  </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount" class="pagin"
          @current-change="onCurrentChange"
          :page-size="pageSize"
          :disabled="loading"
          :current-page.sync="page">
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import {getArticles,getArticleChannels,deleteArticle} from '@/api/article'
  export default{
    name:"articleIndex",
    data(){
      return {
        form: {
          name: '',
          region: '',
          value1: '',
          delivery: false,
        },
        articles:[],
        articleStatus: [
          { status: 0, text: '草稿', type: 'info' }, // 0
          { status: 1, text: '待审核', type: '' }, // 1
          { status: 2, text: '审核通过', type: 'success' }, // 2
          { status: 3, text: '审核失败', type: 'warning' }, // 3
          { status: 4, text: '已删除', type: 'danger' } // 4
        ],
        totalCount:0,//数据列表总数
        loading:false,
        pageSize:10,
        status:null,//文章状态
        channels:[],//文章频道列表
        channelId:null,
        rangeDate:null,//筛选的活动日期
        page:1,//当前页码
      }
    },
    created(){
      this.loadArticles(1)
      this.loadChannels()
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      loadArticles(page){
        this.loading=true;
        getArticles({
          page,
          per_page:this.pageSize,
          status:this.status,
          channel_id:this.channelId,
          begin_pubDate:this.rangeDate ? this.rangeDate[0]:null,
          end_pubDate:this.rangeDate ? this.rangeDate[1]:null
        }).then(res=>{
          const {results,total_count} =res.data.data;
          this.articles=results;
          this.totalCount=total_count;
          //console.log(JSON.stringify(res.data.data))
          this.loading=false;
        })
      },
      onCurrentChange(page){
        this.loadArticles(page)
      },
      loadChannels(){
        getArticleChannels().then(res=>{
          this.channels=res.data.data.channels;
          //console.log(JSON.stringify(res.data.data.channels))
        })
      },
      onDeleteArticle(ArticleId){
        console.log(ArticleId)
        console.log(ArticleId.toString())
        this.$confirm('确定删除吗?', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteArticle(ArticleId.toString()).then(res=>{
            //console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.loadArticles(this.page);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
  }
</script>

<style scoped>
.article-container .main-cont{margin-top:20px;}
.box-card{margin-bottom:30px;}
.pagin{margin:20px 0 0 20px;}
.article-img{width:60px;background-size:cover;}
</style>
