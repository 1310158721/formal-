/**
 * 全局注册组件
 */
import Vue from 'vue'

// 列表
import TTable from './t-table'
import TSelect from './t-select'
import TTree from './t-tree'
import TSingleUpload from './t-single-upload'
import TSwitch from './t-switch'
import TInputTags from './t-input-tags'

const components = [
  TTable,
  TSelect,
  TTree,
  TSingleUpload,
  TSwitch,
  TInputTags
]

for (const i in components) {
  Vue.component(components[i].name, components[i])
}
