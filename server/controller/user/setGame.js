const User = require("../../models/User");

const setGame = async (req, res) => {
  const { game } = req.body;

  if (!game) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.games.some((gameUser) => gameUser.id === game.id)) {
    return res.status(400).json({ message: "Game already added" });
  } else {
    await User.findByIdAndUpdate(
      req.userId,
      { $push: { games: game } },
      { new: true }
    );
  }

  res.status(200).json({ message: "Successfully Updated" });
};

module.exports = setGame;
