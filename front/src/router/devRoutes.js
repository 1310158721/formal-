import test from '@/views/test/test'

const devRoutes = [
  {
    title: '测试',
    path: '/test',
    name: 'test',
    icon: 'icon-ceshi',
    meta: {
      title: '测试'
    },
    component: test,
    children: []
  }
]

export default devRoutes
