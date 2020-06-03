<template>
  <div class="config-wrapper">
    <div class="chart">
      <div id="config" v-if="isDrew"></div>
    </div>
    <div class="handler">
      <h3>常用公共参数</h3>
      <el-form
        :model="model"
        size="mini"
        label-width="130px"
        label-position="left"
      >
        <el-form-item label="图表类型">
          <el-radio-group v-model="chartType" @change="drawEcharts">
            <el-radio label="bar">柱形图</el-radio>
            <el-radio label="line">折线图</el-radio>
            <el-radio label="pie">饼状图</el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="title">
          <h5>标题(title)相关配置</h5>
          <el-form-item label="是否显示">
            <el-switch v-model="model.title.show" @change='drawEcharts' />
          </el-form-item>
        </div>

        <div class="legend">
          <h5>图例组件(legend)相关配置</h5>
          <el-form-item label="是否显示">
            <el-switch v-model="model.legend.show" @change='drawEcharts' />
          </el-form-item>
          <div class="son" v-if='model.legend.show'>
            <el-form-item label="Legend 文案">
              <el-radio-group v-model="legendFormatter" @change="drawEcharts">
                <el-radio label="default">默认</el-radio>
                <el-radio label="tpl">模板</el-radio>
                <el-radio label="func">函数</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="默认选中" v-if='chartType === "pie"'>
              <el-checkbox-group v-model="pieSelected" @change="drawEcharts">
                <el-checkbox v-for='i in xAxis' :key='i.id' :label="i.name" />
              </el-checkbox-group>
            </el-form-item>
          </div>
        </div>

        <div class="yAxis">
          <h5>提示框组件(tooltip)相关配置</h5>
          <el-form-item label="是否显示">
            <el-switch v-model="model.tooltip.show" @change='drawEcharts' />
          </el-form-item>

          <div class="son" v-if='model.tooltip.show'>
            <el-form-item label="显示类型">
              <el-radio-group v-model="model.tooltip.axisPointer.type" @change="drawEcharts">
                <el-radio label="shadow">阴影</el-radio>
                <el-radio label="line">直线</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="显示文案">
              <el-radio-group v-model="tooltipFormatter" @change="drawEcharts">
                <el-radio label="default">默认</el-radio>
                <el-radio label="tpl">模板</el-radio>
                <el-radio label="func">函数</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>

        </div>

        <div class="xAxis">
          <h5>x 轴(xAxis)相关配置</h5>
          <el-form-item label="是否显示">
            <el-switch v-model="model.xAxis.show" @change='drawEcharts' />
          </el-form-item>
          <div class="son" v-if='model.xAxis.show'>
            <el-form-item label="轴色">
              <el-color-picker v-model="model.xAxis.axisLine.lineStyle.color" @change='drawEcharts' />
            </el-form-item>
            <el-form-item label="对齐刻度">
              <el-switch v-model="model.xAxis.axisTick.alignWithLabel" @change='drawEcharts' />
            </el-form-item>
            <el-form-item label="标签色">
              <el-color-picker v-model="model.xAxis.axisLabel.color" @change='drawEcharts' />
            </el-form-item>
            <el-form-item label="标签字体大小">
              <el-input-number v-model="model.xAxis.axisLabel.fontSize" @change="drawEcharts" :min="12" :max="20" label="描述文字"></el-input-number>
            </el-form-item>
          </div>
        </div>

        <div class="yAxis">
          <h5>y 轴(yAxis)相关配置</h5>
          <el-form-item label="是否显示">
            <el-switch v-model="model.yAxis.show" @change='drawEcharts' />
          </el-form-item>
          <div class="son" v-if='model.yAxis.show'>
            <el-form-item label="轴色">
              <el-color-picker v-model="model.yAxis.axisLine.lineStyle.color" @change='drawEcharts' />
            </el-form-item>
            <el-form-item label="标签色">
              <el-color-picker v-model="model.yAxis.axisLabel.color" @change='drawEcharts' />
            </el-form-item>
            <el-form-item label="标签字体大小">
              <el-input-number v-model="model.yAxis.axisLabel.fontSize" @change="drawEcharts" :min="12" :max="20" label="描述文字"></el-input-number>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Echarts from 'echarts'
export default {
  name: 'ChartConfig',
  components: {},
  props: {},
  data () {
    return {
      isDrew: true,
      myEcharts: null,
      chartType: 'bar',
      xAxis: [
        { name: 'Mon', selected: true },
        { name: 'Tue', selected: true },
        { name: 'Wed', selected: true },
        { name: 'Thu', selected: true },
        { name: 'Fri', selected: true },
        { name: 'Sat', selected: true },
        { name: 'Sun', selected: true }
      ],
      yAxis: [10, 52, 200, 334, 390, 330, 220],
      legendFormatter: 'default',
      pieSelected: ['Mon', 'Wed'],
      tooltipFormatter: 'default',
      model: {
        title: {
          show: false,
          text: '公用参数配置',
          link: 'https://www.baidu.com',
          subtext: '纯属瞎编来的'

        },
        legend: {
          show: true,
          type: 'plain',
          right: 0,
          orient: 'vertical',
          formatter: 'default',
          selected: null
        },
        xAxis: {
          show: true,
          name: 'T',
          type: 'category',
          data: [],
          // 轴线相关设置
          axisLine: {
            show: true,
            lineStyle: {
              color: '#2C2626',
              width: 3
            }
          },
          // 刻度相关设置
          axisTick: {
            alignWithLabel: true
          },
          // 坐标轴刻度标签的相关设置
          axisLabel: {
            show: true,
            fontSize: 16,
            color: '#000000'
          }
        },
        yAxis: {
          show: true,
          type: 'value',
          name: 'T',
          // 轴线相关设置
          axisLine: {
            show: true,
            lineStyle: {
              color: '#2C2626',
              width: 3
            }
          },
          // 坐标轴刻度标签的相关设置
          axisLabel: {
            show: true,
            fontSize: 16,
            color: '#000000'
          }
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        series: [
          {
            name: '纯属瞎编',
            type: 'bar',
            barWidth: '60%',
            data: []
          }
        ]
      }
    }
  },
  computed: {
    // 获取饼状图的数据
    getPieSeriesData () {
      return this.yAxis.map((i, index) => ({
        value: this.yAxis[index],
        name: this.xAxis[index].name
      }))
    },

    // 格式化处理 Echarts 图数据
    formatOption () {
      const { title, legend, tooltip, xAxis, yAxis, series } = this.model

      // 格式化 legend
      this.formatLegend(legend)

      // 格式化 xAxis
      this.formatXAxis(xAxis)

      // 格式化 yAxis
      this.formatYAxis(yAxis)

      // 格式化 tooltip
      this.formatTooltip(tooltip)

      // 格式化 series
      this.formatSeries(series)

      return {
        title,
        legend,
        tooltip,
        xAxis,
        yAxis,
        series
      }
    }
  },
  methods: {
    // 画图
    drawEcharts () {
      this.isDrew = false
      this.$nextTick(() => {
        this.isDrew = true
        this.$nextTick(() => {
          this.myEcharts = Echarts.init(document.getElementById('config'))

          // 监听 legend 切换
          this.legendSwitch()

          this.$createEchart(this.formatOption, this.myEcharts)
        })
      })
    },

    // 格式化 legend
    formatLegend (legend) {
      if (this.legendFormatter === 'default') {
        legend.formatter = null
      } else if (this.legendFormatter === 'tpl') {
        legend.formatter = '模板 - {name}'
      } else {
        legend.formatter = name => `函数 - ${name}`
      }

      if (this.chartType === 'pie') {
        const o = {}
        legend.selected = this.xAxis.map((i) => {
          o[i.name] = this.pieSelected.includes(i.name)
        })
        legend.selected = o
      } else {
        legend.selected = null
      }
    },

    // 格式化 xAxis
    formatXAxis (xAxis) {
      xAxis.show = this.chartType !== 'pie'
      if (this.chartType !== 'pie') {
        xAxis.data = this.xAxis.map((i) => i.name)
      }
    },

    // 格式化 yAxis
    formatYAxis (yAxis) {
      yAxis.show = this.chartType !== 'pie'
    },

    // 格式化 tooltip
    formatTooltip (tooltip) {
      tooltip.trigger = this.chartType === 'pie' ? 'item' : 'axis'

      if (this.tooltipFormatter === 'default') {
        tooltip.formatter = null
      } else if (this.tooltipFormatter === 'tpl') {
        tooltip.formatter = '<span style="text-decoration: underline;">模版 - {b0}: {c0}</span>'
      } else {
        tooltip.formatter = (params) => {
          // 饼状图时， params 是一个对象
          if (!Array.isArray(params)) {
            params = [params]
          }

          const { name, value } = params[0]

          return `<span style="text-decoration: underline;">函数 - ${name}: ${value}</span>`
        }
      }
    },

    // 格式化 series
    formatSeries (series) {
      series.map(i => {
        i.type = this.chartType
        if (this.chartType === 'pie') {
        } else {
          i.data = this.getPieSeriesData
        }
        return i
      })
    },
    // 监听 legend 切换
    legendSwitch () {
      this.myEcharts.on('legendselectchanged', params => {
        if (this.chartType === 'pie') {
          const { selected } = params
          const r = []
          for (const i of Object.entries(selected)) {
            if (i[1]) {
              r.push(i[0])
            }
          }
          this.pieSelected = r
        }
      })
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
.config-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .chart {
    display: inline-block;
    width: 49%;
    height: 100%;
    margin-right: 1%;
    box-sizing: border-box;
    #config {
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
