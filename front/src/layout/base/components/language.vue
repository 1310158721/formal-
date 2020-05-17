<template>
  <t-dropdown class="language-dropdown mgr-12" :dropdownItemEnum='dropdownItemEnum' trigger='click'>
    <template #link>
      <i class="icon iconfont icon-yuyan"></i>
    </template>
  </t-dropdown>
</template>

<script>
export default {
  name: 'Language',
  components: {},
  props: {},
  data () {
    return {
      locale: localStorage.getItem('locale') || 'zh'
    }
  },
  computed: {
    dropdownItemEnum () {
      return [
        {
          label: '中文',
          attrs: {
            command: 'zh',
            disabled: this.locale === 'zh'
          },
          fnCallback: (command) => {
            this.switchLanguage(command)
          }
        },
        {
          label: '英文',
          attrs: {
            command: 'en',
            disabled: this.locale === 'en'
          },
          fnCallback: (command) => {
            this.switchLanguage(command)
          }
        }
      ]
    }
  },
  methods: {
    switchLanguage (command) {
      this.$i18n.locale = command
      localStorage.setItem('locale', command)
      this.locale = command
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.language-dropdown {
  width: 18px;
  height: 50px;
  padding: 14px 0;
  box-sizing: border-box;
  .icon {
    display: inline-block;
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
