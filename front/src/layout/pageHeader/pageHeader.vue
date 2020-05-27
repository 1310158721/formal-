<template>
  <div class="page-header-wrapper">
    <div class="header-wrapper">
      <el-page-header @back="goBack" :content="$t('pageHeader.' + $route.meta.title)" />
    </div>
    <div class="content">
      <router-view />
    </div>
    <span id="footer">
      <a class="text" target="_blank" href="http://beian.miit.gov.cn/">
        粤ICP备19147981号-1
      </a>
    </span>
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
@import '@/assets/styles/scss/mixin.scss';
.page-header-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @include gradient(rgba(0,0,0,.2), #fff);
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
  #footer {
    width: 100%;
    position: absolute;
    bottom: 0px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    text-align: center;
    .text {
      padding-left: 96px;
      box-sizing: border-box;
      text-decoration: none;
      color: #939393;
      &:hover {
        color: red;
      }
    }
  }
}
</style>
