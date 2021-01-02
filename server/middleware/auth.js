const jwt = require("jsonwebtoken");
const HTTP = require("../enums/http");

const authorizeUser = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token) {
        res.status(HTTP.STATUS.UNAUTHORIZED_CLIENT  ).send("Provide access token");
    }
    else {
        try {
            await jwt.verify(token, process.env.JWT_SECRET);
            next();
        }
        catch(e) {
            res.status(HTTP.STATUS.SERVER_ERROR).send("Failed to authenticate the token");
        }
    }
}

module.exports = authorizeUser;