import Vue from 'vue'
import { Message } from 'element-ui'
import { throttle } from './directives'

Vue.directive('t-throttle', {
  inserted: function (el, binding) {
    const { value } = binding
    /* 获取参数并设置默认值，防止漏传参数 */
    const {
      type = 'onclick',
      fn = function () {
        Message.error('请设置节流函数的 fn 参数')
      },
      params = []
    } = value
    /* 元素绑定相应事件，并传递参数给节流函数 */
    el[type] = throttle(fn, 1000, ...params)
  }
})
