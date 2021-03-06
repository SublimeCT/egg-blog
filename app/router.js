module.exports = app => {
    const {router, controller} = app
    // test
    router.get('/test', controller.home.test)
    // restful API
    // router.resources('users', controller.user)
    // router.resources('articles', controller.article)
    // router.resources('settings', controller.setting)
    // frontend API
    router.post('/api/login', controller.user.login) // 登录

    // 首次请求接口时获取 csrf token
    router.get('/api/getCsrfToken', controller.home.getCsrfToken)
    // 检测是否登录
    router.post('/api/checkLogin', controller.user.checkLogin)

    // backend API
    router.get('/api/articles', controller.article.list) // 文章列表
    router.post('/api/articles', controller.article.create) // 创建文章

    // front API
    router.get('/api/front/articles', controller.article.frontList) // 文章列表

}