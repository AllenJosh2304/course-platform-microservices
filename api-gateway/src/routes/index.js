const express = require("express");

const authRoutes = require("./auth.routes");
const protectedRoutes = require("./protected.routes");

const router = express.Router();

// Auth routes (no JWT)
router.use("/auth", authRoutes);

// Protected test routes (JWT required)
router.use("/protected", protectedRoutes);

module.exports = router;
