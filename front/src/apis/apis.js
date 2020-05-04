import axios from 'axios'
import jsCookie from 'js-cookie'

// 是否开启本地 mock 模式
const isMock = false

// 登录接口
export const login = async (params) => {
  isMock && jsCookie.set('token', 'token')
  return await isMock ? axios.get(`../mock/login.json?t=${Date.now()}`, { params }) : axios.post('/login', params)
}

// 单用户信息
export const checkUser = async (params) => {
  const url = isMock ? `../mock/user.json?t=${Date.now()}` : '/checkUser'
  return await axios.get(url, { params })
}

// 创建权限用户
export const registerUser = async (params) => {
  return await isMock ? axios.get(`../mock/registerUser.json?${Date.now()}`, { params }) : axios.post('/registerUser', params)
}

// 删除用户
export const deleteUser = async (params) => {
  const url = isMock ? `../mock/deleteUser.json?t=${Date.now()}` : '/deleteUser'
  return await axios.get(url, { params })
}

/**
 * 更新用户
 */
export const updateUser = async (params) => {
  return await isMock ? axios.get(`../mock/updateUser.json?t=${Date.now()}`, { params }) : axios.post('/updateUser', params)
}

// 权限 -> 用户列表
export const checkAllUsers = async (params) => {
  const url = isMock ? `../mock/checkAllUsers.json?t=${Date.now()}` : '/checkAllUsers'
  return await axios.get(url, { params })
}

// base-layout 的权限菜单接口(单个用户的权限菜单)
export const checkUserMenu = async (params) => {
  const url = isMock ? `../mock/checkUserMenu.json?t=${Date.now()}` : '/checkUserMenu'
  return await axios.get(url, { params })
}

// 权限编辑 -> 所有菜单
export const checkAllMenu = async () => {
  const url = isMock ? `../mock/checkAllMenu.json?t=${Date.now()}` : '/checkAllMenu'
  return await axios.get(url)
}

// 待办事项
export const nextTodoList = async (params) => {
  const url = isMock ? `../mock/nextTodo/list.json?t=${Date.now()}` : '/checkUserNextList'
  return await axios.get(url, { params })
}

// 新增待办事项
export const createNextTodoList = async (params) => {
  return await isMock ? axios.get(`../mock/nextTodo/create.json?t=${Date.now()}`, { params }) : axios.post('/createUserNextTodoItem', params)
}

// 删除待办事项
export const deleteNextTodoList = async (params) => {
  return await isMock ? axios.get(`../mock/nextTodo/delete.json?t=${Date.now()}`, { params }) : axios.get('/deleteUserNextTodoItem', { params })
}
