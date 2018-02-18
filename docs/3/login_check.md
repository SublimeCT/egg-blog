# 登录验证

## links
- [vue-router 钩子](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)

## 细节
- `/backend` 为后台页面
- 通过路由钩子做后台页面的登录验证
- 通过扩展 `ctx.response` 规范 `response data`

## 前台
### 创建全局钩子
将钩子函数分离至单独的文件
*src/router/hooks.js*
```javascript
import axios from 'axios'
import Cookie from 'js-cookie'
import { API } from '@/config/base'

const hookHandler = {
    /**
     * 添加全局路由钩子
     * @param {* object} router vue-router 实例
     */
    global (router) {
        // 后台页面检测权限
        router.beforeEach((to, from, next) => {
            console.group('%c[路由] %cbeforeEach 钩子', 'color:#9933CC', 'color:#000')
            console.log('from =>', from.path)
            console.log('to =>', to.path)
            if (to.path.indexOf('/backend') === 0) {
                axios.request({
                    method: 'POST',
                    baseURL: API.prefix,
                    url: '/checkLogin',
                    headers: { 'X-CSRF-TOKEN': Cookie.get('csrfToken') }
                }).then(res => {
                    console.warn(res)
                    console.groupEnd()
                    if (res.data.code === '0' && res.data.data && res.data.data.isLogin) {
                        next()
                        return
                    } else {
                        next({ path: '/' })
                        return
                    }
                })
            } else {
                console.groupEnd()                
                next()
                return
            }
        })
    }
}

export {
    hookHandler
}
```

路由入口文件
*src/router/index.js*
```javascript
// 全局路由钩子
import { hookHandler } from './hooks'
// ...
export {
    routerInfo as router,
    hookHandler as routerHandler
}
```

项目入口文件
*src/main.js*
```javascript
import { router, routerHandler } from './router'
// add global router hooks
routerHandler.global(router)
```

## 后台
*app/router.js*
```javascript
// 检测是否登录
router.post('/api/checkLogin', controller.user.checkLogin)
```

### 扩展 ctx.response
*app/extend/response.js*
```javascript
const codes = {
    0: '',
    1: '服务器错误',
    2: '未知错误',
    1000: '未登录',
    1001: '用户名或密码错误'
}

let code = '0'

module.exports = {
    /**
     * 统一 API 响应格式
     * @type {object}
     */
    _responseData: {
        set code (value) {
            if (typeof value !== 'string') throw new Error('not string')
            code = typeof codes[value] === 'string' ? value : '2'
            this.message = typeof codes[value] === 'string' ? codes[value] : codes['2']
        },
        /**
         * 状态码
         * @type {* number}
         */
        get code () {
            return code
        },
        /**
         * 错误信息
         * @type {string}
         */
        message: '',
        /**
         * 响应数据
         * @type {object}
         */
        data: {}
    },
    /**
     * 发送 API 响应
     */
    async _sendJson () {
        this.header['Content-Type'] = 'application/json' // 设置响应头为 JSON 格式
        this.body = this._responseData // 返回响应数据
    }
}
```
### 通过中间件初始化 response data
*app/middleware/responseInit.js*
```javascript
/**
 * 初始化 response data
 *      app/extend/response.js 中的对象只在启动 worker 进程时与请求级别的 ctx.response 合并
 *      需要通过中间件chushih请求级别的中间件的 response code
 * @param {* object} options 
 */
module.exports = options => {
    return async function (ctx, next) {
        ctx.response._responseData.code = '0'
        await next()
    }
}
```
