<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
       <div class="item-top">
         <el-radio-group v-model="collect" size="mini" @change="changeHander">
           <el-radio-button :label="false">全部</el-radio-button>
           <el-radio-button :label="true">收藏</el-radio-button>
         </el-radio-group>
         <el-button size="mini" type="success" @click="dialogUploadVisible=true">上传素材</el-button>
       </div>
       <el-row :gutter="20">
          <el-col :span="4" :sm="6" :md="6" :lg="4"
          v-for="(image,index) in images"
          :key="index">
            <el-image
                 style="height: 100px"
                 :src="image.url"
                 fit="cover">
            </el-image>
            <div class="lab">
              <el-button type="warning"
              :icon="image.is_collected ? 'el-icon-star-on':'el-icon-star-off'"
              circle
              size="mini"
              :loading="image.loading"
              @click="onCollect(image)"></el-button>
              <el-button type="danger"
              icon="el-icon-delete"
              circle size="mini"
              @click="onDelete(image)"></el-button>
            </div>
          </el-col>
       </el-row>
       <el-pagination
         background
         layout="prev, pager, next"
         :total="totalCount"
         @current-change="onCurrentChange"
         :current-page.sync="page"
         :page-size="pageSize">
       </el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true">
       <el-upload
         class="upload-demo"
         drag
         action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
         multiple
         :headers="upLoadHeaders"
         name="image"
         :on-success="onUploadSuccess">
         <i class="el-icon-upload"></i>
         <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
         <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
       </el-upload>
    </el-dialog>
  </div>
</template>

<script>
  import {getImages,collectImage,deleteImage} from '@/api/image'
  export default{
    name:"imageIndex",
    data(){
      const user=JSON.parse(window.localStorage.getItem('user'))
      return {
        collect: false,//默认查询所有图片素材
        images:[],
        dialogUploadVisible:false,
        upLoadHeaders:{
          Authorization:`Bearer ${user.token}`,
        },
        totalCount:0,
        page:1,
        pageSize:18,
      }
    },
    created(){
      this.loadImages(1)
    },
    methods:{
      loadImages(page=1){
        //重置高亮页码
        this.page=page;
        getImages({
          collect:this.collect,
          page,
          per_page:this.pageSize,
          }).then(res=>{
          const {results,total_count} =res.data.data
          results.forEach(images=>{
            images.loading=false
          })
          this.images=results;
          this.totalCount=total_count;
          //console.log(JSON.stringify(res.data.data))
        })
      },
      changeHander(value){
        this.loadImages(1,value);
      },
      onUploadSuccess(){
      this.dialogUploadVisible=false;
      this.loadImages(this.page)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
      },
      onCurrentChange(page){
        this.loadImages(page);
      },
      onCollect(image){
        image.loading=true
        collectImage(image.id,!image.is_collected).then(res=>{
          //更新收藏状态
          image.is_collected=!image.is_collected
          image.loading=false
        })
      },
      onDelete(image){
        deleteImage(image.id).then(res=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      }
    }
  }
</script>

<style scoped>
  .item-top{display: flex;width: 100%;justify-content: space-between;margin-bottom: 20px;}
  .el-col{margin-bottom: 20px;position: relative;}
  .lab{height: 40px;background-color: rgba(204, 204, 204, 0.5);position: absolute;bottom: 4px;left: 10px;right: 10px; display: flex;justify-content: space-between;align-items: center;padding: 0 30px;;}
</style>
