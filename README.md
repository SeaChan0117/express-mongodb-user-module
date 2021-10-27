# express + mongodb 用户模块 API

## 注册
> method: POST  

[http://117.50.1.138:9000/register](http://117.50.1.138:9000/register)
req.body =>
```js
{
  username: "username", // required
  email: "1233@qq.com", // required
  password: "fadfadfadf", // required
  image: null,
  description: null
}
```
> 密码 md5 加密入库

## 登录
> method: POST

[http://117.50.1.138:9000/login](http://117.50.1.138:9000/login)
req.body =>
```js
{
  email: "1233@qq.com", // required
  password: "fadfadfadf" // required
}
```
> 返回信息中携带 jwt 认证 token，过期时间为 1 天

## 根据用户名查询用户信息
> method: GET

[http://117.50.1.138:9000/user/:username](http://117.50.1.138:9000/user/:username)  
查询用户前提条件前，需要登录获取 token，将 token 设置在请求头中，Authorization = 'Bearer ${token}'，  
即，请求头中设置 Authorization 字段，内容为 Bearer + 空格 + token 组成的字符串；


## 获取当前用户信息
> method: GET

[http://117.50.1.138:9000/user](http://117.50.1.138:9000/user)  
获取用户前提条件前，需要登录获取 token，将 token 设置在请求头中，Authorization = 'Bearer ${token}'，  
即，请求头中设置 Authorization 字段，内容为 Bearer + 空格 + token 组成的字符串；

## 修改当前用户信息（邮箱和创建时间无法修改，传参不影响）
> method: PATCH

[http://117.50.1.138:9000/user](http://117.50.1.138:9000/user)  
需要 token

req.body => user 对象的相关属性
