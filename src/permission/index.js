import router from '../router'
// 导航守卫 to：即将进入的页面 from：导航正要离开的页面 next：一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
// 全局导航首位
router.beforeEach(function (to, from, next) {
  // 判断需要拦截的地址
  if (to.path.startsWith('/home')) {
    // 判断是否有token，如果有放行，没有返回登录页面
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      this.$router.push('/login')
    }
  } else {
    next()
  }
})
