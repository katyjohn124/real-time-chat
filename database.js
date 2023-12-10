const mysql = require("mysql2");

let instance = null;

class DB {
    constructor() {
        if (!instance) {
            instance = this;
            this.db = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "Nongjunyu321@", // 替换为实际的密码
                database: "real-time-chat", // 确保数据库名称正确
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
