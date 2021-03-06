<template>
  <el-form
    size="small"
    :model="model"
    :rules="rules"
    label-position="left"
    label-width="96px"
    ref="article-form"
    :hide-required-asterisk="true"
    class="article-wrapper"
  >
    <el-form-item :label="$t('article.operation.标题')" prop="title">
      <el-input
        class="input-w-300"
        type="text"
        v-model="model.title"
        :placeholder="$t('article.operation.titleInputPlaceholder')"
      />
    </el-form-item>
    <el-form-item :label="$t('article.operation.是否发布')">
      <t-switch v-model="model.isPublish" :active-text="$t('article.operation.activeText')" :inactive-text="$t('article.operation.inactiveText')" />
    </el-form-item>
    <el-form-item :label="$t('article.operation.自定义类型')" prop="tags">
      <t-input-tags :dynamicTags="model.tags" />
    </el-form-item>
    <el-form-item
      label-width="0px"
      class="editor-wrapper"
      prop="markdownRender"
    >
      <!-- 编辑文章时，等获取已有文章数据后，在渲染出来 -->
      <t-mavon-editor
        class="t-mavon-editor-wrapper"
        v-if="isLoaded"
        :defaultContent="model.markdownValue"
        @change="markdownChange"
      />
    </el-form-item>
    <el-form-item label-width="0px" class="button-wrapper">
      <el-button v-t-throttle="submitOptions" type="primary">
        {{ id ? $t('article.operation.修改文章') : $t('article.operation.创建文章') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ARTICLE } from '@/apis/apis'
import { mapMutations } from 'vuex'
export default {
  name: 'Article',
  components: {},
  props: {},
  data () {
    const tagsCheck = (rule, value, callback) => {
      if (!this.model.tags.length) {
        callback(new Error('自定义类型不能为空'))
      } else {
        callback()
      }
    }
    const markdownRenderCheck = (rule, value, callback) => {
      if (!this.model.markdownRender) {
        callback(new Error('文章内容不能为空'))
      } else {
        callback()
      }
    }
    return {
      id: null,
      isLoaded: true,
      model: {
        title: null,
        isPublish: false,
        tags: [],
        markdownValue: '',
        markdownRender: ''
      },
      rules: {
        title: [
          { required: true, message: this.$t('article.operation.titleErrorMsg'), trigger: 'blur' },
          { min: 5, max: 50, message: this.$t('article.operation.titleLengthErrorMsg'), trigger: 'blur' }
        ],
        tags: [
          { required: true, message: this.$t('article.operation.tagErrorMsg'), trigger: 'blur' },
          { validator: tagsCheck, trigger: 'blur' }
        ],
        markdownRender: [
          { required: true, message: this.$t('article.operation.contentErrorMsg'), trigger: 'blur' },
          { validator: markdownRenderCheck, trigger: 'blur' }
        ]
      },
      submitOptions: {
        type: 'onclick',
        fn: this.submitForm,
        params: ['article-form']
      }
    }
  },
  computed: {},
  methods: {
    ...mapMutations(['SETGLOBALMASK']),
    createArticle () {
      this.SETGLOBALMASK(true)
      return new Promise(resolve => {
        const params = Object.assign({}, this.model, {
          tags: this.model.tags.join(',')
        })
        ARTICLE.createArticle(params).then(response => {
          setTimeout(() => {
            const { code, msg } = response.data
            if (code === 0) {
              this.SETGLOBALMASK(false)
              this.$message.success(msg)
              this.$router.push({
                path: '/article-list'
              })
              resolve()
            }
          }, this.$store.state.apiDelay)
        })
      })
    },
    getArticle (id) {
      this.isLoaded = false
      this.SETGLOBALMASK(true)
      return new Promise(resolve => {
        ARTICLE.getArticle({ id }).then(response => {
          setTimeout(() => {
            const { result, code } = response.data
            if (code === 0) {
              this.SETGLOBALMASK(false)
              this.isLoaded = true
              const model = Object.assign({}, result, {
                tags: result.tags.split(',')
              })
              this.model = model
            }
          }, this.$store.state.apiDelay)
        })
      })
    },
    updateArticle () {
      this.SETGLOBALMASK(true)
      return new Promise(resolve => {
        const params = Object.assign({}, this.model, {
          tags: this.model.tags.join(','),
          id: this.id
        })
        ARTICLE.updateArticle(params).then(response => {
          setTimeout(() => {
            const { code } = response.data
            if (code === 0) {
              this.SETGLOBALMASK(false)
              this.$message.success(this.$t('article.operation.更新成功'))
              this.$router.push({
                path: '/article-list'
              })
              resolve()
            }
          }, this.$store.state.apiDelay)
        })
      })
    },
    markdownChange (value, render) {
      this.model.markdownValue = value
      this.model.markdownRender = render
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.id ? this.updateArticle() : this.createArticle()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    const { id } = this.$route.query
    if (id) {
      this.id = id
      this.getArticle(id)
    }
  },
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.article-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  .editor-wrapper {
    height: 420px;
    /deep/.el-form-item__content {
      height: 100%;
      .t-mavon-editor-wrapper {
        height: 100% !important;
      }
    }
  }
  .button-wrapper {
    text-align: center !important;
    margin-bottom: 0;
  }
}
</style>
