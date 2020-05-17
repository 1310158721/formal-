import menuList from './details/menuList'
import nextTodo from './details/nextTodo'
import article from './details/article'
import permission from './details/permission'
import headerDropdown from './details/headerDropdown'
import directives from './details/directives'
import global from './global/global'
import element from './element/element'
import route from './route/route'

const zh = {
  // 导航菜单多语言设置
  menuList: menuList.zh,
  // 待办事项
  nextTodo: nextTodo.zh,
  // 文章
  article: article.zh,
  // 权限
  permission: permission.zh,
  headerDropdown: headerDropdown.zh,
  directives: directives.zh,
  // 全局
  ...global.zh,
  // element 二次封装组件
  ...element.zh,
  ...route.zh
}

export default zh
