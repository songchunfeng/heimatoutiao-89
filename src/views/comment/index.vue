<template>
  <el-card v-loading="loading">
      <!-- card也有具名插槽header 将面包屑放入具名插槽header中 -->
      <bread-crumb slot="header">
        <template slot="title">
            评论列表
        </template>
      </bread-crumb>
      <!-- 用表格组件来放评论内容 -->
      <el-table :data='list'>
          <!-- 列组件中label来设置表头 -->
          <el-table-column prop="title" width=600 label="标题"></el-table-column>
          <!-- formatter用来格式化内容 -->
          <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
          <el-table-column label="操作">
              <!-- el-table-colum中有作用域插槽 有row column index -->
              <template slot-scope="obj">
                  <el-button type="text" size="small">修改</el-button>
                  <el-button type="text" size="small" @click="openOrClose(obj.row)">{{obj.row.comment_status?"关闭评论":"打开评论"}}</el-button>
              </template>
          </el-table-column>
      </el-table>
      <el-row type='flex' justify='center' align='middle' style="height:80px">
        <el-pagination
            background
            layout="prev, pager, next"
            :current-page="page.currentPage"
            :page-size='page.pageSizes'
            :total="page.total" @current-change="currentChange">
        </el-pagination>
      </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false, // 页面加载默认为false
      list: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSizes: 10 // 每页显示个数选择器的选项设置
      }
    }
  },
  methods: {
    currentChange (newPage) {
    //   console.log(newPage)
      // 将当前的页数给currentPage属性
      this.page.currentPage = newPage
      // 重新调用方法页面
      this.getComment()
    },
    async getComment () {
      let result = await this.$axios({
        url: 'articles',
        // axios中有params参数
        // 让接口调用评论数据
        // Query参数中page代表当前页数，per_page代表每页数量
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSizes
        }

      })
      this.list = result.data.results
      // 获取文章的总页数
      this.page.total = result.data.total_count
      // 数据获取成功后显示加载页面
      this.loading = false
      // console.log(result)
    },
    formatterBool (row, column, cellValue, index) {
      // row当前行数据
      // colum 当前列属性
      // cellValue 当前单元格的值
      // index 当前下标
      return cellValue ? '正常' : '关闭'
    },
    async openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      // $confirm 确定时  进入then 取消时进入catch
      await this.$confirm(`您是确定${mess}评论么`)
      // 确定的话调用接口
      //   地址参数/query参数/url参数/路由参数 => 可以在params中写 也可以直接拼接到url地址上
      await this.$axios({
        url: '/comments/status',
        method: 'put',
        params: {
          article_id: row.id.toString()
        },
        data: {
          allow_comment: !row.comment_status
        }
      })
      //   请求发送成功后有提示信息
      this.$message({
        type: 'success',
        message: '请求成功'
      })
      this.getComment()
    }
  },
  created () {
    // 页面加载效果
    this.loading = true
    // 调用method中的方法获取评论列表
    this.getComment()
  }
}
</script>

<style>

</style>
