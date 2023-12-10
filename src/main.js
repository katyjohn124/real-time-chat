import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import io from 'socket.io-client'

const app = createApp(App)

// 初始化并配置你的 Socket.IO 客户端
const socket = io('http://localhost:3000') // 替换为你的后端 URL
app.config.globalProperties.$socket = socket

app.mount('#app')
