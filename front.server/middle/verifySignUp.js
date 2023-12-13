const db = require('../models');
const ROlES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    //用户信息
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "失败！用户名已经存在！"
            });
            return;
        }

        //邮件信息
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "失败！邮箱已经被使用！"
                });
                return;
            }
            next();
        });
    });
};
//查看role请求是否存在
checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROlES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: '失败！角色不存在！=' + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
