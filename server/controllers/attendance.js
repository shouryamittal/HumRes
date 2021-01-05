const Attendance = require("../models/attendance");
const User = require("../models/user");
const HTTP = require("../enums/http");

const markLeave = async (req, res, next) => {
    if(req && req.body) {
        //check if user exists or not
        const userExists = await User.find({email: req.body.userId});
        console.log(userExists)
        if(!userExists.length) {
            return res.status(HTTP.STATUS.UNAUTHORIZED_CLIENT).send("No user exists with this email.");
        }
        const leave = new Attendance({
            userId: req.body.userId,
            BUId: req.body.BUId,
            isAbsent: req.body.isAbsent,
            date: req.body.date
        });
        let response;
        try {
            response = await leave.save();
        }
        catch(e) {
          return next(e);  
        }

        if(!response) {
            res.status(HTTP.STATUS.SERVER_ERROR).send("Internal Server Error");
        }
        else {
            res.status(HTTP.STATUS.SUCCESS).send("Leave marked successfully.");
        }
    }
    else {
        res.status(HTTP.STATUS.INVALID_REQ).send("Please provide valid input.");
    }
}

module.exports = {markLeave};