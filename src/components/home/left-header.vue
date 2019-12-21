<template>
     <el-row class='layout-header' type='flex' justify='space-between' align='middle'>
       <el-col  class='left' :span='6'>
         <i class="el-icon-s-fold"></i>
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
export default {
  data () {
    return {
      useInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  created () {
    // let token = window.localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile'
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).then(result => {
      this.useInfo = result.data.data
    })
  },
  methods: {
    handleCommand (command) {
      if (command === 'lgout') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/songchunfeng/heimatoutiao-89'
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
