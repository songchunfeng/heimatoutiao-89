<template>
    <el-card>
        <bread-crumb slot='header'>
            <template slot="title">账户信息</template>
        </bread-crumb>
        <el-upload :http-request="uploadImg" class='head-upload' :show-file-list="false" action="">
            <img :src="formData.photo?formData.photo:defaulImg" alt="">
        </el-upload>
        <el-form style="margin-left:100px" label-width="100px" :model="formData" :rules="rules" ref="myForm">
            <el-form-item label="用户名" prop="name">
                <el-input style="width:30%" v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="intro">
                <el-input style="width:30%" v-model="formData.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input style="width:30%" v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input style="width:30%" disabled v-model="formData.mobile"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveUserInfo">保存</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        photo: '', // 头像地址
        email: '', // 邮箱
        mobile: '', // 手机
        intro: ''// 简介
      },
      rules: {
        name: [{ required: true, message: '不能为空' }, { min: 1, max: 7 }],
        email: [{ required: true, message: '不能为空' }]
      },
      defaulImg: require('../../assets/img/head.jpeg')
    }
  },
  methods: {
    // 上传头像
    uploadImg (params) {
    //   console.log(params)
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.formData.photo = result.data.photo
        eventBus.$emit('updateUserInfoSuccess')// 触发一个自定义事件
      })
    },
    // 表单校验 保存
    saveUserInfo () {
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: 'user/profile',
            method: 'patch',
            data: this.formData
          }).then(result => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            // 告诉头部组件数据传输成功，并调用公共实例监听
            eventBus.$emit('updateUserInfoSuccess')// 触发一个自定义事件
          })
        }
      })
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.head-upload {
    position: absolute;
    right: 300px;
    img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
}
</style>
