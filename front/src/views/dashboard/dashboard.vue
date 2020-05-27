<template>
  <div class="dashboard-wrapper">
    <div id="bar" v-if='xAxisData.length'></div>
    <div id="line" v-if='xAxisData.length'></div>
    <div id="pie" v-if='xAxisData.length'></div>
    <div id="multiple" v-if='xAxisData.length'></div>
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
      // chartData: [],
      xAxisData: [],
      yAxisData: []
    }
  },
  computed: {
    barOption () {
      return {
        tooltip: {
          // trigger: 'axis'
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
      // console.log(this.xAxisData)
      // console.log(this.yAxisData)
      const data = this.xAxisData.map((i, index) => {
        return {
          value: this.yAxisData[index],
          name: this.xAxisData[index]
        }
      })

      return {
        // title: {
        //   text: '某站点用户访问来源',
        //   subtext: '纯属虚构',
        //   left: 'center'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          data: this.xAxisData
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            // data: [
            //   { value: 335, name: '直接访问' },
            //   { value: 310, name: '邮件营销' },
            //   { value: 234, name: '联盟广告' },
            //   { value: 135, name: '视频广告' },
            //   { value: 1548, name: '搜索引擎' }
            // ],
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
        // title: {
        //   text: '折线图堆叠'
        // },
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
          // this.chartData.push({ title: i.title, count: 0 })
          this.xAxisData.push(i.title)
          this.yAxisData.push(0)
        } else {
          // this.chartData.push({ title: i.title, count: i.children.length })
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
  }
  #line {
    display: inline-block;
    margin-left: 2%;
    width: 49%;
    height: 300px;
    border: 1px black solid;
    box-sizing: border-box;
    border-radius: 10px;
  }
  #pie {
    display: inline-block;
    margin-top: 2%;
    width: 49%;
    height: 300px;
    border: 1px black solid;
    box-sizing: border-box;
    border-radius: 10px;
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
  }
}
</style>
