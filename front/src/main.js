import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/styles/css/index.css'
import '@/assets/styles/scss/atom.scss'

// 导入指令配置
import '@/assets/js/directives/directives'

// elementui 组件再次封装全局引入
import '@/components/element/element'
// 全局引入自定义组件
import '@/components/global/global'

// axios 拦截配置
import '@/http/interceptors'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
