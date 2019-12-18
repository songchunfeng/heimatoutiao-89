<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title"><img src="../../assets/img/logo_index.png" alt=""></div>
      <!-- 表单的容器是el-form 通过model设置校验数据，rules属性设置校验规则-->
      <!-- 给el-form设置ref属性为了获取标签 -->
      <el-form :model="formData" :rules="loginRules" ref="myForm">
        <!-- 标签要写在el-form-item中 绑定prop属性进行校验-->
        <el-form-item prop="moblie">
          <el-input placeholder="请输入手机号" v-model="formData.moblie"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 给标签双向绑定数据 -->
          <el-input v-model="formData.code" style="width:70%" placeholder="验证码"></el-input>
          <el-button style="float:right" type="primary" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="formData.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <!-- button设置一个方法来校验整个表单 -->
          <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        moblie: '',
        code: '',
        check: false
      },
      loginRules: {
        // required必填项,如果不填 就无法通过校验/如果为true,就表示该字段必填
        // pattern正则表达式
        moblie: [{ required: true, message: '请输入手机号' }, { pattern: /^1[3456789]\d{9}$/ }],
        code: [{ required: true, message: '请输入验证码' }, { pattern: /^\d{6}$/ }],
        // validator是自定义规则函数里面有三个值，rule当前规则，value当前表单项的值，callback 回调函数
        // 必须写三个
        check: [{ validator: function (rule, value, callback) {
          if (value) {
            // 验证通过执行
            callback()
          } else {
            // 验证不通过执行
            callback(new Error('请同意'))
          }
        } }]
      }
    }
  },
  methods: {
    // 校验整个表单方法
    submitLogin () {
      // validate 是一个方法 => 方法中传入的一个函数 两个校验参数  是否校验成功/未校验成功的字段
      this.$refs.myForm.validate(function (isOk) {
        if (isOk) {
          console.log('后台传入数据')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background: url('../../assets/img/login_bg.jpg');
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 340px;
    .title {
      text-align: center;
      margin-bottom: 20px;
      img {
        height: 40px;
      }
    }
  }
}
</style>
