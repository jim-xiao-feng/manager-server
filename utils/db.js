/**
 * 数据库连接
 */
const mongoose = require('mongoose')
const config = require('./config')
const logger = require('./logger')

mongoose.connect(config.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', () => {
    logger.error('***数据库连接失败***')
})

db.on('open', () => {
    logger.info('***数据库连接成功***')
})