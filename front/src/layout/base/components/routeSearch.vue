<template>
  <div class="search-route-wrapper mgr-12">
    <span class="icon" @click='isShow = !isShow' :class="{ 'is-show-routes': !isShow }">
      <i class="iconfont icon-ziyuan1" />
    </span>
    <transition name='bounce'>
      <span v-if="isShow" class="select-wrapper">
        <t-select
          ref="select"
          class="selector"
          v-if="menuList.length && isShow"
          :data="menuList"
          v-model="selected"
          filterable
          placeholder='search'
          @change="handleChange"
        />
      </span>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'RouteSearch',
  components: {},
  props: {},
  data () {
    return {
      menuList: [],
      selected: null,
      isShow: false
    }
  },
  computed: {},
  methods: {
    getRoutes (list, parentTitle = '') {
      list.map(i => {
        if (i.children && i.children.length) {
          this.getRoutes(
            i.children,
            parentTitle ? parentTitle + ' > ' + i.title : i.title
          )
        } else {
          this.menuList.push({
            label: parentTitle ? parentTitle + ' > ' + i.title : i.title,
            value: i.path,
            disabled: i.path === this.$route.path
          })
        }
      })
    },
    handleChange (val) {
      const currentRoute = this.$route.path
      if (currentRoute !== val) {
        this.isShow = false
        this.$router.push({
          path: val
        })
        this.selected = null
      }
    }
  },
  created () {
    this.getRoutes(this.$store.state.menuList)
  },
  mounted () {},
  watch: {
    '$route.path' () {
      this.menuList = []
      this.getRoutes(this.$store.state.menuList)
    }
  }
}
</script>

<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in .2s;
}
.bounce-leave-active {
  animation: bounce-in .2s reverse;
}
@keyframes bounce-in {
  0% {
    width: 0;
  }
  100% {
    width: 200px;
  }
}
.search-route-wrapper {
  .icon {
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 50px;
    padding: 16px 6px;
    box-sizing: border-box;
    line-height: 18px;
    text-align: center;
    cursor: pointer;
    i {
      display: inline-block;
      font-size: 18px;
    }
    &.is-show-routes {
      width: 18px;
      padding: 16px 0px;
    }
  }
  .select-wrapper {
    display: inline-block;
    vertical-align: top;
    width: 200px;
    height: 50px;
    padding: 9px 0;
    box-sizing: border-box;
    overflow: hidden;
    .selector {
      display: inline-block;
      width: 100%;
      height: 32px;
      /deep/i {
        display: none;
      }
      /deep/.el-input__inner {
        border: 0;
        border-bottom: 1px #DCDFE6 solid;
        border-radius: 0;
        background-color: transparent;
      }
    }
  }
}
</style>
