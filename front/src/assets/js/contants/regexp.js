// 存放常规的正则表达式
const REGEXP = {
  // 账号
  ACCOUNT: /^[a-z]{4,10}$/gi,
  // 密码
  PASSWORD: /^[0-9a-z]{4,10}/gi,
  // 手机号码
  MOBILE: /^1[3456789]\d{9}$/
}

export default REGEXP
