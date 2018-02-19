# 文章列表

## links
- [v2-table](https://github.com/dwqs/v2-table/blob/master/README_CN.md)

## 细节
- 使用表格组件 `v2-table`
- 在访问后台时不加载随机背景图
- ~~使用 `rubik` 作为 UI 框架~~
- 使用 `N3-components` 作为 UI 框架 [文档](https://n3-components.github.io/N3-components/component.html)

## 随机背景图
*src/App.vue*
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
    _excludeCondition () {
        return location.pathname.indexOf('/backend') === 0
    },
    get src () {
        const num = Math.floor(Math.random() * this._srcMax + 1)
        return `https://ss3.bdstatic.com/lPoZeXSm1A5BphGlnYG/skin/${num}.jpg`
    },
    getImage () {
        if (this._checkCondition()) return
        const img = new Image()
        img.src = this.src
        img.onload = () => {
            // 加载完成后记录 src
            this._src = `url("${img.src}")` // 标记为已加载
            this._loadCallback()
        }
    },
    setImage (dom) {
        if (this._checkCondition()) return
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
    },
    _checkCondition () {
        return this._excludeCondition()
    }
}
backgroundImage.getImage()
export default {
    name: 'App',
    mounted () {
        backgroundImage.setImage(document.body)
    }
}
</script>

<style lang="scss">
@import 'assets/style/global.scss';
</style>

```

## UI freamwork
### 安装依赖
```bash
➜  egg-blog-front git:(master) ✗ yarn add N3-components
```
