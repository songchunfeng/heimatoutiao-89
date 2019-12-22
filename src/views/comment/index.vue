<template>
  <el-card>
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
                  <el-button type="text" size="small">{{obj.row.comment_status?"关闭评论":"打开评论"}}</el-button>
              </template>
          </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: 'articles',
        // axios中有params参数
        // 让接口调用评论数据
        params: {
          response_type: 'comment'
        }

      }).then(result => {
        this.list = result.data.results
      })
    },
    formatterBool (row, column, cellValue, index) {
      // row当前行数据
      // colum 当前列属性
      // cellValue 当前单元格的值
      // index 当前下标
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    // 调用method中的方法获取评论列表
    this.getComment()
  }
}
</script>

<style>

</style>
