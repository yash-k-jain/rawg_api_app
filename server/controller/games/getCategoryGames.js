const getDeveloperInfo = async (req, res) => {
  let { id, page, category } = req.query;
  if (!id) {
    id = "405";
  }
  if (!page) {
    page = 1;
  }
  if (!category) {
    category = "developers";
  }

  const response = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&${category}=${id}&page_size=15&page=${page}&ordering=-rating`,
    {
      method: "GET",
    }
  );

  const responseBody = await response.json();
  res.status(200).json(responseBody.results);
};

module.exports = getDeveloperInfo;
