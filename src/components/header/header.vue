<template>
<div class="header">
  <div class="header-wrapper">
    <div>
      <i class="iconfont icon-fanhui"></i>
      <img src="../../assets/list.svg" alt class="list">
    </div>

    <div>
      <span class="header-title">订餐</span>
    </div>
    <div>
      <i class="iconfont icon-dot"></i>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  position: relative;
}
.header-wrapper {
  display: flex;
  /* width: 100%; */
  width: 750px;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 100;
  background: #fff;
  height: 88px;
  /* position: relative; */
}
.header-wrapper {
  /* position: fixed; */

}

.icon-fanhui {
  font-size: 40px;
  margin-left: 20px;
  font-weight: bolder;
}
.list {
  margin-left: 40px;
  width: 30px;
  height: 30px;
}
.header-title {
  font-size: 36px;
  color: #000000;
  letter-spacing: 0;
  text-align: center;
  line-height: 36px;
  /* margin-left: 150px; */
}
.icon-dot {
  font-size: 60px;
  margin-right: 32px;
}
</style>
