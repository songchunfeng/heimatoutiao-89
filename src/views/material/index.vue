<template>
    <el-card>
        <!-- 引用面包屑 -->
        <bread-crumb slot="header">
            <template slot="title">
                素材管理
            </template>
        </bread-crumb>
        <!-- 上传素材 -->
        <el-row type="flex" justify="end">
          <el-upload :http-request="uploadImg" :show-file-list="false"  action>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-row>
        <!-- 引用标签 -->
        <el-tabs v-model="activeName" @tab-click='changeTab'>
            <el-tab-pane label="全部" name='all'>
                <!-- 全部内容 -->
                <div class="img-list">
                    <el-card v-for="item in list" :key="item.id" class="img-card">
                        <img :src="item.url" alt="">
                        <el-row class="operate" type='flex' align="middle" justify="space-around">
                            <i class="el-icon-star-on" :style="{color:item.is_collected? 'red':''}" @click="collectOrCancel(item)"></i>
                            <i class="el-icon-delete-solid" @click="delMaterial(item.id)"></i>
                        </el-row>
                    </el-card>
                </div>
                <el-row type="flex" justify="center" align="middle" style="height:80px">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="page.total"
                        :page-size="page.pageSize"
                        :current-page="page.currentPage"
                        @current-change="changePage"
                        >
                    </el-pagination>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="收藏" name='collect'><div class="img-list">
                    <el-card v-for="item in list" :key="item.id" class="img-card">
                        <img :src="item.url" alt="">
                    </el-card>
                </div>
                <el-row type="flex" justify="center" align="middle" style="height:80px">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="page.total"
                        :page-size="page.pageSize"
                        :current-page="page.currentPage"
                        @current-change="changePage"
                        >
                    </el-pagination>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [], // 用来存放获取的数据
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页码
        pageSize: 8// 每页的数据
      }
    }
  },
  methods: {
    // 删除素材
    delMaterial (id) {
      this.$confirm('您确定删除么').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    // 点击收藏
    collectOrCancel (row) {
      this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        data: {
          collect: !row.is_collected
        }
      }).then(() => {
        this.getMaterial()
      })
    },
    // 上传图片
    uploadImg (params) {
      let form = new FormData()
      form.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: form
      }).then(result => {
        this.getMaterial()
      })
    },
    // 切换分页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 切换tab事件
    changeTab () {
    // 切换到收藏时将分页默认页数改为第一页
      this.page.currentPage = 1
      this.getMaterial()
    },
    // 获取全部素材
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          // collect 为true时获取的时收藏中的数据
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
    // 页面刚加载就显示全部素材

  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
    display: flex;
    flex-wrap: wrap;
    .img-card {
        width: 200px;
        height: 240px;
        margin: 10px 30px;
        position: relative;
        img {
            width: 100%;
            height: 100%;
        }
        .operate {
            font-size: 20px;
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: #f4f5f6;
            height: 30px;
            width: 100%;
            i {
              cursor: pointer;
            }
        }
    }
}
</style>
