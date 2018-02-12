# API 整理

## restful API
使用 `Egg` 自带的 `resource`
```javascript
// app/router.js
module.exports = app => {
    const {router, controller} = app
    // test
    router.get('/test', controller.home.test)
    // restful API
    router.resource('users', controller.user)
    router.resource('articles', controller.article)
    router.resource('roles', controller.role)
}
```

### 构建响应 controller
参照 [文档](https://eggjs.org/zh-cn/basics/router.html#restful-风格的-url-定义)
