/****************************************************************
 * Filename: org.js
 * Description: This file contains the orgnisation specific routes.
 * ****************************************************************/

const Organisation = require("../models/org");
const QUERY_TYPE = require("../enums/org");

const setupOrg = async (req, res) => {
    if(req.body.name && req.body.email) {
        let orgData = {...req.body};
        let orgUrlTxt = orgData.name.trim().toLowerCase();
        //check if organisation is already registered.
        const orgWithEmail = await Organisation.findOne({email: orgData.email});
        if(orgWithEmail) {
            res.status(409).send("Email already exists.");
        }
        else {
            const org = new Organisation({
                name: orgData.name,
                email: orgData.email,
                urlTxt: orgUrlTxt,
                departments: orgData.departments,
                address: orgData.address,
                owner: orgData.owner,
                contact: orgData.contact
            });
            const response = await org.save();
            if(!response) {
                res.status(500).send("Internal Server Error");
            }
            else {
                res.status(201).send({orgUrlTxt, orgId:orgData.email});
            }
        }
    }
    else {
        res.status(400).send("Please provide the correct Input");
    }
}

/*this function finds a organisation using the query parameter "urlTxt" in the req.query*/
const findOrgByUrlTxt = async (req, res) => {
    if(req.query && req.query.urlTxt) {
        let urlTxt = req.query.urlTxt.trim().toLowerCase();
        const org = await Organisation.findOne({urlTxt});
        if(org) {
            let orgData = {};
            if(req.query.type == QUERY_TYPE.REGISTER_CHECK) {
                orgData = {
                    orgRegistered: true
                }
            }
            else if(req.query.type == QUERY_TYPE.URLTXT_CHECK) {
                orgData = {
                    isUrlTxtPresent: true
                }
            }
            else {
                orgData = {
                    orgName: org.name,
                    orgEmail: org.email,
                    urlTxt: org.urlTxt,
                    depts: org.departments,
                    contact: org.contact,
                    owner: org.owner,
                    totalEmp: org.totalEmployees
                }
            }
            res.status(200).send(orgData);
        }
        else {
            res.status(404).send({isOrgRegistered: false, isUrlTxtPresent: false});
        }
    }
    else {
        res.status(400).send("Invalid Reuqest: Provide urlTxt query parameter.")
    }
}

module.exports = {setupOrg, findOrgByUrlTxt};