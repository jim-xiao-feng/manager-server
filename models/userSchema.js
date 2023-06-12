const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    'userId': Number, // 用户id
    'userName': String, // 用户名称
    'userPwd': String, // 用户密码
    'userEmail': String, // 邮箱
    'mobile': String,  // 手机号
    'sex': Number, // 性别 0：男，1：女
    'deptId': [], // 部门
    'job': String, // 岗位
    'state': { // 1在职，2离职，3试用期
        type: Number,
        default: 1
    },
    'role': { // 用户角色，0系统管理员，1普通用户
        type: Number,
        default: 1
    },
    'roleList': [],
    'createTime': { // 创建时间
        type: Date,
        default: Date.now()
    },
    'lastLoginTime': { // 更新时间
        type: Date,
        default: Date.now()
    },
    remark: String
})

module.exports = mongoose.model('users', userSchema, 'users')