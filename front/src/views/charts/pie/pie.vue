<template>
  <div class="pie-wrapper">
    <div class="chart">
      <div id="pie" v-if="isDrew"></div>
    </div>
    <div class="handler">
      <h3>饼图参数</h3>
      <el-form
        :model="model"
        size="mini"
        label-width="130px"
        label-position="left"
      >
        <el-form-item label="新增名称">
          <el-input v-model="addModel.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="新增数量">
          <el-input-number v-model="addModel.value" :min="1" label="描述文字"></el-input-number>
        </el-form-item>
        <el-button type='primary' size='mini' @click='handleCreate'>新 增</el-button>
        <el-button type='danger' size='mini' @click='handleDecrease'>删除最后一项</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import Echarts from 'echarts'
export default {
  name: 'ChartPie',
  components: {},
  props: {},
  data () {
    return {
      isDrew: true,
      myEcharts: null,
      addModel: {
        name: '',
        value: 1
      },
      model: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '瞎编的数据',
            type: 'pie',
            data: [
              { value: 335, name: '首页' },
              { value: 310, name: '待办事项' },
              { value: 274, name: '文章' },
              { value: 235, name: '编辑器' },
              { value: 400, name: '图表' },
              { value: 199, name: '组件' },
              { value: 169, name: '指令' }
            ],
            label: {
              show: true
            }
          }
        ]
      }
    }
  },
  computed: {
    formatOption () {
      const { tooltip, series } = this.model

      return {
        tooltip,
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
          this.myEcharts = Echarts.init(document.getElementById('pie'))
          this.$createEchart(this.formatOption, this.myEcharts)
        })
      })
    },
    handleCreate () {
      if (!this.addModel.name) {
        this.$message.error('名称不能为空')
        return
      }

      if (!(typeof this.addModel.value === 'number' && this.addModel.value >= 1)) {
        this.$message.error('数量必须大于 1')
        return
      }

      this.model.series[0].data.push(JSON.parse(JSON.stringify(this.addModel)))
      this.drawEcharts()
      this.addModel.name = ''
      this.addModel.value = 1
    },

    handleDecrease () {
      this.model.series[0].data.pop()
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
.pie-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .chart {
    display: inline-block;
    width: 49%;
    height: 100%;
    margin-right: 1%;
    box-sizing: border-box;
    #pie {
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
