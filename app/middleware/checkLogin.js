/**
 * 当访问 API 时先检测用户是否登录
 *    开发环境忽略该中间件
 * @param {object} options 
 */
module.exports = options => {
    return async function (ctx, next) {
        let resCode = '0'
        // /api/front 为前台 /api/ 为后台
        if (ctx.path.indexOf('/api/') === 0 &&
            ctx.path.indexOf('/api/front') === -1) {
            if (!ctx.session.userid) {
                resCode = '1000'
            } else {
                ctx.response._responseData.data.isLogin = true
            }
            ctx.response._sendJson(resCode)
        } else {
            await next()
        }
    }
}