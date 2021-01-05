/****************************************************************
 * Filename: user.js
 * Description: This file contains the user specific routes.
 * ****************************************************************/

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ROLE = require("../enums/user");
const HTTP = require("../enums/http");

const addUser = async (req, res, next) => {
    //TODO: Validation of req.body
    if(req.body) {
        const data = {...req.body};
        if(data.role == ROLE.ADMIN) {
            data.isAdmin = true;
        }
        //check if user is already present
        const user = await User.findOne({email: data.email});
        if(user) {
            res.status(HTTP.STATUS.ALREADY_EXISTS).send("Email already exists.");
        }
        else {
            const newUser = new User(data);
            let response;
            try {
                response = await newUser.save();
            }
            catch(e) {
                return next(e);
            }
            if(!response) {
                res.status(HTTP.STATUS.SERVER_ERROR).send("Internal Server Error");
            }
            else {
                let authToken = createAuthToken(newUser);
                res.status(HTTP.STATUS.SUCCESS).send(authToken);
            }
        }
    }
    else {
        res.status(HTTP.STATUS.INVALID_REQ).send("Invalid Reuqest: Please provide the correct Input");
    }
}

const createAuthToken = (user) => {
    //TODO: expiresIn must be dynamic
    return jwt.sign({id: user._id}, process.env.JWT_SECRET,{ expiresIn: 360});
}
module.exports = {addUser}