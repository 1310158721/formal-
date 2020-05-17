import menuList from './details/menuList'
import nextTodo from './details/nextTodo'
import article from './details/article'
import permission from './details/permission'
import headerDropdown from './details/headerDropdown'
import directives from './details/directives'
import global from './global/global'
import element from './element/element'
import route from './route/route'

const en = {
  // 导航菜单、tabRoutes、面包屑
  menuList: menuList.en,
  // 待办事项
  nextTodo: nextTodo.en,
  // 文章
  article: article.en,
  // 权限
  permission: permission.en,
  headerDropdown: headerDropdown.en,
  directives: directives.en,
  // 全局
  ...global.en,
  // element 二次封装组件
  ...element.en,
  ...route.en
}

export default en
