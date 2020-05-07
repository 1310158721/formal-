const baseRoutes = [
  // 基本的 base 布局
  {
    path: '/',
    name: '',
    component: () => import('@/layout/base/base'),
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
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/dashboard')
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
        component: () => import(/* webpackChunkName: "next-to-do" */ '@/views/nextTodo/nextTodo')
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
        component: () => import(/* webpackChunkName: "article" */ '@/views/article/article'),
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
        component: () => import(/* webpackChunkName: "articleOperation" */ '@/views/article/operation/operation')
      },
      {
        title: '文章列表',
        icon: 'icon-ziyuan',
        path: '/article-list',
        name: 'article-list',
        meta: {
          title: '文章列表'
        },
        component: () => import(/* webpackChunkName: "article-list" */ '@/views/article/list/list')
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
        component: () => import(/* webpackChunkName: "charts" */ '@/views/charts/charts'),
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
        component: () => import(/* webpackChunkName: "pie" */ '@/views/charts/pie/pie')
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
        component: () => import(/* webpackChunkName: "bar" */ '@/views/charts/bar/bar')
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
        component: () => import(/* webpackChunkName: "editor" */ '@/views/editor/editor')
      },
      {
        title: 'Markdown',
        icon: 'icon-markdown',
        path: '/markdown',
        name: 'markdown',
        meta: {
          title: 'Markdown'
        },
        component: () => import(/* webpackChunkName: "markdown" */ '@/views/editor/markdown/markdown')
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
        component: () => import(/* webpackChunkName: "components" */ '@/views/components/components'),
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
        component: () => import(/* webpackChunkName: "dragger" */ '@/views/components/dragger/dragger')
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
        component: () => import(/* webpackChunkName: "viewer" */ '@/views/components/viewer/viewer')
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
        component: () => import(/* webpackChunkName: "qrcode" */ '@/views/components/qrcode/qrcode')
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
        component: () => import(/* webpackChunkName: "tree" */ '@/views/components/tree/tree')
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
        component: () => import(/* webpackChunkName: "upload" */ '@/views/components/upload/upload')
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
        component: () => import(/* webpackChunkName: "directives" */ '@/views/directives/directives'),
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
        component: () => import(/* webpackChunkName: "fullScreen" */ '@/views/directives/fullScreen/fullScreen')
      },
      {
        title: '复制粘贴',
        icon: 'icon-fuzhi',
        path: '/clipboard',
        name: 'clipboard',
        meta: {
          title: '复制粘贴'
        },
        component: () => import(/* webpackChunkName: "clipboard" */ '@/views/directives/clipboard/clipboard')
      },
      {
        title: '防抖',
        icon: 'icon-fuzhi',
        path: '/debounce',
        name: 'debounce',
        meta: {
          title: '防抖'
        },
        component: () => import(/* webpackChunkName: "debounce" */ '@/views/directives/debounce/debounce')
      },
      {
        title: '节流',
        icon: 'icon-fuzhi',
        path: '/throttle',
        name: 'throttle',
        meta: {
          title: '节流'
        },
        component: () => import(/* webpackChunkName: "throttle" */ '@/views/directives/throttle/throttle')
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
        component: () => import(/* webpackChunkName: "route" */ '@/views/route/route'),
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
        component: () => import(/* webpackChunkName: "route-1-1" */ '@/views/route/route-1-1'),
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
        component: () => import(/* webpackChunkName: "route-1-2" */ '@/views/route/route-1-2')
      },
      // 路由 -> 二级路由
      {
        title: '二级路由-1',
        path: '/route-2-1',
        name: 'route-2-1',
        meta: {
          title: '二级路由-1'
        },
        component: () => import(/* webpackChunkName: "route-2-1" */ '@/views/route/route-2-1')
      },
      // 路由 -> 二级路由
      {
        title: '二级路由-2',
        path: '/route-2-2',
        name: 'route-2-2',
        meta: {
          title: '二级路由-2'
        },
        component: () => import(/* webpackChunkName: "route-2-2" */ '@/views/route/route-2-2')
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
        component: () => import(/* webpackChunkName: "permission" */ '@/views/permission/permission'),
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
        component: () => import(/* webpackChunkName: "permission-list" */ '@/views/permission/list/list')
      }
    ]
  }
]

export default baseRoutes
