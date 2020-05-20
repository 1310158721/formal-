import Vue from 'vue'
import { Message } from 'element-ui'
import store from '@/store/store'

Vue.directive('t-permission', {
  inserted (el, binding) {
    const { value } = binding
    if (!value) {
      Message.error('t-permission 指令必须接收一或多个权限值')
      return false
    }
    const { hasPermission } = store.state.userInfo
    const checkPermission = value.split(',')
    let isExist = false
    for (let i = 0, len = checkPermission.length; i < len; i++) {
      if (hasPermission.includes(checkPermission[i].trim())) {
        isExist = true
        break
      }
    }
    if (!isExist) {
      const parent = el.parentNode
      parent.removeChild(el)
    }
  }
})

Vue.prototype.$permission = function (permissions) {
  const { hasPermission } = store.state.userInfo
  const checkPermission = permissions.split(',')
  let isExist = false
  for (let i = 0, len = checkPermission.length; i < len; i++) {
    if (hasPermission.includes(checkPermission[i].trim())) {
      isExist = true
      break
    }
  }
  return isExist
}
