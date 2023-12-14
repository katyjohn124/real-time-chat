const mysql = require("mysql2");

let instance = null;

class DB {
    constructor() {
        if (!instance) {
            instance = this;
            this.db = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "your-password", // 替换为你数据库实际的密码
                database: "your-database-name", // 确保你自己的数据库名称正确,而不是用我的，不然运行失败
            });
            this.db.connect((err) => {
                if (err) {
                    console.error("Database connection failed: " + err.stack);
                    return;
                }
                console.log("Connected to database.");
            });
        }

        return instance;
    }

    addUser(data) {
        return new Promise(async (resolve, reject) => {
            if (await this.isUserExist(data)) {
                resolve(true);
            } else {
                this.db.execute(
                    "INSERT INTO users (name, user_id) VALUES (?,?)",
                    [data.name, data.user_id],
                    function (err, rows) {
                        if (err) reject(new Error(err));
                        else resolve(rows);
                    }
                );
            }
        });
    }

    isUserExist(data) {
        return new Promise((resolve, reject) => {
            this.db.execute(
                "SELECT * FROM users WHERE name = ?",
                [data.name],
                function (err, rows) {
                    if (err) reject(new Error(err));
                    else resolve(rows.length > 0);
                }
            );
        });
    }

    fetchUserMessages(data) {
        return new Promise((resolve, reject) => {
            this.db.query(
                "SELECT * from messages where name =?",
                [data.name],
                function (err, rows) {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    }

    storeUserMessage(data) {
        return new Promise((resolve, reject) => {
            this.db.query(
                "INSERT INTO messages (message, user_id, name) VALUES (?,?,?)",
                [data.message, data.user_id, data.name],
                function (err, rows) {
                    if (err) reject(new Error(err));
                    else resolve(rows);
                }
            );
        });
    }
}

module.exports = DB;
