<!--
  base-layout 布局的全局样式配置抽屉
-->
<template>
  <t-drawer
    :visible="$store.state.isShowGlobalBaseLayout"
    title="baseLayout 布局设置"
    :before-close="beforeClose"
  >
    <el-form :inline="true" size="small" label-width="120px" label-position="left">
      <el-form-item v-for="i in formItemEnum" :key="i.id" :label="i.label">
        <el-switch v-model="i.model" active-text="是" inactive-text="否" @change="i.change" />
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
          label: '开启logo',
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
          label: '开启面包屑',
          model: this.isShowBaseLayoutBreadcrumb,
          change: val => {
            this.isShowBaseLayoutBreadcrumb = val
            this.SETSHOWBASELAYOUTBREADCRUMB(val)
          }
        },
        {
          label: '开启TabRoutes',
          model: this.isOpenBaseLayoutTabRoutes,
          change: val => {
            this.isOpenBaseLayoutTabRoutes = val
            this.SETOPENBASELAYOUTTABROUTES(val)
          }
        },
        {
          label: '开启全局化',
          model: this.isOpenFullScreen,
          change: val => {
            this.isOpenFullScreen = val
            this.SETOPENFULLSCREEN(val)
          }
        },
        {
          label: '开启多语言',
          model: this.isOpenMultilingual,
          change: val => {
            this.isOpenMultilingual = val
            this.SETOPENMULTILINGUAL(val)
          }
        },
        {
          label: '开启路由搜索',
          model: this.isOpenRoutesSearch,
          change: val => {
            this.isOpenRoutesSearch = val
            console.log(val)
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
