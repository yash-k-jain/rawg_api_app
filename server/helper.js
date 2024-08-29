const getLinks = async (id) => {
  const response = await fetch(
    `https://api.rawg.io/api/games/${id}/stores?key=${process.env.RAWG_API_KEY}`,
    {
      method: "GET",
    }
  );

  const responseBody = await response.json();

  return responseBody.results;
};



module.exports = { getLinks, store_id_to_name };
