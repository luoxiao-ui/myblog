<template>
 <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
   <el-form-item label="标题" prop="title">
     <el-input type="text" v-model="ruleForm.title" autocomplete="off"></el-input>
   </el-form-item>
   <el-form-item label="博文内容" prop="content">
     <el-input type="textarea":autosize="{minRows: 15}" v-model="ruleForm.content" autocomplete="off"></el-input>
   </el-form-item>
   <el-form-item>
     <el-button type="primary" @click="changeedit">修改博文</el-button>
     <el-button @click="back">返回</el-button>
   </el-form-item>
 </el-form>
</template>

<script>
  import request from '../utils/api.js';
  import {bus} from '../Bus.js';
  export default {
    name: 'changeArticle',
     data() {
       var articlePost = (rule, value, callback) => {
         if (value === '') {
           callback(new Error('请输入内容'));
         }
      };
       return {
         articleID: '',
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
     created(){
         this.ruleForm.title = bus.themeData.Title;
         this.ruleForm.content = bus.themeData.Content;
         this.articleID = bus.themeData.essayid
      },
     methods: {
       back() {
         this.$router.go(-1);
       },
       changeedit(){
         var articleID = this.articleID;
         var title = this.ruleForm.title;
         var content = this.ruleForm.content;
         request({
           url: '/api/changeessay',
           method: 'post',
           data: {
             articleID,
             title,
             content
           }
         }).then(res=>{
           if(res.msg === "修改成功") {
             this.$message({
               message: "修改成功",
               type: "success"
             });
             this.$router.go(-1);
           }else{
             this.$message({
               message: "修改失败",
               type: "warning"
             })
           }
         })
       }
     }
 }
</script>

<style>
</style>
