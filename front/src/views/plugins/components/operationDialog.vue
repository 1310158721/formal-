<template>
  <t-dialog
    :dialogCancel="dialogClose"
    :dialogClose="dialogClose"
    :visible="visible"
    :title="dialogTitle"
    :showFooter="true"
    @open="handleOpen"
  >
    <template v-slot:body>
      <el-form
        ref="createPluginItem"
        size="small"
        :model="model"
        :rules="rules"
        label-width="96px"
        label-position="left"
      >
        <div class="form-body">
          <el-form-item label="插件名称" prop="name">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="demo 链接" prop="url">
            <el-input v-model="model.url"></el-input>
          </el-form-item>
          <el-form-item label="demo 描述" prop="desc">
            <el-input type="textarea" v-model="model.desc"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </template>
    <template v-slot:footer class="form-footer">
      <el-button type="info" size="small" @click="dialogClose">取 消</el-button>
      <el-button type="primary" size="small" @click="submitForm"
        >保 存</el-button
      >
    </template>
  </t-dialog>
</template>

<script>
import {
  PLUGINS
  // createPluginListItem,
  // checkPluginListItem,
  // updatePluginListItem
} from '@/apis/apis'
export default {
  name: 'OperationDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    // 存在 id 即为编辑模式
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      model: {
        name: '',
        url: '',
        desc: ''
      },
      rules: {
        name: [{ required: true, message: '请输入插件名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入demo链接', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入demo描述', trigger: 'blur' }]
      }
    }
  },
  computed: {
    dialogTitle () {
      return this.id ? '编辑插件列表信息' : '新增插件列表信息'
    }
  },
  methods: {
    handleOpen () {
      this.model = {
        name: '',
        desc: '',
        url: ''
      }
      this.id && this.checkPluginListItem()
    },
    // 新增模式下，创建单条信息
    createPluginListItem () {
      return new Promise(resolve => {
        PLUGINS.createPluginListItem(this.model).then(response => {
          const { code } = response.data
          if (code === 0) {
            resolve()
          }
        })
      })
    },
    // 编辑模式下，查看单条数据信息
    checkPluginListItem () {
      return new Promise(resolve => {
        PLUGINS.checkPluginListItem({ id: this.id }).then(response => {
          const { code, result } = response.data
          if (code === 0) {
            this.model = result
            resolve()
          }
        })
      })
    },
    // 编辑模式下，更新单条数据信息
    updatePluginListItem () {
      return new Promise(resolve => {
        const params = Object.assign(this.model, { id: this.id })
        PLUGINS.updatePluginListItem(params).then(response => {
          const { code } = response.data
          if (code === 0) {
            resolve()
          }
        })
      })
    },
    // 提交新增或编辑后的数据
    submitForm () {
      this.$nextTick(() => {
        this.$refs.createPluginItem.validate(valid => {
          if (valid) {
            this.id
              ? this.updatePluginListItem().then(() => {
                this.$emit('dialogClose', true)
              })
              : this.createPluginListItem().then(() => {
                this.$emit('dialogClose', true)
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      })
    },
    dialogClose () {
      this.model = {
        name: '',
        desc: '',
        url: ''
      }
      this.$refs.createPluginItem.resetFields()
      this.$emit('dialogClose')
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
