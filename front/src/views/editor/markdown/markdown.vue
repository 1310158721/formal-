<template>
  <div class="t-markdown-wrapper">
    <el-button type='primary' size='small' @click='handleClick'>获取内容</el-button>
    <t-mavon-editor class="t-mavon-editor-wrapper"
      :defaultContent='render'
      @change='editorChange'
    />
    <div class="markdown-body content-show" v-html='render' v-show='render'></div>
  </div>
</template>

<script>
export default {
  name: 'Markdown',
  components: {},
  props: {},
  data () {
    return {
      val: null,
      render: ''
    }
  },
  computed: {},
  methods: {
    editorChange (val, render) {
      this.val = val
      this.render = render
    },
    handleClick () {
      // console.log(this.val)
      console.log(this.render)
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.t-markdown-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 0px 10px;
  box-sizing: border-box;
  .el-button {
    margin-bottom: 20px;
  }
  .t-mavon-editor-wrapper {
    width: 100%;
    height: 500px !important;
  }
}
</style>
