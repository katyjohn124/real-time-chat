const express = require("express");
const cors = require("cors");

const app = express();

var corOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corOptions));

app.use(express.json());
//解析url编码表单
app.use(express.urlencoded({ extended: true }));


const db = require('./front.server/models');
const Role = db.role;

// 同步数据库并初始化数据
db.sequelize.sync().then(() => {
    console.log("Synced db.");
    initial(); // 初始化角色
});

// 初始化角色的函数
function initial() {
    Role.findOrCreate({
        where: { name: 'user' },
        defaults: { id: 1, name: 'user' }
    });

    Role.findOrCreate({
        where: { name: 'admin' },
        defaults: { id: 2, name: 'admin' }
    });
}

app.get("/", (req, res) => {
    res.json({ message: '欢迎来到katyjohn的应用程序!' });

});

//路由
require('./front.server/routes/vali.routes')(app);
require('./front.server/routes/user.routes')(app);



//设置端口
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})

