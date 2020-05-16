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
  async getUsers (params) {
    return await isMock
      ? axios.get(formatUrl('user', 'getUsers'), { params })
      : axios.get('/getUsers', { params })
  }
}

// 菜单相关
class Menulist {
  // 用户权限菜单
  async getUserMenuList (params) {
    return await isMock
      ? axios.get(formatUrl('menulist', 'getUserMenuList'), { params })
      : axios.get('/getUserMenuList', { params })
  }

  // 数据库已有菜单，用于用户权限编辑
  async getMenuList () {
    return await isMock
      ? axios.get(formatUrl('menulist', 'getMenuList'))
      : axios.get('/getMenuList')
  }
}

// 待办事项相关接口
class NextTodo {
  // 待办事项列表
  async nextTodoList (params) {
    return await isMock
      ? axios.get(formatUrl('nextTodo', 'list'), { params })
      : axios.get('/getNextList', { params })
  }

  // 新增待办事项
  async createNextTodoList (params) {
    return await isMock
      ? axios.get(formatUrl('nextTodo', 'create'), { params })
      : axios.post('/createNextItem', params)
  }

  // 删除待办事项
  async asyncdeleteNextTodoList (params) {
    return await isMock
      ? axios.get(formatUrl('nextTodo', 'delete'), { params })
      : axios.get('/deleteNextItem', { params })
  }

  // 查看待办事项
  async checkNextTodoList (params) {
    return await isMock
      ? axios.get(formatUrl('nextTodo', 'check'), { params })
      : axios.post('/getNextItem', params)
  }

  // 更新待办事项
  async updateNextTodoList (params) {
    return await isMock
      ? axios.get(formatUrl('nextTodo', 'update'), { params })
      : axios.post('/updateNextItem', params)
  }

  // 置顶待办事项
  async setNextItemTop (params) {
    return await isMock
      ? axios.get(formatUrl('nextTodo', 'top'), { params })
      : axios.post('/setNextItemTop', params)
  }

  // 取消置顶待办事项
  async cancelNextItemTop (params) {
    return await isMock
      ? axios.get(formatUrl('nextTodo', 'top'), { params })
      : axios.post('/cancelNextItemTop', params)
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
  async getArticleList (params) {
    return await isMock
      ? axios.get(formatUrl('article', 'list'), { params })
      : axios.get('/getArticleList', { params })
  }

  // 删除文章列表
  async deleteArticle (params) {
    return await isMock
      ? axios.get(formatUrl('article', 'delete'), { params })
      : axios.get('/deleteArticle', { params })
  }

  // 查询单条文章数据
  async getArticle (params) {
    return await isMock
      ? axios.get(formatUrl('article', 'getArticle'), { params })
      : axios.get('/getArticle', { params })
  }

  // 更新单条文章数据
  async updateArticle (params) {
    return await isMock
      ? axios.get(formatUrl('article', 'update'), { params })
      : axios.post('/updateArticle', params)
  }

  // 置顶单条文章列表信息
  async setArticleItemTop (params) {
    return await isMock
      ? axios.get(formatUrl('article', 'top'), { params })
      : axios.post('/setArticleItemTop', params)
  }

  // 取消置顶单条文章列表信息
  async cancelArticleItemTop (params) {
    return await isMock
      ? axios.get(formatUrl('article', 'top'), { params })
      : axios.post('/cancelArticleItemTop', params)
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
  async getPluginList (params) {
    return await isMock
      ? axios.get(formatUrl('plugins', 'list'), { params })
      : axios.get('/getPluginList', { params })
  }

  // 新增插件列表信息
  async createPluginItem (params) {
    return await isMock
      ? axios.get(formatUrl('plugins', 'create'), { params })
      : axios.post('/createPluginItem', params)
  }

  // 删除插件列表信息
  async deletePluginItem (params) {
    return await isMock
      ? axios.get(formatUrl('plugins', 'delete'), { params })
      : axios.post('/deletePluginItem', params)
  }

  // 查看单条插件列表信息
  async getPluginItem (params) {
    return await isMock
      ? axios.get(formatUrl('plugins', 'check'), { params })
      : axios.get('/getPluginItem', { params })
  }

  // 更新单条插件列表信息
  async updatePluginItem (params) {
    return await isMock
      ? axios.get(formatUrl('plugins', 'update'), { params })
      : axios.post('/updatePluginItem', params)
  }

  // 置顶单条插件列表信息
  async setPluginItemTop (params) {
    return await isMock
      ? axios.get(formatUrl('plugins', 'top'), { params })
      : axios.post('/setPluginItemTop', params)
  }

  // 取消置顶单条插件列表信息
  async cancelPluginItemTop (params) {
    return await isMock
      ? axios.get(formatUrl('plugins', 'top'), { params })
      : axios.post('/cancelPluginItemTop', params)
  }
}

export const USER = new User()
export const MENULIST = new Menulist()
export const ARTICLE = new Article()
export const NEXTTODO = new NextTodo()
export const PLUGINS = new Plugins()
