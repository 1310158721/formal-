<template>
  <div class="check-article-wrapper" v-viewer>
    <div class="markdown-body-wrapper">
      <t-mavon-editor class="markdown-body" v-html="markdownRender" />
    </div>
  </div>
</template>

<script>
import { ARTICLE } from '@/apis/apis'
export default {
  name: 'checkArticle',
  components: {},
  props: {},
  data () {
    return {
      markdownRender: null,
      isLoaded: false
    }
  },
  computed: {},
  methods: {
    getArticle (id) {
      return new Promise(resolve => {
        ARTICLE.getArticle({ id }).then(response => {
          const { result, code } = response.data
          if (code === 0) {
            const { markdownRender } = result
            this.markdownRender = markdownRender
            this.$nextTick(() => {
              this.isLoaded = true
            })
          }
        })
      })
    }
  },
  created () {
    const { id } = this.$route.query
    this.getArticle(id)
  },
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.check-article-wrapper {
  width: 100%;
  height: 100%;
  padding: 0px 150px;
  box-sizing: border-box;
  background-color: rgba(0,0,0,.9);
  overflow: auto;
  .markdown-body-wrapper {
    width: 720px;
    height: 100%;
    margin: 0 auto;
  }
  .markdown-body {
    min-height: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 0;
    background-color: ghostwhite;border-left: 2px solid #abb2bf!important;
    border-right: 2px solid #abb2bf!important;
    box-sizing: border-box;
  }
}
</style>
