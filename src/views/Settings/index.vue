<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main-container">
        <div class="left">
          <el-form ref="form" :model="user" label-width="80px">
            <el-form-item label="编号">
              {{user.id}}
            </el-form-item>
            <el-form-item label="手机">
              {{user.mobile}}
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
              @click="onSaveUserInfo"
              :loading="updateLoading">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <label for="file">
            <el-avatar
              shape="square"
              :size="150"
              fit="cover"
              :src="user.photo"
            ></el-avatar>
            <p>点击修改头像</p>
          </label>
          <input
            id="file"
            type="file"
            ref="file"
            hidden
            @change="onFileChange"
          >
        </div>
      </div>
    </el-card>
    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      append-to-body
      @opened="onDialogOpened"
      @closed="onDialogClosed">
      <div>
        <img
        class="preview-image"
        :src="previewImage"
        ref="preview-image">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdatePhoto">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getUserProfile,updateUserPhoto,updateUserInfo} from '@/api/user'
  import 'cropperjs/dist/cropper.css';
  import Cropper from 'cropperjs'
  import globalBus from '@/utils/global-bus'
  export default{
    name:"settings",
    data(){
      return {
        user:{
          id:null,
          photo:'',
          name:'',
          intro:'',
          email:'',
          mobile:''
        },
        dialogVisible: false,//dialog是否关闭
        previewImage:'',
        cropper: null,
        updateLoading:false,
      }
    },
    created () {
      this.loadUser()
    },
    methods:{
      onSaveUserInfo() {
        this.updateLoading=true
        const { name,intro,email }=this.user
        updateUserInfo({name,intro,email}).then(res=>{
          this.$message({
            type:'success',
            message:'用户信息修改成功！'
          });
          this.updateLoading=false;
          //发布通信，用户信息已修改
          globalBus.$emit('update-user', this.user)
          //console.log(JSON.stringify(res))
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'用户信息修改失败！'
          });
        })
      },
      loadUser(){
        getUserProfile().then(res=>{
          this.user=res.data.data;
          //console.log(JSON.stringify(this.user))
        })
      },
      onFileChange(){
        const file=this.$refs.file
        //console.log(file.files[0])
        const blobData=window.URL.createObjectURL(file.files[0])
        this.previewImage=blobData
        //console.log(blobData)
        this.dialogVisible=true;
        this.$refs.file.value=''
      },
      onDialogOpened(){
        const image = this.$refs['preview-image']
        if(this.cropper){
          this.cropper.replace(this.previewImage)
          return;
        }
        this.cropper = new Cropper(image, {
          viewMode: 1,
          dragMode: 'none',
          aspectRatio: 1,
          cropBoxResizable: false,
        });
      },
      onDialogClosed(){

      },
      onUpdatePhoto(){
        //把裁切过的图片上传到服务器
        this.cropper.getCroppedCanvas().toBlob((file) => {
          const formData = new FormData();
          // Pass the image file name as the third parameter if necessary.
          formData.append('photo', file);
          updateUserPhoto(formData).then(res=>{
            //console.log(JSON.stringify(res.data.data.photo))
            this.dialogVisible=false;
            //替换成新裁切的图片
            //this.user.photo=res.data.data.photo;
            // 直接把裁切结果的文件对象转为 blob 数据本地预览
            this.user.photo = window.URL.createObjectURL(file)
            //修改成功提示
            this.$message({
              type: 'success',
              message: '更新头像成功'
            })
            //发布通信，用户信息已修改
            globalBus.$emit('update-user', this.user)
          }).catch(()=>{
            this.$message({
              type:'info',
              message:'修改失败！'
            });
          })
        });
      }
    }
  }
</script>

<style scoped>
.main-container{width: 100%;}
.main-container .left{width: 50%;float: left;}
.main-container .right{width: 30%;float: right;}
.preview-image{display: block;max-width: 100%;}
</style>
