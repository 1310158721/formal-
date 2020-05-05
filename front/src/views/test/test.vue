<template>
  <t-input-tags :dynamicTags='tags' @change='handleChange' />
</template>

<script>
export default {
  name: 'componentName',
  components: {},
  props: {},
  data () {
    return {
      tags: [2, 7]
    }
  },
  computed: {},
  methods: {
    handleChange (tags) {
      console.log(tags)
      console.log(this.tags)
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
