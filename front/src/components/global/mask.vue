<!--
  系统的全局遮罩
-->
<template>
  <div
    class="t-mask-wrapper"
    v-loading="$store.state.globalMask"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  />
</template>

<script>
export default {
  name: 't-global-mask',
  components: {},
  props: {
    loadingText: {
      type: String,
      default: '拼命加载中'
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
  created () { },
  mounted () { },
  watch: {}
}
</script>

<style lang="scss" scoped>
.t-mask-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
}
</style>
