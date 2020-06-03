<template>
  <div class="bar-wrapper">
    <div class="chart">
      <div id="bar" v-if="isDrew"></div>
    </div>
    <div class="handler">
      <h3>柱图参数</h3>
      <el-form
        :model="model"
        size="mini"
        label-width="130px"
        label-position="left"
      >
        <el-form-item label="宽度">
          <el-slider style="width: 90%" :min='1' :max='sliderMax' v-model="barWidth" @change='drawEcharts' />
        </el-form-item>
        <el-form-item label="柱色">
          <el-color-picker style="margin: 0px 5px;" v-for='(i, index) in model.series' :key='i.id' v-model="model.series[index].itemStyle.color" @change='drawEcharts' />
        </el-form-item>

        <div>
          <el-button type='primary' v-if='model.series.length < preDefineBar.length + 1' size="mini" @click='addBar'>添 加</el-button>
          <el-button type='primary' v-if='model.series.length > 1' size="mini" @click='decreaseBar'>删 除</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Echarts from 'echarts'
export default {
  name: 'ChartBar',
  components: {},
  props: {},
  data () {
    return {
      isDrew: true,
      myEcharts: null,
      xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      yAxis: [120, 200, 150, 80, 70, 110, 130],
      barWidth: 10,
      preDefineBar: [
        {
          name: '柱图二',
          data: [200, 150, 80, 70, 110, 130, 120],
          type: 'bar',
          itemStyle: {
            color: '#ff0000'
          }
        },
        {
          name: '柱图三',
          data: [150, 80, 70, 110, 130, 120, 200],
          type: 'bar',
          itemStyle: {
            color: '#cccccc'
          }
        },
        {
          name: '柱图四',
          data: [80, 70, 110, 130, 120, 200, 150],
          type: 'bar',
          itemStyle: {
            color: '#0000FF'
          }
        }
      ],
      model: {
        legend: {
          show: true
        },
        xAxis: {
          type: 'category',
          data: null
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '柱图一',
            data: null,
            type: 'bar',
            itemStyle: {
              color: '#121212'
            }
          }
        ]
      }
    }
  },
  computed: {
    formatOption () {
      const { legend, xAxis, yAxis, series } = this.model

      this.formatXAxis(xAxis)
      this.formatYAxis(yAxis)
      this.formatSeries(series)

      return {
        legend,
        xAxis,
        yAxis,
        series
      }
    },
    sliderMax () {
      const cuurentCount = this.model.series.length
      return Math.floor(100 / cuurentCount) - 5
    }
  },
  methods: {
    formatXAxis (xAxis) {
      xAxis.data = this.xAxis
    },
    formatYAxis (yAxis) {},
    formatSeries (series) {
      series[0].data = this.yAxis // 默认的第一条数据
      series.map((i) => {
        i.barWidth = this.barWidth + '%'
        i.barGap = 0
        return i
      })
    },
    // 画图
    drawEcharts () {
      this.isDrew = false
      this.$nextTick(() => {
        this.isDrew = true
        this.$nextTick(() => {
          this.myEcharts = Echarts.init(document.getElementById('bar'))
          this.$createEchart(this.formatOption, this.myEcharts)
        })
      })
    },
    addBar () {
      const currentCount = this.model.series.length
      this.model.series.push(this.preDefineBar[currentCount - 1])
      this.drawEcharts()
    },
    decreaseBar () {
      this.model.series.pop()
      this.drawEcharts()
    }
  },
  created () {},
  mounted () {
    this.drawEcharts()

    // 监听 window resize 事件
    window.addEventListener(
      'resize',
      () => {
        this.myEcharts.resize()
      },
      false
    )
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.bar-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .chart {
    display: inline-block;
    width: 49%;
    height: 100%;
    margin-right: 1%;
    box-sizing: border-box;
    #bar {
      width: 100%;
      height: 300px;
      border-radius: 10px;
      border: 1px black solid;
      box-sizing: border-box;
    }
  }

  .handler {
    display: inline-block;
    vertical-align: top;
    width: 49%;
    height: 100%;
    max-height: 100%;
    margin-left: 1%;
    box-sizing: border-box;
    overflow-y: auto;
    /deep/.el-form {
      .el-form-item--mini.el-form-item,
      .el-form-item--small.el-form-item {
        margin-bottom: 6px;
      }
    }
  }
}
</style>
