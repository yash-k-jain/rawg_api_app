const express = require('express');

const router = express.Router();

router.get('/getGames', require("../controller/games/getGames"))
router.get('/getGenres', require("../controller/games/getGenres"))
router.get('/getDevelopers', require("../controller/games/getDevelopers"))
router.get('/getPlatforms', require("../controller/games/getPlatforms"))

router.get('/game/details', require("../controller/games/getGameDetail"))
router.get('/game/links', require("../controller/games/getGameLinks"))
router.get('/game/screenshots', require("../controller/games/getGameScreenshots"))
router.get('/game/category', require("../controller/games/getCategoryGames"))

module.exports = router;