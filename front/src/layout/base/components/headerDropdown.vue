<template>
  <t-dropdown class="header-dropdown mgr-24" :dropdownItemEnum='dropdownItemEnum' trigger='click'>
    <template #link>
      <el-avatar v-if='avatar' :size="50" :src="avatar" />
    </template>
  </t-dropdown>
</template>

<script>
export default {
  name: 'HeaderDropdown',
  components: {},
  props: {},
  data () {
    return {
      avatar: null
    }
  },
  computed: {
    dropdownItemEnum () {
      return [
        {
          label: '返回首页',
          attrs: {
            command: 'dashboard',
            disabled: this.$route.path.includes('/dashboard')
          },
          fnCallback: () => {
            this.$router.push('/dashboard')
          }
        },
        {
          label: '退出登录',
          attrs: {
            command: 'logout',
            divided: true
          },
          fnCallback: this.logout
        }
      ]
    }
  },
  methods: {
    logout () {
      this.$router.push('/logout')
    }
  },
  created () {
    this.avatar = this.$store.state.userInfo.avatar
  },
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.header-dropdown {
  width: 50px;
  height: 50px;
}
</style>
