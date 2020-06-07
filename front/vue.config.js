module.exports = {
  publicPath: './',
  outputDir: 'web',
  productionSourceMap: false,
  devServer: {
    before: function (app, server, compiler) {
      /* mock 接口 */
      app.get('/api/demo', (req, res) => {
        setTimeout(() => {
          res.send({
            data: 'something...'
          })
        }, 5000)
      })
    },
    proxy: {
      '/api': {
        /* 将来自 http://localhost:8000/api 的请求资源全部转发为 /api开头的请求 */
        target: 'http://localhost:8000/api',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/tools': {
        /* 将来自 http://www.tanglihe.cn/tools 的请求资源全部转发为 /tools开头的请求 */
        target: 'http://www.tanglihe.cn/tools',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/tools': ''
        }
      }
    }
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      echarts: 'echarts',
      'mavon-editor': 'MavonEditor',
      'vue-i18n': 'VueI18n',
      'element-ui': 'ELEMENT'
    }
  }
}
