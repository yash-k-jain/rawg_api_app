const { getLinks, store_id_to_name } = require("../../helper");
// const Games = require("../../models/Games");

const getGames = async (req, res) => {
    const {page} = req.query;

    let games = [];

    const response = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&dates=2024-01-01,2024-12-31&page_size=5&page=${page}`,
      {
        method: "GET",
      }
    );
    const responseBody = await response.json();

    for (const game of responseBody.results) {
      let gameDict = {};

      gameDict.id = game.id;
      gameDict.name = game.name;
      gameDict.releasedDate = game.released;
      gameDict.image = game.background_image;
      gameDict.rating = game.rating;
      gameDict.lastUpdated = game.updated;
      gameDict.platforms = [];
      gameDict.genres = [];
      gameDict.stores = [];
      gameDict.tags = [];
      gameDict.screenshots = [];
      gameDict.links = [];

      if (game.platforms) {
        for (let platform of game.platforms) {
          gameDict.platforms.push(platform.platform.name);
        }
      }

      if (game.genres) {
        for (let genre of game.genres) {
          gameDict.genres.push(genre.name);
        }
      }

      if (game.stores) {
        for (let store of game.stores) {
          gameDict.stores.push({
            storeName: store.store.name,
            domain: store.store.domain,
          });
        }
      }

      if (game.tags) {
        for (let tag of game.tags) {
          gameDict.tags.push(tag.name);
        }
      }

      if (game.short_screenshots) {
        for (let screenshot of game.short_screenshots) {
          gameDict.screenshots.push(screenshot.image);
        }
      }

      const links = await getLinks(game.id);
      links.forEach((link) => {
        gameDict.links.push({
          storeId: store_id_to_name[link.store_id],
          storeUrl: link.url,
        });
      });

      games.push(gameDict);
    }

  res.status(200).json(games);
};

module.exports = getGames;
