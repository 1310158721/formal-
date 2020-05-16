import menuList from './details/menuList'
import nextTodo from './details/nextTodo'

const en = {
  // 导航菜单、tabRoutes、面包屑
  menuList: menuList.en,
  // 待办事项
  nextTodo: nextTodo.en,
  // 指令多语言设置
  directives: {
    // 复制粘贴
    clipboard: {
      固定的文本: 'Dynamic fixed text',
      复制: 'copy',
      动态的文本: 'Dynamic text',
      请输入需要复制的文本: 'Please enter the text to be copied',
      复制内容不能为空: 'Copy content cannot be empty',
      复制成功: 'Copy successful'
    }
  }
}

export default en
