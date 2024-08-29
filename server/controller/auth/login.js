const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SIGN_TOKEN);
    res.status(200).json(token);
}

module.exports = login;