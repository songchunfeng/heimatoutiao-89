// 封装axios
import axios from 'axios'
import router from '../router'// 引入路由实例
import { Message } from 'element-ui'// 引入提示信息对象
import JSONBig from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// axios请求拦截，用interceptors
axios.interceptors.request.use(function (config) {
  // 请求成功进入函数内
  // config是要发送请求的配置信息
  // 因为每次axios请求都要用到token，所以将token统一放到Authorization中
  let token = window.localStorage.getItem('user-token')

  config.headers['Authorization'] = `Bearer ${token}`// 将token放入Authorization中
  return config// 返回config
}, function () {
// 请求失败进入
}
)

// 响应拦截器:数据返回来在到达then之前拦截
// 数据到达then之前还要先进行处理，将数字进行处理
axios.defaults.transformResponse = [function (data) {
  return data ? JSONBig.parse(data) : {}
}]
axios.interceptors.response.use(function (response) {
  // 请求成功进入
  // return返回的数据给then
  return response.data ? response.data : {}
}, function (error) {
  // 失败时执行
  // 所有失败都在这执行
  // 获取状态码，根据状态码执行命令
  let status = error.response.status // 获取状态码
  let message = ''
  switch (status) {
    case 400:
      message = '用户名或验证码错误'
      break
    case 401:
    //   token过期或未出,强制跳转
      router.push('/login')
      break
    case 403:
    //   message = 'refresh_token未携带或已过期'
    // token过期。强制跳转到登录页
      router.push('/login')
      break
    case 507:
      message = '服务器数据异常'
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  // 状态码提示
  Message({ type: 'warning', message })
  // 让错误拦截器的内容直接进入catc中 不进入then
  return Promise.reject(error)
})

// 到处axios
export default axios
