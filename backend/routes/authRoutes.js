const express = require("express");

const {
  register,
  login,
  profile,
} = require("../controller/authController");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", auth, profile);

module.exports = router;