# Git 环境搭建
> 项目初期使用 [`coding`](https://coding.net) **私有仓库** 

## 添加 SSH Key
```bash
ssh-keygen -t rsa
```
将生成的 `~/.ssh/id_rsa.pub` 中的内容添加至 `coding` 后台

## clone
```bash
git clone git@git.coding.net:admin/example.git
```

## 添加忽略
`.gitignore`
```profile
.idea
.DS_store
run
```
