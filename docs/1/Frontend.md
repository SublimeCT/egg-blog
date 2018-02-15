# 前台页面 API

加入 `frontend API`
```javascript
module.exports = app => {
    const {router, controller} = app
    // test
    router.get('/test', controller.home.test)
    // restful API
    router.resource('articles', controller.article)
    router.resource('setting', controller.role)
    // frontend API
    router.post('/user/login', controller.user.login) // 登录
}
```
