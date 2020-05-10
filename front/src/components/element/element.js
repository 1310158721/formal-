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
import TDropdown from './t-dropdown'
import TDialog from './t-dialog'

const components = [
  TTable,
  TSelect,
  TTree,
  TSingleUpload,
  TSwitch,
  TInputTags,
  TDropdown,
  TDialog
]

for (const i in components) {
  Vue.component(components[i].name, components[i])
}
