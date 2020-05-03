import VueRouter from 'vue-router'
import Vue from 'vue'
import fixedRoutes from './fixedRoutes'
import baseRoutes from './baseRoutes'
import devRoutes from './devRoutes'
import pageHeaderRoutes from './pageHeader'
import store from '@/store/store'
import { checkUserMenu, checkUser } from '@/apis/apis'
import jsCookie from 'js-cookie'

// 页面加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// NProgress 的简单配置
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [...fixedRoutes, ...pageHeaderRoutes]
})

const baseRoutesFirst = baseRoutes[0]
const baseRoutesFirstChildren = baseRoutesFirst.children

// 匹配查询权限菜单列表对应的路由
const matchRoutes = (list) => {
  list.map((i) => {
    const match = baseRoutesFirstChildren.filter((k) => k.title === i.title)
    if (i.children && i.children.length) {
      i.path = match[0].path
      i.icon = match[0].icon
      i.meta = match[0].meta
      i.redirect = match[0].redirect
      i.component = match[0].component
      i.children = matchRoutes(i.children)
    } else {
      i.path = match[0].path
      i.icon = match[0].icon
      i.meta = match[0].meta
      i.component = match[0].component
    }
  })
  return list
}

let tabRoutes = null

// 进入路由前钩子
router.beforeEach((to, from, next) => {
  NProgress.start()
  tabRoutes = window.sessionStorage.getItem('tabRoutes') ? JSON.parse(window.sessionStorage.getItem('tabRoutes')) : [
    {
      path: '/dashboard',
      title: '首页'
    }
  ]
  const token = jsCookie.get('token')
  if (!token) {
    tabRoutes = []
    window.sessionStorage.setItem('tabRoutes', JSON.stringify(tabRoutes))
    if (to.path !== '/login') {
      next({
        path: '/login',
        replace: true
      })
    } else {
      next()
    }
    // 清除用户相关数据
    store.commit('SETUSERINFO', null)
    // 清除权限菜单数据
    store.commit('SETMENULIST', [])
  } else if (!store.state.menuList.length) {
    // 这两个接口应合并为一个同步请求
    checkUser({ token }).then((res) => {
      const { result, code } = res.data
      if (code === 0) {
        store.commit('SETUSERINFO', result)
      }
    })
    checkUserMenu()
      .then((res) => {
        const { result, code } = res.data
        if (code === 0) {
          const menuList = matchRoutes(result)
          baseRoutesFirst.children = [...menuList, ...devRoutes]
          router.addRoutes([baseRoutesFirst])
          store.commit('SETMENULIST', [...result, ...devRoutes])
          next({
            path: to.fullPath,
            replace: true
          })
        }
      })
  } else {
    // tabRoutes 中没有匹配到当前路由时，便添加当前路由
    if (!tabRoutes.filter((i) => to.path === i.path).length) {
      // 是否为菜单栏上面的路由
      if (to.meta && !to.meta.isNotTabRoute) {
        tabRoutes.push({
          path: to.path,
          title: to.meta ? to.meta.title || '暂无meta' : '暂无meta'
        })
        window.sessionStorage.setItem('tabRoutes', JSON.stringify(tabRoutes))
      }
    }
    next()
  }
})

// 进入路由后钩子
router.afterEach(() => {
  NProgress.done()
})

export default router
