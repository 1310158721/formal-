class RES {
  constructor() {}

  myRes (res, result = null, code = 400, msg = '') {
    res.send({
      result,
      code,
      msg
    })
  }
}

const myRes = new RES()
module.exports = myRes
