const config = require('../../config/config')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { myRes } = require('../utils/res')

// 声明一个 文章 相关信息的类
class ARTICLE {
  constructor() {
    this.app = global.app

    // 用户数据结构
    this.ArticleSchema = new Schema({
      title: String,
      isPublish: Boolean,
      tags: String,
      markdownValue: String,
      markdownRender: String,
      createdTime: Number
    })

    // 数据库连接状态
    this.db = mongoose.createConnection('mongodb://127.0.0.1:27017/formalAdminArticle', { useUnifiedTopology: true, useNewUrlParser: true })
  
    this.openApi()
  }

  /**
   * 根据 token 创建文章
   */
  createArticle() {
    this.app.post('/api/createArticle', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const {
          title = '',
          isPublish = false,
          tags = '',
          markdownValue = '',
          markdownRender = '',
          createdTime = Date.now()
        } = req.body
        if (
          !title ||
          !tags ||
          !markdownValue ||
          !markdownRender
        ) {
          myRes(res, null, 400, '参数不能为空')
        } else {
          const articleModel = this.db.model(token, this.ArticleSchema)
          const articleData = new articleModel({
            title, isPublish, tags, markdownValue, markdownRender, createdTime
          })
          articleData
            .save()
            .then(() => {
              myRes(res, null, 0, '添加文章成功')
            })
            .catch((err) => {
              myRes(res, err, 400, '数据库出错了')
            })
        }
      }
    })
  }

  /**
   * 根据 token 删除文章列表
   */
  deleteArticle () {
    this.app.get('/api/deleteArticle', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const { id = '' } = req.query
        if (!id) {
          myRes(res, null, 400, '参数不能为空')
        } else {
          const articleModel = this.db.model(token, this.ArticleSchema)
          articleModel
            .deleteOne({ _id: id })
            .then(() => {
              myRes(res, null, 0, '删除文章成功')
            })
            .catch((err) => {
              myRes(res, err, 400, '数据库出错了')
            })
        }
      }
    })
  }

  /**
   * 根据 token id 查询单条文章列表
   */
  checkArticleListItem () {
    this.app.get('/api/checkArticleListItem', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const { id = '' } = req.query
        if (!id) {
          myRes(res, null, 400, '参数不能为空')
        } else {
          const articleModel = this.db.model(token, this.ArticleSchema)
          articleModel
            .find({ _id: id })
            .then((doc) => {
              myRes(res, doc[0], 0, '查询文章成功')
            })
            .catch((err) => {
              myRes(res, err, 400, '数据库出错了')
            })
        }
      }
    })
  }

  /**
   * 根据 token id 修改单条文章列表
   */
  updateArticleListItem() {
    this.app.post('/api/updateArticleListItem', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const {
          id = '',
          title = '',
          isPublish = false,
          tags = '',
          markdownValue = '',
          markdownRender = ''
        } = req.body
        if (
          !id ||
          !title ||
          !isPublish ||
          !tags ||
          !markdownValue ||
          !markdownRender
        ) {
          myRes(res, null, 400, '参数不能为空')
        } else {
          const articleModel = this.db.model(token, this.ArticleSchema)
          articleModel
            .update({ _id: id }, {
              title,
              isPublish,
              tags,
              markdownValue,
              markdownRender
            })
            .then(() => {
              myRes(res, null, 0, '更新数据成功')
            })
            .catch((err) => {
              myRes(res, err, 400, '数据库出错了')
            })
        }
      }
    })
  }

  /**
   * 根据 token 获取文章列表
   */
  checkArticleList() {
    this.app.get('/api/checkArticleList', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const {
          page = 1,
          size = 20,
          keyword = ''
        } = req.query
        const articleModel = this.db.model(token, this.ArticleSchema)
        const or = [
          { markdownValue: { $regex: keyword, $options: '$i' } },
          { title: { $regex: keyword, $options: '$i' } }
        ]
        articleModel
          .countDocuments()
          .or(or)
          .then((total) => {
            articleModel
              .find()
              .or(or)
              .limit(Number.parseInt(size))
              .skip((Number.parseInt(page) - 1) * Number.parseInt(size))
              .then((doc) => {
                const r = {
                  list: doc,
                  total
                }
                myRes(res, r, 0, '查询列表成功')
              })
          })
          .catch((err) => {
            myRes(res, err, 400, '数据库出错了')
          })
      }
    })
  }

  openApi() {
    this.createArticle()
    this.checkArticleList()
    this.deleteArticle()
    this.checkArticleListItem()
    this.updateArticleListItem()
  }
}

const article = new ARTICLE()
