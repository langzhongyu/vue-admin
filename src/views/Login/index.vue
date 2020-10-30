<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form class="login-form" ref="login-form" :model="user" :rules="rulesInfo">
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="onSubmit"
            :loading="login_status">登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { login } from '@/api/user'
  export default{
    name:"login",
    data() {
      return {
        user: {
          mobile: '', // 手机号
          code: '', // 验证码
          agree:false
        },
        checked: false, // 是否同意协议的选中状态
        login_status:false,//登录状态
        rulesInfo: {
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern:/^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号', trigger: 'change' }
          ],
          code:[
            {required:true,message:"请输入验证码",trigger:'blur'},
            {pattern:/^\d{6}$/,message:"请输入正确的验证码",trigger:"change"}
          ],
          agree:[
            {
              validator:(rule,value,callback)=>{
                if(value){
                  callback();
                }else{
                  callback(new Error('请勾选用户信息！'))
                }
              }
            }
          ]
        },
      }
    },
    props:{

    },
    methods: {
      onSubmit() {
        const user=this.user;
        //表单验证（异步操作）
        this.$refs['login-form'].validate(valid=>{
          if(!valid){
            return
          }
          this.login();
        })
      },
      login(){
        this.login_status=true;
        login(this.user).then(res=>{
          console.log(res)
          this.$message({
            message: '登录成功！',
            type: 'success'
          });
          this.login_status=false;
          //跳转到首页
          this.$router.push({
            name:'home'
          })
        }).catch(err=>{
          this.$message.error('登录失败，请输入正确的手机号和验证码！');
          console.log("登录失败",err)
          this.login_status=false;
        })
      }
    },
    components:{

    }
  }
</script>

<style scoped>
.login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('./login_bg.jpg') no-repeat;
    background-size: cover;
  }
.login-container .login-btn{width:100%;}
.login-container .login-form-wrap{background:#fff;padding: 30px 50px 10px;min-width: 300px;}
.login-container .login-head{display: flex;justify-content: center;align-items: center;}
.login-container .logo{width: 200px;height: 57px;background: url('./logo_index.png') no-repeat;background-size: contain;}
</style>
