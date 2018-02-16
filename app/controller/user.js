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
        this.ctx.body = new Date()
    }
}

module.exports = UserController