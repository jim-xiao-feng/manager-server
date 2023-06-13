const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('./utils/logger')

const index = require('./routes/index')
const users = require('./routes/users')
const koajwt = require('koa-jwt')

// error handler
onerror(app)

require('./utils/db')

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  if (ctx.request.method === 'GET') {
    logger.info(`${ctx.request.method} params:${JSON.stringify(ctx.request.query)}`)
  } else {
    logger.info(`${ctx.request.method} params:${JSON.stringify(ctx.request.body)}`)
  }
  await next()
})

// 验证token是否过期，或者是否有token,没有会报401。过滤掉登录接口
app.use(koajwt({ secret: 'lebulangjim' }).unless({
  path: ['/users/login']
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  logger.error(err.stack)
});

module.exports = app
