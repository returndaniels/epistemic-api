const express = require("express");
const router = express.Router();

const { createUser, userSignIn } = require("../controllers/user");

router.post("/auth", userSignIn);
router.post("/register", createUser);

module.exports = router;
