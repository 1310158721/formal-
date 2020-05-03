<template>
  <el-tree
    class="t-tree-wrapper"
    v-if='$attrs.data'
    v-bind="$attrs"
    v-on="$listeners"
    ref="tree"
    :show-checkbox='showCheckbox'
    :default-expand-all='defaultExpandAll'
    :check-strictly='checkStrictly'
    :props="defaultProps"
    :node-key="nodeKey"
  />
</template>

<script>
export default {
  name: 't-tree',
  components: {},
  props: {
    defaultProps: {
      type: Object,
      default: () => ({
        children: 'children',
        label: 'label'
      })
    },
    // 可以看似接收父级的 show-checkbox 属性
    showCheckbox: {
      type: Boolean,
      default: true
    },
    defaultExpandAll: {
      type: Boolean,
      default: true
    },
    checkStrictly: {
      type: Boolean,
      default: true
    },
    nodeKey: {
      type: String,
      default: 'permission'
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    getRefs () {
      return this.$refs.tree
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.t-tree-wrapper {
  &.el-tree {
    background-color: transparent;
    /deep/.el-tree-node {
      background-color: transparent!important;
      .el-tree-node__content {
        background-color: transparent;
      }
    }
  }
}
</style>
