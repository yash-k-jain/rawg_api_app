const getGameDetail = async (req, res) => {
    let { id } = req.query;

    if (!id) {
        id = "795632"
    }
    const response = await fetch(
        `${process.env.RAWG_BASE_URL}/games/${id}?key=${process.env.RAWG_API_KEY}`,
    )

    const responseBody = await response.json();

    res.status(200).json(responseBody);
}

module.exports = getGameDetail;