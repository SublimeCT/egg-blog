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
        // 根据结果处理 response
        console.log('code: ', this.ctx.response._responseData.code)
        if (!userInfo) {
            this.ctx.response._responseData.code = '1001'
        }
        // 以 json 格式返回
        this.ctx.response._sendJson()
    }
    async checkLogin () {
        if (!this.ctx.session.userid) {
            this.ctx.response._responseData.code = '1000'
        } else {
            this.ctx.response._responseData.data.isLogin = true
        }
        this.ctx.response._sendJson()
    }
}

module.exports = UserController