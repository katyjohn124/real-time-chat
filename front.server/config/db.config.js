module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "你的数据库密码",//这些配置一定要用自己的！不然运行不起来的哦！
    DB: "你的数据库名字",
    dialect: "mysql",
    //该属性定义用于管理数据库连接的连接池的配置
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}