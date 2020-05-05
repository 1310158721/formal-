const pageHeaderRoutes = [
  {
    path: '/pageHeaderRoutes',
    name: 'pageHeaderRoutes',
    meta: {
      isNotTabRoute: true
    },
    component: () => import(/* webpackChunkName: "pageHeaderRoutes" */ '@/layout/pageHeader/pageHeader'),
    children: [
      {
        path: '/permission-operation',
        name: 'permission-operation',
        meta: {
          title: '权限用户',
          isNotTabRoute: true
        },
        component: () => import('@/views/permission/operation/operation')
      },
      {
        path: '/check-article',
        name: 'check-article',
        meta: {
          title: '查看文章',
          isNotTabRoute: true
        },
        component: () => import('@/views/article/checkArticle/checkArticle')
      }
    ]
  }
]

export default pageHeaderRoutes
