import leftAside from './home/left-aside'
import leftHeader from './home/left-header'
import CoverImages from './publish/cover-images.vue'
import SelectImage from './publish/select-image.vue'
// 引入面包屑
import BreadCrumb from './common/bread-crumb.vue'
import { quillEditor } from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install (Vue) {
    Vue.component('lf-aside', leftAside)
    Vue.component('lf-header', leftHeader)
    Vue.component('bread-crumb', BreadCrumb)
    Vue.component('cover-images', CoverImages)
    Vue.component('select-image', SelectImage)
    Vue.component('quill-editor', quillEditor)// 注册富文本编辑器
  }
}
