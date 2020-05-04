<template>
  <t-table
    class="list-wrapper"
    :isLoading='isLoading'
    :data='data'
    :openFilter="true"
    :pagination='pagination'
    :sizeChange="handleSizeChange"
    :currentChange="handleCurrentChange"
  >
    <template #filter>
      <el-button class="mgr-24" type="primary" size="small" @click='createItem'>
        新增
      </el-button>
      <span class="space"></span>
      <el-input class="input-w-300" size="small" type='text' v-model='params.keyword' @keydown.enter.native="handleSearch">
        <el-button size="small" type="primary" slot="append" icon="el-icon-search" v-t-throttle='searchOptions'></el-button>
      </el-input>
    </template>
    <template #table>
      <el-table-column prop="desc" label="简述" align="center" />
      <el-table-column label="创建时间" align="center" width='250'>
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime | t-time-format }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click='handleDelete(scope.row._id)'>删除</el-button>
        </template>
      </el-table-column>
    </template>
  </t-table>
</template>

<script>
import { nextTodoList, createNextTodoList, deleteNextTodoList } from '@/apis/apis'
export default {
  name: 't-next-to-do',
  components: {},
  props: {},
  data () {
    return {
      isLoading: false,
      data: null,
      params: {
        page: 1,
        size: 20,
        keyword: null
      },
      pagination: {},
      searchOptions: {
        type: 'onclick',
        fn: this.handleSearch,
        params: []
      }
    }
  },
  computed: {},
  methods: {
    getList () {
      this.isLoading = true
      return new Promise((resolve) => {
        nextTodoList(this.params)
          .then((response) => {
            setTimeout(() => {
              const { result, code } = response.data
              if (code === 0) {
                const { list, total } = result
                this.data = list
                this.pagination.total = total
                this.pagination.page = this.params.page
                this.pagination.size = this.params.size
                this.isLoading = false
              }
            }, this.$store.state.apiDelay)
          })
      })
    },
    // 分页器 size 改变
    handleSizeChange (val) {
      this.params.size = val
      /**
       * 监听数据总条数（非初始化那次）除分页器 size 改变后的值大于等于当前分页器的 page 值
       * 即为监听分页器的 page 值是否变小了
       * 若变小了，则屏蔽掉当次的接口请求（因为触发了 page 的改变，也掉了一次接口），优化处理
       *
       * 该做法的前提是因为 ElementUI 的分页器在 size 改变时会触发 page 改变，且 size 改变优先于 page 改变
       * 此时的 this.params.page 仍未变化，this.params.size 在上面被重置了
       */
      if (
        this.pagination.total &&
        Math.ceil(this.pagination.total / val) >= this.params.page
      ) {
        this.getList()
      }
    },
    // 分页器 page 改变
    handleCurrentChange (val) {
      this.params.page = val
      this.getList()
    },
    handleSearch () {
      this.getList()
    },
    createItem () {
      this.$prompt('请输入相关简述', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,50}$/,
        inputErrorMessage: '长度应在1～50间'
      }).then(({ value }) => {
        createNextTodoList({ desc: value })
          .then((resposne) => {
            const { code, msg } = resposne.data
            if (code === 0) {
              this.$message.success(msg)
              this.getList()
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNextTodoList({ id })
          .then((response) => {
            const { code, msg } = response.data
            if (code === 0) {
              this.$message.success(msg)
              this.getList()
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.getList()
  },
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  width: 100%;
  height: 100%;
  .space {
    flex: 1;
  }
}
</style>
