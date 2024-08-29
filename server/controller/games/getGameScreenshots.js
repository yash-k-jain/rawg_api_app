const getGameScreenshots = async (req, res) => {
  let { id } = req.query;
  if (!id) {
    id = "795632";
  }
  const response = await fetch(
    `https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.RAWG_API_KEY}`
  );
  const responseBody = await response.json();
  res.status(200).json(responseBody.results);
};

module.exports = getGameScreenshots;