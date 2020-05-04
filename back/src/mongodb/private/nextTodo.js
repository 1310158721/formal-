const config = require('../../config/config')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { myRes } = require('../utils/res')
const $axios = require('axios')

// 声明一个 待办事项 相关信息的类
class NEXTTODO {
  constructor() {
    this.app = global.app

    // 用户数据结构
    this.nextToDoSchema = new Schema({
      desc: String,
      createdTime: Number
    })

    // 数据库连接状态
    this.db = mongoose.createConnection('mongodb://127.0.0.1:27017/formalAdminNextTodo', { useUnifiedTopology: true, useNewUrlParser: true })
  
    this.openApi()
  }

  /**
   * 根据当前用户的 token 获取对应的待办事项列表
   */
  checkUserNextList() {
    this.app.get('/api/checkUserNextList', (req, res, next) => {
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
          .or(or)
          .then((total) => {
            nexttodoModel
              .find()
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
  createUserNextTodoItem() {
    this.app.post('/api/createUserNextTodoItem', (req, res, next) => {
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
  deleteUserNextTodoItem() {
    this.app.get('/api/deleteUserNextTodoItem', (req, res, next) => {
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
              myRes(res, null, 400, '数据库出错了')
            })
        }
      }
    })
  }

  // 表示开启的 api
  openApi() {
    this.checkUserNextList()
    this.createUserNextTodoItem()
    this.deleteUserNextTodoItem()
  }
}

const next = new NEXTTODO()
