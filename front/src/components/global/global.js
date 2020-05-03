/**
 * 全局注册组件
 */
import Vue from 'vue'

// 列表
import TGlobalMask from './mask'

const components = [
  TGlobalMask
]

for (const i in components) {
  Vue.component(components[i].name, components[i])
}
