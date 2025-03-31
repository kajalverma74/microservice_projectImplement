const express = require("express");
const {
  register,
  verifyEmail,
  login,
  updateUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);

router.get("/verify/:token", verifyEmail);

router.post("/login", login);

router.put("/update/:id", updateUser);


module.exports = router;
