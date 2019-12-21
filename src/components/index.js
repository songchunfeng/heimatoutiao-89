import leftAside from './home/left-aside'
import leftHeader from './home/left-header'

export default {
  install (Vue) {
    Vue.component('lf-aside', leftAside)
    Vue.component('lf-header', leftHeader)
  }
}
