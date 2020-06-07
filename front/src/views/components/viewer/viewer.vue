<template>
  <div class="v-viewer">
    <div class="wrapper">
      <h3 class="title">瀑布流布局</h3>
      <div class="layout" v-viewer>
        <span class="column-1" id="column-1" />
        <span class="column-2" id="column-2" />
        <span class="column-3" id="column-3" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'viewer',
  components: {},
  props: {},
  data () {
    return {
      imgs: [
        'https://tang-static.oss-cn-beijing.aliyuncs.com/v-viewer/1.jpg',
        'https://tang-static.oss-cn-beijing.aliyuncs.com/v-viewer/2.jpg',
        'https://tang-static.oss-cn-beijing.aliyuncs.com/v-viewer/3.jpg',
        'https://tang-static.oss-cn-beijing.aliyuncs.com/v-viewer/4.jpg',
        'https://tang-static.oss-cn-beijing.aliyuncs.com/v-viewer/5.jpg',
        'https://tang-static.oss-cn-beijing.aliyuncs.com/v-viewer/6.jpg',
        'https://tang-static.oss-cn-beijing.aliyuncs.com/v-viewer/7.jpg',
        'https://tang-static.oss-cn-beijing.aliyuncs.com/v-viewer/8.jpg',
        'https://tang-static.oss-cn-beijing.aliyuncs.com/v-viewer/9.jpg',
        'https://tang-static.oss-cn-beijing.aliyuncs.com/v-viewer/10.jpg'
      ],
      column1: null,
      column2: null,
      column3: null,
      info: [
        0,
        0,
        0
      ]
    }
  },
  computed: {
    repeatImgs () {
      let r = []
      for (let i = 0; i < 5; i++) {
        r = r.concat(this.imgs)
      }
      return r
    }
  },
  methods: {
    dg (len) {
      if (len < this.repeatImgs.length) {
        const img = document.createElement('img')
        img.width = 200
        img.style.margin = '2px'
        img.style.cursor = 'pointer'
        img.getAttribute('class', 'item')
        img.src = this.repeatImgs[len]
        if (len <= 2) {
          img.onload = () => {
            if (len === 0) {
              this.column1.appendChild(img)
            } else if (len === 1) {
              this.column2.appendChild(img)
            } else {
              this.column3.appendChild(img)
            }
            this.$nextTick(() => {
              this.info.splice(len, 1, img.height + this['column' + (len + 1)].clientHeight)
              this.dg(len + 1)
            })
          }
        } else {
          img.onload = () => {
            const min = Math.min(...this.info)
            let minIndex = 0
            for (let m = 0; m < this.info.length; m++) {
              if (this.info[m] === min) {
                minIndex = m
              }
            }
            if (minIndex === 0) {
              this.column1.appendChild(img)
            } else if (minIndex === 1) {
              this.column2.appendChild(img)
            } else {
              this.column3.appendChild(img)
            }
            this.$nextTick(() => {
              this.info.splice(minIndex, 1, img.height + this['column' + (minIndex + 1)].clientHeight)
              this.dg(len + 1)
            })
          }
        }
      } else {
        console.log('end')
      }
    }
  },
  mounted () {
    this.column1 = document.getElementById('column-1')
    this.column2 = document.getElementById('column-2')
    this.column3 = document.getElementById('column-3')

    this.dg(0)
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.v-viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .wrapper {
    width: 616px;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    font-size: 0;
    .title {
      line-height: 30px;
      font-size: 28px;
      text-align: center;
    }
    .layout {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      border: 2px black solid;
      box-sizing: border-box;
      vertical-align: top;
      span {
        display: inline-block;
        vertical-align: top;
        width: 33.3333%;
      }
    }
  }
}
</style>
