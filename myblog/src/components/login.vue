<template>
  <el-form class="login-container" label-position="left" label-width="0px">
    <h3 class="login_title">博客登录</h3>
    <el-form-item>
      <el-input type="text" v-model="authorName" placeholder="用户名"></el-input>
    </el-form-item>

    <el-form-item>
       <el-input type="password" v-model="password" placeholder="密码"></el-input>
    </el-form-item>

    <el-form-item style="width: 100%;">
       <el-button type="primary" style="width: 100%;background: #505458;border: none;" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { setToken, setUserName } from "@/utils/auth";
  import request from "@/utils/api";
  export default {
    name: 'login',
    data() {
      return {
        authorName: "",
        password: ""
      }
    },
    methods: {
      onSubmit() {
            var authorName = this.authorName;
            var password = this.password;
            request({
              url: "/api/login",
              method: "post",
              data: {
                authorName,
                password
              }
            }).then(res => {
              if (res.msg === "登录成功") {
                this.$message({
                  message: "恭喜你，登录成功",
                  type: "success"
                });
                setToken(res.token);
                setUserName(res.name);
                this.$router.push("home");
              }else {
                this.$message({
                  message: "登录失败，用户名或密码错误",
                  type: "warning"
                });
                this.authorName = "";
                this.password = ""
              }
            });
          }
        }
      };
</script>

<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
