const log4js = require('log4js')


const levels = {
    'trace': log4js.levels.TRACE,
    'debug': log4js.levels.DEBUG,
    'info': log4js.levels.INFO,
    'warn': log4js.levels.WARN,
    'error': log4js.levels.ERROR
}

log4js.configure({
    appenders: { // 追加器
        console: { type: 'console' },
        info: { type: 'file', filename: 'logs/all-logs.log' },
        error: {
            type: 'dateFile',
            filename: 'logs/error',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true // 设置文件名为 filename + pattern
        }
    },
    categories: { // 种类
        default: { appenders: ['console'], level: 'debug' },
        info: { appenders: ['info', 'console'], level: 'info' },
        error: { appenders: ['error', 'console'], level: 'error' }
    }
})

module.exports = {
    debug: (content) => {
        const logger = log4js.getLogger() // 默认default
        logger.level = levels.debug
        logger.debug(content)
    },
    info: (content) => {
        const logger = log4js.getLogger('info')
        logger.level = levels.info
        logger.info(content)
    },
    error: (content) => {
        const logger = log4js.getLogger('error')
        logger.level = levels.error
        logger.error(content)
    }
}