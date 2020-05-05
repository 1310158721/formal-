<template>
  <div class="markdown-body" v-if='markdownRender' v-html='markdownRender'></div>
</template>

<script>
import { checkArticleListItem } from '@/apis/apis'
export default {
  name: 'checkArticle',
  components: {},
  props: {},
  data () {
    return {
      markdownRender: null
    }
  },
  computed: {},
  methods: {
    checkArticleListItem (id) {
      return new Promise((resolve) => {
        checkArticleListItem({ id })
          .then((response) => {
            const { result, code } = response.data
            if (code === 0) {
              const { markdownRender } = result
              this.markdownRender = markdownRender
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
  watch: {}
}
</script>

<style lang="scss" scoped></style>
