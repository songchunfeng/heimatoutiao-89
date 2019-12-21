import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
import axios from './utils/axios'
import component from './components/index'

Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(component)// 注册全局组件对象

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
