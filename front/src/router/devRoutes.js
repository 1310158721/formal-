const devRoutes = [
  {
    title: '测试',
    path: '/test',
    name: 'test',
    icon: 'icon-ceshi',
    meta: {
      title: '测试'
    },
    component: () => import(/* webpackChunkName: "test" */ '@/views/test/test'),
    children: []
  }
]

export default devRoutes
