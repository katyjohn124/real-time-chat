const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080", // 替换为你的前端应用的域名
        methods: ["GET", "POST"]
    }
});
const path = require("path");
const DataBase = require("./database.js");
const cors = require("cors");

const db = new DataBase();


app.use(cors());
app.use(express.json());


// 添加一个简单的根路由以确认服务器运行
app.get('/', (req, res) => {
    res.send('Chat server is running');
});

app.get('/test', (req, res) => {
    res.send('Test route is working');
});


// API 路由
app.post("/api/send-message", async (req, res) => {
    try {
        const { message, user } = req.body;
        await db.storeUserMessage({ message, user });
        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ... 其他 API 路由

// Socket.IO 连接逻辑
io.on("connection", function (socket) {
    console.log(`当前连接数: ${io.engine.clientsCount}`);
    //用户连接和离开的监听事件
    console.log("A user with ID: " + socket.id + " connected");
    //显示当前所有连接数
    io.emit('connections', io.engine.clientsCount);



    socket.on("disconnect", function () {
        console.log(`当前连接数: ${io.engine.clientsCount}`);
        console.log("A user with ID: " + socket.id + " disconnected");
        //当用户离开后，更新当前连接数
        io.emit('connections', io.engine.clientsCount);


    });



    socket.on("chat-message", async (message) => {
        const data = {
            message: message.message,
            user_id: socket.id,
            name: message.user,
        };
        await db.storeUserMessage(data);
        socket.broadcast.emit("chat-message", message);
    });

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
    });

    socket.on("stopTyping", () => {
        socket.broadcast.emit("stopTyping");
    });

    socket.on("joined", async (name) => {
        let messageData = null;
        const data = {
            name,
            user_id: socket.id,
        };
        const user = await db.addUser(data);
        if (user) {
            messageData = await db.fetchUserMessages(data);
        }
        socket.broadcast.emit("joined", messageData);
    });

    socket.on("leave", (data) => {
        socket.broadcast.emit("leave", data);
    });
});

http.listen(3000, () => {
    console.log("Listening on port *: 3000");
});
