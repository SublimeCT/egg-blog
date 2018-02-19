const { Controller } = require('egg')

class ArticleController extends Controller {
    async index () {}

    async ['new'] () {}

    async create () {}

    async show () {}

    async edit () {}

    async update () {}

    async destroy () {}

    async list () {
        const options = {
            condition: {},
            limit: 10,
            skip: 0,
            sort: {create_time: -1}
        }
        const list = await this.service.article.getList(options)
        this.ctx.body = list
    }
}

module.exports = ArticleController