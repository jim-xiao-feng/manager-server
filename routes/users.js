/**
 * 用户管理模块
 */
const router = require('koa-router')()
const User = require('../models/userSchema')
const result = require('../utils/result')
const jwt = require('jsonwebtoken')
const util = require('../utils')

router.prefix('/users')

// 用户登录
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

// 分页查询-用户列表
router.get('/list', async (ctx) => {
  const { userId, userName, state } = ctx.request.query
  const { page, skipIndex } = util.pager(ctx.request.query)
  let params = {}
  if (userId) params.userId = userId
  if (userName) params.userName = userName
  if (state && state != '0') params.state = state
  try {
    // 根据条件查询所有用户列表
    const query = User.find(params, { _id: 0, userPwd: 0 })
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await User.countDocuments(params)
    ctx.body = result.success({
      page: {
        ...page,
        total
      },
      list
    })
  } catch (error) {
    ctx.body = result.fail(`查询异常:${error.stack}`)
  }
})

// 用户删除、批量删除
router.post('/delete', async (ctx) => {
  const { userIds } = ctx.request.query
  const res = await User.updateMany({ userId: { $in: userIds } }, { state: 2 })
  if (res.nModified) {
    ctx.body = result.success(res, `共删除了${res.nModified}条`)
    return
  }
  ctx.body = result.fail('删除失败')
})

module.exports = router
