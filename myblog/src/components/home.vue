<template>
  <div>
    <navheader></navheader>
	<el-main>
		<transition>
		<router-view></router-view>
		</transition>
	</el-main>
  </div>
</template>

<script>
  import navheader from './header.vue';
  export default {
    name: 'home',
    components: {
      navheader
    },
    data() {
      return {

      }
    }
  }
</script>

<style>
</style>
