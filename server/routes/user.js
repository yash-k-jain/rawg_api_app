const express = require("express");
const getUserIdFromToken = require("../middlewares/getUserIdFromToken");

const router = express.Router();

router.post("/setGame", getUserIdFromToken, require("../controller/user/setGame"));
router.post("/removeGame", getUserIdFromToken, require("../controller/user/removeGame"));
router.post("/searchGame", require("../controller/user/searchGame"));

module.exports = router;