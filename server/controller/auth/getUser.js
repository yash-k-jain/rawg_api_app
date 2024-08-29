const User = require("../../models/User");

const getUser = async (req, res) => {
  const user = await User.findById(req.userId);
  const { password, ...userData } = user.toObject();

  res.status(200).json(userData);
};

module.exports = getUser;
