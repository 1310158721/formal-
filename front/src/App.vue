<template>
  <span>
    <router-view />
    <t-global-mask v-if='$store.state.globalMask' />
  </span>
</template>

<script>
export default {
  name: 'App',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
