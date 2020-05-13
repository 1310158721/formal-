import axios from 'axios'
import jsCookie from 'js-cookie'

// 是否开启本地 mock 模式
const isMock = false

/**
 * mock 数据路径匹配
 * @param {mock 文件存在的文件夹名称} directory
 * @param {mock 文件的文件名称} fileName
 */
const formatUrl = (directory, fileName) => {
  return `../mock/user/${fileName}.json?t=${Date.now()}`
}

// 用户相关接口
class User {
  // 登录
  async login (params) {
    isMock && jsCookie.set('token', 'token')
    return await isMock
      ? axios.get(formatUrl('user', 'login'), { params })
      : axios.post('/login', params)
  }

  // 查看单个用户信息
  async checkUser (params) {
    return await isMock
      ? axios.get(formatUrl('user', 'user'), { params })
      : axios.get('/checkUser', { params })
  }

  // 用户注册
  async registerUser (params) {
    return await isMock
      ? axios.get(formatUrl('user', 'registerUser'), { params })
      : axios.post('/registerUser', params)
  }

  // 删除用户
  async deleteUser (params) {
    return await isMock
      ? axios.get(formatUrl('user', 'deleteUser'), { params })
      : axios.get('/deleteUser', { params })
  }

  // 更新用户
  async updateUser (params) {
    return await isMock
      ? axios.get(formatUrl('user', 'updateUser'), { params })
      : axios.post('/updateUser', params)
  }

  // 用户列表
  async checkAllUsers (params) {
    return await isMock
      ? axios.get(formatUrl('user', 'checkAllUsers'), { params })
      : axios.get('/checkAllUsers', { params })
  }
}

// 菜单相关
class Menulist {
  // 用户权限菜单
  async checkUserMenu (params) {
    return await isMock
      ? axios.get(formatUrl('menulist', 'checkUserMenu'), { params })
      : axios.get('/checkUserMenu', { params })
  }

  // 数据库已有菜单，用于用户权限编辑
  async checkAllMenu () {
    return await isMock
      ? axios.get(formatUrl('menulist', 'checkAllMenu'))
      : axios.get('/checkAllMenu')
  }
}

// 待办事项相关接口
class NextTodo {
  // 待办事项列表
  async nextTodoList (params) {
    return await isMock
      ? axios.get(formatUrl('nextTodo', 'list'), { params })
      : axios.get('/checkUserNextList', { params })
  }

  // 新增待办事项
  async createNextTodoList (params) {
    return await isMock
      ? axios.get(formatUrl('nextTodo', 'create'), { params })
      : axios.post('/createUserNextTodoItem', params)
  }

  // 删除待办事项
  async asyncdeleteNextTodoList (params) {
    return await isMock
      ? axios.get(formatUrl('nextTodo', 'delete'), { params })
      : axios.get('/deleteUserNextTodoItem', { params })
  }

  // 查看待办事项
  async checkNextTodoList (params) {
    return await isMock
      ? axios.get(formatUrl('nextTodo', 'check'), { params })
      : axios.post('/checkUserNextTodoItem', params)
  }

  // 更新待办事项
  async updateNextTodoList (params) {
    return await isMock
      ? axios.get(formatUrl('nextTodo', 'update'), { params })
      : axios.post('/updateUserNextTodoItem', params)
  }

  // 置顶待办事项
  async setNextTodoListItemTop (params) {
    return await isMock
      ? axios.get(formatUrl('nextTodo', 'top'), { params })
      : axios.post('/setNextTodoListItemTop', params)
  }

  // 取消置顶待办事项
  async cancelNextTodoListItemTop (params) {
    return await isMock
      ? axios.get(formatUrl('nextTodo', 'top'), { params })
      : axios.post('/cancelNextTodoListItemTop', params)
  }
}

// 文章相关接口
class Article {
  // 创建文章
  async createArticle (params) {
    return await isMock
      ? axios.get(formatUrl('article', 'create'), { params })
      : axios.post('/createArticle', params)
  }

  // 获取文章列表
  async checkArticleList (params) {
    return await isMock
      ? axios.get(formatUrl('article', 'list'), { params })
      : axios.get('/checkArticleList', { params })
  }

  // 删除文章列表
  async deleteArticle (params) {
    return await isMock
      ? axios.get(formatUrl('article', 'delete'), { params })
      : axios.get('/deleteArticle', { params })
  }

  // 查询单条文章数据
  async checkArticleListItem (params) {
    return await isMock
      ? axios.get(formatUrl('article', 'checkArticleListItem'), { params })
      : axios.get('/checkArticleListItem', { params })
  }

  // 更新单条文章数据
  async updateArticleListItem (params) {
    return await isMock
      ? axios.get(formatUrl('article', 'update'), { params })
      : axios.post('/updateArticleListItem', params)
  }

  // 置顶单条文章列表信息
  async setTopArticleListItem (params) {
    return await isMock
      ? axios.get(formatUrl('article', 'top'), { params })
      : axios.post('/setTopArticleListItem', params)
  }

  // 取消置顶单条文章列表信息
  async cancelSetTopArticleListItem (params) {
    return await isMock
      ? axios.get(formatUrl('article', 'top'), { params })
      : axios.post('/cancelSetTopArticleListItem', params)
  }

  // 获取文章所有 tags 枚举
  async getArticleTagsEnum (params) {
    return await isMock
      ? axios.get(formatUrl('article', 'enum'), { params })
      : axios.post('/getArticleTagsEnum', params)
  }
}

// 插件列表相关接口
class Plugins {
  // 查看插件列表
  async checkPluginList (params) {
    return await isMock
      ? axios.get(formatUrl('plugins', 'list'), { params })
      : axios.get('/checkPluginList', { params })
  }

  // 新增插件列表信息
  async createPluginListItem (params) {
    return await isMock
      ? axios.get(formatUrl('plugins', 'create'), { params })
      : axios.post('/createPluginListItem', params)
  }

  // 删除插件列表信息
  async deletePluginListItem (params) {
    return await isMock
      ? axios.get(formatUrl('plugins', 'delete'), { params })
      : axios.post('/deletePluginListItem', params)
  }

  // 查看单条插件列表信息
  async checkPluginListItem (params) {
    return await isMock
      ? axios.get(formatUrl('plugins', 'check'), { params })
      : axios.get('/checkPluginListItem', { params })
  }

  // 更新单条插件列表信息
  async updatePluginListItem (params) {
    return await isMock
      ? axios.get(formatUrl('plugins', 'update'), { params })
      : axios.post('/updatePluginListItem', params)
  }

  // 置顶单条插件列表信息
  async setTopPluginListItem (params) {
    return await isMock
      ? axios.get(formatUrl('plugins', 'top'), { params })
      : axios.post('/setTopPluginListItem', params)
  }

  // 取消置顶单条插件列表信息
  async cancelSetTopPluginListItem (params) {
    return await isMock
      ? axios.get(formatUrl('plugins', 'top'), { params })
      : axios.post('/cancelSetTopPluginListItem', params)
  }
}

export const USER = new User()
export const MENULIST = new Menulist()
export const ARTICLE = new Article()
export const NEXTTODO = new NextTodo()
export const PLUGINS = new Plugins()
