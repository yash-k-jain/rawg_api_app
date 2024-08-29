const User = require("../../models/User.js");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const register = async (req, res) => {
    const { email, password, name } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword  = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        password: hashedPassword,
        name,
    });
    await newUser.save();
    console.log(newUser._id)

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SIGN_TOKEN)
    res.status(201).json(token);
};

module.exports = register;
