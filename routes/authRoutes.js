const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const { Register, Login, get_Profile } = require("../controllers/authController");

router.post("/register", Register);

router.post("/login", Login);

router.get("/get-profile", verifyToken, get_Profile);

module.exports = router;