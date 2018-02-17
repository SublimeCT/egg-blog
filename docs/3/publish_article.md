# 新增文章

## links
- [vue-router 钩子](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)

## 细节
- 登录后直接进入文章发布页
- `/backend` 为后台页面
- 通过路由钩子做后台页面的登录验证

## 初始化模板页
### 创建相关页面并填充(已创建时忽略)
*src/views/backend/Index.vue* ...
```html
<template>
    <div id="BackendIndex">
        <h2>博客后台</h2>
        <router-view/>
    </div>
</template>

<script>
export default {}
</script>

<style>

</style>
```

## 后台页面路由钩子
参照 `vue-router` 的全局钩子

*src/main.js*


