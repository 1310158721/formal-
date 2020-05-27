import Vue from 'vue'

Vue.prototype.$createEchart = (option = {}, myChart) => {
  myChart.setOption(option)
}
