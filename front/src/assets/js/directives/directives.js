import './clipboard'
import './fullScreen'
import './throttle'
import './debounce'
import './permission'

/**
 * 节流函数
 * @param {需要节流的函数} fn
 * @param {规定的时间内} delay
 * 因为 arguments 的原因，不能使用箭头函数处理
 */

export function throttle (fn, delay) {
  /* 获取接收的参数，排除掉前两位固定的参数 */
  const params = [...arguments].splice(2)
  /* 用户执行时的时间，初始值为 0 */
  let clickTime = 0
  return function () {
    /* 用户执行时的时间戳 */
    const now = Date.now()
    /* 若用户执行时的时间戳 - 用户执行时的时间 > 规定时间  */
    if (now - clickTime > delay) {
      /* 执行函数，并将参数设置到函数的 arguments 对象中 */
      fn.call(this, ...params)
      /* 将用户执行时的时间戳赋值给用户执行时的时间 */
      clickTime = now
    }
  }
}

/**
 * 节流函数
 * @param {需要防抖的函数} fn
 * @param {规定的时间内} delay
 */
export function debounce (fn, delay) {
  /* 获取接收的参数，排除掉前两位固定的参数 */
  const params = [...arguments].splice(2)
  var timer = null
  return function () {
    /* 清除上一次的定时器 */
    clearTimeout(timer)
    /* 重新设置新的演延时器 */
    timer = setTimeout(function () {
      fn.call(this, ...params)
    }, delay)
  }
}
