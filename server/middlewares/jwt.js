const jwt = require("jsonwebtoken");

const createToken = (data, expire_at) => {
    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: expire_at || "1d" });
    if (token) {
        return token;
    } else {
        return false;
    }
};

const verifyToken = (data) => {
    try {
        const token = jwt.verify(data, process.env.JWT_SECRET);
        return token;
    } catch (err) {
        return false;
    }
};

module.exports = { createToken, verifyToken };
