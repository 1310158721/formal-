<template>
  <!-- <div id='full-screen-wrapper' v-t-full-screen='options'>
    fullScreen
  </div> -->
  <div class="full-screen-wrapper">
    <!-- 元素的背景色必须设置在 style -->
    <div class="suqare" id="square-1" v-t-full-screen='options1' style="backgroundColor: rgb(0,0,255);">
      {{ count1 % 2 === 0 ? 'square-1 退出全屏' : 'square-1 全屏状态' }}
    </div>
    <div class='suqare' id="square-2" v-t-full-screen='options2' style="backgroundColor: rgb(0,255,0);">
      {{ count2 % 2 === 0 ? 'square-2 退出全屏' : 'square-2 全屏状态' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'fullScreen',
  components: {},
  props: {},
  data () {
    return {
      count1: 0,
      count2: 0,
      options1: {
        fnCallback: () => {
          this.count1++
        },
        dom: 'square-1'
      },
      options2: {
        fnCallback: () => {
          this.count2++
        },
        dom: 'square-2'
      }
    }
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.full-screen-wrapper {
  width: 100%;
  height: 100%;
  .suqare {
    width: 200px;
    height: 200px;
    background-color: black;
    margin: 24px;
    box-shadow: 0px 0px 10px rgba(0,0,0,.5);
  }
}
</style>
