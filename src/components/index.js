import leftAside from './home/left-aside'
import leftHeader from './home/left-header'
// 引入面包屑
import BreadCrumb from './common/bread-crumb.vue'

export default {
  install (Vue) {
    Vue.component('lf-aside', leftAside)
    Vue.component('lf-header', leftHeader)
    Vue.component('bread-crumb', BreadCrumb)
  }
}
