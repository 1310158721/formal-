import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

import i18n from '@/i18n/i18n'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 图片查看器
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

// mavon-editor 编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import '@/assets/styles/css/index.css'
import '@/assets/styles/scss/atom.scss'

// 导入指令配置
import '@/assets/js/directives/directives'

// 导入过滤器配置
import '@/assets/js/filters/filters'

// elementui 组件再次封装全局引入
import '@/components/element/element'
// 全局引入自定义组件
import '@/components/global/global'

// axios 拦截配置
import '@/http/interceptors'

/**
 * 必须放在 Vue.use(ElementUI) 前面才能生效
 * element-ui 兼容 i18n 插件
 */
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(ElementUI)

Vue.use(mavonEditor)
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
