<template>
  <div class="my-aside-wrapper" id='guide-aside'>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
      v-if="list"
      mode="vertical"
      background-color="rgb(38, 52, 69)"
      text-color="rgb(191, 203, 217)"
      unique-opened
    >
      <TSiderItem
        v-for="(item, index) in list"
        :item="item"
        :key="item.path"
        :index="index + ''"
        :isFirstLoopItem="true"
        :isCollapse="isCollapse"
      />
    </el-menu>
  </div>
</template>

<script>
import TSiderItem from './siderItem'
import EventBus from '@/assets/js/utils/event'
export default {
  name: 't-sider',
  components: {
    TSiderItem
  },
  data () {
    return {
      isCollapse: false,
      list: null,
      isOpenLogo: null
    }
  },
  methods: {},
  created () {
    this.isOpenLogo = this.$store.state.isOpenLogow
    this.list = this.$store.state.menuList
    EventBus.$on('handle-collapse-sider', params => {
      this.isCollapse = params
    })
  }
}
</script>

<style lang="scss" scoped>
.my-aside-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .my-logo {
    height: 50px;
    background-color: black;
    color: white;
    font-size: 20px;
  }
  .el-menu-vertical-demo {
    flex: 1;
    height: 100%;
    min-width: 64px;
    overflow-y: auto;
    border-right: none;
    /* 设置滚动条的样式 */
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    /* 滚动槽 */
    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      width: 200px !important;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.5);
      padding: 0;
      margin: 0;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    flex: 1;
    width: 200px;
    min-height: 400px;
    max-height: 100vh;
  }
}
</style>
