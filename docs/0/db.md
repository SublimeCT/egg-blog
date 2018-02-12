# 数据库设计

`MongoDB` 数据库好像没有什么表结构可言 ...

## 字段整理
- User
    - nickname
    - password
    - email
    - avatar
    - signature
    - level_id
    - create_time
    - city_name
- Role
    - name
    - contents
    - auths
        - insert_images
        - content_length_limit
        - insert_video
- Article
    - user_id
    - content
    - create_time
    - title

## 新增测试数据
```bash
# 我在开发环境 deepin 直接使用 apt-get 安装 MongoDB, 需要最新版本请到官网下载
mongo
> db.version()
3.2.11
# 直接创建 user 表并插入数据
> db.user.insert({nickname: 'sven', password: 'e10adc3949ba59abbe56e057f20f883e', email: 'hellosc@qq.com', avatar: 'avatar.png', signature: 'It\'s me', level_id: null, create_time: new Date(), city: null})
WriteResult({ "nInserted" : 1 })
```
`role` 表
```bash
> db.role.insert({name: 'Admin', contents: '管理员', auths: {insert_images: true, content_length_limit: 10000, insert_video: true}})
WriteResult({ "nInserted" : 1 })
```
`article` 表
```bash
> db.article.insert({user_id: ObjectId("5a818a89f31a42956c75c5fa"), content: '# hello world', create_time: new Date(), title: 'Test Article'})
WriteResult({ "nInserted" : 1 })
```
