/**
 * 初始化 response data
 *      app/extend/response.js 中的对象只在启动 worker 进程时与请求级别的 ctx.response 合并
 *      需要通过中间件chushih请求级别的中间件的 response code
 * @param {* object} options 
 */
module.exports = options => {
    return async function (ctx, next) {
        ctx.response._responseData.code = '0'
        await next()
    }
}