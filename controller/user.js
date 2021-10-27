const {User} = require('../model')
const jwt = require('../util/jwt')
const {jwtSecret} = require('../config/config.default')

// 用户注册
exports.register = async (req, res, next) => {
    try {
        let user = new User(req.body)
        await user.save()
        user = user.toJSON()
        Reflect.deleteProperty(user, 'password')
        res.status(201).json({
            ...user
        })
    } catch (e) {
        next(e)
    }
}

// 用户登录
exports.login = async (req, res, next) => {
    try {
        // 此处的 user 是在校验阶段从 数据库中 获取并挂载到 req 上的
        const user = req.user.toJSON()

        // 设置 token ，过期时间为 1 天
        const token = await jwt.sign({
            userId: user._id
        }, jwtSecret, {
            expiresIn: 60 * 60 * 24
        })
        Reflect.deleteProperty(user, 'password')
        res.status(200).json({
            ...user,
            token
        })
    } catch (e) {
        next(e)
    }
}

// 根据用户名获取用户信息
exports.getUser = async (req, res, next) => {
    try {
        const username = req.params.username
        let user = await User.findOne({username})
        if (!user) {
            return res.status(400).json({
                error: `用户 ${username} 不存在`
            })
        }
        user = user.toJSON()
        res.status(200).json({
            ...user
        })
    } catch (e) {
        console.dir(e)
        next(e)
    }
}

// 获取当前登录用户
exports.getCurUser = async (req, res, next) => {
    try {
        const user = req.user.toJSON()
        res.status(200).json({
            ...user
        })
    } catch (e) {
        console.dir(e)
        next(e)
    }
}

// 更新用户
exports.updateUser = async (req, res, next) => {
    try {
        let user = req.user
        const newUserData = req.body
        newUserData.email = user.email // 保证邮箱不被修改
        user.username = newUserData.username || user.username
        user.password = newUserData.password || user.password
        user.image = newUserData.image || user.image
        user.description = newUserData.description || user.description
        user.updatedAt = newUserData.updatedAt || new Date()
        await user.save()
        res.status(200).json({
            ...user.toJSON()
        })
    } catch (e) {
        console.dir(e)
        next(e)
    }
}
