const config = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
//创建一个名为“db”的空对象，该对象将保存各种数据库组件
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model')(sequelize, Sequelize);
db.role = require('../models/role.model')(sequelize, Sequelize);
//定义“角色”和“用户”之间的多对多关系——————一个用户可以拥有多个角色与 一个角色可以由多个用户担任。
db.role.belongsToMany(db.user, {
    through: 'user_roles'
});

db.user.belongsToMany(db.role, {
    through: 'user_roles'
});

db.ROLES = ['user', 'admin'];

module.exports = db;
