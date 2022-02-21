# 使用说明

* 数据库操作 在mongodb中插入数据

```js
    db.users.insert({
  "userName": "admin",
  "password": "admin",
  "isAdmin": true
})
```

* mongodb默认配置 server/config/config.default.js

 ```javascript
config.mongoose = {
  url: 'mongodb://127.0.0.1:27017/book',
  options: {},
};
```

* 运行后端服务

```shell
cd server
npm run start
```

* 运行前端服务
  项目根目录

```shell
npm run start
```

* 前端打包
  项目根目录
```shell
npm run build
```




