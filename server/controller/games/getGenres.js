const getGenres = async (req, res) => {
  const response = await fetch(
    `${process.env.RAWG_BASE_URL}/genres?key=${process.env.RAWG_API_KEY}`,
    {
      method: "GET",
    }
  );

  const responseBody = await response.json();

  res.status(200).json(responseBody.results);
};

module.exports = getGenres;
