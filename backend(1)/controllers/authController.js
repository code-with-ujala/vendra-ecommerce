
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please provide name, email and password",
        });
    }

    try {
        // Check Existing User
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Password Hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpire: Date.now() + 10 * 60 * 1000, // 10 min
        });

        if (user) {
            const message = `
Welcome to ShopNest ${name}!

Your OTP for email verification is:

${otp}

This OTP is valid for 10 minutes.
`;

            await sendEmail(
                email,
                "Welcome to ShopNest - Email Verification",
                message
            );

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                verified: user.verified,
                token: generateToken(user._id),
                message: "OTP sent successfully to your email.",
            });
        } else {
            res.status(400).json({
                message: "Invalid user data",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};


// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password",
        });
    }

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {

            // ✅ Email Verification Check
            if (!user.verified) {
                return res.status(401).json({
                    message: "Please verify your email first."
                });
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                verified: user.verified,
                token: generateToken(user._id),
            });

        } else {
            res.status(400).json({
                message: "Invalid email or password",
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};


// Get All Users---
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");

        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};

// Verify Email---
const verifyEmail = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            message: "Please provide email and OTP"
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // OTP Check
        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        // OTP Expire Check
        if (user.otpExpire < Date.now()) {
            return res.status(400).json({
                message: "OTP has expired"
            });
        }

        // Verify User
        user.verified = true;

        // OTP Remove
        user.otp = "";
        user.otpExpire = null;

        await user.save();

        res.json({
            message: "Email verified successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    verifyEmail,
};