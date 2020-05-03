/**
 * 全屏化指令
 * 可接受参数
 * fnCallback 切换全局化状态的回调函数
 * dom 全屏化元素ID名
 */

import Vue from 'vue'
import screenfull from 'screenfull'

Vue.directive('t-full-screen', {
  inserted (el, binding) {
    // 元素原来的背景色，暂不支持透明度变化
    const backgroundColor = el.style.backgroundColor
    const { value } = binding
    const {
      fnCallback = () => { },
      dom = null
    } = value
    if (screenfull.isEnabled) {
      // 监听切换全屏化
      screenfull.on('change', fnCallback)
    }
    el.addEventListener(
      'click',
      function () {
        if (!screenfull.isEnabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning'
          })
          return false
        }
        const element = dom ? document.getElementById(dom) : null
        const isDom = element instanceof HTMLElement
        if (isDom) {
          element.style.backgroundColor = backgroundColor
        }
        screenfull.toggle(isDom ? element : null)
      },
      false
    )
  }
})
