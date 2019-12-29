<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form style="margin-left:50px" label-width="100px" ref="myForm" :model="formData" :rules="publishRules">
      <el-form-item label="标题" prop="title">
        <el-input style="width:60%" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor type="textarea" v-model="formData.content" style="height:400px"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" style="margin-top:150px">
        <el-radio-group v-model="formData.cover.type" @change="changeType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 接收子组件参数 -->
      <cover-images :list="formData.cover.images" @clickOneImg="receiveImg"></cover-images>
      <el-form-item label="频道" prop="channel_id">
        <el-select value v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
          <!-- 如果发布文章方法只写（）代表什么参数也不传 -->
        <el-button type="primary" @click="publishArticle()">发布</el-button>
        <el-button @click="publishArticle(true)">存为草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '', // 标题校验
        content: '', // 内容校验
        cover: {
          type: 0, //   封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 存储的图片的地址
        },
        channel_id: null // 频道id
      },
      // 校验规则
      publishRules: {
        title: [{ required: true, message: '内容不能为空' }, {
          min: 5, max: 30, message: '标题长度需要在5到30字符之间'
        }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '内容不能为空' }]
      }
    }
  },
  // 因为修改和发布用的时一个组件，切换页面是组件不会被销毁，所以需要用watch监听事件来改变规则
  watch: {
    // 改变type的值来控制images的值改变
    // 'formData.cover.type': function () {
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     this.formData.cover.images = []
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = ['']
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', '']
    //   }
    // },
    $router: function (to, from) {
      //   Object.keys => 将对象中的属性抽提成一个数组
      // to.params为页面的id
      if (Object.keys(to.params).length) {
        // 如果有参数则为修改
      } else {
        //   没有参数为发布
        this.formData = {
          title: '', // 标题校验
          content: '', // 内容校验
          cover: {
            type: 0, //   封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 存储的图片的地址
          },
          channel_id: null // 频道id
        }
      }
    }
  },
  methods: {
    // 接收子组件传的参数
    receiveImg (img, index) {
      // // 修改images
      this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
        if (i === index) {
          return img
        }
        return item
      })
    },
    // 改变type
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      }
    },
    // 发布文章
    publishArticle (draft) {
      this.$refs.myForm.validate(isOk => {
        let { id } = this.$route.params
        this.$axios({
          url: id ? `/articles/${id}` : '/articles/',
          method: id ? 'put' : 'post',
          params: { draft },
          data: this.formData
        }).then(() => {
          this.$router.push('/home/articles')
        })
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 获取指定id的文章
    getArticleById (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getChannels()
    // 获取修改页面当前文章的id
    let { id } = this.$route.params
    // 如果id存在就调用获取文章内容的方法
    id && this.getArticleById(id)
  }
}
</script>

<style>
</style>
