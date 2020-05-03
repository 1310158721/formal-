<template>
  <t-single-upload
    :on-success='handleSuccess'
    :imageSrc='imageSrc'
  />
</template>

<script>
export default {
  name: 'componentName',
  components: {},
  props: {},
  data () {
    return {
      imageSrc: ''
    }
  },
  computed: {},
  methods: {
    handleSuccess (response) {
      const { url } = response.result
      this.imageSrc = url
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
