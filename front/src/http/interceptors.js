/**
 * axios 的拦截器
 */
import axios from 'axios'
import Cookie from 'js-cookie'
import { Message } from 'element-ui'
import qs from 'qs'

// 页面加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// NProgress 的简单配置
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// axios 的全局默认配置
axios.defaults.baseURL = '/api'

/**
 * axios 请求拦截
 */
axios.interceptors.request.use((config) => {
  NProgress.start()

  /* 设置请求头 */
  config.headers = {
    // 和 post 请求参数序列化有关
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    // 请求头添加 Authorization 参数
    Authorization: Cookie.get('token') || 'NOTOKEN'
  }

  /* 当请求方式为 post 时，且不是表单(form data)提交的方式(有可能是 Request payLoad)，则序列化请求参数 */
  if (/^post$/gi.test(config.method)) {
    // 防止 post 请求上传图片时，form data 格式的参数也被序列化了
    if (!(config.data instanceof FormData)) {
      config.data = qs.stringify(config.data)
    }
  }

  return config
}, (err) => {
  console.log(err)
  return Promise.reject(err)
})

/**
 * axios 响应拦截
 */
axios.interceptors.response.use((response) => {
  NProgress.done()
  const { code = 0, msg = '' } = response.data
  if (code !== 0) {
    Message.error(msg)
  }
  return response
}, (err) => {
  console.log(err)
  return err
})
