<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form :model="article" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="name">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="desc">
          <el-tiptap
                v-model="content"
                :extensions="extensions"
              />
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
           <!-- <template v-if="article.cover.type > 0">
              <upload-cover
                :key="cover"
                v-for="(cover, index) in article.cover.type"
                v-model="article.cover.images[index]"
              />
            </template> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="region">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option :label="channel.name" :value="channel.id" v-for="(channel,index) in channels" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$route.query.id" type="primary" @click="onPublish(false)">修改</el-button>
          <el-button v-else type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { getArticleChannels , addArticle ,getArticle,updateArticle} from '@/api/article'
  import {
    ElementTiptap,
    Doc,
    Text,
    Paragraph,
    Heading,
    Bold,
    Underline,
    Italic,
    Strike,
    ListItem,
    BulletList,
    OrderedList,
   } from 'element-tiptap'
  export default{
    name:"publish",
    data(){
      return {
        article:{
          title:'',//文章标题
          content:'',
          cover: { // 文章封面
            type: 1, // 封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 封面图片的地址
          },
          channel_id:null,//文章所属频道id
        },
        channels:[],//文章频道列表
        extensions: [
          new Doc(),
          new Text(),
          new Paragraph(),
          new Heading({ level: 5 }),
          new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
          new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
          new Italic(),
          new Strike(),
          new ListItem(),
          new BulletList(),
          new OrderedList(),
        ],
        // 编辑器的内容
        content: `
          <h1>Heading</h1>
          <p>This Editor is awesome!</p>
        `,
      }
    },
    created(){
      this.loadChannels()
      if(this.$route.query.id){
        this.loadArticle()
      }
    },
    methods:{
      loadChannels(){
        getArticleChannels().then(res=>{
          this.channels=res.data.data.channels
          //console.log(JSON.stringify(this.channels))
        })
      },
      onPublish (draft = false) {
        const articleId=this.$route.query.id;
        if(articleId){
          updateArticle(articleId,this.article, draft).then(res=>{
            this.$message({
              type: 'success',
              message: `${draft?'保存草稿':'修改'}成功!`
            });
            //this.$router.push('/article')
            //console.log(this.article)
          }).catch(()=>{
            this.$message({
              type: 'info',
              message: `${draft?'保存草稿':'修改'}失败!`
            });
          })
        }else{
          addArticle(this.article, draft).then(res => {
            //console.log(JSON.stringify(res))
            this.$message({
              type: 'success',
              message: `${draft?'保存草稿':'发表'}成功!`
            });
            //this.$router.push('/article')
          }).catch(() => {
            this.$message({
              type: 'info',
              message: `${draft?'保存草稿':'发表'}失败!`
            });
          });
        }
      },
      loadArticle(){
        //读取出原有文章内容
        /**
         * 步骤：
         * 1.找到数据接口
         * 2，封装请求方法
         * 3.请求获取数据
         * */
        getArticle(this.$route.query.id).then(res=>{
          //console.log(JSON.stringify(res.data.data))
          this.article=res.data.data
        })
      }
    },
    components: {
      'el-tiptap': ElementTiptap,
    },
  }
</script>

<style scoped>

</style>
