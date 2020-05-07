<template>
  <div class="check-article-wrapper">
    <t-mavon-editor class="markdown-body" v-html="markdownRender" />
  </div>
</template>

<script>
import { checkArticleListItem } from '@/apis/apis'
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
    checkArticleListItem (id) {
      return new Promise(resolve => {
        checkArticleListItem({ id }).then(response => {
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
    this.checkArticleListItem(id)
  },
  mounted () {},
  watch: {},
  beforeRouteEnter (to, from, next) {
    const title = window.sessionStorage.getItem('ARTICLETITLE')
    to.meta.title = title
    next()
  }
}
</script>

<style lang="scss" scoped>
.check-article-wrapper {
  width: 100%;
  height: 100%;
  padding: 0px 150px;
  box-sizing: border-box;
  background-color: rgba(0,0,0,.5);
  overflow: auto;
  .markdown-body {
    min-height: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 0;
    background-color: rgba(255,0,0,.1);
  }
}
</style>
