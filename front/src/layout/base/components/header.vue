<template>
  <div class="base-layout-header">
    <i
      class="collapse-icon"
      :class="[isCollapse ? 'el-icon-right' : 'el-icon-back']"
      @click="handleCollapseIcon"
    />
    <TBreadcrumb
      v-if="breadcrumbEnum.length && $store.state.isShowBaseLayoutBreadcrumb"
      :breadcrumbEnum="breadcrumbEnum"
    />
    <span class="space" />
    <!-- <TSearchRoutes v-if="$store.state.isOpenRoutesSearch" />
    <TMultilingual v-if="$store.state.isOpenMultilingual" />
    <TFullScreen v-if="$store.state.isOpenFullScreen" /> -->
    <!-- <headerHandle /> -->
    <HeaderDropdown />
  </div>
</template>

<script>
// import headerHandle from './headerHandle'
import TBreadcrumb from './breadcrumb'
// import TFullScreen from './fullScreen'
// import TMultilingual from './multilingual'
// import TSearchRoutes from './searchRoutes'
import HeaderDropdown from './headerDropdown'
import EventBus from '@/assets/js/utils/event'
export default {
  name: 't-header',
  components: {
    // headerHandle,
    TBreadcrumb,
    // TFullScreen,
    // TMultilingual,
    // TSearchRoutes
    HeaderDropdown
  },
  props: {},
  data () {
    return {
      isCollapse: false,
      breadcrumbEnum: []
    }
  },
  computed: {},
  methods: {
    handleCollapseIcon () {
      this.isCollapse = !this.isCollapse
      EventBus.$emit('handle-collapse-sider', this.isCollapse)
    },
    // 获取面包屑数据
    getRouteMatched () {
      // 截取掉 this.$route.macthed 的第一个，因为第一个是布局用的
      const matched = this.$route.matched.filter((i, index) => index !== 0)
      const needInfo = matched.map((i) => ({
        title: i.meta.title || '暂无meta',
        path: i.path,
        redirect: i.redirect
      }))
      if (!needInfo[0].path.includes('/dashboard')) {
        needInfo.unshift({
          path: '/dashboard',
          title: '首页'
        })
      }
      this.breadcrumbEnum = needInfo
    }
  },
  created () {
    this.getRouteMatched()
  },
  mounted () { },
  watch: {
    '$route.path' () {
      this.getRouteMatched()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/mixin.scss';
.base-layout-header {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  @include gradient(rgba(0, 0, 0, 0.2), #fff);
  line-height: 50pxs;
  .collapse-icon {
    width: 50px;
    height: 100%;
    line-height: 50px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: lightblue;
    }
  }
  .space {
    flex: 1;
  }
}
</style>
