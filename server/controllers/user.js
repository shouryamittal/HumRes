/****************************************************************
 * Filename: user.js
 * Description: This file contains the user specific routes.
 * ****************************************************************/

const User = require("../models/user");

const addUser = async (req, res) => {
    //TODO: Validation of req.body
    if(req.body) {
        const data = {...req.body};
        //check if user is already present
        const user = await User.findOne({email: data.email});
        if(user) {
            res.status(409).send("Email already exists.");
        }
        else {
            const newUser = new User(data);
            let response = await newUser.save();
            if(!response) {
                res.status(500).send("Internal Server Error");
            }
            else {
                //TODO: token to be sent 
                res.status(200).send("User added Successfully.")
            }
        }
    }
    else {
        res.status(400).send("Please provide the correct Input");
    }
}

module.exports = {addUser}