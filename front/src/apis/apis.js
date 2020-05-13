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

// 查看待办事项
export const checkNextTodoList = async (params) => {
  return await isMock
    ? axios.get(`../mock/nextTodo/delete.json?t=${Date.now()}`, { params })
    : axios.post('/checkUserNextTodoItem', params)
}

// 更新待办事项
export const updateNextTodoList = async (params) => {
  return await isMock
    ? axios.get(`../mock/nextTodo/delete.json?t=${Date.now()}`, { params })
    : axios.post('/updateUserNextTodoItem', params)
}

// 置顶待办事项
export const setNextTodoListItemTop = async (params) => {
  return await isMock
    ? axios.get(`../mock/nextTodo/top.json?t=${Date.now()}`, { params })
    : axios.post('/setNextTodoListItemTop', params)
}

// 取消置顶待办事项
export const cancelNextTodoListItemTop = async (params) => {
  return await isMock
    ? axios.get(`../mock/nextTodo/top.json?t=${Date.now()}`, { params })
    : axios.post('/cancelNextTodoListItemTop', params)
}

// 创建文章
export const createArticle = async (params) => {
  return await isMock ? axios.get(`../mock/article/create.json?t=${Date.now()}`, { params }) : axios.post('/createArticle', params)
}

// 获取文章列表
export const checkArticleList = async (params) => {
  const url = isMock ? `../mock/article/list?t=${Date.now()}` : '/checkArticleList'
  return await axios.get(url, { params })
}

// 删除文章列表
export const deleteArticle = async (params) => {
  const url = isMock ? `../mock/article/delete?t=${Date.now()}` : '/deleteArticle'
  return await axios.get(url, { params })
}

// 查询单条文章数据
export const checkArticleListItem = async (params) => {
  const url = isMock ? `../mock/article/checkArticleListItem?t=${Date.now()}` : '/checkArticleListItem'
  return await axios.get(url, { params })
}

// 更新单条文章数据
export const updateArticleListItem = async (params) => {
  return await isMock ? axios.get(`../mock/article/update.json?t=${Date.now()}`, { params }) : axios.post('/updateArticleListItem', params)
}

// 置顶单条文章列表信息
export const setTopArticleListItem = async (params) => {
  return await isMock
    ? axios.get(`../mock/article/top.json?t=${Date.now()}`, { params })
    : axios.post('/setTopArticleListItem', params)
}

// 取消置顶单条文章列表信息
export const cancelSetTopArticleListItem = async (params) => {
  return await isMock
    ? axios.get(`../mock/article/top.json?t=${Date.now()}`, { params })
    : axios.post('/cancelSetTopArticleListItem', params)
}

// 获取文章所有 tags 枚举
export const getArticleTagsEnum = async (params) => {
  return await isMock
    ? axios.get(`../mock/article/enum.json?t=${Date.now()}`, { params })
    : axios.post('/getArticleTagsEnum', params)
}

// 查看插件列表
export const checkPluginList = async (params) => {
  const url = isMock ? `../mock/plugins/list.json?t=${Date.now()}` : '/checkPluginList'
  return await axios.get(url, { params })
}

// 新增插件列表信息
export const createPluginListItem = async (params) => {
  return await isMock
    ? axios.get(`../mock/plugins/create.json?t=${Date.now()}`, { params })
    : axios.post('/createPluginListItem', params)
}

// 删除插件列表信息
export const deletePluginListItem = async (params) => {
  return await isMock
    ? axios.get(`../mock/plugins/delete.json?t=${Date.now()}`, { params })
    : axios.post('/deletePluginListItem', params)
}

// 查看单条插件列表信息
export const checkPluginListItem = async (params) => {
  return await isMock
    ? axios.get(`../mock/plugins/check.json?t=${Date.now()}`, { params })
    : axios.get('/checkPluginListItem', { params })
}

// 更新单条插件列表信息
export const updatePluginListItem = async (params) => {
  return await isMock
    ? axios.get(`../mock/plugins/update.json?t=${Date.now()}`, { params })
    : axios.post('/updatePluginListItem', params)
}

// 置顶单条插件列表信息
export const setTopPluginListItem = async (params) => {
  return await isMock
    ? axios.get(`../mock/plugins/top.json?t=${Date.now()}`, { params })
    : axios.post('/setTopPluginListItem', params)
}

// 取消置顶单条插件列表信息
export const cancelSetTopPluginListItem = async (params) => {
  return await isMock
    ? axios.get(`../mock/plugins/top.json?t=${Date.now()}`, { params })
    : axios.post('/cancelSetTopPluginListItem', params)
}
