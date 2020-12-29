const router = require("express").Router();
const OrgController = require("../controllers/org");

router
    .post("/", OrgController.setupOrg)
    .get("/info", OrgController.getOrgDetails)


module.exports = router;
