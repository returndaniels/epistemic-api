const express = require("express");
const router = express.Router();

const FAKE_EMAIL = "returndaniels@gmail.com";
const FAKE_PASSWORD = "password@123";
const FAKE_USER = {
  id: 1,
  username: "returndaniels",
  name: "Daniel",
  email: "returndaniels@gamil.com",
};

router.post("/", async (req, res) => {
  try {
    // email: req.body.email
    // password: req.body.password

    /** Fake test */
    const testFakeEmail = FAKE_EMAIL == req.body.email;
    const testFakePassword = FAKE_PASSWORD == req.body.password;

    if (testFakeEmail && testFakePassword) {
      res.status(201).json(FAKE_USER);
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch {
    res.status(500).json({
      message: "Server error, contact the support.",
    });
  }
});

module.exports = router;
