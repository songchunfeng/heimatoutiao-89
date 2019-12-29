<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="first" class="select-img">
      <div v-for="item in list" :key="item.id">
        <el-card class="select-card">
            <!-- 给图片注册点击事件 -->
          <img @click="clickImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
      <!-- 分页 -->
      <el-row type="flex" justify="center">
        <el-pagination background layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="changPage"></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传素材" name="second">
        <el-upload action="" :http-request="uploadImg" :show-file-list="false" >
            <i class="el-icon-plus" style="font-size:50px"></i>
        </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      list: [], // 获取图片素材
      page: {
        currentPage: 1, // 当前页码
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    // 上传
    async uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      let result = await this.$axios({
        url: '/user/images',
        method: 'post',
        data
      })
      this.$emit('selectOneImg', result.data.url)
    },
    clickImg (url) {
      // 子传父
      this.$emit('selectOneImg', url)
    },
    async getAllImages () {
      let result = await this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      })
      this.list = result.data.results
      this.page.total = result.data.total_count
    },
    changPage (newPage) {
      this.page.currentPage = newPage
      this.getAllImages()
    }
  },
  created () {
    this.getAllImages()
  }
}
</script>

<style lang="less" scoped>
.select-img {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .select-card {
    width: 120px;
    height: 120px;
    margin: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
