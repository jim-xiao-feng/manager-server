/**
 * 用户管理模块
 */
const router = require('koa-router')()
const User = require('../models/userSchema')
const result = require('../utils/result')

router.prefix('/users')

router.post('/login', async (ctx, next)=> {
  try {
    const { userName, userPwd } = ctx.request.body
    const res = await User.findOne({
      userName,
      userPwd
    })
    if (res) {
      ctx.body = result.success(res)
    } else {
      ctx.body = result.fail('账号或密码不正确')
    }
  } catch (error) {
    ctx.body = result.fail(error.msg)
  }
})

module.exports = router
