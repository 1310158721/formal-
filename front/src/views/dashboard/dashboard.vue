<template>
  <div class="dashboard-wrapper">
    <div id="bar" v-t-full-screen='optionsBar' v-if='xAxisData.length' style="backgroundColor: #ffffff;" />
    <div id="line" v-t-full-screen='optionsLine' v-if='xAxisData.length' style="backgroundColor: #ffffff;" />
    <div id="pie" v-t-full-screen='optionsPie' v-if='xAxisData.length' style="backgroundColor: #ffffff;" />
    <div id="multiple" v-t-full-screen='optionsMultiple' v-if='xAxisData.length' style="backgroundColor: #ffffff;" />
  </div>
</template>

<script>
import Echarts from 'echarts'
export default {
  name: 'Dashboard',
  components: {},
  props: {},
  data () {
    return {
      xAxisData: [],
      yAxisData: [],
      isBarFullScreen: false,
      optionsBar: {
        fnCallback: () => {
          this.isBarFullScreen = !this.isBarFullScreen
        },
        dom: 'bar'
      },
      optionsLine: {
        dom: 'line'
      },
      optionsPie: {
        dom: 'pie'
      },
      optionsMultiple: {
        dom: 'multiple'
      }
    }
  },
  computed: {
    barOption () {
      return {
        tooltip: {
          show: true
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '菜单详情',
            type: 'bar',
            barWidth: '50%',
            data: this.yAxisData
          }
        ]
      }
    },
    lineOption () {
      return {
        xAxis: {
          type: 'category',
          data: this.xAxisData,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.yAxisData,
          type: 'line'
        }]
      }
    },
    pieOption () {
      const data = this.xAxisData.map((i, index) => {
        return {
          value: this.yAxisData[index],
          name: this.xAxisData[index]
        }
      })

      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.xAxisData
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    multipleOption () {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.xAxisData
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '折线',
            type: 'line',
            data: this.yAxisData,
            itemStyle: {
              color: 'lightblue'
            }
          },
          {
            name: '柱图',
            type: 'bar',
            data: this.yAxisData,
            barWidth: '40%',
            itemStyle: {
              color: '#FF1100'
            }
          }
        ]
      }
    }
  },
  methods: {
    getMenuData () {
      const menuList = this.$store.state.menuList
      menuList.map((i) => {
        if (!i.children || !i.children.length) {
          this.xAxisData.push(i.title)
          this.yAxisData.push(0)
        } else {
          this.xAxisData.push(i.title)
          this.yAxisData.push(i.children.length)
        }
      })
    },
    drawEcharts () {
      // 柱图
      const myChartBar = Echarts.init(document.getElementById('bar'))
      this.$createEchart(this.barOption, myChartBar)

      // 折线图
      const myChartLine = Echarts.init(document.getElementById('line'))
      this.$createEchart(this.lineOption, myChartLine)

      // 扇形
      const myChartPie = Echarts.init(document.getElementById('pie'))
      this.$createEchart(this.pieOption, myChartPie)

      // 综合
      const myChartMultiple = Echarts.init(document.getElementById('multiple'))
      this.$createEchart(this.multipleOption, myChartMultiple)

      // 监听 window resize 事件
      window.addEventListener('resize', function () {
        myChartBar.resize()
        myChartLine.resize()
        myChartPie.resize()
        myChartMultiple.resize()
      }, false)
    }
  },
  created () {
    this.getMenuData()
  },
  mounted () {
    this.drawEcharts()
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.dashboard-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  #bar {
    display: inline-block;
    width: 49%;
    height: 300px;
    border: 1px black solid;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
  }
  #line {
    display: inline-block;
    margin-left: 2%;
    width: 49%;
    height: 300px;
    border: 1px black solid;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
  }
  #pie {
    display: inline-block;
    margin-top: 2%;
    width: 49%;
    height: 300px;
    border: 1px black solid;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
  }

  #multiple {
    display: inline-block;
    margin-top: 2%;
    margin-left: 2%;
    width: 49%;
    height: 300px;
    border: 1px black solid;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
  }
}
</style>
