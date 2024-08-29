const getDevelopers = async (req, res) => {
  let { page } = req.query;
  if(!page){
    page = 1
  }
  const response = await fetch(
    `${process.env.RAWG_BASE_URL}/developers?key=${process.env.RAWG_API_KEY}&page=${page}&page_size=15`, {
        method: "GET"
    }
  );

  const responseBody = await response.json();
  res.status(200).json(responseBody.results);
};

module.exports = getDevelopers;
