const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
  verifyEmail,
} = require("../controllers/authController");

const { protect , } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.get("/", (req, res) => {
    res.send("Auth route working!");
});


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmail);
 router.get("/users", protect, admin, getUsers);

module.exports = router;
