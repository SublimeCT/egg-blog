# egg-blog

## 开发环境
- `Deepin` 15.5 unstable
- `vscode` 1.19.2

## 技术栈
- `Egg` 2.3.0
- `MondoDB` 3.2.11
- `Vue` 2.9.3
- `eslint` 4.17.0
- `nginx` 1.12.2

## pages
[restful API 介绍](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
### frontend
- `/` 博客主页[文章列表]
- `/article/:id` 文章页
### backend
- `/login` 登录[登录成功跳转到后台]  
    - `/api/login` 登录请求
- `/articles` 文章管理页
    - [PATCH]`/article/:id` 修改文章信息
    - [POST]`/article` 创建文章
    - [DELETE]`/article/:id` 删除文章
- `/settings` 设置页
    - [PATCH]`/settings/:id` 修改设置 
    - [POST]`/settings` 创建设置项
    - [DELETE]`/settings/:id` 删除设置项

## Notes
- 零 项目初始化
    - [Git 环境](https://coding.net/u/sublimeCT/p/egg-blog/git/blob/master/docs/0/built_git_env.md)
    - [添加依赖 & 搭建 Egg 骨架](https://coding.net/u/sublimeCT/p/egg-blog/git/blob/master/docs/0/add_dependence.md)
    - [数据库设计](https://coding.net/u/sublimeCT/p/egg-blog/git/blob/master/docs/0/db.md)
- 壹 API & Router 整理
    - [API](https://coding.net/u/sublimeCT/p/egg-blog/git/blob/master/docs/1/API.md)
    - [Router](https://coding.net/u/sublimeCT/p/egg-blog/git/blob/master/docs/1/Frontend.md)
- 贰 Vue 前台
    - [环境搭建](https://coding.net/u/sublimeCT/p/egg-blog/git/blob/master/docs/2/env.md)
    - [eslint 配置](https://github.com/SublimeCT/note/blob/master/JS/NodeJs/Note_doc/eslint.mds) (这是我的另一个笔记)
    - [登录页面(前端)](https://coding.net/u/sublimeCT/p/egg-blog/git/blob/master/docs/2/login.md)
