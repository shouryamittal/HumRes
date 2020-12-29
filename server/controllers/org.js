/****************************************************************
 * Filename: org.js
 * Description: This file contains the orgnisation specific routes.
 * ****************************************************************/

const Organisation = require("../models/org");

const getOrgDetails = (req, res, next) => {
    res.send("This URL provides Org details.");
}

const setupOrg = async (req, res) => {
    if(req.body.name && req.body.email) {
        let orgName = req.body.name;
        let orgEmail = req.body.email;
        let orgUrlTxt = orgName.trim().toLowerCase();
        //check if organisation is already registered.
        const orgWithEmail = await Organisation.findOne({email: orgEmail});
        if(orgWithEmail) {
            res.status(409).send("Email already exists.");
        }
        else {
            const org = new Organisation({
                name: orgName,
                email: orgEmail,
                urlTxt: orgUrlTxt
            });
            const response = await org.save();
            if(!response) {
                res.status(500).send("Internal Server Error");
            }
            else {
                res.status(201).send({orgUrlTxt, orgId:orgEmail});
            }
        }
    }
    else {
        res.status(400).send("Please provide the correct Input");
    }
}

module.exports = {getOrgDetails, setupOrg}