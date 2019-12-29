<template>
  <div class="home">
    <div ref="myecharts" class="echarts"></div>
  </div>
</template>

<script>
// import echarts from 'echarts'
export default {
  // mounted () {
  //   let myecharts = echarts.init(this.$refs.myecharts)
  //   myecharts.setOption()
  //   }
}
</script>

<style lang='less' scoped>
    .home {
        // background-image: url('../../assets/img/bg-img.jpg');
        height: 100vh;
        background-size: cover;
        .echarts {
          width:800px;
          height: 400px;
        }
    }
</style>
