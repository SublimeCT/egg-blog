# 新增文章

## links
- [vue-router 钩子](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)

## 细节
- 分页
    - 每页 15 条


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
