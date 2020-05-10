import dashboard from '@/views/dashboard/dashboard'
import layoutBase from '@/layout/base/base'
import clipboard from '@/views/directives/clipboard/clipboard'
import nextTodo from '@/views/nextTodo/nextTodo'
import article from '@/views/article/article'
import articleOperation from '@/views/article/operation/operation'
import articleList from '@/views/article/list/list'
import charts from '@/views/charts/charts'
import pie from '@/views/charts/pie/pie'
import bar from '@/views/charts/bar/bar'
import editor from '@/views/editor/editor'
import markdown from '@/views/editor/markdown/markdown'
import component from '@/views/components/components'
import dragger from '@/views/components/dragger/dragger'
import viewer from '@/views/components/viewer/viewer'
import qrcode from '@/views/components/qrcode/qrcode'
import tree from '@/views/components/tree/tree'
import upload from '@/views/components/upload/upload'
import directives from '@/views/directives/directives'
import fullscreen from '@/views/directives/fullScreen/fullScreen'
import debounce from '@/views/directives/debounce/debounce'
import throttle from '@/views/directives/throttle/throttle'
import plugins from '@/views/plugins/plugins'
import pluginList from '@/views/plugins/list/list'
import route from '@/views/route/route'
import route11 from '@/views/route/route-1-1'
import route12 from '@/views/route/route-1-2'
import route21 from '@/views/route/route-2-1'
import route22 from '@/views/route/route-2-2'
import permission from '@/views/permission/permission'
import permissionList from '@/views/permission/list/list'

const baseRoutes = [
  // 基本的 base 布局
  {
    path: '/',
    name: '',
    // component: () => import('@/layout/base/base'),
    component: layoutBase,
    redirect: {
      path: '/dashboard'
    },
    children: [
      // 首页
      {
        title: '首页',
        icon: 'icon-ziyuan',
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '首页'
        },
        // component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/dashboard')
        component: dashboard
      },
      // 待办事项
      {
        title: '待办事项',
        icon: 'icon-ziyuan',
        path: '/next-to-do',
        name: 'next-to-do',
        meta: {
          title: '待办事项'
        },
        // component: () => import(/* webpackChunkName: "next-to-do" */ '@/views/nextTodo/nextTodo')
        component: nextTodo
      },
      // 文章
      {
        title: '文章',
        icon: 'icon-ziyuan',
        path: '/article',
        name: 'article',
        meta: {
          title: '文章'
        },
        component: article,
        redirect: {
          path: '/article-list'
        }
      },
      {
        title: '文章操作',
        icon: 'icon-ziyuan',
        path: '/article-operation',
        name: 'article-operation',
        meta: {
          title: '文章操作'
        },
        component: articleOperation
      },
      {
        title: '文章列表',
        icon: 'icon-ziyuan',
        path: '/article-list',
        name: 'article-list',
        meta: {
          title: '文章列表'
        },
        component: articleList
      },
      // 图表
      {
        title: '图表',
        icon: 'icon-tubiao',
        path: '/charts',
        name: 'charts',
        meta: {
          title: '图表'
        },
        component: charts,
        redirect: {
          path: '/pie'
        }
      },
      // 图表 -> 饼形图
      {
        title: '饼形',
        icon: 'icon-tubiao-bingtu',
        path: '/pie',
        name: 'pie',
        meta: {
          title: '饼形'
        },
        component: pie
      },
      // 图表 -> 柱形图
      {
        title: '柱形',
        icon: 'icon-histogram',
        path: '/bar',
        name: 'bar',
        meta: {
          title: '柱形'
        },
        component: bar
      },
      // 编辑器
      {
        title: '编辑器',
        icon: 'icon-htmlbianjiqi',
        path: '/editor',
        name: 'editor',
        redirect: {
          path: '/markdown'
        },
        meta: {
          title: '编辑器'
        },
        component: editor
      },
      {
        title: 'Markdown',
        icon: 'icon-markdown',
        path: '/markdown',
        name: 'markdown',
        meta: {
          title: 'Markdown'
        },
        component: markdown
      },
      // 组件
      {
        title: '组件',
        icon: 'icon-zujian',
        path: '/components',
        name: 'components',
        meta: {
          title: '组件'
        },
        component: component,
        redirect: {
          path: '/viewer'
        }
      },
      // 组件 -> 列表拖拽
      {
        title: '列表拖拽',
        icon: 'icon-tuozhuai',
        path: '/dragger',
        name: 'dragger',
        meta: {
          title: '列表拖拽'
        },
        component: dragger
      },
      // 组件 -> 图片查看器
      {
        title: '图片查看器',
        icon: 'icon-tupian',
        path: '/viewer',
        name: 'viewer',
        meta: {
          title: '图片查看器'
        },
        component: viewer
      },
      // 组件 -> 二维码
      {
        title: '二维码',
        icon: 'icon-ico',
        path: '/qrcode',
        name: 'qrcode',
        meta: {
          title: '二维码'
        },
        component: qrcode
      },
      // 组件 -> 树形控件
      {
        title: '树形控件',
        icon: 'icon-ico',
        path: '/tree',
        name: 'tree',
        meta: {
          title: '树形控件'
        },
        component: tree
      },
      // 组件 -> 文件上传
      {
        title: '文件上传',
        icon: 'icon-ico',
        path: '/upload',
        name: 'upload',
        meta: {
          title: '文件上传'
        },
        component: upload
      },
      // 指令
      {
        title: '指令',
        icon: 'icon-zhilingzichengjiao',
        path: '/directives',
        name: 'directives',
        meta: {
          title: '指令'
        },
        component: directives,
        redirect: {
          path: '/full-screen'
        }
      },
      // 指令 -> 全屏化
      {
        title: '全屏化',
        icon: 'icon-quanping',
        path: '/full-screen',
        name: 'full-screen',
        meta: {
          title: '全屏化'
        },
        component: fullscreen
      },
      {
        title: '复制粘贴',
        icon: 'icon-fuzhi',
        path: '/clipboard',
        name: 'clipboard',
        meta: {
          title: '复制粘贴'
        },
        component: clipboard
      },
      {
        title: '防抖',
        icon: 'icon-fuzhi',
        path: '/debounce',
        name: 'debounce',
        meta: {
          title: '防抖'
        },
        component: debounce
      },
      {
        title: '节流',
        icon: 'icon-fuzhi',
        path: '/throttle',
        name: 'throttle',
        meta: {
          title: '节流'
        },
        component: throttle
      },
      // 常用插件
      {
        title: '常用插件',
        icon: 'icon--luyouguanli',
        path: '/plugins',
        name: 'plugins',
        meta: {
          title: '常用插件'
        },
        component: plugins,
        redirect: {
          path: '/plugin-list'
        }
      },
      {
        title: '插件列表',
        icon: 'icon--luyouguanli',
        path: '/plugin-list',
        name: 'plugin-list',
        meta: {
          title: '插件列表'
        },
        component: pluginList

      },
      // 路由
      {
        title: '嵌套路由',
        icon: 'icon--luyouguanli',
        path: '/route',
        name: 'route',
        meta: {
          title: '嵌套路由'
        },
        component: route,
        redirect: {
          path: '/route-2-1'
        }
      },
      // 路由 -> 一级路由
      {
        title: '一级路由-1',
        path: '/route-1-1',
        name: 'route-1-1',
        meta: {
          title: '一级路由-1'
        },
        component: route11,
        redirect: {
          path: '/route-2-1'
        }
      },
      // 路由 -> 一级路由
      {
        title: '一级路由-2',
        path: '/route-1-2',
        name: 'route-1-2',
        meta: {
          title: '一级路由-2'
        },
        component: route12
      },
      // 路由 -> 二级路由
      {
        title: '二级路由-1',
        path: '/route-2-1',
        name: 'route-2-1',
        meta: {
          title: '二级路由-1'
        },
        component: route21
      },
      // 路由 -> 二级路由
      {
        title: '二级路由-2',
        path: '/route-2-2',
        name: 'route-2-2',
        meta: {
          title: '二级路由-2'
        },
        component: route22
      },
      // 权限
      {
        title: '权限',
        icon: 'icon--luyouguanli',
        path: '/permission',
        name: 'permission',
        meta: {
          title: '嵌套路由'
        },
        component: permission,
        redirect: {
          path: '/permission-list'
        }
      },
      // 权限 -> 用户列表
      {
        title: '用户列表',
        icon: 'icon--luyouguanli',
        path: '/permission-list',
        name: 'permission-list',
        meta: {
          title: '用户列表'
        },
        component: permissionList
      }
    ]
  }
]

export default baseRoutes
