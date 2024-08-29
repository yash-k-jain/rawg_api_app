const User = require("../../models/User");

const removeGame = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the game with the specified id
    const index = user.games.findIndex((game) => game.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Remove the game from the array
    user.games.splice(index, 1);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    console.error("Error removing game:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = removeGame;
