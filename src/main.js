import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import io from 'socket.io-client'
import { FontAwesomeIcon } from './plugins/font-awesome';

// 创建Vue应用实例
const app = createApp(App)

// 初始化并配置你的 Socket.IO 客户端
const socket = io('http://localhost:3000') // 替换为你的后端 URL
app.config.globalProperties.$socket = socket

app.use(store);
app.use(router);

// 注册 FontAwesomeIcon 组件
app.component("font-awesome-icon", FontAwesomeIcon);

// 挂载Vue实例到DOM
app.mount('#app');
