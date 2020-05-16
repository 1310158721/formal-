<template>
  <el-select ref='t-select' :size='size' v-bind="$attrs" v-on="$listeners" :placeholder="placeholder">
    <el-option
      v-for="item in data"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled='item.disabled'
    />
  </el-select>
</template>

<script>
export default {
  name: 't-select',
  components: {},
  props: {
    data: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    size: {
      type: String,
      default: 'small'
    },
    focus: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.focus) {
      this.$nextTick(() => {
        this.$refs['t-select'].focus()
      })
    }
  }
}
</script>
