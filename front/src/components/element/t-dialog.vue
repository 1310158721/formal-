<!--
  封装 el-dialog 组件，再起基础上设置一些默认配置
-->
<template>
  <el-dialog
    custom-class="t-dialog-wrapper"
    :visible.sync="visible"
    :modal-append-to-body='modalAppendToBody'
    :append-to-body='appendToBody'
    :close-on-click-modal='closeOnClickModal'
    :close-on-press-escape='closeOnPressEscape'
    v-bind='$attrs'
    v-on='$listeners'
    :title='title'
    :width='width'
    :before-close="dialogClose"
  >
    <slot name='body'>
      <span>这是一段默认信息</span>
    </slot>
    <span v-if='showFooter' slot="footer" class="dialog-footer">
      <slot name='footer'></slot>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 't-dialog',
  components: {},
  // props 为默认配置
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '我是默认标题'
    },
    width: {
      type: String,
      default: '520px'
    },
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    dialogClose: {
      type: Function,
      default: () => {}
    },
    showFooter: {
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
@import '@/assets/styles/scss/mixin.scss';
/deep/.el-dialog {
  .el-dialog__header {
    height: 54px;
    padding: 18px 24px;
    box-sizing: border-box;
    @include gradient(rgba(0,0,0,.2), #fff);
    .el-dialog__title {
      font-size: 18px;
      line-height: 18px;
    }
  }
  .el-dialog__body {
    padding: 24px;
    box-sizing: border-box;
  }
  .el-dialog__footer {
    height: 54px;
    padding: 11px 24px;
    box-sizing: border-box;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    .el-button {
      width: 120px;
    }
  }
}
</style>
