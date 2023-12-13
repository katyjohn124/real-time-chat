exports.allAccess = (req, res) => {
    res.status(200).send('公共界面')
};

exports.userBoard = (req, res) => {
    res.status(200).send('用户界面')
};

exports.adminBoard = (req, res) => {
    res.status(200).send('管理员界面')
};