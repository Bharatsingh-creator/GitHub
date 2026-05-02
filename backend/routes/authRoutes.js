const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controller/authController.js");
const passport = require("../config/passport.js");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);

// Step 2: Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token } = req.user;

    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  },
);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
