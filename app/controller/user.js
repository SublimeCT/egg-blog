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
        if (!userInfo) {
            this.ctx.response._sendJson('1001')
            return
        }
        // 以 json 格式返回
        this.ctx.response._sendJson('0')
    }
    async checkLogin () {
        let resCode = '0'
        if (this.ctx.session.userid) {
            this.ctx.response._responseData.data.isLogin = true
        } else {
            resCode = '1000'
        }
        this.ctx.response._sendJson(resCode)
    }
}

module.exports = UserController