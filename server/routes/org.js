const router = require("express").Router();
const OrgController = require("../controllers/org");
const authorizeUser = require("../middleware/auth");

router
    .post("/", OrgController.setupOrg)
    .get("/", authorizeUser, OrgController.findOrgByUrlTxt)


module.exports = router;
