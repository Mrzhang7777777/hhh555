import PageTools from './PageTools/index.vue'
import UploadExcel from './UploadExcel'

export default {
    install(Vue) {
        //注册全局的通用栏组件对象
        Vue.component('PageTools', PageTools)
        Vue.component('UploadExcel', UploadExcel)
    }
}