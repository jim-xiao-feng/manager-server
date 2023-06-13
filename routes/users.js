/**
 * 用户管理模块
 */
const router = require('koa-router')()
const User = require('../models/userSchema')
const result = require('../utils/result')
const jwt = require('jsonwebtoken')

router.prefix('/users')

router.post('/login', async (ctx, next)=> {
  try {
    const { userName, userPwd } = ctx.request.body
    const res = await User.findOne({
      userName,
      userPwd
    }, { _id: 0 }) // 返回字段有三种方式：1.'userId userName state' 2. { userId: 1, _id: 0 }  3.select('userId')
  
    if (res) {
      const data = res._doc
      // 生成token,解析用payload = jwt.verify(token, 'lebulangjim')
      const token = jwt.sign({ data }, 'lebulangjim', {expiresIn: '24h'})
      data.token = token
      ctx.body = result.success(data)
    } else {
      ctx.body = result.fail('账号或密码不正确')
    }
  } catch (error) {
    ctx.body = result.fail(error.msg)
  }
})

module.exports = router
