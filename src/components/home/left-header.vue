<template>
     <el-row class='layout-header' type='flex' justify='space-between' align='middle'>
       <el-col  class='left' :span='6'>
         <i class="el-icon-s-fold"></i>
         <span class="title">江苏传智播客教育科技股份有限公司</span>
       </el-col>
       <el-col :span='4' class="right">
         <el-row type="flex" justify="end" align='middle'>
           <img src="../../assets/img/avatar.jpg" alt="">
           <!-- 下拉菜单 -->
           <el-dropdown>
             <span>1234</span>
             <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>Git地址</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
             </el-dropdown-menu>
           </el-dropdown>
         </el-row>
       </el-col>
     </el-row>
</template>

<script>
export default {

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
