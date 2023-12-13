# real-time-chat-具有登录注册验证的在线实时聊天应用程序。

## 项目结构树：


## 项目主要实现的功能：

1. 登录注册的身份验证功能（利用JWT）来实现，在与后端验证的时候，会根据不同的身份显示不同的界面；而且根据不同角色赋予不同的权力，如管理员能查看信息，而普通用户只能登录到公共组件——在线实时俩天应用程序。

2. 多人在线实时聊天功能——前后端之间根据WebSocket来进行实时通信，并且能实现用户界面——显示对面的用户正在打字（xx正在输入中...）；对方离开聊天界面也会提示弹窗、以及能显示多少人进入了聊天室。

### 项目主要用的技术栈：

1. 登录注册验证功能：Vue3+Nodejs+Express+Mysql+router+vuex+Bootstrap+axios+webpack+JWT

2. 在线实时里聊天功能：Vue3+Nodejs+Express+Mysql+Bootstrapwebpack+Websocket


#### 项目主要的演示图以及在线视频：



#### 完成项目时遇到的主要问题：


#### 最后的上线部署：


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
