import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 模拟接口延迟 500 ms
    apiDelay: 500,
    // 用户信息
    userInfo: null,
    // 菜单导航列表
    menuList: [],
    // 开启 logo
    isOpenLogo: true,
    // 是否固定 Header
    isFixedBaseLayoutHeader: true,
    // 是否显示面包屑 Breadcrumb
    isShowBaseLayoutBreadcrumb: true,
    // 是否开启 tabRoutes
    isOpenBaseLayoutTabRoutes: true,
    // 是否开启全局化
    isOpenFullScreen: true,
    // 是否开启多语言功能
    isOpenMultilingual: true,
    // 是否开启菜单搜索功能
    isOpenRoutesSearch: true,
    // 是否显示全局组件 baseLayoutDrawer
    isShowGlobalBaseLayout: false,
    // 全局 mask
    globalMask: false
  },
  getters: {},
  mutations: {
    SETUSERINFO (state, data = null) {
      state.userInfo = data
    },
    SETMENULIST (state, list) {
      state.menuList = list
    },
    SETOPENLOGO (state, boolean) {
      state.isOpenLogo = boolean
    },
    SETFIXEDBASELAYOUTHEADER (state, boolean) {
      state.isFixedBaseLayoutHeader = boolean
    },
    SETSHOWBASELAYOUTBREADCRUMB (state, boolean) {
      state.isShowBaseLayoutBreadcrumb = boolean
    },
    SETOPENBASELAYOUTTABROUTES (state, boolean) {
      state.isOpenBaseLayoutTabRoutes = boolean
    },
    SETGLOBALBASELAYOUT (state, boolean) {
      state.isShowGlobalBaseLayout = boolean
    },
    SETOPENFULLSCREEN (state, boolean) {
      state.isOpenFullScreen = boolean
    },
    SETOPENMULTILINGUAL (state, boolean) {
      state.isOpenMultilingual = boolean
    },
    SETOPENROUTESSEARCH (state, boolean) {
      state.isOpenRoutesSearch = boolean
    },
    SETGLOBALMASK (state, boolean) {
      state.globalMask = boolean
    }
  },
  actions: {}
})

export default store
