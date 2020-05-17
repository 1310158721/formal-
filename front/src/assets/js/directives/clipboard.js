import Vue from 'vue'
import { Message } from 'element-ui'
import { throttle } from './directives'
import i18n from '@/i18n/i18n'

function click (el, value) {
  // 节流处理
  el.onclick = throttle(() => {
    if (!value) {
      Message.error(i18n.t('directives.clipboard.复制内容不能为空'))
      return false
    }

    const inputDom = document.createElement('input')
    inputDom.value = value
    document.body.appendChild(inputDom)
    inputDom.select()
    document.execCommand('Copy')
    Message.success(i18n.t('directives.clipboard.复制成功'))
    inputDom.remove()
  }, 1000)
}

Vue.directive('t-clipboard', {
  inserted (el, binding) {
    const { value = null } = binding
    click(el, value)
  },
  update (el, binding) {
    const { value = null } = binding
    click(el, value)
  }
})
