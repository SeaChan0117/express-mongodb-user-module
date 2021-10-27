const mongoose = require('mongoose')
const baseModel = require('./base')
const md5 = require('../util/md5')

const userSchema = new mongoose.Schema({
    ...baseModel,
    username: { // 用户名
        type: String,
        required: true
    },
    email: { // 邮箱
        type: String,
        required: true
    },
    password: { // 密码
        type: String,
        required: true,
        set: value => md5(value),
        select: false
    },
    description: { // 简介
        type: String,
        default: null
    },
    image: { // 头像
        type: String,
        default: null
    }
})

module.exports = userSchema
