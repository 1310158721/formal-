const config = require('./src/config/config')
const express = require('express');
const app = express();
global.app = app;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// 支持 post 请求在 req.body 中获取 request payload 的参数
app.use(bodyParser.json());

// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// 支持前端调取接口时，后端能拿到浏览器的cookie
app.use(cookieParser('admin')); // cookieParser 加密 token

// express 静态托管资源
app.use(express.static('./'));

// 全局拦截所有请求，做相关的操作
app.all('*', (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return false;
  }
  
  // 支持跨域
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');

  /**
   * 获取浏览器 token，每次调取接口时重置浏览器的 token 时效
   * 除登录接口外
   */
  const { token } = req.signedCookies;
  if (token) {
    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 2,
      signed: true
    });
  }
  
  next();
});

// 连接数据库 adminAllUser
mongoose.connect(`mongodb://127.0.0.1:27017/formalAdminCommon`, { useNewUrlParser: true });

// 保存 mongodb 连接状态
const db = mongoose.connection;
// 监听连接数据库成功状态
db.on('connected', () => {
  console.log('MongoDB 连接成功!!!');
});

// 监听连接数据库失败状态
db.on('error', () => {
  console.log('MongoDB 连接失败!!!');
});

// 监听连接数据库断开状态
db.on('disconnected', () => {
  console.log('MongoDB 断开连接!!!');
});

require('./src/upload/upload')
// 导入接口
require('./src/mongodb/mongodb')

// 应用监听端口
app.listen(config.PORT, () => {
  console.log(`server is running at http://127.0.0.1:${config.PORT}/`);
});
