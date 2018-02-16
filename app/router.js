module.exports = app => {
    const {router, controller} = app
    // test
    router.get('/test', controller.home.test)
    // restful API
    router.resources('users', controller.user)
    router.resources('articles', controller.article)
    router.resources('settings', controller.setting)
    // frontend API
    router.post('/api/login', controller.user.login) // 登录

    // 首次请求接口时获取 csrf token
    router.get('/api/getCsrfToken', controller.home.getCsrfToken)
}