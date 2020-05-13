<template>
  <t-table
    class="list-wrapper"
    :isLoading="isLoading"
    :data="data"
    :openFilter="true"
    :pagination='pagination'
    :sizeChange="handleSizeChange"
    :currentChange="handleCurrentChange"
    :row-class-name='setRowClass'
  >
    <template #filter>
      <el-button class="mgr-24" type="primary" size="small" @click='handleCreateArticle'>
        新增
      </el-button>
      <t-select class="select-w-120" v-if='tagsEnum.length' :data='tagsEnum' v-model='params.tag' @change='handleTagChange' />
      <span class="space"></span>
      <el-input class="input-w-300" size="small" type='text' v-model='params.keyword' @keydown.enter.native="handleSearch" @input.native='handleInput'>
        <el-button size="small" type="primary" slot="append" icon="el-icon-search" @click='handleSearch'></el-button>
      </el-input>
    </template>
    <template #table>
      <el-table-column prop="title" label="标题" align="center" />
      <el-table-column label="是否发布" align="center" width='96'>
        <template slot-scope="scope">
          <span>{{ scope.row.isPublish ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="自定义类型" align="center" width='320'>
        <template slot-scope="scope">
          <!-- 防止丑陋的动画 -->
          <span v-for="(tag, index) in scope.row.tags.split(',')" :key="tag">
            <el-tag class="table-tags" :type='tagTypes[index]'>{{ tag }}</el-tag>
          </span>

        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop='createdTime' align="center" width='240'>
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime | t-time-format }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
          <template slot-scope="scope">
            <t-dropdown trigger='click' class="list-dropdown" size='small' :dropdownItemEnum='dropdownItemEnum(scope.row)' />
          </template>
        </el-table-column>
    </template>
  </t-table>
</template>

<script>
import { checkArticleList, deleteArticle, setTopArticleListItem, cancelSetTopArticleListItem, getArticleTagsEnum } from '@/apis/apis'
import { mapMutations } from 'vuex'
export default {
  name: 'articleList',
  components: {},
  props: {},
  data () {
    return {
      isLoading: false,
      tagsEnum: [],
      data: [],
      pagination: {},
      params: {
        page: 1,
        size: 20,
        keyword: null,
        tag: null
      }
    }
  },
  computed: {
    tagTypes () {
      return ['success', 'info', 'warning', 'dander']
    }
  },
  methods: {
    ...mapMutations(['SETGLOBALMASK']),
    dropdownItemEnum ({ _id, title, isTop }) {
      return [
        {
          label: '删除',
          attrs: {
            command: 'delete'
          },
          fnCallback: (command) => {
            this.handleDelete(_id)
          }
        },
        {
          label: '编辑',
          attrs: {
            command: 'edit'
          },
          fnCallback: (command) => {
            this.handleEdit(_id)
          }
        },
        {
          label: '查看',
          attrs: {
            command: 'check'
          },
          fnCallback: (command) => {
            this.handleCheck(_id, title)
          }
        },
        {
          label: isTop ? '取消置顶' : '置顶',
          attrs: {
            command: 'setTop'
          },
          fnCallback: (command) => {
            isTop ? this.cancelSetTop(_id) : this.handleSetTop(_id)
          }
        }
      ]
    },
    getArticleTagsEnum () {
      return new Promise((resolve) => {
        getArticleTagsEnum()
          .then((response) => {
            const { code, result } = response.data
            if (code === 0) {
              result.map((i) => {
                this.tagsEnum.push({ label: i, value: i })
              })
            }
          })
      })
    },
    // 获取用户列表
    getList () {
      this.isLoading = true
      return new Promise((resolve) => {
        checkArticleList(this.params).then(response => {
          setTimeout(() => {
            const { result, code } = response.data
            if (code === 0) {
              const { list, total } = result
              this.data = list
              this.pagination.total = total
              this.pagination.page = this.params.page
              this.pagination.size = this.params.size
              this.isLoading = false
              resolve()
            }
          }, this.$store.state.apiDelay)
        })
      })
    },
    // 删除用户接口
    deleteArticle (id) {
      this.SETGLOBALMASK(true)
      deleteArticle({ id })
        .then((response) => {
          setTimeout(() => {
            const { code, msg } = response.data
            if (code === 0) {
              this.SETGLOBALMASK(false)
              this.$message.success(msg)
              this.getList()
            }
          }, this.$store.state.apiDelay)
        })
    },
    setTopArticleListItem (params) {
      return new Promise((resolve) => {
        setTopArticleListItem(params)
          .then((response) => {
            const { code } = response.data
            if (code === 0) {
              this.getList()
                .then(() => {
                  resolve()
                })
            }
          })
      })
    },
    cancelSetTopArticleListItem (params) {
      return new Promise((resolve) => {
        cancelSetTopArticleListItem(params)
          .then((response) => {
            const { code } = response.data
            if (code === 0) {
              this.getList()
                .then(() => {
                  resolve()
                })
            }
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
    // 添加按钮
    handleCreateArticle () {
      this.$router.push({
        path: '/article-operation'
      })
    },
    // 编辑按钮
    handleEdit (id) {
      this.$router.push({
        path: '/article-operation',
        query: {
          mode: 'eidt',
          id
        }
      })
    },
    // 删除按钮
    handleDelete (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteArticle(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCheck (_id, title) {
      window.sessionStorage.setItem('ARTICLETITLE', title)
      this.$router.push({
        path: '/check-article',
        query: {
          id: _id
        }
      })
    },
    handleSetTop (id) {
      this.$confirm('此操作将该数据置顶, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.setTopArticleListItem({ id })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    cancelSetTop (id) {
      this.$confirm('此操作将取消该数据置顶, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelSetTopArticleListItem({ id })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 关键字搜索
    handleSearch () {
      this.params.tag = null
      this.getList()
    },
    // 关键字 input 事件，清空 params.role
    handleInput () {
      this.params.tag = null
    },
    handleTagChange (val) {
      this.params.keyword = null
      this.getList()
    },
    // role 选择器改变了
    selectHandleChange () {
      this.params.keyword = null
      this.getList()
    },
    setRowClass ({ row }) {
      const { isTop } = row
      if (isTop) {
        return 'is-set-top'
      }
    }
  },
  created () {
    // 获取列表数据
    this.getList()
    this.getArticleTagsEnum()
  },
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/mixin.scss';
.list-wrapper {
  width: 100%;
  height: 100%;
  .space {
    flex: 1;
  }
  .table-tags {
    margin: 0px 5px;
  }
  .list-dropdown {
    cursor: pointer;
    width: 98px;
  }
  /deep/tr.is-set-top {
    @include gradient(rgba(0,0,0,.2), #fff);
  }
}
</style>
