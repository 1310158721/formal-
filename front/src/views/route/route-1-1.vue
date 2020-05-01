<template>
  <div class="route-1-1-wrapper">
    Route-1-1
    <router-view />
  </div>
</template>

<script>
export default {
  name: 't-route-1-1',
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

<style lang="scss" scoped>
.route-1-1-wrapper {
  width: 100%;
  height: 100%;
  background-color: lightblue;
  display: flex;
  flex-direction: column;
}
</style>
