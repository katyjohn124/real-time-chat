const { valiJwt } = require("../middle");
const controller = require("../controller/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/test/user",
        [valiJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/test/admin",
        [valiJwt.verifyToken, valiJwt.isAdmin],
        controller.adminBoard
    );
};