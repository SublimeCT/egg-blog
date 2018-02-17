const Service = require('egg').Service
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/blog')
const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        unique: true
    },
    password: String,
    email: {
        type: String,
        unique: true
    },
    avatar: String,
    signature: String,
    create_time: Date,
    city: String
}, {
    collection: 'user'
})
userSchema.statics.checkUser = function (condition) {
    return new Promise(resolve => {
        this.findOne(condition, (err, userData) => {
            if (err) throw err
            resolve(userData)
        })
    })
}

const userModel = mongoose.model('User', userSchema)

class UserService extends Service {
    async checkUser (condition) {
        console.log('condition', condition)
        const userInfo = await userModel.checkUser(condition)
        console.log('userInfo', userInfo)
        if (userInfo) {
            this.ctx.session.userid = userInfo._id
        }
        return userInfo
    }
    async sha1 (str) {
        if (typeof str !== 'string') throw new Error('not string')
        const crypto = require('crypto')
        return crypto.createHash('sha1').update(str).digest('hex')
    }
}

module.exports = UserService