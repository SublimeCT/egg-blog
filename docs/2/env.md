# Vue 环境搭建
> 本项目使用 Vue 作为前端框架

## 搭建
参照 [文档](https://cn.vuejs.org/v2/guide/installation.html#命令行工具-CLI)

```bash
➜  projects vue init webpack egg-blog-front

? Project name egg-blog-front
? Project description egg-blog 项目的前端部分
? Author sven <hellosc@qq.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Set up unit tests Yes
? Pick a test runner jest
? Setup e2e tests with Nightwatch? Yes
? Should we run `npm install` for you after the project has been created? (recommended) yarn

   vue-cli · Generated "egg-blog-front".


# Installing project dependencies ...
# ========================

```

初次运行
```bash
➜  egg-blog-front cd egg-blog-front
➜  egg-blog-front yarn run dev
```

![初次运行](https://coding.net/u/sublimeCT/p/egg-blog/git/blob/master/docs/2/images/first_run.png)

## 关联远程仓库
```bash
> commitizen init cz-conventional-changelog --save --save-exact
> git add -A
> git cz
> git remote add origin git@git.coding.net:admin/test.git
> git push -u origin master
```