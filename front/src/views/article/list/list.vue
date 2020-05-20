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
      <el-button
        class="mgr-24"
        type="primary"
        size="small"
        @click="handleCreateArticle"
        v-t-permission='"ARTICLECREATE"'
      >
        {{ $t('article.新增') }}
      </el-button>
      <t-select
        class="select-w-120"
        v-if="tagsEnum.length"
        :data="tagsEnum"
        v-model="params.tag"
        clearable
        :placeholder="$t('article.selectPlaceholder')"
        @change="handleTagChange"
      />
      <span class="space"></span>
      <el-input
        class="input-w-300"
        size="small"
        type="text"
        v-model="params.keyword"
        @keydown.enter.native="handleSearch"
        :placeholder="$t('article.searchPlaceholder')"
        @input.native="handleInput"
      >
        <el-button
          size="small"
          type="primary"
          slot="append"
          icon="el-icon-search"
          @click="handleSearch"
        ></el-button>
      </el-input>
    </template>
    <template #table>
      <el-table-column :label="$t('article.序号')" align="center" width="60">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" :label="$t('article.标题')" align="center" />
      <el-table-column :label="$t('article.是否发布')" align="center" width="96">
        <template slot-scope="scope">
          <span>{{ scope.row.isPublish ? "是" : "否" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('article.自定义类型')" align="center" width="320">
        <template slot-scope="scope">
          <!-- 防止丑陋的动画 -->
          <span v-for="(tag, index) in scope.row.tags.split(',')" :key="tag">
            <el-tag class="table-tags" :type="tagTypes[index]">{{
              tag
            }}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('article.创建时间')"
        prop="createdTime"
        align="center"
        width="240"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime | timeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if='$permission("ARTICLEDELETE,ARTICLEDELETE,ARTICLEDELETE,ARTICLEDELETE,ARTICLEDELETE")' :label="$t('article.操作')" align="center" width="120">
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
import { ARTICLE } from '@/apis/apis'
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
      const { hasPermission } = this.$store.state.userInfo
      const dropdownItemEnum = [
        {
          label: this.$t('article.删除'),
          attrs: {
            command: 'delete'
          },
          fnCallback: command => {
            this.handleDelete(_id)
          },
          isExsit: hasPermission.includes('ARTICLEDELETE')
        },
        {
          label: this.$t('article.编辑'),
          attrs: {
            command: 'edit'
          },
          fnCallback: command => {
            this.handleEdit(_id)
          },
          isExsit: hasPermission.includes('ARTICLEDELETE')
        },
        {
          label: this.$t('article.查看'),
          attrs: {
            command: 'check'
          },
          fnCallback: command => {
            this.handleCheck(_id, title)
          },
          isExsit: hasPermission.includes('ARTICLEDELETE')
        },
        {
          label: this.$t('article.置顶'),
          attrs: {
            command: 'setTop'
          },
          fnCallback: command => {
            this.handleSetTop(_id)
          },
          isExsit: hasPermission.includes('ARTICLEDELETE') && !isTop
        },
        {
          label: this.$t('article.取消置顶'),
          attrs: {
            command: 'cancelTop'
          },
          fnCallback: command => {
            this.cancelSetTop(_id)
          },
          isExsit: hasPermission.includes('ARTICLEDELETE') && isTop
        }
      ]
      return dropdownItemEnum.filter((i) => i.isExsit)
    },
    getArticleTagsEnum () {
      return new Promise(resolve => {
        ARTICLE.getArticleTagsEnum().then(response => {
          const { code, result } = response.data
          if (code === 0) {
            result.map(i => {
              this.tagsEnum.push({ label: i, value: i })
            })
          }
        })
      })
    },
    // 获取用户列表
    getList () {
      this.isLoading = true
      return new Promise(resolve => {
        ARTICLE.getArticleList(this.params).then(response => {
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
      ARTICLE.deleteArticle({ id }).then(response => {
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
    setArticleItemTop (params) {
      return new Promise(resolve => {
        ARTICLE.setArticleItemTop(params).then(response => {
          const { code } = response.data
          if (code === 0) {
            this.getList().then(() => {
              resolve()
            })
          }
        })
      })
    },
    cancelArticleItemTop (params) {
      return new Promise(resolve => {
        ARTICLE.cancelArticleItemTop(params).then(response => {
          const { code } = response.data
          if (code === 0) {
            this.getList().then(() => {
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
      this.$confirm(this.$t('article.deleteComfirmTitle'), this.$t('article.deleteComfirmTip'), {
        confirmButtonText: this.$t('article.deleteComfirmSure'),
        cancelButtonText: this.$t('article.deleteComfirmCancel'),
        type: 'warning'
      })
        .then(() => {
          this.deleteArticle(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('article.deleteComfirmCancelText')
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
      this.$confirm(this.$t('article.setTopComfirmTitle'), this.$t('article.setTopComfirmTip'), {
        confirmButtonText: this.$t('article.setTopComfirmSure'),
        cancelButtonText: this.$t('article.setTopComfirmCancel'),
        type: 'warning'
      })
        .then(() => {
          this.setArticleItemTop({ id })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('article.setTopComfirmCancelText')
          })
        })
    },
    cancelSetTop (id) {
      this.$confirm(this.$t('article.cancelTopComfirmTitle'), this.$t('article.cancelTopComfirmTip'), {
        confirmButtonText: this.$t('article.cancelTopComfirmSure'),
        cancelButtonText: this.$t('article.cancelTopComfirmCancel'),
        type: 'warning'
      })
        .then(() => {
          this.cancelArticleItemTop({ id })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('article.cancelTopComfirmCancelText')
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
    console.log(this.$store.state.userInfo.hasPermission)
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
  .table-tags {
    margin: 0px 5px;
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
