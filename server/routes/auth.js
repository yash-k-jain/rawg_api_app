const express = require("express");
const getUserIdFromToken = require("../middlewares/getUserIdFromToken");

const router = express.Router();

router.post("/register", require("../controller/auth/register"));
router.post("/login", require("../controller/auth/login"));
router.post("/getUser", getUserIdFromToken, require("../controller/auth/getUser"))

module.exports = router;
