<template>
  <div>
    Dashboard
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
  created () {
    console.log(this.$store.state.userInfo.hasPermission.includes('NEXT'))
  },
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
