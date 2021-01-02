<template>
  <el-row style="margin-top: -20px;">
    <el-col :span="24" v-for="(item, index) in list" :key="index">
    <el-card class="box-card" style="margin-bottom: 40px;" shadow="hover">
  <div slot="header" class="clearfix">
    <span @click="articleGet($event)" v-bind:num="index" style="cursor: pointer;">{{item.articleTitle}}</span>
    <el-dropdown style="float: right;" size="small">
    <el-button type="primary">
      操作<i class="el-icon-arrow-down"></i></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="essayChange" v-bind:num="index">编辑</el-dropdown-item>
        <el-dropdown-item @click.native="handleDelete(item.articleID)">删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
  <div>
    <span style="margin-right: 10px;">作者：{{item.articleAuthor}}</span>
    <span style="margin-right: 10px;">发布时间：{{item.articleTime | dateChange}}</span>
    <span style="margin-right: 10px;">点击：{{item.articleClick}}</span>
  </div>
</el-card>
</el-col>
</el-row>
</template>

<script>
  import request from '../utils/api.js';
  import {bus} from '../Bus.js';
  export default {
    name: "articleList",
    data() {
      return {
        articleTitle: "",
        list: [],
        articleID: "",
      }
    },
    mounted() {
      this.getArticle();
      console.log('1-1');
    },
    methods: {
      getArticle() {
        request({
          url: '/api/article',
          method: 'get',
          data: {}
        }).then(res => {
          if(res.msg === "查询成功") {
            this.list = res.list;
            this.articleTitle = res.list.articleTitle
          }
        })
      },
      articleGet(event) {
        var target = event.target || window.event.srcElement;
        var text = target.getAttribute('num');
        var list = this.list;
        var Title = list[text].articleTitle;
        var Content = list[text].articleContent;
		    var essayid = list[text].articleID;
          bus.$emit('getData',{
            data: {
              Title,
              Content,
              essayid
            }
          });
          request({
            url: '/api/dataclick',
            method: 'post',
            data: {
              essayid
            }
          })
        this.$router.push('/articleshow');
      },
      handleDelete(id) {
        request({
          url: 'api/delete',
          method: 'post',
          data: {id: id}
        }).then(res=>{
          if(res.msg === "删除成功") {
            this.$message({
              message: "操作成功",
              type: "success"
            })
          }else {
            this.$message({
              message: "操作失败",
              type: "warning"
            })
          }
        });
		this.$router.go(0);
      },
      essayChange(event) {
        var target = event.target || window.event.srcElement;
        var text = target.getAttribute('num');
        var list = this.list;
        var Title = list[text].articleTitle;
        var Content = list[text].articleContent;
        var essayid = list[text].articleID;
          bus.$emit('getData',{
            data: {
              Title,
              Content,
              essayid
            }
          });
        this.$router.push('/changearticle');
      }
    }
  }
</script>

<style>
</style>
