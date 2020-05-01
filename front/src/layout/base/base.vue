<template>
  <el-container id="base-layout-wrapper">
    <TSider />
    <el-container class="base-layout-main">
      <THeader class="base-layout-header" />
      <TMain />
    </el-container>
  </el-container>
</template>

<script>
import TSider from './components/slide'
import THeader from './components/header'
import TMain from './components/main'
export default {
  name: 'base-layout',
  components: {
    TSider,
    THeader,
    TMain
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
  height: 100vh;
  background-color: lightgreen;
  .base-layout-main {
    display: flex;
    flex-direction: column;
    .base-layout-header {
      height: 50px;
      width: 100%;
    }
  }
}
</style>
