const config = require('../../config/config')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { myRes } = require('../utils/res')
const $axios = require('axios')

// 声明一个用户相关信息的类
class USER {
  constructor() {
    this.app = global.app

    // 用户数据结构
    this.userSchema = new Schema({
      account: String,
      password: String,
      name: String,
      mobile: String,
      avatar: String,
      role: String,
      roleDesc: String,
      hasPermission: String,
      desc: String,
      token: String,
      createdTime: Number
    })

    // 用户权限枚举
    this.roleEnum = [
      { label: '超级管理员', value: 'superadmin', roleDesc: '超级管理员' },
      { label: '管理员', value: 'admin', roleDesc: '管理员' },
      { label: '普通用户', value: 'common', roleDesc: '普通用户' }
    ]

    // 数据库连接状态
    this.db = mongoose.createConnection('mongodb://127.0.0.1:27017/formalAdminCommon', { useUnifiedTopology: true, useNewUrlParser: true })

    // 用户数据模型 => 对应到数据库的某张表
    this.userModel = this.db.model('alluser', this.userSchema)

    // 创建类时最后调取开启 api 的方法
    this.openApi()
  }

  /**
   * 用户登录接口
   * 接收 account, password 两个参数
   */
  login() {
    this.app.post('/api/login', (req, res, next) => {
      const { account = '', password = '' } = req.body
      if (!account || !password) {
        myRes(res, null, 400, '参数不能为空')
      } else {
        const conditions = { account, password }
        this.userModel.find(conditions, { _id: 0 })
          .then((doc) => {
            if (!doc.length) {
              myRes(res, null, 400, '找不到该用户')
            } else if (doc.length >= 2) {
              myRes(res, null, 400, '数据库存在两个相同的用户，请联系管理员处理')
            } else {
              const { token } = doc[0];
              // cookie 有效期 2h
              res.cookie('token', token, {
                maxAge: 1000 * 60 * 60 * 2,
                signed: true
              });
              myRes(res, doc[0], 0, '查询成功')
            }
          })
          .catch((err) => {
            myRes(res, err, 500, '数据库出错了')
          })
      }
    })
  }

  /**
   * 根据 token / id 查看单个用户数据
   * 接受请求参数 token / id
   */
  checkUser() {
    this.app.get('/api/checkUser', (req, res, next) => {
      let { id, token, inside } = req.query
      if (!inside) {
        token = req.signedCookies.token
      }
      if (!token && !id) {
        myRes(res, null, 400, '参数不能为空')
      } else {
        const conditions = id ? { _id: id } : { token }
        this.userModel.find(conditions, { token: 0, __v: 0 })
          .then((doc) => {
            if (!doc.length) {
              myRes(res, null, 400, '找不到该用户')
            } else if (doc.length >= 2) {
              myRes(res, null, 400, '数据库存在两个相同的用户，请联系管理员处理')
            } else {
              myRes(res, doc[0], 0, '查询成功')
            }
          })
          .catch((err) => {
            myRes(res, err, 500, '数据库出错了')
          })
      }   
    })
  }

  /**
   * 注册用户
   */
  registerUser() {
    this.app.post('/api/registerUser', (req, res, next) => {
      const {
        account = '',
        password = '',
        name = '',
        mobile = '',
        avatar = '',
        role = '',
        desc = '',
        hasPermission = ''
      } = req.body
      if (
        !account ||
        !password ||
        !name ||
        !mobile ||
        !avatar ||
        !role ||
        !desc,
        !hasPermission
      ) {
        myRes(res, null, 400, '参数不能为空')
      } else {
        this.userModel.find({ account })
          .then((doc) => {
            if (doc.length) {
              myRes(res, null, 400, '该账号已存在')
            } else {
              const roleDesc = this.roleEnum.filter((i) => i.value === role)[0].roleDesc
              const token = account
              const createdTime = Date.now()
              const dataModel = new this.userModel({
                account,
                password,
                name,
                mobile,
                avatar,
                role,
                roleDesc,
                desc,
                token,
                createdTime,
                hasPermission
              })
              dataModel.save()
                .then(() => {
                  myRes(res, null, 0, '添加用户成功')
                })
                .catch((err) => {
                  myRes(res, null, 400, '添加用户失败')
                })
            }
          })
          .catch((err) => {
            myRes(res, err, 500, '数据库出错了')
          })
      }
    })
  }

  /**
   * 删除用户
   */
  deleteUser() {
    this.app.get('/api/deleteUser', (req, res, next) => {
      const { id } = req.query
      if (!id) {
        myRes(res, null, 400, '参数不能为空')
      } else {
        this.userModel.deleteOne({ _id: id })
          .then(() => {
            myRes(res, null, 0, '删除用户成功')
          })
          .catch((err) => {
            myRes(res, err, 500, '数据库出错了')
          })
      }
    })
  }

  /**
   * 更新用户信息
   */
  updateUser() {
    this.app.post('/api/updateUser', (req, res, next) => {
      const {
        id = '',
        account = '',
        password = '',
        name = '',
        mobile = '',
        avatar = '',
        role = '',
        desc = '',
        hasPermission = ''
      } = req.body
      if (
        !id ||
        !account ||
        !password ||
        !name ||
        !mobile ||
        !avatar ||
        !role ||
        !desc ||
        !hasPermission
      ) {
        myRes(res, null, 400, '参数不能为空')
      } else {
        const content = {
          account,
          password,
          name,
          mobile,
          avatar,
          role,
          roleDesc: this.roleEnum.filter((i) => i.value === role)[0].roleDesc,
          desc,
          hasPermission
        }
        this.userModel.updateOne({ _id: id }, content)
          .then(() => {
            myRes(res, null, 0, '更新用户成功')
          })
          .catch((err) => {
            myRes(res, err, 500, '数据库出错了')
          })
      }
    })
  }

  /**
   * 查看所有用户数据，没有查询条件
   */
  checkAllUsers() {
    this.app.get('/api/checkAllUsers', (req, res, next) => {
      const { token } = req.signedCookies
      const { size = 20, page = 1, keyword = '', role = '' } = req.query

      // 模糊搜索条件
      const vagueConditions = {}

      // 添加关键字模糊搜索
      if (keyword) {
        vagueConditions.$or = []
        vagueConditions.$or.push(...[
          { name: { $regex: keyword, $options: '$i' } },
          { account: { $regex: keyword, $options: '$i' } },
          { mobile: { $regex: keyword, $options: '$i' } }
        ])
      }

      // 添加 role 模糊搜索
      if (role) {
        vagueConditions.$or = []
        // $eq 精确搜索
        vagueConditions.$or.push({ role: { $eq: role } })
      }

      /**
       * 先查询用户权限，以便展示给当前用户适合的列表数据（如，管理员只能查看普通用户的）
       * 先查询符合条件的条数
       * 在查询符合条件的结果
       */
      $axios.get(`http://127.0.0.1:${config.PORT}/api/checkUser`, { params: { token, inside: true } })
        .then((response) => {
          const { result, code } = response.data
          if (code === 0) {
            const { role, account } = result
            // 过滤用户没有权限查看的数据，default 权限为假设存在的，避免在 mongodb 过滤（nor）时出错
            let filter = { role: 'default' }
            // 当账号不为 tanglihe 时，需要过滤当前用户允许查看的用户列表数据
            if (account !== 'tanglihe') {
              if (role === 'common') {
                filter = [{ role: 'common' }, { role: 'admin' }, { role: 'superadmin' }]
              } else if (role === 'admin') {
                filter = [{ role: 'admin' }, { role: 'superadmin' }]
              } else {
                filter = [{ role: 'superadmin' }]
              }
            }
            
            // 查询符合条件的用户条数
            this.userModel
              .countDocuments(vagueConditions)
              .nor(filter)
              .then((count) => {
                // 查询符合条件的用户数据
                this.userModel
                  .find(vagueConditions, { __v: 0 })
                  .nor(filter)
                  .limit(Number.parseInt(size))
                  .skip((Number.parseInt(page) - 1) * Number.parseInt(size))
                  .then((doc) => {
                    const r = {
                      list: account === 'tanglihe' ? doc : [result, ...doc],
                      total: count + 1
                    }
                    myRes(res, r, 0, '查询成功')
                  })
                  .catch((err) => {
                    myRes(res, err, 500, '数据库出错了')
                  })
              })
              .catch((err) => {
                myRes(res, err, 500, '数据库出错了')
              })
          }
        })
        .catch((err) => {
          myRes(res, err, 400, '$axios 请求数据出错')
        })
    })
  }

  // 表示开启的 api
  openApi() {
    this.checkUser()
    this.checkAllUsers()
    this.login()
    this.registerUser()
    this.deleteUser()
    this.updateUser()
  }
}

const user = new USER()
