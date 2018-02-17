# 后端登录实现

## links
- [mongoose](http://mongoosejs.com/docs/index.html)

## 细节
- 使用 `mongoose` 数据库抽象层

## 登录验证
### 路由配置
```javascript
module.exports = app => {
    const {router, controller} = app
    // test
    router.get('/test', controller.home.test)
    // restful API
    router.resources('users', controller.user)
    router.resources('articles', controller.article)
    router.resources('settings', controller.setting)
    // frontend API
    router.post('/api/login', controller.user.login) // 登录

    // 首次请求接口时获取 csrf token
    router.get('/api/getCsrfToken', controller.home.getCsrfToken)
}
```

### controller
```javascript
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
        // 处理请求参数
        const nickname = this.ctx.request.body.username
        const password = await this.ctx.service.user.sha1(this.ctx.request.body.password)
        console.log('req', {nickname, password})
        // 将参数交给 service
        const userInfo = await this.ctx.service.user.checkUser({nickname, password})
        // 根据结果处理 response
        if (userInfo) {
            this.ctx.response._responseData.code = '0'
        } else {
            this.ctx.response._responseData.code = '1001'            
        }
        // 以 json 格式返回
        this.ctx.response._sendJson()
    }
}

module.exports = UserController
```

### service
```javascript
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
```

### mongo 数据库结构
```bash
➜  egg-blog git:(master) ✗ mongo
MongoDB shell version: 3.2.11
connecting to: test
> use blog
switched to db blog
> db.user.find()
{ "_id" : ObjectId("5a818a89f31a42956c75c5fa"), "password" : "572837efaeb5d66b33b8a3f027f78601f1889c12", "nickname" : "sven", "email" : "hellosc@qq.com", "avatar" : "avatar.png", "signature" : "It's me", "level_id" : null, "create_time" : ISODate("2018-02-12T12:37:29.362Z"), "city" : null }
```

