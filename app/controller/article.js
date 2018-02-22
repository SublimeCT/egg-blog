const { Controller } = require('egg')

class ArticleController extends Controller {
    async index () {}

    async ['new'] () {}

    async create () {
        const { ctx, service } = this
        const { title, content } = ctx.request.body
        if (!title || !content) {
            ctx.response._responseData.code = '2000'
            ctx.response._sendJson()
            return
        }
        const res = await service.article.createArticle()
        ctx.response._responseData.data = res
        ctx.response._sendJson()
    }

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