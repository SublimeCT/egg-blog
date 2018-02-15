# 登录

## links
- [vue-router](https://router.vuejs.org/zh-cn/essentials/nested-routes.html)
- [sass](https://www.sass.hk)

## 细节
- 背景图选用百度壁纸
- ~~使用 `vue-form-generator` 生成登录表单~~ 前台暂未加入表单
- 使用 `history.pushState` 模式的路由 [doc](https://router.vuejs.org/zh-cn/essentials/history-mode.html) 
- 使用 `sass`

## 设置路由
打开(默认)路由文件 `src/router/index.js`, 按 `vue-router` 配置规则修改路由配置对象
```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Articles from '@/views/article/Articles'
import Article from '@/views/article/Article'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
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
                    path: '/backend/login',
                    name: '登录页',
                    component: Login
                }
            ]
        }
    ]
})

```

## 创建 vue 文件
```bash
➜  egg-blog-front git:(master) ✗ code src/views/article/Articles.vue src/views/article/Article.vue src/views/Login.vue src/views/Index.vue
```

### 开始填充路由页面  
`src/views/Index.vue`, 其他页面相同
```html
<template>
    <div id="Index">
        <router-view/>
    </div>
</template>

<script>
export default {}
</script>

<style>

</style>

```

## 使用 `sass`
安装
```bash
# 安装所需模块
➜  egg-blog-front git:(master) ✗ yarn add -D node-sass sass-loader
# deepin 默认没有安装 g++, 需要安装
➜  egg-blog-front git:(master) ✗ sudo apt-get install g++
```

在 *webpack.bash.config.js* 加入
```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
}
```

## 填充根组件 *src/App.vue*
创建全局样式文件
```bash
➜  egg-blog-front git:(master) ✗ code src/assets/style/global.scss
```

全局样式 *src/assets/style/global.scss*
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
        height: 100%;
        background-size: 100% auto;
        background-repeat: no-repeat;
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
}
```

根组件中直接使用百度搜索背景图, 简单粗暴
```html
<template>
    <div id="App">
        <router-view/>
    </div>
</template>

<script>
const backgroundImage = {
    _src: null,
    _srcMax: 800,
    _timeout: 1500,
    _defaultColor: '#C7EDCC',
    _loadCallback () {},
    get src () {
        const num = Math.floor(Math.random() * this._srcMax + 1)
        return `https://ss3.bdstatic.com/lPoZeXSm1A5BphGlnYG/skin/${num}.jpg`
    },
    getImage () {
        const img = new Image()
        img.src = this.src
        img.onload = () => {
            // 加载完成后记录 src
            this._src = `url("${img.src}")` // 标记为已加载
            this._loadCallback()
        }
    },
    setImage (dom) {
        if (this._src) {
            dom.style.backgroundImage = this._src
        } else {
            this._loadCallback = () => {
                dom.style.backgroundImage = this._src                
            }
            setTimeout(() => {
                if (dom.style.backgroundImage) return
                console.error('背景图请求超时, 使用背景色' + this._defaultColor)
                dom.style.backgroundColor = this._defaultColor
                this._loadCallback = () => {}
            }, this._timeout)
        }
    }
}
backgroundImage.getImage() // 预先获取图片资源
export default {
    name: 'App',
    mounted () {
        backgroundImage.setImage(document.body)
    }
}
</script>

<style lang="scss">
// 引入全局样式
@import 'assets/style/global.scss';
</style>

```

![效果图](https://coding.net/u/sublimeCT/p/egg-blog/git/blob/master/docs/2/images/bg.png)

## 设置路由形式
用 `history.pushState` 取代锚点形式的 `path`  
`src/router/index.js` [doc](https://router.vuejs.org/zh-cn/essentials/history-mode.html)
```javascript
export default new Router({
    mode: 'history'
}
```

## 登录页样式
*Login.vue*
```html
<template>
    <div id="Login">
        <form action="/api/login" method="post">
            <label for="username">
                <div class="fieldName">Username</div>
                <input type="text" id="username" name="username" :value="username" tabindex="1">
            </label>
            <label for="password">
                <div class="fieldName">Password</div>
                <input type="password" id="password" name="password" :value="username" tabindex="2">
            </label>
            <label class="button-box">
                <button tabindex="3">Login</button>
            </label>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            username: '',
            password: ''
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
}
</style>
```

## 登录实现
