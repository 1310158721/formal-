<template>
  <div class="line-wrapper">
    <div class="chart">
      <div id="line" v-if="isDrew"></div>
    </div>
    <div class="handler">
      <h3>柱形图常用参数</h3>
      <el-form
        :model="model"
        size="mini"
        label-width="130px"
        label-position="left"
      >
        <div class="title">
          <h5>
            title 配置项
          </h5>
          <el-form-item label="是否显示">
            <el-switch v-model="model.title.show" @change='drawLine' />
          </el-form-item>
        </div>

        <div class="legend">
          <h5>
            legend 配置项
          </h5>
          <el-form-item label="是否显示">
            <el-switch v-model="model.legend.show" @change='drawLine' />
          </el-form-item>
          <div class="son" v-if='model.legend.show'>
            <el-form-item label="Legend 文本处理">
              <el-radio-group v-model="legendDefineFormatter" @change='drawLine'>
                <el-radio label="default">默认</el-radio>
                <el-radio label="tpl">模板</el-radio>
                <el-radio label="func">函数</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="Legend 默认显示">
              <el-checkbox-group v-model="legendDefineSelected" @change='drawLine'>
                <el-checkbox label="柱形图1" />
                <el-checkbox label="柱形图2" />
              </el-checkbox-group>
            </el-form-item>
          </div>
        </div>

        <div class="xAxis">
          <h5>
            xAxis 配置项
          </h5>
          <div class="xAxis">
            <el-form-item label="是否显示">
              <el-switch v-model="model.xAxis.show" @change='drawLine' />
            </el-form-item>
            <div class="son" v-if='model.xAxis.show'>
              <el-form-item label="对齐刻度">
                <el-switch v-model="model.xAxis.axisTick.alignWithLabel" @change='drawLine' />
              </el-form-item>

              <el-form-item label="字体颜色">
                <el-color-picker v-model="model.xAxis.axisLabel.color" @change='drawLine' />
              </el-form-item>
            </div>
          </div>
        </div>

        <div class="yAxis">
          <h5>
            yAxis 配置项
          </h5>
          <div class="yAxis">
            <el-form-item label="是否显示">
              <el-switch v-model="model.yAxis.show" @change='drawLine' />
            </el-form-item>
            <div class="son" v-if='model.yAxis.show'>
              <el-form-item label="字体颜色">
                <el-color-picker v-model="model.yAxis.axisLabel.color" @change='drawLine' />
              </el-form-item>
            </div>
          </div>
        </div>

        <div class="tooltip">
          <h5>
            tooltip 配置项
          </h5>
          <div class="tooltip">
            <el-form-item label="是否显示">
              <el-switch v-model="model.tooltip.show" @change='drawLine' />
            </el-form-item>
            <div class="son" v-if='model.tooltip.show'>
              <el-form-item label="tooltip 内容">
                <el-radio-group v-model="tooltipFormatter" @change='drawLine'>
                  <el-radio label="default">默认</el-radio>
                  <!-- <el-radio label="tpl">模板</el-radio> -->
                  <el-radio label="func">函数</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </div>

        <div class="axisPointer">
          <h5>
            axisPointer 配置项
          </h5>
          <div class="axisPointer">
            <el-form-item label="是否显示">
              <el-switch v-model="model.axisPointer.show" @change='drawLine' />
            </el-form-item>
            <div class="son" v-if='model.axisPointer.show'>
              <el-form-item label="axisPointer 类型">
                <el-radio-group v-model="model.axisPointer.type" @change='drawLine'>
                  <el-radio label="none">无</el-radio>
                  <el-radio label="line">直线</el-radio>
                  <el-radio label="shadow">阴影</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </div>

        <div class="series">
          <h5>
            series 配置项
          </h5>
          <div class="series">
            <div class="son">
              <el-form-item label="线条效果">
                <el-radio-group v-model="lineType" @change='drawLine'>
                  <el-radio label="none">正常</el-radio>
                  <el-radio label="smooth">光滑</el-radio>
                  <el-radio label="step">阶梯</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Echarts from 'echarts'
export default {
  name: 'CharLine',
  components: {},
  props: {},
  data () {
    return {
      isDrew: true,
      myChartLine: null,
      legendDefineFormatter: 'default',
      legendDefineSelected: ['柱形图1'],
      barWidth: 25,
      tooltipFormatter: 'default',
      lineType: 'none',
      model: {
        title: {
          show: true,
          text: '柱形图 Demo 柱标题',
          textStyle: {
            width: '100%'
          },
          subtext: 'Demo 副标题'
        },
        // legend 生效，series 元素中必须要有一个 name 属性
        legend: {
          show: true,
          right: 0,
          formatter: null,
          selected: {
            柱形图1: false
          }
        },
        xAxis: {
          show: true,
          axisLabel: {
            color: 'red'
          },
          axisTick: {
            show: true,
            alignWithLabel: true
          },
          // 需要 xAxis，yAxis 设置 axisPointer.show 属性为 true
          axisPointer: {
            show: true
          },
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          show: true,
          type: 'value',
          axisLabel: {
            color: 'red'
          },
          axisPointer: {
            show: false
          }
        },
        tooltip: {
          show: true
        },
        axisPointer: {
          show: true,
          type: 'none'
        },
        series: [
          {
            name: '柱形图1',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line',
            barGap: 0,
            smooth: false, // 默认光滑效果
            barWidth: '25%',
            step: false
          },
          {
            name: '柱形图2',
            data: [120, 200, 150, 80, 70, 110, 130].reverse(),
            type: 'line',
            barGap: 0,
            smooth: false, // 默认光滑效果
            barWidth: '25%',
            step: false
          }
        ]
      }
    }
  },
  computed: {
    // 自定义 Legend 属性的 formatter 值
    defineLegendFormatter () {
      if (this.legendDefineFormatter === 'default') {
        return null
      } else if (this.legendDefineFormatter === 'tpl') {
        return '模板 - {name}'
      } else {
        return (name) => `函数 - ${name}`
      }
    },

    // 自定义 tooltip 属性的 formatter 值
    defineTooltipFormatter () {
      if (this.tooltipFormatter === 'default') {
        return null
      } else {
        return (params) => {
          if (!Array.isArray(params)) {
            params = [params]
          }
          let html = ''
          params.map((i) => {
            html += `<span>
              ${i.seriesName}: ${i.value}
            </span><br />`
          })
          return html
        }
      }
    },

    // 自定义默认选中的 Legend
    defineLegnedSelected () {
      const total = this.model.series.map((i) => i.name)
      const defaultSelected = this.legendDefineSelected
      const r = {}
      total.map((i) => {
        r[i] = defaultSelected.includes(i)
      })
      return r
    },

    // 自定义 Echarts 图的数据
    defineOption () {
      const title = this.model.title
      const legend = this.model.legend
      legend.formatter = this.defineLegendFormatter
      legend.selected = this.defineLegnedSelected

      const xAxis = this.model.xAxis
      const yAxis = this.model.yAxis
      const tooltip = this.model.tooltip
      tooltip.formatter = this.defineTooltipFormatter

      const axisPointer = this.model.axisPointer
      const series = this.model.series.map((i) => {
        i.barWidth = this.barWidth + '%'
        i.step = this.lineType === 'step'
        i.smooth = this.lineType === 'smooth'
        return i
      })

      return {
        title,
        legend,
        xAxis,
        yAxis,
        tooltip,
        axisPointer,
        series
      }
    }
  },
  methods: {
    // 画图
    drawLine () {
      this.isDrew = false
      this.$nextTick(() => {
        this.isDrew = true
        this.$nextTick(() => {
          this.myChartLine = Echarts.init(document.getElementById('line'))
          this.legendSwitch()
          this.$createEchart(this.defineOption, this.myChartLine)
        })
      })
    },
    // 监听 legend 切换
    legendSwitch () {
      this.myChartLine.on('legendselectchanged', params => {
        const { selected } = params
        const r = []
        for (const i of Object.entries(selected)) {
          if (i[1]) {
            r.push(i[0])
          }
        }
        this.legendDefineSelected = r
      })
    }
  },
  created () {
  },
  mounted () {
    this.drawLine()

    // 监听 window resize 事件
    window.addEventListener(
      'resize',
      () => {
        this.myChartLine.resize()
      },
      false
    )
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.line-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .chart {
    display: inline-block;
    width: 49%;
    height: 100%;
    margin-right: 1%;
    box-sizing: border-box;
    #line {
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
