const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { myRes } = require('../utils/res')
const MYOSS = require('../../utils/oss');
const myOss = new MYOSS();

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
      createdTime: Number,
      isTop: Number
    })

    // 数据库连接状态
    this.db = mongoose.createConnection(`mongodb://127.0.0.1:${global.mongodbPort}/www_article`, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
  
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
          createdTime = Date.now(),
          isTop = 0
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
            title, isPublish, tags, markdownValue, markdownRender, createdTime, isTop
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
  getArticle () {
    this.app.get('/api/getArticle', (req, res, next) => {
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
  updateArticle() {
    this.app.post('/api/updateArticle', (req, res, next) => {
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
            .findByIdAndUpdate(id, {
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
  getArticleList() {
    this.app.get('/api/getArticleList', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const {
          page = 1,
          size = 20,
          keyword = '',
          tag = ''
        } = req.query
        const articleModel = this.db.model(token, this.ArticleSchema)
        
        // 模糊搜索条件
        const vagueConditions = {}

        // 添加关键字模糊搜索
        if (keyword) {
          vagueConditions.$or = []
          vagueConditions.$or.push(...[
            { markdownValue: { $regex: keyword, $options: '$i' } },
            { title: { $regex: keyword, $options: '$i' } }
          ])
        }

        // 添加 role 模糊搜索
        if (tag) {
          vagueConditions.$or = []
          // $eq 精确搜索
          vagueConditions.$or.push({ tags: { $regex: tag, $options: '$i' } })
        }

        articleModel
          .countDocuments(vagueConditions)
          .sort({
            isTop: -1,
            createdTime: -1
          })
          .then((total) => {
            articleModel
              .find(vagueConditions)
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
          })
          .catch((err) => {
            console.log(err)
            myRes(res, err, 500, '数据库出错了')
          })
      }
    })
  }

  // 置顶列表 item
  setArticleItemTop () {
    this.app.post('/api/setArticleItemTop', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const { id } = req.body
        if (!id) {
          myRes(res, null, 400, '参数不能为空')
        } else {
          const articleModel = this.db.model(token, this.ArticleSchema)
          articleModel
            .findByIdAndUpdate(id, { isTop: Date.now() })
            .then(() => {
              myRes(res, null, 0, '置顶数据成功')
            })
            .catch((err) => {
              myRes(res, err, 500, '数据库出错了')
            })
        }
      }
    })
  }

  // 取消置顶列表 item
  cancelArticleItemTop () {
    this.app.post('/api/cancelArticleItemTop', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const { id } = req.body
        if (!id) {
          myRes(res, null, 400, '参数不能为空')
        } else {
          const articleModel = this.db.model(token, this.ArticleSchema)
          articleModel
            .findByIdAndUpdate(id, { isTop: 0 })
            .then(() => {
              myRes(res, null, 0, '置顶数据成功')
            })
            .catch((err) => {
              myRes(res, err, 500, '数据库出错了')
            })
        }
      }
    })
  }

  // 获取自定义类型枚举
  getArticleTagsEnum () {
    this.app.post('/api/getArticleTagsEnum', (req, res, next) => {
      const { token } = req.signedCookies
      if (!token) {
        myRes(res, null, 400, 'token 失效，请重新登录')
      } else {
        const articleModel = this.db.model(token, this.ArticleSchema)
        articleModel
          .find({}, { title: 0, isPublish: 0, markdownValue: 0, markdownRender: 0, createdTime: 0, isTop: 0, _id: 0, __v: 0 })
          .then((doc) => {
            // 过滤的代码应提取一个方法放到constructor上
            let r = []
            doc.map((i) => {
              r = [...r, ...(i.tags.split(','))]
            })
            r = [...new Set(r)]
            myRes(res, r, 0, '查询数据成功')
          })
          .catch((err) => {
            myRes(res, err, 500, '数据库出错了')
          })
      }
    })
  }

  /**
   * 定时删除阿里云OSS对象上的多余图片文件（article 文件夹）
   */
  deleteDbAllCollections() {
    const directory = 'article'
    const _this = this;
    this.db.on('connected', function() {
      console.log(
        'Article 阿里云OSS checking____________________________________________'
      );
      let timer = setInterval(() => {
        const collections = [];
        // 查询所有用户的 article 集合
        this.db.collections().then(data => {
          if (data.length) {
            data.map(i => {
              collections.push(i.s.namespace.collection.replace(/s$/g, ''));
            });

            let len = collections.length;
            let start = 0;
            loop(start);
            let content = [];
            function loop(start) {
              if (start >= len) {
                let mongodbPhotos = '';
                content.map(i => {
                  if (i.markdownRender) {
                    mongodbPhotos += i.markdownRender;
                  }
                });

                myOss.setBuckName(global.buckName).then(() => {
                  /**
                   * 搜索 oss global.buckName（bucket） 是否存在 article 文件夹
                   */
                  myOss.listDir(directory + '/').then(result => {
                    /**
                     * oss 当前存在的图片
                     */
                    const OssHasPhotos = [];
                    if (result.objects && result.objects.length) {
                      /**
                       * 获取所有 oss 当前存在的 图片
                       */
                      result.objects.forEach(obj => {
                        OssHasPhotos.push(obj.name.replace(directory + '/', ''));
                      });

                      /**
                       * 根据 oss 当前存在的 图片 与 对应数据库当前存在的所有图片 匹配，找出 oss 当前不被需要的图片
                       */
                      const unExist = OssHasPhotos.filter(
                        item => !mongodbPhotos.includes(item)
                      ).map(i => {
                        i = directory + '/' + i;
                        return i;
                      });

                      /**
                       * Oss 删除当前不被需要的图片
                       */
                      myOss.deleteMulti(unExist).then(() => {
                        console.log('Article 相关的多余图片已删除');
                      });
                    }
                  });
                });
                return false;
              }
              const ArticleSchema = _this.db.model(
                collections[start],
                _this.ArticleSchema
              );

              ArticleSchema
                .find()
                .then(doc => {
                  content = [...content, ...doc];
                  start += 1;
                  loop(start);
                });
            }
          }
        });
      }, global.deleteOssPhotoTime);
    });
  }

  openApi() {
    this.createArticle()
    this.getArticleList()
    this.deleteArticle()
    this.getArticle()
    this.updateArticle()
    this.setArticleItemTop()
    this.cancelArticleItemTop()
    this.getArticleTagsEnum()
    this.deleteDbAllCollections()
  }
}

const article = new ARTICLE()
