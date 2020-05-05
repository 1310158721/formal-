<template>
  <el-switch
    v-bind='$attrs'
    v-on='$listeners'
    :active-color='activeColor'
    :inactive-color='inactiveColor'
    ref='t-switch'
  >
  </el-switch>
</template>

<script>
export default {
  name: 't-switch',
  components: {},
  props: {
    activeColor: {
      type: String,
      default: '#409EFF'
    },
    inactiveColor: {
      type: String,
      deafult: '#ff4949'
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    getRefs () {
      return this.$refs['t-switch']
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
