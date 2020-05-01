const fixedRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/layout/login/login')
  }
]

export default fixedRoutes
