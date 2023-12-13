const jwt = require('jsonwebtoken');
const config = require('../config/vali.config');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: '没有token提供！'
        });
    }

    jwt.verify(
        token,
        config.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: '未经授权！'
                });
            }
            req.userId = decoded.id;
            next();
        })
};

isAdmin = (req, res, next) => {
    //根据id进行用户查找对象
    User.findByPk(req, userId).then(user => {
        //角色检索
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'admin') {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: '管理员才能进入！'
            });
            return;
        })
    })
}


const valiJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};

module.exports = valiJwt;