<template>
  <el-container id="base-layout-wrapper">
    <TSider />
    <el-container class="base-layout-main">
      <THeader class="base-layout-header" />
      <Ttab v-if='$store.state.isOpenBaseLayoutTabRoutes' />
      <TMain class="base-layout-view" />
    </el-container>
    <t-globla-base-layout-drawer />
  </el-container>
</template>

<script>
import TSider from './components/slide'
import THeader from './components/header'
import TMain from './components/main'
import Ttab from './components/tabRoutes'
export default {
  name: 'base-layout',
  components: {
    TSider,
    THeader,
    TMain,
    Ttab
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
#base-layout-wrapper {
  width: 100vw;
  min-width: 1080px;
  height: 100vh;
  .base-layout-main {
    display: flex;
    flex-direction: column;
    .base-layout-header {
      width: 100%;
    }
    .base-layout-view {
      padding: 24px;
      box-sizing: border-box;
    }
  }
}
</style>
