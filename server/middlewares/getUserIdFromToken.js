const jwt = require("jsonwebtoken")

const getUserIdFromToken = (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const data = jwt.verify(token, process.env.JWT_SIGN_TOKEN);
    req.userId = data.id;

    next();
}

module.exports = getUserIdFromToken;