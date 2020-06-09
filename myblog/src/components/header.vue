<template>
  <div>
    <el-menu  class="el-menu-demo" mode="horizontal"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1" @click="toPage('首页')" style="margin-left: 500px;">首页</el-menu-item>
      <el-menu-item index="2" @click="toPage('发布文章')">发布文章</el-menu-item>
    </el-menu>
    <el-dropdown @command="handleCommand" split-button type="primary" class="userlogout">
      {{userName}}
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import {removeToken, getUserName} from '../utils/auth.js';
  export default {
    name: 'navheader',
    data() {
      return {
        userName: ""
      }
    },
    mounted() {
      this.userName = getUserName();
    },
    methods: {
      handleCommand(command) {
        if(command === "logout") {
          removeToken();
          this.$router.push('/')
        }
      },
      toPage(item) {
        if(item === "首页") {
          this.$router.push('/home');
        }else if(item === "发布文章") {
          this.$router.push('/postarticle')
        }
      }
    }
  }
</script>

<style>
  .userlogout {
    position: relative;
    left: 20px;
    top: -50px;
  }
</style>
