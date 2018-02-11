# 添加依赖
## 依赖 list
- yarn 包管理工具
- commitizen `commit message` 格式化工具 [Angular 规范](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
- egg-bin

## 安装
```bash
# 需要先全局安装 yarn
yarn global add commitizen
npm init
commitizen init cz-conventional-changelog --save --save-exact
# 与 npm install --save egg 相同
yarn add egg
yarn add -D egg-bin
```

## Egg
`package.json` 中添加 `dev script`
```json
{
    "scripts": {
        "dev": "egg-bin dev"
    }
}
```

## 骨架
按 [官方文档](https://eggjs.org/zh-cn/intro/quickstart.html) 加入 `controller` & `router` & `config`

## 测试代码
测试专用路由 `[GET]` `/test` => `controller.home.test`
