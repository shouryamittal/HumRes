const router = require("express").Router();
const OrgController = require("../controllers/org");

router
    .post("/", OrgController.setupOrg)
    .get("/", OrgController.findOrgByUrlTxt)


module.exports = router;
