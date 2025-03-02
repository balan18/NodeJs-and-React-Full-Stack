const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = (req, res) => {
    const { username, password } = req.body;

    // Static credentials
    if (username === "admin" && password === "admin") {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};

module.exports = { login };