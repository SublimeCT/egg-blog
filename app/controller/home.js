const { Controller } = require('egg')

class HomeController extends Controller {
    async test () {
        this.ctx.body = JSON.stringify(this.ctx)
    }
}

module.exports = HomeController