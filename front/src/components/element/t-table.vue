<!--
  该组件将 el-table 与 el-pagination 耦合在一起
  组件外部接收到的所有方法全部都是通过 $listeners 绑定到 el-table 的
  接收到属性除部分在 props 中过滤出来外，剩余的也是通过 $attrs 绑定到 el-table 的

  -> 剩余部分的 pagination 属性和方法待完善
-->
<template>
  <div class="t-table-wrapper">
    <div class="filter-wrapper" v-if="openFilter">
      <slot name="filter" />
    </div>
    <span class="table-wrapper">
      <el-table
        :data="data"
        :border="border"
        :height="height"
        v-bind="$attrs"
        v-on="$listeners"
        v-loading='isLoading'
      >
        <slot name="table" />
      </el-table>
    </span>
    <span class="pagination-wrapper" v-if="pagination">
      <el-pagination
        size="small"
        :current-page="pagination.page"
        :page-sizes="paginationSizes"
        :page-size="pagination.size"
        :layout="paginationLayout"
        :total="pagination.total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </span>
  </div>
</template>

<script>
export default {
  name: 't-table',
  components: {},
  // props所有属性都是重置一些默认设置
  props: {
    data: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    // 开启 filter-wrapper
    openFilter: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    height: {
      type: [String, Number],
      default: '100%'
    },
    // 分页器数据
    pagination: {
      type: Object,
      default: null
    },
    // 默认的分页器尺寸
    paginationSizes: {
      type: Array,
      default: () => [20, 30, 50, 100]
    },
    // 默认的分页器组成部分
    paginationLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    sizeChange: {
      type: Function,
      default: () => {}
    },
    currentChange: {
      type: Function,
      default: () => {}
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
.t-table-wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .filter-wrapper {
    line-height: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
  }
  .table-wrapper {
    flex: 1;
    height: 100%;
    overflow: hidden;
    /deep/.el-table {
      .el-loading-mask {
        background-color: rgba(0,0,0,.5);
      }
    }
  }
  .pagination-wrapper {
    height: 52px;
    padding: 10px 0px;
    border: 1px solid #EBEEF5;
    border-top: 0;
    box-sizing: border-box;
    .el-pagination {
      float: right;
    }
  }
}
</style>
