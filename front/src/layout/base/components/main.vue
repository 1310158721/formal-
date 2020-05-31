<template>
  <div class="main-wrapper">
    <router-view class="router-page" />
    <span id="footer">
      <a class="text" target="_blank" href="http://beian.miit.gov.cn/">
        粤ICP备19147981号-1
      </a>
    </span>
  </div>
</template>

<script>
export default {
  name: 't-main',
  components: {},
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
.main-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .router-page {
    flex: 1;
    height: 100%;
  }
  #footer {
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    text-align: center;
    .text {
      text-decoration: none;
      color: #939393;
      &:hover {
        color: red;
      }
    }
  }
}
</style>
