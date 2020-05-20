<template>
  <t-table
    class="list-wrapper"
    :isLoading="isLoading"
    :data="data"
    :openFilter="true"
    :pagination="pagination"
    :sizeChange="handleSizeChange"
    :currentChange="handleCurrentChange"
    :row-class-name="setRowClass"
  >
    <template #filter>
      <el-button v-t-permission='"NEXTCREATE"' class="mgr-24" type="primary" size="small" @click="createItem">
        {{ $t('nextTodo.新增') }}
      </el-button>
      <span class="space"></span>
      <el-input
        class="input-w-300"
        size="small"
        type="text"
        :placeholder="$t('nextTodo.searchPlaceholder')"
        v-model="params.keyword"
        @keydown.enter.native="handleSearch"
      >
        <el-button
          size="small"
          type="primary"
          slot="append"
          icon="el-icon-search"
          v-t-throttle="searchOptions"
        ></el-button>
      </el-input>
    </template>
    <template #table>
      <el-table-column :label="$t('nextTodo.序号')" align="center" width="60">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="desc" :label="$t('nextTodo.简述')" align="center" />
      <el-table-column :label="$t('nextTodo.创建时间')" align="center" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime | timeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if='$permission("NEXTDELETE,NEXTSETTOP,NEXTCANCELTOP,NEXTEDIT")' :label="$t('nextTodo.操作')" align="center" width="120">
        <template slot-scope="scope">
          <t-dropdown
            trigger="click"
            class="list-dropdown"
            size="small"
            :dropdownItemEnum="dropdownItemEnum(scope.row)"
          />
        </template>
      </el-table-column>
    </template>
  </t-table>
</template>

<script>
import { NEXTTODO } from '@/apis/apis'
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
    /**
     * 获取列表数据
     */
    getList () {
      this.isLoading = true
      return new Promise(resolve => {
        NEXTTODO.nextTodoList(this.params).then(response => {
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

    /**
     * 新增表格 item
     */
    createItem () {
      this.$prompt(this.$t('nextTodo.createPromptTitle'), '', {
        inputValue: null,
        confirmButtonText: this.$t('nextTodo.createConfirmSure'),
        cancelButtonText: this.$t('nextTodo.createConfirmCancel'),
        inputPattern: /^.{1,50}$/,
        inputErrorMessage: this.$t('nextTodo.createInputErrorMessage')
      })
        .then(({ value }) => {
          NEXTTODO.createNextTodoList({ desc: value }).then(resposne => {
            const { code } = resposne.data
            if (code === 0) {
              this.$message.success(this.$t('nextTodo.createSuccess'))
              this.getList()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('nextTodo.createCancelTip')
          })
        })
    },

    /**
     * 删除下拉选项
     */
    handleDelete (id) {
      this.$confirm(this.$t('nextTodo.DeleteConfirmTitle'), this.$t('nextTodo.DeleteConfirmTip'), {
        confirmButtonText: this.$t('nextTodo.DeleteConfirmSure'),
        cancelButtonText: this.$t('nextTodo.DeleteConfirmCancel'),
        type: 'warning'
      })
        .then(() => {
          NEXTTODO.deleteNextTodoList({ id }).then(response => {
            const { code } = response.data
            if (code === 0) {
              this.$message.success(this.$t('nextTodo.deleteSuccess'))
              this.getList()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('nextTodo.DeleteConfirmCancelText')
          })
        })
    },

    /**
     * 编辑下拉选项
     */
    handleEdit (id) {
      NEXTTODO.checkNextTodoList({ id }).then(response => {
        const { code, result } = response.data
        if (code === 0) {
          const { desc } = result
          this.$prompt(this.$t('nextTodo.EditPromptTitle'), '', {
            inputValue: desc,
            confirmButtonText: this.$t('nextTodo.EditPromptConfirmSure'),
            cancelButtonText: this.$t('nextTodo.EditPromptConfirmCancel'),
            inputPattern: /^.{1,50}$/,
            inputErrorMessage: this.$t('nextTodo.EditPromptInputErrorMessage')
          })
            .then(({ value }) => {
              NEXTTODO.updateNextTodoList({ id, desc: value }).then(resposne => {
                const { code } = resposne.data
                if (code === 0) {
                  this.$message.success(this.$t('nextTodo.editSuccess'))
                  this.getList()
                }
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: this.$t('nextTodo.EditPromptCancelText')
              })
            })
        }
      })
    },

    /**
     * 点击置顶下拉选项，设置表格当前行为置顶状态
     */
    handleSetTop (id) {
      this.$confirm(this.$t('nextTodo.SetTopConfirmTitle'), this.$t('nextTodo.SetTopConfirmTip'), {
        confirmButtonText: this.$t('nextTodo.SetTopConfirmSure'),
        cancelButtonText: this.$t('nextTodo.SetTopConfirmCancel'),
        type: 'warning'
      })
        .then(() => {
          this.setListItemTop({ id })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('nextTodo.SetTopConfirmCancelText')
          })
        })
    },

    /**
     * 点击取消置顶下拉选项，取消表格当前行的置顶状态
     */
    handleCancelTop (id) {
      this.$confirm(this.$t('nextTodo.CancelTopConfirmTitle'), this.$t('nextTodo.CancelTopConfirmTip'), {
        confirmButtonText: this.$t('nextTodo.CancelTopConfirmSure'),
        cancelButtonText: this.$t('nextTodo.CancelTopConfirmCancel'),
        type: 'warning'
      })
        .then(() => {
          this.cancelListItemTop({ id })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('nextTodo.CancelTopConfirmCancelText')
          })
        })
    },

    /**
     * 设置表格当前行为置顶状态接口简单封装
     */
    setListItemTop (params) {
      return new Promise(resolve => {
        NEXTTODO.setNextItemTop(params)
          .then(response => {
            const { code } = response.data
            if (code === 0) {
              this.$message.success(this.$t('nextTodo.setTopSuccess'))
              this.getList()
                .then(() => {
                  resolve()
                })
            }
          })
      })
    },

    /**
     * 取消表格当前行的置顶状态接口简单封装
     */
    cancelListItemTop (params) {
      return new Promise(resolve => {
        NEXTTODO.cancelNextItemTop(params)
          .then(response => {
            const { code } = response.data
            if (code === 0) {
              this.$message.success(this.$t('nextTodo.cancelTopSuccess'))
              this.getList()
                .then(() => {
                  resolve()
                })
            }
          })
      })
    },

    /**
     * 分页器 size 改变
     */
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

    /**
     * 分页器 page 改变
     */
    handleCurrentChange (val) {
      this.params.page = val
      this.getList()
    },

    /**
     * 搜索表格数据
     */
    handleSearch () {
      this.getList()
    },

    /**
     * 生成下拉数据，可接受表格当前行的数据为参数
     */
    dropdownItemEnum ({ _id, url, isTop }) {
      const { hasPermission } = this.$store.state.userInfo
      const dropdownItemEnum = [
        {
          label: this.$t('nextTodo.删除'),
          attrs: {
            command: 'delete'
          },
          fnCallback: command => {
            this.handleDelete(_id)
          },
          isExsit: hasPermission.includes('NEXTDELETE')
        },
        {
          label: this.$t('nextTodo.编辑'),
          attrs: {
            command: 'edit'
          },
          fnCallback: command => {
            this.handleEdit(_id)
          },
          isExsit: hasPermission.includes('NEXTEDIT')
        },
        {
          label: this.$t('nextTodo.置顶'),
          attrs: {
            command: 'setTop'
          },
          fnCallback: command => {
            this.handleSetTop(_id)
          },
          isExsit: hasPermission.includes('NEXTSETTOP') && !isTop
        },
        {
          label: this.$t('nextTodo.取消置顶'),
          attrs: {
            command: 'cancelTop'
          },
          fnCallback: command => {
            this.handleCancelTop(_id)
          },
          isExsit: hasPermission.includes('NEXTCANCELTOP') && isTop
        }
      ]

      return dropdownItemEnum.filter((i) => i.isExsit)
    },

    /**
     * 设置表格行的类名
     */
    setRowClass ({ row }) {
      const { isTop } = row
      if (isTop) {
        return 'is-set-top'
      }
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
@import "@/assets/styles/scss/mixin.scss";
.list-wrapper {
  width: 100%;
  height: 100%;
  .space {
    flex: 1;
  }
  .list-dropdown {
    cursor: pointer;
    width: 98px;
  }
  /deep/tr.is-set-top {
    @include gradient(rgba(0, 0, 0, 0.2), #fff);
  }
}
</style>
