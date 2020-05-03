<!--
  全局的 markdown 编辑器组件
  存放 render 的元素必须要有一个类名 -> markdown-body，否则生成的 render 样式不会生效
-->
<template>
  <mavon-editor
    class="mavon-editor-wrapper"
    :toolbars="toolbars"
    :imageFilter="imageFilter"
    codeStyle="atom-one-dark"
    ref="mavonEditor"
    @imgAdd="imgAdd"
    v-on="$listeners"
    v-bind="$attrs"
    v-model="editorContent"
  />
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  name: 't-mavon-editor',
  components: {},
  props: {
    action: {
      type: String,
      default: '../tools/upload'
    },
    defaultContent: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 1024
    }
  },
  data () {
    return {
      editorContent: ''
    }
  },
  computed: {
    toolbars () {
      return {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: false, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  methods: {
    ...mapMutations(['SETGLOBALMASK']),
    // 添加图片处理，可在组件外部做覆盖处理
    imgAdd (pos, file) {
      if (!this.$listeners.imgAdd) {
        this.SETGLOBALMASK(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('directory', 'record')
        axios.post(this.action, formData, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        })
          .then((res) => {
            const { url } = res.data.result
            this.$refs.mavonEditor.$img2Url(pos, url)
            this.SETGLOBALMASK(false)
            this.$emit('imgAddCallBack', pos, url)
          })
      }
    },
    // 默认过滤图片处理
    imageFilter (file) {
      if (!this.$attrs.imageFilter) {
        const { name, size } = file
        const isOverSize = size > this.size * 1024
        if (isOverSize) {
          this.$message.error(`${name}的大小不能超过${this.size}kb`)
        }
        return !isOverSize
      }
    }
  },
  created () {
    // 设置默认值
    this.editorContent = this.defaultContent
  }
}
</script>

<style lang="scss" scoped>
.mavon-editor-wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
}
/deep/.v-show-content {
  img {
    min-width: 200px;
    max-width: 400px;
  }
}
</style>
