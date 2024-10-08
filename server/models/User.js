const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      unique: true,
    },
    games: [mongoose.Schema.Types.Mixed],
  },
  { timestamp: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
