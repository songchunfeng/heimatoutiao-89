<template>
     <el-row class='layout-header' type='flex' justify='space-between' align='middle'>
       <el-col  class='left' :span='6'>
         <i @click="collapseOrOpen" :class="{'el-icon-s-fold':!collapse,'el-icon-s-unfold':collapse}"></i>
         <span class="title">江苏传智播客教育科技股份有限公司</span>
       </el-col>
       <el-col :span='4' class="right">
         <el-row type="flex" justify="end" align='middle'>
           <img :src="useInfo.photo ? useInfo.photo : defaultImg" alt="">
           <!-- 下拉菜单 -->
           <el-dropdown @command='handleCommand'>
             <span>{{useInfo.name}}</span>
             <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="git">Git地址</el-dropdown-item>
                <el-dropdown-item command="lgout">退出</el-dropdown-item>
             </el-dropdown-menu>
           </el-dropdown>
         </el-row>
       </el-col>
     </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false, // 是否折叠
      useInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  created () {
    this.getUserInfo()
    // 接收到参数后，在页面渲染时就获取数据
    eventBus.$on('updateUserInfoSuccess', () => {
      // 重新调用方法
      this.getUserInfo()
    })
  },
  methods: {
    collapseOrOpen () {
      this.collapse = !this.collapse
      // 触发公共事件
      eventBus.$emit('changeCollqpse')
    },
    async getUserInfo () {
      // let token = window.localStorage.getItem('user-token')
      let result = await this.$axios({
        url: '/user/profile'
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
      })
      this.useInfo = result.data
    },
    handleCommand (command) {
      if (command === 'lgout') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/songchunfeng/heimatoutiao-89'
      } else if (command === 'info') {
        this.$router.push('/home/account')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  height: 60px;
  .left {
    font-size: 15px;
    .title {
      color:#2c3e50
    }
  }
  .right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 5px
    }
  }
}
</style>
