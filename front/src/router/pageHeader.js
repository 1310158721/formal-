import pageHeaderRoute from '@/layout/pageHeader/pageHeader'
import permissionOperation from '@/views/permission/operation/operation'
import checkArticle from '@/views/article/checkArticle/checkArticle'

const pageHeaderRoutes = [
  {
    path: '/pageHeaderRoutes',
    name: 'pageHeaderRoutes',
    meta: {
      isNotTabRoute: true
    },
    component: pageHeaderRoute,
    children: [
      {
        path: '/permission-operation',
        name: 'permission-operation',
        meta: {
          title: '权限用户',
          isNotTabRoute: true
        },
        component: permissionOperation
      },
      {
        path: '/check-article',
        name: 'check-article',
        meta: {
          title: '查看文章',
          isNotTabRoute: true
        },
        component: checkArticle
      }
    ]
  }
]

export default pageHeaderRoutes
