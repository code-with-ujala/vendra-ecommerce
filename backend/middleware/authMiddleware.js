// const express = require("express");

// const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("Auth route working!");
// });

// module.exports = router;

const jwt = require("jsonwebtoken");
const User = require("../model/User");

const protect = async (req, res, next) => {
    try {
        // Header se token lena
        const token = req.headers.authorization.split(" ")[1];

        // Token verify karna
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // User ko database se nikalna
        req.user = await User.findById(decoded.id).select("-password");

        // Agle middleware/controller par jana
        next();

    } catch (error) {
        res.status(401).json({
            message: "Not Authorized"
        });
    }
};

module.exports = { protect };