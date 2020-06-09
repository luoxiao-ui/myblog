<template>
 <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
   <el-form-item label="标题" prop="title">
     <el-input type="text" v-model="ruleForm.title" autocomplete="off"></el-input>
   </el-form-item>
   <el-form-item label="博文内容" prop="content">
     <el-input type="textarea":autosize="{minRows:15}" v-model="ruleForm.content" autocomplete="off"></el-input>
   </el-form-item>
   <el-form-item>
     <el-button type="primary" @click="postedit">发布博文</el-button>
     <el-button @click="back">返回</el-button>
   </el-form-item>
 </el-form>
</template>

<script>
  import request from '../utils/api.js';
  import {getUserName} from '../utils/auth.js';
  export default {
     data() {
       var articlePost = (rule, value, callback) => {
         if (value === '') {
           callback(new Error('请输入内容'));
         }
      };
       return {
         ruleForm: {
           title: '',
           content: '',
         },
         rules: {
           title: [{ validator: articlePost, trigger: 'blur' }],
           content: [{ validator: articlePost, trigger: 'blur' }]
         }
       }
     },
     methods: {
       back() {
         this.$router.go(-1);
       },
       postedit(){
         var authorName = getUserName();
         var _this = this;
         if(this.ruleForm.title === "" && this.ruleForm.content === ""){
           this.$message.error('当前博文未完成');
         }else {
           request({
             url: '/api/postessay',
             method: 'post',
             data: {
              authorName: authorName,
              title: _this.ruleForm.title,
              content:  _this.ruleForm.content
             }
           }).then(res =>{
             if(res.msg === "提交成功") {
               this.$message({
                 message: "发布成功",
                 type: "success"
               });
               this.$router.push('/home');
             }else {
               this.$message({
                 message: "发布失败",
                 type: "warning"
               })
             }
           })
         }
       }
     }
 }
</script>

<style>
</style>
