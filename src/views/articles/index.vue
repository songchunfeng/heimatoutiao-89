<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>文章状态:</span>
      </el-col>
      <el-col :span="18">
        <el-radio-group v-model="formData.status" @change="changeCondition">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">频道列表:</el-col>
      <el-col :span="18">
        <el-select v-model="formData.channel_id" @change="changeCondition">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">时间选择</el-col>
      <el-col :span="18">
        <div class="block">
          <el-date-picker
            @change="changeCondition"
            value-format='yyyy-MM-dd'
            v-model="formData.dateRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-col>
    </el-row>
    <!-- 主体部分 -->
    <el-row class="title">
        <!-- 标题 -->
        <span>共找到{{page.total}}条符合条件内容</span>
    </el-row>
    <el-row class="article-item" v-for="item in list" :key="item.id.toString()">
        <!-- 内容 -->
        <!-- 左侧 -->
        <el-col :span="14">
            <el-row type="flex">
                <img class="img" :src="item.cover.images.length?item.cover.images[0] : defaultImg" alt="">
                <div class="info">
                  <span>{{item.title}}</span>
                  <el-tag class="tag" :type="item.status | filtersTag">{{item.status | filtersStatus}}</el-tag>
                  <span style="color:#999;font-size:12px">{{item.pubdate}}</span >
                </div>
            </el-row>
        </el-col>
        <!-- 右侧 -->
        <el-col :span="10">
            <el-row type="flex" justify="end" class="right">
                <span><i class="el-icon-edit"></i>修改</span>
                <span @click="delArticles(item.id)"><i class="el-icon-delete"></i>删除</span>
            </el-row>
        </el-col>
    </el-row>
    <el-row type="flex" align="middle" justify="center" style="height:60px">
      <el-pagination
      background
      layout="prev, pager, next"
      :total="page.total"
      :page-size="page.pageSize"
      :current-page="page.currentPage"
      @current-change="changePage">
      </el-pagination>
    </el-row>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5, // 状态
        channel_id: null,
        dateRange: []
      },
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      channels: [],
      list: [], // 文章内容列表,
      defaultImg: require('../../assets/img/IMG_0160.jpg')// 无图片时的默认图片
    }
  },
  filters: {
    // 用来过滤文章状态
    // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
    filtersStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'

        default:
          break
      }
    },
    // 改变tag标签颜色
    filtersTag (value) {
      switch (value) {
        case 0:
          return 'success'
        case 1:
          return 'warning'
        case 2:
          return '发表'
        case 3:
          return 'danger'

        default:
          break
      }
    }
  },
  methods: {
    // 删除接口
    delArticles (id) {
      // alert(1)
      this.$confirm('你确定删除么').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getConditionArticle()
        })
      })
    },
    // 分页的切换
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getConditionArticle()
    },
    // 封装一个方法获取搜索的值
    getConditionArticle () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.formData.status === 5 ? null : this.formData.status, // 获取当前状态
        channel_id: this.formData.channel_id, // 频道
        begin_pubdate: this.formData.dateRange.length ? this.formData.dateRange[0] : null, // 时间的长度如果为0就不传，不为0就获取下标为0的赋值
        end_pubdate: this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null
      }
      this.getArticles(params)
    },
    // 搜索时间
    changeCondition () {
      // 重新传值获取内容
      this.page.currentPage = 1
      this.getConditionArticle()
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang="less" scoped>
.articles {
  .searchTool {
    height: 50px;
    padding-left: 50px;
    font-size: 14px;
  }
  .title {
      margin: 30px 0;
      border-bottom: 1px dashed #ccc;
      height: 60px;
      line-height: 60px;
  }
  .article-item {
    margin: 30px 0;
    padding: 10px 0;
    border-bottom: 1px solid #f2f3f5;
          .img {
            width: 180px;
            height: 100px;
            border-radius: 4px;
            margin-right: 10px;
          }
          .info {
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .tag {
              max-width: 100px;
            }
          }
          .right {
            font-size: 14px;
            cursor: pointer;
            span {
              margin: 8px;
            }
          }
      }
}
</style>
