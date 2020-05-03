const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MYOSS = require('../../oss/oss');
const myOss = new MYOSS();

const roleEnum = require('../../utils/enum').GetRoleEnum();

class USERINFOS {
  constructor() {
    this.app = global.APP;

    // 数据库连接状态
    this.db = mongoose.createConnection(
      `mongodb://127.0.0.1:${global.mongoPort}/allUser`,
      { useUnifiedTopology: true, useNewUrlParser: true }
    );

    // 用户数据结构 Schema
    this.UserSchema = new Schema({
      account: String,
      password: String,
      mobile: String,
      avatar: String,
      permission: String,
      desc: String,
      token: String,
      role: String,
      name: String,
      roleDesc: String,
      createdTime: Number,
      roleOrder: Number,
      isSelf: Boolean
    });

    // mongoose Model
    this.UserModel = this.db.model('user_list', this.UserSchema);
  }

  /**
   * 用户登录接口
   */
  Login() {
    this.app.get('/api/login', (req, res, next) => {
      const { account = '', password = '' } = req.query;
      if (!account || !password) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        })
      } else {
        const conditions = { account, password };
        this.UserModel.find(conditions)
          .then((doc) => {
            if (!doc.length) {
              res.send({
                result: null,
                status: 400,
                msg: '该用户不存在'
              })
            } else if (doc.length >= 2) {
              res.send({
                result: null,
                status: 400,
                msg: '存在重复的用户，请前往查看后台数据'
              })
            } else {
              const { token } = doc[0];
              // cookie 有效期 2h
              res.cookie('token', token, {
                maxAge: 1000 * 60 * 60 * 2,
                signed: true
              });
              res.send({
                result: null,
                status: 0,
                msg: '登录成功'
              })
            }
          })
          .catch((err) => {
            res.send({
              reusult: null,
              status: 400,
              msg: '查询用户信息失败'
            })
          })
      }
    })
  }

  /**
   * 获取用户信息
   */
  GetUserInfos() {
    this.app.get('/api/getUserInfos', (req, res, next) => {
      const { _id } = req.query;
      const { token } = req.signedCookies;
      const conditions = _id ? { _id } : { token };
      this.UserModel.find(conditions, { token: 0 })
        .then((user) => {
          if (!user.length) {
            res.send({
              result: null,
              status: 400,
              msg: '无该用户信息'
            })
          } else if (user.length >= 2) {
            res.send({
              result: null,
              status: 400,
              msg: '存在重复的该用户信息'
            })
          } else {
            res.send({
              result: user[0],
              status: 0,
              msg: '查询用户信息成功'
            })
          }
        })
        .catch((err) => {
          res.send({
            result: err,
            status: 400,
            msg: '查询用户信息出错'
          })
        })
    })
  }

  /**
   * 获取所有用户信息
   */
  GetAllUserInfos() {
    this.app.get('/api/getAllUserInfos', (req, res, next) => {
      const { token } = req.signedCookies;
      this.UserModel.find({ token }, { token: 0 })
        .then((user) => {
          if (!user.length) {
            res.send({
              result: null,
              status: 400,
              msg: '当前用户不存在'
            })
          } else if (user.length >= 2) {
            res.send({
              result: null,
              status: 400,
              msg: '存在重复的当前用户'
            })
          } else {
            const userRole = user[0].role;
            const userAccount = user[0].account;
            // ISNOTEXIST 为不存在的参数
            const norConditions = userRole === 'SUPERADMIN' ? (userAccount === 'tang' ? [{ISNOTEXIST: 'ISNOTEXIST'}] : [{ role: 'SUPERADMIN' }]) : [{ role: 'SUPERADMIN' }, {role: 'ADMIN'}];
            let {
              page = 1,
              size = 20,
              keyword = '',
              startTime = '',
              endTime = '',
              role = ''
            } = req.query;

            const $and = [
              {
                // 关键字模糊搜索
                $or: [
                  { name: { $regex: keyword, $options: '$i' } },
                  { mobile: { $regex: keyword, $options: '$i' } }
                ]
              },
              // 时间段搜索
              startTime && endTime ? {
                createdTime: {
                  // 时间段临界值处理
                  $gte: new Date(startTime + ' 00:00:00'),
                  $lte: new Date(endTime + ' 23:59:59')
                }
              } : {},
              // 用户等级搜索
              role ? {
                role
              } : {}
            ];

            this.UserModel.find({})
              .and($and)
              .nor(norConditions)
              .countDocuments()
              .then((count) => {
                this.UserModel.find({}, { token: 0, __v: 0 })
                  .sort({ roleOrder: 1 })
                  .sort({ isSelf: -1 })
                  // 多条件搜索
                  .and($and)
                  .nor(norConditions)
                  // 分页搜索（limit/skip）
                  .limit(Number.parseInt(size))
                  .skip(Number.parseInt(page - 1) * size)
                  // 排序
                  .sort({ createdTime: -1 })
                  .then((users) => {
                    // const master = JSON.parse(JSON.stringify(user[0]))
                    // master.isSelf = true;
                    // // 当前用户为SUPERADMIN时，能查看自身数据
                    // if (userRole === 'SUPERADMIN') {
                    //   users.unshift(master);
                    //   count += 1;
                    // }
                    res.send({
                      result: {
                        list: users,
                        count
                      },
                      status: 0,
                      msg: '获取所有用户信息成功'
                    })
                  })
                  .catch((err) => {
                    res.send({
                      result: null,
                      status: 400,
                      msg: '获取所有用户信息失败'
                    })
                  })
              })
              .catch((err) => {
                res.send({
                  result: err,
                  status: 400,
                  msg: '查询所有用户总条数失败'
                })
              })
          }
        })
        .catch((err) => {
          console.log(err);
          res.send({
            result: err,
            status: 400,
            msg: '获取用户信息出错'
          })
        })
    })
  }

  /**
   * 更新用户权限相关信息
   */
  UpdateUserPermissionInfos() {
    this.app.post('/api/updateUserPermissionInfos', (req, res, next) => {
      const { _id, permission, role } = req.body;
      if (!_id || !permission || !role) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        })
      } else {
        const roleDesc = roleEnum.filter((i) => i.value === role)[0].label;
        this.UserModel.findByIdAndUpdate(_id, { permission, role, roleDesc })
          .then(() => {
            res.send({
              result: null,
              status: 0,
              msg: '用户权限相关信息更新成功'
            })
          })
          .catch((err) => {
            res.send({
              result: null,
              status: 400,
              msg: '用户权限相关信息更新失败'
            })
          })
      }
    })
  }

  /**
   * 更新用户个人信息
   */
  UpdateUserPersonalInfos() {
    this.app.post('/api/updateUserPersonalInfos', (req, res, next) => {
      const { account = '', password = '', name = '', mobile = '', avatar = '', desc = '' } = req.body;
      if (!account || !password || !name || !mobile || !avatar || !desc) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        })
      } else {
        this.UserModel.updateOne({ account, password }, { account, password, name, mobile, avatar, desc })
          .then(() => {
            res.send({
              result: null,
              status: 0,
              msg: '更新用户个人信息成功'
            })
          })
          .catch((err) => {
            res.send({
              result: err,
              status: 400,
              msg: '更新用户个人信息失败'
            })
          })
      }
    })
  }

  /**
   * 注册用户
   */
  RegisterUser () {
    this.app.post('/api/registerUser', (req, res, next) => {
      const { account = '', password = '', name = '', mobile = '', role = '', avatar = '', permission = 'DASHBOARD', desc = '' } = req.body;
      if (!account || !password || !name || !mobile || !role || !avatar || !permission || !desc) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        })
      } else {
        this.UserModel.find({ account })
          .then((user) => {
            if (!user.length) {
              const model = this.UserModel;
              let roleOrder = null;
              switch (role) {
                case 'SUPERADMIN':
                  roleOrder = 1;
                  break;
                case 'ADMIN':
                  roleOrder = 2;
                  break;
                case 'COMMON':
                  roleOrder = 3;
                  break;
                default:
                  roleOrder = 3;
                  break;
              }
              const saveData = new model({
                account,
                password,
                name,
                mobile,
                avatar,
                role,
                desc,
                permission,
                createdTime: Date.now(),
                roleDesc: roleEnum.filter((i) => i.value === role)[0].label,
                token: account,
                roleOrder
              })
              saveData.save()
                .then(() => {
                  res.send({
                    result: null,
                    status: 0,
                    msg: '用户注册成功'
                  })
                })
                .catch((err) => {
                  res.send({
                    result: err,
                    status: 400,
                    msg: '用户注册失败'
                  })
                })
            } else {
              res.send({
                result: null,
                status: 400,
                msg: '该账号已存在'
              })
            }
          })
          .catch((err) => {
            res.send({
              result: err,
              status: 400,
              msg: '查询用户数据出错'
            })
          })
      }
    })
  }

  /**
   * 删除用户
   */
  DeleteUser() {
    this.app.get('/api/deleteUser', (req, res, next) => {
      const { _id } = req.query;
      this.UserModel.findByIdAndDelete(_id)
        .then(() => {
          res.send({
            result: null,
            status: 0,
            msg: '删除用户成功'
          })
        })
        .catch((err) => {
          res.send({
            result: err,
            status: 400,
            msg: '删除用户失败'
          })
        })
    })
  }

  /**
   * 定时删除阿里云OSS对象上的多余图片文件（avatar 文件夹）
   */
  DeleteAliOssPhotos() {
    console.log(
      'avatar 阿里云OSS checking____________________________________________'
    );
    let timer = null;
    // 设置定时器
    timer = setInterval(() => {
      this.UserModel.find({}).then(doc => {
        /**
         * 查找对应数据库获取当前正在用的所有图片地址
         */
        let mongodbPhotos = '';
        doc.map(i => {
          mongodbPhotos += i.avatar;
        });

        myOss.setBuckName(global.buckName).then(() => {
          /**
           * 搜索 oss global.buckName 是否存在 avatar 文件夹
           */
          myOss.listDir('avatar/').then(result => {
            /**
             * oss 当前存在的图片
             */
            const OssHasPhotos = [];
            if (result.objects && result.objects.length) {
              /**
               * 获取所有 oss 当前存在的 图片
               */
              result.objects.forEach(obj => {
                OssHasPhotos.push(obj.name.replace('avatar/', ''));
              });
              
              /**
               * 根据 oss 当前存在的 图片 与 对应数据库当前存在的所有图片 匹配，找出 oss 当前不被需要的图片
               */
              const unExist = OssHasPhotos.filter(
                item => !mongodbPhotos.includes(item)
              ).map((i) => {
                i = 'avatar/' + i;
                return i;
              });
              /**
               * Oss 删除当前不被需要的图片
               */
              myOss.deleteMulti(unExist).then(() => {
                console.log('Avatar 相关的多余图片已删除');
              });
            }
          });
        });
      });
    }, global.deleteOssPhotoTime);
  }

  /**
   * 指定要开启的接口
   */
  Start() {
    this.Login();
    this.GetUserInfos();
    this.GetAllUserInfos();
    this.UpdateUserPermissionInfos();
    this.RegisterUser();
    this.DeleteUser();
    this.UpdateUserPersonalInfos();
    this.DeleteAliOssPhotos();
  }
}

const user_infos = new USERINFOS();
user_infos.Start();
