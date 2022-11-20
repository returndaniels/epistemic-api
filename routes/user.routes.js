const express = require("express");
const router = express.Router();

const {
  createUser,
  userSignIn,
  recoverPassword,
} = require("../controllers/user");

router.post("/auth", userSignIn);
router.post("/register", createUser);
router.post("/forgot", recoverPassword);

module.exports = router;
