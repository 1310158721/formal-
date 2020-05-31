<template>
  <div class="bar-wrapper">
    <div class="chart">
      <div id="chart-config" v-if="isDrew"></div>
    </div>
    <div class="handler">
      <h3>常用参数修改</h3>
      <el-form
        :model="model"
        size="mini"
        label-width="96px"
        label-position="left"
      >
        <el-form-item label="添加额外折线" v-if='chartType !== "pie"'>
          <el-switch v-model="extraLine" @change="handleAddExtraLine" />
        </el-form-item>

        <el-form-item label="切换类型">
          <el-radio-group v-model="chartType" @change="drawBar">
            <el-radio label="bar">柱形图</el-radio>
            <el-radio label="line">折线图</el-radio>
            <el-radio label="pie">饼形图</el-radio>
          </el-radio-group>
        </el-form-item>

        <h5>title(标题) 配置</h5>
        <div>
          <el-form-item label="显示状态">
            <el-switch v-model="model.title.show" @change="drawBar" />
          </el-form-item>

          <el-form-item label="文本颜色" v-if="model.title.show">
            <el-color-picker
              size="mini"
              v-model="model.title.textStyle.color"
              @change="drawBar"
            />
          </el-form-item>

          <el-form-item label="子文本颜色" v-if="model.title.show">
            <el-color-picker
              size="mini"
              v-model="model.title.subtextStyle.color"
              @change="drawBar"
            />
          </el-form-item>
        </div>

        <h5>
          legend(图例组件,需要在 series 的每一个元素中添加 name 属性) 配置
        </h5>
        <div>
          <el-form-item label="显示状态">
            <el-switch v-model="model.legend.show" @change="drawBar" />
          </el-form-item>

          <el-form-item label="自定义文本" v-if="model.legend.show">
            <el-radio-group v-model="model.legend.formatter" @change="drawBar">
              <el-radio label="default">默认</el-radio>
              <el-radio label="tpl">模版自定义</el-radio>
              <el-radio label="func">函数自定义</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="是否选中" v-if="model.legend.show">
            <el-checkbox-group
              v-model="model.legend.selected"
              @change="drawBar"
            >
              <el-checkbox label="柱图">柱图</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>

        <h5>tooltip(提示框) 配置</h5>
        <div>
          <el-form-item label="显示状态">
            <el-switch
              v-model="model.tooltip.show"
              @change="drawBar"
            ></el-switch>
          </el-form-item>
          <el-form-item label="触发类型" v-if="model.tooltip.show">
            <el-radio-group v-model="model.tooltip.trigger" @change="drawBar">
              <el-tooltip
                content="数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用"
                placement="top"
                effect="light"
              >
                <el-radio label="item">item</el-radio>
              </el-tooltip>
              <el-tooltip
                content="坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用"
                placement="top"
                effect="light"
              >
                <el-radio label="axis">axis</el-radio>
              </el-tooltip>
              <el-tooltip content="什么都不触发" placement="top" effect="light">
                <el-radio label="none">none</el-radio>
              </el-tooltip>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="指示器类型"
            v-if="model.tooltip.trigger === 'axis' && model.tooltip.show"
          >
            <el-radio-group
              v-model="model.tooltip.axisPointer.type"
              @change="drawBar"
            >
              <el-radio label="line">line</el-radio>
              <el-radio label="shadow">shadow</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="提示框浮层" v-if="model.tooltip.show">
            <el-switch
              v-model="model.tooltip.showContent"
              @change="drawBar"
            ></el-switch>
          </el-form-item>

          <el-form-item
            label="浮层显示方式"
            v-if="model.tooltip.showContent && model.tooltip.show"
          >
            <el-radio-group v-model="model.tooltip.triggerOn" @change="drawBar">
              <el-radio label="mousemove">mousemove</el-radio>
              <el-radio label="click">click</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="浮层内容"
            v-if="model.tooltip.showContent && model.tooltip.show"
          >
            <el-radio-group v-model="model.tooltip.formatter" @change="drawBar">
              <el-radio label="default">默认</el-radio>
              <el-radio label="tpl">模版自定义</el-radio>
              <el-radio label="func">函数自定义</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="浮层背景色"
            v-if="model.tooltip.showContent && model.tooltip.show"
          >
            <el-color-picker
              size="mini"
              v-model="model.tooltip.backgroundColor"
              @change="drawBar"
            />
          </el-form-item>

          <el-form-item
            label="浮层边框色"
            v-if="model.tooltip.showContent && model.tooltip.show"
          >
            <el-color-picker
              size="mini"
              v-model="model.tooltip.borderColor"
              @change="drawBar"
            />
          </el-form-item>

          <el-form-item
            label="浮层边框"
            v-if="model.tooltip.showContent && model.tooltip.show"
          >
            <el-slider
              :min="1"
              :max="5"
              v-model="model.tooltip.borderWidth"
              @change="drawBar"
            ></el-slider>
          </el-form-item>

          <el-form-item
            label="浮层文本色"
            v-if="model.tooltip.showContent && model.tooltip.show"
          >
            <el-color-picker
              size="mini"
              v-model="model.tooltip.textStyle.color"
              @change="drawBar"
            />
          </el-form-item>
        </div>

        <h5>toolbox(工具栏) 配置</h5>
        <div>
          <el-form-item label="显示状态">
            <el-switch
              v-model="model.toolbox.show"
              @change="drawBar"
            ></el-switch>
          </el-form-item>

          <el-form-item label="保存图片" v-if="model.toolbox.show">
            <el-switch
              v-model="model.toolbox.feature.saveAsImage.show"
              @change="drawBar"
            ></el-switch>
          </el-form-item>

          <el-form-item label="还原" v-if="model.toolbox.show">
            <el-switch
              v-model="model.toolbox.feature.restore.show"
              @change="drawBar"
            ></el-switch>
          </el-form-item>

          <el-form-item label="数据视图化" v-if="model.toolbox.show">
            <el-switch
              v-model="model.toolbox.feature.dataView.show"
              @change="drawBar"
            ></el-switch>
          </el-form-item>

          <el-form-item label="数据区域缩放" v-if="model.toolbox.show">
            <el-switch
              v-model="model.toolbox.feature.dataZoom.show"
              @change="drawBar"
            ></el-switch>
          </el-form-item>

          <el-form-item label="动态类型切换" v-if="model.toolbox.show">
            <el-switch
              v-model="model.toolbox.feature.magicType.show"
              @change="drawBar"
            ></el-switch>
          </el-form-item>
        </div>

        <h5 v-if='chartType !== "pie"'>xAxis(x 轴) 配置</h5>
        <div v-if='chartType !== "pie"'>
          <el-form-item label="显示状态">
            <el-switch
              v-model="model.xAxis.show"
              @change="drawBar"
            />
          </el-form-item>
          <el-form-item label="对齐刻度" v-if='model.xAxis.show'>
            <el-switch v-model="model.xAxis.axisTick.alignWithLabel" @change="drawBar" />
          </el-form-item>
        </div>

        <h5 v-if='chartType !== "pie"'>yAxis(x 轴) 配置</h5>
        <div v-if='chartType !== "pie"'>
          <el-form-item label="显示状态">
            <el-switch
              v-model="model.yAxis.show"
              @change="drawBar"
            />
          </el-form-item>
        </div>

        <h5 v-if='chartType !== "pie"'>series(系列列表) 配置</h5>
        <div v-if='chartType !== "pie"'>
          <el-form-item label="柱图颜色" v-if='chartType === "bar"'>
            <el-color-picker
              size="mini"
              v-model="model.series[0].itemStyle.color"
              @change="drawBar"
            />
          </el-form-item>
          <el-form-item label="柱图宽度" v-if='chartType === "bar"'>
            <el-slider
              :min="1"
              v-model="barWidth"
              @change="drawBar"
            ></el-slider>
          </el-form-item>
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
      xAxisData: [],
      yAxisData: [],
      myChartBar: null,
      chartType: 'bar',
      extraLine: false,
      barWidth: 1, // vue 检测不到 series 数组中的某个元素的某个值改变，需要额外定义一个来响应式改变
      model: {
        alignment: true,
        title: {
          show: false,
          text: 'Echart demo 测试',
          link: 'https://www.baidu.com',
          textStyle: {
            color: '#0000ff',
            width: '100%'
          },
          subtext: '详情描述文本',
          subtextStyle: {
            color: 'rgba(0,0,0,.5)'
          }
        },
        legend: {
          show: false,
          formatter: 'default',
          selected: ['柱图'],
          right: 0,
          orient: 'vertical'
        },
        tooltip: {
          show: false,
          trigger: 'axis',
          triggerOn: 'mousemove',
          axisPointer: {
            type: 'shadow'
          },
          showContent: true,
          formatter: 'default',
          backgroundColor: 'rgba(0,0,0,.5)',
          borderColor: '#000000',
          borderWidth: 2,
          textStyle: {
            color: '#ffffff'
          }
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {
              show: false
            },
            restore: {
              show: false
            },
            dataView: {
              show: false
            },
            dataZoom: {
              show: false
            },
            magicType: {
              show: false,
              type: ['line', 'bar', 'tiled']
            }
          }
        },
        xAxis: {
          show: true,
          name: '日期',
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true // 对齐刻度
          }
        },
        yAxis: {
          show: true,
          name: '数量',
          type: 'value'
        },
        series: [
          {
            name: '柱图',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            barWidth: '1%',
            _barWidth: 1,
            itemStyle: {
              color: 'red'
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{b}: {@score}'
            }
          }
        ]
      }
    }
  },
  computed: {
    // 自定义提示框内容
    defineFormatter () {
      if (this.model.tooltip.formatter === 'default') {
        return null
      } else if (this.model.tooltip.formatter === 'tpl') {
        return `
            <h3>模版自定义提示框内容</h3>
            <div class="formatter-wrapper">
              <span class="circle" style="display: inline-block; background-color: ${this
                .model.color ||
                'red'}; width: 8px; height: 8px; border-radius: 50%; vertical-align: middle;">
              </span>
              <span>
                {b0}: {c0}
              </span>
            <div>
          `
      } else {
        return (params, ticket, callback) => {
          if (!Array.isArray(params)) {
            params = [params]
          }
          let html = `
              <h3>函数自定义提示框内容</h3>
            `
          params.map(i => {
            html += `
                <span class="circle" style="display: inline-block; background-color: ${this
                  .model.color &&
                  'red'}; width: 8px; height: 8px; border-radius: 50%;"></span>
                <span>当前数据为第 ${Number.parseInt(i.dataIndex) + 1} 条</span>
                <div style='text-indent: 13px;'>${i.axisValueLabel}: ${
              i.value
            }</div>
              `
          })
          return `
              <div class="formatter-wrapper">
                ${html}
              </div>
            `
        }
      }
    },

    // 自定义 Legend 文本
    defineLegendFormatter () {
      const formatter = this.model.legend.formatter
      if (formatter === 'default') {
        return null
      } else if (formatter === 'tpl') {
        return '模版 - {name}'
      } else {
        return name => `函数 - ${name}`
      }
    },

    // 自定义 Legend 选中状态
    defineLegendSelected () {
      const selected = this.model.legend.selected
      const hasExist = ['柱图']
      const r = {}
      hasExist.map(i => {
        r[i] = selected.includes(i)
      })
      return r
    },

    barOption () {
      const title = this.model.title

      const legend = Object.assign({}, this.model.legend, {
        formatter: this.defineLegendFormatter,
        selected: this.defineLegendSelected
      })

      const tooltip = Object.assign({}, this.model.tooltip, {
        formatter: this.defineFormatter
      })

      const toolbox = this.model.toolbox

      const xAxis = this.chartType === 'pie' ? null : this.model.xAxis

      const yAxis = this.chartType === 'pie' ? null : this.model.yAxis

      const series = this.chartType === 'pie' ? [this.model.series[0]] : this.model.series
      // const series = this.model.series

      series[0].barWidth = this.barWidth + '%'
      series[0]._barWidth = this.barWidth

      return {
        title,
        legend,
        tooltip,
        toolbox,
        xAxis,
        yAxis,
        series
      }
    }
  },
  methods: {
    // 画图
    drawBar () {
      this.isDrew = false
      this.$nextTick(() => {
        this.isDrew = true
        this.$nextTick(() => {
          this.myChartBar = Echarts.init(document.getElementById('chart-config'))
          this.$createEchart(this.barOption, this.myChartBar)
        })
      })
    },
    handleChange () {},
    handleAddExtraLine (val) {
      if (val) {
        this.model.series.push({
          name: '额外添加',
          data: [120, 200, 150, 80, 70, 110, 130].reverse(),
          type: 'line',
          barWidth: '1%',
          _barWidth: 1,
          itemStyle: {
            color: 'lightblue'
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{b}: {@score}'
          }
        })
      } else {
        this.model.series.splice(1, 1)
      }
      this.drawBar()
    }
  },
  created () {},
  mounted () {
    this.drawBar()

    // 监听 window resize 事件
    window.addEventListener(
      'resize',
      () => {
        this.myChartBar.resize()
      },
      false
    )
  },
  watch: {
    'chartType' () {
      if (this.chartType === 'bar' || this.chartType === 'line') {
        this.model.series[0] = {
          name: '柱图',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: this.chartType,
          barWidth: '1%',
          _barWidth: 1,
          itemStyle: {
            color: 'red'
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{b}: {@score}'
          }
        }
      } else if (this.chartType === 'pie') {
        this.model.series[0] = {
          name: '饼图',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 120, name: 'Mon' },
            { value: 200, name: 'Tue' },
            { value: 150, name: 'Wed' },
            { value: 80, name: 'Thu' },
            { value: 70, name: 'Fri' },
            { value: 110, name: 'Sat' },
            { value: 130, name: 'Sun' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      }
    }
  }
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
    #chart-config {
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
