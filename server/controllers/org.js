/****************************************************************
 * Filename: org.js
 * Description: This file contains the orgnisation specific routes.
 * ****************************************************************/

const Organisation = require("../models/org");

const getOrgDetails = (req, res, next) => {
    res.send("This URL provides Org details.");
}

const setupOrg = async (req, res, next) => {
    if(req.body.name && req.body.email) {
        console.log(req.body);
        let orgName = req.body.name;
        let orgEmail = req.body.email;
        let orgUrlTxt = orgName.trim();
        //TODO: check if organisation is already present.
        const org = new Organisation({
            name: orgName,
            email: orgEmail,
            urlTxt: orgUrlTxt
        });
        const response = await org.save();
        if(!response) {
            res.status(500).send("Internal Server Error");
            next();
        }
        res.status(201).send({orgUrlTxt});
    }
    else {
        res.status(400).send("Please provide the correct Input");
    }
}

module.exports = {getOrgDetails, setupOrg}