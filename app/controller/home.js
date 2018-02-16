const { Controller } = require('egg')

class HomeController extends Controller {
    async test () {
        this.ctx.body = JSON.stringify(this.ctx)
    }
    async getCsrfToken () {
        this.ctx.body = 1
    }
}

module.exports = HomeController