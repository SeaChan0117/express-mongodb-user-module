const mongoose = require('mongoose')
const { dbUri, mongooseOptions } = require('../config/config.default')

// 连接 MongoDB 数据库
mongoose.connect(dbUri, mongooseOptions)

const db = mongoose.connection

// 连接失败
db.on('error', err => {
    console.log('MongoDB 数据库连接失败', err)
})

// 连接成功
db.once('open', function () {
    console.log('MongoDB 数据库连接成功')
})

// 组织导出模型类
module.exports = {
    User: mongoose.model('User', require('./user'))
}
