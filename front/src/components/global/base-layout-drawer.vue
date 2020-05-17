<!--
  base-layout 布局的全局样式配置抽屉
-->
<template>
  <t-drawer
    :visible="$store.state.isShowGlobalBaseLayout"
    :title="$t('baseLayoutDrawer.title')"
    :before-close="beforeClose"
  >
    <el-form :inline="true" size="small" label-width="120px" label-position="left">
      <el-form-item v-for="i in formItemEnum" :key="i.id" :label="i.label">
        <el-switch v-model="i.model" :active-text="$t('baseLayoutDrawer.是')" :inactive-text="$t('baseLayoutDrawer.否')" @change="i.change" />
      </el-form-item>
    </el-form>
  </t-drawer>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 't-globla-base-layout-drawer',
  components: {},
  props: {},
  data () {
    return {
      isOpenLogo: null,
      isFixedBaseLayoutHeader: null,
      isShowBaseLayoutBreadcrumb: null,
      isOpenBaseLayoutTabRoutes: null,
      isOpenFullScreen: null,
      isOpenMultilingual: null,
      isOpenRoutesSearch: null
    }
  },
  computed: {
    formItemEnum () {
      return [
        {
          label: this.$t('baseLayoutDrawer.logo'),
          model: this.isOpenLogo,
          change: val => {
            this.isOpenLogo = val
            this.SETOPENLOGO(val)
          }
        },
        // {
        //   label: '固定Header',
        //   model: this.isFixedBaseLayoutHeader,
        //   change: val => {
        //     this.isFixedBaseLayoutHeader = val
        //     this.SETFIXEDBASELAYOUTHEADER(val)
        //   }
        // },
        {
          label: this.$t('baseLayoutDrawer.面包屑'),
          model: this.isShowBaseLayoutBreadcrumb,
          change: val => {
            this.isShowBaseLayoutBreadcrumb = val
            this.SETSHOWBASELAYOUTBREADCRUMB(val)
          }
        },
        {
          label: this.$t('baseLayoutDrawer.TabRoutes'),
          model: this.isOpenBaseLayoutTabRoutes,
          change: val => {
            this.isOpenBaseLayoutTabRoutes = val
            this.SETOPENBASELAYOUTTABROUTES(val)
          }
        },
        {
          label: this.$t('baseLayoutDrawer.全局化'),
          model: this.isOpenFullScreen,
          change: val => {
            this.isOpenFullScreen = val
            this.SETOPENFULLSCREEN(val)
          }
        },
        {
          label: this.$t('baseLayoutDrawer.多语言'),
          model: this.isOpenMultilingual,
          change: val => {
            this.isOpenMultilingual = val
            this.SETOPENMULTILINGUAL(val)
          }
        },
        {
          label: this.$t('baseLayoutDrawer.路由搜索'),
          model: this.isOpenRoutesSearch,
          change: val => {
            this.isOpenRoutesSearch = val
            this.SETOPENROUTESSEARCH(val)
          }
        }
      ]
    }
  },
  methods: {
    ...mapMutations([
      'SETGLOBALBASELAYOUT',
      'SETOPENLOGO',
      'SETFIXEDBASELAYOUTHEADER',
      'SETSHOWBASELAYOUTBREADCRUMB',
      'SETOPENBASELAYOUTTABROUTES',
      'SETOPENFULLSCREEN',
      'SETOPENMULTILINGUAL',
      'SETOPENROUTESSEARCH'
    ]),
    beforeClose () {
      this.SETGLOBALBASELAYOUT(false)
    }
  },
  created () {
    this.isOpenLogo = this.$store.state.isOpenLogo
    this.isFixedBaseLayoutHeader = this.$store.state.isFixedBaseLayoutHeader
    this.isShowBaseLayoutBreadcrumb = this.$store.state.isShowBaseLayoutBreadcrumb
    this.isOpenBaseLayoutTabRoutes = this.$store.state.isOpenBaseLayoutTabRoutes
    this.isOpenFullScreen = this.$store.state.isOpenFullScreen
    this.isOpenMultilingual = this.$store.state.isOpenMultilingual
    this.isOpenRoutesSearch = this.$store.state.isOpenRoutesSearch
  }
}
</script>
