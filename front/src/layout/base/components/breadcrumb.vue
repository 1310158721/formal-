<template>
  <el-breadcrumb
    class="t-breadcrumb-wrapper"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="i in breadcrumbEnum"
        :key="i.path"
        :to="canLink(i)"
      >
        {{ $t('menuList.' + i.title) }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 't-breadcrumb',
  components: {},
  props: {
    breadcrumbEnum: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 判断面包屑的枚举遍历中，是否允许点击跳转路由
    canLink (i) {
      const judge = i.path === this.$route.path || (i.redirect && i.redirect.path === this.$route.path)
      return judge ? null : { path: i.path }
    }
  }
}
</script>
