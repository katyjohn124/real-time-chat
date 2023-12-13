const db = require('../models');
const config = require('../config/vali.config');
const User = db.user;
const Role = db.role;
//Op定义eq、ne、gt、lt、like和 等运算符in，用于在 Sequelize 查询中构建过滤条件;
//这些运算符可帮助您编写灵活的动态查询，这些查询可以根据各种条件定位特定数据。
const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signUp = (req, res) => {
    //注册-保存用户信息到数据库
    User.create({
        username: req.body.username,
        email: req.body.email,
        //对密码进行哈希处理
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({
                            message: '用户注册成功!'
                        });
                    });
                });
            } else {
                user.setRoles([1]).then(() => {
                    res.send({
                        message: '用户注册成功!'
                    });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

//登录验证
exports.signIn = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: '用户不存在！'
                });
            }
            //把输入的密码和数据库存储的进行比较
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: '密码错误!'
                });
            }

            const token = jwt.sign(
                { id: user.id },
                config.secret,
                {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    //24小时过期
                    expiresIn: 86400
                });
            var authorities = [];
            //使用getRoles用户对象的方法来检索与用户关联的角色列表
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push('ROLE_' + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })

}