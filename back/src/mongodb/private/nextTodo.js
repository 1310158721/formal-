const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { myRes } = require('../utils/res')

// 声明一个 待办事项 相关信息的类
class NEXTTODO {
  constructor() {
    this.app = global.app

    // 用户数据结构
    this.nextToDoSchema = new Schema({
      desc: String,
      isTop: Number,
      createdTime: Number
    })

    // 数据库连接状态
    this.db = mongoose.createConnection(`mongodb://127.0.0.1:${global.mongodbPort}/www_next_todo`, { useUnifiedTopology: true, useNewUrlParser: true })
  
    this.openApi()
  }

  /**
   * 根据当前用户的 token 获取对应的待办事项列表
   */
  getNextList() {
    this.app.get('/api/getNextList', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const { page = 1, size = 20, keyword = '' } = req.query
        const nexttodoModel = this.db.model(token, this.nextToDoSchema)
        // 模糊搜索条件
        const or = [
          {
            desc: { $regex: keyword, $options: '$i' }
          }
        ]
        nexttodoModel
          .countDocuments()
          .sort({
            isTop: -1,
            createdTime: -1
          })
          .or(or)
          .then((total) => {
            nexttodoModel
              .find()
              .sort({
                isTop: -1,
                createdTime: -1
              })
              .or(or)
              .limit(Number.parseInt(size))
              .skip(Number.parseInt(page - 1) * Number.parseInt(size))
              .then((doc) => {
                const r = {
                  list: doc,
                  total
                }
                myRes(res, r, 0, '查询列表成功')
              })
          })
      }
    })
  }

  /**
   * 根据当前用户的 token 新增待办事项列表
   */
  createItem() {
    this.app.post('/api/createNextItem', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const { desc } = req.body
        if (!desc) {
          myRes(res, null, 400, '参数不能为空')
        } else {
          const nexttodoModel = this.db.model(token, this.nextToDoSchema)
          const nexttodoData = new nexttodoModel({
            desc,
            isTop: 0,
            createdTime: Date.now()
          })
          nexttodoData
            .save()
            .then(() => {
              myRes(res, null, 0, '新增数据成功')
            })
            .catch((err) => {
              myRes(res, err, 400, '数据库出错了')
            })
        }
      }
    })
  }

  /**
   * 根据当前用户的 token 及列表item的 ID 删除待办事项列表
   */
  deleteItem() {
    this.app.get('/api/deleteNextItem', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const { id } = req.query
        if (!id) {
          myRes(res, null, 400, '参数不能为空')
        } else {
          const nexttodoModel = this.db.model(token, this.nextToDoSchema)
          nexttodoModel
            .deleteOne({ _id: id })
            .then(() => {
              myRes(res, null, 0, '删除列表item成功')
            })
            .catch((err) => {
              myRes(res, null, 400, '数据库出错了function')
            })
        }
      }
    })
  }

  /**
   * 根据当前用户的 token 及列表item的 ID 查看待办事项列表
   */
  checkItem() {
    this.app.post('/api/getNextItem', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const { id = '' } = req.body
        if (!id) {
          myRes(res, null, 400, '参数不能为空')
        } else {
          const nexttodoModel = this.db.model(token, this.nextToDoSchema)
          nexttodoModel
            .findById(id)
            .then((doc) => {
              myRes(res, doc, 0, '查看列表item成功')
            })
            .catch((err) => {
              myRes(res, null, 400, '数据库出错了function')
            })
        }
      }
    })
  }

  /**
   * 根据当前用户的 token 及列表item的 ID 更新待办事项列表
   */
  updateItem() {
    this.app.post('/api/updateNextItem', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const { id = '', desc = '' } = req.body
        if (!id || !desc) {
          myRes(res, null, 400, '参数不能为空')
        } else {
          const nexttodoModel = this.db.model(token, this.nextToDoSchema)
          nexttodoModel
            .findByIdAndUpdate(id, {
              desc
            })
            .then(() => {
              myRes(res, null, 0, '更新列表item成功')
            })
            .catch((err) => {
              myRes(res, null, 400, '数据库出错了function')
            })
        }
      }
    })
  }

  /**
   * 根据当前用户的 token 置顶待办事项列表
   */
  setItemTop() {
    this.app.post('/api/setNextItemTop', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const { id } = req.body
        if (!id) {
          myRes(res, null, 400, '参数不能为空')
        } else {
          const nexttodoModel = this.db.model(token, this.nextToDoSchema)
          nexttodoModel
            .findByIdAndUpdate(id, { isTop: Date.now() })
            .then(() => {
              myRes(res, null, 0, '置顶列表item成功')
            })
            .catch((err) => {
              myRes(res, null, 400, '数据库出错了function')
            })
        }
      }
    })
  }

  /**
   * 根据当前用户的 token 取消置顶待办事项列表
   */
  cancelItemTop() {
    this.app.post('/api/cancelNextItemTop', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const { id } = req.body
        if (!id) {
          myRes(res, null, 400, '参数不能为空')
        } else {
          const nexttodoModel = this.db.model(token, this.nextToDoSchema)
          nexttodoModel
            .findByIdAndUpdate(id, { isTop: 0 })
            .then(() => {
              myRes(res, null, 0, '置顶列表item成功')
            })
            .catch((err) => {
              myRes(res, null, 400, '数据库出错了function')
            })
        }
      }
    })
  }

  // 表示开启的 api
  openApi() {
    this.getNextList()
    this.createItem()
    this.deleteItem()
    this.setItemTop()
    this.cancelItemTop()
    this.checkItem()
    this.updateItem()
  }
}

const next = new NEXTTODO()
