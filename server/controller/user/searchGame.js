const searchGame = async (req, res) => {
  let { data, page } = req.body;
  if (!page) {
    page = 1;
  }

  if (!data) {
    data = "gta";
  }

  console.log(data.data, page)

  const response = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${data.data}&search_precise=true&page=${page}&page_size=15`
  );
  const responseBody = await response.json();
  res.status(200).json(responseBody.results);
};

module.exports = searchGame;