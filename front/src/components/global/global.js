/**
 * 全局注册组件
 */
import Vue from 'vue'

// 列表
import TGlobalMask from './mask'
import TMavonEditor from './mavon-editor'
import TGloblaBaseLayoutDrawer from './base-layout-drawer'

const components = [
  TGlobalMask,
  TMavonEditor,
  TGloblaBaseLayoutDrawer
]

for (const i in components) {
  Vue.component(components[i].name, components[i])
}
