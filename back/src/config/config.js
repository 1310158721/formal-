// 模拟环境变量 true 正式环境，false 开发环境
const env = true

// 全局端口
global.PORT = 8000

// mongodb 数据库链接接口
global.mongodbPort = env ? 19999 : 27017

// 阿里云存放图片 bucketName
global.buckName = env ? 'tang-www-pro' : 'tang-www-dev'

global.deleteOssPhotoTime = 1000 * 60 * 60 * 24
// global.deleteOssPhotoTime = 1000 * 5
