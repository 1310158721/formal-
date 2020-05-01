import axios from 'axios'
import jsCookie from 'js-cookie'

// 是否开启本地 mock 模式
const isMock = true

// 登录接口(记得修改成 Post 请求)
export const login = async (params) => {
  isMock && jsCookie.set('token', 'token')
  return await isMock ? axios.get(`../mock/login.json?t=${Date.now()}`, { params }) : axios.post('/login', params)
}

// 单用户信息
export const checkUserPermission = async (params) => {
  const url = isMock ? `../mock/user.json?t=${Date.now()}` : `../mock/user.json?t=${Date.now()}`
  return await axios.get(url, { params })
}

// base-layout 的权限菜单接口(单个用户的权限菜单)
export const getMenuList = async (params) => {
  const url = isMock ? `../mock/menu.json?t=${Date.now()}` : '/checkUserPermissionMenuList'
  return await axios.get(url, { params })
}

// 权限 -> 用户列表
export const getPermisionUsersList = async (params) => {
  const url = isMock ? `../mock/users.json?t=${Date.now()}` : `../mock/users.json?t=${Date.now()}`
  return await axios.get(url, { params })
}

// 权限编辑 -> 所有菜单
export const checkAllMenuList = async () => {
  const url = isMock ? `../mock/menu.json?t=${Date.now()}` : `../mock/menu.json?t=${Date.now()}`
  return await axios.get(url)
}
