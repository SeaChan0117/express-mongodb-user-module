module.exports = {
    dbUri: 'mongodb://127.0.0.1:27017/express-login', // admin 用户需在 url 后加 ?authSource=admin
    jwtSecret: 'C217C3B7-0FD2-5F3B-EA84-6F2CCC45BA33',
    mongooseOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: '',
        pass: ''
    }
}
