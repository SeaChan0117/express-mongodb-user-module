const express = require('express')
const router = express.Router()
const userCtrl = require('../controller/user')
const userValid = require('../validate/user')
const authValid = require('../middleware/auth')

// 注册
router.post('/register', userValid.register, userCtrl.register)

// 登录
router.post('/login', userValid.login, userCtrl.login)

// 根据用户名获取用户信息
router.get('/user/:username', authValid, userCtrl.getUser)

// 获取当前用户信息
router.get('/user', authValid, userCtrl.getCurUser)

// 更新当前用户信息
router.patch('/user', authValid, userCtrl.updateUser)

module.exports = router
