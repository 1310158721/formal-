import moment from 'moment'
import Vue from 'vue'

Vue.filter('t-time-format', function (value, type = 'YYYY年MM月DD日 HH时mm分ss秒') {
  return moment(value).format(type)
})