const { Controller } = require('egg')

class UserController extends Controller {
    async index () {}
    async ['new'] () {}
    async create () {}
    async show () {}
    async edit () {}
    async update () {}
    async destroy () {}
    async login () {
        // 处理请求参数
        const nickname = this.ctx.request.body.username
        const password = await this.ctx.service.user.sha1(this.ctx.request.body.password)
        // 将参数交给 service
        const userInfo = await this.ctx.service.user.checkUser({nickname, password})
        console.log('code: ', this.ctx.response._responseData.code)
        // 根据结果处理 response
        this.ctx.response._responseData.code = '0' // 暂时默认使用 code = 0
        if (!userInfo) {
            console.log('\t set code')
            this.ctx.response._responseData.code = '1001'
        }
        // 以 json 格式返回
        this.ctx.response._sendJson()
    }
    async checkLogin () {
        this.ctx.response._responseData.code = this.ctx.session.userid ? '0' : '1000'
        this.ctx.response._sendJson()
    }
}

module.exports = UserController