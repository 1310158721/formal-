const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { myRes } = require('../utils/res')
const $axios = require('axios')

// 声明一个插件列表相关的类
class PLUGINS {
  constructor() {
    this.app = global.app

    // 用户数据结构
    this.pluginSchema = new Schema({
      name: String,
      url: String,
      createdTime: Number,
      desc: String,
      isTop: Number
    })

    // 数据库连接状态
    this.db = mongoose.createConnection(`mongodb://127.0.0.1:${global.mongodbPort}/www_public`, { useUnifiedTopology: true, useNewUrlParser: true })

    // 用户数据模型 => 对应到数据库的某张表
    this.pluginModel = this.db.model('plugin', this.pluginSchema)

    // 创建类时最后调取开启 api 的方法
    this.openApi()
  }

  /**
   * 查看插件列表信息
   */
  checkPluginList() {
    this.app.get('/api/checkPluginList', (req, res, next) => {
      const {
        page = 1,
        size = 20,
        keyword = ''
      } = req.query

      // 模糊搜索条件
      const $or = [
        { name: { $regex: keyword, $options: '$i' } },
        { desc: { $regex: keyword, $options: '$i' } }
      ]

      this.pluginModel
        .countDocuments()
        .or($or)
        .sort({
          createdTime: -1,
          isTop: -1
        })
        .then((total) => {
          this.pluginModel
            .find()
            .or($or)
            .sort({
              isTop: -1,
              createdTime: -1
            })
            .limit(Number.parseInt(size))
            .skip((Number.parseInt(page) - 1) * Number.parseInt(size))
            .then((doc) => {
              const r = {
                list: doc,
                total
              }
              myRes(res, r, 0, '查询列表成功')
            })
            .catch((err) => {
              myRes(res, err, 400, '数据库出错了')
            })
        })
        .catch((err) => {
          myRes(res, err, 400, '数据库出错了')
        })
    })
  }

  /**
   * 新增插件列表信息
   */
  createPluginListItem() {
    this.app.post('/api/createPluginListItem', (req, res, next) => {
      const {
        name = '',
        url = '',
        desc = '',
        createdTime = Date.now(),
        isTop = 0
      } = req.body

      if (
        !name ||
        !url ||
        !desc
      ) {
        myRes(res, null, 400, '参数不能为空')
      } else {
        const saveData = new this.pluginModel({
          name, url, desc, createdTime, isTop
        })
        saveData
          .save()
          .then(() => {
            myRes(res, null, 0, '新增数据成功')
          })
          .catch((err) => {
            myRes(res, null, 500, '数据库出错了')
          })
      }
    })
  }

  /**
   * 删除插件列表信息
   */
  deletePluginListItem() {
    this.app.post('/api/deletePluginListItem', (req, res, next) => {
      const { id } = req.body
      if (!id) {
        myRes(res, null, 400, '参数不能为空')
      } else {
        this.pluginModel
          .findByIdAndDelete(id)
          .then(() => {
            myRes(res, null, 0, '删除数据成功')
          })
          .catch((err) => {
            myRes(res, null, 500, '数据库出错了')
          })
      }
    })
  }
  
  /**
   * 查看单条插件列表信息
   */
  checkPluginListItem() {
    this.app.get('/api/checkPluginListItem', (req, res, next) => {
      const { id } = req.query
      if (!id) {
        myRes(res, null, 400, '参数不能为空')
      } else {
        this.pluginModel
          .findById(id, { __v: 0, _id: 0, createdTime: 0 })
          .then((doc) => {
            myRes(res, doc, 0, '查询数据成功')
          })
          .catch((err) => {
            myRes(res, null, 500, '数据库出错了')
          })
      }
    })
  }

  /**
   * 更新单条插件列表信息
   */
  updatePluginListItem() {
    this.app.post('/api/updatePluginListItem', (req, res, next) => {
      const {
        id,
        name = '',
        url = '',
        desc = ''
      } = req.body
      if (
        !id ||
        !name || 
        !url ||
        !desc
      ) {
        myRes(res, null, 400, '参数不能为空')
      } else {
        this.pluginModel
          .findByIdAndUpdate(id, {
            name, url, desc
          })
          .then(() => {
            myRes(res, null, 0, '查询数据成功')
          })
          .catch((err) => {
            myRes(res, err, 500, '数据库出错了')
          })
      }
    })
  }

  /**
   * 置顶单条插件列表信息
   */
  setTopPluginListItem () {
    this.app.post('/api/setTopPluginListItem', (req, res, next) => {
      const { id } = req.body
      if (!id) {
        myRes(res, null, 400, '参数不能为空')
      } else {
        this.pluginModel
          .findByIdAndUpdate(id, {
            isTop: Date.now()
          })
          .then(() => {
            myRes(res, null, 0, '置顶数据成功')
          })
          .catch((err) => {
            myRes(res, err, 500, '数据库出错了')
          })
      }
    })
  }

  /**
   * 取消置顶单条插件列表信息
   */
  cancelSetTopPluginListItem () {
    this.app.post('/api/cancelSetTopPluginListItem', (req, res, next) => {
      const { id } = req.body
      if (!id) {
        myRes(res, null, 400, '参数不能为空')
      } else {
        this.pluginModel
          .findByIdAndUpdate(id, {
            isTop: 0
          })
          .then(() => {
            myRes(res, null, 0, '置顶数据成功')
          })
          .catch((err) => {
            myRes(res, err, 500, '数据库出错了')
          })
      }
    })
  }

  openApi() {
    this.checkPluginList()
    this.createPluginListItem()
    this.deletePluginListItem()
    this.checkPluginListItem()
    this.updatePluginListItem()
    this.setTopPluginListItem()
    this.cancelSetTopPluginListItem()
  }
}

new PLUGINS()
