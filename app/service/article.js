const Service = require('egg').Service
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/blog')
const ObjectIdType = mongoose.Schema.Types.ObjectId
const articleSchema = new mongoose.Schema({
    user_id: {
        type: ObjectIdType
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    tegs: {
        type: Array,
        required: true
    },
    image: String,
    create_time: Date,
    modify_time: Date
}, {
    collection: 'article'
})

articleSchema.statics.fields = {}
articleSchema.statics.getList = function ({condition, limit, skip, sort, fields = null}) {
    return new Promise(resolve => {
        const data = this.find(condition, fields, (err, articleData) => {
            if (err) throw err
            resolve(articleData)
        })
        .sort(sort)
        .limit(limit)
        .skip(skip)
        resolve(data)
    })
}
articleSchema.statics.createArticle = function (data) {
    return new Promise((resolve, reject) => {
        data.create_time = new Date()
        this.create(data, (err, article) => {
            if (err) reject(err)
            resolve(article)
        })
    })
}

const articleModel = mongoose.model('Article', articleSchema)

class ArticleService extends Service {
    async getList (options) {
        const articleInfo = await articleModel.getList(options)
        return articleInfo
    }
    async createArticle (data) {
        return await articleModel.createArticle(data)
    }
    async sha1(str) {
        if (typeof str !== 'string') throw new Error('not string')
        const crypto = require('crypto')
        return crypto.createHash('sha1').update(str).digest('hex')
    }
}

module.exports = ArticleService