<template>
  <div>
    <el-button v-t-throttle='options' type="primary" size='small' @click='handleClick'>测试</el-button>
    <p>点击了 {{ clickCount }} 次</p>
    <p>生效了 {{ workCount }} 次</p>
    <p>传递参数为 {{ params }}</p>
  </div>
</template>

<script>
export default {
  name: 'Throttle',
  components: {},
  props: {},
  data () {
    return {
      clickCount: 0,
      workCount: 0,
      params: '',
      options: {
        type: 'onclick',
        fn: this.throttleClick,
        params: ['hahahah']
      }
    }
  },
  computed: {},
  methods: {
    throttleClick (params) {
      this.workCount++
      this.params = params
    },
    handleClick () {
      this.clickCount++
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
