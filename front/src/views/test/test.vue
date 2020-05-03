<template>
  <div>
    <el-button v-t-throttle='options' type="primary" size='small'>测试</el-button>
  </div>
</template>

<script>
export default {
  name: 'componentName',
  components: {},
  props: {},
  data () {
    return {
      options: {
        type: 'onclick',
        fn: this.handleClick,
        params: ['hahahah']
      }
    }
  },
  computed: {},
  methods: {
    handleClick (str) {
      console.log(str)
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
