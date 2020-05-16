<template>
  <div class="fullscreen-wrapper mgr-12">
    <i v-t-full-screen="options" class="iconfont" :class="isFullScreen ? 'icon-tuichuquanping' : 'icon-quanping'"></i>
  </div>
</template>

<script>
export default {
  name: 'fullscreen',
  components: {},
  props: {},
  data () {
    return {
      isFullScreen: false,
      options: {
        fnCallback: () => {
          this.isFullScreen = !this.isFullScreen
        }
      }
    }
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.fullscreen-wrapper {
  width: 18px;
  height: 50px;
  line-height: 50px;
  i {
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
