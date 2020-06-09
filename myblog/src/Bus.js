import Vue from 'vue'

export const bus = new Vue({
  data() {
    return {
      themeData: {}
    }
  },
  created() {
    this.$on('getData', (value) => {
      this.themeData = value.data
    })
  }
})
