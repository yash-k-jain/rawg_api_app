const getGames = async (req, res) => {
  let { page, pageSize, genre, platform } = req.query;

  if (!page) {
    page = 1;
  }
  if (!pageSize) {
    pageSize = 5;
  }
  if (!genre) {
    genre = "action"; // Set your default genre here
  }
  if(!platform){
    platform = "8"
  }

  const response = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&dates=2020-01-01,2024-12-31&page_size=${pageSize}&page=${page}&genres=${genre}&parent_platforms=${platform}&ordering=-rating`,
    {
      method: "GET",
    }
  );
  const responseBody = await response.json();

  res.status(200).json(responseBody.results);
};

module.exports = getGames;
