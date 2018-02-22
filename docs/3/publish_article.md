# 新增文章

## links
- [vue-router 钩子](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)

## 细节
- 使用 `iview`
- 保存 (`ctrl+s`) 文章时将 `标题` `内容` `时间` 存入 `localStorage`, 避免意外丢失数据
    - 历史记录采用队列形式存储, 长度 `<= 5`

## 初始化模板页
### 创建相关页面并填充(已创建时忽略)
*src/views/backend/Index.vue* ...
```html
<template>
    <div id="BackendIndex">
        <Row>
            <Col span="4" class-name="nav-wrap">
                <Menu :theme="theme" @on-select="changeMenu" :active-name="defaultActive">
                    <MenuItem v-for="(menu, index) in menus" :key="index" :name="menu.name" width="auto">
                        <Icon :type="menu.iconType"></Icon>
                        {{ menu.content }}
                    </MenuItem>
                    <i-switch size="large" class="check-theme-btn-wrap" @on-change="changeTheme" :value="theme === 'light'">
                        <span slot="open">白天</span>
                        <span slot="close">夜间</span>
                    </i-switch>
                </Menu>
            </Col>
            <Col span="20" class-name="section-wrap">
                <router-view/>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            theme: 'light', // dark / light
            defaultActive: location.pathname,
            menus: [
                {
                    content: '文章管理',
                    iconType: 'ios-bookmarks-outline',
                    name: '/backend/articles'
                },
                {
                    content: '系统设置',
                    iconType: 'ios-settings-strong',                    
                    name: '/backend/settings'
                }
            ]
        }
    },
    methods: {
        changeMenu (name) {
            this.$router.push({ path: name })
        },
        changeTheme (state) {
            this.theme = state ? 'light' : 'dark'
        }
    },
    mounted () {
        // 初始化背景图片
        document.getElementsByTagName('body')[0].className = 'backend-body'
    },
    beforDestory () {
        document.body.removeAttribute('class', 'backend-body')
    }
}
</script>

<style lang="scss" scoped>
#BackendIndex {
    height: auto;
    background-size: 100% auto;
    background-repeat: no-repeat;
    min-width: 1170px;
    padding: 5% 7%;
    padding-bottom: 0px;
    margin-bottom: 5%;
    .nav-wrap {
        overflow: hidden;
        .check-theme-btn-wrap {
            margin-top: 5%;
            margin-left: 10%;
            margin-bottom: 5%;
        }
    }
    .section-wrap {
        padding: 0px 10px;
    }
}
</style>

```

### 路由设置
*src/router/index.js*
```javascript
import Vue from 'vue'
import Router from 'vue-router'
// 全局路由钩子
import { hookHandler } from './hooks'

// page-front
import Index from '@/views/Index'
import Articles from '@/views/article/Articles'
import Article from '@/views/article/Article'
import Login from '@/views/Login'
// page-backend
import BackendIndex from '@/views/backend/Index'
import ArticleList from '@/views/backend/ArticleList'
import PublishArticle from '@/views/backend/PushArticle'
import ModifyArticle from '@/views/backend/ModifyArticle'
import Settings from '@/views/backend/Settings'

Vue.use(Router)

const routerInfo = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: '主页',
            component: Index,
            redirect: '/articles',
            children: [
                {
                    path: '/articles',
                    name: '博客主页',
                    component: Articles
                },
                {
                    path: '/article/:id',
                    name: '文章页',
                    component: Article
                },
                {
                    path: '/login',
                    name: '登录页',
                    component: Login
                },
                {
                    path: '/backend',
                    name: '后台',
                    component: BackendIndex,
                    redirect: '/backend/articles',
                    children: [
                        {
                            path: '/backend/articles',
                            name: '文章列表页',
                            component: ArticleList
                        },
                        {
                            path: '/backend/article',
                            name: '文章发布页',
                            component: PublishArticle
                        },
                        {
                            path: '/backend/article/:id',
                            name: '文章修改页',
                            component: ModifyArticle
                        },
                        {
                            path: '/backend/settings',
                            name: '系统设置页',
                            component: Settings                            
                        }
                    ]
                }
            ]
        }
    ]
})

export {
    routerInfo as router,
    hookHandler as routerHandler
}

```

### 修改表格样式
*src/assets/style/global.scss*
```scss
@mixin paddingMargin0 () {
    padding: 0;
    margin: 0;
}

html, body, #App, h1, h2, h3 {
    @include paddingMargin0();
}

html {
    height: 100%;
    body {
        font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,PingFang SC,WenQuanYi Micro Hei,sans-serif;
        height: 100%;
        background-size: 100% auto;
        background-repeat: no-repeat;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        #App {
            #Index {
                #BackendIndex {
                    .ivu-table {
                        background-color: rgba(0, 0, 0, 0);
                        td {
                            background-color: rgba(255, 255, 255, 0.5);
                        }
                        tr:hover {
                            background-color: #FFF;
                        }
                        tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
                            background-color: 	rgba(233,234,236, 0.6);
                        }
                    }
                }
            }
        }
    }
}

.backend-body {
    background-image: url('assets/bg.jpg');
    background-color: #1A3644;
}

.limit-text-len {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

.v-note-wrapper {
    z-index: 1 !important;
}
```

### 添加文章页面
```html
<template>
    <div id="BackendArticles">
        <Input v-model="title" type="textarea" :autosize="true" placeholder="Input Title..." class="title-input"></Input>
        <mavon-editor v-model="content" :ishljs = "true" :subfield="false" @save="saveArticle"></mavon-editor>
        <Dropdown trigger="click" @on-visible-change="setHistory" class="record-btn" placement="bottom-start"  @on-click="restoreAtricle">
            <Button type="warning">恢复 &nbsp;<Icon type="arrow-down-b"></Icon></Button>
            <DropdownMenu slot="list">
                <DropdownItem v-for="(record, index) in history" :key="index" :name="index" class="limit-text-len history-list-item">{{ record.time + ' ' + record.title + ' ' + record.content }}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Button type="primary" class="submit-btn" @click="submitConfirm = true">提交</Button>
        <Modal
            v-model="submitConfirm"
            title="Submit this article ?"
            @on-ok="submitArticle">
            确定要提交该文章吗?
        </Modal>
    </div>
</template>

<script>
import { localStorageConfig, API } from '@/config/base'
import { mavonEditor } from 'mavon-editor'
import requester from '@/utils/request'
import axios from 'axios'
import 'mavon-editor/dist/css/index.css'

export default {
    components: {
        'mavon-editor': mavonEditor
    },
    data () {
        return {
            title: '',
            content: '',
            history: [],
            submitConfirm: false,
            confirmFlag: 0,
            get storageItemName () {
                return localStorageConfig.prefix + 'articles'
            }
        }
    },
    methods: {
        // 将数据保存至本地, 提交后清空
        saveArticle (value, render) {
            const date = new Date()
            const articleItem = {
                time: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
                content: value,
                title: this.title
            }
            let localeData = this._getRecordsForLocalStorage()
            if (!Array.isArray(localeData)) {
                localeData = []
            } else {
                if (localeData.length >= 5) { // 维持队列长度
                    localeData.shift()
                }
            }
            localeData.push(articleItem)
            localeData = JSON.stringify(localeData)
            localStorage.setItem(this.storageItemName, localeData)
        },
        setHistory (visible) {
            if (visible) {
                this.history = this._getRecordsForLocalStorage()
            }
        },
        _getRecordsForLocalStorage () {
            let localeData = localStorage.getItem(this.storageItemName)
            try {
                localeData = JSON.parse(localeData)
            } catch (e) {
                localeData = []
                console.warn(e)
            }
            return localeData
        },
        restoreAtricle (index) {
            this.title = this.history[index].title
            this.content = this.history[index].content
        },
        submitArticle () {
            // 1. 数据检测
            const checkResult = this._checkArticle()
            if (!checkResult.success) {
                const {title, desc} = checkResult
                this.$Notice[checkResult.type]({title, desc})
                return
            }
            // 2. 提交
            requester.getCsrfCookie(this.$cookie).then(token => {
                const _this = this
                const querys = {
                    title: _this.title,
                    content: _this.content
                }
                axios
                    .request({
                        method: 'POST',
                        baseURL: API.prefix,
                        data: querys,
                        url: '/articles',
                        headers: {'X-CSRF-TOKEN': token}
                    })
                    .then(res => {
                        console.log(res)
                    })
            })
        },
        _checkArticle () {
            let res = {
                success: false,
                type: 'error'
            }
            if (!this.title || !this.content) {
                res.title = '请填写标题和内容'
                return res
            }
            res.success = true
            return res
        }
    }
}
</script>

<style>
.title-input {
    margin-bottom: 10px;
}
.record-btn {
    margin: 10px 25px 10px 0px;
}
.submit-btn {
    margin-top: 10px;
    float: right;
}
.history-list-item {
    width: 950px;
}
</style>
```

### 配置文件
*src/config/base.js*
```javascript
const API = {
    prefix: 'http://egg-blog.com/api'
}

const localStorageConfig = {
    prefix: 'blog_'
}

export {
    API,
    localStorageConfig
}
```

## 将获取 csrf token 分离
*src/utils/request.js*
```javascript
import { API } from '@/config/base'
import axios from 'axios'

const requester = {
    getCsrfCookie (cookieHandler) {
        return new Promise((resolve, reject) => {
            const csrfToken = cookieHandler.get('csrfToken')
            if (!csrfToken) {
                axios.request({
                    method: 'GET',
                    baseURL: API.prefix,
                    url: 'getCsrfToken'
                }).then(res => {
                    resolve(cookieHandler.get('csrfToken'))
                })
            } else {
                resolve(csrfToken)
            }
        })
    }
}

export default requester
```

### 登录页处理
*src/views/Login.vue*
```html
<template>
    <div id="Login">
        <form action="/api/login" method="post" @submit="login" autocomplete="off">
            <label for="username">
                <div class="fieldName">Username</div>
                <input type="text" id="username" name="username" v-model.trim="username" tabindex="1">
            </label>
            <label for="password">
                <div class="fieldName">Password</div>
                <input type="password" id="password" name="password" v-model.trim="password" tabindex="2">
            </label>
            <label class="button-box">
                <button tabindex="3">Login</button>
            </label>
        </form>
    </div>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import requester from '@/utils/request'
import { API } from '@/config/base'
import axios from 'axios'

const vagueProperties = [
    '-webkit-filter',
    '-moz-filter',
    '-o-filter',
    '-ms-filter',
    'filter'
]

export default {
    validations: {
        username: {
            required,
            minLength: minLength(4)
        },
        password: {
            required,
            minLength: minLength(6)
        }
    },
    data () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login (event) {
            if (this.$v.username.$invalid || this.$v.password.$invalid) {
                this.addVague()
            } else {
                // this.disableSubmit()
                this.sendLogin()
            }
            event.preventDefault()
        },
        addVague () {
            const num = Math.floor(Math.random() * 7 + 1)
            vagueProperties.forEach(property => {
                document.body.style[property] = `blur(${num}px)`
            })
        },
        sendLogin () {
            const {username, password} = this
            requester.getCsrfCookie(this.$cookie).then(token => {
                axios.request({
                    method: 'POST',
                    baseURL: API.prefix,
                    url: '/login',
                    data: {username, password},
                    headers: {'X-CSRF-TOKEN': token}
                }).then(res => {
                    if (res.data.code === '0') {
                        this.$router.push({ path: '/backend' })
                    } else {
                        alert(res.data.message)
                    }
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@mixin opacitySet () {
    opacity: 0.4;
    &:focus {
        opacity: 0.66;
    }
    outline: none;
}
#Login {
    form {
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;        
        margin: 150px auto;
        max-width: 450px;
        label {
            display: block;
            margin-bottom: 30px;
            .fieldName {
                letter-spacing: 1px;                
                margin-left: 20px;
                font-size: 18px;
                padding-bottom: 10px;
                color: white;
                text-shadow: 1px 1px 2px #F9D, 0 0 3em #222, 0 0 0.2em #0D3;
            }
            input {
                @include opacitySet;
                font-size: 16px;
                border-radius: 18px;
                letter-spacing: 1px;
                padding-left: 23px;
                padding-right: 23px;
                width: 360px;
                box-shadow: none;
                height: 33px;
                border-style: none;
            }
        }
        .button-box {
            margin-top: 45px;
            width: 400px;
            text-align: center;
            button {
                @include opacitySet;                
                opacity: 0.4;
                width: 150px;
                height: 35px;
                margin: 0 auto;
                font-size: 18px;
                border-radius: 15px;
                padding: 5px;
                border-style: none;
            }
        }
    }
    pre {
        color: red;
        float: left;
    }
}
</style>

```
