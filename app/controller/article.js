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
                ctx.response._responseData.data = { id: articleInfo._id }
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
        const {service, ctx, config} = this
        const skip = this._getSkip()
        const options = {
            condition: {},
            limit: config.api.article.PAGE_SIZE,
            skip,
            sort: {create_time: -1}
        }
        const list = await service.article.getList(options)
        ctx.body = list
    }

    async frontList () {
        const {service, ctx, config} = this
        const skip = this._getSkip()
        const fields = ['title', 'tags', 'create_time', 'modify_time']
        const options = {
            condition: {},
            limit: config.api.article.PAGE_SIZE,
            skip,
            sort: {create_time: -1},
            fields
        }
        const list = await service.article.getList(options)
        ctx.body = list
    }

    _getSkip () {
        const intValue = parseInt(this.ctx.query.page)
        if (isNaN(intValue) || intValue <= 0) {
            return 0
        }
        return (intValue - 1) * this.config.api.article.PAGE_SIZE
    }
}

module.exports = ArticleController