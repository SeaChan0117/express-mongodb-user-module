const validate = require('../middleware/validate')
const {body} = require('express-validator')
const {User} = require('../model')
const md5 = require('../util/md5')

exports.register = validate([
    body('username')
        .notEmpty().withMessage('用户名不能为空')
        .custom(async username => {
            // 自定义校验
            const user = await User.findOne({username})
            if (user) {
                return Promise.reject('用户名已存在')
            }
        }),

    body('email')
        .notEmpty().withMessage('邮箱不能为空')
        .isEmail().withMessage('邮箱格式不正确')
        .bail()
        .custom(async email => {
            // 自定义校验
            const user = await User.findOne({email})
            if (user) {
                return Promise.reject('邮箱已存在')
            }
        }),
    body('password')
        .notEmpty().withMessage('密码不能为空')
])

exports.login = [
    validate([
        body('email').notEmpty().withMessage('邮箱不能为空'),
        body('password').notEmpty().withMessage('密码不能为空')
    ]),
    validate([
        body('email').custom(async (email, { req }) => {
            const user = await User.findOne({ email })
                .select(['email', 'username', 'description', 'image', 'password'])

            if (!user) {
                return Promise.reject('用户不存在')
            }

            // 将数据挂载到请求对象中，后续的中间件也可以使用了
            req.user = user
        })
    ]),
    validate([
        body('password').custom(async (password, { req }) => {
            if (md5(password) !== req.user.password) {
                return Promise.reject('密码错误')
            }
        })
    ])
]
