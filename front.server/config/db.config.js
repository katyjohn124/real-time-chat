module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Nongjunyu321@",
    DB: "validation_db",
    dialect: "mysql",
    //该属性定义用于管理数据库连接的连接池的配置
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}