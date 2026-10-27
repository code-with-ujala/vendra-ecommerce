
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const protect = async (req, res, next) => {
    try {
        // Check Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not Authorized, token missing"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find user
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "Not Authorized, user not found"
            });
        }

        // Attach user to request
        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Not Authorized, invalid token"
        });
    }
};

module.exports = { protect };
