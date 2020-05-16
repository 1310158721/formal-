<template>
  <div>
    <el-button size="small" @click='isShow = !isShow'>click</el-button>
    <transition name='slide-fade'>
      <t-select
        ref="select"
        class="select-wrapper"
        v-if="menuList.length && isShow"
        :data="menuList"
        v-model="selected"
        filterable
        @change="handleChange"
      />
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
            parentTitle ? parentTitle + '->' + i.title : i.title
          )
        } else {
          this.menuList.push({
            label: parentTitle ? parentTitle + '->' + i.title : i.title,
            value: i.path
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
      }
    }
  },
  created () {
    this.getRoutes(this.$store.state.menuList)
  },
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: width .8s linear;
}
.slide-fade-leave-active {
  transition: width .8s linear;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  width: 0px;
  // opacity: 0;
}
.select-wrapper {
  // width: 0px;
  // overflow-y: hidden;
}
</style>
