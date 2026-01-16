const express = require("express");
const verifyToken = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * TEST PROTECTED ROUTE
 * Requires valid JWT
 */
router.get("/me", verifyToken, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user, // { userId, role }
  });
});

module.exports = router;
