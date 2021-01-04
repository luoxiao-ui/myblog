<template>
	<el-row style="margin-top: -20px;">
	    <el-col :span="24">
	    <el-card class="box-card" style="margin-bottom: 40px;height: 700px;">
	  <div slot="header" class="clearfix">
	    <span style="margin-left: 500px;">{{Title}}</span>
	    <el-button style="float: right; padding: 3px 0" type="text" @click="back">返回</el-button>
	  </div>
	  <div style="white-space: pre-wrap;">{{Content}}</div>
	</el-card>
	</el-col>
	</el-row>
</template>

<script>
  import {bus} from '../Bus.js';
  export default {
    name: "articleShow",
    data() {
      return {
      }
    },
    computed:{
      Title() {
        return bus.themeData.Title
      },
      Content() {
        return bus.themeData.Content
      },
      Essayid(){
        return bus.themeData.essayid
      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style>
</style>
