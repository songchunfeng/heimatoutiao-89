<template>
<!-- 外层容器 -->
  <el-container>
    <!-- 左边栏 -->
    <el-aside :style="{width: collapse ? '60px':'230px'}" style="background-color:#323745;min-height:100vh;">
      <lf-aside></lf-aside>
    </el-aside>
    <!-- 右侧容器 -->
    <el-container>
      <!-- 顶部 -->
      <el-header>
        <lf-header></lf-header>
      </el-header>
      <!-- 主体 -->
      <el-main style="padding:0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../utils/eventBus'
// @ is an alias to /src
// import leftAside from '../../components/home/left-aside'
// import leftHeader from '../../components/home/left-header'

export default {
  // components: {
  //   // 'lf-aside': leftAside,
  //   // 'lf-header': leftHeader
  // }
  data () {
    return {
      collapse: false
    }
  },
  created () {
    eventBus.$on('changeCollqpse', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>
