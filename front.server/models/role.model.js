module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true  // 添加这行来使 id 字段自增
        },
        name: {
            type: Sequelize.STRING
        }
    });

    return Role;
};
