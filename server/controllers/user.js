/****************************************************************
 * Filename: user.js
 * Description: This file contains the user specific routes.
 * ****************************************************************/

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const USER = require("../enums/user");
const HTTP = require("../enums/http");
const bcrypt = require("bcrypt");

const addUser = async (req, res, next) => {
    //TODO: Validation of req.body
    if(req.body) {
        const data = {...req.body};
        //check if user is already present
        const user = await User.findOne({email: data.email});
        if(user) {
            res.status(HTTP.STATUS.ALREADY_EXISTS).send("Email already exists.");
        }
        else {
            let role = data.role || USER.ROLE.EMPLOYEE;
            if(role == USER.ROLE.ADMIN) {
                data.isAdmin = true;
            }
            let password;
            if(req.query.type == USER.QUERY_TYPE.ADD_USER) {
                password = generateRandomPassword();
                data.password = password;
            }
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
                if(req.query.type == USER.QUERY_TYPE.SIGNUP) {
                    let authToken = createAuthToken(newUser);
                    res.status(HTTP.STATUS.SUCCESS).send({token : authToken});
                }
                else {
                    res.status(HTTP.STATUS.SUCCESS).send({randomPassword: password});
                }
            }
        }
    }
    else {
        res.status(HTTP.STATUS.INVALID_REQ).send("Invalid Reuqest: Please provide the correct Input");
    }
}


const login = async (req, res, next) => {
    if(req.body) {
        const userData = {...req.body};
        let user;
        try {
            user = await User.findOne({email: userData.email});
        }
        catch(e) {
            next(e);
        }
        if(user) {
            const hashedPassword = user.password;
            let isCorrectPass = await bcrypt.compare(req.body.password, hashedPassword);
            if(isCorrectPass) {
                let token = createAuthToken(user);
                return res.status(HTTP.STATUS.SUCCESS).send({token: token});
            }
            next();
        }
        else {
            res.status(HTTP.STATUS.NOT_FOUND).send("No User found with this email.");
        }
    }
}

const createAuthToken = (user) => {
    //TODO: expiresIn must be dynamic
    return jwt.sign({id: user._id}, process.env.JWT_SECRET,{ expiresIn: 360});
}

const generateRandomPassword = () => {
    return Math.random().toString(36).substring(8);
}
module.exports = {addUser, login}