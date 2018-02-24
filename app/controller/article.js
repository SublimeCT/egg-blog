const { Controller } = require('egg')

class ArticleController extends Controller {
    async index () {}

    async ['new'] () {}

    async create () {
        let resCode = '2001'
        const { ctx, service } = this
        const { title, content } = ctx.request.body
        // 空字符过滤
        if (!title || !content) {
            resCode = '2000'
            ctx.response._sendJson(resCode)
            return
        }
        // TODO 字符长度过滤 ...
        const data = { title, content }
        /* 
            { title: '111',
            content: 'test',
            create_time: 2018-02-24T00:53:39.831Z,
            _id: 5a90b79353f13e8ddaab2591,
            __v: 0 }
        */
        try {
            const articleInfo = await service.article.createArticle(data)
            if (articleInfo) {
                resCode = '2003' // 创建成功
                ctx.response._responseData.data = { id }
            }
        } catch (e) {
            if (e.code === 11000) {
                resCode = '2002' // 标题重复
            }
        }
        ctx.response._sendJson(resCode)
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