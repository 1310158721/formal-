<template>
  <el-tabs
    class="tab-routes-wrapper"
    v-model="activeName"
    type="card"
    v-if="tabRoutesEnum && tabRoutesEnum.length"
  >
    <el-tab-pane
      v-for="(i, index) in tabRoutesEnum"
      :key="i.path"
      :name="i.path"
    >
      <el-button
        @click="selectTabRoutes(i.path)"
        :class="[$route.path === i.path ? 'active-tab' : 'unactive-tab']"
        slot="label"
        size="mini"
        type="primary"
      >
        {{ $t("menuList." + i.title) }}
        <i
          class="el-icon-circle-close"
          v-if="index > 0"
          @click.stop="closeTabRoutes(i, index)"
        />
      </el-button>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 't-tab-routes-wrapper',
  components: {},
  props: {},
  data () {
    return {
      activeName: null,
      tabRoutesEnum: []
    }
  },
  computed: {},
  methods: {
    getTabRoutesEnum () {
      const tabRoutes = window.sessionStorage.getItem('tabRoutes') || '[]'
      const tabRoutesEnum = JSON.parse(tabRoutes)
      if (!tabRoutesEnum.filter((i) => i.path === '/dashboard').length) {
        tabRoutesEnum.unshift({
          path: '/dashboard',
          title: '首页'
        })
      }
      this.tabRoutesEnum = tabRoutesEnum
      this.activeName = this.$route.path
    },
    closeTabRoutes ({ path }, index) {
      const isActive = path === this.$route.path
      const isThenLast = index === this.tabRoutesEnum.length - 1
      if (isActive && !isThenLast) {
        this.$router.push({
          path: this.tabRoutesEnum[index + 1].path
        })
        this.removeTab(index)
      } else if (isActive && isThenLast) {
        this.$router.push({
          path: this.tabRoutesEnum[index - 1].path
        })
        this.removeTab(index)
      } else {
        this.removeTab(index)
      }
    },
    removeTab (index) {
      this.tabRoutesEnum.splice(index, 1)
      window.sessionStorage.setItem(
        'tabRoutes',
        JSON.stringify(this.tabRoutesEnum)
      )
    },
    selectTabRoutes (path) {
      if (path !== this.$route.path) {
        this.$router.push({
          path
        })
      }
    }
  },
  created () {
    this.getTabRoutesEnum()
  },
  mounted () {},
  watch: {
    '$route.path' () {
      this.getTabRoutesEnum()
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-routes-wrapper {
  border-bottom: 1px #d8dce5 solid;
  box-sizing: border-box;
  /deep/.el-tabs__header {
    border: 0;
    margin: 0;
    .el-tabs__nav {
      border: 0;
      .el-tabs__item {
        padding: 0px 0px 0px 5px !important;
        height: 33px !important;
        border: 0;
        line-height: 30px !important;
        .el-button {
          position: relative;
          &.active-tab {
            background-color: #42b983;
            border-color: #42b983;
            color: #fff;
          }
          &.unactive-tab {
            background-color: #fff;
            color: #495060;
            border-color: #d8dce5;
            font-weight: normal;
          }
          i {
            width: 0px;
            height: 0px;
            font-size: 0px;
            position: relative;
            vertical-align: top;
            top: 6px;
            transform: scale(0, 0);
            transition: all 0.2s linear;
          }
          &:hover {
            i {
              top: 0px;
              width: 12px;
              height: 12px;
              font-size: 12px;
              top: 0px;

              transform: scale(1, 1);
            }
          }
        }
      }
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      height: 32px;
      line-height: 32px !important;
    }
  }
}
</style>
