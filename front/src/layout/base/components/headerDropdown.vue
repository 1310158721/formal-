<template>
  <t-dropdown class="header-dropdown mgr-12" :dropdownItemEnum='dropdownItemEnum' trigger='click'>
    <template #link>
      <span class="avatar" v-if='avatar' :style='{ backgroundImage: `url(${avatar})` }'></span>
    </template>
  </t-dropdown>
</template>

<script>
import { mapMutations } from 'vuex'
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
          label: this.$t('headerDropdown.返回首页'),
          attrs: {
            command: 'dashboard',
            disabled: this.$route.path.includes('/dashboard')
          },
          fnCallback: () => {
            this.$router.push('/dashboard')
          }
        },
        {
          label: this.$t('headerDropdown.系统设置'),
          attrs: {
            command: 'setting'
          },
          fnCallback: this.handleSetting
        },
        {
          label: this.$t('headerDropdown.退出登录'),
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
    ...mapMutations(['SETGLOBALBASELAYOUT']),
    logout () {
      this.$router.push('/logout')
    },
    handleSetting () {
      this.SETGLOBALBASELAYOUT(true)
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
  .avatar {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-size: 50px 50px;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
