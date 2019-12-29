<template>
  <div class="cover-image">
      <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-item">
          <img :src="item? item:defaultImg" alt="">
      </div>
      <!-- el-dialog是给根元素的 visible来控制显隐-->
      <el-dialog :visible="dialogVisible" @close="closeDialog">
          <select-image @selectOneImg="receiveImg"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接收父级传过来的数据
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false, // 弹层开启或关闭
      clickIndex: -1 // 点击下标
    }
  },
  methods: {
    // 接收子组件传值
    receiveImg (img) {
    //   alert(img)
    // 继续传递给父组件
      this.$emit('clickOneImg', img, this.clickIndex)
      this.closeDialog()
    },
    openDialog (index) {
      this.clickIndex = index // 记住当前点击的下标
      this.dialogVisible = true // 打开弹层
    },
    closeDialog () {
      this.dialogVisible = false // 关闭弹层
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image {
    display: flex;
    margin: 20px 0;
    margin-left: 100px;
    .cover-item {
        width: 260px;
        height: 260px;
        border: 1px solid #ccc;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
