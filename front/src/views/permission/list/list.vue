<template>
  <t-table
    class="list-wrapper"
    :isLoading="isLoading"
    :data="data"
    :openFilter="true"
    :pagination="pagination"
    :sizeChange="handleSizeChange"
    :currentChange="handleCurrentChange"
  >
    <template #filter>
      <el-button
        class="mgr-24"
        type="primary"
        size="small"
        @click="handleCreateUser"
        v-t-permission="'USERSLISTADD'"
      >
        {{ $t("permission.新增") }}
      </el-button>
      <t-select
        class="select-w-120"
        :data="roleEnum"
        v-model="params.role"
        @change="selectHandleChange"
        clearable
        :placeholder='$t("permission.selectPlaceholder")'
      />
      <span class="space"></span>
      <el-input
        class="input-w-300"
        size="small"
        type="text"
        v-model="params.keyword"
        @keydown.enter.native="handleSearch"
        @input.native="handleInput"
        :placeholder='$t("permission.searchPlaceholder")'
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
      <el-table-column prop="name" :label="$t('permission.名称')" align="center" />
      <el-table-column prop="account" :label="$t('permission.账号')" align="center" />
      <el-table-column prop="mobile" :label="$t('permission.号码')" align="center" />
      <el-table-column prop="roleDesc" :label="$t('permission.角色')" align="center" />
      <el-table-column :label="$t('permission.操作')" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleDelete(scope.row._id)"
            >
              {{ $t('permission.删除') }}
            </el-button
          >
          <el-button type="text" size="small" @click="handleEdit(scope.row._id)"
            >
              {{ $t('permission.编辑') }}
            </el-button
          >
        </template>
      </el-table-column>
    </template>
  </t-table>
</template>

<script>
import { roleEnum } from '@/assets/js/contants/enum'
import { USER } from '@/apis/apis'
import { mapMutations } from 'vuex'
export default {
  name: 'permissionList',
  components: {},
  props: {},
  data () {
    return {
      isLoading: false,
      data: [],
      pagination: {},
      params: {
        page: 1,
        size: 20,
        keyword: null,
        role: null
      }
    }
  },
  computed: {
    roleEnum () {
      return roleEnum
    }
  },
  methods: {
    ...mapMutations(['SETGLOBALMASK']),
    // 获取用户列表
    getList () {
      this.isLoading = true
      return new Promise(resolve => {
        USER.getUsers(this.params).then(response => {
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
    deleteUser (id) {
      this.SETGLOBALMASK(true)
      USER.deleteUser({ id }).then(response => {
        setTimeout(() => {
          const { code } = response.data
          if (code === 0) {
            this.SETGLOBALMASK(false)
            this.$message.success(this.$t('permission.deleteSuccess'))
            this.getList()
          }
        }, this.$store.state.apiDelay)
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
    handleCreateUser () {
      this.$router.push({
        path: '/permission-operation',
        query: {
          mode: 'create'
        }
      })
    },
    // 编辑按钮
    handleEdit (id) {
      this.$router.push({
        path: '/permission-operation',
        query: {
          mode: 'eidt',
          id
        }
      })
    },
    // 删除按钮
    handleDelete (id) {
      this.$confirm(this.$t('permission.deleteComfirmTitle'), this.$t('permission.deleteComfirmTip'), {
        confirmButtonText: this.$t('permission.deleteComfirmSure'),
        cancelButtonText: this.$t('permission.deleteComfirmCancel'),
        type: 'warning'
      })
        .then(() => {
          this.deleteUser(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('permission.deleteComfirmCancelText')
          })
        })
    },
    // 关键字搜索
    handleSearch () {
      this.getList()
    },
    // 关键字 input 事件，清空 params.role
    handleInput () {
      this.params.role = null
    },
    // role 选择器改变了
    selectHandleChange () {
      this.params.keyword = null
      this.getList()
    }
  },
  created () {
    // 获取列表数据
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
