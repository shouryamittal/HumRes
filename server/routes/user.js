const router = require("express").Router();
const UserController = require("../controllers/user");
const AttendanceController = require("../controllers/attendance");

router
    .post("/", UserController.addUser)
    .post("/signup", UserController.addUser)
    .post("/login", UserController.login)
    .post("/leave", AttendanceController.markLeave)

module.exports = router;