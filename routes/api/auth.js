const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { findById } = require("../../models/user");
const User = require("../../models/user");

// @route   GET api/auth
// @desc    Test route
// @access  public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
