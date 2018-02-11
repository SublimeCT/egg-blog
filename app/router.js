module.exports = app => {
    const {router, controller} = app
    router.get('/test', controller.home.test)
}