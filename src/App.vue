<template>
  <div id="app">
    <!-- <orderList/> -->
    <router-view/>
  </div>
</template>

<script>
import orderList from './components/orderList.vue'
export default {
  name: 'App',
  components:{
    orderList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background-color: pink;
  width: 100%;
  height: 100%;
}
</style>
