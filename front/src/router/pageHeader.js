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
      }
    ]
  }
]

export default pageHeaderRoutes
