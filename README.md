# D-One

D-One 是解决项目从新建到发布的全流程平台 https://dev-one.cn/#/

## QuickStart

开发需要参考 egg 的多进程模块 https://www.eggjs.org/zh-CN/core/cluster-and-ipc

### 本地开发

当你是第一次使用仓库的时候，应先执行数据库初始化命令，请先 [按照链接](https://eggjs.org/zh-cn/tutorials/sequelize.html) 

```
// --- 初始化数据库 ---
npm install --save-dev sequelize-cli

npx sequelize init:config
npx sequelize init:migrations

// --- 创建数据库 ---
npx sequelize db:create
// --- 未创建表则会新建，创建过则忽略 ---
npx sequelize db:migrate

// --- 删除表 ---
npx sequelize db:migrate:undo:all

// --- 如需要在本地操作则需先修改 ---
// database => config.json => host: one_mysql => host: localhost
```


```
0. 需要先启动基础服务，docker-compose -f docker-compose-base.yml up -d 
1. 修改 database 中 config.json 的 host 为 localhost
2. 执行 NODE_ENV=development npx sequelize db:migrate
```

## docker

需要使用模版的 docker 部署能力请阅读该文档片段

docker 文件分为两个, `docker-compose` 文件提供项目能力 `docker-compose-base` 提供数据库与redis能力，如需用到请先修改两份文件中的 `networks` 修改成新项目的名称。然后修改 `container_name` 字段，该字段主要提供数据库连接别名，修改之后需要在 config 中配置数据库的连接与使用。

更多请参考 :
[sequelize](https://www.eggjs.org/zh-CN/tutorials/sequelize)
[config 配置](https://www.eggjs.org/zh-CN/basics/config) 

docker 部署流程请参阅文档 https://baishan-xux.yuque.com/staff-qktuyg/wn3ktx/inbmhg#jbKr2


### 问题

1. Docker 中如何确保有 Git 环境 (Docker file init 安装 Git)
2. 如何在 Docker 中确保可以通过 服务端创建 Git 仓库 （初始化启动脚本获取 BitBucket Key）
3. 如何在 Docker 中提交 Git init 请求 （Git 账号 login）
4. NodeJS 项目在服务端如何开辟 CLI init 的空间 （存放文件夹 命名规则 name + timestep）
5. 如何处理大量的请求同时进来带来的消耗服务端 init project 物理存储空间的问题 （rm 文件夹 在 node 中执行？）（不使用物理空间 用内存？ 大量项目怎么办？）
6. 如何安全的删除 Git 提交之后的 init 文件
7. 如何保证失败之后可以同步到前端？（子进程轮询？异步？）



### 项目核心流程

1. 用户在平台注册创建账号
2. 用户绑定 Git Group 地址 和 SSh Key、Git 用户名、邮箱
3. 用户上传完成 Template、Page、Component 等前置输入的创建 @template
4. 用户选择模版、输入项目名称、默认项目页面等
5. 用户在平台创建项目
6. Node 执行 Init、Push、Remove Shell 分别初始化、推送、服务端回收空间