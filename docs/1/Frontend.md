# 前台页面 API

加入 `frontend API`
```javascript
module.exports = app => {
    const {router, controller} = app
    // test
    router.get('/test', controller.home.test)
    // restful API
    router.resource('users', controller.user)
    router.resource('articles', controller.article)
    router.resource('roles', controller.role)
    // frontend API
    router.post('/user/regist', controller.user.regist) // 注册
    router.post('/user/login', controller.user.login) // 登录
}
```
