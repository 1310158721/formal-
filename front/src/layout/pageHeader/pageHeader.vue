<template>
  <div class="page-header-wrapper">
    <div class="header-wrapper">
      <el-page-header @back="goBack" :content="$route.meta.title" />
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageHeaderRoutes',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {
    goBack () {
      this.$router.back()
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.page-header-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header-wrapper {
    height: 50px;
    box-sizing: border-box;
    padding: 0px 24px;
    box-shadow: 0 10px 10px rgba(0,0,0,.1);
    .el-page-header {
      line-height: 50px;
    }
  }
  .content {
    flex: 1;
    height: 100%;
    overflow: auto;
  }
}
</style>
