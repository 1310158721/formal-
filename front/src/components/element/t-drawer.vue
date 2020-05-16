<!--
  该组件是对 elemenui Drawer 的二次封装
  主要是重置了一些默认配置，避免每次调用elementui Drawer 组件时都要去重置某些参数
-->
<template>
  <el-drawer
    class="t-drawer-wrapper"
    :visible.sync="visible"
    :append-to-body='appendToBody'
    :close-on-press-escape='closeOnPressEscape'
    v-bind='$attrs'
    v-on='$listeners'
  >
    <slot></slot>
  </el-drawer>
</template>

<script>
export default {
  name: 't-drawer',
  components: {},
  // 设置默认值
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    // Drawer自身是否插入body
    appendToBody: {
      type: Boolean,
      default: true
    },
    // 是否可以通过按下 ESC 关闭 Drawer
    closeOnPressEscape: {
      type: Boolean,
      default: false
    }
  },
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
// @import '@/assets/styles/scss/index.scss';
@import '@/assets/styles/scss/mixin.scss';
// 设置默认样式
.t-drawer-wrapper {
  /deep/.el-drawer {
    .el-drawer__header {
      padding: 18px 24px;
      margin: 0;
      height: 21px;
      line-height: 21px;
      font-size: 18px;
      font-weight: bold;
      // border-bottom: 1px $border-color solid;
      @include gradient(rgba(0,0,0,.2), #fff);
      & > * {
        outline: none;
      }
      .el-drawer__close-btn {
        &:hover {
          font-weight: bold;
          color: red;
        }
      }
    }
    .el-drawer__body {
      padding: 24px;
    }
  }
}
</style>
