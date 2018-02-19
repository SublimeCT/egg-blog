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
    image: String,
    create_time: Date,
    modify_time: Date
}, {
    collection: 'article'
})

articleSchema.statics.fields = {}
articleSchema.statics.getList = function ({condition, limit, skip, sort}) {
    return new Promise(resolve => {
        const data = this.find(condition, (err, articleData) => {
            if (err) throw err
            resolve(articleData)
        })
        .sort(sort)
        .limit(limit)
        .skip(skip)
        resolve(data)
    })
}

const articleModel = mongoose.model('Article', articleSchema)

class ArticleService extends Service {
    async getList(options) {
        const articleInfo = await articleModel.getList(options)
        return articleInfo
    }
    async sha1(str) {
        if (typeof str !== 'string') throw new Error('not string')
        const crypto = require('crypto')
        return crypto.createHash('sha1').update(str).digest('hex')
    }
}

module.exports = ArticleService